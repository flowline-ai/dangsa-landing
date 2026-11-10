/**
 * 당신의사수 랜딩페이지 - 히어로 텍스트 롤링 애니메이션
 *
 * [GA4 유입경로 추적] script.js 하단의 유입 파라미터를 보고서에서 쓰려면
 * GA4 관리자 > 맞춤 정의 > 맞춤 측정기준에서 아래 이벤트 매개변수를 등록하세요:
 *   utm_source, utm_medium, utm_campaign, utm_content, utm_term,
 *   entry_referrer_domain, entry_page
 */

(function () {
  // 모바일에서만 줄바꿈 적용 (hero-br은 CSS에서 모바일에서 block, 데스크톱에서 none)
  const rollingLines = [
    "더 좋은 IT 회사로 가는 지름길",
    "혼자 고민하지 마세요",
  ];

  const el = document.getElementById("heroRolling");
  if (!el) return;

  let index = 0;
  const DURATION_MS = 3500;
  const FADE_MS = 400;

  function setText(html) {
    el.innerHTML = html;
    el.classList.add("rolling-visible");
  }

  function hide() {
    el.classList.remove("rolling-visible");
  }

  function showNext() {
    hide();
    setTimeout(function () {
      index = (index + 1) % rollingLines.length;
      setText(rollingLines[index]);
    }, FADE_MS);
  }

  // 초기 텍스트
  setText(rollingLines[0]);

  // 주기적 롤링
  setInterval(showNext, DURATION_MS);
})();

/**
 * 세미나 영역: 오른쪽(전체 일정) 열 높이를 왼쪽 피처 카드와 맞추고, 목록만 스크롤
 * (CSS만으로는 동적 높이 정렬이 어려워 ResizeObserver 사용)
 */
(function () {
  var BP = 901; /* styles.css의 2열 ↔ 1열 전환(max-width:900px)과 일치 */
  var featured = document.querySelector(".seminar-featured");
  var schedule = document.querySelector(".seminar-schedule");
  if (!featured || !schedule) return;

  function sync() {
    if (window.innerWidth < BP) {
      schedule.style.maxHeight = "";
      return;
    }
    schedule.style.maxHeight = featured.offsetHeight + "px";
  }

  if (typeof ResizeObserver !== "undefined") {
    var ro = new ResizeObserver(sync);
    ro.observe(featured);
  }
  window.addEventListener("resize", sync);
  sync();
})();

/**
 * 세미나 일정 상태 자동 갱신 (시작 시간 기준)
 * - data-time 속성이 있으면 해당 시각 이후 종료 처리
 * - 없으면 날짜 자정 기준 (기존 동작)
 */
(function () {
  var now = new Date();

  function parseSeminarDateTime(dateAttr, timeAttr) {
    var dm = /^(\d{4})-(\d{2})-(\d{2})$/.exec((dateAttr || "").trim());
    if (!dm) return null;
    var tm = /^(\d{1,2}):(\d{2})$/.exec((timeAttr || "").trim());
    var h = tm ? Number(tm[1]) : 0;
    var min = tm ? Number(tm[2]) : 0;
    return new Date(Number(dm[1]), Number(dm[2]) - 1, Number(dm[3]), h, min, 0, 0);
  }

  function disableBtn(btn) {
    btn.removeAttribute("href");
    btn.setAttribute("aria-disabled", "true");
    btn.classList.remove("btn-primary");
    btn.classList.add("btn-outline", "sp-card-btn--report");
    btn.style.pointerEvents = "none";
    btn.style.opacity = "0.45";
  }

  // 카드 그리드
  document.querySelectorAll(".sp-card").forEach(function (card) {
    var status = card.querySelector(".seminar-status");
    var dateEl = card.querySelector(".sp-card-date");
    if (!status || !dateEl) return;

    var seminarDT = parseSeminarDateTime(
      dateEl.getAttribute("datetime"),
      dateEl.getAttribute("data-time")
    );
    if (!seminarDT) return;

    var isEnded = seminarDT <= now;

    status.classList.toggle("seminar-status--ended", isEnded);
    status.classList.toggle("seminar-status--scheduled", !isEnded);
    status.textContent = isEnded ? "종료됨" : "예정됨";
    card.classList.toggle("sp-card--upcoming", !isEnded);

    if (isEnded) {
      // 상세 페이지 링크는 종료 후에도 유지
      var btn = card.querySelector(".sp-card-btn:not(.sp-card-btn--detail)");
      if (btn) disableBtn(btn);
    }
  });

  // Featured 섹션
  var featured = document.querySelector(".sp-featured-section");
  if (!featured) return;

  var featuredTimeEl = featured.querySelector("time[datetime]");
  if (!featuredTimeEl) return;

  var featuredDT = parseSeminarDateTime(
    featuredTimeEl.getAttribute("datetime"),
    featuredTimeEl.getAttribute("data-time")
  );
  if (!featuredDT) return;

  if (featuredDT <= now) {
    var cta = featured.querySelector(".spf-cta:not(.spf-cta--detail)");
    if (cta) disableBtn(cta);

    var badge = featured.querySelector(".seminar-count-badge");
    if (badge) badge.textContent = "신청 마감";
  }
})();

