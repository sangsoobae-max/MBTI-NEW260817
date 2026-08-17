# 🧠 수험생 심리상담 & MBTI 성향 진단 웹 애플리케이션 (MBTI-NEW260817)

수험생의 시험 스트레스 완화, 맞춤형 학습 성향 진단 및 합격 멘탈 케어 솔루션을 제공하는 반응형 웹 서비스입니다.

---

## ✨ 핵심 기능 소개

1. **사전 기본 정보 등록 (Landing View)**
   - 수험생 성함, 핸드폰 번호(자동 하이픈 서식), 거주지 주소, 이메일 주소 입력 및 유효성 검증
   - 딥 네이비(`#0f172a`) 테마와 세련된 네온 글래스모피즘(Glassmorphism) UI

2. **10문항 정밀 심리 진단 (Quiz Flow)**
   - 수험생의 자격증 유형, 수험 동기, 슬럼프 대처법, 학습 공간 선호도 등 10가지 맞춤 문항
   - 문항 전환 시 **1초간 마음을 가다듬는 감성 릴랙스 애니메이션 & 힐링 명언** 연출
   - 5개 선택지별 MBTI 지표(E/I, S/N, T/F, J/P) 가중치 자동 채점

3. **16개 유형별 결과 리포트 & 맞춤 처방전 (Result View)**
   - 계산된 MBTI 유형별 고유 캐릭터, 퍼스널 컬러, 성향 분석 문구
   - 성향 지표 상세 그래프 (E-I, S-N, T-F, J-P 비율)
   - 수험생 맞춤 멘탈 케어 & 합격 처방 가이드, 추천 백색소음 및 행운 아이템 제공

4. **구글 앱스 스크립트 (Google Apps Script) API 자동 저장**
   - 진단 완료 시 구글 시트 백엔드로 데이터 자동 전송 (`POST`, `mode: no-cors`)
   - 전송 데이터: `{ name, phone, address, email, certType, mbtiResult, character }`

5. **결과 카드 이미지 캡처 다운로드 (html2canvas)**
   - 결과 리포트 카드를 고해상도(Retina 2x) PNG 이미지로 즉시 저장

---

## 🛠️ 기술 스택 (Tech Stack)

- **Frontend**: HTML5, Vanilla CSS3 (Custom Design System & Keyframe Animations), Modern Vanilla JavaScript (ES6+)
- **Typography & Icons**: Pretendard, Google Fonts (Outfit), FontAwesome 6
- **Capture Engine**: html2canvas (CDN)
- **Backend Sync**: Google Apps Script Web App API

---

## 🚀 로컬 실행 방법

`index.html` 파일을 웹 브라우저(Chrome, Edge 등)로 직접 열거나 Live Server 등을 통해 실행할 수 있습니다.

```bash
# 또는 간단한 로컬 서버 실행 예시
npx serve .
```

---

## 📄 라이선스

&copy; 2026 EduCare Mental Lab. All rights reserved.
