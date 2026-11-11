/**
 * 당신의사수 AX Mission Lab (B2B) — 페이지 스크립트
 */

/* ============================================
   문의 폼 설정 — 여기 두 값만 바꾸면 모든 '도입 문의하기' 버튼에 반영됩니다.
   ============================================
   FORM_URL      : 구글폼 공유 링크 (…/viewform 형태 권장)
   PRODUCT_ENTRY : 구글폼 '관심 상품' 질문의 entry ID (예: "entry.123456789")
                   구글폼 ⋮ → '미리 채워진 링크 가져오기'에서 확인할 수 있어요.
                   비워두면 상품 미리 선택 없이 폼만 열립니다.
*/
var FORM_URL = ""; // TODO: 구글폼 링크 입력
var PRODUCT_ENTRY = ""; // TODO: 예) "entry.123456789"

(function () {
  /* ---------- 문의 버튼 ---------- */
  function buildFormUrl(product) {
    if (!FORM_URL) return "";
    if (!product || !PRODUCT_ENTRY) return FORM_URL;
    var sep = FORM_URL.indexOf("?") === -1 ? "?" : "&";
    return FORM_URL + sep + "usp=pp_url&" + PRODUCT_ENTRY + "=" + encodeURIComponent(product);
  }

  document.querySelectorAll(".js-inquiry").forEach(function (el) {
    var product = el.getAttribute("data-product") || "";
    var url = buildFormUrl(product);
    if (url) {
      el.href = url;
      el.target = "_blank";
      el.rel = "noopener noreferrer";
    } else {
      // 폼 링크가 아직 없으면 하단 문의 섹션으로 이동
      el.href = "#contact";
    }
    var area = el.closest("section, header, footer, .bz-sticky-cta");
    var location = area ? area.id || area.className.split(" ")[0] : "unknown";
    el.addEventListener("click", function () {
      if (typeof window.gtag === "function") {
        window.gtag("event", "b2b_inquiry_click", { product: product || "general", location: location });
      }
    });
  });

  /* ---------- 모바일 메뉴 ---------- */
  var header = document.querySelector(".bz-header");
  var toggle = document.getElementById("bz-menu-toggle");
  var nav = document.getElementById("bz-nav");

  function setOpen(open) {
    header.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
  }

  if (header && toggle && nav) {
    toggle.addEventListener("click", function () {
      setOpen(!header.classList.contains("is-open"));
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setOpen(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 860) setOpen(false);
    });
  }

  /* ---------- 현재 섹션 메뉴 하이라이트 ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.bz-nav a[href^="#"]:not(.bz-btn)'));
  var sectionMap = {};
  navLinks.forEach(function (a) {
    var id = a.getAttribute("href").slice(1);
    var sec = document.getElementById(id);
    if (sec) sectionMap[id] = a;
  });

  if ("IntersectionObserver" in window) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) { a.classList.remove("is-active"); });
        if (sectionMap[entry.target.id]) sectionMap[entry.target.id].classList.add("is-active");
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    // 메뉴에 없는 섹션(히어로·역할·도입 절차 등)에 들어가면 하이라이트를 지움
    document.querySelectorAll("main > section").forEach(function (sec) {
      navObserver.observe(sec);
    });

    /* ---------- Reveal ---------- */
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(function (el) { revealObserver.observe(el); });

    /* ---------- 모바일 하단 CTA: 히어로를 지나면 노출, 마지막 CTA 섹션에서는 숨김 ---------- */
    var sticky = document.getElementById("bz-sticky-cta");
    var hero = document.querySelector(".bz-hero");
    var finalCta = document.getElementById("contact");
    var heroVisible = true;
    var ctaVisible = false;
    function updateSticky() {
      if (sticky) sticky.classList.toggle("is-visible", !heroVisible && !ctaVisible);
    }
    if (sticky && hero && finalCta) {
      new IntersectionObserver(function (e) { heroVisible = e[0].isIntersecting; updateSticky(); }).observe(hero);
      new IntersectionObserver(function (e) { ctaVisible = e[0].isIntersecting; updateSticky(); }).observe(finalCta);
    }
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("is-visible"); });
  }
})();
