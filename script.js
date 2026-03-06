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
