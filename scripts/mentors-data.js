/**
 * 멘토 데이터 (단일 소스)
 *
 * 이 파일을 고친 뒤 아래 명령을 실행하면 정적 HTML이 다시 만들어집니다.
 *   node scripts/build-mentors.js
 *
 * 만들어지는 것
 *   - /mentors/{slug}/index.html  멘토 프로필 페이지 (page: true 인 멘토만)
 *   - sitemap.xml 의 멘토 페이지 주소 (page: true 인 멘토)
 *   메인·커피챗의 멘토 카드는 아직 루트의 mentors.js 가 그립니다 (이 파일과 별개).
 *
 * 가격
 *   - priceHour: 1시간 공급가액(부가세 제외, 원). 페이지에는 부가세 10%를 더한 금액이 표시됩니다.
 *
 * 작성 규칙 (GEO 7-2, 7-3)
 *   - 사이트에 공개됐거나 멘토가 확인한 사실만 적습니다.
 *   - reviews: [{ quote, author }] — 실제 후기이고 공개 동의를 받은 것만 넣습니다.
 *     비어 있으면 후기 섹션에 "아직 공개된 후기가 없어요" 안내가 나옵니다.
 *   - 합격·연봉 상승을 보장하는 표현은 쓰지 않습니다.
 */
