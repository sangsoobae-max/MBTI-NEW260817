// 1. 구글 앱스 스크립트 웹앱 URL
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx-H8u6aUnUGVA5R-W3QwRLPkpG_Yo_UsUxk28k38tmYScz0mPyI6-CWmFr0D1GdhwMJQ/exec";

// 2. 질문 데이터 (10개 문항)
const questions = [
  {
    id: 1,
    question: "현재 가장 집중적으로 준비하고 계신 자격증 유형은 무엇인가요?",
    options: [
      { text: "전문직 자격증 (변호사, 회계사, 세무사, 노무사 등)", type: "J", score: 2 },
      { text: "국가기술 / IT 자격증 (정보처리기사, 전기기사 등)", type: "T", score: 2 },
      { text: "공무원 / 공기업 / 임용 고시", type: "J", score: 1 },
      { text: "어학 / 금융 / 민간 전문 자격증", type: "P", score: 1 },
      { text: "기타 자기계발 및 취업 대비 자격증", type: "P", score: 2 }
    ]
  },
  {
    id: 2,
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
    question: "시험공부를 할 때 선호하는 공간과 환경은 어떤 스타일인가요?",
    options: [
      { text: "적막하고 집중도가 높은 독서실 / 스터디 카페", type: "I", score: 2 },
      { text: "적당한 백색소음이 있는 오픈형 카페", type: "E", score: 1 },
      { text: "집 안 내 방 (가장 편안하고 이동 시간이 없는 곳)", type: "I", score: 1 },
      { text: "스터디 모임이나 스터디원들과 함께하는 공간", "type": "E", score: 2 },
      { text: "매일 장소를 바꾸며 스터디 카페 투어하기", type: "P", score: 1 }
    ]
  },
  {
    id: 7,
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
    question: "주변 사람들에게 내 자격증 시험 준비 사실을 얼마나 알렸나요?",
    options: [
      { text: "아무에게도 알리지 않고 비밀리에 혼자 준비 중이다.", type: "I", score: 2 },
      { text: "가장 가까운 가족이나 친한 친구 몇 명에게만 알렸다.", type: "I", score: 1 },
      { text: "SNS나 주변 지인들에게 널리 알리고 배수진을 쳤다.", type: "E", score: 2 },
      { text: "스터디 그룹을 적극적으로 찾아 함께 공부하고 있다.", type: "E", score: 1 },
      { text: "묻는 사람에게만 대답하고 굳이 먼저 말하지 않는다.", type: "S", "score": 1 }
    ]
  },
  {
    id: 9,
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

// 3. MBTI 결과 데이터셋 (캐릭터 및 설명)
const mbtiResultsData = {
  INTJ: { character: "철저한 전략가 벼락이", desc: "치밀한 계획과 체계적인 분석으로 시험을 지배하는 유형입니다." },
  INTP: { character: "지적 탐구자 아이디어맨", desc: "원리를 이해해야 직성이 풀리는 논리적인 수험생입니다." },
  ENTJ: { character: "불타는 야망의 리더", desc: "목표 달성을 위해 거침없이 돌진하는 불꽃 같은 수험생입니다." },
  ENTP: { character: "임기응변의 번개맨", desc: "벼락치기와 창의적인 순발력으로 위기를 극복하는 유형입니다." },
  INFJ: { character: "마인드 컨트롤 힐러", desc: "깊은 직관과 조용한 집중력으로 멘탈을 다스리는 수험생입니다." },
  INFP: { character: "감성 꿈꾸는 힐러", desc: "합격 후의 내 모습을 그리며 진정성 있게 준비하는 유형입니다." },
  ENFJ: { character: "함께 합격하는 페이스메이커", desc: "주변 사람들과 스터디하며 시너지를 내는 수험생입니다." },
  ENFP: { character: "에너지 넘치는 모험가", desc: "지루함을 피하고 재미있게 공부를 이끌어가는 유형입니다." },
  ISTJ: { character: "정석적인 완벽주의자", desc: "꾸준함과 철저한 루틴으로 승부하는 가장 안정적인 수험생입니다." },
  ISFJ: { character: "묵묵한 수호자", desc: "배운 내용을 차분히 복습하며 세심하게 챙기는 유형입니다." },
  ESTJ: { character: "강철 멘탈 집행관", desc: "철저한 시간 관리와 실천력으로 목표를 찍어누르는 유형입니다." },
  ESFJ: { character: "따뜻한 스터디 분위기메이커", desc: "주변의 응원을 자양분 삼아 힘을 내는 수험생입니다." },
  ISTP: { character: "핵심만 노리는 실전파", desc: "최소한의 노력으로 최대의 효과를 내는 효율 중시형 수험생입니다." },
  ISFP: { character: "마이페이스 마인드키퍼", desc: "자신만의 페이스를 유지하며 스트레스를 최소화하는 유형입니다." },
  ESTP: { character: "승부사 스타일", desc: "실전 모의고사와 문제 풀이에 강력한 몰입도를 보이는 수험생입니다." },
  ESFP: { character: "긍정 에너지 벼락이", desc: "낙천적인 태도로 시험 전날까지 멘탈을 유지하는 유형입니다." }
};

// 4. 상태 관리 변수
let userInfo = { name: '', phone: '', address: '', email: '' };
let userScores = { E:0, I:0, S:0, N:0, T:0, F:0, J:0, P:0 };
let selectedCertType = '';
let currentQuestionIndex = 0;
let finalMbtiResult = null;

// 5. 구글 시트로 데이터 전송 (저장 & 이메일 발송)
async function sendToGoogleSheet(actionType = 'save') {
  const payload = {
    action: actionType, // 'save' 또는 'email'
    name: userInfo.name,
    phone: userInfo.phone,
    address: userInfo.address,
    email: userInfo.email,
    certType: selectedCertType,
    mbtiResult: finalMbtiResult.type,
    character: finalMbtiResult.character,
    description: finalMbtiResult.desc
  };

  try {
    await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    return true;
  } catch (error) {
    console.error("데이터 전송 실패:", error);
    return false;
  }
}

// 6. 메일 발송 버튼 클릭 이벤트
async function handleSendEmail() {
  const btn = document.getElementById('email-btn');
  if (btn) {
    btn.disabled = true;
    btn.innerText = "메일 발송 중...";
  }

  await sendToGoogleSheet('email');

  alert(`${userInfo.email} 주소로 진단 결과가 발송되었습니다!`);
  if (btn) {
    btn.disabled = false;
    btn.innerText = "이메일로 결과 받기";
  }
}

// 7. MBTI 결과 계산 함수
function calculateMBTI() {
  const EorI = userScores.E >= userScores.I ? 'E' : 'I';
  const SorN = userScores.S >= userScores.N ? 'S' : 'N';
  const TorF = userScores.T >= userScores.F ? 'T' : 'F';
  const JorP = userScores.J >= userScores.P ? 'J' : 'P';
  
  const mbtiType = `${EorI}${SorN}${TorF}${JorP}`;
  const resultInfo = mbtiResultsData[mbtiType] || { character: "열정적인 수험생", desc: "합격을 향해 나아가는 멋진 수험생입니다!" };
  
  return {
    type: mbtiType,
    character: resultInfo.character,
    desc: resultInfo.desc
  };
}

// 8. 질문 선택 시 처리
async function handleOptionSelect(option) {
  // 1번 질문에서 자격증 유형 저장
  if (currentQuestionIndex === 0) {
    selectedCertType = option.text;
  }

  // 점수 누적
  if (option.type && userScores.hasOwnProperty(option.type)) {
    userScores[option.type] += option.score;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    renderQuestion();
  } else {
    // 최종 결과 도출 및 시트 자동 저장
    finalMbtiResult = calculateMBTI();
    renderResult();
    await sendToGoogleSheet('save'); // 구글 시트에 실시간 저장
  }
}

// 9. 질문 화면 렌더링
function renderQuestion() {
  const app = document.getElementById('app');
  const q = questions[currentQuestionIndex];

  app.innerHTML = `
    <div class="quiz-container">
      <div class="progress-bar">Step ${currentQuestionIndex + 1} / 10</div>
      <h2 class="question-title">${q.question}</h2>
      <div class="options-list">
        ${q.options.map((opt, idx) => `
          <button class="option-btn" onclick="handleOptionSelect(questions[${currentQuestionIndex}].options[${idx}])">
            ${opt.text}
          </button>
        `).join('')}
      </div>
    </div>
  `;
}

// 10. 결과 화면 렌더링
function renderResult() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="result-container" id="result-card">
      <span class="badge">수험생 MBTI 진단 결과</span>
      <h1 class="character-title">${finalMbtiResult.character}</h1>
      <h3 class="mbti-code">${finalMbtiResult.type}</h3>
      <p class="result-desc">${finalMbtiResult.desc}</p>
      
      <div class="user-summary">
        <p><strong>수험생:</strong> ${userInfo.name}님</p>
        <p><strong>목표 자격증:</strong> ${selectedCertType}</p>
      </div>

      <div class="button-group">
        <button id="email-btn" class="action-btn email" onclick="handleSendEmail()">이메일로 결과 받기</button>
      </div>
    </div>
  `;
}

// 11. 첫 화면 (사용자 정보 입력 폼)
function renderLanding() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="landing-container">
      <h1 class="main-title">자격증 수험생 심리 테라피</h1>
      <p class="sub-title">나의 수험 성향을 진단하고 최적의 합격 전략을 찾아보세요.</p>
      
      <form id="user-form" onsubmit="handleStart(event)">
        <div class="input-group">
          <input type="text" id="name" placeholder="이름" required />
          <input type="tel" id="phone" placeholder="핸드폰번호 (010-0000-0000)" required />
          <input type="text" id="address" placeholder="주소" required />
          <input type="email" id="email" placeholder="이메일 주소" required />
        </div>
        <button type="submit" class="start-btn">테스트 시작하기</button>
      </form>
    </div>
  `;
}

// 12. 시작 버튼 클릭 핸들러
function handleStart(e) {
  e.preventDefault();
  userInfo.name = document.getElementById('name').value;
  userInfo.phone = document.getElementById('phone').value;
  userInfo.address = document.getElementById('address').value;
  userInfo.email = document.getElementById('email').value;

  renderQuestion();
}

// 앱 초기화
window.onload = renderLanding;