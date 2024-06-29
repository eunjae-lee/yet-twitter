const messages = {
  ko: {
    add: '추가',
    allow_blue_mark_desc:
      '트윗을 허용하고 싶은 계정이 있으면 계정명 옆 버튼을 누르세요.',
    allow_this_account: '이 계정 허용하기',
    allow: '허용',
    allowed_accounts_desc: '이 계정들의 트윗은 숨기지 않습니다',
    allowed_accounts: '허용된 계정',
    click_to_unmute: '뮤트를 풀려면 버튼을 누르세요.',
    delete: '삭제하기',
    hide_right_sidebar: '오른쪽 사이드바 숨기기',
    hide_tweets_with_blue_mark_except_follower: '내 팔로워는 허용',
    hide_tweets_with_blue_mark_except_following: '내 팔로잉은 허용',
    hide_tweets_with_blue_mark: '블루 마크 달린 트윗 숨기기',
    hide: '숨기기',
    how_long_to_mute: '이 계정을 며칠간 뮤트 하시겠습니까?',
    mute_bio_keyword_desc:
      '프로필 자기소개에 아래 키워드 중 하나라도 포함되는 계정을 뮤트합니다:',
    mute_bio_keyword_placeholder: '뮤트할 키워드 입력',
    mute_bio_keyword: '자기소개 키워드 뮤트',
    mute_error_msg: '며칠간 뮤트 하고 싶은지 숫자를 입력해 주세요 (예: 3)',
    muted_accounts: '임시 뮤트 된 계정',
    none: '없음',
    revert_twitter_logo: '트위터 로고 되살리기',
    timeline: '타임라인',
    total_hidden_tweet: '총 숨겨진 트윗',
    tweet: '트윗',
    unmute: '뮤트 풀기',
    view_list: '목록 보기',
    view_stats: '통계 보기',
    view: '보기',
    block_mute: '차단 / 뮤트',
    block_all_users: '모두 차단',
    block_all_blue_users: '블루만 차단',
    block_custom_list: '차단할 목록 직접 입력하기',
    block_custom_list_desc:
      '차단할 계정 아이디를 한 줄에 하나씩 입력해주세요 (@ 제외)',
    mute_all_users: '모두 뮤트',
    mute_all_blue_users: '블루만 뮤트',
    mute_custom_list: '뮤트할 목록 직접 입력하기',
    mute_custom_list_desc:
      '뮤트할 계정 아이디를 한 줄에 하나씩 입력해주세요 (@ 제외)',
    chain_block_desc: "'확인'을 누르시면 이 리스트의 모든 유저가 차단됩니다.",
    chain_mute_desc: "'확인'을 누르시면 이 리스트의 모든 유저가 뮤트됩니다.",
    chain_block_rate_limit_desc:
      '트위터의 API 사용량 제한을 피하기 위해 의도적으로 아주 느리게 실행됩니다 (5초에 한 명). 계속하시겠습니까?',
    chain_block_gather_desc:
      '리스트 내의 모든 계정을 수집합니다. 이미 팔로잉 혹은 팔로워 관계인 계정은 제외됩니다. 잠시만 기다려주세요.',
    chain_block_rate_limit_desc_v2:
      '트위터의 API 사용량 제한을 피하기 위해 의도적으로 아주 느리게 실행하는 게 좋습니다. 몇 초에 한 명씩 차단하시겠습니까? (예: 10)',
    chain_mute_rate_limit_desc_v2:
      '트위터의 API 사용량 제한을 피하기 위해 의도적으로 아주 느리게 실행하는 게 좋습니다. 몇 초에 한 명씩 뮤트하시겠습니까? (예: 10)',
    invalid_number: '숫자를 입력해 주세요.',
    chain_block_stop_desc_v2: '차단을 멈추시겠습니까?',
    chain_mute_stop_desc_v2: '뮤트를 멈추시겠습니까?',
    cancelled: '취소되었습니다.',
    rate_limit_warning: `트위터가 봇이라고 판단하게 되면 이 브라우저에서의 트위터 사용이 일시적으로 (몇 시간 혹은 하루 정도) 중지될 수 있습니다. 보통은 다른 브라우저나 다른 기기에서의 트위터 사용에는 영향을 끼치지 않지만, 이 부분이 트위터 내부 정책인 관계로 정확한 결과를 보장하긴 어렵습니다. 그래도 시도하시겠습니까?`,

    view_manual: '설명서 보기',

    aria_label_your_home_timeline: '홈 타임라인',
    aria_label_list_members: '타임라인: 리스트 멤버',
    aria_label_following: '타임라인: 팔로잉',
    aria_label_followers: '타임라인: 팔로워',
    aria_label_followers_you_know: '타임라인: 내가 아는 팔로워',
    aria_label_verified_followers: '타임라인: 인증된 팔로워',
    aria_label_subscriptions: '타임라인: 구독.',
    aria_label_community_member_timeline: '홈 타임라인',
    aria_label_community_members: '멤버',
  },
  en: {
    add: 'Add',
    allow_blue_mark_desc:
      'Click the button below to allow tweets from this account.',
    allow_this_account: 'Allow this account',
    allow: 'Allow',
    allowed_accounts_desc: 'Tweets from these accounts are not hidden.',
    allowed_accounts: 'Allowed Accounts',
    click_to_unmute: 'Click the button to unmute.',
    delete: 'Delete',
    hide_right_sidebar: 'Hide right sidebar',
    hide_tweets_with_blue_mark_except_follower: 'Allow my followers',
    hide_tweets_with_blue_mark_except_following: 'Allow my followings',
    hide_tweets_with_blue_mark: 'Hide Tweets with Blue Mark',
    hide: 'Hide',
    how_long_to_mute: 'How many days do you want to mute this account for?',
    mute_bio_keyword_desc:
      'Mute accounts that contain any of the following keywords in their bios:',
    mute_bio_keyword_placeholder: 'Enter keyword to mute',
    mute_bio_keyword: 'Bio Keyword Mute',
    mute_error_msg: 'Enter the number of days to mute this account (e.g., 3).',
    muted_accounts: 'Temporarily Muted Accounts',
    none: 'none',
    revert_twitter_logo: 'Revert Twitter Logo',
    timeline: 'Timeline',
    total_hidden_tweet: 'Total hidden tweets',
    tweet: 'Tweet',
    unmute: 'Unmute',
    view_list: 'View List',
    view_stats: 'View Stats',
    view: 'View',
    block_mute: 'Block / Mute',
    block_all_users: 'Block All',
    block_all_blue_users: 'Block Blue Only',
    block_custom_list: 'Block Custom List',
    block_custom_list_desc:
      'Enter the list of usernames to block, one account per line (without @).',
    mute_all_users: 'Mute All',
    mute_all_blue_users: 'Mute Blue Only',
    mute_custom_list: 'Mute Custom List',
    mute_custom_list_desc:
      'Enter the list of usernames to mute, one account per line (without @).',
    chain_block_desc:
      "Once you click 'OK', it will block all users in this list.",
    chain_mute_desc:
      "Once you click 'OK', it will mute all users in this list.",
    chain_block_rate_limit_desc:
      'To avoid Twitter rate limit, it runs intentionally very slowly (5 seconds per user). Are you sure?',
    chain_block_gather_desc:
      'It will gather all accounts in the list. Followings & Followers are excluded. Please wait.',
    chain_block_rate_limit_desc_v2:
      'To avoid Twitter rate limit, it runs intentionally very slowly. How many seconds per account would you like to block? (e.g., 10)',
    chain_mute_rate_limit_desc_v2:
      'To avoid Twitter rate limit, it runs intentionally very slowly. How many seconds per account would you like to mute? (e.g., 10)',
    chain_block_stop_desc_v2: 'Would you like to stop blocking?',
    chain_mute_stop_desc_v2: 'Would you like to stop muting?',
    invalid_number: 'Please enter a number.',
    cancelled: 'Cancelled.',
    rate_limit_warning: `If Twitter suspects you are a bot, you may be rate-limited. This means you cannot use Twitter on this browser temporarily (for hours or days). It likely won't affect your Twitter usage on other devices or browsers, but it's Twitter's internal policy, so nothing can be guaranteed. Do you still want to proceed?`,

    view_manual: 'View Manual',

    aria_label_your_home_timeline: 'Timeline: Your Home Timeline',
    aria_label_list_members: 'Timeline: List members',
    aria_label_following: 'Timeline: Following',
    aria_label_followers: 'Timeline: Followers',
    aria_label_followers_you_know: 'Timeline: Followers you know',
    aria_label_verified_followers: 'Timeline: Verified Followers',
    aria_label_subscriptions: 'Timeline: Subscriptions',
    aria_label_community_member_timeline: 'Home timeline',
    aria_label_community_members: 'Members',
  },
}

type Lang = keyof typeof messages

export type MessageKeys = keyof (typeof messages)['ko']

export const isKorean = () => {
  return document.body.parentElement?.getAttribute('lang') === 'ko'
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