module.exports = [
  {
    slug: "puzzleman",
    page: false,
    priceHour: 60000,
    name: "퍼즐맨",
    company: "퍼즐웍스",
    role: "헤드헌팅 · 15년차",
    jobTitle: "헤드헌터",
    image: "/asset/mento_simjaekwon.jpg",
    link: "https://smartstore.naver.com/flowcamp/products/13381436491",
    sameAs: ["https://www.linkedin.com/in/startup-fit%E2%80%99-638518198/"],
    tags: ["이직 전략", "연봉 협상", "면접 코칭"],
    // 7-3: 메인과 /sprint/ 의 경력 설명이 달라 공개 프로필 확정 전까지 경력은 적지 않습니다.
    summary:
      "퍼즐맨 멘토는 퍼즐웍스에서 헤드헌팅을 하는 15년차 멘토예요. 당신의사수 1:1 커피챗에서 지금 이직하는 게 맞는지, 연봉과 조건은 어떻게 협상할지, 제안받은 회사에 합류할지를 함께 판단해요.",
    problems: [
      { title: "지금 옮길지, 6개월 뒤에 옮길지", desc: "이직 가능성과 시점을 지금 상황 기준으로 판단해요." },
      { title: "연봉·조건 협상", desc: "제안받은 조건을 어떻게 협상할지 전략을 세워요." },
      { title: "합류 여부 판단", desc: "제안받은 기업과 조직에 합류해도 될지 함께 따져봐요." },
    ],
    quote: "지금 결정하지 않으면 손해 보는 선택인지 오늘 기준으로 정리해드립니다.",
    career: [],
    reviews: [],
  },
  {
    slug: "parksoochang",
    page: false,
    priceHour: 60000,
    name: "박수창",
    company: "LAIVDATA",
    role: "Agent Foundry팀 리드 · 18년차",
    jobTitle: "Agent Foundry팀 리드",
    image: "/asset/mento_parksoochang.jpg",
    link: "https://smartstore.naver.com/flowcamp/products/13467413888",
    sameAs: ["https://www.linkedin.com/in/soochang-park/"],
    tags: ["바이브코딩", "데이터분석"],
    summary:
      "박수창 멘토는 LAIVDATA에서 Agent Foundry팀을 이끄는 18년차 멘토로, 현대카드에서 Digital CLM 팀장을 지냈어요. 당신의사수 1:1 커피챗에서 AI 에이전트 도입 우선순위, 에이전트 기반 신사업 검증, 데이터 세그먼트·초개인화 설계, 바이브코딩·노코드로 아이디어를 검증하는 방법을 함께 정리해요.",
    problems: [
      { title: "에이전트 도입을 어디서부터 손대야 할지 막막할 때", desc: "비즈니스 기획·PM 관점으로 우선순위와 단계를 잡아요." },
      { title: "에이전트로 신사업을 검증하고 싶은데 방법을 모를 때", desc: "에이전트 기반 신사업을 이끌고 검증한 경험으로 실전 가이드를 드려요." },
      { title: "데이터로 고객을 나누고 초개인화하고 싶은데 설계가 어려울 때", desc: "행동 지수·세그먼트 설계부터 실행까지 같이 정리해요." },
      { title: "아이디어를 빨리 검증해 서비스로 만들고 싶을 때", desc: "바이브코딩·노코드로 빠르게 검증하는 방법을 함께해요." },
    ],
    quote: "멘티가 실제로 겪는 문제를 에이전트·데이터 관점으로 정의하고, 단계별로 검증할 수 있게 정리해드립니다.",
    career: [
      { org: "LAIVDATA", role: "이사", period: "2025.4~" },
      { org: "티맥스핀에이아이", role: "상무", period: "2024.7~2024.9" },
      { org: "데이터몬드", role: "공동대표(창업)", period: "2021.7~2024.3" },
      { org: "METAPERSONALAB", role: "CEO", period: "2022.1~2024.2" },
      { org: "현대카드", role: "Digital CLM 팀장", period: "2017~2021" },
      { org: "현대자동차", role: "사내스타트업 육성 프로그램 참여", period: "2019~2021" },
    ],
    education: ["연세대학교 경영학과"],
    reviews: [],
  },
  {
    slug: "jinyongjin",
    page: false,
    priceHour: 60000,
    name: "진용진",
    company: "전) 카카오, 네이버",
    role: "PM · 16년차",
    jobTitle: "Product Coach",
    image: "/asset/mento_jinyongjin.jpg",
    link: "https://smartstore.naver.com/flowcamp/products/13467430048",
    sameAs: ["https://www.linkedin.com/in/yongjinjin/"],
    tags: ["서비스 기획", "PM"],
    summary:
      "진용진 멘토는 카카오와 네이버에서 사업개발·PM을 맡았고, 지그재그(크로키닷컴) Head of Product와 링글 Product Management Lead를 거친 16년차 PM이에요. 지금은 Product Coach로 활동해요. 당신의사수 1:1 커피챗에서 PM 커리어 시작·전환, 프로덕트 전략과 PMF 검증, AI로 PM 업무를 효율화하는 방법을 다뤄요.",
    problems: [
      { title: "PM으로 커리어를 시작하거나 전환하고 싶은데 막막할 때", desc: "프로덕트 매니저에게 필요한 역량과 성장 경로를 정리해요." },
      { title: "프로덕트 전략과 PMF 검증이 어려울 때", desc: "디스커버리, 사용자 검증, 고투마켓 경험을 바탕으로 실전 가이드를 드려요." },
      { title: "AI로 PM 업무를 효율화하고 싶을 때", desc: "Cursor for PM, SuperPM 같은 AI 워크플로 도구 경험을 나눠요." },
    ],
    quote: "멘티가 겪는 PM 고민을 전략·검증·실행 관점으로 정의하고, 단계별로 성장할 수 있게 정리해드립니다.",
    career: [
      { org: "Perplexity", role: "AI Business Fellow", period: "2025.3~2025.8" },
      { org: "Ringle", role: "Product Management Lead", period: "2022.12~2024.6" },
      { org: "Return Zero (카카오벤처스 투자사)", role: "PM & Head of Product", period: "2022.6~2022.12" },
      { org: "크로키닷컴(지그재그)", role: "Head of Product - Posty", period: "2021.4~2022.6" },
      { org: "NAVER", role: "Business Development & Project Manager", period: "2018.11~2020.4" },
      { org: "카카오", role: "Business Development & Project Manager", period: "2014.10~2017.8" },
    ],
    reviews: [],
  },
  {
    slug: "nononi",
    page: false,
    priceHour: 60000,
    name: "김석(노노니)",
    company: "서비스 기획소",
    role: "서비스기획 · PM · 26년차",
    jobTitle: "서비스기획 · PM 실무 멘토",
    image: "/asset/mento_nononi.jpg",
    link: "https://smartstore.naver.com/flowcamp/products/13407690060",
    sameAs: ["https://nononi.kr", "https://www.facebook.com/nononikim"],
    tags: ["서비스기획", "PM", "멘토링"],
    summary:
      "김석(노노니) 멘토는 서비스기획·PM 실무 26년차로, 서비스 기획소를 운영하며 약 1,500명이 모인 웹·앱 서비스 기획 멘토링 커뮤니티를 이끌고 있어요. 당신의사수 1:1 커피챗에서 요구사항 정리, 실행 기준, 프로젝트 운영 방식을 현업 기준으로 짚어드려요.",
    problems: [
      { title: "기획 문서가 실행까지 이어지지 않을 때", desc: "요구사항 정리부터 화면·정책 기준까지 실행 가능한 형태로 구조화해요." },
      { title: "서비스기획과 PM 역할 경계가 모호할 때", desc: "상황별 우선순위와 의사결정 기준을 실무 관점으로 정리해요." },
      { title: "웹·앱·관리자 서비스 프로젝트를 동시에 다뤄야 할 때", desc: "프로젝트 운영 흐름과 커뮤니케이션 포인트를 현업 방식으로 맞춰요." },
      { title: "혼자 일하며 피드백이 부족할 때", desc: "기획 완성도와 실행 속도를 함께 끌어올려요." },
    ],
    quote: "이론보다 현업 기준으로, 내일 바로 적용할 수 있는 실행 기준을 가져가실 수 있도록 도와드립니다.",
    career: [
      { org: "서비스 기획소", role: "운영, 웹·앱 서비스 기획 멘토링 커뮤니티 (약 1,500명)", period: "현재" },
      { org: "쏠스펙트럼", role: "서비스 기획", period: "2010.9~2011.8" },
      { org: "희망제작소", role: "온라인 서비스 총괄", period: "2007.6~2009.2" },
      { org: "극동방송", role: "사업 총괄", period: "2001.12~2002.10" },
      { org: "하우스톡", role: "웹PD (서비스 기획, 디자인)", period: "2000.10~2001.5" },
    ],
    education: ["서울디지털대학교 국제금융통상 경영학사"],
    reviews: [],
  },
  {
    slug: "marcel",
    page: true,
    priceHour: 90000,
    name: "마르셀",
    company: "국내 대표 헬스케어 플랫폼",
    role: "Product & UX Design Lead · 20년차",
    jobTitle: "Product & UX Design Lead",
    image: "/asset/mento_hwangseil.png",
    link: "https://smartstore.naver.com/flowcamp/products/13625608160",
    // 현재 회사명은 비공개라 링크드인(현재 회사명 노출)은 걸지 않습니다.
    sameAs: [],
    tags: ["인하우스 이직", "이력서 및 포트폴리오 피드백", "커리어 설계"],
    summary:
      "마르셀 멘토는 2003년부터 UX·프로덕트 디자인을 해 온 20년차 Product & UX Design Lead예요. 이베이 코리아, GS SHOP, LG전자(유럽 R&D 포함), 네이버, 라이엇 게임즈, 매스프레소, 화해글로벌을 거쳐 지금은 국내 대표 헬스케어 플랫폼에서 Product Design Chapter Lead를 맡고 있어요. 당신의사수 1:1 커피챗에서 디자이너의 인하우스 이직, 리드·매니저로의 성장, 프로덕트 디자인 포트폴리오를 함께 점검해요.",
    stats: [
      { value: "20년차", label: "UX·프로덕트 디자인 커리어" },
      { value: "10년+", label: "디자인 조직 리딩" },
      { value: "네이버·라이엇", label: "팀 리드 출신" },
    ],
    why: [
      "이커머스, 대형 IT 플랫폼, 글로벌 제조사, 게임사, 고속 성장 스타트업까지 도메인과 회사 규모가 서로 다른 10곳을 거쳤어요. 내 경험이 어느 회사, 어느 도메인에서 강점이 되는지를 여러 조직을 직접 겪은 시선으로 짚어 줄 수 있어요.",
      "네이버 Platform UX 팀장, 라이엇 게임즈 팀장, 매스프레소 Design Division Lead 등 10년 넘게 디자인 조직을 이끌며 디자이너를 직접 뽑고 키워 왔어요. 채용하는 리더가 포트폴리오와 면접에서 무엇을 보는지 그대로 알려줘요.",
      "LG전자 유럽 R&D에서 UX 리더로 글로벌 프로젝트를 이끈 경험이 있어, 해외 협업이나 글로벌 프로덕트 커리어를 고민하는 분께도 현실적인 조언을 드려요.",
    ],
    recommend: [
      "에이전시·SI를 넘어 인하우스 프로덕트 디자이너로 옮기고 싶은 분",
      "시니어 디자이너에서 리드·매니저로 커리어를 넓히고 싶은 분",
      "UX 기획·리서치 역량을 프로덕트 성과로 보여주고 싶은 UX 디자이너·기획자",
      "스타트업과 대기업·플랫폼 사이에서 다음 회사를 고민하는 분",
    ],
    problems: [
      { title: "인하우스 프로덕트 디자이너로의 전환", desc: "화면 결과물 위주의 경력을 문제 정의·가설·성과 중심의 프로덕트 디자인 경험으로 다시 정리해요." },
      { title: "디자인 리드·매니저로의 성장", desc: "10년 넘게 디자인 조직을 빌딩하고 이끈 경험으로 리드에게 필요한 역할과 준비를 함께 짚어요." },
      { title: "채용하는 리더 관점의 포트폴리오 피드백", desc: "디자이너를 직접 뽑아 온 리더가 포트폴리오와 면접에서 무엇을 보는지를 기준으로 피드백해요." },
      { title: "사용자 리서치와 검증을 성과로 연결", desc: "리서치·사용성 검증 결과를 디자인 결정과 비즈니스 설득으로 이어 가는 방법을 실무 기준으로 정리해요." },
      { title: "도메인·회사 규모에 맞는 이직 방향", desc: "이커머스·플랫폼·글로벌·스타트업을 모두 겪은 경험으로 나에게 맞는 다음 회사를 함께 따져봐요." },
    ],
    quote: "사용자의 목소리를 대변하면서도 비즈니스 목표와 균형을 맞추는 것, 그게 UX 디자이너의 역할이라고 생각해요.",
    highlights: [
      "20년간 이커머스·대형 IT 플랫폼·글로벌 제조사·게임·스타트업 UX/프로덕트 디자인",
      "사용자 리서치부터 와이어프레임, UX 라이팅, 사용자 검증, 비즈니스 설득까지 전 과정 수행",
      "10년 이상 디자인 조직 리딩과 조직 빌딩",
      "LG전자 유럽 R&D 글로벌 UX 프로젝트 리딩",
    ],
    career: [
      { period: "2025.09~현재", org: "국내 대표 헬스케어 플랫폼", role: "Product Design Chapter Lead" },
      { period: "2022.08~2025.09", org: "화해글로벌", role: "Design Lead" },
      { period: "2020.10~2022.08", org: "매스프레소", role: "Design Division Lead" },
      { period: "2019.07~2020.10", org: "고영테크놀러지", role: "UX Planning Team Lead" },
      { period: "2015.04~2019.07", org: "라이엇 게임즈", role: "Design Team Lead" },
      { period: "이전", org: "네이버", role: "Platform UX Team Lead" },
      { period: "이전", org: "LG전자 유럽 R&D", role: "UX Leader" },
      { period: "이전", org: "LG전자", role: "Senior UX Designer" },
      { period: "이전", org: "GS SHOP", role: "UX Designer & PM" },
      { period: "2003.09~", org: "이베이 코리아", role: "UX Designer" },
    ],
    education: [
      "홍익대학교 디지털미디어디자인 석사 (HCI)",
      "스웨덴 예테보리 대학교 디자인 석사 교환학생",
      "서울시립대학교 국어국문학 학사",
    ],
    programs: [
      { href: "/sprint/agency/", label: "이직특공대 · 에이전시·SI → 인하우스", desc: "지원 기업 우선순위 검증과 30일 실행 계획 설계를 맡아요." },
    ],
    others: ["brian", "puzzleman"], // "다른 멘토도 만나보세요"에 보여줄 멘토
    reviews: [
      { quote: "도움이 되었습니다. 감사합니다.", author: "eras******* · 네이버 스마트스토어 구매 후기 · ★5 · 1시간 · 2026.06.21" },
    ],
  },
  {
    slug: "brian",
    page: true,
    premium: true, // true 면 이름 위에 PREMIUM 배지가 붙습니다
    isNew: true, // 신규 멘토: 후기가 없을 때 "새로 합류한 멘토" 안내가 나옵니다
    priceHour: 180000,
    name: "브라이언",
    company: "국내 대형 카드사",
    role: "현직 임원 · UX/CX 리더 · 20년차",
    jobTitle: "UX/CX 리더 (임원)",
    image: "/asset/mento_executive.webp",
    link: "https://smartstore.naver.com/flowcamp/products/13886473644",
    sameAs: [],
    tags: ["금융권 이직", "이력서·포트폴리오 피드백"],
    summary:
      "브라이언 멘토는 국내 대형 카드사의 현직 임원이자 20년차 UX/CX 리더예요. 글로벌 플랫폼을 거쳐 지금은 대형 카드사에서 약 100명 조직을 이끌고 있어요. 당신의사수 1:1 커피챗에서 금융권 현업 리더의 관점으로 실전 경쟁력을 점검하고, 카드사·은행·보험사 같은 금융권 인하우스로 이직할 때 필요한 방향을 함께 잡아요.",
    stats: [
      { value: "20년차", label: "UX/CX 커리어" },
      { value: "약 100명", label: "이끄는 조직 규모" },
      { value: "현직 임원", label: "국내 대형 카드사" },
    ],
    why: [
      "금융권 인하우스 서류와 면접은 결국 현업 리더와 경영진이 읽고 판단해요. 브라이언 멘토는 지금 대형 카드사에서 약 100명 조직을 이끄는 임원이라, 경영진과 면접관이 무엇을 보고 판단하는지를 현업에서 직접 다루고 있어요.",
      "글로벌 플랫폼과 국내 대형 카드사를 모두 거쳤기 때문에, 플랫폼에서 쌓은 경험을 금융권이 원하는 언어로 어떻게 옮겨야 하는지 양쪽 경험을 바탕으로 짚어 줄 수 있어요.",
      "통합 금융 플랫폼의 UX/CX 전략을 총괄하고 KPI를 기준으로 서비스를 개선해 온 만큼, 내 경험을 수치와 성과로 말하는 방법을 실무 기준으로 알려줘요.",
    ],
    recommend: [
      { text: "금융권 이직이 절실하신 분", note: "멘토님 회사 및 신상 정보는 1:1 커피챗 때 공개해요.", highlight: true },
      "에이전시·SI 경력을 넘어 금융권 인하우스로 이직하고 싶은 분",
      "카드사, 은행, 보험사 이직을 준비하는 IT 기획자·PM·UX 디자이너",
    ],
    problems: [
      { title: "금융권 현업이 요구하는 역량 점검", desc: "금융권 현업 리더가 PM·기획자·디자이너에게 실제로 기대하는 역량을 기준으로 지금 내 역량을 점검해요." },
      { title: "업무 경험을 수치와 성과 중심으로 다시 표현", desc: "실제로 한 일을 KPI와 성과 중심의 문장으로 다시 쓰는 방법을 알려드려요." },
      { title: "경영진·면접관 관점의 이력서·포트폴리오 피드백", desc: "이직할 때 경영진과 면접관이 무엇을 보고 판단하는지를 기준으로 서류를 피드백해요." },
    ],
    quote: "", // "왜 브라이언 멘토인가요?" 섹션과 겹쳐서 비워 둠
    highlights: [
      "통합 금융 플랫폼 UX/CX 전략 총괄",
      "M앱, S서비스 KPI 기반 서비스 개선",
      "UX 통합조직 운영 및 인재 육성",
    ],
    career: [
      { period: "현재", org: "국내 대형 카드사", role: "임원 · UX/CX 리더, 약 100명 조직 리드" },
      { period: "이전", org: "글로벌 플랫폼", role: "" },
    ],
    education: [],
    programs: [
      { href: "/sprint/finance/", label: "이직특공대 2기 · 금융권 이직", desc: "이력서·포트폴리오 실무 피드백과 실전면접을 맡아요." },
    ],
    others: ["marcel", "puzzleman"], // "다른 멘토도 만나보세요"에 보여줄 멘토
    reviews: [],
  },
];
