#!/usr/bin/env node
/**
 * 멘토 프로필 페이지 생성기
 *
 *   node scripts/build-mentors.js            page: true 인 멘토 페이지 생성 + sitemap 갱신 (모두 검색 노출)
 *   node scripts/build-mentors.js --only=brian   특정 멘토만 (page 값과 관계없이) 생성, sitemap·카드는 건드리지 않음
 *
 * 메인(index.html)·커피챗(coffee-chat/index.html)의 멘토 카드도 루트의 mentors.js 데이터로
 * mentor-cards:start ~ end 사이에 정적 HTML로 써 넣습니다. 카드를 고치려면 mentors.js 를 고친 뒤 이 스크립트를 실행하세요.
 *
 * 결과물은 브라우저가 스크립트로 그리지 않는 완성된 HTML입니다 (GEO 5-5: AI·검색 봇이 본문을 그대로 읽게).
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const SITE = "https://www.flowcamp.co.kr";
const COFFEE_CHAT_STEPS = [
  { title: "네이버스토어에서 커피챗 구매", desc: "네이버 스마트스토어에서 간편하게 구매하고 바로 시작하세요." },
  { title: "담당 매니저가 카카오톡으로 일정 조율", desc: "구매 후 담당 매니저가 카카오톡으로 연락해 편한 일정을 잡아드립니다." },
  { title: "1:1 화상 커피챗", desc: "구매한 시간 동안 현직 시니어 사수와 1:1로 커리어 고민을 깊이 있게 풀어드립니다." },
];

const KAKAO = "https://pf.kakao.com/_fxdxdqX";
const mentors = require("./mentors-data.js");
const onlyArg = process.argv.find((a) => a.startsWith("--only="));
const only = onlyArg ? onlyArg.split("=")[1] : null;

function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
const won = (n) => n.toLocaleString("ko-KR") + "원";
const withVat = (n) => Math.round(n * 1.1);
const pageUrl = (m) => `${SITE}/mentors/${m.slug}/`;
const absImg = (src) => (src ? (src.startsWith("http") ? src : SITE + src) : `${SITE}/asset/og_image.png`);

function title(m) {
  const parts = [m.role].filter(Boolean).join(" ");
  return `${m.name} 멘토${parts ? " | " + parts : ""} 1:1 커피챗 – 당신의사수`;
}

function description(m) {
  const base = m.summary || `${m.name} 멘토와 당신의사수 1:1 커피챗으로 이직·커리어 고민을 현직 시니어에게 직접 물어보세요.`;
  return base.length > 150 ? base.slice(0, 148) + "…" : base;
}

function jsonLd(m) {
  const person = {
    "@type": "Person",
    "@id": pageUrl(m) + "#person",
    name: m.name,
    url: pageUrl(m),
    description: m.summary || undefined,
    jobTitle: m.jobTitle || undefined,
    image: m.image ? absImg(m.image) : undefined,
    worksFor: m.company && !/^전\)/.test(m.company) ? { "@type": "Organization", name: m.company } : undefined,
    knowsAbout: m.tags.length ? m.tags : undefined,
    sameAs: m.sameAs.length ? m.sameAs : undefined,
    alumniOf: (m.education || []).length
      ? m.education.map((e) => ({ "@type": "EducationalOrganization", name: e }))
      : undefined,
    affiliation: { "@id": `${SITE}/#organization` },
  };
  const graph = [
    {
      "@type": "ProfilePage",
      "@id": pageUrl(m),
      url: pageUrl(m),
      name: title(m),
      inLanguage: "ko-KR",
      isPartOf: { "@id": `${SITE}/#website` },
      mainEntity: { "@id": pageUrl(m) + "#person" },
    },
    person,
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "당신의사수", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: "1:1 커피챗", item: `${SITE}/coffee-chat/` },
        { "@type": "ListItem", position: 3, name: `${m.name} 멘토`, item: pageUrl(m) },
      ],
    },
  ];
  if (m.priceHour) {
    graph.push({
      "@type": "Service",
      name: `${m.name} 멘토 당신의사수 1:1 커피챗`,
      serviceType: "1:1 커리어 멘토링",
      provider: { "@id": `${SITE}/#organization` },
      offers: {
        "@type": "Offer",
        price: withVat(m.priceHour),
        priceCurrency: "KRW",
        url: m.link || pageUrl(m),
        description: "1시간, 부가세 포함",
      },
    });
  }
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }, null, 2).replace(/</g, "\\u003c");
}

function avatar(m, cls) {
  if (m.image) return `<img class="${cls}" src="${esc(m.image)}" alt="${esc(m.name)} 멘토 프로필 사진" width="160" height="160" />`;
  return `<span class="${cls} mp-avatar--empty" aria-hidden="true">${esc(m.name.slice(0, 1))}</span>`;
}

function applyButton(m, extraCls, label) {
  if (!m.link) return `<a class="btn btn-primary btn-lg ${extraCls}" href="${KAKAO}" target="_blank" rel="noopener noreferrer">${esc(label)}</a>`;
  return `<a class="btn btn-primary btn-lg ${extraCls}" href="${esc(m.link)}" target="_blank" rel="noopener noreferrer">${esc(label)}</a>`;
}

function premiumBadge(m) {
  if (!m.premium) return "";
  return `<span class="mp-premium"><span aria-hidden="true">★</span> PREMIUM</span>`;
}

function factsBox(m) {
  const rows = [
    m.company && ["소속", m.company],
    m.role && ["경력", m.role],
    m.tags.length && ["전문 분야", m.tags.join(", ")],
    ["진행 방식", "1:1 화상"],
    m.priceHour && ["가격", `1시간 ${won(withVat(m.priceHour))} (부가세 포함)`],
  ].filter(Boolean);
  return `<dl class="mp-facts">
${rows.map(([k, v]) => `          <div class="mp-facts-row"><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("\n")}
        </dl>`;
}

function sectionProblems(m) {
  if (!m.problems.length) return "";
  return `
      <section class="mp-section" id="intro" aria-labelledby="mp-problems-h2">
        <h2 id="mp-problems-h2" class="mp-h2">${esc(m.name)} 멘토와 어떤 고민을 풀 수 있나요?</h2>
        <ul class="mp-problems">
${m.problems.map((p) => `          <li><h3>${esc(p.title)}</h3><p>${esc(p.desc)}</p></li>`).join("\n")}
        </ul>${m.quote ? `
        <figure class="mp-quote">
          <blockquote><p>${esc(m.quote)}</p></blockquote>
          <figcaption>${esc(m.name)} 멘토</figcaption>
        </figure>` : ""}
      </section>`;
}

function sectionRecommend(m) {
  if (!(m.recommend || []).length) return "";
  return `
      <section class="mp-section" id="recommend" aria-labelledby="mp-recommend-h2">
        <h2 id="mp-recommend-h2" class="mp-h2">${esc(m.name)} 멘토는 누구에게 맞나요?</h2>
        <ul class="mp-checks">
${m.recommend.map((r) => typeof r === "string" ? `          <li>${esc(r)}</li>` : `          <li${r.highlight ? ' class="is-highlight"' : ""}>${esc(r.text)}${r.note ? ` <span class="mp-checks-note">(${esc(r.note)})</span>` : ""}</li>`).join("\n")}
        </ul>
      </section>`;
}

function sectionStats(m) {
  if (!(m.stats || []).length) return "";
  return `
        <ul class="mp-stats">
${m.stats.map((st) => `          <li><strong>${esc(st.value)}</strong><span>${esc(st.label)}</span></li>`).join("\n")}
        </ul>`;
}

function sectionWhy(m) {
  if (!(m.why || []).length) return "";
  return `
      <section class="mp-section" id="why" aria-labelledby="mp-why-h2">
        <h2 id="mp-why-h2" class="mp-h2">왜 ${esc(m.name)} 멘토인가요?</h2>
        <div class="mp-why">
${m.why.map((w) => `          <p>${esc(w)}</p>`).join("\n")}
        </div>
      </section>`;
}

function sectionCareer(m) {
  const edu = m.education || [];
  const hl = m.highlights || [];
  if (!m.career.length && !edu.length && !hl.length && !m.careerSummary) return "";
  return `
      <section class="mp-section" id="career" aria-labelledby="mp-career-h2">
        <h2 id="mp-career-h2" class="mp-h2">${esc(m.name)} 멘토는 어떤 경력을 쌓았나요?</h2>${m.careerSummary ? `
        <p class="mp-career-summary">${esc(m.careerSummary)}</p>` : ""}${hl.length ? `
        <h3 class="mp-h3">주요 경력</h3>
        <ul class="mp-plain">
${hl.map((h) => `          <li>${esc(typeof h === "string" ? h : h.title)}</li>`).join("\n")}
        </ul>` : ""}${m.career.length ? `${hl.length ? `
        <h3 class="mp-h3">경력 흐름</h3>` : ""}
        <ol class="mp-career">
${m.career.map((c) => `          <li>${c.period ? `<span class="mp-career-period">${esc(c.period)}</span>` : ""}<strong>${esc(c.org)}</strong>${c.role ? `<span>${esc(c.role)}</span>` : ""}</li>`).join("\n")}
        </ol>` : ""}${edu.length ? `
        <h3 class="mp-h3">학력</h3>
        <ul class="mp-plain">
${edu.map((e) => `          <li>${esc(e)}</li>`).join("\n")}
        </ul>` : ""}${m.sameAs.length ? `
        <h3 class="mp-h3">외부 프로필</h3>
        <ul class="mp-plain">
${m.sameAs.map((u) => `          <li><a href="${esc(u)}" target="_blank" rel="noopener noreferrer">${esc(decodeURI(u).replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""))}</a></li>`).join("\n")}
        </ul>` : ""}
      </section>`;
}

function sectionHow() {
  return `
      <section class="mp-section" id="how" aria-labelledby="mp-how-h2">
        <h2 id="mp-how-h2" class="mp-h2">커피챗은 어떻게 진행되나요?</h2>
        <ol class="mp-steps">
${COFFEE_CHAT_STEPS.map((s, i) => `          <li><span class="mp-step-label">STEP 0${i + 1}</span><h3>${esc(s.title)}</h3><p>${esc(s.desc)}</p></li>`).join("\n")}
        </ol>
      </section>`;
}

function sectionReviews(m) {
  const body = m.reviews.length
    ? `<ul class="mp-reviews">
${m.reviews.map((r) => `          <li><blockquote><p>${esc(r.quote)}</p></blockquote><p class="mp-review-author">${esc(r.author)}</p></li>`).join("\n")}
        </ul>`
    : `<p class="mp-empty">${m.isNew ? `${esc(m.name)} 멘토는 당신의사수에 새로 합류한 멘토라 아직 후기가 없어요. 첫 커피챗의 주인공이 되어 주세요.` : "아직 공개된 후기가 없어요."}</p>`;
  return `
      <section class="mp-section" id="reviews" aria-labelledby="mp-reviews-h2">
        <h2 id="mp-reviews-h2" class="mp-h2">${esc(m.name)} 멘토 커피챗 후기</h2>
        ${body}
      </section>`;
}

function sectionPrograms(m) {
  if (!(m.programs || []).length) return "";
  return `
      <section class="mp-section" aria-labelledby="mp-programs-h2">
        <h2 id="mp-programs-h2" class="mp-h2">${esc(m.name)} 멘토가 함께하는 프로그램</h2>
        <ul class="mp-programs">
${m.programs.map((p) => `          <li><a href="${esc(p.href)}"><strong>${esc(p.label)}</strong><span>${esc(p.desc)}</span></a></li>`).join("\n")}
        </ul>
      </section>`;
}

function sectionOthers(m) {
  const others = mentors.filter((o) => o.slug !== m.slug && o.page);
  if (!others.length) return "";
  return `
      <section class="mp-section" aria-labelledby="mp-others-h2">
        <h2 id="mp-others-h2" class="mp-h2">다른 멘토도 만나보세요</h2>
        <ul class="mp-others">
${others.map((o) => `          <li><a href="/mentors/${o.slug}/">${avatar(o, "mp-others-avatar")}<strong>${esc(o.name)}</strong><span>${esc(o.role)}</span></a></li>`).join("\n")}
        </ul>
      </section>`;
}

function renderPage(m) {
  const robots = "index, follow";
  const tabs = [
    (m.why || []).length && ["#why", "강점"],
    m.problems.length && ["#intro", "도움받을 수 있는 것"],
    (m.career.length || (m.education || []).length || (m.highlights || []).length || m.careerSummary) && ["#career", "경력"],
    ["#how", "진행 방식"],
    ["#reviews", "후기"],
  ].filter(Boolean);
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <!-- Meta Pixel Code -->
  <script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '1346473380886517');
  fbq('track', 'PageView');
  </script>
  <noscript><img height="1" width="1" style="display:none"
  src="https://www.facebook.com/tr?id=1346473380886517&ev=PageView&noscript=1"
  /></noscript>
  <!-- End Meta Pixel Code -->
  <!-- 이 파일은 scripts/build-mentors.js 가 만듭니다. 직접 고치지 말고 scripts/mentors-data.js 를 고친 뒤 다시 생성하세요. -->
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(title(m))}</title>
  <meta name="description" content="${esc(description(m))}" />
  <meta name="robots" content="${robots}" />
  <link rel="canonical" href="${pageUrl(m)}" />
  <meta property="og:type" content="profile" />
  <meta property="og:locale" content="ko_KR" />
  <meta property="og:site_name" content="당신의사수" />
  <meta property="og:url" content="${pageUrl(m)}" />
  <meta property="og:title" content="${esc(title(m))}" />
  <meta property="og:description" content="${esc(description(m))}" />
  <meta property="og:image" content="${esc(absImg(m.image))}" />
  <link rel="icon" type="image/png" sizes="144x144" href="/asset/favicon_144.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/styles.css" />
  <link rel="stylesheet" href="/mentors/mentor-profile.css" />
  <script type="application/ld+json">
${jsonLd(m)}
  </script>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-N9JL32SRHV"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'G-N9JL32SRHV');
  </script>
</head>
<body class="mp-page">
  <div id="site-header-root"></div>
  <script src="/site-header.js"></script>

  <main class="mp-main">

    <div class="mp-layout">
      <article class="mp-content">
        <header class="mp-hero">
          ${avatar(m, "mp-avatar")}
          <div class="mp-hero-text">
            ${m.company || m.premium ? `<p class="mp-badges">${m.company ? `<span class="mp-company">${esc(m.company)}</span>` : ""}${premiumBadge(m)}</p>` : ""}
            <h1 class="mp-name">${esc(m.name)} 멘토${m.jobTitle ? ` <span class="mp-name-job">${esc(m.jobTitle)}</span>` : ""}</h1>
            ${m.tags.length ? `<ul class="mp-tags">${m.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>` : ""}
          </div>
        </header>
        ${m.summary ? `<p class="mp-summary">${esc(m.summary)}</p>` : ""}${sectionStats(m)}

        <nav class="mp-tabs" aria-label="페이지 내 이동">
${tabs.map(([href, label]) => `          <a href="${href}">${label}</a>`).join("\n")}
        </nav>
${sectionWhy(m)}${sectionProblems(m)}${sectionRecommend(m)}${sectionCareer(m)}${sectionHow()}${sectionReviews(m)}${sectionPrograms(m)}${sectionOthers(m)}

        <section class="mp-section mp-final" aria-labelledby="mp-final-h2">
          <h2 id="mp-final-h2" class="mp-h2">${esc(m.name)} 멘토에게 직접 물어보세요</h2>
          <p>막막한 내 이직, 무엇이 문제인지 모르겠다면<br />당신의사수 1:1 커피챗으로 답을 찾으세요.</p>
          ${applyButton(m, "", "커피챗 신청하기")}
        </section>
      </article>

      <aside class="mp-aside" aria-label="커피챗 신청 정보">
        <div class="mp-aside-box">
          <p class="mp-aside-title">${esc(m.name)} 멘토 1:1 커피챗${premiumBadge(m)}</p>
          ${factsBox(m)}
          ${applyButton(m, "mp-apply", "커피챗 신청하기")}
        </div>
      </aside>
    </div>
  </main>

  <div class="mp-bottom-bar">
    <div>
      <strong>${esc(m.name)} 멘토</strong>
      ${m.priceHour ? `<span>1시간 ${won(withVat(m.priceHour))}</span>` : ""}
    </div>
    ${applyButton(m, "", "신청하기")}
  </div>

  <footer class="footer">
    <div class="container">
      <div class="footer-top">
        <div class="footer-brand">
          <a href="/" class="footer-brand-name">당신의사수</a>
          <p class="footer-brand-desc">IT 이직과 연봉 상승을 위한 1:1 사수</p>
        </div>
        <nav class="footer-links" aria-label="푸터 메뉴">
          <a href="/terms/">이용약관</a>
          <a href="/privacy/">개인정보처리방침</a>
        </nav>
      </div>
      <div class="footer-business" aria-label="사업자 정보">
        <p class="footer-business-name">주식회사 제이디멘션</p>
        <p>대표 : 손재희</p>
        <p>사업자주소 : 13461 경기도 성남시 분당구 운중로 141, 3층</p>
        <p>통신판매업 신고번호 : 제 2026-성남분당A-0281호</p>
        <p>사업자등록번호 : 487-87-03132</p>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 당신의사수. All rights reserved.</p>
      </div>
    </div>
  </footer>

  <script src="/script.js"></script>
</body>
</html>
`;
}

function updateSitemap(list) {
  const file = path.join(ROOT, "sitemap.xml");
  let xml = fs.readFileSync(file, "utf8");
  xml = xml.replace(/\s*<!-- mentors:start[^>]*-->[\s\S]*?<!-- mentors:end -->/, "");
  const entries = list
    .map((m) => `  <url>\n    <loc>${pageUrl(m)}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`)
    .join("\n");
  const block = `\n  <!-- mentors:start (scripts/build-mentors.js 가 관리) -->\n${entries}${entries ? "\n" : ""}  <!-- mentors:end -->`;
  xml = xml.replace(/\n<\/urlset>/, `${block}\n</urlset>`);
  fs.writeFileSync(file, xml);
}

const targets = only ? mentors.filter((m) => m.slug === only) : mentors.filter((m) => m.page);
if (only && !targets.length) {
  console.error(`slug "${only}" 멘토가 없어요.`);
  process.exit(1);
}
for (const m of targets) {
  const dir = path.join(ROOT, "mentors", m.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), renderPage(m));
  const missing = ["summary", "company", "role", "image", "link"].filter((k) => !m[k]);
  console.log(`✓ /mentors/${m.slug}/${missing.length ? "  비어 있는 칸: " + missing.join(", ") : ""}`);
}
// ── 메인·커피챗 멘토 카드 (정적 HTML) ──
function loadCardMentors() {
  // mentors.js 는 브라우저용 파일이라 document 없이 데이터만 꺼내 씁니다
  const ctx = { document: { querySelectorAll: () => [], querySelector: () => null } };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(ROOT, "mentors.js"), "utf8"), ctx);
  return ctx.MENTORS;
}

function renderCard(m) {
  const internal = m.link && m.link.charAt(0) === "/";
  const linkAttrs = m.link
    ? ` href="${esc(m.link)}"${internal ? "" : ' target="_blank" rel="noopener noreferrer"'}`
    : "";
  const tag = m.link ? "a" : "article";
  return `          <${tag} class="mentor-card mentor-card--featured mentor-card--clickable"${linkAttrs} data-mentor-id="${esc(m.id)}">
            <span class="mentor-card-featured-company">${esc(m.company)}</span>${m.premium ? `
            <span class="mentor-card-premium"><span aria-hidden="true">★</span> PREMIUM</span>` : ""}
            <div class="mentor-card-featured-avatar"><img src="${esc(m.image)}" alt="${esc(m.name)} 멘토" loading="lazy" /></div>
            <h3 class="mentor-card-featured-name">${esc(m.name)}</h3>
            <p class="mentor-card-featured-role">${esc(m.role)}</p>
            <ul class="mentor-card-tags mentor-card-featured-tags">${m.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
          </${tag}>`;
}

function updateCards(file, cardMentors) {
  const full = path.join(ROOT, file);
  const html = fs.readFileSync(full, "utf8");
  const re = /<!-- mentor-cards:start -->[\s\S]*?<!-- mentor-cards:end -->/;
  if (!re.test(html)) {
    console.warn(`! ${file} 에 mentor-cards 표시가 없어 건너뜀`);
    return;
  }
  const block = `<!-- mentor-cards:start -->
        <!-- 이 영역은 scripts/build-mentors.js 가 mentors.js 데이터로 만듭니다. 직접 고치지 마세요. -->
        <div class="mentor-cards" role="region" aria-label="오늘의 사수 슬라이드">
${cardMentors.map(renderCard).join("\n")}
        </div>
        <!-- mentor-cards:end -->`;
  fs.writeFileSync(full, html.replace(re, block));
  console.log(`✓ ${file} 멘토 카드 ${cardMentors.length}개`);
}

if (!only) {
  updateSitemap(mentors.filter((m) => m.page));
  console.log("✓ sitemap.xml 멘토 영역 갱신");
  const cardMentors = loadCardMentors();
  updateCards("index.html", cardMentors);
  updateCards("coffee-chat/index.html", cardMentors);
}
