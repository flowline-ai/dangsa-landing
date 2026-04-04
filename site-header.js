/**
 * 사이트 공통 헤더 — 이 파일의 HTML만 수정하면 모든 페이지에 반영됩니다.
 * 각 HTML의 <body> 직후에 #site-header-root + 이 스크립트 로드 필요.
 */
(function () {
  var root = document.getElementById("site-header-root");
  if (!root) return;

  var logoSrc = "/asset/dangsa_logo.png";
  try {
    var s = document.currentScript && document.currentScript.src;
    if (s && /site-header\.js(\?|$)/i.test(s)) {
      var base = s.replace(/\/?site-header\.js.*$/i, "");
      if (base) logoSrc = base + "/asset/dangsa_logo.png";
    }
  } catch (e) {
    /* 루트 기준 경로 유지 */
  }

  var path = location.pathname.replace(/\/index\.html$/i, "/");
  var coffeeOn = /(^|\/)coffee-chat(\/|$)/.test(path);
  var careerOn = /(^|\/)career-consulting(\/|$)/.test(path);

  var coffeeCurrent = coffeeOn ? ' aria-current="page"' : "";
  var careerCurrent = careerOn ? ' aria-current="page"' : "";

  root.outerHTML =
    '<header class="header">' +
    '<div class="header-inner">' +
    '<a href="/" class="logo"><img src="' +
    logoSrc +
    '" alt="당신의사수" /></a>' +
    '<nav id="header-service-nav" class="header-service-nav" aria-label="주요 서비스 및 상담">' +
    '<div class="header-menu-cta-wrap">' +
    '<a href="https://forms.gle/GRAkY72cYT4f2QbC6" target="_blank" rel="noopener noreferrer" class="btn btn-primary header-menu-cta">커리어 상담받기</a>' +
    "</div>" +
    '<a href="/coffee-chat/" class="btn btn-outline header-service-link"' +
    coffeeCurrent +
    ">커피챗</a>" +
    '<a href="/career-consulting/" class="btn btn-outline header-service-link"' +
    careerCurrent +
    ">이직 전략 컨설팅</a>" +
    "</nav>" +
    '<div class="header-actions">' +
    '<div class="header-cta header-cta--desktop">' +
    '<a href="https://forms.gle/GRAkY72cYT4f2QbC6" target="_blank" rel="noopener noreferrer" class="btn btn-primary">커리어 상담받기</a>' +
    "</div>" +
    '<button type="button" class="header-menu-toggle" id="header-menu-toggle" aria-expanded="false" aria-controls="header-service-nav" aria-label="메뉴 열기">' +
    '<span class="header-menu-toggle-bars" aria-hidden="true">' +
    '<span class="header-menu-toggle-bar"></span>' +
    '<span class="header-menu-toggle-bar"></span>' +
    '<span class="header-menu-toggle-bar"></span>' +
    "</span>" +
    "</button>" +
    "</div>" +
    "</div>" +
    '<div class="header-menu-backdrop" id="header-menu-backdrop" aria-hidden="true"></div>' +
    "</header>";
})();
