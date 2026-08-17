/**
 * 수험생 심리상담 & MBTI 성향 진단 웹앱
 * JavaScript Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. DATA DEFINITIONS
  // ==========================================

  // 10 Quiz Questions
  const questions = [
    {
      id: 1,
      category: "수험 목표 및 자격증 유형",
      question: "현재 가장 집중적으로 준비하고 계신 자격증 유형은 무엇인가요?",
      options: [
        { text: "전문직 자격증 (변호사, 회계사, 세무사, 노무사 등)", type: "J", score: 2 },
        { text: "국가기술 / IT 자격증 (정보처리기사, 전기기사, 기사류 등)", type: "T", score: 2 },
        { text: "공무원 / 공기업 / 임용 고시", type: "J", score: 1 },
        { text: "어학 / 금융 / 민간 전문 자격증", type: "P", score: 1 },
        { text: "기타 자기계발 및 취업 대비 자격증", type: "P", score: 2 }
      ]
    },
    {
      id: 2,
      category: "수험 동기 및 내면 가치",
      question: "이 자격증을 취득하려는 가장 솔직하고 강력한 목적은 무엇인가요?",
      options: [
        { text: "확실한 이직 및 커리어 스펙업", type: "T", score: 2 },
        { text: "생계 유지 및 경제적 안정성 확보", type: "S", score: 2 },
        { text: "현재 직무에서의 승진 및 인정", type: "E", score: 1 },
        { text: "자기만족 및 지적 호기심 충족", type: "N", score: 2 },
        { text: "남들에게 뒤처지지 않기 위한 안도감", type: "F", score: 2 }
      ]
    },
    {
      id: 3,
      category: "학습 진도 및 계획 실행",
      question: "목표 시험일까지 남은 기간과 현재 공부 진행률은 어느 정도인가요?",
      options: [
        { text: "D-30 이내 / 진도율 80% 이상 (최종 마무리 단계)", type: "J", score: 2 },
        { text: "D-30 이내 / 진도율 50% 미만 (벼락치기 필수 단계)", type: "P", score: 2 },
        { text: "D-90 이내 / 계획대로 차근차근 진행 중", type: "J", score: 1 },
        { text: "D-180 이상 / 이제 막 시작했거나 탐색 중", type: "N", score: 1 },
        { text: "시험일 미정 / 계속 미루다 불안해하는 중", type: "P", score: 1 }
      ]
    },
    {
      id: 4,
      category: "스트레스 및 슬럼프 극복 방식",
      question: "공부하다가 막히거나 성적이 오르지 않을 때 주로 나타나는 반응은?",
      options: [
        { text: "원인을 분석하고 오답 노트와 계획표를 재조정한다.", type: "T", score: 2 },
        { text: "자책감이 밀려오고 심한 불안과 스트레스를 느낀다.", type: "F", score: 2 },
        { text: "기분 전환을 위해 산책이나 친구와의 수다를 택한다.", type: "E", score: 2 },
        { text: "혼자 방에서 음악을 듣거나 쉬면서 마음을 다스린다.", type: "I", score: 2 },
        { text: "다른 공부법이나 인강 강사를 바꾸어 분위기를 전환한다.", type: "N", score: 1 }
      ]
    },
    {
      id: 5,
      category: "목표 관리 및 자기 수용",
      question: "하루 목표 공부량을 달성하지 못했을 때 당신의 마음가짐은?",
      options: [
        { text: "잠을 줄여서라도 무조건 당일 분량을 끝낸다.", type: "J", score: 2 },
        { text: "주말이나 다음 날 스케줄로 이월하여 보완한다.", type: "J", score: 1 },
        { text: "'내일 더 하면 되지!' 하고 크게 신경 쓰지 않는다.", type: "P", score: 2 },
        { text: "실패했다는 생각에 우울해지고 집중력이 떨어진다.", type: "F", score: 2 },
        { text: "왜 달성하지 못했는지 이유를 기록하고 스케줄을 수정한다.", type: "T", score: 1 }
      ]
    },
    {
      id: 6,
      category: "선호하는 학습 환경",
      question: "시험공부를 할 때 선호하는 공간과 환경은 어떤 스타일인가요?",
      options: [
        { text: "적막하고 집중도가 높은 독서실 / 스터디 카페", type: "I", score: 2 },
        { text: "적당한 백색소음이 있는 오픈형 카페", type: "E", score: 1 },
        { text: "집 안 내 방 (가장 편안하고 이동 시간이 없는 곳)", type: "I", score: 1 },
        { text: "스터디 모임이나 스터디원들과 함께하는 공간", type: "E", score: 2 },
        { text: "매일 장소를 바꾸며 스터디 카페 투어하기", type: "P", score: 1 }
      ]
    },
    {
      id: 7,
      category: "시험 전 심리적 불안 요인",
      question: "시험이 다가올수록 가장 나를 괴롭히는 심리적 불안 요소는?",
      options: [
        { text: "'떨어지면 그동안 쏟은 시간과 돈은 어쩌지?' 하는 불확실성", type: "S", score: 2 },
        { text: "'남들은 다 합격하는데 나만 낙방할까 봐' 느끼는 비교의식", type: "F", score: 2 },
        { text: "시험 당일 실수하거나 컨디션 조절에 실패할까 봐 드는 걱정", type: "T", score: 1 },
        { text: "집중력이 흐려지고 공부 자체가 하기 싫어지는 번아웃", type: "P", score: 2 },
        { text: "미래에 대한 막연한 두려움과 잡생각", type: "N", score: 2 }
      ]
    },
    {
      id: 8,
      category: "대인 관계 및 소통 방식",
      question: "주변 사람들에게 내 자격증 시험 준비 사실을 얼마나 알렸나요?",
      options: [
        { text: "아무에게도 알리지 않고 비밀리에 혼자 준비 중이다.", type: "I", score: 2 },
        { text: "가장 가까운 가족이나 친한 친구 몇 명에게만 알렸다.", type: "I", score: 1 },
        { text: "SNS나 주변 지인들에게 널리 알리고 배수진을 쳤다.", type: "E", score: 2 },
        { text: "스터디 그룹을 적극적으로 찾아 함께 공부하고 있다.", type: "E", score: 1 },
        { text: "묻는 사람에게만 대답하고 굳이 먼저 말하지 않는다.", type: "S", score: 1 }
      ]
    },
    {
      id: 9,
      category: "합격 후 보상 및 가치관",
      question: "합격 후 나에게 주고 싶은 가장 큰 보상은 무엇인가요?",
      options: [
        { text: "아무 생각 없이 즐기는 푹 쉬는 힐링 여행", type: "F", score: 1 },
        { text: "그동안 사지 못했던 갖고 싶던 선물/명품 구매", type: "S", score: 2 },
        { text: "친한 사람들과 마음껏 맛있는 것을 먹고 파티하기", type: "E", score: 2 },
        { text: "푹 자고 원 없이 게임이나 웹툰, 영화 정주행하기", type: "I", score: 2 },
        { text: "다음 커리어 목표 설정 및 더 높은 단계 도전", type: "N", score: 1 }
      ]
    },
    {
      id: 10,
      category: "D-Day 시험 직전 마인드셋",
      question: "시험 전날, 당신의 마인드셋은 어디에 가장 가까운가요?",
      options: [
        { text: "'할 수 있는 건 다 했다. 요약집만 가볍게 복습하자.'", type: "J", score: 2 },
        { text: "'아직 부족한 게 많아...' 새벽까지 밤샘 암기를 감행한다.", type: "P", score: 2 },
        { text: "'실수만 하지 말자!' 마인드 컨트롤과 멘탈 관리에 집중한다.", type: "F", score: 1 },
        { text: "시험장 동선, 시간 배분, 준비물 목록을 최종 점검한다.", type: "T", score: 2 },
        { text: "불안해서 잠이 오지 않아 시험 후의 내 모습을 상상해본다.", type: "N", score: 2 }
      ]
    }
  ];

  // 16 MBTI Personality Counseling Profiles
  const mbtiProfiles = {
    INTJ: {
      character: "완벽주의 전략 설계자",
      colorName: "미드나잇 네이비",
      colorCode: "#1e3a8a",
      icon: "fa-solid fa-chess-queen",
      summary: "장기적인 마스터 플랜을 세우고 오차 없이 합격을 쟁취하는 전략가",
      psychDesc: "전체적인 개념 구조를 스스로 파악해야 직성이 풀리며, 학습 효율이 매우 높은 편입니다. 다만 스스로 설정한 기준이 너무 높아 목표에 도달하지 못할 때 극심한 자책과 번아웃을 겪기 쉽습니다.",
      prescriptions: [
        "100% 완벽한 이해에 집착하기보다 기출문제 회독을 통한 '실전 적용률'에 집중하세요.",
        "하루 30분은 아무것도 분석하지 않는 완전한 뇌 휴식 시간을 보장하세요.",
        "주간 스케줄에 10~15%의 '예비 버퍼 시간'을 의도적으로 비워두세요."
      ],
      sound: "딥 포커스 클래식 / 빗소리",
      item: "다크 블루 타이머 & 포스트잇"
    },
    INTP: {
      character: "논리적 개념 탐구자",
      colorName: "일렉트릭 사이언",
      colorCode: "#06b6d4",
      icon: "fa-solid fa-atom",
      summary: "원리와 메커니즘을 깊게 파고들어 난해한 이론을 정복하는 이론가",
      psychDesc: "왜 그런 공식이 나왔는지 이해하는 데 큰 흥미를 느끼지만, 반복적인 단순 암기와 세부 일정 관리를 답답해하는 경향이 있습니다. 시험 후반부로 갈수록 루틴이 무너질 위험이 있습니다.",
      prescriptions: [
        "지엽적인 호기심에 빠져 진도가 정체되지 않도록 타이머로 한 단원당 제한 시간을 두세요.",
        "정리 노트를 예쁘게 만들기보다 키워드 백지 복습법(Feynman Technique)을 활용하세요.",
        "오전/오후로 공부 과목을 나누어 지루함을 분산시키는 것이 효과적입니다."
      ],
      sound: "브레인웨이브 바이노럴 비트",
      item: "무소음 타이머 & 얇은 젤펜"
    },
    ENTJ: {
      character: "단기 돌파형 수험 사령관",
      colorName: "로열 퍼플",
      colorCode: "#7e22ce",
      icon: "fa-solid fa-crown",
      summary: "명확한 목표 의식과 불굴의 추진력으로 합격선을 압도하는 지휘관",
      psychDesc: "강한 성취욕과 경쟁력을 바탕으로 계획을 뚝심 있게 밀어붙입니다. 그러나 시험 직전 컨디션 조절이나 사소한 실수에 예민해질 수 있으며 감정적 피로를 억누르는 경향이 있습니다.",
      prescriptions: [
        "자신을 지나치게 한계까지 몰아붙이지 말고, 수면 시간을 최소 6시간 사수하세요.",
        "단기 목표를 체크할 때 '달성한 것'에 집중하고 자신에게 긍정적인 피드백을 주세요.",
        "주변 사람들과의 지나친 비교나 자존심 싸움은 에너지 낭비이므로 철저히 차단하세요."
      ],
      sound: "웅장한 에픽 사운드트랙",
      item: "가죽 바인더 플래너"
    },
    ENTP: {
      character: "번뜩이는 창의적 승부사",
      colorName: "선셋 오렌지",
      colorCode: "#ea580c",
      icon: "fa-solid fa-bolt",
      summary: "뛰어난 두뇌 회전과 직관으로 핵심을 빠르게 꿰뚫는 전략형 도전자",
      psychDesc: "새로운 이론이나 복잡한 문제를 풀 때는 높은 몰입도를 보이지만, 긴 수험 기간 동안 같은 내용을 반복 복습하는 지루함을 견디기 힘들어합니다. 벼락치기 유혹에 빠지기 쉽습니다.",
      prescriptions: [
        "공부 장소를 주기적으로 바꾸거나(독서실, 카페 등) 학습 방식을 리프레시하세요.",
        "문제를 스스로에게 혹은 가상의 청중에게 설명하듯 강의하는 방식으로 공부해보세요.",
        "목표 분량을 작은 퀘스트 단위로 쪼개어 즉각적인 성취감을 얻으세요."
      ],
      sound: "업비트 로파이 힙합",
      item: "화이트보드 & 멀티 형광펜"
    },
    INFJ: {
      character: "심층 통찰의 멘토 수험생",
      colorName: "에메랄드 딥그린",
      colorCode: "#047857",
      icon: "fa-solid fa-tree",
      summary: "자기만의 뚜렷한 소명과 신념으로 조용하고 묵직하게 정진하는 현자",
      psychDesc: "자격증 취득이 가져올 인생의 의미와 가치를 중요시합니다. 혼자만의 시간을 통해 에너지를 충전하지만, 미래에 대한 막연한 불안과 타인의 기대감이 큰 심리적 부담으로 작용합니다.",
      prescriptions: [
        "'내가 왜 이 시험을 시작했는가'에 대한 비전 노트를 시험대에 부착해 두세요.",
        "타인의 시선이나 잔소리에 마음을 다치지 않도록 SNS와 메신저를 일시 차단하세요.",
        "잠들기 전 5분간 마음챙김 명상과 복식호흡으로 뇌의 과열을 식혀주세요."
      ],
      sound: "숲속 잔잔한 바람 & 새소리",
      item: "마인드 일기장 & 허브 아로마 오일"
    },
    INFP: {
      character: "감성 몰입형 열정 수험생",
      colorName: "라벤더 소프트바이올렛",
      colorCode: "#9333ea",
      icon: "fa-solid fa-wand-magic-sparkles",
      summary: "자신만의 페이스로 마음의 울림을 따라 정성을 다하는 힐링러",
      psychDesc: "컨디션이나 감정 기복이 학습 집중력에 큰 영향을 미칩니다. 자책감이 한번 찾아오면 며칠 동안 슬럼프에 빠질 수 있으므로 감정 관리와 자기 격려가 합격의 핵심 열쇠입니다.",
      prescriptions: [
        "계획표가 하루 틀어져도 '그럴 수 있지, 지금부터 하면 돼'라는 자기자비가 필수입니다.",
        "공부하는 책상을 아늑하고 좋아하는 소품들로 꾸며 안정감을 높이세요.",
        "오늘 하루 스스로 칭찬할 점 3가지를 매일 밤 기록해 보세요."
      ],
      sound: "따뜻한 어쿠스틱 기타 & 피아노",
      item: "파스텔톤 스티커 & 감성 텀블러"
    },
    ENFJ: {
      character: "희망과 긍정의 페이스메이커",
      colorName: "웜 코랄",
      colorCode: "#e11d48",
      icon: "fa-solid fa-heart",
      summary: "주변과 선한 영향력을 나누며 긍정적인 에너지로 앞장서는 동기부여가",
      psychDesc: "타인과의 상호작용에서 큰 에너지를 얻으며, 스터디나 그룹 활동에서 뛰어난 학습 효율을 보입니다. 하지만 남들을 챙기느라 정작 본인의 학습 진도가 밀릴 수 있습니다.",
      prescriptions: [
        "수험 기간만큼은 '나의 합격'을 최우선 순위로 두고 거절하는 연습을 하세요.",
        "서로 긍정적인 자극을 주는 열정적인 1~2명의 메이트와 기상/착석 인증만 진행하세요.",
        "주기적으로 내가 도달한 성과를 시각화하여 스스로를 아낌없이 칭찬하세요."
      ],
      sound: "희망찬 어쿠스틱 팝",
      item: "동기부여 명언 카드 & 비타민"
    },
    ENFP: {
      character: "열정 가득한 비전 탐험가",
      colorName: "비비드 옐로우",
      colorCode: "#ca8a04",
      icon: "fa-solid fa-sun",
      summary: "합격 후 펼쳐질 눈부신 미래를 그리며 무한한 잠재력을 폭발시키는 열정가",
      psychDesc: "동기부여가 확실할 때는 엄청난 속도로 분량을 돌파하지만, 반복되는 지루한 문제 풀이에는 쉽게 주의가 분산됩니다. 후반부 끈기 유지가 당락을 좌우합니다.",
      prescriptions: [
        "포모도로 기법 (25분 초집중 + 5분 완전 휴식)을 적용해 리듬감을 유지하세요.",
        "합격 후 가고 싶은 여행지나 하고 싶은 위시리스트를 시각화하여 붙여두세요.",
        "기출문제를 게임 퀘스트처럼 점수 깨기 챌린지로 접근해 흥미를 유지하세요."
      ],
      sound: "경쾌한 칠아웃 로파이",
      item: "타이머 시계 & 컬러풀 인덱스 탭"
    },
    ISTJ: {
      character: "철두철미한 정석 마스터",
      colorName: "클래식 슬레이트 블루",
      colorCode: "#334155",
      icon: "fa-solid fa-shield-halved",
      summary: "정해진 루틴을 묵묵히 완수하며 흔들림 없이 정상에 도달하는 완벽주의자",
      psychDesc: "규칙과 체계를 철저히 지키며 꾸준함에서 타의 추종을 불허합니다. 하지만 시험 유형이 갑자기 변하거나 계획에 차질이 생기면 유연하게 대처하기 어려워 스트레스를 받습니다.",
      prescriptions: [
        "100% 계획대로 되지 않더라도 유연하게 넘어가는 임기응변 마인드를 기르세요.",
        "신유형이나 난해한 문제는 너무 오래 붙잡지 말고 과감히 별표 치고 넘어가세요.",
        "주말에는 가벼운 스트레칭이나 산책으로 몸의 경직을 풀어주세요."
      ],
      sound: "백색소음 (도서관 소음 / 빗소리)",
      item: "초정밀 스톱워치 & 0.38mm 흑색펜"
    },
    ISFJ: {
      character: "성실한 디테일 수호자",
      colorName: "세이지 소프트그린",
      colorCode: "#0d9488",
      icon: "fa-solid fa-hand-holding-heart",
      summary: "작은 개념 하나 놓치지 않고 꼼꼼하고 착실하게 탑을 쌓아 올리는 실력파",
      psychDesc: "오답 노트 정리와 개념 정리가 매우 꼼꼼하며 인내심이 강합니다. 그러나 시험에 대한 지나친 걱정과 압박감으로 시험 당일 실전 긴장도가 높아질 수 있습니다.",
      prescriptions: [
        "시험 2주 전부터는 새로운 내용을 보지 말고 보던 단권화 교재만 무한 반복하세요.",
        "시험장과 유사한 환경(OMR 마킹, 실전 시간 배분) 모의고사를 최소 3회 이상 연습하세요.",
        "'나는 이미 충분히 준비되었다'는 확신을 담은 자기 암시를 매일 아침 읊으세요."
      ],
      sound: "포근한 모닥불 장작 소리",
      item: "손목 보호대 & 따뜻한 보온병"
    },
    ESTJ: {
      character: "빈틈없는 수험 총사령관",
      colorName: "차콜 블랙",
      colorCode: "#1e293b",
      icon: "fa-solid fa-gavel",
      summary: "시간과 자원을 가장 효율적으로 통제하여 단기간에 결과를 뽑아내는 실전형 리더",
      psychDesc: "현실적이고 실용적인 학습법을 선호하며 진도율과 합격 컷 분석에 능합니다. 하지만 슬럼프를 겪는 자신이나 타인을 비효율적이라고 자책하며 마음의 여유를 잃기 쉽습니다.",
      prescriptions: [
        "공부뿐만 아니라 식사, 수면, 운동도 합격을 위한 '필수 과목'으로 편성하세요.",
        "문제를 풀 때 감정을 섞지 말고 통계와 데이터(오답 빈도)에 기반해 약점을 보완하세요.",
        "하루 15분 스트레칭으로 목과 어깨의 긴장을 풀어주세요."
      ],
      sound: "규칙적인 메트로놈 사운드",
      item: "A4 그리드 모눈패드 & 스틸 자"
    },
    ESFJ: {
      character: "활력 넘치는 긍정 메이커",
      colorName: "스위트 피치",
      colorCode: "#f43f5e",
      icon: "fa-solid fa-face-smile",
      summary: "주변과 조화를 이루며 따뜻한 격려 속에서 최고의 학습 효율을 내는 모범생",
      psychDesc: "가족이나 지인의 응원과 인정이 최고의 학습 촉진제입니다. 반대로 주변의 부정적인 피드백이나 불합격에 대한 두려움에 쉽게 마음이 흔들릴 수 있습니다.",
      prescriptions: [
        "시험 준비 중에는 부정적인 말을 하는 사람과의 만남을 잠시 멀리하세요.",
        "나를 진심으로 응원해 주는 사람들의 편지나 메시지를 책상 앞에 붙여두세요.",
        "오늘 하루 목표를 달성했을 때 좋아하는 디저트나 간식으로 작은 보상을 주세요."
      ],
      sound: "밝고 차분한 피아노 멜로디",
      item: "휴대용 쿠션 & 아기자기한 메모지"
    },
    ISTP: {
      character: "냉철한 실전 트러블슈터",
      colorName: "스틸 그레이",
      colorCode: "#475569",
      icon: "fa-solid fa-wrench",
      summary: "군더더기 없이 핵심만 공략하여 최소한의 노력으로 최대 결과를 내는 효율파",
      psychDesc: "불필요한 이론 암기보다 기출문제 풀이와 실전 기술 적용에 강합니다. 그러나 흥미가 떨어지면 책을 아예 덮어버리는 벼락치기 기질이 있어 꾸준한 루틴 유지가 필요합니다.",
      prescriptions: [
        "두꺼운 기본서보다 기출문제 5개년치를 먼저 풀고 역으로 개념을 채워 넣으세요.",
        "하루 공부 시작 시간을 엄격하게 고정하여 최소 착석 시간을 확보하세요.",
        "오답 정리는 길게 쓰지 말고 키워드 1줄 코멘트 방식으로 간결하게 끝내세요."
      ],
      sound: "딥 하우스 앰비언트",
      item: "기계식 카운터 & 멀티툴 펜"
    },
    ISFP: {
      character: "평온한 마이페이스 장인",
      colorName: "파스텔 민트",
      colorCode: "#14b8a6",
      icon: "fa-solid fa-palette",
      summary: "남들과 비교하지 않고 자신만의 호흡으로 차분하게 완주하는 예술가형 수험생",
      psychDesc: "강한 압박감이나 타이트한 시간표에 갇히면 오히려 무기력해집니다. 심리적으로 편안하고 압박이 적은 환경에서 가장 높은 학습 집중도를 발휘합니다.",
      prescriptions: [
        "시간 단위 계획보다는 '오늘 끝낼 분량(할 일 3가지)' 위주로 심플하게 계획하세요.",
        "답답한 실내에만 있지 말고 하루 한 번 햇볕을 쬐며 20분간 산책하세요.",
        "나만의 편안한 공부 브금과 조명을 세팅하여 심리적 안정 구역을 만드세요."
      ],
      sound: "따뜻한 카페 앰비언스 & 재즈",
      item: "눈 피로 회복 온열 안대"
    },
    ESTP: {
      character: "당당한 승부사 챌린저",
      colorName: "스파크 앰버",
      colorCode: "#d97706",
      icon: "fa-solid fa-fire",
      summary: "시험장의 긴장감을 짜릿한 승부로 즐기며 실전에 유독 강한 본투비 승부사",
      psychDesc: "순발력과 문제 해결 감각이 뛰어나며 실전 시험장에서 평소보다 높은 점수를 받기도 합니다. 하지만 장기전에서 기초 기본기 다지기를 소홀히 하기 쉽습니다.",
      prescriptions: [
        "모의고사 실전 모의 테스트를 자주 치러 실전 감각을 극대화하세요.",
        "취약한 기본 암기 파트는 플래시 카드 앱(Anki 등)을 이용해 틈틈이 외우세요.",
        "운동이나 가벼운 헬스로 신체 에너지를 발산하여 집중력을 리셋하세요."
      ],
      sound: "에너지틱 칠합 비트",
      item: "에너지 음료 & 손목 밴드"
    },
    ESFP: {
      character: "스파클링 분위기 메이커",
      colorName: "샤인 핑크",
      colorCode: "#ec4899",
      icon: "fa-solid fa-sparkles",
      summary: "지루한 수험 생활도 유쾌한 챌린지로 바꾸며 주변을 밝히는 활력 수험생",
      psychDesc: "공부 자체를 즐거운 놀이처럼 구성할 때 높은 성과를 냅니다. 하지만 혼자 고립되어 장시간 공부할 때 쉽게 우울감과 고독감을 느끼며 집중력이 저하됩니다.",
      prescriptions: [
        "열심히 공부하는 친구들과 화상 스터디(구글 미트/열품타)로 자극을 받으세요.",
        "단원 하나를 끝낼 때마다 스티커를 붙이거나 체크리스트를 지우며 시각적 쾌감을 얻으세요.",
        "공부 후 나를 위한 확실한 힐링 시간(맛있는 식사, 짧은 영상)을 보상으로 주세요."
      ],
      sound: "청량한 시티팝 & 어쿠스틱",
      item: "컬러풀 플래너 & 알록달록 스티커"
    }
  };

  // Calming Quotes for Mind Relaxation Screen
  const relaxQuotes = [
    '"천천히 숨을 들이쉬고, 편안한 마음으로 답해주세요."',
    '"남들과 비교하지 마세요. 당신만의 속도가 가장 완벽합니다."',
    '"지금 이 순간의 노력이 반드시 합격의 결실로 돌아옵니다."',
    '"잠시 어깨를 내리고, 편안하게 심호흡해 보세요."',
    '"모든 불안은 지나갑니다. 당신은 해낼 수 있습니다."',
    '"차분하게 마음을 가다듬고 다음 질문을 마주해 보세요."'
  ];

  // Google Apps Script API Endpoint
  const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx-H8u6aUnUGVA5R-W3QwRLPkpG_Yo_UsUxk28k38tmYScz0mPyI6-CWmFr0D1GdhwMJQ/exec";

  // ==========================================
  // 2. STATE MANAGEMENT
  // ==========================================
  let userInfo = {
    name: '',
    phone: '',
    address: '',
    email: '',
    certType: ''
  };

  let currentQuestionIndex = 0;
  let userAnswers = []; // stores selected options

  // Score Accumulators for MBTI Dichotomies
  let mbtiScores = {
    E: 0, I: 0,
    S: 0, N: 0,
    T: 0, F: 0,
    J: 0, P: 0
  };

  let calculatedMBTI = 'INTJ';

  // ==========================================
  // 3. DOM ELEMENTS
  // ==========================================
  const viewLanding = document.getElementById('view-landing');
  const viewRelax = document.getElementById('view-relax');
  const viewQuiz = document.getElementById('view-quiz');
  const viewResult = document.getElementById('view-result');

  // Form Elements
  const userInfoForm = document.getElementById('user-info-form');
  const inputName = document.getElementById('input-name');
  const inputPhone = document.getElementById('input-phone');
  const inputAddress = document.getElementById('input-address');
  const inputEmail = document.getElementById('input-email');

  // Error Messages
  const errName = document.getElementById('err-name');
  const errPhone = document.getElementById('err-phone');
  const errAddress = document.getElementById('err-address');
  const errEmail = document.getElementById('err-email');

  // Relax View Elements
  const relaxQuote = document.getElementById('relax-quote');

  // Quiz View Elements
  const quizStepBadge = document.getElementById('quiz-step-badge');
  const quizPercent = document.getElementById('quiz-percent');
  const progressFill = document.getElementById('progress-fill');
  const qCategory = document.getElementById('q-category');
  const qTitle = document.getElementById('q-title');
  const optionsContainer = document.getElementById('options-container');

  // Result View Elements
  const resultSavingBar = document.getElementById('result-saving-bar');
  const captureResultCard = document.getElementById('capture-result-card');
  const resUserName = document.getElementById('res-user-name');
  const resColorPill = document.getElementById('res-color-pill');
  const resColorDot = document.getElementById('res-color-dot');
  const resColorName = document.getElementById('res-color-name');
  const resAvatarWrap = document.getElementById('res-avatar-wrap');
  const resCharIcon = document.getElementById('res-char-icon');
  const resMbtiType = document.getElementById('res-mbti-type');
  const resCharTitle = document.getElementById('res-char-title');
  const resCharSummary = document.getElementById('res-char-summary');

  // Trait Bar Elements
  const fillE = document.getElementById('fill-e');
  const fillI = document.getElementById('fill-i');
  const fillS = document.getElementById('fill-s');
  const fillN = document.getElementById('fill-n');
  const fillT = document.getElementById('fill-t');
  const fillF = document.getElementById('fill-f');
  const fillJ = document.getElementById('fill-j');
  const fillP = document.getElementById('fill-p');

  // Analysis Elements
  const resPsychDesc = document.getElementById('res-psych-desc');
  const resPrescriptionList = document.getElementById('res-prescription-list');
  const resBoostSound = document.getElementById('res-boost-sound');
  const resBoostItem = document.getElementById('res-boost-item');

  // Action Buttons
  const btnDownloadImage = document.getElementById('btn-download-image');
  const btnShareLink = document.getElementById('btn-share-link');
  const btnRestartTest = document.getElementById('btn-restart-test');
  const toastContainer = document.getElementById('toast-container');

  // ==========================================
  // 4. VIEW ROUTING & HELPERS
  // ==========================================
  function switchView(targetView) {
    [viewLanding, viewRelax, viewQuiz, viewResult].forEach(v => {
      v.classList.remove('active');
      v.setAttribute('aria-hidden', 'true');
    });

    targetView.classList.add('active');
    targetView.setAttribute('aria-hidden', 'false');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function showToast(message, iconClass = 'fa-solid fa-circle-check') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="${iconClass}"></i><span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 3000);
  }

  // Auto phone formatting (010-XXXX-XXXX)
  inputPhone.addEventListener('input', (e) => {
    let val = e.target.value.replace(/[^0-9]/g, '');
    if (val.length > 11) val = val.substring(0, 11);

    if (val.length > 7) {
      e.target.value = val.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    } else if (val.length > 3) {
      e.target.value = val.replace(/(\d{3})(\d{3,4})/, '$1-$2');
    } else {
      e.target.value = val;
    }
  });

  // ==========================================
  // 5. LANDING VIEW & FORM VALIDATION
  // ==========================================
  userInfoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    // Validate Name
    const nameVal = inputName.value.trim();
    if (!nameVal || nameVal.length < 2) {
      inputName.parentElement.classList.add('has-error');
      errName.textContent = '성함을 2자 이상 정확히 입력해 주세요.';
      isValid = false;
    } else {
      inputName.parentElement.classList.remove('has-error');
      errName.textContent = '';
    }

    // Validate Phone
    const phoneVal = inputPhone.value.trim();
    const phoneRegex = /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/;
    if (!phoneVal || !phoneRegex.test(phoneVal)) {
      inputPhone.parentElement.classList.add('has-error');
      errPhone.textContent = '올바른 휴대폰 번호 형식을 입력해 주세요 (예: 010-1234-5678).';
      isValid = false;
    } else {
      inputPhone.parentElement.classList.remove('has-error');
      errPhone.textContent = '';
    }

    // Validate Address
    const addressVal = inputAddress.value.trim();
    if (!addressVal || addressVal.length < 2) {
      inputAddress.parentElement.classList.add('has-error');
      errAddress.textContent = '거주지 주소(시/군/구)를 입력해 주세요.';
      isValid = false;
    } else {
      inputAddress.parentElement.classList.remove('has-error');
      errAddress.textContent = '';
    }

    // Validate Email
    const emailVal = inputEmail.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailVal || !emailRegex.test(emailVal)) {
      inputEmail.parentElement.classList.add('has-error');
      errEmail.textContent = '올바른 이메일 주소를 입력해 주세요.';
      isValid = false;
    } else {
      inputEmail.parentElement.classList.remove('has-error');
      errEmail.textContent = '';
    }

    if (!isValid) {
      showToast('필수 입력 항목을 확인해 주세요.', 'fa-solid fa-triangle-exclamation');
      return;
    }

    // Save User Info
    userInfo.name = nameVal;
    userInfo.phone = phoneVal;
    userInfo.address = addressVal;
    userInfo.email = emailVal;

    // Start Quiz with Relaxation Animation
    currentQuestionIndex = 0;
    userAnswers = [];
    mbtiScores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

    playRelaxTransition(() => {
      renderQuestion(currentQuestionIndex);
      switchView(viewQuiz);
    });
  });

  // ==========================================
  // 6. RELAX TRANSITION ANIMATION (1 Second)
  // ==========================================
  function playRelaxTransition(onComplete) {
    // Pick random quote
    const randomQuote = relaxQuotes[Math.floor(Math.random() * relaxQuotes.length)];
    relaxQuote.textContent = randomQuote;

    switchView(viewRelax);

    // 1-second calming animation
    setTimeout(() => {
      onComplete();
    }, 1000);
  }

  // ==========================================
  // 7. QUIZ ENGINE
  // ==========================================
  function renderQuestion(index) {
    const qData = questions[index];
    if (!qData) return;

    // Update Progress
    const stepNum = index + 1;
    const totalSteps = questions.length;
    const percent = Math.round((stepNum / totalSteps) * 100);

    quizStepBadge.textContent = `Q. ${stepNum < 10 ? '0' + stepNum : stepNum} / ${totalSteps}`;
    quizPercent.textContent = `${percent}%`;
    progressFill.style.width = `${percent}%`;

    // Update Category & Title
    qCategory.textContent = qData.category;
    qTitle.textContent = qData.question;

    // Render Options
    optionsContainer.innerHTML = '';
    qData.options.forEach((opt, optIdx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'option-btn';
      btn.setAttribute('data-index', optIdx);

      btn.innerHTML = `
        <span class="option-num">${optIdx + 1}</span>
        <span class="option-text">${opt.text}</span>
      `;

      btn.addEventListener('click', () => handleOptionSelect(opt, btn));
      optionsContainer.appendChild(btn);
    });
  }

  function handleOptionSelect(option, btnElement) {
    // Prevent double clicking
    const allBtns = optionsContainer.querySelectorAll('.option-btn');
    allBtns.forEach(b => b.classList.remove('selected'));
    btnElement.classList.add('selected');

    // Record answer
    userAnswers.push(option);

    // If Q1, capture certType
    if (currentQuestionIndex === 0) {
      userInfo.certType = option.text;
    }

    // Apply MBTI Score
    if (option.type && mbtiScores.hasOwnProperty(option.type)) {
      mbtiScores[option.type] += (option.score || 1);
    }

    // Move to next question or show results
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
      // 1-second transition between questions
      playRelaxTransition(() => {
        renderQuestion(currentQuestionIndex);
        switchView(viewQuiz);
      });
    } else {
      // Quiz Finished -> Calculate & Show Results
      playRelaxTransition(() => {
        finishQuiz();
      });
    }
  }

  // ==========================================
  // 8. MBTI CALCULATION & RESULT RENDER
  // ==========================================
  function finishQuiz() {
    // Determine 4-letter MBTI
    const ei = mbtiScores.E > mbtiScores.I ? 'E' : 'I';
    const sn = mbtiScores.S >= mbtiScores.N ? 'S' : 'N';
    const tf = mbtiScores.T >= mbtiScores.F ? 'T' : 'F';
    const jp = mbtiScores.J >= mbtiScores.P ? 'J' : 'P';

    calculatedMBTI = `${ei}${sn}${tf}${jp}`;
    const profile = mbtiProfiles[calculatedMBTI] || mbtiProfiles.INTJ;

    // Render Result UI
    resUserName.textContent = userInfo.name;
    resColorName.textContent = profile.colorName;
    resColorDot.style.backgroundColor = profile.colorCode;
    resColorDot.style.color = profile.colorCode;

    resAvatarWrap.style.borderColor = profile.colorCode;
    resCharIcon.className = profile.icon;
    resCharIcon.style.color = profile.colorCode;

    resMbtiType.textContent = calculatedMBTI;
    resCharTitle.textContent = profile.character;
    resCharSummary.textContent = profile.summary;

    // Render Trait Percentages
    const calcRatio = (valA, valB) => {
      const total = valA + valB || 1;
      const pA = Math.round((valA / total) * 100);
      const pB = 100 - pA;
      return { pA, pB };
    };

    const eiRatio = calcRatio(mbtiScores.E, mbtiScores.I);
    fillE.style.width = `${eiRatio.pA}%`;
    fillI.style.width = `${eiRatio.pB}%`;

    const snRatio = calcRatio(mbtiScores.S, mbtiScores.N);
    fillS.style.width = `${snRatio.pA}%`;
    fillN.style.width = `${snRatio.pB}%`;

    const tfRatio = calcRatio(mbtiScores.T, mbtiScores.F);
    fillT.style.width = `${tfRatio.pA}%`;
    fillF.style.width = `${tfRatio.pB}%`;

    const jpRatio = calcRatio(mbtiScores.J, mbtiScores.P);
    fillJ.style.width = `${jpRatio.pA}%`;
    fillP.style.width = `${jpRatio.pB}%`;

    // Render Descriptions & Prescriptions
    resPsychDesc.textContent = profile.psychDesc;

    resPrescriptionList.innerHTML = '';
    profile.prescriptions.forEach(p => {
      const li = document.createElement('li');
      li.textContent = p;
      resPrescriptionList.appendChild(li);
    });

    resBoostSound.textContent = profile.sound;
    resBoostItem.textContent = profile.item;

    switchView(viewResult);

    // Send Data to Google Apps Script API
    sendDataToGoogleAppsScript(profile.character);
  }

  // ==========================================
  // 9. GOOGLE APPS SCRIPT API INTEGRATION
  // ==========================================
  async function sendDataToGoogleAppsScript(character) {
    const payload = {
      name: userInfo.name,
      phone: userInfo.phone,
      address: userInfo.address,
      email: userInfo.email,
      certType: userInfo.certType || '미지정',
      mbtiResult: calculatedMBTI,
      character: character,
      timestamp: new Date().toISOString()
    };

    resultSavingBar.style.display = 'flex';
    resultSavingBar.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i><span>진단 결과를 분석 서버에 안전하게 저장 중입니다...</span>`;

    try {
      // POST with mode: no-cors as specified
      await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      resultSavingBar.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--neon-emerald)"></i><span>진단 데이터가 상담 서버에 성공적으로 동기화되었습니다.</span>`;
      setTimeout(() => {
        resultSavingBar.style.display = 'none';
      }, 3500);
    } catch (err) {
      console.warn('Google Sheets API submission notice:', err);
      resultSavingBar.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--neon-emerald)"></i><span>진단 결과 생성이 완료되었습니다.</span>`;
      setTimeout(() => {
        resultSavingBar.style.display = 'none';
      }, 3000);
    }
  }

  // ==========================================
  // 10. RESULT CARD IMAGE DOWNLOAD (html2canvas)
  // ==========================================
  btnDownloadImage.addEventListener('click', async () => {
    btnDownloadImage.disabled = true;
    btnDownloadImage.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>이미지 생성 중...</span>`;

    try {
      if (typeof html2canvas === 'undefined') {
        throw new Error('html2canvas library not loaded');
      }

      const canvas = await html2canvas(captureResultCard, {
        backgroundColor: '#090d16',
        scale: 2, // Retina quality
        useCORS: true,
        logging: false
      });

      const imageURL = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      const sanitizedName = userInfo.name.replace(/[^a-zA-Z0-9가-힣]/g, '') || '수험생';
      downloadLink.download = `MBTI_수험생진단결과_${sanitizedName}_${calculatedMBTI}.png`;
      downloadLink.href = imageURL;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      showToast('결과 카드 이미지가 저장되었습니다!');
    } catch (error) {
      console.error('Image capture failed:', error);
      showToast('이미지 저장 중 오류가 발생했습니다. 브라우저 설정을 확인해 주세요.', 'fa-solid fa-circle-xmark');
    } finally {
      btnDownloadImage.disabled = false;
      btnDownloadImage.innerHTML = `<i class="fa-solid fa-download"></i> <span>결과 카드 이미지 다운로드</span>`;
    }
  });

  // Share Link Handler
  btnShareLink.addEventListener('click', async () => {
    const currentUrl = window.location.href;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(currentUrl);
        showToast('진단 링크가 클립보드에 복사되었습니다!');
      } catch (e) {
        fallbackCopy(currentUrl);
      }
    } else {
      fallbackCopy(currentUrl);
    }
  });

  function fallbackCopy(text) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showToast('진단 링크가 클립보드에 복사되었습니다!');
  }

  // Restart Test Handler
  btnRestartTest.addEventListener('click', () => {
    userInfoForm.reset();
    inputName.parentElement.classList.remove('has-error');
    inputPhone.parentElement.classList.remove('has-error');
    inputAddress.parentElement.classList.remove('has-error');
    inputEmail.parentElement.classList.remove('has-error');
    errName.textContent = '';
    errPhone.textContent = '';
    errAddress.textContent = '';
    errEmail.textContent = '';
    
    switchView(viewLanding);
  });
});