/**
 * 멘토링 진행 인원 수: 매주 월요일 랜덤(10~40), 요일별 랜덤 증가폭, 다음 주 월요일 리셋
 */
(function () {
  const el = document.getElementById("mentors-count");
  if (!el) return;

  const MIN_COUNT = 10;
  const MAX_COUNT = 40;
  const MIN_INC = 2;
  const MAX_INC = 5;

  /** 문자열 시드로 0~1 사이 결정론적 난수 */
  function seededRandom(seedStr) {
    let h = 0;
    for (let i = 0; i < seedStr.length; i++) {
      h = (h * 31 + seedStr.charCodeAt(i)) | 0;
    }
    const x = Math.sin(Math.abs(h)) * 10000;
    return x - Math.floor(x);
  }

  /** [min, max] 정수 (min, max 포함) */
  function seededInt(seedStr, min, max) {
    const r = seededRandom(seedStr);
    return min + Math.floor(r * (max - min + 1));
  }

  /** 해당 날짜가 속한 주의 월요일 0시 Date (로컬) */
  function getMondayOfWeek(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    d.setDate(d.getDate() + diff);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  /** 오늘 기준 이번 주 월요일 문자열 (YYYY-MM-DD) */
  function getWeekKey() {
    const mon = getMondayOfWeek(new Date());
    const y = mon.getFullYear();
    const m = String(mon.getMonth() + 1).padStart(2, "0");
    const day = String(mon.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + day;
  }

  /** 요일 오프셋: 월=0, 화=1, ..., 일=6 */
  function getDayOffset(date) {
    const day = date.getDay();
    return day === 0 ? 6 : day - 1;
  }

  /** 그 주의 월요일 기준값(10~40) + 요일별 랜덤 증가분 누적합 (40 상한) */
  function getMentorsValue(weekKey, dayOffset) {
    const monBase = seededInt(weekKey + "-base", MIN_COUNT, MAX_COUNT);
    let sum = monBase;
    for (let i = 0; i < dayOffset; i++) {
      const inc = seededInt(weekKey + "-inc" + i, MIN_INC, MAX_INC);
      sum = Math.min(sum + inc, MAX_COUNT);
    }
    return sum;
  }

  function updateMentorsCount() {
    const weekKey = getWeekKey();
    const dayOffset = getDayOffset(new Date());
    const value = getMentorsValue(weekKey, dayOffset);
    el.textContent = value + "명";
  }

  updateMentorsCount();

  var nextMidnight = new Date();
  nextMidnight.setDate(nextMidnight.getDate() + 1);
  nextMidnight.setHours(0, 0, 0, 0);
  var msToMidnight = nextMidnight - new Date();

  setTimeout(function runAtMidnight() {
    updateMentorsCount();
    setInterval(updateMentorsCount, 24 * 60 * 60 * 1000);
  }, msToMidnight);
})();

/**
 * 멘토 카드 클릭 시 상세 팝업 열기/닫기
 */
(function () {
  const modal = document.getElementById("mentorModal");
  const overlay = modal ? modal.querySelector(".mentor-modal-overlay") : null;
  const closeBtn = modal ? modal.querySelector(".mentor-modal-close") : null;
  const linkedInBtn = document.getElementById("mentorModalLinkedIn");
  const triggerCards = document.querySelectorAll("[data-mentor-modal]");

  function openModal(triggerCard) {
    if (!modal) return;
    const mentorId = triggerCard ? triggerCard.getAttribute("data-mentor-modal") : "sim";
    var panels = modal.querySelectorAll(".mentor-content-panel");
    panels.forEach(function (p) {
      p.hidden = true;
      p.setAttribute("aria-hidden", "true");
    });
    var active = document.getElementById("mentor-content-" + mentorId) || panels[0];
    if (active) {
      active.hidden = false;
      active.setAttribute("aria-hidden", "false");
      var title = active.querySelector(".mentor-modal-title");
      if (title && title.id) modal.setAttribute("aria-labelledby", title.id);
    }
    if (linkedInBtn && triggerCard) {
      const url = triggerCard.getAttribute("data-mentor-linkedin");
      if (url && url !== "#") {
        linkedInBtn.href = url;
        linkedInBtn.classList.remove("is-hidden");
      } else {
        linkedInBtn.href = "#";
        linkedInBtn.classList.add("is-hidden");
      }
    }
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    var contentEl = modal.querySelector(".mentor-modal-content");
    if (contentEl) contentEl.scrollTop = 0;
    closeBtn && closeBtn.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  triggerCards.forEach(function (card) {
    card.addEventListener("click", function () {
      var link = card.getAttribute("data-mentor-link");
      if (link) {
        window.open(link, "_blank", "noopener,noreferrer");
      } else {
        openModal(card);
      }
    });
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        var link = card.getAttribute("data-mentor-link");
        if (link) {
          window.open(link, "_blank", "noopener,noreferrer");
        } else {
          openModal(card);
        }
      }
    });
  });

  if (overlay) overlay.addEventListener("click", closeModal);
  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  modal && modal.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
  });
})();

