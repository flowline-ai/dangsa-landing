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
    "혼자 고민하지 마세요",
    "커리어 이직의 지름길",
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
 * 히어로 이직 후기 카드: 위아래 방향 오토 슬라이드 (한 개씩 노출)
 */
(function () {
  const track = document.querySelector(".hero-career-slider-track");
  const cards = document.querySelectorAll(".hero-career-card");
  if (!track || cards.length === 0) return;

  const CARD_HEIGHT = 72;
  const CARD_GAP = 12;
  const STEP = CARD_HEIGHT + CARD_GAP; /* 84px */
  const DURATION_MS = 4000;

  let index = 0;

  function slide() {
    index = (index + 1) % cards.length;
    track.style.transform = "translateY(-" + index * STEP + "px)";
  }

  setInterval(slide, DURATION_MS);
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
    const contentSim = document.getElementById("mentor-content-sim");
    const contentPark = document.getElementById("mentor-content-park");
    const contentJin = document.getElementById("mentor-content-jin");
    const contentParkjw = document.getElementById("mentor-content-parkjw");
    var panels = [contentSim, contentPark, contentJin, contentParkjw];
    panels.forEach(function (p) {
      if (p) {
        p.hidden = true;
        p.setAttribute("aria-hidden", "true");
      }
    });
    var active =
      mentorId === "park"
        ? contentPark
        : mentorId === "jin"
          ? contentJin
          : mentorId === "parkjw"
            ? contentParkjw
            : contentSim;
    if (active) {
      active.hidden = false;
      active.setAttribute("aria-hidden", "false");
    }
    var titleIds = {
      sim: "mentorModalTitle-sim",
      park: "mentorModalTitle-park",
      jin: "mentorModalTitle-jin",
      parkjw: "mentorModalTitle-parkjw",
    };
    modal.setAttribute("aria-labelledby", titleIds[mentorId] || titleIds.sim);
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
      openModal(card);
    });
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(card);
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

  // 커리어 상담받기 CTA 클릭 (전환)
  document.querySelectorAll('a[href*="forms.gle/GRAkY72cYT4f2QbC6"]').forEach(function (el) {
    el.addEventListener("click", function () {
      var location = el.closest(".hero-cta") ? "hero" : el.closest(".mentors-section-cta") ? "mentors" : el.closest(".cta-section") ? "cta_bottom" : el.closest(".header") ? "header" : "other";
      sendGAEvent("cta_click", { cta_label: "member_join", cta_location: location });
    });
  });

  // 세미나(웨비나) 무료 신청 — 이벤터스 외부 링크
  document.querySelectorAll(".seminar-featured-cta").forEach(function (el) {
    el.addEventListener("click", function () {
      sendGAEvent("cta_click", { cta_label: "webinar_apply", cta_location: "seminar" });
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
 * 메인(index) 헤더: 모바일 햄버거 — 서비스 링크 패널 열기/닫기
 */
(function () {
  var header = document.querySelector(".header");
  var toggle = document.getElementById("header-menu-toggle");
  var backdrop = document.getElementById("header-menu-backdrop");
  var nav = document.getElementById("header-service-nav");
  if (!header || !toggle || !backdrop || !nav) return;

  function setNavOpen(open) {
    header.classList.toggle("is-nav-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
    backdrop.setAttribute("aria-hidden", open ? "false" : "true");
    document.body.style.overflow = open ? "hidden" : "";
  }

  toggle.addEventListener("click", function () {
    setNavOpen(!header.classList.contains("is-nav-open"));
  });

  backdrop.addEventListener("click", function () {
    setNavOpen(false);
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      setNavOpen(false);
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && header.classList.contains("is-nav-open")) {
      setNavOpen(false);
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 768 && header.classList.contains("is-nav-open")) {
      setNavOpen(false);
    }
  });
})();

/**
 * 헤더: 이직 전략 컨설팅 — 페이지 준비 중 안내
 */
(function () {
  document.querySelectorAll(".js-consulting-coming-soon").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      alert("페이지 준비중입니다");
    });
  });
})();
