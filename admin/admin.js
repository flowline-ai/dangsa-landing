const SUPABASE_URL = 'https://fexfxmuefvekurydgdlk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZleGZ4bXVlZnZla3VyeWRnZGxrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4MzEyNjEsImV4cCI6MjA5NjQwNzI2MX0.tPNuGEGHitrPBJ3ZoOlzxh30SqMf1iUK325-Kq4FoAM';

const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ============================================================
// 상수
// ============================================================
const TYPE_LABEL = {
  TYPE_HIGH: '장기 정체형',
  TYPE_MID: '방향 탐색형',
  TYPE_LOW: '준비 시작형',
};

const TYPE_CLASS = {
  TYPE_HIGH: 'type-high',
  TYPE_MID: 'type-mid',
  TYPE_LOW: 'type-low',
};

const QUESTIONS = [
  { id: 'q_a1', area: '이직 활동 현황', text: '서류를 지원해봤지만 합격률이 낮다고 느낀다' },
  { id: 'q_a2', area: '이직 활동 현황', text: '이직 준비 기간 대비 성과가 없어 답답함을 느낀다' },
  { id: 'q_a3', area: '이직 활동 현황', text: '포트폴리오나 이력서를 오랫동안 업데이트하지 못하고 있다' },
  { id: 'q_b1', area: '실무 경험 구성', text: '내 경험을 수치나 성과로 표현하기 어렵다' },
  { id: 'q_b2', area: '실무 경험 구성', text: '오너십을 갖고 주도한 경험이 부족하다고 느낀다' },
  { id: 'q_b3', area: '실무 경험 구성', text: '데이터를 직접 다뤄보거나 분석해본 경험이 거의 없다' },
  { id: 'q_c1', area: '서류 준비 상태', text: 'JD 요구 역량과 내 경험을 어떻게 연결할지 막막하다' },
  { id: 'q_c2', area: '서류 준비 상태', text: '내 경험이나 프로젝트를 이직 경쟁력으로 어떻게 보여줄지 모르겠다' },
  { id: 'q_d1', area: '커리어 방향성', text: '무엇부터 준비해야 할지 우선순위가 잡히지 않는다' },
  { id: 'q_d2', area: '커리어 방향성', text: '어떤 도메인·포지션으로 가야 성장과 연봉이 높은지 확신이 없다' },
  { id: 'q_d3', area: '커리어 방향성', text: '내가 제대로 준비하고 있는지 피드백 받을 곳이 없다' },
  { id: 'q_d4', area: '커리어 방향성', text: '이직 후 연봉을 얼마나 올릴 수 있을지 감이 없다' },
];

// ============================================================
// 점수 로직 (2025년 6월 개편 기준)
// ============================================================
// 응답 방식: 3단계 척도 (1=아니다 / 2=가끔 그렇다 / 3=매우 그렇다)
// 점수 계산: 영역별 응답값 합산 × 가중치 / 영역 max × 100
//   A 이직활동: 3문항 × weight 1.5 / max 13.5
//   B 실무경험: 3문항 × weight 2.0 / max 18.0
//   C 서류준비: 2문항 × weight 1.8 / max 10.8
//   D 커리어방향: 4문항 × weight 1.6 / max 19.2
//   TOTAL_MAX: 61.5
// 유형 기준:
//   장기 정체형: 65점 이상   (아니다 all=33 / 가끔all=67 / 매우all=100)
//   방향 탐색형: 40~64점
//   준비 시작형: 39점 이하

