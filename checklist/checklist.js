// ============================================================
// Supabase 설정 — 실제 값으로 교체하세요
// ============================================================
const SUPABASE_URL = 'https://fexfxmuefvekurydgdlk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZleGZ4bXVlZnZla3VyeWRnZGxrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4MzEyNjEsImV4cCI6MjA5NjQwNzI2MX0.tPNuGEGHitrPBJ3ZoOlzxh30SqMf1iUK325-Kq4FoAM';
const KAKAO_CHANNEL_URL = 'http://pf.kakao.com/_fxdxdqX';

// ============================================================
// 문항 데이터 (PRD 기준)
// ============================================================
const SCALE_LABELS = ['아니다', '가끔 그렇다', '매우 그렇다'];

const AREAS = [
  {
    key: 'A',
    label: '이직 활동 현황',
    weakness: '이직 전략 점검 필요',
    weight: 1.5,
    max: 13.5,
    questions: [
      { id: 'a1', text: '서류를 지원해봤지만 합격률이 낮다고 느낀다' },
      { id: 'a2', text: '이직 준비 기간 대비 성과가 없어 답답함을 느낀다' },
      { id: 'a3', text: '포트폴리오나 이력서를 오랫동안 업데이트하지 못하고 있다' },
    ],
  },
  {
    key: 'B',
    label: '실무 경험 구성',
    weakness: '실무 경험 정리 필요',
    weight: 2.0,
    max: 18.0,
    questions: [
      { id: 'b1', text: '내 경험을 수치나 성과로 표현하기 어렵다' },
      { id: 'b2', text: '오너십을 갖고 주도한 경험이 부족하다고 느낀다' },
      { id: 'b3', text: '데이터를 직접 다뤄보거나 분석해본 경험이 거의 없다' },
    ],
  },
  {
    key: 'C',
    label: '서류 준비 상태',
    weakness: '서류 준비 시작 필요',
    weight: 1.8,
    max: 10.8,
    questions: [
      { id: 'c1', text: 'JD 요구 역량과 내 경험을 어떻게 연결할지 막막하다' },
      { id: 'c2', text: '내 경험이나 프로젝트를 이직 경쟁력으로 어떻게 보여줄지 모르겠다' },
    ],
  },
  {
    key: 'D',
    label: '커리어 방향성',
    weakness: '커리어 방향 설정 필요',
    weight: 1.6,
    max: 19.2,
    questions: [
      { id: 'd1', text: '무엇부터 준비해야 할지 우선순위가 잡히지 않는다' },
      { id: 'd2', text: '어떤 도메인·포지션으로 가야 성장과 연봉이 높은지 확신이 없다' },
      { id: 'd3', text: '내가 제대로 준비하고 있는지 피드백 받을 곳이 없다' },
      { id: 'd4', text: '이직 후 연봉을 얼마나 올릴 수 있을지 감이 없다' },
    ],
  },
];

const TOTAL_MAX = 61.5;

// ============================================================
// 유형 메타 데이터 (PRD 기준)
// ============================================================
// 프로그램별 추천 멘토 데이터
const PROGRAM_MENTORS = {
  '1:1 커피챗': [
    { img: '/asset/mento_simjaekwon.jpg', name: '심재권' },
    { img: '/asset/mento_parksoochang.jpg', name: '박수창' },
    { img: '/asset/mento_jinyongjin.jpg', name: '진용진' },
    { img: '/asset/mento_nononi.jpg', name: '노노니' },
    { img: '/asset/mento_hwangseil.png', name: '마르셀' },
  ],
  '2주 스프린트 (6명 소수 정예)': [
    { img: '/asset/mento_parksoochang.jpg', name: '박수창' },
    { img: '/asset/mento_jinyongjin.jpg', name: '진용진' },
    { img: '/asset/mento_nononi.jpg', name: '노노니' },
    { img: '/asset/mento_hwangseil.png', name: '마르셀' },
  ],
  '1:1 이직 전략 컨설팅': [
    { img: '/asset/mento_simjaekwon.jpg', name: '심재권' },
    { img: '/asset/mento_hwangseil.png', name: '마르셀' },
  ],
  '무료 웨비나': [],
};