/**
 * 서비스 카드 슬라이드: 인디케이터 점 생성 및 스크롤 동기화
 */
(function () {
  const cardsEl = document.querySelector(".service-cards");
  const dotsEl = document.querySelector(".service-cards-dots");
  if (!cardsEl || !dotsEl) return;

  const cards = cardsEl.querySelectorAll(".service-card");
  if (cards.length === 0) return;

  // 인디케이터 점 생성
  cards.forEach(function (_, i) {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "dot" + (i === 0 ? " is-active" : "");
    dot.setAttribute("aria-label", "슬라이드 " + (i + 1) + "로 이동");
    dot.addEventListener("click", function () {
      const card = cards[i];
      if (card) {
        card.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
      }
    });
    dotsEl.appendChild(dot);
  });

  const dots = dotsEl.querySelectorAll(".dot");

  function updateActiveDot() {
    const scrollLeft = cardsEl.scrollLeft;
    const containerWidth = cardsEl.offsetWidth;
    let activeIndex = 0;
    let minDist = Infinity;
    cards.forEach(function (card, i) {
      const cardLeft = card.offsetLeft;
      const dist = Math.abs(cardLeft - scrollLeft);
      if (dist < minDist) {
        minDist = dist;
        activeIndex = i;
      }
    });
    dots.forEach(function (dot, i) {
      dot.classList.toggle("is-active", i === activeIndex);
    });
  }

  cardsEl.addEventListener("scroll", updateActiveDot);
  window.addEventListener("resize", updateActiveDot);
  updateActiveDot();
})();

/**
 * 대표 이직 사례 카드 (모바일 가로 스와이프): 인디케이터 점 생성 및 스크롤 동기화
 */
