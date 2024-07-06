import { SimpleTranslationEntries } from "#app/interfaces/locales";

/**
 * The menu namespace holds most miscellaneous text that isn't directly part of the game's
 * contents or directly related to Pokemon data. This includes menu navigation, settings,
 * account interactions, descriptive text, etc.
 */
export const menu: SimpleTranslationEntries = {
  "cancel": "취소",
  "continue": "계속하기",
  "dailyRun": "데일리 런 (베타)",
  "loadGame": "불러오기",
  "newGame": "새 게임",
  "settings": "설정",
  "selectGameMode": "게임 모드를 선택해주세요.",
  "logInOrCreateAccount": "로그인 또는 등록을 해 주세요. 개인정보를 요구하지 않습니다!",
  "username": "이름",
  "password": "비밀번호",
  "login": "로그인",
  "register": "등록",
  "emptyUsername": "이름은 비워둘 수 없습니다",
  "invalidLoginUsername": "사용할 수 없는 이름입니다",
  "invalidRegisterUsername": "이름은 알파벳, 숫자, 언더바(_)만 사용할 수 있습니다",
  "invalidLoginPassword": "사용할 수 없는 비밀번호입니다",
  "invalidRegisterPassword": "비밀번호는 여섯글자 이상이어야 합니다",
  "usernameAlreadyUsed": "이미 사용중인 이름입니다",
  "accountNonExistent": "등록되지 않은 이름입니다",
  "unmatchingPassword": "비밀번호가 틀립니다",
  "passwordNotMatchingConfirmPassword": "비밀번호가 일치하지 않습니다",
  "confirmPassword": "비밀번호 재입력",
  "registrationAgeWarning": "13세 이상입니다.",
  "backToLogin": "로그인 화면으로",
  "failedToLoadSaveData": "데이터를 불러올 수 없었습니다. 페이지를 새로고침해주세요.\n문제가 지속된다면, 디스코드 #Announcements 채널을 확인해주세요.",
  "sessionSuccess": "세션 불러오기 성공.",
  "failedToLoadSession": "세션을 불러올 수 없었습니다.\n파일이 손상되었을 수 있습니다.",
  "boyOrGirl": "너는 남자니?\n아니면 여자니?",
  "evolving": "…오잉!?\n{{pokemonName}}의 모습이…!",
  "stoppedEvolving": "얼라리…?\n{{pokemonName}}의 변화가 멈췄다!",
  "pauseEvolutionsQuestion": "{{pokemonName}}[[를]] 진화하지 않게 만드시겠습니까?\n포켓몬 화면에서 다시 활성화시킬 수 있습니다.",
  "evolutionsPaused": "{{pokemonName}}의 진화가 비활성화되었다.",
  "evolutionDone": "축하합니다! {{pokemonName}}[[는]]\n{{evolvedPokemonName}}[[로]] 진화했습니다!",
  "dailyRankings": "일간 랭킹",
  "weeklyRankings": "주간 랭킹",
  "noRankings": "랭킹 정보 없음",
  "positionIcon": "#",
  "usernameScoreboard": "이름",
  "score": "점수",
  "wave": "웨이브",
  "loading": "로딩 중…",
  "loadingAsset": "Loading asset: {{assetName}}",
  "playersOnline": "플레이어 온라인",
  "yes":"예",
  "no":"아니오",
  "disclaimer": "면책 조항",
  "disclaimerDescription": "이 게임은 완전히 개발되지 않았습니다- (세이브 데이터 소실을 포함) 플레이에 지장을 주는 문제가 생길 수 있으며,\n공지 없이 업데이트가 진행 혹은 중지될 수 있습니다.",
  "errorServerDown": "서버 연결 중 문제가 발생했습니다.\n\n이 창을 종료하지 않고 두면,\n게임은 자동으로 재접속됩니다.",
} as const;
