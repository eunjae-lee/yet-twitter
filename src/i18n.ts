const messages = {
  ko: {
    timeline: '타임라인',
    revert_twitter_logo: '트위터 로고 되살리기',
    hide_tweets_with_blue_mark: '블루 마크 달린 트윗 숨기기',

    tweet: '트윗',
  },
  en: {
    timeline: 'Timeline',
    revert_twitter_logo: 'Revert Twitter Logo',
    hide_tweets_with_blue_mark: 'Hide Tweets with Blue Mark',

    tweet: 'Tweet',
  },
}

type Lang = keyof typeof messages

export type MessageKeys = keyof (typeof messages)['ko']

const isKorean = () => {
  // @ts-ignore
  const lang = navigator.language || navigator.userLanguage
  return lang === 'ko' || lang === 'ko-KR'
}

export const i18n = () => {
  const lang: Lang = isKorean() ? 'ko' : 'en'
  // const lang: Lang = 'ko'
  return {
    // @ts-ignore
    install: (app) => {
      // inject a globally available $translate() method
      app.config.globalProperties.$t = (key: MessageKeys) => messages[lang][key]
    },
  }
}