const GUIDES = {
  TYPE_HIGH: `핵심 상황:
이직 시도 경험이 있으나 결과가 나오지 않는 상태.
혼자 개선하기 어려운 구간에 진입했을 가능성이 높음.

상담 포인트:
- "지금까지 몇 곳에 지원했고, 어디까지 통과했나요?" → 탈락 패턴 파악
- B영역 점수 높을 경우: 실무 경험 재서술 문제 집중 탐색
- A+B 복합 높을 경우: 지원 전략 자체를 바꿔야 하는 단계임을 명확히 전달
- 구매 저항이 낮은 상태 — 커피챗 첫 미팅 후 3개월 컨설팅 업셀 가능

추천 상품: 커피챗 (1순위) → 3개월 컨설팅 업셀
주의사항: "열심히 하면 된다" 식의 위로는 신뢰를 오히려 떨어뜨림.`,
  TYPE_MID: `핵심 상황:
방향은 어느 정도 잡혀 있으나 핵심 허점이 존재.
결정권자 시각이 부재한 상태.

상담 포인트:
- 취약 영역 1~2개 집중 탐색 ("이 부분은 어떻게 준비하고 계세요?")
- C영역 높을 경우: JD 분석법 + 경험 프레이밍 방법론 소개
- D영역 높을 경우: 도메인 선택 기준과 연봉 협상 전략 연결
- 커피챗 1회로 방향 정리 후 2주 스프린트 전환 유도

추천 상품: 커피챗 (1순위) → 2주 스프린트 업셀
주의사항: "조금만 더 하면 된다"는 응원보다 구체적 위험 제시가 효과적.`,
  TYPE_LOW: `핵심 상황:
이직을 구체적으로 준비하기 전이거나 초기 탐색 단계.
구매 동기가 낮으므로 신뢰 구축이 우선.

상담 포인트:
- 고압적 세일즈 금지 — 먼저 현장 시각을 제공하는 것이 목표
- "지금 이직을 생각하게 된 계기가 뭔가요?" → 동기 파악
- 커피챗으로 방향 잡기 유도, 필요 시 무료 웨비나 참여 안내

추천 상품: 커피챗 (1순위) → 무료 웨비나
주의사항: 이 유형에게 고가 상품을 직접 권유하면 이탈률 높음.`,
};

// ============================================================
// 상태
// ============================================================
let allData = [];
let filteredData = [];
let currentFilter = 'all';

// ============================================================
// 인증
// ============================================================
async function init() {
  const { data: { session } } = await client.auth.getSession();
  if (session) {
    showDashboard();
  } else {
    showLogin();
  }
}

function showLogin() {
  document.getElementById('login-phase').hidden = false;
  document.getElementById('dashboard-phase').hidden = true;
}

async function showDashboard() {
  document.getElementById('login-phase').hidden = true;
  document.getElementById('dashboard-phase').hidden = false;
  await loadData();
}

// ============================================================
// 로그인
// ============================================================
document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  const btn = document.getElementById('login-btn');
  const errEl = document.getElementById('login-error');

  btn.disabled = true;
  btn.textContent = '로그인 중...';
  errEl.textContent = '';

  const { error } = await client.auth.signInWithPassword({ email, password });

  if (error) {
    errEl.textContent = '이메일 또는 비밀번호가 올바르지 않습니다.';
    btn.disabled = false;
    btn.textContent = '로그인';
  } else {
    showDashboard();
  }
});

document.getElementById('logout-btn').addEventListener('click', async () => {
  await client.auth.signOut();
  showLogin();
});

// ============================================================
// 데이터 로드
// ============================================================
async function loadData() {
  const { data, error } = await client
    .from('checklist_responses')
    .select('*')
    .order('submitted_at', { ascending: false });

  if (error) {
    console.error('[admin] fetch error:', error);
    return;
  }

  allData = data || [];
  applyFilter(currentFilter);
  renderStats();
}

// ============================================================
// 통계
// ============================================================
function renderStats() {
  const total = allData.length;
  const high = allData.filter(r => r.user_type === 'TYPE_HIGH').length;
  const mid  = allData.filter(r => r.user_type === 'TYPE_MID').length;
  const low  = allData.filter(r => r.user_type === 'TYPE_LOW').length;

  document.getElementById('stat-row').innerHTML = `
    <div class="ad-stat-card"><strong>${total}</strong><span>전체 응답</span></div>
    <div class="ad-stat-card"><strong>${high}</strong><span>장기 정체형</span></div>
    <div class="ad-stat-card"><strong>${mid}</strong><span>방향 탐색형</span></div>
    <div class="ad-stat-card"><strong>${low}</strong><span>준비 시작형</span></div>
  `;
}

// ============================================================
// 필터
// ============================================================
function applyFilter(type) {
  currentFilter = type;
  filteredData = type === 'all' ? [...allData] : allData.filter(r => r.user_type === type);

  document.querySelectorAll('.ad-filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.type === type);
  });

  renderTable();
}

