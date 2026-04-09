// CounterOS App — Full SPA
'use strict';

let currentRole = 'hq';
let currentScreen = 'hq-dashboard';

const IC = {
  dashboard: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
  map: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>`,
  users: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  campaign: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
  retail: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  rewards: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>`,
  reports: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
  approvals: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>`,
  tasks: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>`,
  scan: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 7 23 1 17 1"/><line x1="16" y1="8" x2="23" y2="1"/><polyline points="1 17 1 23 7 23"/><line x1="8" y1="16" x2="1" y2="23"/></svg>`,
  inventory: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
  shield: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  verified: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>`,
  hierarchy: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="5" r="3"/><line x1="12" y1="8" x2="12" y2="13"/><line x1="12" y1="13" x2="6" y2="19"/><line x1="12" y1="13" x2="18" y2="19"/><circle cx="6" cy="19" r="2"/><circle cx="18" cy="19" r="2"/></svg>`,
  star: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  settings: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>`,
};

function upArrow(up) {
  return up
    ? `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="18 15 12 9 6 15"/></svg>`
    : `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="6 9 12 15 18 9"/></svg>`;
}

function trendSVG(dir) {
  if (dir === 'up') return `<svg width="32" height="16" viewBox="0 0 32 16"><polyline points="0,14 8,10 16,6 24,4 32,2" fill="none" stroke="#22c55e" stroke-width="2"/></svg>`;
  if (dir === 'flat') return `<svg width="32" height="16" viewBox="0 0 32 16"><polyline points="0,8 32,8" fill="none" stroke="#eab308" stroke-width="2"/></svg>`;
  return `<svg width="32" height="16" viewBox="0 0 32 16"><polyline points="0,2 8,4 16,8 24,10 32,14" fill="none" stroke="#ef4444" stroke-width="2"/></svg>`;
}

function filterSelect(label, value) {
  return `<div class="filter-group">
    <label class="filter-label">${label}</label>
    <select class="filter-select"><option>${value}</option></select>
  </div>`;
}

function metricCard(m) {
  const iconMap = {
    sales:'💰', box:'📦', store:'🏪', verified:'🛡️', gift:'🎁', roi:'📈',
    map:'🗺️', village:'🏘️', sku:'📊', score:'⭐', cyan:'🔵', fire:'🔥'
  };
  const ic = iconMap[m.icon] || '📊';
  return `<div class="metric-card${m.streak?' streak-card':''}">
    <div class="metric-icon ${m.color}" style="font-size:14px;">${ic}</div>
    <div class="metric-label">${m.label}</div>
    <div class="metric-value">${m.value}</div>
    ${m.change ? `<div class="metric-change ${m.up===false?'down':'up'}">${upArrow(m.up!==false)} ${m.change} <span class="sub">${m.sub||''}</span></div>` : `<div style="font-size:11px;color:var(--text3);margin-top:4px;">${m.sub||''}</div>`}
  </div>`;
}

function alertItem(a) {
  const iconMap = {
    red:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
    blue:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
    yellow:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
    orange:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>`,
    green:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`,
  };
  return `<div class="alert-item">
    <div class="alert-icon-wrap ${a.type}">${iconMap[a.type]||iconMap.blue}</div>
    <div>
      <div class="alert-text">${a.title}</div>
      <div class="alert-sub">${a.sub}</div>
    </div>
  </div>`;
}

function buildAlertsPanel(alerts, ai) {
  return `<div style="background:var(--bg2);border-left:1px solid var(--border);overflow-y:auto;max-height:calc(100vh - 52px);padding:16px;display:flex;flex-direction:column;gap:10px;">
    <div>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
        <span style="font-size:13px;font-weight:600;color:var(--text);">Alerts</span>
        <span style="font-size:11px;color:var(--green);cursor:pointer;">View All</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        ${alerts.map(a => alertItem(a)).join('')}
      </div>
    </div>
    <div class="ai-rec-card">
      <div class="ai-rec-label">✨ ${ai.aiTitle||'AI Recommendation'}</div>
      <div class="ai-rec-sub">${ai.aiSub||''}</div>
      <div class="ai-rec-text">${ai.aiText||''}</div>
      ${ai.aiLift ? `<div style="font-size:11px;color:var(--green);margin-bottom:8px;font-weight:600;">${ai.aiLift}</div>` : ''}
      <button class="btn btn-primary btn-sm" style="width:100%;">${ai.aiAction||'Apply Now'}</button>
    </div>
  </div>`;
}

// ===== INLINE SVG MAPS =====
function indiaMapSVG() {
  const states = [
    {d:'M 95,55 L 110,48 L 130,52 L 135,65 L 125,75 L 108,78 L 95,70 Z',fill:'#166534',name:'Punjab'},
    {d:'M 130,52 L 155,48 L 165,58 L 158,72 L 140,75 L 125,75 L 135,65 Z',fill:'#16a34a',name:'Haryana'},
    {d:'M 155,48 L 185,42 L 200,55 L 195,70 L 175,75 L 158,72 L 165,58 Z',fill:'#22c55e',name:'Uttar Pradesh'},
    {d:'M 185,42 L 220,38 L 235,52 L 228,68 L 210,72 L 195,70 L 200,55 Z',fill:'#4ade80',name:'Bihar'},
    {d:'M 220,38 L 250,35 L 262,48 L 255,62 L 238,66 L 228,68 L 235,52 Z',fill:'#22c55e',name:'West Bengal'},
    {d:'M 108,78 L 125,75 L 140,88 L 135,102 L 118,105 L 105,95 Z',fill:'#16a34a',name:'Rajasthan'},
    {d:'M 125,75 L 158,72 L 168,85 L 162,100 L 145,105 L 135,102 L 140,88 Z',fill:'#22c55e',name:'Madhya Pradesh'},
    {d:'M 158,72 L 195,70 L 205,82 L 198,96 L 180,102 L 168,85 Z',fill:'#4ade80',name:'Jharkhand'},
    {d:'M 105,95 L 118,105 L 128,118 L 120,132 L 105,135 L 92,122 Z',fill:'#22c55e',name:'Gujarat'},
    {d:'M 118,105 L 135,102 L 145,115 L 138,130 L 124,135 L 128,118 Z',fill:'#16a34a',name:'Maharashtra'},
    {d:'M 145,115 L 162,100 L 175,112 L 168,128 L 152,132 L 138,130 Z',fill:'#22c55e',name:'Odisha'},
    {d:'M 128,118 L 138,130 L 142,148 L 132,158 L 118,155 L 112,140 Z',fill:'#4ade80',name:'Karnataka'},
    {d:'M 138,130 L 152,132 L 158,148 L 148,162 L 135,160 L 132,158 L 142,148 Z',fill:'#22c55e',name:'Andhra Pradesh'},
    {d:'M 118,155 L 132,158 L 135,172 L 125,180 L 112,175 L 108,162 Z',fill:'#86efac',name:'Tamil Nadu'},
    {d:'M 132,158 L 148,162 L 148,178 L 138,184 L 128,180 L 125,180 L 135,172 Z',fill:'#4ade80',name:'Kerala'},
  ];
  return `<div style="position:relative;">
    <svg viewBox="60 30 220 165" style="width:100%;max-height:200px;" class="mini-map-svg">
      ${states.map(s=>`<path d="${s.d}" fill="${s.fill}" stroke="#0a0e0f" stroke-width="1.5" opacity="0.85">
        <title>${s.name}</title>
      </path>`).join('')}
    </svg>
  </div>`;
}

function upMapSVG() {
  const districts = [
    {d:'M 30,30 L 60,25 L 70,40 L 55,55 L 35,50 Z',fill:'#22c55e',name:'Lucknow'},
    {d:'M 60,25 L 90,22 L 98,38 L 80,50 L 70,40 Z',fill:'#16a34a',name:'Kanpur'},
    {d:'M 90,22 L 120,20 L 128,35 L 110,48 L 98,38 Z',fill:'#4ade80',name:'Varanasi'},
    {d:'M 120,20 L 148,18 L 155,32 L 138,44 L 128,35 Z',fill:'#22c55e',name:'Allahabad'},
    {d:'M 35,50 L 55,55 L 60,70 L 42,80 L 28,68 Z',fill:'#86efac',name:'Agra'},
    {d:'M 55,55 L 80,50 L 84,65 L 68,78 L 60,70 Z',fill:'#4ade80',name:'Meerut'},
    {d:'M 80,50 L 110,48 L 114,62 L 96,74 L 84,65 Z',fill:'#2d9e4f',name:'Gorakhpur'},
    {d:'M 110,48 L 138,44 L 142,58 L 124,70 L 114,62 Z',fill:'#22c55e',name:'Jhansi'},
  ];
  return `<svg viewBox="20 12 150 80" style="width:100%;height:160px;background:var(--bg3);border-radius:6px;" class="mini-map-svg">
    ${districts.map(s=>`<path d="${s.d}" fill="${s.fill}" stroke="#0a0e0f" stroke-width="1" opacity="0.85">
      <title>${s.name}</title>
    </path>`).join('')}
    ${districts.map(s=>{
      const pts = s.d.match(/[\d.]+,[\d.]+/g);
      const xs = pts.map(p=>parseFloat(p.split(',')[0]));
      const ys = pts.map(p=>parseFloat(p.split(',')[1]));
      const cx = xs.reduce((a,b)=>a+b,0)/xs.length;
      const cy = ys.reduce((a,b)=>a+b,0)/ys.length;
      return `<text x="${cx}" y="${cy}" fill="#fff" font-size="5" text-anchor="middle" font-family="DM Sans">${s.name.split(' ')[0]}</text>`;
    }).join('')}
  </svg>`;
}

function territoryMapSVG() {
  return `<svg viewBox="0 0 200 160" style="width:100%;height:180px;background:var(--bg3);border-radius:8px;">
    <path d="M 20,20 L 80,15 L 90,50 L 70,80 L 30,75 Z" fill="#22c55e" opacity="0.6" stroke="#0a0e0f" stroke-width="1"/>
    <path d="M 80,15 L 140,12 L 150,45 L 120,72 L 90,50 Z" fill="#06b6d4" opacity="0.6" stroke="#0a0e0f" stroke-width="1"/>
    <path d="M 140,12 L 185,18 L 190,55 L 165,80 L 150,45 Z" fill="#eab308" opacity="0.5" stroke="#0a0e0f" stroke-width="1"/>
    <path d="M 30,75 L 70,80 L 75,115 L 45,130 L 20,110 Z" fill="#a855f7" opacity="0.5" stroke="#0a0e0f" stroke-width="1"/>
    <path d="M 70,80 L 120,72 L 125,108 L 95,130 L 75,115 Z" fill="#22c55e" opacity="0.7" stroke="#0a0e0f" stroke-width="1"/>
    <path d="M 120,72 L 165,80 L 168,115 L 140,132 L 125,108 Z" fill="#f97316" opacity="0.5" stroke="#0a0e0f" stroke-width="1"/>
    <circle cx="55" cy="47" r="4" fill="#fff" opacity="0.8"/>
    <circle cx="113" cy="42" r="3" fill="#fff" opacity="0.8"/>
    <circle cx="158" cy="38" r="3" fill="#fff" opacity="0.8"/>
    <text x="55" y="44" fill="#fff" font-size="7" text-anchor="middle" font-family="DM Sans">Lucknow</text>
    <text x="113" y="38" fill="#fff" font-size="6" text-anchor="middle" font-family="DM Sans">Barabanki</text>
    <text x="158" y="35" fill="#fff" font-size="6" text-anchor="middle" font-family="DM Sans">Raebareli</text>
  </svg>`;
}

function largeMapSVG() {
  return `<svg viewBox="0 0 400 320" style="width:100%;height:280px;background:var(--bg3);border-radius:8px;">
    <!-- Territories in color blocks -->
    <path d="M 60,40 L 150,30 L 170,90 L 140,150 L 70,145 Z" fill="#22c55e" opacity="0.4" stroke="#1a2430" stroke-width="2"/>
    <path d="M 150,30 L 240,25 L 258,88 L 228,145 L 170,90 Z" fill="#3b82f6" opacity="0.4" stroke="#1a2430" stroke-width="2"/>
    <path d="M 240,25 L 320,30 L 335,95 L 305,155 L 258,88 Z" fill="#a855f7" opacity="0.35" stroke="#1a2430" stroke-width="2"/>
    <path d="M 70,145 L 140,150 L 148,218 L 110,248 L 58,235 Z" fill="#f97316" opacity="0.35" stroke="#1a2430" stroke-width="2"/>
    <path d="M 140,150 L 228,145 L 235,215 L 195,250 L 148,218 Z" fill="#22c55e" opacity="0.5" stroke="#1a2430" stroke-width="2"/>
    <path d="M 228,145 L 305,155 L 310,218 L 270,252 L 235,215 Z" fill="#eab308" opacity="0.4" stroke="#1a2430" stroke-width="2"/>
    <!-- Village dots -->
    <circle cx="112" cy="88" r="3" fill="#22c55e"/>
    <circle cx="195" cy="80" r="3" fill="#3b82f6"/>
    <circle cx="278" cy="85" r="3" fill="#a855f7"/>
    <circle cx="108" cy="190" r="3" fill="#f97316"/>
    <circle cx="188" cy="195" r="3" fill="#22c55e"/>
    <circle cx="265" cy="195" r="3" fill="#eab308"/>
    <!-- Labels -->
    <text x="112" y="100" fill="#fff" font-size="8" text-anchor="middle" font-family="DM Sans" opacity="0.9">Lucknow</text>
    <text x="195" y="72" fill="#fff" font-size="8" text-anchor="middle" font-family="DM Sans" opacity="0.9">Barabanki</text>
    <text x="278" y="77" fill="#fff" font-size="8" text-anchor="middle" font-family="DM Sans" opacity="0.9">Raebareli</text>
    <text x="108" y="182" fill="#fff" font-size="7" text-anchor="middle" font-family="DM Sans" opacity="0.8">Unnao</text>
    <text x="188" y="187" fill="#fff" font-size="7" text-anchor="middle" font-family="DM Sans" opacity="0.8">Hardoi</text>
    <text x="265" y="187" fill="#fff" font-size="7" text-anchor="middle" font-family="DM Sans" opacity="0.8">Sitapur</text>
  </svg>`;
}

// ===== INIT =====
function init() {
  renderRoleSwitcher();
  switchRole('hq');
}

function renderRoleSwitcher() {
  const roles = [
    {id:'hq',label:'HQ'},
    {id:'field',label:'Field'},
    {id:'state',label:'State'},
    {id:'territory',label:'Territory'},
    {id:'admin',label:'Admin'},
  ];
  document.getElementById('roleSwitcher').innerHTML = roles.map(r =>
    `<button class="role-btn${r.id===currentRole?' active':''}" onclick="switchRole('${r.id}')">${r.label}</button>`
  ).join('');
}

function switchRole(roleId) {
  currentRole = roleId;
  const role = DATA.roles[roleId];
  currentScreen = role.defaultScreen;
  renderRoleSwitcher();
  document.getElementById('userName').textContent = role.name;
  document.getElementById('userRole').textContent = role.label;
  document.getElementById('userAvatar').textContent = role.avatar;
  document.getElementById('userAvatar').style.background = role.avatarColor;
  document.getElementById('orgName').textContent = role.org;
  document.getElementById('orgSub').textContent = role.orgSub;
  renderNav(role);
  renderScreen(currentScreen);
}

function renderNav(role) {
  document.getElementById('sidebarNav').innerHTML = role.nav.map(item => {
    const icon = IC[item.icon] || IC.dashboard;
    const badge = item.badge ? `<span class="nav-badge">${item.badge}</span>` : '';
    return `<a class="nav-item${item.id===currentScreen?' active':''}" onclick="navigate('${item.id}');return false;" href="#">
      ${icon}<span>${item.label}</span>${badge}
    </a>`;
  }).join('');
}

function navigate(screenId) {
  currentScreen = screenId;
  renderNav(DATA.roles[currentRole]);
  renderScreen(screenId);
}

function renderScreen(screenId) {
  let content = '';
  switch (screenId) {
    case 'hq-dashboard': content = buildHQDashboard(); break;
    case 'field-dashboard': content = buildFieldDashboard(); break;
    case 'state-dashboard': content = buildStateDashboard(); break;
    case 'territory-dashboard': content = buildTerritoryDashboard(); break;
    case 'verified-sales': content = buildVerifiedSales(); break;
    case 'users': case 'user-assignment': content = buildUsers(); break;
    case 'permissions': content = buildPermissions(); break;
    case 'geography': content = buildGeography(); break;
    case 'hierarchy': content = buildHierarchy(); break;
    case 'campaigns': case 'field-campaigns': content = buildCampaigns(); break;
    case 'reports': case 'field-reports': content = buildReports(); break;
    case 'settings': content = buildSettings(); break;
    case 'overview': content = buildOverview(); break;
    default: content = buildPlaceholder(screenId); break;
  }
  document.getElementById('mainContent').innerHTML = content;
  setTimeout(() => drawChartsForScreen(screenId), 60);
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('collapsed');
}

// ===== HQ DASHBOARD =====
function buildHQDashboard() {
  const d = DATA.hq;
  return `<div style="display:grid;grid-template-columns:1fr 230px;height:calc(100vh - 52px);">
    <div style="overflow-y:auto;padding:20px 20px 20px 24px;">
      <div class="page-header">
        <div>
          <div class="page-title">HQ Command Dashboard</div>
          <div class="page-subtitle">National-level performance overview and strategic control center</div>
        </div>
        <div class="page-actions">
          <button class="btn btn-outline btn-sm">↓ Export</button>
          <button class="btn btn-primary btn-sm">+ Create Campaign</button>
        </div>
      </div>
      <div class="filter-bar">
        ${filterSelect('Company','Godrej Agrovet')}${filterSelect('Role','HQ')}${filterSelect('Geography','All India')}${filterSelect('Time Range','Last 30 Days')}${filterSelect('SKU Filter','All SKUs')}
      </div>
      <div class="metrics-row mb-14" style="grid-template-columns:repeat(6,1fr);">
        ${d.metrics.map(m=>metricCard(m)).join('')}
      </div>
      <div class="grid-2-1 mb-14">
        <div class="card">
          <div class="card-header">
            <div><div class="card-title">National Performance Map</div><div class="card-subtitle">Sales intensity by state</div></div>
          </div>
          <div style="display:flex;gap:12px;">
            <div style="flex:1;">
              <div style="display:flex;gap:6px;margin-bottom:8px;">
                <button class="map-btn active">Sales</button><button class="map-btn">Verified %</button><button class="map-btn">Activation %</button>
              </div>
              ${indiaMapSVG()}
              <div style="display:flex;align-items:center;gap:6px;margin-top:8px;font-size:10px;color:var(--text3);">
                High ${['#166534','#16a34a','#22c55e','#4ade80','#86efac'].map(c=>`<div style="width:14px;height:8px;background:${c};border-radius:1px;"></div>`).join('')} Low
              </div>
            </div>
            <div style="width:145px;">
              <div style="font-size:11px;font-weight:600;color:var(--text);margin-bottom:8px;">Top 3 States</div>
              ${d.topStates.map(s=>`<div style="padding:6px 0;border-bottom:1px solid rgba(30,45,61,0.4);">
                <div style="display:flex;justify-content:space-between;"><span style="font-size:12px;font-weight:500;color:var(--text);">${s.name}</span><span style="font-size:11px;color:var(--green);">${s.growth}</span></div>
                <div style="font-size:11px;color:var(--text3);">${s.sales}</div>
              </div>`).join('')}
              <button class="btn btn-outline btn-sm" style="width:100%;margin-top:8px;font-size:11px;" onclick="navigate('geography')">Drill into Region →</button>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header"><div class="card-title">Region Performance</div><span class="card-link">View All</span></div>
          <table class="data-table">
            <thead><tr><th>Region</th><th>Sales</th><th>Growth</th><th>Verified %</th><th>ROI</th></tr></thead>
            <tbody>${d.regions.map(r=>`<tr>
              <td><span class="region-dot" style="background:${r.dot}"></span><span class="td-name">${r.name}</span></td>
              <td class="td-value">${r.sales}</td>
              <td><span class="metric-change up">${upArrow(true)} ${r.growth}</span></td>
              <td>${r.verified}</td>
              <td style="color:var(--green);font-weight:700;">${r.roi}</td>
            </tr>`).join('')}</tbody>
          </table>
          <button class="btn btn-ghost btn-sm" style="margin-top:8px;font-size:11px;" onclick="navigate('state-dashboard')">View Region Dashboard →</button>
        </div>
      </div>
      <div class="grid-3 mb-14">
        <div class="card">
          <div class="card-header"><div class="card-title">Today's Top Actions</div><span class="card-link">View All</span></div>
          ${d.topActions.map(a=>`<div style="display:flex;gap:10px;padding:10px 0;border-bottom:1px solid rgba(30,45,61,0.4);">
            <span style="font-size:18px;">${a.icon}</span>
            <div style="flex:1;">
              <div style="font-size:12.5px;font-weight:600;color:var(--text);">${a.title}</div>
              <div style="font-size:11px;color:var(--text3);">${a.sub}</div>
              <div style="font-size:11px;color:var(--green);margin-top:2px;">Impact: <b>${a.impact}</b></div>
            </div>
            <button class="btn btn-sm ${a.actionColor==='green'?'btn-primary':a.actionColor==='yellow'?'btn-orange':'btn-blue'}">${a.actionLabel}</button>
          </div>`).join('')}
        </div>
        <div class="card">
          <div class="card-header"><div class="card-title">Campaign Performance</div><span class="card-link">View All</span></div>
          <table class="data-table">
            <thead><tr><th>Campaign</th><th>SKU</th><th>Spend</th><th>ROI</th></tr></thead>
            <tbody>${d.campaigns.map(c=>`<tr>
              <td class="td-name">${c.name}</td>
              <td>${c.sku}</td>
              <td>${c.spend}</td>
              <td style="color:var(--green);font-weight:700;">${c.roi}</td>
            </tr>`).join('')}</tbody>
          </table>
          <div style="display:flex;gap:8px;margin-top:10px;">
            <button class="btn btn-primary btn-sm" style="flex:1;">Adjust Incentive</button>
            <button class="btn btn-danger btn-sm" style="flex:1;">Pause Campaign</button>
          </div>
        </div>
        <div class="card">
          <div class="card-header"><div class="card-title">Coverage & Gaps</div><span class="card-link">View All</span></div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px;">
            <div style="background:var(--bg3);border-radius:8px;padding:10px;text-align:center;">
              <div style="font-size:22px;font-weight:700;color:var(--red);">0</div>
              <div style="font-size:10px;color:var(--text3);">Unassigned States</div>
            </div>
            <div style="background:var(--bg3);border-radius:8px;padding:10px;text-align:center;">
              <div style="font-size:22px;font-weight:700;color:var(--orange);">86</div>
              <div style="font-size:10px;color:var(--text3);">Low Activation</div>
            </div>
          </div>
          <div style="background:var(--bg3);border-radius:7px;padding:10px;margin-bottom:8px;">
            <div style="font-size:22px;font-weight:700;">1,248</div>
            <div style="font-size:11px;color:var(--text3);">Villages with No Sales</div>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;padding:8px;background:var(--bg3);border-radius:7px;">
            <span style="font-size:12px;">1 Overlapping Territory</span>
            <button class="btn btn-ghost btn-sm">Review</button>
          </div>
        </div>
      </div>
      <div class="grid-3">
        <div class="card">
          <div class="card-header"><div class="card-title">Performance Trend</div></div>
          <canvas id="hqTrendChart" height="120"></canvas>
        </div>
        <div class="card">
          <div class="card-header"><div class="card-title">Top SKUs</div><span class="card-link">View All</span></div>
          ${d.topSKUs.map(s=>`<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid rgba(30,45,61,0.4);">
            <span style="font-size:20px;">${s.icon}</span>
            <div style="flex:1;"><div style="font-size:12.5px;font-weight:500;color:var(--text);">${s.name}</div><div style="font-size:11px;color:var(--text3);">${s.units}</div></div>
            <div style="text-align:right;"><div style="font-size:13px;font-weight:700;">${s.sales}</div><div style="font-size:11px;color:var(--green);">${s.growth}</div></div>
          </div>`).join('')}
        </div>
        <div class="card">
          <div class="card-header"><div class="card-title">Low Performing Areas</div><span class="card-link">View All</span></div>
          ${d.lowAreas.map(a=>`<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid rgba(30,45,61,0.4);">
            <div style="width:28px;height:28px;background:var(--red-dim);border-radius:50%;display:flex;align-items:center;justify-content:center;color:var(--red);font-size:14px;">⚠</div>
            <div style="flex:1;"><div style="font-size:12.5px;font-weight:500;color:var(--text);">${a.name}</div><div style="font-size:11px;color:var(--red);">Verification: ${a.verification}</div></div>
            <span style="font-size:12px;font-weight:600;">${a.sales}</span>
          </div>`).join('')}
        </div>
      </div>
    </div>
    ${buildAlertsPanel(d.alerts,{aiTitle:'AI Recommendation',aiSub:'Based on your data',aiText:'Increase incentive for Nano Urea in Bihar — low verification, high opportunity.',aiLift:'Expected lift: +22%',aiAction:'Apply Now'})}
  </div>`;
}

// ===== FIELD DASHBOARD =====
function buildFieldDashboard() {
  const d = DATA.field;
  return `<div style="display:grid;grid-template-columns:1fr 220px;height:calc(100vh - 52px);">
    <div style="overflow-y:auto;padding:20px 20px 20px 24px;">
      <div class="page-header">
        <div><div class="page-title">Welcome back, Ravi! 👋</div><div class="page-subtitle">Track your daily progress across all villages</div></div>
        <div style="display:flex;align-items:center;gap:6px;background:var(--bg3);border:1px solid var(--border);padding:5px 10px;border-radius:6px;font-size:12px;color:var(--text2);">
          📍 Lucknow Territory
        </div>
      </div>
      <div class="metrics-row mb-14" style="grid-template-columns:repeat(6,1fr);">
        ${d.metrics.map((m,i) => i===5 ? `<div class="metric-card" style="background:linear-gradient(135deg,#1a1500,#201800);border-color:rgba(234,179,8,0.2);">
          <div class="metric-icon yellow" style="font-size:14px;">🔥</div>
          <div class="metric-label">Streak</div>
          <div class="metric-value" style="color:var(--yellow);">7 Days</div>
          <div style="font-size:10px;color:var(--text3);margin-top:3px;">Keep it up!</div>
        </div>` : metricCard(m)).join('')}
      </div>
      <div style="display:flex;gap:8px;align-items:center;background:var(--blue-dim);border:1px solid rgba(59,130,246,0.2);border-radius:8px;padding:10px 14px;margin-bottom:14px;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        <span style="font-size:12.5px;color:var(--text);flex:1;">Great start! You're <b>2 visits</b> away from completing today's target.</span>
        <button class="btn btn-blue btn-sm">View Targets</button>
      </div>
      <div class="grid-3 mb-14">
        <div class="card">
          <div class="card-header"><div class="card-title">Today's Tasks</div><span class="badge badge-orange">8 Pending</span></div>
          ${d.tasks.map(t=>`<div class="task-item">
            <div class="task-check ${t.pct===100?'done':''}">
              ${t.pct===100?'<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>':''}
            </div>
            <div class="task-label" style="flex:1;">${t.label}${t.time?` <span style="color:var(--text3);font-size:11px;">— ${t.time}</span>`:''}
</div>
            <div style="display:flex;align-items:center;gap:6px;">
              <div style="width:70px;"><div class="progress-bar"><div class="progress-fill ${t.pct>60?'':'yellow'}" style="width:${t.pct}%"></div></div></div>
              <span style="font-size:10px;color:var(--text3);">${t.done}/${t.total}</span>
            </div>
          </div>`).join('')}
        </div>
        <div class="card">
          <div class="card-header"><div class="card-title">Sales Trend (This Week)</div></div>
          <canvas id="fieldTrendChart" height="130"></canvas>
        </div>
        <div class="card">
          <div class="card-header"><div class="card-title">Monthly Progress</div><span class="card-link">View Details</span></div>
          <div style="display:flex;align-items:center;gap:14px;">
            <div style="position:relative;width:90px;height:90px;flex-shrink:0;">
              <canvas id="fieldProgressDonut" width="90" height="90"></canvas>
              <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;">
                <div style="font-size:18px;font-weight:800;color:var(--green);">67%</div>
                <div style="font-size:9px;color:var(--text3);">Target</div>
              </div>
            </div>
            <div style="flex:1;">
              <div style="display:flex;justify-content:space-between;margin-bottom:6px;"><span style="font-size:11px;color:var(--text3);">Target</span><span style="font-size:12px;font-weight:600;">₹1,50,000</span></div>
              <div style="display:flex;justify-content:space-between;margin-bottom:10px;"><span style="font-size:11px;color:var(--text3);">Achieved</span><span style="font-size:12px;font-weight:600;color:var(--green);">₹1,00,650</span></div>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:5px;">
                <div style="background:var(--bg3);border-radius:6px;padding:7px;text-align:center;"><div style="font-size:13px;font-weight:700;">85/120</div><div style="font-size:9px;color:var(--text3);">Retailers Visited</div></div>
                <div style="background:var(--bg3);border-radius:6px;padding:7px;text-align:center;"><div style="font-size:13px;font-weight:700;">42</div><div style="font-size:9px;color:var(--text3);">Orders Placed</div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="grid-3 mb-14">
        <div class="card">
          <div class="card-header"><div class="card-title">Village Coverage</div></div>
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px;">
            <div style="position:relative;width:80px;height:80px;flex-shrink:0;">
              <canvas id="villageCoverageDonut" width="80" height="80"></canvas>
              <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;">
                <div style="font-size:16px;font-weight:800;">76%</div>
                <div style="font-size:8px;color:var(--text3);">Coverage</div>
              </div>
            </div>
            <div style="display:flex;flex-direction:column;gap:5px;">
              <div style="display:flex;align-items:center;gap:5px;font-size:11px;"><div style="width:7px;height:7px;background:var(--green);border-radius:50%;"></div> Active <b>31</b></div>
              <div style="display:flex;align-items:center;gap:5px;font-size:11px;"><div style="width:7px;height:7px;background:var(--orange);border-radius:50%;"></div> Low Activity <b>7</b></div>
              <div style="display:flex;align-items:center;gap:5px;font-size:11px;"><div style="width:7px;height:7px;background:var(--red);border-radius:50%;"></div> Not Visited <b>3</b></div>
            </div>
          </div>
          <div style="font-size:12px;color:var(--text3);">Total: <b style="color:var(--text);">41 Villages</b></div>
        </div>
        <div class="card">
          <div class="card-header"><div class="card-title">Top Selling Products</div><span class="card-link">View All</span></div>
          ${d.topProducts.map(p=>`<div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid rgba(30,45,61,0.4);">
            <span style="font-size:16px;">${p.icon}</span>
            <div style="flex:1;">
              <div style="display:flex;justify-content:space-between;"><span style="font-size:12px;font-weight:500;color:var(--text);">${p.name}</span><span style="font-size:12px;font-weight:600;">${p.sales}</span></div>
              <div class="progress-bar" style="height:3px;margin-top:3px;"><div class="progress-fill" style="width:${p.pct}%"></div></div>
            </div>
          </div>`).join('')}
        </div>
        <div class="card">
          <div class="card-header"><div class="card-title">Retailer Activity</div></div>
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px;">
            <div style="position:relative;width:80px;height:80px;flex-shrink:0;">
              <canvas id="retailerActivityDonut" width="80" height="80"></canvas>
              <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;">
                <div style="font-size:14px;font-weight:800;">124</div>
                <div style="font-size:8px;color:var(--text3);">Total</div>
              </div>
            </div>
            <div style="display:flex;flex-direction:column;gap:5px;">
              <div style="display:flex;align-items:center;gap:5px;font-size:11px;"><div style="width:7px;height:7px;background:var(--green);border-radius:50%;"></div> Active <b>85 (68%)</b></div>
              <div style="display:flex;align-items:center;gap:5px;font-size:11px;"><div style="width:7px;height:7px;background:var(--yellow);border-radius:50%;"></div> At Risk <b>25 (20%)</b></div>
              <div style="display:flex;align-items:center;gap:5px;font-size:11px;"><div style="width:7px;height:7px;background:var(--red);border-radius:50%;"></div> Inactive <b>14 (11%)</b></div>
            </div>
          </div>
        </div>
      </div>
      <div class="grid-3">
        <div class="card">
          <div class="card-header"><div class="card-title">Upcoming Village Visits</div><span class="card-link">View Route</span></div>
          ${d.villages.map(v=>`<div style="display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid rgba(30,45,61,0.4);">
            <div style="width:20px;height:20px;background:var(--bg4);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:var(--text3);">${v.num}</div>
            <div style="flex:1;"><div style="font-size:12.5px;font-weight:500;color:var(--text);">${v.name}</div><div style="font-size:11px;color:var(--text3);">${v.time} · ${v.retailers} retailers</div></div>
            <button class="btn btn-primary btn-sm" style="font-size:10px;">📍 Navigate</button>
          </div>`).join('')}
        </div>
        <div class="card">
          <div class="card-header"><div class="card-title">Recent Retailer Visits</div><span class="card-link">View All +</span></div>
          ${d.recentVisits.map(v=>`<div style="display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid rgba(30,45,61,0.4);">
            <div style="width:30px;height:30px;background:var(--bg4);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;">${v.name.charAt(0)}</div>
            <div style="flex:1;"><div style="font-size:12px;font-weight:500;color:var(--text);">${v.name}</div><div style="font-size:11px;color:var(--text3);">${v.location} · ${v.time}</div></div>
            <div style="text-align:right;"><div style="font-size:12px;font-weight:600;">${v.amount}</div><span class="badge ${v.status==='verified'?'badge-green':'badge-yellow'}" style="font-size:9px;">${v.status}</span></div>
          </div>`).join('')}
        </div>
        <div class="card" style="background:linear-gradient(135deg,#0f1a14,#111a10);border-color:rgba(34,197,94,0.15);">
          <div class="card-header"><div class="card-title">Today's Plan</div><span class="badge badge-green" style="font-size:9px;">8 tasks</span></div>
          ${d.todayPlan.map(p=>`<div style="display:flex;gap:8px;padding:5px 0;">
            <span style="font-size:11px;color:var(--text3);width:55px;flex-shrink:0;">${p.time}</span>
            <div style="width:8px;height:8px;border-radius:50%;background:var(--${p.dot});flex-shrink:0;margin-top:4px;"></div>
            <span style="font-size:11.5px;color:var(--text2);">${p.label}</span>
          </div>`).join('')}
        </div>
      </div>
    </div>
    <div style="background:var(--bg2);border-left:1px solid var(--border);overflow-y:auto;max-height:calc(100vh - 52px);padding:16px;display:flex;flex-direction:column;gap:12px;">
      <div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;"><span style="font-size:13px;font-weight:600;">Alerts</span><span style="font-size:11px;color:var(--green);cursor:pointer;">View All</span></div>
        <div style="display:flex;flex-direction:column;gap:8px;">${d.alerts.map(a=>alertItem(a)).join('')}</div>
      </div>
      <div>
        <div style="font-size:13px;font-weight:600;margin-bottom:8px;">Quick Actions</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">
          ${[['📷','Scan to Sell'],['➕','Add Retailer'],['📦','Inventory'],['📢','Campaigns'],['💰','My Wallet'],['📊','Reports']].map(([i,l])=>`<button class="quick-action-btn">
            <div style="width:30px;height:30px;background:var(--bg4);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:16px;">${i}</div>
            <span style="font-size:10px;">${l}</span>
          </button>`).join('')}
        </div>
      </div>
    </div>
  </div>`;
}

// ===== STATE DASHBOARD =====
function buildStateDashboard() {
  const d = DATA.state;
  return `<div style="display:grid;grid-template-columns:1fr 230px;height:calc(100vh - 52px);">
    <div style="overflow-y:auto;padding:20px;">
      <div class="page-header">
        <div><div class="page-title">State Dashboard</div><div class="page-subtitle">Track district, village and SKU performance across Uttar Pradesh</div></div>
        <div class="page-actions"><button class="btn btn-outline btn-sm">↓ Export</button><button class="btn btn-primary btn-sm">+</button></div>
      </div>
      <div class="filter-bar">
        ${filterSelect('Company','Godrej Agrovet')}${filterSelect('State','Uttar Pradesh')}${filterSelect('Time Range','Last 30 Days')}${filterSelect('SKU Filter','All SKUs')}
      </div>
      <div class="metrics-row mb-14" style="grid-template-columns:repeat(7,1fr);">
        ${d.metrics.map(m=>metricCard(m)).join('')}
      </div>
      <div class="grid-3 mb-14">
        <div class="card">
          <div class="card-header"><div class="card-title">District Performance</div><span class="card-link">View All</span></div>
          <table class="data-table">
            <thead><tr><th>District</th><th>Sales</th><th>Growth</th><th>Villages</th><th>Verified %</th><th>Score</th></tr></thead>
            <tbody>${d.districts.map(r=>`<tr>
              <td class="td-name">${r.name}</td><td class="td-value">${r.sales}</td>
              <td><span class="metric-change ${r.up?'up':'down'}">${upArrow(r.up)} ${r.growth}</span></td>
              <td>${r.villages}</td><td>${r.verified}</td>
              <td><span class="score-badge ${r.scoreColor}">${r.score}</span></td>
            </tr>`).join('')}</tbody>
          </table>
        </div>
        <div class="card">
          <div class="card-header"><div class="card-title">District Heatmap</div></div>
          ${upMapSVG()}
        </div>
        <div class="card">
          <div class="card-header"><div class="card-title">Village Performance</div></div>
          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-bottom:10px;">
            ${[['5,432','Total'],['4,492','Active','green'],['1,248','High Potential','yellow'],['540','Inactive','red']].map(([v,l,c])=>`
            <div style="background:var(--bg3);border-radius:6px;padding:8px;text-align:center;${c?`border:1px solid rgba(${c==='green'?'34,197,94':c==='yellow'?'234,179,8':'239,68,68'},0.2);`:''}" >
              <div style="font-size:15px;font-weight:700;${c?`color:var(--${c});`:''}">${v}</div>
              <div style="font-size:9px;color:var(--text3);">${l}</div>
            </div>`).join('')}
          </div>
          <table class="data-table">
            <thead><tr><th>Village</th><th>District</th><th>Sales</th><th>Trend</th></tr></thead>
            <tbody>${d.villagePerf.map(v=>`<tr>
              <td class="td-name">${v.name}</td><td>${v.district}</td><td class="td-value">${v.sales}</td><td>${trendSVG(v.trend)}</td>
            </tr>`).join('')}</tbody>
          </table>
        </div>
      </div>
      <div class="grid-3 mb-14">
        <div class="card">
          <div class="card-header"><div class="card-title">SKU Movement</div><span class="card-link">View All</span></div>
          <table class="data-table">
            <thead><tr><th>SKU</th><th>Units Sold</th><th>Growth</th><th>Share</th></tr></thead>
            <tbody>${d.skuMovement.map(s=>`<tr>
              <td><span style="margin-right:4px;">${s.icon}</span><span class="td-name">${s.sku}</span></td>
              <td class="td-value">${s.units}</td>
              <td><span class="metric-change up">${upArrow(true)} ${s.growth}</span></td>
              <td>${s.share}</td>
            </tr>`).join('')}</tbody>
          </table>
        </div>
        <div class="card">
          <div class="card-header"><div class="card-title">Bottlenecks</div></div>
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;">
            ${[['🔴','Low Stock','12','districts','red'],['⚠️','Low Verification','18','districts','yellow'],['🟡','Inactive Villages','540','villages','orange']].map(([i,l,n,s,c])=>`<div class="bottleneck-card ${c}" style="padding:12px;text-align:center;">
              <div style="font-size:10px;color:var(--${c});font-weight:600;">${i} ${l}</div>
              <div style="font-size:20px;font-weight:700;color:var(--${c});margin:6px 0;">${n}</div>
              <div style="font-size:10px;color:var(--text3);">${s}</div>
              <div style="font-size:11px;color:var(--green);margin-top:6px;cursor:pointer;">Investigate →</div>
            </div>`).join('')}
          </div>
        </div>
        <div class="card">
          <div class="card-header"><div class="card-title">Activation Trend</div></div>
          <canvas id="stateActivationChart" height="120"></canvas>
        </div>
      </div>
      <div class="grid-4">
        <div class="card">
          <div class="card-header"><div class="card-title">This Week's Focus</div></div>
          ${d.focusItems.map(f=>`<div style="display:flex;gap:8px;padding:8px 0;border-bottom:1px solid rgba(30,45,61,0.4);">
            <div style="width:6px;height:6px;background:var(--green);border-radius:50%;margin-top:5px;flex-shrink:0;"></div>
            <div style="flex:1;"><div style="font-size:12px;color:var(--text);">${f.title}</div><div style="font-size:10px;color:var(--text3);">${f.sub}</div></div>
            <button class="btn btn-outline btn-sm" style="font-size:10px;">Act</button>
          </div>`).join('')}
        </div>
        <div class="card">
          <div class="card-header"><div class="card-title">Top Districts</div></div>
          ${d.topDistricts.map((x,i)=>`<div style="display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid rgba(30,45,61,0.4);">
            <div style="width:20px;height:20px;background:var(--green-dim);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:var(--green);">${i+1}</div>
            <div style="flex:1;font-size:12px;font-weight:500;color:var(--text);">${x.name}</div>
            <div style="text-align:right;"><div style="font-size:12px;font-weight:600;">${x.sales}</div><div style="font-size:11px;color:var(--green);">${x.growth}</div></div>
          </div>`).join('')}
        </div>
        <div class="card">
          <div class="card-header"><div class="card-title">Low Districts</div></div>
          ${d.lowDistricts.map((x,i)=>`<div style="display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid rgba(30,45,61,0.4);">
            <div style="width:20px;height:20px;background:var(--red-dim);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:var(--red);">${i+1}</div>
            <div style="flex:1;font-size:12px;font-weight:500;color:var(--text);">${x.name}</div>
            <div style="text-align:right;"><div style="font-size:12px;font-weight:600;">${x.sales}</div><div style="font-size:11px;color:var(--red);">${x.growth}</div></div>
          </div>`).join('')}
        </div>
        <div class="card">
          <div class="card-title" style="margin-bottom:10px;">Quick Actions</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">
            ${[['📢','Launch Campaign'],['📦','Push SKU'],['⬇️','Download Report'],['👥','Assign Agents']].map(([i,l])=>`<button class="quick-action-btn">
              <div style="font-size:16px;">${i}</div>
              <span style="font-size:10px;">${l}</span>
            </button>`).join('')}
          </div>
        </div>
      </div>
    </div>
    ${buildAlertsPanel(d.alerts,{aiTitle:'AI Recommendation',aiSub:'Based on your state data',aiText:'Pushing Nano Urea in Pratapgarh and Sultanpur can increase sales by ₹6.2 L this month.',aiAction:'View Plan'})}
  </div>`;
}

// ===== TERRITORY DASHBOARD =====
function buildTerritoryDashboard() {
  const d = DATA.territory;
  return `<div style="display:grid;grid-template-columns:1fr 230px;height:calc(100vh - 52px);">
    <div style="overflow-y:auto;padding:20px;">
      <div class="page-header">
        <div><div class="page-title">Territory Dashboard</div><div class="page-subtitle">Track village demand, district performance, and retailer coverage</div></div>
        <button class="btn btn-outline btn-sm">↓ Export</button>
      </div>
      <div class="filter-bar">
        ${filterSelect('State','Uttar Pradesh')}${filterSelect('Territory','Lucknow Territory')}${filterSelect('Time Range','Last 30 Days')}${filterSelect('SKU Filter','All SKUs')}
      </div>
      <div class="metrics-row mb-14" style="grid-template-columns:repeat(6,1fr);">
        ${d.metrics.map(m=>metricCard(m)).join('')}
      </div>
      <div class="grid-3 mb-14">
        <div class="card">
          <div class="card-header"><div class="card-title">District Overview</div><span class="card-link">View Details</span></div>
          <table class="data-table">
            <thead><tr><th>District</th><th>Sales</th><th>Growth</th><th>Verified %</th><th>Score</th></tr></thead>
            <tbody>${d.districts.map(r=>`<tr>
              <td class="td-name">${r.name}</td><td class="td-value">${r.sales}</td>
              <td><span class="metric-change ${r.up?'up':'down'}">${upArrow(r.up)} ${r.growth}</span></td>
              <td>${r.verified}</td>
              <td><span class="score-badge ${r.scoreColor}">${r.score}</span></td>
            </tr>`).join('')}</tbody>
          </table>
        </div>
        <div class="card">
          <div class="card-header"><div class="card-title">Territory Map</div></div>
          ${territoryMapSVG()}
        </div>
        <div class="card">
          <div class="card-header"><div class="card-title">Village Overview</div></div>
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px;">
            <div style="position:relative;width:80px;height:80px;flex-shrink:0;">
              <canvas id="territoryVillageDonut" width="80" height="80"></canvas>
              <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;">
                <div style="font-size:15px;font-weight:800;">310</div>
                <div style="font-size:8px;color:var(--text3);">Total</div>
              </div>
            </div>
            <div style="display:flex;flex-direction:column;gap:5px;">
              <div style="display:flex;align-items:center;gap:5px;font-size:11px;"><div style="width:7px;height:7px;background:var(--green);border-radius:50%;"></div> Active <b>242 (78%)</b></div>
              <div style="display:flex;align-items:center;gap:5px;font-size:11px;"><div style="width:7px;height:7px;background:var(--yellow);border-radius:50%;"></div> Low Activity <b>41 (13%)</b></div>
              <div style="display:flex;align-items:center;gap:5px;font-size:11px;"><div style="width:7px;height:7px;background:var(--red);border-radius:50%;"></div> Inactive <b>27 (9%)</b></div>
            </div>
          </div>
        </div>
      </div>
      <div class="grid-3 mb-14">
        <div class="card">
          <div class="card-header"><div class="card-title">Village Leaderboard</div><span class="card-link">View All</span></div>
          <table class="data-table">
            <thead><tr><th>Village</th><th>District</th><th>Sales</th><th>Verified %</th><th>Trend</th></tr></thead>
            <tbody>${d.leaderboard.map(l=>`<tr>
              <td class="td-name">${l.village}</td><td>${l.district}</td><td class="td-value">${l.sales}</td><td>${l.verified}</td><td>${trendSVG(l.trend)}</td>
            </tr>`).join('')}</tbody>
          </table>
        </div>
        <div class="card">
          <div class="card-header"><div class="card-title">SKU Movement</div><span class="card-link">View All</span></div>
          <table class="data-table">
            <thead><tr><th>SKU</th><th>Units</th><th>Growth</th><th>Share</th></tr></thead>
            <tbody>${d.skuMovement.map(s=>`<tr>
              <td><span style="margin-right:4px;">${s.icon}</span><span class="td-name">${s.sku}</span></td>
              <td class="td-value">${s.units}</td>
              <td><span class="metric-change up">${upArrow(true)} ${s.growth}</span></td>
              <td>${s.share}</td>
            </tr>`).join('')}</tbody>
          </table>
        </div>
        <div class="card">
          <div class="card-header"><div class="card-title">Team Performance</div><span class="card-link">View All</span></div>
          <table class="data-table">
            <thead><tr><th>Name</th><th>Sales</th><th>Verified %</th><th>Score</th></tr></thead>
            <tbody>${d.teamPerf.map(t=>`<tr>
              <td><div style="display:flex;align-items:center;gap:5px;"><div style="width:24px;height:24px;background:var(--bg4);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:600;">${t.name.charAt(0)}</div><span class="td-name">${t.name.split(' ')[0]}</span></div></td>
              <td class="td-value">${t.sales}</td>
              <td>${t.verified}</td>
              <td><span class="score-badge ${t.scoreColor}">${t.score}</span></td>
            </tr>`).join('')}</tbody>
          </table>
        </div>
      </div>
      <div class="grid-2-1">
        <div class="card">
          <div class="card-header"><div class="card-title">Sales Trend</div></div>
          <canvas id="territoryTrendChart" height="100"></canvas>
        </div>
        <div class="card">
          <div class="card-title" style="margin-bottom:10px;">Quick Actions</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">
            ${[['📢','Launch Campaign'],['📦','Push SKU'],['➕','Add Retailer'],['📍','Assign Villages'],['👥','Field Team'],['⬇️','Download Report']].map(([i,l])=>`<button class="quick-action-btn">
              <div style="font-size:16px;">${i}</div>
              <span style="font-size:10px;">${l}</span>
            </button>`).join('')}
          </div>
        </div>
      </div>
    </div>
    ${buildAlertsPanel(d.alerts,{aiTitle:'AI Recommendation',aiSub:'Based on your territory',aiText:'Pushing Nano Urea in 34 high potential villages can increase sales by ₹18.6 L this month.',aiAction:'View Recommendation'})}
  </div>`;
}

// ===== VERIFIED SALES =====
function buildVerifiedSales() {
  const d = DATA.verifiedSales;
  return `<div style="overflow-y:auto;height:calc(100vh - 52px);padding:20px 24px;">
    <div class="page-header">
      <div><div class="page-title">Verified Sales Intelligence</div><div class="page-subtitle">Track authenticity, impact, and ROI of verified sales across your network.</div></div>
      <button class="btn btn-outline">↓ Download Report</button>
    </div>
    <div class="metrics-row mb-18" style="grid-template-columns:repeat(6,1fr);">
      ${d.metrics.map((m,i)=>{
        const icons=['💰','🛡️','❌','📊','📈','🎁'];
        const colors=['green','green','red','blue','orange','purple'];
        return `<div class="metric-card"><div class="metric-icon ${colors[i]}" style="font-size:14px;">${icons[i]}</div><div class="metric-label">${m.label}</div><div class="metric-value" style="font-size:20px;">${m.value}</div><div class="metric-change ${m.up?'up':'down'}">${upArrow(m.up)} ${m.change} <span class="sub">vs last 30 days</span></div></div>`;
      }).join('')}
    </div>
    <div class="tab-bar">
      ${['Overview','Trend Analysis','Geography','SKU Performance','Field Agents'].map((t,i)=>`<div class="tab-item${i===0?' active':''}">${t}</div>`).join('')}
      <div style="margin-left:auto;display:flex;gap:8px;align-items:center;">
        <select class="filter-select" style="font-size:11px;"><option>Last 30 Days</option></select>
        <button class="btn btn-outline btn-sm">▼ Filters</button>
      </div>
    </div>
    <div class="grid-2-1 mb-14">
      <div class="card">
        <div class="card-title" style="margin-bottom:4px;">Verified vs Non-Verified Sales Trend</div>
        <div style="display:flex;gap:14px;margin-bottom:10px;">
          <span style="display:flex;align-items:center;gap:4px;font-size:10px;color:var(--text3);"><div style="width:8px;height:8px;background:var(--green);border-radius:2px;"></div> Verified Sales</span>
          <span style="display:flex;align-items:center;gap:4px;font-size:10px;color:var(--text3);"><div style="width:8px;height:8px;background:var(--orange);border-radius:2px;"></div> Non-Verified Sales</span>
          <span style="display:flex;align-items:center;gap:4px;font-size:10px;color:var(--text3);"><div style="width:8px;height:8px;background:var(--blue);border-radius:50%;"></div> Verification Rate (%)</span>
        </div>
        <canvas id="verifiedTrendChart" height="150"></canvas>
      </div>
      <div class="card">
        <div class="card-title" style="margin-bottom:14px;">Sales by Verification Status</div>
        <div style="display:flex;align-items:center;gap:16px;margin-bottom:12px;">
          <div style="position:relative;width:110px;height:110px;flex-shrink:0;">
            <canvas id="verifiedStatusDonut" width="110" height="110"></canvas>
            <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;">
              <div style="font-size:13px;font-weight:800;">₹156.48 Cr</div>
              <div style="font-size:9px;color:var(--text3);">Total Sales</div>
            </div>
          </div>
          <div>
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
              <div style="width:10px;height:10px;background:var(--green);border-radius:50%;"></div>
              <div><div style="font-size:12px;font-weight:600;">Verified</div><div style="font-size:11px;color:var(--text3);">₹98.73 Cr (63.1%)</div></div>
            </div>
            <div style="display:flex;align-items:center;gap:8px;">
              <div style="width:10px;height:10px;background:var(--orange);border-radius:50%;"></div>
              <div><div style="font-size:12px;font-weight:600;">Non-Verified</div><div style="font-size:11px;color:var(--text3);">₹57.75 Cr (36.9%)</div></div>
            </div>
          </div>
        </div>
        <div style="background:var(--bg3);border-radius:6px;padding:10px;text-align:center;border:1px solid var(--border);">
          <div style="font-size:11px;color:var(--text3);">Verified sales are</div>
          <div style="font-size:20px;font-weight:800;color:var(--green);">1.71x</div>
          <div style="font-size:11px;color:var(--text3);">higher than non-verified</div>
        </div>
      </div>
    </div>
    <div class="grid-3">
      <div class="card">
        <div class="card-title" style="margin-bottom:12px;">ROI Bridge</div>
        <canvas id="roiBridgeChart" height="140"></canvas>
        <div style="text-align:center;margin-top:8px;font-size:11px;color:var(--text3);">ROI per Verified Sale: <span style="color:var(--green);font-weight:700;">3.74x</span></div>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">Top SKUs by Verification Rate</div><span class="card-link">View All</span></div>
        <table class="data-table">
          <thead><tr><th>SKU</th><th>Verification Rate</th><th>Sales (₹ Cr)</th></tr></thead>
          <tbody>${d.topSKUs.map(s=>`<tr>
            <td class="td-name">${s.sku}</td>
            <td><div style="display:flex;align-items:center;gap:6px;"><div style="flex:1;background:var(--bg4);border-radius:2px;height:5px;max-width:80px;"><div style="width:${s.barPct}%;height:100%;background:${s.barColor==='green'?'var(--green)':s.barColor==='yellow'?'var(--yellow)':'var(--red)'};border-radius:2px;"></div></div><span style="font-size:11px;font-weight:600;">${s.rate}</span></div></td>
            <td class="td-value">${s.sales}</td>
          </tr>`).join('')}</tbody>
        </table>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">Under-Verified Areas</div><span class="card-link">View Action Plan</span></div>
        <table class="data-table">
          <thead><tr><th>State / District</th><th>Rate</th><th>Gap</th><th>Action</th></tr></thead>
          <tbody>${d.underVerified.map(u=>`<tr>
            <td class="td-name">${u.region}</td><td>${u.rate}</td>
            <td><span style="font-size:11px;font-weight:700;color:var(--red);background:var(--red-dim);padding:2px 6px;border-radius:4px;">${u.gap}</span></td>
            <td><button class="btn btn-blue btn-sm" style="font-size:10px;">Act</button></td>
          </tr>`).join('')}</tbody>
        </table>
      </div>
    </div>
  </div>`;
}

// ===== USERS =====
function buildUsers() {
  return `<div style="display:grid;grid-template-columns:1fr 240px;height:calc(100vh - 52px);">
    <div style="overflow-y:auto;padding:20px;">
      <div class="page-header">
        <div><div class="page-title">User Assignment</div><div class="page-subtitle">Assign users to roles and geographical areas</div></div>
        <div class="page-actions"><button class="btn btn-primary">+ Invite User</button><button class="btn btn-outline">↓ Export</button></div>
      </div>
      <div class="tab-bar">
        <div class="tab-item active">Users</div><div class="tab-item">Bulk Assignment</div><div class="tab-item">Pending Invitations</div>
      </div>
      <div class="metrics-row mb-14" style="grid-template-columns:repeat(4,1fr);">
        ${[['Total Users','1,248','+12 this month'],['Active Users','1,156','92.8%'],['Pending','45','— 30d'],['Inactive','47 ⚠️','3.8%']].map(([l,v,s],i)=>`<div class="metric-card"><div class="metric-label">${l}</div><div class="metric-value">${v}</div><div style="font-size:11px;color:var(--text3);margin-top:4px;">${s}</div></div>`).join('')}
      </div>
      <div class="card">
        <table class="data-table">
          <thead><tr><th>User</th><th>Role</th><th>Territory</th><th>Reports To</th><th>Last Active</th><th>Status</th><th></th></tr></thead>
          <tbody>${DATA.users.map(u=>`<tr>
            <td><div style="display:flex;align-items:center;gap:8px;">
              <div style="width:32px;height:32px;border-radius:50%;background:${u.color}22;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:${u.color};">${u.initials}</div>
              <div><div style="font-size:12.5px;font-weight:600;color:var(--text);">${u.name}</div><div style="font-size:10px;color:var(--text3);">${u.email}</div></div>
            </div></td>
            <td>${u.role}</td><td>${u.territory}</td><td>${u.reportsTo}</td>
            <td style="font-size:11px;">${u.lastActive}</td>
            <td><span class="badge ${u.status==='active'?'badge-green':'badge-red'}"><span style="width:5px;height:5px;border-radius:50%;background:currentColor;display:inline-block;margin-right:3px;"></span>${u.status}</span></td>
            <td><button class="btn btn-ghost btn-sm" style="padding:2px 6px;">⋮</button></td>
          </tr>`).join('')}</tbody>
        </table>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:12px;">
          <span style="font-size:11px;color:var(--text3);">Showing 1 to 7 of 1,248 users</span>
          <div class="pagination">
            <button class="pg-btn">‹</button><button class="pg-btn active">1</button><button class="pg-btn">2</button><button class="pg-btn">3</button><button class="pg-btn">...</button><button class="pg-btn">178</button><button class="pg-btn">›</button>
          </div>
        </div>
      </div>
    </div>
    <div style="background:var(--bg2);border-left:1px solid var(--border);padding:16px;overflow-y:auto;">
      <div style="background:var(--card2);border:1px solid var(--border);border-radius:var(--radius);padding:14px;">
        <div style="font-size:14px;font-weight:600;margin-bottom:10px;">Assign Geography</div>
        <div style="display:flex;align-items:center;gap:8px;padding:10px;background:var(--bg3);border-radius:8px;margin-bottom:12px;">
          <div style="width:32px;height:32px;border-radius:50%;background:var(--orange-dim);color:var(--orange);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;">AS</div>
          <div><div style="font-size:13px;font-weight:600;">Amit Singh</div><div style="font-size:11px;color:var(--text3);">Territory Manager</div></div>
        </div>
        <div style="font-size:11px;color:var(--text3);margin-bottom:6px;">Current Assignment</div>
        <div style="background:var(--bg4);border-radius:6px;padding:10px;margin-bottom:12px;">
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;"><div style="width:8px;height:8px;background:var(--green);border-radius:50%;"></div><div style="font-size:12.5px;font-weight:600;color:var(--green);">Lucknow Territory</div></div>
          <div style="font-size:11px;color:var(--text3);">3 Districts, 24 Talukas,<br>312 Villages</div>
        </div>
        <div style="font-size:11px;color:var(--text3);font-weight:600;margin-bottom:6px;">Modify Assignment</div>
        <div style="padding:6px 0;font-size:11.5px;color:var(--green);cursor:pointer;">+ Add Districts / Add Talukas</div>
        <div style="padding:6px 0;font-size:11.5px;color:var(--green);cursor:pointer;">+ Set Role As</div>
        <div style="padding:8px 0;font-size:11.5px;color:var(--red);cursor:pointer;">🗑 Remove</div>
        <button class="btn btn-primary" style="width:100%;margin-top:8px;">Update Assignment</button>
        <button class="btn btn-ghost btn-sm" style="width:100%;margin-top:4px;">View Full Profile</button>
      </div>
    </div>
  </div>`;
}

// ===== PERMISSIONS =====
function buildPermissions() {
  const p = DATA.permissions;
  const permIcon = (v) => {
    if (v==='allow') return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>`;
    if (v==='deny') return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
    if (v==='partial') return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#eab308" stroke-width="2"/><path d="M8 12h8" stroke="#eab308" stroke-width="2" stroke-linecap="round"/></svg>`;
    return `<span style="color:var(--text4);">—</span>`;
  };
  return `<div style="display:grid;grid-template-columns:1fr 220px;height:calc(100vh - 52px);">
    <div style="overflow-y:auto;padding:20px;">
      <div class="page-header">
        <div><div class="page-title">Role Rights & Permissions</div><div class="page-subtitle">Define what actions each role can access</div></div>
        <button class="btn btn-outline">↓ Export Matrix</button>
      </div>
      <div class="tab-bar"><div class="tab-item">Roles</div><div class="tab-item active">Permissions</div><div class="tab-item">Data Access</div></div>
      <div class="card" style="padding:0;overflow:hidden;">
        <table class="perm-table">
          <thead><tr>
            <th class="left" style="padding:10px 14px;min-width:220px;">Module / Permission</th>
            <th>HQ Admin</th><th>Region Head</th><th>State Head</th><th>Territory Mgr</th><th>Field Agent</th>
          </tr></thead>
          <tbody>${p.modules.map(mod=>`
            <tr class="module-row"><td class="left" colspan="6" style="padding:8px 14px;">
              <div style="display:flex;align-items:center;gap:6px;">${IC[mod.icon]||IC.dashboard} ${mod.name}</div>
            </td></tr>
            ${mod.items.map(item=>`<tr>
              <td class="left" style="padding:7px 14px 7px 28px;color:var(--text2);">
                <div style="display:flex;align-items:center;gap:6px;"><div style="width:5px;height:5px;border-radius:50%;background:var(--border2);"></div>${item.label}</div>
              </td>
              <td style="text-align:center;">${permIcon(item.hq)}</td>
              <td style="text-align:center;">${permIcon(item.rh)}</td>
              <td style="text-align:center;">${permIcon(item.sh)}</td>
              <td style="text-align:center;">${permIcon(item.tm)}</td>
              <td style="text-align:center;">${permIcon(item.fa)}</td>
            </tr>`).join('')}
          `).join('')}</tbody>
        </table>
        <div style="padding:10px 14px;border-top:1px solid var(--border);display:flex;gap:16px;">
          ${[['Allow','#22c55e'],['Partial','#eab308'],['Denied','#ef4444'],['N/A','#475569']].map(([l,c])=>`<span style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--text3);"><div style="width:9px;height:9px;border-radius:50%;background:${c};"></div>${l}</span>`).join('')}
        </div>
      </div>
    </div>
    <div style="background:var(--bg2);border-left:1px solid var(--border);padding:16px;overflow-y:auto;">
      <div style="background:var(--card2);border:1px solid var(--border);border-radius:var(--radius);padding:14px;">
        <div style="font-size:14px;font-weight:600;margin-bottom:10px;">Permission Details</div>
        <div style="font-size:13px;font-weight:600;color:var(--green);margin-bottom:4px;">View Retailer Data</div>
        <div style="font-size:11.5px;color:var(--text2);line-height:1.5;margin-bottom:12px;">Allows viewing retailer-level data including sales, stock, and sell details</div>
        <hr style="border-color:var(--border);margin:12px 0;"/>
        <div style="font-size:13px;font-weight:600;margin-bottom:8px;">Data Level Access</div>
        ${[['None',false],['Aggregated (District/Village)',false],['Full (Retailer-level)',true]].map(([l,checked])=>`<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
          <div style="width:14px;height:14px;border-radius:50%;border:2px solid ${checked?'var(--green)':'var(--border2)'};background:${checked?'var(--green)':'transparent'};display:flex;align-items:center;justify-content:center;">
            ${checked?'<div style="width:5px;height:5px;background:#fff;border-radius:50%;"></div>':''}
          </div>
          <span style="font-size:12px;color:var(--text2);">${l}</span>
        </div>`).join('')}
        <hr style="border-color:var(--border);margin:12px 0;"/>
        <div style="font-size:13px;font-weight:600;margin-bottom:8px;">Conditions</div>
        ${['Only users with assigned territory','Data filtered by hierarchy'].map(c=>`<div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;font-size:12px;color:var(--text2);">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>${c}
        </div>`).join('')}
        <button class="btn btn-primary" style="width:100%;margin-top:12px;">Save Changes</button>
      </div>
    </div>
  </div>`;
}

// ===== GEOGRAPHY =====
function buildGeography() {
  const g = DATA.geoTree;
  function renderTree(node, depth=0) {
    const has = node.children && node.children.length > 0;
    return `<div>
      <div class="geo-tree-item ${depth===2?'active':''}" style="padding-left:${8+depth*12}px;">
        ${node.color?`<div class="geo-color-dot" style="background:${node.color};"></div>`:''}
        ${has?`<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>`:'<div style="width:10px;"></div>'}
        <span>${node.label}</span>
        ${node.territories?`<span style="font-size:10px;color:var(--text3);margin-left:4px;">${node.territories} Territories</span>`:''}
      </div>
      ${has?node.children.map(c=>renderTree(c,depth+1)).join(''):''}
    </div>`;
  }
  return `<div style="overflow-y:auto;height:calc(100vh - 52px);padding:20px;">
    <div class="page-header">
      <div><div class="page-title">Geography Mapping Builder</div><div class="page-subtitle">Map and manage geographical boundaries</div></div>
      <button class="btn btn-ghost btn-sm">ℹ How it works</button>
    </div>
    <div class="filter-bar">${filterSelect('Company','Godrej Agrovet')}${filterSelect('View by','Territory')}${filterSelect('Territory','Lucknow Territory')}</div>
    <div style="display:flex;gap:16px;margin-bottom:14px;padding:10px 14px;background:var(--bg3);border:1px solid var(--border);border-radius:8px;font-size:12px;">
      ${['3 Districts','24 Talukas','372 Villages','12,842 Retailers'].map(v=>`<span style="font-weight:600;color:var(--text);">${v}</span>`).join('<span style="color:var(--border2);">|</span>')}
    </div>
    <div style="display:grid;grid-template-columns:200px 1fr 190px;gap:14px;">
      <div class="card" style="padding:10px;">
        <div style="font-size:12px;font-weight:600;margin-bottom:8px;">Geography Tree</div>
        <div class="geo-tree">${renderTree(g)}</div>
      </div>
      <div class="card" style="padding:10px;position:relative;">
        <div style="display:flex;justify-content:flex-end;gap:4px;margin-bottom:8px;">
          <button class="map-btn active">Map</button><button class="map-btn">Satellite</button>
        </div>
        ${largeMapSVG()}
        <div style="position:absolute;top:40px;left:18px;display:flex;flex-direction:column;gap:4px;">
          <button class="zoom-btn">+</button><button class="zoom-btn">−</button>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:10px;">
        <div class="card">
          <div style="font-size:13px;font-weight:600;margin-bottom:10px;">Mapping Tools</div>
          <div style="font-size:11px;color:var(--text3);margin-bottom:4px;">Select Level</div>
          <select class="filter-select" style="width:100%;margin-bottom:12px;font-size:12px;"><option>Village</option><option>District</option><option>Territory</option></select>
          <div style="display:flex;gap:8px;justify-content:center;margin-bottom:12px;">
            ${[['✏️','Draw'],['⬆️','Upload'],['➕','Bulk Add']].map(([i,l])=>`<div style="display:flex;flex-direction:column;align-items:center;gap:4px;cursor:pointer;">
              <div style="width:32px;height:32px;background:var(--bg3);border:1px solid var(--border);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:14px;">${i}</div>
              <span style="font-size:10px;color:var(--text3);">${l}</span>
            </div>`).join('')}
          </div>
        </div>
        <div class="card">
          <div style="font-size:12px;font-weight:600;margin-bottom:10px;">Selected Area Summary</div>
          <div style="font-size:13px;font-weight:700;color:var(--green);margin-bottom:8px;">Lucknow Territory</div>
          ${[['5','Districts'],['24','Talukas'],['312','Villages'],['12,642','Retailers']].map(([n,l])=>`<div style="display:flex;justify-content:space-between;margin-bottom:6px;">
            <span style="font-size:20px;font-weight:700;">${n}</span>
            <span style="font-size:10px;color:var(--text3);align-self:flex-end;">${l}</span>
          </div>`).join('')}
          <button class="btn btn-primary" style="width:100%;margin-top:8px;">Save Mapping</button>
          <button class="btn btn-ghost btn-sm" style="width:100%;margin-top:4px;">Discard</button>
        </div>
      </div>
    </div>
  </div>`;
}

// ===== HIERARCHY =====
function buildHierarchy() {
  return `<div style="overflow-y:auto;height:calc(100vh - 52px);padding:20px;">
    <div class="page-header">
      <div><div class="page-title">Hierarchy Setup</div><div class="page-subtitle">Define your organizational structure and role hierarchy</div></div>
      <button class="btn btn-outline">↓ Export</button>
    </div>
    <div class="tab-bar"><div class="tab-item active">Hierarchy Builder</div><div class="tab-item">Role Levels</div></div>
    <div style="display:grid;grid-template-columns:1fr 220px;gap:16px;">
      <div>
        <div style="display:flex;gap:8px;margin-bottom:14px;align-items:center;">
          ${filterSelect('Company','Godrej Agrovet')}${filterSelect('Version','2024 - v1 (Active)')}
          <div style="margin-left:auto;"><button class="btn btn-primary">+ Add Level</button></div>
        </div>
        <div class="card" style="overflow-x:auto;min-height:380px;">
          <div style="display:flex;flex-direction:column;align-items:center;padding:16px;gap:0;">
            <!-- HQ -->
            <div style="display:flex;flex-direction:column;align-items:center;margin-bottom:0;">
              <div style="background:var(--green-dim);border:2px solid var(--green);border-radius:8px;padding:10px 24px;text-align:center;cursor:pointer;min-width:120px;">
                <div style="font-size:18px;margin-bottom:2px;">🏢</div>
                <div style="font-size:12px;font-weight:700;">HQ</div>
                <div style="font-size:10px;color:var(--text3);">Level 1</div>
              </div>
              <div style="width:2px;height:18px;background:var(--border2);"></div>
            </div>
            <!-- Region -->
            <div style="display:flex;gap:40px;align-items:flex-start;position:relative;margin-bottom:0;">
              <div style="position:absolute;top:0;left:25%;right:25%;height:2px;background:var(--border2);"></div>
              ${[['East Region','5 States'],['West Region','5 States']].map(([n,s])=>`<div style="display:flex;flex-direction:column;align-items:center;">
                <div style="background:var(--blue-dim);border:1px solid var(--border2);border-radius:8px;padding:8px 18px;text-align:center;min-width:110px;cursor:pointer;">
                  <div style="font-size:14px;margin-bottom:2px;">🌍</div>
                  <div style="font-size:11px;font-weight:700;">${n}</div>
                  <div style="font-size:10px;color:var(--text3);">${s}</div>
                </div>
                <div style="width:2px;height:18px;background:var(--border2);"></div>
              </div>`).join('')}
            </div>
            <!-- State -->
            <div style="display:flex;gap:18px;align-items:flex-start;position:relative;margin-bottom:0;">
              <div style="position:absolute;top:0;left:8%;right:8%;height:2px;background:var(--border2);"></div>
              ${['State A','State B','State C','State D'].map(n=>`<div style="display:flex;flex-direction:column;align-items:center;">
                <div style="background:var(--purple-dim);border:1px solid var(--border2);border-radius:7px;padding:7px 12px;text-align:center;min-width:88px;cursor:pointer;">
                  <div style="font-size:13px;margin-bottom:2px;">🏛️</div>
                  <div style="font-size:11px;font-weight:700;">${n}</div>
                  <div style="font-size:9px;color:var(--text3);">5 Districts</div>
                </div>
                <div style="width:2px;height:16px;background:var(--border2);"></div>
              </div>`).join('')}
            </div>
            <!-- Territory -->
            <div style="display:flex;gap:10px;align-items:flex-start;position:relative;margin-bottom:0;">
              <div style="position:absolute;top:0;left:4%;right:4%;height:2px;background:var(--border2);"></div>
              ${['Territory A','Territory B','Territory C','Territory D'].map((n,i)=>`<div style="display:flex;flex-direction:column;align-items:center;">
                <div style="background:var(--orange-dim);border:1px solid ${i===1?'var(--orange)':'var(--border2)'};border-radius:7px;padding:7px 10px;text-align:center;min-width:82px;cursor:pointer;">
                  <div style="font-size:12px;margin-bottom:2px;">🗺️</div>
                  <div style="font-size:11px;font-weight:700;">${n}</div>
                  <div style="font-size:9px;color:var(--text3);">3-4 Districts</div>
                </div>
                <div style="width:2px;height:16px;background:var(--border2);"></div>
              </div>`).join('')}
            </div>
            <!-- Agents -->
            <div style="display:flex;gap:6px;align-items:flex-start;position:relative;">
              <div style="position:absolute;top:0;left:2%;right:2%;height:2px;background:var(--border2);"></div>
              ${['Agent','Agent','Agent','Agent','Agent','Agent'].map(n=>`<div style="display:flex;flex-direction:column;align-items:center;">
                <div style="background:var(--bg3);border:1px solid var(--border);border-radius:7px;padding:7px 8px;text-align:center;min-width:72px;cursor:pointer;">
                  <div style="font-size:12px;margin-bottom:2px;">👤</div>
                  <div style="font-size:10px;font-weight:700;">${n}</div>
                  <div style="font-size:9px;color:var(--text3);">10-15 Villages</div>
                </div>
              </div>`).join('')}
            </div>
            <div style="text-align:center;margin-top:14px;font-size:10px;color:var(--text3);">🟢 Drag and drop levels to reorder · Click on a level to edit details</div>
          </div>
        </div>
      </div>
      <div style="background:var(--card2);border:1px solid var(--border);border-radius:var(--radius);padding:14px;height:fit-content;">
        <div style="font-size:13px;font-weight:600;margin-bottom:12px;">Level Configuration</div>
        <div style="display:flex;align-items:center;gap:8px;padding:8px;background:var(--bg3);border-radius:6px;margin-bottom:12px;">
          <div style="width:28px;height:28px;background:var(--orange-dim);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:14px;">🗺️</div>
          <div><div style="font-size:13px;font-weight:600;">Territory</div><div style="font-size:11px;color:var(--text3);">Level 4</div></div>
        </div>
        ${[['Level Name','Territory'],['Reports To','State']].map(([l,v])=>`<div style="margin-bottom:10px;">
          <div style="font-size:11px;color:var(--text3);margin-bottom:4px;">${l}</div>
          ${l==='Reports To'?`<select class="filter-select" style="width:100%;font-size:12px;"><option>${v}</option></select>`:`<input type="text" value="${v}" style="width:100%;background:var(--bg3);border:1px solid var(--border);color:var(--text);font-family:var(--font);font-size:12px;padding:6px 10px;border-radius:6px;outline:none;"/>`}
        </div>`).join('')}
        <div style="margin-bottom:10px;">
          <div style="font-size:11px;color:var(--text3);margin-bottom:4px;">Description</div>
          <textarea style="width:100%;background:var(--bg3);border:1px solid var(--border);color:var(--text);font-family:var(--font);font-size:11px;padding:6px 10px;border-radius:6px;outline:none;resize:none;height:56px;">Manages a group of districts and oversees field operations</textarea>
        </div>
        <div style="font-size:11px;color:var(--text3);margin-bottom:6px;font-weight:600;">Key Responsibilities</div>
        ${['Village Coverage','Retailer Development','Sales Growth'].map(r=>`<div style="display:flex;align-items:center;gap:6px;margin-bottom:5px;font-size:12px;color:var(--text2);">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>${r}
        </div>`).join('')}
        <button class="btn btn-primary" style="width:100%;margin-top:12px;">Save Changes</button>
      </div>
    </div>
  </div>`;
}

// ===== CAMPAIGNS =====
function buildCampaigns() {
  const campaigns = DATA.hq.campaigns.concat([
    {name:'Kisan Mela 2024',sku:'All SKUs',region:'All India',spend:'₹52.1L',sales:'₹2.1 Cr',roi:'4.0x'},
    {name:'Soil Doctor',sku:'Soil Health Card',region:'West',spend:'₹12.3L',sales:'₹48.2L',roi:'3.9x'},
  ]);
  return `<div style="overflow-y:auto;height:calc(100vh - 52px);padding:20px;">
    <div class="page-header">
      <div><div class="page-title">Campaigns</div><div class="page-subtitle">Track and manage all active campaigns</div></div>
      <button class="btn btn-primary">+ Create Campaign</button>
    </div>
    <div class="metrics-row mb-14" style="grid-template-columns:repeat(4,1fr);">
      ${[['Active Campaigns','12','+2 this month'],['Total Spend','₹2.4 Cr','Within budget'],['Avg. ROI','3.9x','+0.4x vs last month'],['Expiring Soon','3','In next 7 days']].map(([l,v,s])=>`<div class="metric-card"><div class="metric-label">${l}</div><div class="metric-value">${v}</div><div style="font-size:11px;color:var(--text3);margin-top:4px;">${s}</div></div>`).join('')}
    </div>
    <div class="card">
      <table class="data-table">
        <thead><tr><th>Campaign</th><th>SKU</th><th>Region</th><th>Status</th><th>Spend</th><th>Sales</th><th>ROI</th><th>End Date</th><th></th></tr></thead>
        <tbody>${campaigns.map((c,i)=>`<tr>
          <td class="td-name">${c.name}</td><td>${c.sku}</td><td>${c.region}</td>
          <td><span class="badge badge-green">Active</span></td>
          <td>${c.spend}</td><td class="td-value">${c.sales}</td>
          <td style="color:var(--green);font-weight:700;">${c.roi}</td>
          <td style="font-size:11px;color:var(--text3);">Apr ${20+i}, 2024</td>
          <td><button class="btn btn-ghost btn-sm">⋮</button></td>
        </tr>`).join('')}</tbody>
      </table>
    </div>
  </div>`;
}

// ===== REPORTS =====
function buildReports() {
  return `<div style="overflow-y:auto;height:calc(100vh - 52px);padding:20px;">
    <div class="page-header">
      <div><div class="page-title">Reports</div><div class="page-subtitle">Download and schedule reports</div></div>
      <button class="btn btn-primary">+ Schedule Report</button>
    </div>
    <div class="grid-2">
      ${[['Monthly Performance Report','All India — Last 30 Days','Ready','green'],['Verified Sales Analysis','All Regions — Apr 2024','Ready','green'],['Campaign ROI Report','Q1 2024 Campaign Summary','Processing','yellow'],['Field Agent Activity','Lucknow Territory — This Week','Ready','green'],['Retailer Health Report','Low Activity Villages','Ready','green'],['SKU Penetration Analysis','All SKUs — Last 90 Days','Scheduled','blue']].map(([t,s,b,c])=>`<div class="card" style="display:flex;align-items:center;gap:12px;">
        <div style="width:40px;height:40px;background:var(--bg3);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:20px;">📊</div>
        <div style="flex:1;"><div style="font-size:13px;font-weight:600;">${t}</div><div style="font-size:11px;color:var(--text3);">${s}</div></div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px;">
          <span class="badge badge-${c}">${b}</span>
          <button class="btn btn-outline btn-sm" style="font-size:10px;">↓ Download</button>
        </div>
      </div>`).join('')}
    </div>
  </div>`;
}

// ===== SETTINGS =====
function buildSettings() {
  return `<div style="overflow-y:auto;height:calc(100vh - 52px);padding:20px;max-width:700px;">
    <div class="page-header"><div><div class="page-title">Settings</div><div class="page-subtitle">Manage your account and platform preferences</div></div></div>
    ${[
      {section:'Profile',items:[{label:'Display Name',sub:'Ankit Mehta',type:'input'},{label:'Email Address',sub:'ankit.m@godrej.com',type:'input'},{label:'Phone Number',sub:'+91 98765 43210',type:'input'}]},
      {section:'Notifications',items:[{label:'Email Notifications',sub:'Receive daily summary emails',type:'toggle',on:true},{label:'Push Notifications',sub:'Alerts on mobile app',type:'toggle',on:true},{label:'Weekly Reports',sub:'Auto-receive reports every Monday',type:'toggle',on:false}]},
      {section:'Display',items:[{label:'Dark Mode',sub:'Currently enabled',type:'toggle',on:true},{label:'Compact View',sub:'Reduce spacing in tables',type:'toggle',on:false}]},
      {section:'Security',items:[{label:'Two-Factor Authentication',sub:'Enabled via Authenticator App',type:'toggle',on:true}]},
    ].map(s=>`<div class="settings-section">
      <div class="settings-section-title">${s.section}</div>
      ${s.items.map(item=>`<div class="settings-row">
        <div><div class="settings-label">${item.label}</div><div class="settings-sub">${item.sub}</div></div>
        ${item.type==='toggle'?`<button class="toggle ${item.on?'on':''}" onclick="this.classList.toggle('on')"></button>`:`<input type="text" value="${item.sub}" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-family:var(--font);font-size:12px;padding:5px 10px;border-radius:6px;outline:none;width:220px;"/>`}
      </div>`).join('')}
    </div>`).join('')}
  </div>`;
}

// ===== OVERVIEW (Admin) =====
function buildOverview() {
  return `<div style="overflow-y:auto;height:calc(100vh - 52px);padding:20px;">
    <div class="page-header"><div><div class="page-title">Platform Overview</div><div class="page-subtitle">Super admin — full platform intelligence</div></div></div>
    <div class="metrics-row" style="grid-template-columns:repeat(6,1fr);">
      ${[['Total Users','1,248','green'],['Total Retailers','82,410','blue'],['Active Villages','1,24,890','purple'],['Sales (National)','₹156.48 Cr','green'],['Verified Sales','63.1%','green'],['Platform Health','98.4%','cyan']].map(([l,v,c])=>`<div class="metric-card">
        <div class="metric-icon ${c}" style="font-size:14px;">${c==='green'?'✅':c==='blue'?'🏪':c==='purple'?'🏘️':c==='cyan'?'⚙️':'📊'}</div>
        <div class="metric-label">${l}</div>
        <div class="metric-value">${v}</div>
      </div>`).join('')}
    </div>
    <div class="grid-2 mb-14" style="margin-top:14px;">
      <div class="card">
        <div class="card-title" style="margin-bottom:12px;">System Health</div>
        ${[['API Uptime','99.98%','green'],['Data Sync','Real-time','green'],['Active Sessions','1,248','blue'],['Failed Logins','3','red']].map(([l,v,c])=>`<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(30,45,61,0.4);">
          <span style="font-size:12px;color:var(--text2);">${l}</span>
          <span style="font-size:12px;font-weight:600;color:var(--${c});">${v}</span>
        </div>`).join('')}
      </div>
      <div class="card">
        <div class="card-title" style="margin-bottom:12px;">Quick Navigation</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
          ${[['🏗️','Hierarchy Setup','hierarchy'],['🗺️','Geography Mapping','geography'],['🛡️','Roles & Permissions','permissions'],['🛡️','Verified Sales','verified-sales']].map(([i,l,s])=>`<button class="quick-action-btn" onclick="navigate('${s}')">
            <span style="font-size:20px;">${i}</span>
            <span style="font-size:10px;">${l}</span>
          </button>`).join('')}
        </div>
      </div>
    </div>
  </div>`;
}

// ===== PLACEHOLDER =====
function buildPlaceholder(screenId) {
  return `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:calc(100vh - 52px);gap:12px;">
    <div style="font-size:40px;">🚧</div>
    <div style="font-size:18px;font-weight:600;color:var(--text);">${screenId.replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase())}</div>
    <div style="font-size:13px;color:var(--text3);">This screen is under construction</div>
    <button class="btn btn-outline" onclick="navigate('${DATA.roles[currentRole].defaultScreen}')">← Back to Dashboard</button>
  </div>`;
}

// ===== CHARTS =====
function drawChartsForScreen(screenId) {
  switch(screenId) {
    case 'hq-dashboard': drawHQCharts(); break;
    case 'field-dashboard': drawFieldCharts(); break;
    case 'state-dashboard': drawStateCharts(); break;
    case 'territory-dashboard': drawTerritoryCharts(); break;
    case 'verified-sales': drawVerifiedCharts(); break;
  }
}

function getCtx(id) {
  const el = document.getElementById(id);
  return el ? el.getContext('2d') : null;
}

function drawLineChart(ctx, w, h, datasets, labels) {
  if (!ctx) return;
  ctx.clearRect(0, 0, w, h);
  const pad = {top:8, right:8, bottom:22, left:34};
  const cw = w - pad.left - pad.right;
  const ch = h - pad.top - pad.bottom;
  // Grid
  ctx.strokeStyle = 'rgba(30,45,61,0.5)';
  ctx.lineWidth = 1;
  for (let i=0;i<=4;i++) {
    const y = pad.top + (ch/4)*i;
    ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(pad.left+cw, y); ctx.stroke();
  }
  // Labels
  ctx.fillStyle = '#475569';
  ctx.font = '9px DM Sans';
  ctx.textAlign = 'center';
  if (labels) labels.forEach((l,i) => {
    const x = pad.left + (cw/(labels.length-1))*i;
    ctx.fillText(l, x, h - 4);
  });
  // Lines
  datasets.forEach(ds => {
    const vals = ds.data;
    const max = Math.max(...datasets.flatMap(d=>d.data)) * 1.1;
    const min = 0;
    const range = max - min || 1;
    ctx.strokeStyle = ds.color;
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';
    ctx.beginPath();
    vals.forEach((v,i) => {
      const x = pad.left + (cw/(vals.length-1))*i;
      const y = pad.top + ch - (v - min)/range * ch;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.stroke();
    // Fill
    if (ds.fill) {
      ctx.lineTo(pad.left + cw, pad.top + ch);
      ctx.lineTo(pad.left, pad.top + ch);
      ctx.closePath();
      const grad = ctx.createLinearGradient(0, pad.top, 0, pad.top + ch);
      grad.addColorStop(0, ds.color + '30');
      grad.addColorStop(1, ds.color + '00');
      ctx.fillStyle = grad;
      ctx.fill();
    }
    // Dots
    ctx.fillStyle = ds.color;
    vals.forEach((v,i) => {
      const x = pad.left + (cw/(vals.length-1))*i;
      const y = pad.top + ch - (v - min)/range * ch;
      ctx.beginPath(); ctx.arc(x, y, 2.5, 0, Math.PI*2); ctx.fill();
    });
  });
}

function drawDonut(ctx, w, h, segments, gap=0.06) {
  if (!ctx) return;
  ctx.clearRect(0, 0, w, h);
  const cx = w/2, cy = h/2, r = Math.min(w, h)/2 - 4, inner = r * 0.58;
  const total = segments.reduce((a,s)=>a+s.value,0);
  let angle = -Math.PI/2;
  segments.forEach(s => {
    const sweep = (s.value/total) * Math.PI * 2 - gap;
    ctx.beginPath();
    ctx.arc(cx, cy, r, angle, angle + sweep);
    ctx.arc(cx, cy, inner, angle + sweep, angle, true);
    ctx.closePath();
    ctx.fillStyle = s.color;
    ctx.fill();
    angle += sweep + gap;
  });
}

function drawBarChart(ctx, w, h, bars, labels) {
  if (!ctx) return;
  ctx.clearRect(0, 0, w, h);
  const pad = {top:10, right:8, bottom:22, left:8};
  const cw = w - pad.left - pad.right;
  const ch = h - pad.top - pad.bottom;
  const max = Math.max(...bars.map(b=>b.value));
  const bw = cw/bars.length - 4;
  bars.forEach((b,i) => {
    const x = pad.left + (cw/bars.length)*i + 2;
    const bh = (b.value/max) * ch;
    const y = pad.top + ch - bh;
    const grad = ctx.createLinearGradient(0, y, 0, y + bh);
    grad.addColorStop(0, b.color || '#22c55e');
    grad.addColorStop(1, (b.color || '#22c55e') + '80');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(x, y, bw, bh, [3, 3, 0, 0]) : ctx.rect(x, y, bw, bh);
    ctx.fill();
    if (labels && labels[i]) {
      ctx.fillStyle = '#475569';
      ctx.font = '8px DM Sans';
      ctx.textAlign = 'center';
      ctx.fillText(labels[i], x + bw/2, h - 4);
    }
  });
}

const MONTHS_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DAYS_SHORT = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const WEEKS = ['W1','W2','W3','W4'];

function drawHQCharts() {
  const c = getCtx('hqTrendChart');
  if (!c) return;
  const w = c.canvas.width = c.canvas.offsetWidth || 300;
  const h = c.canvas.height = 120;
  drawLineChart(c, w, h, [
    {data:[6.8,7.1,6.9,7.4,8.2,8.6,9.1,9.3,9.8,9.5,9.8,10.1], color:'#22c55e', fill:true},
    {data:[55,58,56,60,62,63,65,66,68,67,68,69], color:'#3b82f6', fill:false},
  ], MONTHS_SHORT);
}

function drawFieldCharts() {
  const c = getCtx('fieldTrendChart');
  if (c) {
    const w = c.canvas.width = c.canvas.offsetWidth || 280; const h = c.canvas.height = 130;
    drawLineChart(c, w, h, [
      {data:[18000,22000,19500,25000,28000,24000,28450], color:'#22c55e', fill:true},
      {data:[14000,17000,15000,20000,22000,19000,22350], color:'#3b82f6', fill:false},
    ], DAYS_SHORT);
  }
  const d = getCtx('fieldProgressDonut');
  if (d) { d.canvas.width = 90; d.canvas.height = 90; drawDonut(d, 90, 90, [{value:67,color:'#22c55e'},{value:33,color:'#1e2a38'}]); }
  const v = getCtx('villageCoverageDonut');
  if (v) { v.canvas.width = 80; v.canvas.height = 80; drawDonut(v, 80, 80, [{value:76,color:'#22c55e'},{value:17,color:'#f97316'},{value:7,color:'#ef4444'}]); }
  const r = getCtx('retailerActivityDonut');
  if (r) { r.canvas.width = 80; r.canvas.height = 80; drawDonut(r, 80, 80, [{value:68,color:'#22c55e'},{value:20,color:'#eab308'},{value:11,color:'#ef4444'}]); }
}

function drawStateCharts() {
  const c = getCtx('stateActivationChart');
  if (!c) return;
  const w = c.canvas.width = c.canvas.offsetWidth || 260; const h = c.canvas.height = 110;
  drawLineChart(c, w, h, [
    {data:[4100,4200,4350,4450,4550,4650,4750,4800,4892], color:'#22c55e', fill:true},
    {data:[52,54,55,57,58,60,61,62,63], color:'#3b82f6', fill:false},
  ], ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep']);
}

function drawTerritoryCharts() {
  const c = getCtx('territoryTrendChart');
  if (c) {
    const w = c.canvas.width = c.canvas.offsetWidth || 260; const h = c.canvas.height = 100;
    drawLineChart(c, w, h, [
      {data:[2.8,3.0,2.9,3.2,3.5,3.4,3.7,3.8,3.84], color:'#22c55e', fill:true},
    ], ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep']);
  }
  const v = getCtx('territoryVillageDonut');
  if (v) { v.canvas.width = 80; v.canvas.height = 80; drawDonut(v, 80, 80, [{value:78,color:'#22c55e'},{value:13,color:'#eab308'},{value:9,color:'#ef4444'}]); }
  const r = getCtx('retailerHealthDonut');
  if (r) { r.canvas.width = 80; r.canvas.height = 80; drawDonut(r, 80, 80, [{value:72,color:'#3b82f6'},{value:16,color:'#eab308'},{value:12,color:'#ef4444'}]); }
}

function drawVerifiedCharts() {
  const c = getCtx('verifiedTrendChart');
  if (c) {
    const w = c.canvas.width = c.canvas.offsetWidth || 400; const h = c.canvas.height = 150;
    drawLineChart(c, w, h, [
      {data:[72,75,74,78,80,82,84,86,88,90,95,98.73], color:'#22c55e', fill:true},
      {data:[48,50,49,52,54,56,55,57,57,58,58,57.75], color:'#f97316', fill:false},
      {data:[55,58,56,59,60,61,62,63,63,64,64,63], color:'#3b82f6', fill:false},
    ], MONTHS_SHORT);
  }
  const d = getCtx('verifiedStatusDonut');
  if (d) { d.canvas.width = 110; d.canvas.height = 110; drawDonut(d, 110, 110, [{value:63,color:'#22c55e'},{value:37,color:'#f97316'}]); }
  const r = getCtx('roiBridgeChart');
  if (r) {
    const w = r.canvas.width = r.canvas.offsetWidth || 260; const h = r.canvas.height = 140;
    drawBarChart(r, w, h, [
      {value:100,color:'#22c55e'},{value:171,color:'#3b82f6'},{value:220,color:'#a855f7'},
      {value:280,color:'#f97316'},{value:374,color:'#22c55e'},
    ], ['Base','Verif.','Loyalty','Repeat','Total ROI']);
  }
}

// ===== START =====
document.addEventListener('DOMContentLoaded', init);
