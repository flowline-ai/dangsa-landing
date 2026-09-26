/**
 * 멘토 데이터 (단일 소스)
 *
 * 메인(index.html)과 커피챗(coffee-chat/) 페이지의 멘토 카드와 상세 팝업은
 * 모두 이 파일에서 렌더링됩니다. 멘토 추가·수정·삭제는 이 배열만 고치면
 * 두 페이지에 동시에 반영됩니다.
 *
 * 사용법: 페이지에 <div class="mentor-cards" data-mentor-cards></div> 와
 * <div id="mentorModal" class="mentor-modal" data-mentor-modal-root></div> 를 두고,
 * script.js 보다 먼저 이 파일을 로드합니다.
 *
 * - image: 루트 기준 절대경로(/asset/...)로 적어야 하위 페이지에서도 깨지지 않습니다.
 * - link: 카드 클릭 시 이동할 상품 페이지. 비워두면 상세 팝업(detail)이 열립니다.
 * - detail: 상세 팝업 본문 HTML. 비워두면 팝업 없음.
 */
var MENTORS = [
  {
    id: "sim",
    company: "퍼즐웍스",
    name: "퍼즐맨",
    role: "헤드헌팅 · 15년차",
    image: "/asset/mento_simjaekwon.jpg",
    link: "https://smartstore.naver.com/flowcamp/products/13381436491",
    linkedin: "https://www.linkedin.com/in/startup-fit%E2%80%99-638518198/",
    tags: ["이직 전략", "연봉 협상", "면접 코칭"],
    detail: `
      <h2 class="mentor-modal-title">퍼즐맨 멘토</h2>
      <p class="mentor-modal-subtitle"><strong>전) 대기업 전략기획 / 현) 스타트업 CEO</strong></p>

      <h3 class="mentor-modal-h3">🔥 이런 문제를 해결합니다</h3>
      <ul class="mentor-modal-list">
        <li>이직 가능성 판단 (지금 vs 6개월 후) 연봉·조건 협상 전략</li>
        <li>기업/조직 내 합류 여부 판단</li>
      </ul>
      <blockquote class="mentor-modal-quote">
        "지금 결정하지 않으면 손해 보는 선택인지 오늘 기준으로 정리해드립니다."
      </blockquote>

      <h3 class="mentor-modal-h3">⭐ 실제 후기</h3>
      <blockquote class="mentor-modal-quote">
        "6개월 고민하던 이직 결정을 30분 만에 정리했습니다." — 김** · 스타트업 4년차 PM
      </blockquote>
      <blockquote class="mentor-modal-quote">
        "감정적 편향이 아니라 숫자와 리스크로 설명해줘서 신뢰가 갔습니다." — 이** · 대기업 12년차 기획자
      </blockquote>

      <h3 class="mentor-modal-h3">상세 경력</h3>
      <ul class="mentor-modal-list">
        <li>대기업 전략기획 <strong>10년</strong></li>
        <li>중소기업 스타트업 <strong>Series B~C</strong> 경영진 경험</li>
        <li>300명 이상 채용·평가 참여</li>
        <li>연봉 협상·조직 개편 실전 다수</li>
      </ul>
    `,
  },
  {
    id: "park",
    company: "LAIVDATA",
    name: "박수창",
    role: "Agent Foundry팀 리드 · 18년차",
    image: "/asset/mento_parksoochang.jpg",
    link: "https://smartstore.naver.com/flowcamp/products/13467413888",
    linkedin: "https://www.linkedin.com/in/soochang-park/",
    tags: ["바이브코딩", "데이터분석"],
    detail: `
      <h2 class="mentor-modal-title">박수창 멘토</h2>
      <p class="mentor-modal-subtitle"><strong>전) 현대카드 Digital CLM 팀장 / 현) 라이브데이터 Agent Foundry팀 리드</strong></p>

      <h3 class="mentor-modal-h3">🔥 이런 문제를 해결합니다</h3>
      <ul class="mentor-modal-list">
        <li>에이전트 도입을 <strong>어디서부터 손대야 할지 막막한</strong> 분 → 비즈니스 기획·PM 관점으로 우선순위와 단계를 잡아드립니다</li>
        <li>에이전트로 <strong>신사업을 검증하고 싶은데 방법을 모르는</strong> 분 → 에이전트 기반 신사업 리드·검증 경험을 바탕으로 실전 가이드를 드립니다</li>
        <li>데이터로 <strong>고객을 나누고 초개인화하고 싶은데 설계가 어려운</strong> 분 → 행동 지수·세그먼트 설계부터 실행까지 같이 정리해드립니다</li>
        <li><strong>아이디어를 빨리 검증하고 서비스로 만들고 싶은</strong> 분 → 바이브코딩·노코드로 빠르게 검증하는 방법을 함께합니다</li>
      </ul>
      <blockquote class="mentor-modal-quote">
        "멘티가 실제로 겪는 문제를 에이전트·데이터 관점으로 정의하고, 단계별로 검증할 수 있게 정리해드립니다."
      </blockquote>

      <h3 class="mentor-modal-h3">⭐ 실제 후기</h3>
      <blockquote class="mentor-modal-quote">
        "AI 에이전트 도입을 어디서부터 손대야 할지 막막했는데, 우선순위를 잡아주셨습니다." — 김** · 스타트업 PM
      </blockquote>
      <blockquote class="mentor-modal-quote">
        "데이터 기반 세그먼트 설계와 초개인화 플랫폼 경험이 정말 도움이 됐어요." — 박** · 대기업 마케터
      </blockquote>

      <h3 class="mentor-modal-h3">상세 경력</h3>
      <ul class="mentor-modal-list">
        <li><strong>LAIVDATA</strong> 이사 (2025.4~)</li>
        <li><strong>티맥스핀에이아이</strong> 상무 (2024.7~9)</li>
        <li><strong>데이타몬드</strong> 공동대표(창업) (2021.7~2024.3)</li>
        <li><strong>METAPERSONALAB</strong> CEO (2022.1~2024.2)</li>
        <li><strong>현대카드</strong> Digital CLM 팀장 (2017~2021)</li>
        <li>현대자동차 사내스타트업 육성 프로그램 참여 (2019~2021)</li>
        <li>연세대학교 경영학과</li>
      </ul>
    `,
  },
  {
    id: "jin",
    company: "전) 카카오, 네이버",
    name: "진용진",
    role: "PM · 16년차",
    image: "/asset/mento_jinyongjin.jpg",
    link: "https://smartstore.naver.com/flowcamp/products/13467430048",
    linkedin: "https://www.linkedin.com/in/yongjinjin/",
    tags: ["서비스 기획", "PM"],
    detail: `
      <h2 class="mentor-modal-title">진용진 멘토</h2>
      <p class="mentor-modal-subtitle"><strong>전) 카카오, 네이버 PM / 현) Product Coach</strong></p>

      <h3 class="mentor-modal-h3">🔥 이런 문제를 해결합니다</h3>
      <ul class="mentor-modal-list">
        <li><strong>PM으로 커리어를 시작·전환하고 싶은데 방법이 막막한</strong> 분 → 프로덕트 매니저 역량과 성장 경로를 정리해드립니다</li>
        <li>프로덕트 <strong>전략·PMF 검증이 어려운</strong> 분 → 디스커버리, 사용자 검증, 고투마켓 경험을 바탕으로 실전 가이드를 드립니다</li>
        <li><strong>AI로 PM 업무를 효율화하고 싶은</strong> 분 → Cursor for PM, SuperPM 등 AI 워크플로우 도구 경험을 공유합니다</li>
      </ul>
      <blockquote class="mentor-modal-quote">
        "멘티가 겪는 PM 고민을 전략·검증·실행 관점으로 정의하고, 단계별로 성장할 수 있게 정리해드립니다."
      </blockquote>

      <h3 class="mentor-modal-h3">⭐ 실제 후기</h3>
      <blockquote class="mentor-modal-quote">
        "PM 커리어 전환을 고민했는데, 필요한 역량과 로드맵을 명확히 잡아주셨습니다." — 김** · 서비스 기획자
      </blockquote>
      <blockquote class="mentor-modal-quote">
        "프로덕트 전략과 실험 문화 이야기가 실무에 바로 적용돼서 좋았어요." — 이** · 스타트업 PM
      </blockquote>

      <h3 class="mentor-modal-h3">상세 경력</h3>
      <ul class="mentor-modal-list">
        <li><strong>Perplexity</strong> AI Business Fellow (2025.3~8)</li>
        <li><strong>Ringle</strong> Product Management Lead (2022.12~2024.6)</li>
        <li><strong>Return Zero</strong> (카카오벤처스) PM & Head of Product (2022.6~12)</li>
        <li><strong>크로키닷컴(지그재그)</strong> Head of Product - Posty (2021.4~2022.6)</li>
        <li><strong>NAVER</strong> Business Development & Project Manager (2018.11~2020.4)</li>
        <li><strong>카카오</strong> Business Development & Project Manager (2014.10~2017.8)</li>
      </ul>
    `,
  },
  {
    id: "parkjw",
    company: "서비스 기획소",
    name: "김석(노노니)",
    role: "서비스기획 · PM · 26년차",
    image: "/asset/mento_nononi.jpg",
    link: "https://smartstore.naver.com/flowcamp/products/13407690060",
    linkedin: "https://nononi.kr",
    tags: ["서비스기획", "PM", "멘토링"],
    detail: `
      <h2 class="mentor-modal-title">김석(노노니) 멘토</h2>
      <p class="mentor-modal-subtitle"><strong>서비스기획 · PM 실무 멘토 / 서비스 기획소</strong><br />웹·앱 서비스기획 실무에서 필요한 <strong>요구사항 정리, 실행 기준, 프로젝트 운영 방식</strong>을 현업 기준으로 정리해 드립니다.</p>

      <h3 class="mentor-modal-h3">🔥 이런 문제를 해결합니다</h3>
      <ul class="mentor-modal-list">
        <li><strong>기획 문서가 실행까지 이어지지 않을 때</strong> — 요구사항 정리부터 화면/정책 기준까지 <strong>실행 가능한 형태</strong>로 구조화해 드립니다</li>
        <li><strong>서비스기획과 PM 역할 경계가 모호할 때</strong> — 상황별 우선순위와 의사결정 기준을 <strong>실무 관점</strong>으로 정리해 드립니다</li>
        <li><strong>웹·앱·관리자 서비스 프로젝트를 동시에 다뤄야 할 때</strong> — 프로젝트 운영 흐름과 커뮤니케이션 포인트를 <strong>현업 방식</strong>으로 맞춰드립니다</li>
        <li><strong>혼자 일하며 피드백이 부족할 때</strong> — 멘토링을 통해 기획 완성도와 실행 속도를 함께 끌어올립니다</li>
      </ul>

      <h3 class="mentor-modal-h3">📌 핵심 이력</h3>
      <ul class="mentor-modal-list">
        <li>서울디지털대학교 국제금융통상 경영학사</li>
        <li>서비스기획 · PM 실무 26년차</li>
        <li>웹/앱 서비스 기획 멘토링 커뮤니티 운영 (약 1,500명)</li>
      </ul>

      <h3 class="mentor-modal-h3">⭐ 멘토링 포인트</h3>
      <blockquote class="mentor-modal-quote">
        "이론보다 현업 기준으로, 내일 바로 적용할 수 있는 실행 기준을 가져가실 수 있도록 도와드립니다."
      </blockquote>
      <blockquote class="mentor-modal-quote">
        "웹/앱/관리자 서비스를 함께 운영하는 상황에서, 우선순위와 협업 포인트를 빠르게 정리해 드립니다."
      </blockquote>

      <h3 class="mentor-modal-h3">상세 경력</h3>
      <ul class="mentor-modal-list">
        <li><strong>쏠스펙트럼</strong> (2010.09~2011.08) — 서비스 기획</li>
        <li><strong>희망제작소</strong> (2007.06~2009.02) — 온라인 서비스 총괄</li>
        <li><strong>극동방송</strong> (2001.12~2002.10) — 사업 총괄</li>
        <li><strong>하우스톡</strong> (2000.10~2001.05) — 웹PD(서비스 기획, 디자인)</li>
      </ul>

      <h3 class="mentor-modal-h3">채널</h3>
      <ul class="mentor-modal-list">
        <li>Blog: https://nononi.kr</li>
        <li>Facebook: https://www.facebook.com/nononikim</li>
        <li>Mentoring Community: https://open.kakao.com/o/gXks9zGb</li>
      </ul>
    `,
  },
  {
    id: "hwangseil",
    company: "헬스케어 플랫폼",
    name: "마르셀",
    role: "Product & UX Design Lead · 20년차",
    image: "/asset/mento_hwangseil.png",
    link: "https://smartstore.naver.com/flowcamp/products/13625608160",
    linkedin: "",
    tags: ["데이터 기반 의사결정", "인하우스 전환", "프로덕트 전략"],
    detail: "",
  },
];

