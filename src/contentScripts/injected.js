const readExtentionOptions = () => {
  const elem = document.querySelector('.yet-twitter-options')
  if (!elem) {
    return {}
  }
  try {
    return JSON.parse(elem.innerHTML)
  } catch (err) {
    return {}
  }
}

const extOptions = readExtentionOptions()

const safeParse = (text) => {
  try {
    return JSON.parse(text)
  } catch (err) {}
  return undefined
}

const removeBlueTweets = (response) => {
  const json = safeParse(response)
  if (!json) {
    return
  }

  const instructions = json.data?.home?.home_timeline_urt?.instructions
  if (!instructions || !Array.isArray(instructions)) {
    return
  }

  const stats = {}

  const getInfo = (itemContent) => {
    const isBlueVerified =
      itemContent.tweet_results.result.core.user_results.result.is_blue_verified
    const followedBy =
      itemContent.tweet_results.result.core.user_results.result.legacy
        .followed_by
    const following =
      itemContent.tweet_results.result.core.user_results.result.legacy.following
    const screenName =
      itemContent.tweet_results.result.core.user_results.result.legacy
        .screen_name

    return {
      isBlueVerified,
      followedBy,
      following,
      screenName,
    }
  }

  const shouldInclude = (info) => {
    const {isBlueVerified, followedBy, following, screenName} = info

    if (isBlueVerified && extOptions.hideBlueMarks) {
      if (extOptions.hideBlueMarksExceptFollower && followedBy) {
        return true
      } else if (extOptions.hideBlueMarksExceptFollowing && following) {
        return true
      } else {
        return false
      }
    } else {
      return true
    }
  }

  instructions.forEach((instruction) => {
    if (instruction.type === 'TimelineAddEntries') {
      instruction.entries = instruction.entries
        .map((entry) => {
          try {
            let info
            if (entry.content.entryType === 'TimelineTimelineModule') {
              info = getInfo(entry.content.items[0].item.itemContent)
            } else if (entry.content.entryType === 'TimelineTimelineItem') {
              info = getInfo(entry.content.itemContent)
            }
            if (!info) {
              return entry
            }
            if (shouldInclude(info)) {
              return entry
            } else {
              stats[info.screenName] = (stats[info.screenName] || 0) + 1
              return undefined
            }
          } catch (_err) {
            return entry
          }
        })
        .filter(Boolean)
    }
  })

  const script = document.createElement('script')
  script.setAttribute('type', 'application/json')
  script.setAttribute('charset', 'utf-8')
  script.className = 'yet-twitter-timeline-blue-removal-stats'
  script.innerHTML = JSON.stringify(stats)

  return JSON.stringify(json)
}

const rules = [
  {
    check: (url) =>
      url.startsWith('https://x.com/i/api/graphql/') &&
      new URL(url).pathname.endsWith('/HomeLatestTimeline'),
    classNames: ['yet-twitter-timeline', 'yet-twitter-latest-timeline'],
    modifyResponse: removeBlueTweets,
  },
  {
    check: (url) =>
      url.startsWith('https://x.com/i/api/graphql/') &&
      new URL(url).pathname.endsWith('/HomeTimeline'),
    classNames: ['yet-twitter-timeline', 'yet-twitter-recommendation-timeline'],
    modifyResponse: removeBlueTweets,
  },
]

;(function (xhr) {
  var XHR = xhr.prototype

  var open = XHR.open
  var send = XHR.send
  var setRequestHeader = XHR.setRequestHeader

  XHR.open = function (method, url) {
    this._method = method
    this._url = url
    this._requestHeaders = {}
    this._startTime = new Date().toISOString()

    return open.apply(this, arguments)
  }

  XHR.setRequestHeader = function (header, value) {
    this._requestHeaders[header] = value
    return setRequestHeader.apply(this, arguments)
  }

  XHR.send = function (postData) {
    this.addEventListener('load', function () {
      var myUrl = this._url ? this._url.toLowerCase() : this._url
      if (myUrl) {
        if (postData) {
          if (typeof postData === 'string') {
            try {
              // here you get the REQUEST HEADERS, in JSON format, so you can also use JSON.parse
              this._requestHeaders = postData
            } catch (err) {
              // console.log(
              //   'Request Header JSON decode failed, transfer_encoding field could be base64',
              // )
              // console.log(err)
            }
          } else if (
            typeof postData === 'object' ||
            typeof postData === 'array' ||
            typeof postData === 'number' ||
            typeof postData === 'boolean'
          ) {
            // do something if you need
          }
        }

        // here you get the RESPONSE HEADERS
        // var responseHeaders = this.getAllResponseHeaders()

        if (
          (this.responseType === '' || this.responseType === 'text') &&
          this.responseText
        ) {
          // responseText is string or null
          try {
            // here you get RESPONSE TEXT (BODY), in JSON format, so you can use JSON.parse

            rules.forEach((rule) => {
              if (rule.check(this._url)) {
                const script = document.createElement('script')
                script.setAttribute('type', 'application/json')
                script.setAttribute('charset', 'utf-8')
                script.innerHTML = this.responseText
                rule.classNames.forEach((className) =>
                  script.classList.add(className),
                )
                ;(document.head || document.documentElement).appendChild(script)
              }
            })

            const rule = rules.find((rule) => rule.check(this._url))
            if (rule) {
              const newResponse = rule.modifyResponse(this.responseText)
              if (newResponse) {
                this.responseText = newResponse
              }
            }

            // printing url, request headers, response headers, response body, to console

            // console.log('💡 url', this._url)
            // console.log('💡', JSON.parse(this._requestHeaders))
            // console.log('💡', responseHeaders)
            // console.log('💡', JSON.parse(arr))
          } catch (err) {
            console.log('💡 error caught', err)
            // console.log('Error in responseType try catch')
            // console.log(err)
          }
        }
      }
    })

    return send.apply(this, arguments)
  }
})(XMLHttpRequest)