(function () {
  const cardsEl = document.querySelector(".proof-cases");
  const dotsEl = document.querySelector(".proof-cases-dots");
  if (!cardsEl || !dotsEl) return;

  const cards = cardsEl.querySelectorAll(".proof-case");
  if (cards.length === 0) return;

  cards.forEach(function (card, i) {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "dot" + (i === 0 ? " is-active" : "");
    dot.setAttribute("aria-label", "사례 " + (i + 1) + "로 이동");
    dot.addEventListener("click", function () {
      cardsEl.scrollTo({ left: card.offsetLeft - cards[0].offsetLeft, behavior: "smooth" });
    });
    dotsEl.appendChild(dot);
  });

  const dots = dotsEl.querySelectorAll(".dot");

  function updateActiveDot() {
    const base = cards[0].offsetLeft;
    let activeIndex = 0;
    let minDist = Infinity;
    cards.forEach(function (card, i) {
      const dist = Math.abs(card.offsetLeft - base - cardsEl.scrollLeft);
      if (dist < minDist) {
        minDist = dist;
        activeIndex = i;
      }
    });
    dots.forEach(function (dot, i) {
      dot.classList.toggle("is-active", i === activeIndex);
    });
  }

  cardsEl.addEventListener("scroll", updateActiveDot, { passive: true });
  window.addEventListener("resize", updateActiveDot);
})();

/**
 * 멘토 카드 슬라이드: 인디케이터 점 생성 및 스크롤 동기화
 */
(function () {
  const cardsEl = document.querySelector(".mentor-cards");
  const dotsEl = document.querySelector(".mentor-cards-dots");
  if (!cardsEl || !dotsEl) return;

  const cards = cardsEl.querySelectorAll(".mentor-card");
  if (cards.length === 0) return;

  cards.forEach(function (_, i) {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "dot" + (i === 0 ? " is-active" : "");
    dot.setAttribute("aria-label", "멘토 " + (i + 1) + "로 이동");
    dot.addEventListener("click", function () {
      const card = cards[i];
      if (card) {
        card.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
      }
    });
    dotsEl.appendChild(dot);
  });

  const dots = dotsEl.querySelectorAll(".dot");

  function updateActiveDot() {
    const scrollLeft = cardsEl.scrollLeft;
    let activeIndex = 0;
    let minDist = Infinity;
    cards.forEach(function (card, i) {
      const dist = Math.abs(card.offsetLeft - scrollLeft);
      if (dist < minDist) {
        minDist = dist;
        activeIndex = i;
      }
    });
    dots.forEach(function (dot, i) {
      dot.classList.toggle("is-active", i === activeIndex);
    });
  }

  cardsEl.addEventListener("scroll", updateActiveDot);
  window.addEventListener("resize", updateActiveDot);
  updateActiveDot();
})();

/**
 * 유입경로 추적: UTM 파라미터 + 리퍼러를 세션 동안 보관하고 GA 이벤트에 함께 전송
 * - URL의 utm_source, utm_medium, utm_campaign, utm_content, utm_term 수집
 * - document.referrer 및 유입 도메인(entry_referrer_domain) 수집
 * - 세션 최초 유입 시에만 저장하여 '첫 터치' 기준으로 유입 채널 분석 가능
 */