const TYPE_META = {
  TYPE_HIGH: {
    label: '장기 정체형',
    image: '/asset/type_high.svg',
    desc: '열심히 하고 있는데 결과가 안 나오는 상태예요. 노력이 부족한 게 아니라, 지금 방법이 나에게 맞지 않을 가능성이 높습니다. 전략 자체를 다시 짜야 할 시점이에요.',
    products: [
      { rank: 1, name: '1:1 커피챗', price: '1시간 66,000원~', desc: '현직 사수와 1:1로 이직 방향과 전략을 점검합니다.', link: '/coffee-chat/' },
      { rank: 2, name: '1:1 이직 전략 컨설팅', price: '3개월 990,000원 ~ 3,960,000원', desc: '이직 전략 전면 재설계 · 서류 보완 · 면접 코칭 · 연봉 협상', link: '/career-consulting/' },
    ],
  },
  TYPE_MID: {
    label: '방향 탐색형',
    image: '/asset/type_mid.svg',
    desc: '이직을 준비하며 움직이고 있지만, 내가 제대로 된 방향으로 가고 있는지 확신이 서지 않는 단계예요. 방향과 우선순위를 잡으면 속도가 훨씬 빨라질 수 있어요.',
    products: [
      { rank: 1, name: '1:1 커피챗', price: '1시간 66,000원~', desc: '현직 사수와 1:1로 이직 방향과 전략을 점검합니다.', link: '/coffee-chat/' },
      { rank: 2, name: '2주 스프린트 (6명 소수 정예)', price: '330,000원', desc: '지원기업 발굴, 이력서 및 포폴 업그레이드', link: '/career-consulting/' },
    ],
  },
  TYPE_LOW: {
    label: '준비 시작형',
    image: '/asset/type_low.svg',
    desc: '이직을 고민하고 있거나 막 시작한 단계예요. 지금은 무엇부터 해야 할지 모르는 게 당연해요. 올바른 순서와 방향을 잡는 것이 가장 먼저입니다.',
    products: [
      { rank: 1, name: '1:1 커피챗', price: '1시간 66,000원~', desc: '현직 사수와 1:1로 이직 방향과 전략을 점검합니다.', link: '/coffee-chat/' },
      { rank: 2, name: '무료 웨비나', price: '무료', desc: '현직 시니어가 직접 전하는 커리어 인사이트', link: '/seminar/' },
    ],
  },
};

// ============================================================
// 점수 계산 (PRD 공식)
// ============================================================
function calcScore(responses) {
  let totalWeighted = 0;
  const areaData = {};

  for (const area of AREAS) {
    const sumOfValues = area.questions.reduce((sum, q) => sum + (responses[`q_${q.id}`] || 0), 0);
    const weighted = sumOfValues * area.weight;
    totalWeighted += weighted;
    areaData[area.key] = {
      label: area.label,
      weakness: area.weakness,
      score: Math.min(Math.round(weighted / area.max * 100), 100),
    };
  }

  return {
    score_total: Math.min(Math.round(totalWeighted / TOTAL_MAX * 100), 100),
    score_a: areaData.A.score,
    score_b: areaData.B.score,
    score_c: areaData.C.score,
    score_d: areaData.D.score,
    areaData,
  };
}

function getType(score) {
  if (score >= 80) return 'TYPE_HIGH';
  if (score >= 60) return 'TYPE_MID';
  return 'TYPE_LOW';
}

function getTopBottlenecks(areaData) {
  return Object.values(areaData)
    .sort((a, b) => b.score - a.score)
    .map(v => v.weakness);
}