document.querySelectorAll('.ad-filter-btn').forEach(btn => {
  btn.addEventListener('click', () => applyFilter(btn.dataset.type));
});

// ============================================================
// 테이블
// ============================================================
function formatDate(iso) {
  if (!iso) return '-';
  const d = new Date(iso);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
}

function renderTable() {
  const tbody = document.getElementById('table-body');
  const empty = document.getElementById('table-empty');

  if (filteredData.length === 0) {
    tbody.innerHTML = '';
    empty.hidden = false;
    return;
  }

  empty.hidden = true;
  tbody.innerHTML = filteredData.map(r => `
    <tr data-id="${r.id}">
      <td>${formatDate(r.submitted_at)}</td>
      <td>${r.nickname || '-'}</td>
      <td>${r.email || '-'}</td>
      <td><span class="ad-type-badge ${TYPE_CLASS[r.user_type] || ''}">${TYPE_LABEL[r.user_type] || r.user_type || '-'}</span></td>
      <td>${r.score_total ?? '-'}</td>
      <td>${r.score_a ?? '-'}</td>
      <td>${r.score_b ?? '-'}</td>
      <td>${r.score_c ?? '-'}</td>
      <td>${r.score_d ?? '-'}</td>
      <td class="ad-action-cell">
        <button class="ad-detail-btn" data-id="${r.id}">상세</button>
        <button class="ad-delete-btn" data-id="${r.id}">삭제</button>
      </td>
    </tr>
  `).join('');

  tbody.querySelectorAll('.ad-detail-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const row = allData.find(r => r.id === btn.dataset.id);
      if (row) openModal(row);
    });
  });

  tbody.querySelectorAll('.ad-delete-btn').forEach(btn => {
    btn.addEventListener('click', () => deleteRow(btn.dataset.id));
  });
}

// ============================================================
// 행 삭제
// ============================================================
async function deleteRow(id) {
  if (!confirm('이 응답을 삭제할까요?')) return;

  const { error } = await client.from('checklist_responses').delete().eq('id', id);

  if (error) {
    alert('삭제 실패: ' + error.message);
    return;
  }

  allData = allData.filter(r => r.id !== id);
  applyFilter(currentFilter);
  renderStats();
}