(function () {
  var STORAGE_KEY = "dangsa_ga_acquisition";

  function parseQuery() {
    var q = {};
    var search = typeof window !== "undefined" && window.location ? window.location.search : "";
    if (!search) return q;
    search.slice(1).split("&").forEach(function (pair) {
      var i = pair.indexOf("=");
      if (i === -1) return;
      var k = decodeURIComponent(pair.slice(0, i)).replace(/\+/g, " ");
      var v = decodeURIComponent(pair.slice(i + 1)).replace(/\+/g, " ");
      q[k] = v;
    });
    return q;
  }

  function getReferrerDomain(referrer) {
    if (!referrer || typeof referrer !== "string") return "";
    try {
      var url = new URL(referrer);
      var host = url.hostname || "";
      return host.replace(/^www\./, "");
    } catch (e) {
      return "";
    }
  }

  function getStored() {
    try {
      var raw = sessionStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function saveAcquisition() {
    var stored = getStored();
    if (stored) return stored;
    var q = parseQuery();
    var referrer = typeof document !== "undefined" ? document.referrer || "" : "";
    var referrerDomain = getReferrerDomain(referrer);
    var entryPage = typeof window !== "undefined" && window.location ? window.location.pathname || window.location.href : "";
    var data = {
      utm_source: q.utm_source || "",
      utm_medium: q.utm_medium || "",
      utm_campaign: q.utm_campaign || "",
      utm_content: q.utm_content || "",
      utm_term: q.utm_term || "",
      entry_referrer: referrer,
      entry_referrer_domain: referrerDomain,
      entry_page: entryPage || "/"
    };
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {}
    return data;
  }

  saveAcquisition();
  window.getAcquisitionParams = function () {
    return getStored() || saveAcquisition();
  };

  // 이전 사이트 주소를 측정용 코드로 바꾼다 (UTM이 없는 검색·AI 유입을 구분하기 위함)
  var SOURCE_CODES = [
    [/(^|\.)chatgpt\.com$|(^|\.)chat\.openai\.com$/, "chatgpt"],
    [/(^|\.)perplexity\.ai$/, "perplexity"],
    [/^gemini\.google\.com$/, "gemini"],
    [/(^|\.)claude\.ai$/, "claude"],
    [/(^|\.)copilot\.microsoft\.com$/, "copilot"],
    [/(^|\.)search\.naver\.com$/, "naver"],
    [/(^|\.)blog\.naver\.com$/, "naver_blog"],
    [/(^|\.)cafe\.naver\.com$/, "naver_cafe"],
    [/(^|\.)google\.[a-z.]+$/, "google"],
    [/(^|\.)bing\.com$/, "bing"],
    [/(^|\.)daum\.net$/, "daum"],
    [/(^|\.)flowcamp\.co\.kr$/, "direct"]
  ];

  function toSourceCode(domain) {
    var value = (domain || "").toLowerCase();
    for (var i = 0; i < SOURCE_CODES.length; i++) {
      if (SOURCE_CODES[i][0].test(value)) return SOURCE_CODES[i][1];
    }
    return value;
  }

  // 유입 코드: 지금 주소의 UTM → 세션 첫 유입의 UTM → 이전 사이트 → direct 순서
  // 예: meta_dev_code_Instagram_Reels / google / naver / chatgpt / direct
  window.getAcquisitionCode = function () {
    var q = parseQuery();
    var p = q.utm_source ? q : window.getAcquisitionParams();
    if (p.utm_source) {
      return [toSourceCode(p.utm_source), p.utm_content, p.utm_term].filter(Boolean).join("_");
    }
    return toSourceCode(p.entry_referrer_domain) || "direct";
  };
})();

/**
 * Google Analytics 4 (GA4) 이벤트 트래킹
 * - CTA 클릭(멤버 가입), 멘토 카드 열기, 카카오 채널 클릭 등 전환/참여 이벤트 전송
 * - 모든 이벤트에 유입경로 파라미터(UTM, entry_referrer_domain 등) 자동 첨부
 */
(function () {
  function getAcquisitionParams() {
    return typeof window.getAcquisitionParams === "function" ? window.getAcquisitionParams() : {};
  }

  function sendGAEvent(eventName, params) {
    if (typeof window.gtag !== "function") return;
    var acquisition = getAcquisitionParams();
    var merged = Object.assign({}, acquisition, params || {});
    window.gtag("event", eventName, merged);
  }

  // 세션 시작 시 유입경로 이벤트 1회 전송 (GA4에서 유입 채널 분석용)
  (function sendSessionStart() {
    var p = getAcquisitionParams();
    if (p.utm_source || p.utm_medium || p.utm_campaign || p.entry_referrer_domain) {
      sendGAEvent("session_start", { event_category: "engagement" });
    }
  })();

  // 외부 신청 버튼 클릭 (스마트스토어·카카오·이벤터스·구글폼) — 어디서 온 사람이 눌렀는지 함께 기록
  // 구글폼 링크에 data-source-entry="entry.숫자"를 넣으면 유입 코드 칸을 미리 채운다
  var APPLY_HOST = /(^|\.)(smartstore\.naver\.com|pf\.kakao\.com|event-us\.kr|forms\.gle|docs\.google\.com)$/;
  document.addEventListener("click", function (e) {
    var el = e.target && e.target.closest ? e.target.closest("a[href]") : null;
    if (!el) return;
    var code = typeof window.getAcquisitionCode === "function" ? window.getAcquisitionCode() : "direct";
    var entry = el.getAttribute("data-source-entry");
    if (entry) {
      try {
        var formUrl = new URL(el.href);
        formUrl.searchParams.set("usp", "pp_url");
        formUrl.searchParams.set(entry, code);
        el.href = formUrl.toString();
      } catch (err) {}
    }
    if (APPLY_HOST.test(el.hostname || "")) {
      sendGAEvent("apply_click", {
        acquisition_code: code,
        link_domain: el.hostname,
        page_path: window.location.pathname
      });
    }
  }, true);

  // 커리어 진단 CTA 클릭 (전환) — 체크리스트로 연결되는 버튼 (히어로, 하단 CTA, 헤더)
  document.querySelectorAll('a[href*="checklist"]').forEach(function (el) {
    el.addEventListener("click", function () {
      var location = el.closest(".hero") ? "hero" : el.closest(".cta-section") ? "cta_bottom" : (el.closest(".header-menu-cta-wrap") || el.closest(".header-cta")) ? "header" : "other";
      sendGAEvent("cta_click", { cta_label: "member_join", cta_location: location });
    });
  });

  // 세미나(웨비나) 무료 신청 — 이벤터스 외부 링크
  document.querySelectorAll(".spf-cta:not(.spf-cta--detail), .sp-card-btn:not(.sp-card-btn--detail)").forEach(function (el) {
    el.addEventListener("click", function () {
      var location = el.closest(".sp-featured-section") ? "seminar_featured" : el.closest(".sp-card") ? "seminar_card" : "seminar";
      sendGAEvent("cta_click", { cta_label: "webinar_apply", cta_location: location });
    });
  });

  // 세미나 카드 → 상세 페이지 이동
  document.querySelectorAll(".sp-card-btn--detail, .spf-cta--detail").forEach(function (el) {
    el.addEventListener("click", function () {
      sendGAEvent("seminar_detail_open", { link_url: el.getAttribute("href") || "" });
    });
  });

  // 멘토 카드 클릭 시 팝업 열림 (참여)
  var triggerCards = document.querySelectorAll("[data-mentor-modal]");
  triggerCards.forEach(function (card) {
    card.addEventListener("click", function () {
      var mentorId = card.getAttribute("data-mentor-modal") || "unknown";
      sendGAEvent("mentor_card_open", { mentor_id: mentorId });
    });
  });

  // 카카오톡 채널 FAB 클릭
  var kakaoFab = document.querySelector('.fab-kakao');
  if (kakaoFab) {
    kakaoFab.addEventListener("click", function () {
      sendGAEvent("kakao_channel_click", { link_url: "pf.kakao.com" });
    });
  }
})();

/**
 * 헤더: 이직 컨설팅 — 페이지 준비 중 안내
 */
(function () {
  document.querySelectorAll(".js-consulting-coming-soon").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      alert("페이지 준비중입니다");
    });
  });
})();

/**
 * 메인 스크롤 등장 효과: .reveal 요소가 화면에 들어오면 .in 추가
 * (html.js 클래스가 있을 때만 숨김 처리되므로 스크립트가 없어도 내용은 보임)
 */
(function () {
  var items = document.querySelectorAll(".reveal");
  if (!items.length) return;
  if (!("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("in"); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  items.forEach(function (el) { io.observe(el); });
})();
