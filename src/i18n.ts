const messages = {
  ko: {
    timeline: '타임라인',
    revert_twitter_logo: '트위터 로고 되살리기',
    hide_tweets_with_blue_mark: '블루 마크 달린 트윗 숨기기',
    view_stats: '통계 보기',
    total_hidden_tweet: '총 숨겨진 트윗',
    allow_this_account: '이 계정 허용하기',
    allow_blue_mark_desc:
      '트윗을 허용하고 싶은 계정이 있으면 그 옆 체크 박스를 누르세요.',

    tweet: '트윗',

    allowed_accounts: '허용된 계정',
    allowed_accounts_desc: '이 계정들의 트윗은 숨기지 않습니다',
    view_list: '목록 보기',
  },
  en: {
    timeline: 'Timeline',
    revert_twitter_logo: 'Revert Twitter Logo',
    hide_tweets_with_blue_mark: 'Hide Tweets with Blue Mark',
    view_stats: 'View Stats',
    total_hidden_tweet: 'Total hidden tweets',
    allow_this_account: 'Allow this account',
    allow_blue_mark_desc:
      'Click the check button below if you want to allow tweets from them.',

    tweet: 'Tweet',

    allowed_accounts: 'Allowed Accounts',
    allowed_accounts_desc: 'Tweets from these accounts are not hidden.',
    view_list: 'View List',
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
