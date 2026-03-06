/**
 * 당신의사수 랜딩페이지 - 히어로 텍스트 롤링 애니메이션
 */

(function () {
  const rollingLines = [
    "IT 이직과 연봉 상승을 위한 1:1 사수",
    "가장 빠른 성공 이직 지름길",
  ];

  const el = document.getElementById("heroRolling");
  if (!el) return;

  let index = 0;
  const DURATION_MS = 3500;
  const FADE_MS = 400;

  function setText(text) {
    el.textContent = text;
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
  const triggerCards = document.querySelectorAll("[data-mentor-modal]");

  function openModal() {
    if (!modal) return;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
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
      openModal();
    });
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal();
      }
    });
  });

  if (overlay) overlay.addEventListener("click", closeModal);
  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  modal && modal.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
  });
})();