// ============================================================
// 레이더 차트 SVG 생성
// ============================================================
function buildRadarSVG(scores) {
  const cx = 230, cy = 210, r = 150;

  // A=위, B=오른쪽, C=아래, D=왼쪽
  const axes = [
    { key: 'score_a', label: '이직 전략 점검 필요', angle: -90 },
    { key: 'score_b', label: '실무 경험 정리 필요', angle: 0 },
    { key: 'score_c', label: '서류 준비 시작 필요', angle: 90 },
    { key: 'score_d', label: '커리어 방향 설정 필요', angle: 180 },
  ];

  function pt(angle, radius) {
    const rad = (angle * Math.PI) / 180;
    return {
      x: +(cx + Math.cos(rad) * radius).toFixed(2),
      y: +(cy + Math.sin(rad) * radius).toFixed(2),
    };
  }

  function polygonStr(radius) {
    return axes.map(a => { const p = pt(a.angle, radius); return `${p.x},${p.y}`; }).join(' ');
  }

  const grid = [0.25, 0.5, 0.75, 1].map(f =>
    `<polygon points="${polygonStr(r * f)}" fill="none" stroke="#e5e7eb" stroke-width="1"/>`
  ).join('');

  const axisLines = axes.map(a => {
    const p = pt(a.angle, r);
    return `<line x1="${cx}" y1="${cy}" x2="${p.x}" y2="${p.y}" stroke="#e5e7eb" stroke-width="1"/>`;
  }).join('');

  const scorePoints = axes.map(a => {
    const val = Math.min((scores[a.key] || 0) / 100, 1);
    const p = pt(a.angle, r * val);
    return `${p.x},${p.y}`;
  }).join(' ');

  const labelOffset = 28;
  const labels = axes.map(a => {
    const p = pt(a.angle, r + labelOffset);
    let anchor = 'middle';
    if (a.angle === 0) anchor = 'start';
    if (a.angle === 180) anchor = 'end';
    return `<text x="${p.x}" y="${p.y}" text-anchor="${anchor}" dominant-baseline="middle" font-size="17.6" fill="#6b7280" font-family="'Noto Sans KR',system-ui">${a.label}</text>`;
  }).join('');

  return `<svg viewBox="-170 0 800 420" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    ${grid}
    ${axisLines}
    <polygon points="${scorePoints}" fill="rgba(17,24,39,0.1)" stroke="#111827" stroke-width="2.5" stroke-linejoin="round"/>
    ${axes.map(a => {
      const val = Math.min((scores[a.key] || 0) / 100, 1);
      const p = pt(a.angle, r * val);
      return `<circle cx="${p.x}" cy="${p.y}" r="6" fill="#111827"/>`;
    }).join('')}
    ${labels}
  </svg>`;
}

// ============================================================
// Supabase 저장 (비동기, 결과 무관하게 진행)
// ============================================================
async function saveToSupabase(responses, scores, userType, nickname) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return;

  try {
    const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    await client.from('checklist_responses').insert({
      nickname,
      ...responses,
      score_total: scores.score_total,
      score_a: scores.score_a,
      score_b: scores.score_b,
      score_c: scores.score_c,
      score_d: scores.score_d,
      user_type: userType,
    });
  } catch (err) {
    console.error('[checklist] insert failed:', err);
  }
}

