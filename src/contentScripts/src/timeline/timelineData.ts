const accounts: {
  [screenName: string]: {
    userName: string
    following: boolean
    followedBy: boolean
    verified: boolean
    description: string
    createdAt: string
  }
} = {}

export const getAccountInfo = (screenName?: string) =>
  screenName ? accounts[screenName] : undefined

export const loadTimelineData = () => {
  Array.from(
    document.querySelectorAll('script.yet-twitter-timeline:not(.read)'),
  ).forEach((script) => {
    script.classList.add('read')
    try {
      const json = JSON.parse(script.textContent || '')
      storeTimelineData(json)
    } catch (err) {}
  })
}

const storeTimelineData = (json: any) => {
  json.data.home.home_timeline_urt.instructions
    .filter((instruction: any) => instruction.type === 'TimelineAddEntries')
    .forEach((instruction: any) => {
      instruction.entries.forEach((entry: any) => {
        storeTimelineEntry(entry)
      })
    })
}

const storeTimelineEntry = (entry: TweetEntry) => {
  const legacy =
    entry.content.itemContent.tweet_results.result.core.user_results.result
      .legacy
  const {
    followed_by,
    following,
    screen_name,
    verified,
    description,
    name,
    created_at,
  } = legacy

  accounts[`@${screen_name}`] = {
    followedBy: followed_by,
    following,
    verified,
    description,
    userName: name,
    createdAt: created_at, // "Thu Sep 06 15:57:28 +0000 2018"
  }
}

type TweetEntry = {
  entryId: string
  sortIndex: string
  content: {
    entryType: 'TimelineTimelineItem'
    __typename: 'TimelineTimelineItem'
    itemContent: {
      itemType: 'TimelineTweet'
      __typename: 'TimelineTweet'
      tweet_results: {
        result: {
          __typename: 'Tweet'
          rest_id: string
          core: {
            user_results: {
              result: {
                __typename: 'User'
                id: string
                rest_id: string
                affiliates_highlighted_label: {}
                has_graduated_access: boolean
                is_blue_verified: boolean
                profile_image_shape: 'Circle'
                legacy: {
                  followed_by: boolean
                  following: boolean
                  protected: boolean
                  can_dm: boolean
                  can_media_tag: boolean
                  created_at: string
                  default_profile: boolean
                  default_profile_image: boolean
                  description: string
                  entities: {description: {urls: []}}
                  fast_followers_count: number
                  favourites_count: number
                  followers_count: number
                  friends_count: number
                  has_custom_timelines: boolean
                  is_translator: boolean
                  listed_count: number
                  location: string
                  media_count: number
                  name: string
                  normal_followers_count: number
                  pinned_tweet_ids_str: string[]
                  possibly_sensitive: boolean
                  profile_banner_url: string
                  profile_image_url_https: string
                  profile_interstitial_type: string
                  screen_name: string
                  statuses_count: number
                  translator_type: 'none'
                  verified: boolean
                  want_retweets: boolean
                  withheld_in_countries: string[]
                }
              }
            }
          }
          unmention_data: {}
          edit_control: {
            edit_tweet_ids: string[]
            editable_until_msecs: string
            is_edit_eligible: boolean
            edits_remaining: string
          }
          views: {count: string; state: 'EnabledWithCount'}
          source: string
          legacy: {
            bookmark_count: number
            bookmarked: boolean
            created_at: string
            conversation_id_str: string
            display_text_range: [number, number]
            entities: {
              user_mentions: any[]
              urls: any[]
              hashtags: any[]
              symbols: any[]
            }
            favorite_count: number
            favorited: boolean
            full_text: string
            is_quote_status: boolean
            lang: string
            quote_count: number
            reply_count: number
            retweet_count: number
            retweeted: boolean
            user_id_str: string
            id_str: string
          }
        }
      }
      tweetDisplayType: 'Tweet'
    }
    clientEventInfo: {
      component: 'following_in_network'
      element: 'tweet'
      details: {
        timelinesDetails: {
          injectionType: 'FollowingInNetwork'
          controllerData: string
        }
      }
    }
  }
}