// ============================================================
// 레이더 차트 SVG (checklist.js와 동일)
// ============================================================
function buildRadarSVG(scores) {
  const cx = 170, cy = 170, r = 90;
  const axes = [
    { key: 'score_a', label: '이직 활동', angle: -90 },
    { key: 'score_b', label: '실무 경험', angle: 0 },
    { key: 'score_c', label: '서류 준비', angle: 90 },
    { key: 'score_d', label: '커리어 방향', angle: 180 },
  ];

  function pt(angle, radius) {
    const rad = (angle * Math.PI) / 180;
    return { x: +(cx + Math.cos(rad) * radius).toFixed(2), y: +(cy + Math.sin(rad) * radius).toFixed(2) };
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

  const labels = axes.map(a => {
    const p = pt(a.angle, r + 26);
    let anchor = 'middle';
    if (a.angle === 0) anchor = 'start';
    if (a.angle === 180) anchor = 'end';
    return `<text x="${p.x}" y="${p.y}" text-anchor="${anchor}" dominant-baseline="middle" font-size="11" fill="#6b7280" font-family="'Noto Sans KR',system-ui">${a.label}</text>`;
  }).join('');

  const dots = axes.map(a => {
    const val = Math.min((scores[a.key] || 0) / 100, 1);
    const p = pt(a.angle, r * val);
    return `<circle cx="${p.x}" cy="${p.y}" r="4" fill="#111827"/>`;
  }).join('');

  return `<svg viewBox="0 0 340 340" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    ${grid}${axisLines}
    <polygon points="${scorePoints}" fill="rgba(17,24,39,0.1)" stroke="#111827" stroke-width="2.5" stroke-linejoin="round"/>
    ${dots}${labels}
  </svg>`;
}

// ============================================================
// 모달
// ============================================================
function openModal(r) {
  const modal = document.getElementById('detail-modal');
  const body = document.getElementById('modal-body');

  // 영역별 문항 그룹화
  const areas = [...new Set(QUESTIONS.map(q => q.area))];
  const qListHtml = areas.map(area => {
    const qs = QUESTIONS.filter(q => q.area === area);
    return `
      <p class="ad-q-area-label">${area}</p>
      ${qs.map(q => {
        const raw = r[q.id];
        const val = raw === true ? 3 : raw === false ? 0 : (parseInt(raw) || 0);
        const scaleLabel = ['–', '아니다', '가끔 그렇다', '매우 그렇다'][val] || '–';
        const cls = val === 3 ? 'scale-high' : val === 2 ? 'scale-mid' : val === 1 ? 'scale-low' : '';
        return `
          <div class="ad-q-item ${val > 0 ? 'checked' : ''}">
            <span class="ad-q-check ${cls}">${val > 0 ? val : '–'}</span>
            <span>${q.text}<small class="ad-q-scale-label"> · ${scaleLabel}</small></span>
          </div>
        `;
      }).join('')}
    `;
  }).join('');

  body.innerHTML = `
    <div class="ad-modal-section">
      <p class="ad-modal-section-title">기본 정보</p>
      <div class="ad-info-grid">
        <div class="ad-info-item"><label>닉네임</label><p>${r.nickname || '-'}</p></div>
        <div class="ad-info-item"><label>이메일</label><p>${r.email || '-'}</p></div>
        <div class="ad-info-item"><label>제출 일시</label><p>${formatDate(r.submitted_at)}</p></div>
        <div class="ad-info-item"><label>유형</label><p><span class="ad-type-badge ${TYPE_CLASS[r.user_type] || ''}">${TYPE_LABEL[r.user_type] || '-'}</span></p></div>
      </div>
    </div>

    <div class="ad-modal-section">
      <p class="ad-modal-section-title">영역별 점수</p>
      <div class="ad-radar-wrap">${buildRadarSVG({ score_a: r.score_a, score_b: r.score_b, score_c: r.score_c, score_d: r.score_d })}</div>
      <div class="ad-score-grid">
        <div class="ad-score-item"><strong>${r.score_total ?? '-'}</strong><span>전체</span></div>
        <div class="ad-score-item"><strong>${r.score_a ?? '-'}</strong><span>A 이직활동</span></div>
        <div class="ad-score-item"><strong>${r.score_b ?? '-'}</strong><span>B 실무경험</span></div>
        <div class="ad-score-item"><strong>${r.score_c ?? '-'}</strong><span>C 서류준비</span></div>
        <div class="ad-score-item"><strong>${r.score_d ?? '-'}</strong><span>D 커리어방향</span></div>
      </div>
    </div>

    <div class="ad-modal-section">
      <p class="ad-modal-section-title">문항별 응답</p>
      <div class="ad-q-list">${qListHtml}</div>
    </div>

    <div class="ad-modal-section">
      <p class="ad-modal-section-title">상담 가이드</p>
      <div class="ad-guide-box">${GUIDES[r.user_type] || '유형 정보 없음'}</div>
    </div>
  `;

  modal.hidden = false;
}

function closeModal() {
  document.getElementById('detail-modal').hidden = true;
}

document.getElementById('modal-close').addEventListener('click', closeModal);
document.getElementById('modal-overlay').addEventListener('click', closeModal);

// ============================================================
// CSV 내보내기
// ============================================================
document.getElementById('csv-btn').addEventListener('click', () => {
  if (filteredData.length === 0) return;

  const headers = ['제출일시','닉네임','이메일','유형','전체점수','A영역','B영역','C영역','D영역',
    ...QUESTIONS.map(q => q.text)];

  const rows = filteredData.map(r => [
    formatDate(r.submitted_at),
    r.nickname || '',
    r.email || '',
    TYPE_LABEL[r.user_type] || r.user_type || '',
    r.score_total ?? '',
    r.score_a ?? '',
    r.score_b ?? '',
    r.score_c ?? '',
    r.score_d ?? '',
    ...QUESTIONS.map(q => r[q.id] ?? ''),
  ].map(v => `"${String(v).replace(/"/g, '""')}"`).join(','));

  const csv = '﻿' + [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `checklist_${new Date().toISOString().slice(0,10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
});

// ============================================================
// 초기화
// ============================================================
init();