(function () {
  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderCard(m) {
    var attrs =
      ' data-mentor-modal="' + esc(m.id) + '"' +
      (m.link ? ' data-mentor-link="' + esc(m.link) + '"' : "") +
      (m.linkedin ? ' data-mentor-linkedin="' + esc(m.linkedin) + '"' : "");
    return (
      '<article class="mentor-card mentor-card--featured mentor-card--clickable"' + attrs +
      ' tabindex="0" role="button" aria-label="' + esc(m.name) + ' 멘토 상세 보기">' +
      '<span class="mentor-card-featured-company">' + esc(m.company) + "</span>" +
      '<div class="mentor-card-featured-avatar"><img src="' + esc(m.image) + '" alt="' + esc(m.name) + ' 멘토" /></div>' +
      '<h3 class="mentor-card-featured-name">' + esc(m.name) + "</h3>" +
      '<p class="mentor-card-featured-role">' + esc(m.role) + "</p>" +
      '<ul class="mentor-card-tags mentor-card-featured-tags">' +
      m.tags.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") +
      "</ul></article>"
    );
  }

  function renderPanel(m, isFirst) {
    // 제목 h2에 aria-labelledby용 id 부여
    var html = m.detail.replace(
      '<h2 class="mentor-modal-title">',
      '<h2 id="mentorModalTitle-' + esc(m.id) + '" class="mentor-modal-title">'
    );
    return (
      '<div id="mentor-content-' + esc(m.id) + '" class="mentor-content-panel" aria-hidden="' +
      (isFirst ? "false" : "true") + '"' + (isFirst ? "" : " hidden") + ">" + html + "</div>"
    );
  }

  var LINKEDIN_ICON =
    '<svg class="mentor-modal-linkedin-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>';

  document.querySelectorAll("[data-mentor-cards]").forEach(function (el) {
    el.innerHTML = MENTORS.map(renderCard).join("");
  });

  var modalRoot = document.querySelector("[data-mentor-modal-root]");
  if (modalRoot) {
    var withDetail = MENTORS.filter(function (m) { return m.detail; });
    modalRoot.setAttribute("role", "dialog");
    modalRoot.setAttribute("aria-modal", "true");
    modalRoot.setAttribute("aria-hidden", "true");
    if (withDetail[0]) modalRoot.setAttribute("aria-labelledby", "mentorModalTitle-" + withDetail[0].id);
    modalRoot.innerHTML =
      '<div class="mentor-modal-overlay"></div>' +
      '<div class="mentor-modal-content">' +
      '<div class="mentor-modal-header">' +
      '<a href="#" id="mentorModalLinkedIn" class="mentor-modal-linkedin-btn" target="_blank" rel="noopener noreferrer" aria-label="링크드인 프로필 보기">' +
      LINKEDIN_ICON + " 링크드인 프로필</a>" +
      '<button type="button" class="mentor-modal-close" aria-label="팝업 닫기">&times;</button>' +
      "</div>" +
      '<div class="mentor-modal-body">' +
      withDetail.map(function (m, i) { return renderPanel(m, i === 0); }).join("") +
      "</div></div>";
  }
})();
