const messages = {
  ko: {
    timeline: '타임라인',
    revert_twitter_logo: '트위터 로고 되살리기',
    hide_tweets_with_blue_mark: '블루 마크 달린 트윗 숨기기',
    hide_tweets_with_blue_mark_except_following: '내 팔로잉은 허용',
    hide_tweets_with_blue_mark_except_follower: '내 팔로워는 허용',
    view: '보기',
    hide: '숨기기',
    view_stats: '통계 보기',
    total_hidden_tweet: '총 숨겨진 트윗',
    allow_this_account: '이 계정 허용하기',
    allow_blue_mark_desc:
      '트윗을 허용하고 싶은 계정이 있으면 계정명 옆 버튼을 누르세요.',
    allow: '허용',
    hide_right_sidebar: '오른쪽 사이드바 숨기기',

    tweet: '트윗',

    allowed_accounts: '허용된 계정',
    allowed_accounts_desc: '이 계정들의 트윗은 숨기지 않습니다',
    view_list: '목록 보기',

    none: '없음',
    muted_accounts: '임시 뮤트 된 계정',
    unmute: '뮤트 풀기',
    click_to_unmute: '뮤트를 풀려면 버튼을 누르세요.',

    how_long_to_mute: '이 계정을 며칠간 뮤트 하시겠습니까?',
    mute_error_msg: '며칠간 뮤트 하고 싶은지 숫자를 입력해 주세요 (예: 3)',
  },
  en: {
    timeline: 'Timeline',
    revert_twitter_logo: 'Revert Twitter Logo',
    hide_tweets_with_blue_mark: 'Hide Tweets with Blue Mark',
    hide_tweets_with_blue_mark_except_following: 'Allow my followings',
    hide_tweets_with_blue_mark_except_follower: 'Allow my followers',
    view: 'View',
    hide: 'Hide',
    view_stats: 'View Stats',
    total_hidden_tweet: 'Total hidden tweets',
    allow_this_account: 'Allow this account',
    allow_blue_mark_desc:
      'Click the button below to allow tweets from this account.',
    allow: 'Allow',
    hide_right_sidebar: 'Hide right sidebar',

    tweet: 'Tweet',

    allowed_accounts: 'Allowed Accounts',
    allowed_accounts_desc: 'Tweets from these accounts are not hidden.',
    view_list: 'View List',

    none: 'none',
    muted_accounts: 'Temporarily Muted Accounts',
    unmute: 'Unmute',
    click_to_unmute: 'Click the button to unmute.',

    how_long_to_mute: 'How many days do you want to mute this account for?',
    mute_error_msg: 'Enter the number of days to mute this account (e.g., 3).',
  },
}

type Lang = keyof typeof messages

export type MessageKeys = keyof (typeof messages)['ko']

export const isKorean = () => {
  // @ts-ignore
  const lang = navigator.language || navigator.userLanguage
  return lang === 'ko' || lang === 'ko-KR'
}

export const getLang = (): Lang => (isKorean() ? 'ko' : 'en')

export const getText = (key: MessageKeys, lang?: Lang) =>
  messages[lang ?? getLang()][key]

export const i18n = () => {
  const lang = getLang()
  // const lang: Lang = 'ko'
  return {
    // @ts-ignore
    install: (app) => {
      // inject a globally available $translate() method
      app.config.globalProperties.$t = (key: MessageKeys) => messages[lang][key]
    },
  }
}