// ============================================================
// DOM 렌더링
// ============================================================
function renderForm() {
  const container = document.getElementById('questions-container');

  container.innerHTML = AREAS.map(area => `
    <div class="area-section">
      <div class="area-header">
        <span class="area-badge">${area.key}</span>
        <h3 class="area-title">${area.label}</h3>
      </div>
      <div class="question-list">
        ${area.questions.map(q => `
          <div class="question-item" data-qid="q_${q.id}">
            <span class="question-text">${q.text}</span>
            <div class="question-scale">
              ${SCALE_LABELS.map((label, i) => `
                <label class="scale-option">
                  <input type="radio" name="q_${q.id}" value="${i + 1}" class="q-radio" />
                  <span class="scale-btn">${label}</span>
                </label>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');

  container.addEventListener('change', () => {
    updateProgress();
    validateForm();
  });
}

function updateProgress() {
  const allNames = [...new Set([...document.querySelectorAll('.q-radio')].map(r => r.name))];
  const total = allNames.length;
  const answered = allNames.filter(name => document.querySelector(`input[name="${name}"]:checked`)).length;
  const pct = Math.round((answered / total) * 100);

  const bar = document.getElementById('progress-bar');
  const label = document.getElementById('progress-label');
  if (bar) bar.style.width = pct + '%';
  if (label) label.textContent = `${answered}/${total} 항목 응답`;
}

function validateForm() {
  const nickname = document.getElementById('nickname').value.trim();

  const allNames = [...new Set([...document.querySelectorAll('.q-radio')].map(r => r.name))];
  const allAnswered = allNames.every(name => document.querySelector(`input[name="${name}"]:checked`));

  const btn = document.getElementById('submit-btn');
  btn.disabled = !(nickname.length >= 1 && allAnswered);
}

function getResponses() {
  const responses = {};
  const allNames = [...new Set([...document.querySelectorAll('.q-radio')].map(r => r.name))];
  allNames.forEach(name => {
    const checked = document.querySelector(`input[name="${name}"]:checked`);
    responses[name] = checked ? parseInt(checked.value) : 0;
  });
  return responses;
}

function renderResult(scores, typeMeta, topBottlenecks, nickname) {
  // Block 1
  document.getElementById('result-nickname').textContent = nickname;
  document.getElementById('type-label').textContent = typeMeta.label;
  document.getElementById('type-desc').textContent = typeMeta.desc;

  const imgEl = document.getElementById('result-type-image');
  if (typeMeta.image) {
    imgEl.src = typeMeta.image;
    imgEl.hidden = false;
  } else {
    imgEl.hidden = true;
  }
  document.getElementById('tag-top1').textContent = topBottlenecks[0];
  document.getElementById('tag-top2').textContent = topBottlenecks[1];

  // Block 2
  document.getElementById('radar-chart').innerHTML = buildRadarSVG(scores);

  // Block 3+4: 유형별 프로그램 + 추천 멘토 통합 렌더링
  document.getElementById('program-mentor-grid').innerHTML = typeMeta.products.map(p => {
    const mentors = PROGRAM_MENTORS[p.name] || [];
    const mentorHTML = mentors.length > 0
      ? `<div class="cl-mentor-rec-avatars">${mentors.map(m => `
          <div class="cl-mentor-avatar">
            <img src="${m.img}" alt="${m.name}" />
            <span>${m.name}</span>
          </div>`).join('')}
        </div>`
      : '';
    return `
      <div class="cl-mentor-rec-item">
        <div class="cl-mentor-rec-header">
          <div class="cl-mentor-rec-info">
            <span class="cl-mentor-rec-badge ${p.rank > 1 ? 'cl-mentor-rec-badge--secondary' : ''}">${p.rank}순위 추천</span>
            <h4 class="cl-mentor-rec-name">${p.name}</h4>
            <p class="cl-mentor-rec-price">${p.price}</p>
            <p class="cl-mentor-rec-desc">${p.desc}</p>
          </div>
        </div>
        ${mentorHTML}
      </div>`;
  }).join('');
}

// ============================================================
// 제출 핸들러
// ============================================================
async function handleSubmit(e) {
  e.preventDefault();

  const nickname = document.getElementById('nickname').value.trim();
  const btn = document.getElementById('submit-btn');

  btn.disabled = true;
  btn.textContent = '분석 중...';

  const responses = getResponses();
  const scores = calcScore(responses);
  const userType = getType(scores.score_total);
  const typeMeta = TYPE_META[userType];
  const topBottlenecks = getTopBottlenecks(scores.areaData);

  // Supabase 저장 (비동기, 결과 무관하게 진행)
  saveToSupabase(responses, scores, userType, nickname);

  renderResult(scores, typeMeta, topBottlenecks, nickname);

  document.getElementById('form-phase').hidden = true;
  document.getElementById('result-phase').hidden = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (typeof fbq === 'function') fbq('track', 'Lead');
}

// ============================================================
// 초기화
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  renderForm();

  document.getElementById('nickname').addEventListener('input', validateForm);

  document.getElementById('checklist-form').addEventListener('submit', handleSubmit);

  document.getElementById('kakao-cta-btn').addEventListener('click', () => {
    window.open(KAKAO_CHANNEL_URL, '_blank', 'noopener,noreferrer');
  });

  document.getElementById('retry-btn').addEventListener('click', () => {
    document.getElementById('result-phase').hidden = true;
    document.getElementById('form-phase').hidden = false;
    // 폼 초기화
    document.querySelectorAll('.q-radio').forEach(r => { r.checked = false; });
    document.getElementById('nickname').value = '';
    validateForm();
    updateProgress();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
