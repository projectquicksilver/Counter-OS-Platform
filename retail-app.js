'use strict';
// CounterOS — Retail Intelligence Sub-Platform
let riCurrentScreen = 'ri-overview';
let riChartInstances = {};

// ===== CHART.JS WRAPPERS =====
function riDestroyChart(id){ if(riChartInstances[id]){ riChartInstances[id].destroy(); delete riChartInstances[id]; } }
function riLineChart(id, labels, datasets, opts={}){
  riDestroyChart(id);
  const el = document.getElementById(id); if(!el) return;
  riChartInstances[id] = new Chart(el.getContext('2d'), {
    type:'line', data:{labels, datasets:datasets.map(d=>({...d,tension:0.4,pointRadius:3,pointHoverRadius:5,pointBackgroundColor:d.borderColor,borderWidth:2,fill:d.fill||false}))},
    options:{responsive:true,maintainAspectRatio:false,interaction:{mode:'index',intersect:false},
      plugins:{legend:{display:opts.legend||false,labels:{color:'#94A3B8',font:{size:11},boxWidth:10,padding:12}},
        tooltip:{backgroundColor:'#0B1220',borderColor:'#1E293B',borderWidth:1,titleColor:'#F8FAFC',bodyColor:'#94A3B8',padding:10,cornerRadius:6}},
      scales:{x:{grid:{color:'rgba(30,41,59,0.5)'},ticks:{color:'#475569',font:{size:10}},border:{display:false}},
        y:{grid:{color:'rgba(30,41,59,0.5)'},ticks:{color:'#475569',font:{size:10},...(opts.yFormat?{callback:opts.yFormat}:{})},border:{display:false}},...(opts.extra?.scales||{})}}});
}
function riBarChart(id, labels, datasets, opts={}){
  riDestroyChart(id);
  const el = document.getElementById(id); if(!el) return;
  riChartInstances[id] = new Chart(el.getContext('2d'), {
    type:'bar', data:{labels, datasets:datasets.map(d=>({...d,borderRadius:4,borderSkipped:false}))},
    options:{responsive:true,maintainAspectRatio:false,interaction:{mode:'index',intersect:false},
      plugins:{legend:{display:opts.legend||false,labels:{color:'#94A3B8',font:{size:11},boxWidth:10}},
        tooltip:{backgroundColor:'#0B1220',borderColor:'#1E293B',borderWidth:1,titleColor:'#F8FAFC',bodyColor:'#94A3B8',padding:10,cornerRadius:6}},
      scales:{x:{grid:{display:false},ticks:{color:'#475569',font:{size:10}},border:{display:false}},
        y:{grid:{color:'rgba(30,41,59,0.5)'},ticks:{color:'#475569',font:{size:10},...(opts.yFormat?{callback:opts.yFormat}:{})},border:{display:false}}}}});
}
function riDoughnutChart(id, labels, data, colors, opts={}){
  riDestroyChart(id);
  const el = document.getElementById(id); if(!el) return;
  riChartInstances[id] = new Chart(el.getContext('2d'), {
    type:'doughnut', data:{labels, datasets:[{data, backgroundColor:colors, borderColor:'transparent', borderWidth:0, hoverOffset:4}]},
    options:{responsive:true,maintainAspectRatio:false,cutout:'70%',
      plugins:{legend:{display:opts.legend||false,position:'right',labels:{color:'#94A3B8',font:{size:10},boxWidth:8,padding:8}},
        tooltip:{backgroundColor:'#0B1220',borderColor:'#1E293B',borderWidth:1,titleColor:'#F8FAFC',bodyColor:'#94A3B8',padding:10,cornerRadius:6}}}});
}

// ===== NAVIGATION =====
function riNavigate(screenId){
  Object.keys(riChartInstances).forEach(riDestroyChart);
  riCurrentScreen = screenId;
  document.querySelectorAll('.ri-nav-item').forEach(el => {
    el.classList.toggle('ri-nav-active', el.dataset.screen === screenId);
  });
  const content = document.getElementById('riMainContent');
  const builders = {
    'ri-overview':  buildRIOverview,
    'ri-segments':  buildRISegments,
    'ri-profiles':  buildRIProfiles,
    'ri-sku':       buildRISKU,
    'ri-geo':       buildRIGeo,
    'ri-trust':     buildRITrustScore,
    'ri-behavior':  buildRIBehavior,
    'ri-fraud':     buildRIFraud,
    'ri-settings':  buildRISettings,
  };
  content.innerHTML = (builders[screenId] || buildRIPlaceholder)(screenId);
  setTimeout(()=>drawRICharts(screenId), 80);
}

function drawRICharts(screenId){
  switch(screenId){
    case 'ri-overview':  drawOverviewCharts(); break;
    case 'ri-profiles':  drawProfileCharts(); break;
    case 'ri-sku':       drawSKUCharts(); break;
    case 'ri-geo':       drawGeoCharts(); break;
    case 'ri-behavior':  drawBehaviorCharts(); break;
    case 'ri-trust':     drawTrustCharts(); break;
    case 'ri-fraud':     drawFraudCharts(); break;
  }
}

function exitToMainDashboard(){
  // Hide RI platform, show main app
  const ri = document.getElementById('riPlatformContainer') || document.getElementById('riPlatform');
  if(ri) ri.style.display = 'none';
  const main = document.getElementById('mainAppWrapper');
  if(main) main.style.display = 'flex';
  // Sync theme
  riSyncTheme();
  // Navigate back to whichever main screen
  if(window.navigate) navigate(DATA.roles[currentRole].defaultScreen);
}

// Sync theme: read the main app's theme and apply/remove dark on RI platform
function riSyncTheme(){
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark'
    || document.body.classList.contains('dark')
    || !document.body.classList.contains('light');
  const ri = document.getElementById('riPlatformContainer');
  if(!ri) return;
  if(isDark){
    ri.setAttribute('data-theme','dark');
    ri.style.setProperty('--ri-bg','#050816');
    ri.style.setProperty('--ri-surface','#0B1220');
    ri.style.setProperty('--ri-border','#1E293B');
    ri.style.setProperty('--ri-text','#F8FAFC');
    ri.style.setProperty('--ri-muted','#64748B');
    ri.style.setProperty('--ri-sidebar','#070b19');
  } else {
    ri.setAttribute('data-theme','light');
    ri.style.setProperty('--ri-bg','#F1F5F9');
    ri.style.setProperty('--ri-surface','#FFFFFF');
    ri.style.setProperty('--ri-border','#E2E8F0');
    ri.style.setProperty('--ri-text','#0F172A');
    ri.style.setProperty('--ri-muted','#64748B');
    ri.style.setProperty('--ri-sidebar','#FFFFFF');
  }
}

// ===== RI SHELL (sidebar + layout) =====
function buildRIShell(){
  const navItems = [
    { section: 'RETAIL INTELLIGENCE', items: [
      { id:'ri-overview', label:'Overview', icon:'fa-chart-pie' },
      { id:'ri-segments', label:'Retailer Segments', icon:'fa-layer-group' },
      { id:'ri-profiles', label:'Retailer Profiles', icon:'fa-users' },
      { id:'ri-sku', label:'SKU Intelligence', icon:'fa-box-open' },
      { id:'ri-geo', label:'Geo Coverage', icon:'fa-map-location-dot' },
      { id:'ri-trust', label:'Retailer Trust Score', icon:'fa-chart-simple' },
      { id:'ri-behavior', label:'Behavior Analytics', icon:'fa-brain' },
      { id:'ri-fraud', label:'Fraud & Verification', icon:'fa-shield-halved' },
    ]},
    { section: 'SALES & REWARDS', items: [
      { id:'ri-sales-overview', label:'Overview', icon:'fa-file-lines' },
      { id:'ri-sales-perf', label:'Sales Performance', icon:'fa-chart-column' },
      { id:'ri-incentive', label:'Incentive Programs', icon:'fa-gift' },
      { id:'ri-loyalty', label:'Loyalty & Points', icon:'fa-star' },
      { id:'ri-leaderboard', label:'Leaderboards', icon:'fa-trophy' },
      { id:'ri-roi', label:'ROI Simulator', icon:'fa-calculator' },
    ]},
    { section: 'RISK & TRUST', items: [
      { id:'ri-alerts', label:'Alerts', icon:'fa-bell', badge:'12', badgeColor:'red' },
      { id:'ri-approvals', label:'Approvals', icon:'fa-check-double', badge:'5', badgeColor:'green' },
    ]},
    { section: 'SETTINGS', items: [
      { id:'ri-settings', label:'Settings', icon:'fa-cog' },
      { id:'ri-users', label:'Users & Roles', icon:'fa-users-cog' },
      { id:'ri-prefs', label:'Preferences', icon:'fa-cog' },
    ]},
  ];

  const navHTML = navItems.map(section => `
    <div class="ri-nav-section">
      <div class="ri-nav-section-label">${section.section}</div>
      ${section.items.map(item => `
        <a class="ri-nav-item${item.id===riCurrentScreen?' ri-nav-active':''}" data-screen="${item.id}" onclick="riNavigate('${item.id}');return false;" href="#">
          <i class="fas ${item.icon} ri-nav-icon"></i>
          <span class="ri-nav-label">${item.label}</span>
          ${item.badge ? `<span class="ri-nav-badge" style="background:${item.badgeColor==='red'?'rgba(239,68,68,0.2)':'rgba(16,185,129,0.2)'};color:${item.badgeColor==='red'?'#EF4444':'#10B981'}">${item.badge}</span>` : ''}
        </a>`).join('')}
    </div>`).join('');

  return `
  <div id="riPlatform" style="display:flex;height:100vh;width:100%;overflow:hidden;background:#050816;color:#F8FAFC;font-family:'DM Sans','Plus Jakarta Sans',sans-serif;">
    <!-- SIDEBAR -->
    <aside class="ri-sidebar">
      <!-- Branding -->
      <div class="ri-brand">
        <div class="ri-brand-icon"><i class="fas fa-chart-pie"></i></div>
        <div>
          <div class="ri-brand-name">CounterOS</div>
          <div class="ri-brand-sub">HAR SCAN PE INAAM</div>
        </div>
      </div>
      <!-- Company -->
      <div class="ri-company-selector">
        <div class="ri-company-badge">GA</div>
        <span class="ri-company-name">Godrej Agrovet Ltd.</span>
        <i class="fas fa-chevron-down" style="font-size:10px;color:#64748B;margin-left:auto;"></i>
      </div>
      <!-- Nav -->
      <nav class="ri-nav">${navHTML}</nav>
      <!-- User Footer -->
      <div class="ri-user-footer">
        <div class="ri-user-avatar">AV</div>
        <div class="ri-user-info">
          <div class="ri-user-name">Ankit Verma</div>
          <div class="ri-user-role">Super Admin</div>
        </div>
        <button class="ri-home-btn" onclick="exitToMainDashboard()" title="Back to Main Dashboard">
          <i class="fas fa-home"></i>
        </button>
      </div>
    </aside>
    <!-- MAIN -->
    <main class="ri-main" id="riMainContent"></main>
  </div>`;
}

// ===== TAB HELPER =====
function riTabs(tabs, active, prefix){
  return `<div class="ri-tabs">${tabs.map((t,i)=>`<button class="ri-tab${i===active?' ri-tab-active':''}" onclick="riSwitchTab(this,'${prefix}',${i})">${t}</button>`).join('')}</div>`;
}
function riSwitchTab(btn, prefix, idx){
  btn.closest('.ri-tabs').querySelectorAll('.ri-tab').forEach((b,i) => b.classList.toggle('ri-tab-active', i===idx));
  document.querySelectorAll(`[data-ri-tab-panel="${prefix}"]`).forEach((p,i) => p.style.display = i===idx ? '' : 'none');
}

// ===== KPI ROW HELPER =====
function riKPICard(k){
  const colors = {green:'#10B981', blue:'#3B82F6', purple:'#8B5CF6', yellow:'#F59E0B', red:'#EF4444', cyan:'#06B6D4', orange:'#F97316'};
  const c = colors[k.color] || '#10B981';
  return `<div class="ri-kpi-card">
    <div class="ri-kpi-top">
      <div class="ri-kpi-icon" style="background:${c}20;color:${c};"><i class="fas ${k.icon||'fa-chart-bar'}"></i></div>
      <span class="ri-kpi-label">${k.label}</span>
    </div>
    <div class="ri-kpi-value">${k.value}</div>
    ${k.change ? `<div class="ri-kpi-change" style="color:${k.up===false?'#EF4444':'#10B981'}">
      <i class="fas fa-caret-${k.up===false?'down':'up'}"></i> ${k.change}${k.sub ? ` <span style="color:#64748B">${k.sub}</span>` : ''}
    </div>` : (k.sub ? `<div style="font-size:10px;color:#64748B;margin-top:3px;">${k.sub}</div>` : '')}
  </div>`;
}

// ===== PAGE HEADER =====
function riPageHeader(title, sub, breadcrumb, actions=''){
  return `<div class="ri-page-header">
    <div>
      <div class="ri-breadcrumb">Retail Intelligence ${breadcrumb?`<i class="fas fa-chevron-right" style="font-size:9px;"></i> ${breadcrumb}`:''}</div>
      <h1 class="ri-page-title">${title}</h1>
      <p class="ri-page-sub">${sub}</p>
    </div>
    <div class="ri-header-actions">
      <button class="ri-btn ri-btn-ghost"><i class="far fa-calendar-alt"></i> 18 May 2025 – 24 May 2025 <i class="fas fa-chevron-down" style="font-size:9px;"></i></button>
      <button class="ri-btn ri-btn-ghost"><i class="fas fa-filter"></i> Filters</button>
      <button class="ri-btn ri-btn-outline"><i class="fas fa-download"></i> Export</button>
      ${actions}
    </div>
  </div>`;
}

// =====================
// SCREEN: OVERVIEW
// =====================
function buildRIOverview(){
  const d = RI_DATA.overview;
  return `<div class="ri-screen">
    ${riPageHeader('Retail Intelligence – Overview','Real-time intelligence across India\'s retail network','')}
    <div class="ri-kpi-row" style="grid-template-columns:repeat(6,1fr);">${d.kpis.map(riKPICard).join('')}</div>
    <div class="ri-grid-2-1" style="height:360px;">
      <!-- Heatmap Card -->
      <div class="ri-card" style="position:relative;overflow:hidden;">
        <div class="ri-card-header">
          <span class="ri-card-title">Retailer Activity Heatmap (India) <i class="fas fa-info-circle" style="font-size:10px;color:#64748B;"></i></span>
          <button class="ri-btn-xs ri-btn-ghost">Activity % <i class="fas fa-chevron-down" style="font-size:9px;"></i></button>
        </div>
        <div style="flex:1;position:relative;border-radius:8px;overflow:hidden;min-height:0;">
          <div id="riActivityMapEl" style="width:100%;height:100%;min-height:240px;border-radius:8px;"></div>
          <!-- Legend overlay -->
          <div style="position:absolute;left:8px;top:8px;background:rgba(5,8,22,0.88);border:1px solid #1E293B;border-radius:6px;padding:8px 10px;font-size:10px;z-index:1000;pointer-events:none;">
            ${[['#10B981','Very High','> 70%'],['#34D399','High','50-70%'],['#F59E0B','Medium','30-50%'],['#F97316','Low','10-30%'],['#EF4444','Very Low','< 10%']].map(([c,l,s])=>`<div style="display:flex;align-items:center;gap:6px;margin-bottom:5px;"><div style="width:8px;height:8px;border-radius:50%;background:${c};"></div><div><div>${l}</div><div style="color:#64748B;">${s}</div></div></div>`).join('')}
            <div style="display:flex;align-items:center;gap:6px;"><div style="width:8px;height:8px;border-radius:50%;background:#374151;"></div><div style="color:#64748B;">No Data</div></div>
          </div>
        </div>
      </div>
      <!-- AI Insights -->
      <div class="ri-card">
        <div class="ri-card-header">
          <span class="ri-card-title" style="color:#F59E0B;"><i class="fas fa-magic"></i> AI Insights</span>
          <a href="#" style="font-size:10px;color:#10B981;">View All Insights →</a>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;overflow-y:auto;flex:1;">
          ${d.aiInsights.map(ins=>{
            const colors = {green:'#10B981',orange:'#F97316',blue:'#3B82F6',purple:'#8B5CF6'};
            const c = colors[ins.color];
            const tagColors = {Growth:'#10B981',['At Risk']:'#F97316',Review:'#3B82F6',Action:'#8B5CF6'};
            const tc = tagColors[ins.tag]||'#10B981';
            return `<div style="display:flex;align-items:flex-start;gap:8px;padding:8px;border-radius:6px;border:1px solid transparent;cursor:pointer;transition:background 0.15s;" onmouseenter="this.style.background='rgba(255,255,255,0.03)'" onmouseleave="this.style.background='transparent'">
              <div style="width:26px;height:26px;border-radius:50%;background:${c}20;color:${c};display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:10px;"><i class="fas ${ins.icon}"></i></div>
              <div style="flex:1;"><div style="font-size:11.5px;color:#F8FAFC;margin-bottom:2px;">${ins.title}</div><div style="font-size:10px;color:#64748B;">${ins.sub}</div></div>
              <span style="font-size:10px;padding:2px 7px;border-radius:4px;background:${tc}15;color:${tc};white-space:nowrap;flex-shrink:0;">${ins.tag}</span>
            </div>`;
          }).join('')}
        </div>
        <div style="margin-top:auto;">
          <div class="ri-card-header" style="margin-top:12px;"><span class="ri-card-title">Top Opportunity Zones</span><a href="#" style="font-size:10px;color:#10B981;">View All →</a></div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">
            ${d.opportunityZones.map(z=>{
              const scoreColors = {green:'#10B981',blue:'#3B82F6',yellow:'#F59E0B',red:'#EF4444'};
              const sc = scoreColors[z.color];
              return `<div style="background:#0F172A;border:1px solid #1E293B;border-radius:6px;padding:8px;">
                <div style="font-size:10px;color:#64748B;margin-bottom:4px;"><i class="fas fa-map-marker-alt" style="color:${sc};margin-right:3px;"></i>${z.region}</div>
                <div style="font-size:18px;font-weight:700;color:${sc};">${z.score}</div>
                <div style="font-size:9px;color:#64748B;margin-top:2px;">${z.label.replace('\n','<br>')}</div>
              </div>`;}).join('')}
          </div>
        </div>
      </div>
    </div>
    <!-- Charts Row -->
    <div class="ri-grid-3">
      <!-- Activity Distribution Bar Chart -->
      <div class="ri-card">
        <div class="ri-card-header"><span class="ri-card-title">Retailer Activity Distribution <i class="fas fa-info-circle" style="font-size:10px;color:#64748B;"></i></span><span style="font-size:10px;color:#64748B;">By Sales Volume</span></div>
        <div style="height:160px;"><canvas id="riActivityChart"></canvas></div>
        <div style="display:flex;justify-content:space-around;margin-top:8px;">
          ${d.activityDistribution.map(a=>`<div style="text-align:center;"><div style="font-size:9px;color:#64748B;line-height:1.2;">${a.label}</div><div style="font-size:9px;color:#64748B;">${a.sublabel}</div><div style="font-size:10px;font-weight:600;color:#F8FAFC;margin-top:2px;">${a.count}</div></div>`).join('')}
        </div>
        <div style="font-size:9px;color:#64748B;margin-top:6px;">Distribution based on last 30 days sales</div>
      </div>
      <!-- Top Product Growth -->
      <div class="ri-card">
        <div class="ri-card-header"><span class="ri-card-title">Top Product Growth <i class="fas fa-info-circle" style="font-size:10px;color:#64748B;"></i></span><a href="#" style="font-size:10px;color:#10B981;">View All →</a></div>
        <table class="ri-table">
          <thead><tr><th>#</th><th>Product</th><th style="text-align:right;">Growth</th><th style="text-align:right;">Sales</th></tr></thead>
          <tbody>
            ${d.topProducts.map(p=>`<tr><td style="color:#64748B;">${p.rank}</td><td>${p.name}</td><td style="text-align:right;color:#10B981;"><i class="fas fa-arrow-up" style="font-size:9px;"></i> ${p.growth}</td><td style="text-align:right;font-weight:600;">${p.sales}</td></tr>`).join('')}
          </tbody>
        </table>
        <div style="text-align:center;margin-top:10px;"><a href="#" style="font-size:11px;color:#10B981;">View All Products →</a></div>
      </div>
      <!-- Sales Trend -->
      <div class="ri-card">
        <div class="ri-card-header"><span class="ri-card-title">Sales Trend (Last 6 Weeks) <i class="fas fa-info-circle" style="font-size:10px;color:#64748B;"></i></span><span style="font-size:10px;color:#64748B;">Sales (₹)</span></div>
        <div style="height:160px;"><canvas id="riSalesTrendChart"></canvas></div>
        <div style="font-size:10px;color:#10B981;margin-top:8px;display:flex;align-items:center;gap:4px;"><i class="fas fa-arrow-up"></i> 24% growth vs previous 6 weeks</div>
      </div>
    </div>
    <!-- Bottom Row -->
    <div class="ri-grid-4" style="padding-bottom:16px;">
      ${d.microMetrics.map(m=>{
        const colors={yellow:'#F59E0B',green:'#10B981',blue:'#3B82F6'};
        const c=colors[m.color];
        return `<div class="ri-card ri-micro-card"><div class="ri-micro-icon" style="background:${c}20;color:${c};"><i class="fas ${m.icon}"></i></div><div><div style="font-size:10px;color:#64748B;margin-bottom:2px;">${m.label}</div><div style="font-size:12px;font-weight:600;">${m.name}</div><div style="font-size:10px;color:#64748B;">${m.sub}</div><div style="font-size:10px;color:#64748B;margin-top:3px;">${m.extra}</div></div></div>`;}).join('')}
      <div class="ri-card" style="padding:10px;">
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;height:100%;">
          ${d.liveMetrics.map(lm=>{
            const colors={green:'#10B981',cyan:'#06B6D4'};
            const c=colors[lm.color]||'#10B981';
            return `<div style="background:#0F172A;border:1px solid #1E293B;border-radius:6px;padding:8px;display:flex;flex-direction:column;justify-content:center;">
              <div style="font-size:9px;color:#64748B;margin-bottom:4px;display:flex;align-items:center;gap:4px;"><i class="fas ${lm.icon}" style="color:${c};"></i>${lm.label}</div>
              <div style="font-size:14px;font-weight:700;">${lm.value}</div>
              <div style="font-size:9px;color:#10B981;margin-top:3px;"><i class="fas fa-caret-up"></i> ${lm.change}</div>
            </div>`;}).join('')}
        </div>
      </div>
    </div>
  </div>`;
}

function drawOverviewCharts(){
  const d = RI_DATA.overview;
  riBarChart('riActivityChart', d.activityDistribution.map(a=>a.label.split(' ')[0]), [{
    data: d.activityDistribution.map(a=>a.pct),
    backgroundColor: d.activityDistribution.map(a=>a.color+'BB'),
    borderColor: d.activityDistribution.map(a=>a.color),
    borderWidth: 1
  }], {yFormat: v=>v+'%'});
  riLineChart('riSalesTrendChart', d.salesTrend.map(s=>s.week), [{
    label:'Sales (₹ Cr)', data: d.salesTrend.map(s=>s.sales), borderColor:'#10B981',
    fill:{target:'origin',above:'rgba(16,185,129,0.12)'}
  }], {yFormat: v=>'₹'+v+'Cr'});
  // Leaflet activity heatmap
  riInitActivityMap('riActivityMapEl');
}

// =====================
// SCREEN: SEGMENTS
// =====================
function buildRISegments(){
  const d = RI_DATA.segments;
  const tierColors = {star:'#F59E0B',gold:'#F97316',growth:'#10B981',atRisk:'#EF4444',churned:'#EF4444',highCredit:'#8B5CF6'};
  return `<div class="ri-screen">
    ${riPageHeader('Retailer Segments','Segment your retail network and take intelligent actions','Retailer Segments','<button class="ri-btn ri-btn-primary"><i class="fas fa-download"></i> Export</button>')}
    <!-- Segment Summary Cards -->
    <div class="ri-kpi-row" style="grid-template-columns:repeat(6,1fr);">
      ${d.summary.map(s=>{
        const c = tierColors[s.id]||'#10B981';
        const pct = s.pct.replace('% of total','').replace('Total Exposure','').trim();
        return `<div class="ri-card ri-segment-card" onclick="riFilterSegment('${s.id}')" style="cursor:pointer;border-bottom:3px solid ${c}20;">
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;">
            <i class="fas ${s.icon}" style="color:${c};font-size:13px;"></i>
            <span style="font-size:10px;color:#64748B;">${s.label}</span>
          </div>
          <div style="font-size:20px;font-weight:700;color:${c};">${s.count}</div>
          <div style="font-size:9px;color:#64748B;margin-top:2px;">${s.pct}</div>
          <div style="margin-top:8px;background:#1E293B;border-radius:100px;height:3px;"><div style="background:${c};border-radius:100px;height:3px;width:${s.sales.replace('%','').replace('Risk','20')}%;"></div></div>
          <div style="font-size:9px;color:#64748B;margin-top:3px;">Sales Contribution: ${s.sales}</div>
        </div>`;}).join('')}
    </div>
    <!-- Table + Snapshot Panel -->
    <div style="display:grid;grid-template-columns:1fr 340px;gap:12px;flex:1;min-height:0;">
      <div class="ri-card" style="display:flex;flex-direction:column;">
        <!-- Segment Tabs -->
        <div style="display:flex;gap:0;border-bottom:1px solid #1E293B;margin-bottom:12px;flex-shrink:0;">
          ${['All Retailers','Star','Gold','Growth','At Risk','Churned','High Credit'].map((t,i)=>`<button class="ri-seg-tab${i===0?' ri-seg-tab-active':''}" onclick="riSegTab(this,${i})">${t}</button>`).join('')}
        </div>
        <!-- Search + Filters -->
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;flex-shrink:0;">
          <div style="flex:1;position:relative;"><i class="fas fa-search" style="position:absolute;left:10px;top:50%;transform:translateY(-50%);color:#64748B;font-size:11px;"></i><input type="text" placeholder="Search retailer name, code, owner..." style="width:100%;background:#0F172A;border:1px solid #1E293B;color:#F8FAFC;font-size:11px;padding:7px 10px 7px 30px;border-radius:6px;outline:none;"/></div>
          <button class="ri-btn ri-btn-ghost" style="font-size:11px;"><i class="fas fa-filter"></i> Advanced Filters</button>
          <button class="ri-btn ri-btn-ghost" style="font-size:11px;"><i class="fas fa-table-columns"></i> Columns</button>
        </div>
        <!-- Table -->
        <div style="flex:1;overflow-y:auto;">
          <table class="ri-table" style="width:100%;">
            <thead><tr><th style="width:30px;"><input type="checkbox"/></th><th>Retailer</th><th>Location</th><th>Tier</th><th style="text-align:right;">Total Sales (MTD)</th><th style="text-align:right;">Growth vs Last Mon</th></tr></thead>
            <tbody id="riSegmentsTable">
              ${d.retailers.map(r=>{
                const tc = tierColors[r.tierId]||'#10B981';
                return `<tr class="ri-table-row" onclick="riShowSnapshot('${r.id}')" style="cursor:pointer;${r.id==='R001245'?'background:rgba(16,185,129,0.05);border-left:2px solid #10B981;':''}">
                  <td><input type="checkbox" ${r.id==='R001245'?'checked':''}/></td>
                  <td><div style="display:flex;align-items:center;gap:8px;">
                    <div style="width:32px;height:32px;border-radius:50%;background:${r.color}25;color:${r.color};font-weight:700;font-size:11px;display:flex;align-items:center;justify-content:center;">${r.avatar}</div>
                    <div><div style="font-weight:500;font-size:12px;">${r.name}</div><div style="font-size:10px;color:#64748B;">${r.id} · ${r.owner}</div></div>
                  </div></td>
                  <td><div style="font-size:11px;">${r.location}</div><div style="font-size:10px;color:#64748B;">${r.state}</div></td>
                  <td><span style="background:${tc}15;color:${tc};border:1px solid ${tc}30;font-size:10px;padding:2px 8px;border-radius:4px;font-weight:500;">${r.tier}</span></td>
                  <td style="text-align:right;font-weight:600;font-size:12px;">${r.sales}</td>
                  <td style="text-align:right;color:${r.up?'#10B981':'#EF4444'};font-size:12px;"><i class="fas fa-caret-${r.up?'up':'down'}"></i> ${r.growth}</td>
                </tr>`;}).join('')}
            </tbody>
          </table>
        </div>
        <div style="padding-top:10px;border-top:1px solid #1E293B;display:flex;align-items:center;justify-content:space-between;font-size:11px;color:#64748B;flex-shrink:0;">
          <span>Showing 1 to 25 of 24,532 retailers</span>
          <div style="display:flex;align-items:center;gap:4px;">
            <button class="ri-btn ri-btn-ghost" style="font-size:10px;padding:3px 8px;">← Prev</button>
            <button class="ri-btn ri-btn-ghost" style="font-size:10px;padding:3px 8px;background:rgba(16,185,129,0.1);color:#10B981;">1</button>
            <button class="ri-btn ri-btn-ghost" style="font-size:10px;padding:3px 8px;">2</button>
            <button class="ri-btn ri-btn-ghost" style="font-size:10px;padding:3px 8px;">3</button>
            <span>... 982</span>
            <button class="ri-btn ri-btn-ghost" style="font-size:10px;padding:3px 8px;">Next →</button>
          </div>
        </div>
      </div>
      <!-- Snapshot Panel -->
      <div class="ri-card" id="riSnapshotPanel" style="display:flex;flex-direction:column;">
        ${buildRetailerSnapshot(d.snapshot)}
      </div>
    </div>
  </div>`;
}

function buildRetailerSnapshot(s){
  return `<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;flex-shrink:0;">
    <span style="font-weight:600;font-size:13px;">Retailer Snapshot</span>
    <button style="background:none;border:none;color:#64748B;cursor:pointer;font-size:12px;">✕</button>
  </div>
  <div style="text-align:center;margin-bottom:14px;flex-shrink:0;">
    <div style="width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,#10B981,#059669);margin:0 auto 8px;display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:700;color:#fff;">MD</div>
    <div style="font-weight:700;font-size:14px;">${s.name}</div>
    <div style="font-size:11px;color:#64748B;">${s.code}</div>
    <div style="font-size:10px;color:#64748B;"><i class="fas fa-map-marker-alt"></i> ${s.location}</div>
    <div style="display:flex;gap:4px;justify-content:center;flex-wrap:wrap;margin-top:6px;">
      ${s.tags.map(t=>`<span style="background:rgba(16,185,129,0.1);color:#10B981;border:1px solid rgba(16,185,129,0.2);font-size:9px;padding:2px 6px;border-radius:4px;">${t}</span>`).join('')}
    </div>
  </div>
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-bottom:14px;flex-shrink:0;">
    ${[['Health Score',s.healthScore,'#10B981'],['Risk Score',s.riskScore,'#EF4444'],['Trust Score',s.trustScore,'#3B82F6']].map(([l,v,c])=>`<div style="background:#0F172A;border-radius:6px;padding:8px;text-align:center;"><div style="font-size:10px;color:#64748B;margin-bottom:4px;">${l}</div><div style="font-size:17px;font-weight:700;color:${c};">${v}</div><div style="font-size:9px;color:#64748B;">/100</div></div>`).join('')}
  </div>
  <div style="border-top:1px solid #1E293B;padding-top:12px;margin-bottom:10px;flex-shrink:0;">
    <div style="font-size:10px;color:#64748B;font-weight:600;margin-bottom:8px;text-transform:uppercase;letter-spacing:0.05em;">PERFORMANCE (MTD)</div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;">
      ${[['Sales',s.mtd.sales,s.mtd.salesGrowth],['Orders',s.mtd.orders,s.mtd.ordersGrowth],['New Farmers',s.mtd.newFarmers,s.mtd.farmersGrowth]].map(([l,v,g])=>`<div style="background:#0F172A;border-radius:6px;padding:8px;"><div style="font-size:10px;color:#64748B;">${l}</div><div style="font-size:13px;font-weight:700;margin:3px 0;">${v}</div><div style="font-size:9px;color:#10B981;">${g}</div></div>`).join('')}
    </div>
  </div>
  <div style="margin-bottom:12px;flex-shrink:0;">
    <div style="font-size:10px;color:#64748B;font-weight:600;margin-bottom:8px;text-transform:uppercase;letter-spacing:0.05em;">TOP SELLING SKUs</div>
    ${s.topSKUs.map((sku,i)=>`<div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid #1E293B;"><span style="font-size:10px;color:#64748B;width:12px;">${i+1}</span><div style="flex:1;font-size:11px;">${sku.name}</div><span style="font-size:10px;color:#64748B;">${sku.qty}</span><span style="font-size:11px;font-weight:600;color:#10B981;">${sku.value}</span></div>`).join('')}
  </div>
  <div style="background:rgba(16,185,129,0.06);border:1px solid rgba(16,185,129,0.15);border-radius:8px;padding:12px;margin-top:auto;">
    <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;"><div style="width:24px;height:24px;background:rgba(16,185,129,0.15);border-radius:50%;display:flex;align-items:center;justify-content:center;"><i class="fas fa-star" style="color:#10B981;font-size:10px;"></i></div><div style="font-size:11px;font-weight:600;color:#10B981;">${s.action}</div></div>
    <div style="font-size:10px;color:#64748B;margin-bottom:10px;">${s.actionSub}</div>
    <button class="ri-btn ri-btn-primary" style="width:100%;">Take Action</button>
  </div>`;
}

function riShowSnapshot(id){ /* placeholder – full impl would swap panel content */ }
function riFilterSegment(id){}
function riSegTab(btn, idx){
  btn.closest('div').querySelectorAll('.ri-seg-tab').forEach((b,i)=>b.classList.toggle('ri-seg-tab-active',i===idx));
}

// =====================
// SCREEN: PROFILES
// =====================
function buildRIProfiles(){
  const d = RI_DATA.profiles.current;
  return `<div class="ri-screen">
    ${riPageHeader('Maa Durga Agro Centre','Retailer Profile & Performance Overview','Retailer Profiles › Maa Durga Agro Centre',
      '<button class="ri-btn ri-btn-ghost"><i class="fab fa-whatsapp" style="color:#25D366;"></i> Send WhatsApp</button><button class="ri-btn ri-btn-ghost"><i class="fas fa-calendar-check"></i> Schedule Visit</button><button class="ri-btn ri-btn-ghost"><i class="fas fa-ellipsis-v"></i> More Actions</button>')}
    <!-- Profile Header Card -->
    <div class="ri-card" style="flex-direction:row;align-items:flex-start;gap:20px;flex-shrink:0;">
      <div style="width:100px;height:100px;border-radius:10px;background:linear-gradient(135deg,#1a2f3a,#243447);border:1px solid #1E293B;display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:700;color:#10B981;flex-shrink:0;">MD</div>
      <div style="flex:1;">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
          <span style="font-size:18px;font-weight:700;">${d.name}</span>
          <i class="fas fa-circle-check" style="color:#10B981;font-size:14px;"></i>
        </div>
        <div style="font-size:12px;color:#64748B;margin-bottom:8px;">${d.code} · ${d.owner}</div>
        <div style="font-size:11px;color:#64748B;margin-bottom:10px;"><i class="fas fa-map-marker-alt" style="margin-right:4px;"></i>${d.location} · ${d.zone}</div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;">
          ${d.tags.map(t=>`<span style="${t.includes('Star')?'background:rgba(245,158,11,0.1);color:#F59E0B;border:1px solid rgba(245,158,11,0.2);':t.includes('High')?'background:rgba(16,185,129,0.1);color:#10B981;border:1px solid rgba(16,185,129,0.2);':'background:rgba(59,130,246,0.1);color:#3B82F6;border:1px solid rgba(59,130,246,0.2);'}font-size:10px;padding:3px 8px;border-radius:4px;">${t}</span>`).join('')}
        </div>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:14px;">
          ${[
            ['Trust Score', d.trustScore+'/100', d.trustLabel, '#10B981', 'fa-shield-alt'],
            ['Health Score', d.healthScore+'/100', d.healthLabel, '#10B981', 'fa-heart-pulse'],
            ['Risk Score', d.riskScore+'/100', d.riskLabel, '#EF4444', 'fa-triangle-exclamation'],
            ['Tier', d.tier, d.tierSince, '#F59E0B', 'fa-crown'],
          ].map(([l,v,sub,c,ic])=>`<div style="display:flex;align-items:center;gap:8px;background:#0F172A;border:1px solid #1E293B;border-radius:8px;padding:10px;">
            <i class="fas ${ic}" style="color:${c};font-size:14px;"></i>
            <div><div style="font-size:10px;color:#64748B;">${l}</div><div style="font-size:14px;font-weight:700;color:${c};">${v}</div><div style="font-size:9px;color:#64748B;">${sub}</div></div>
          </div>`).join('')}
        </div>
      </div>
      <!-- Quick Summary -->
      <div style="min-width:220px;border-left:1px solid #1E293B;padding-left:18px;flex-shrink:0;">
        <div style="font-size:11px;font-weight:600;margin-bottom:10px;display:flex;justify-content:space-between;"><span>Retailer Quick Summary</span><a href="#" style="font-size:10px;color:#10B981;">Edit Retailer</a></div>
        ${[
          ['Owner Name', d.contacts?'Rajesh Kumar':'—'],
          ['Mobile Number', d.contacts?.mobile||''],
          ['Alternate Number', d.contacts?.alt||''],
          ['GSTIN', d.contacts?.gstin||''],
          ['Shop Type', d.contacts?.shopType||''],
        ].map(([l,v])=>`<div style="display:flex;gap:8px;margin-bottom:6px;font-size:11px;"><span style="color:#64748B;min-width:90px;">${l}</span><span style="font-weight:500;">${v}</span></div>`).join('')}
        <div style="border-top:1px solid #1E293B;margin-top:10px;padding-top:10px;">
          ${[
            ['Total Sales (MTD)', d.quickSummary.totalSalesMTD, d.quickSummary.salesGrowth, 'green'],
            ['Total Purchases (MTD)', d.quickSummary.totalPurchasesMTD, d.quickSummary.purchaseGrowth, 'green'],
            ['Reward Earned (MTD)', d.quickSummary.rewardEarnedMTD, d.quickSummary.rewardGrowth, 'green'],
          ].map(([l,v,g,c])=>`<div style="margin-bottom:8px;"><div style="font-size:10px;color:#64748B;">${l}</div><div style="font-size:15px;font-weight:700;">${v}</div><div style="font-size:10px;color:#10B981;"><i class="fas fa-caret-up"></i> ${g}</div></div>`).join('')}
          <div style="display:flex;justify-content:space-between;font-size:10px;color:#64748B;margin-top:4px;"><span>Last Active</span><span style="color:#F8FAFC;">${d.quickSummary.lastActive}</span></div>
          <div style="display:flex;justify-content:space-between;font-size:10px;color:#64748B;margin-top:4px;"><span>Verification Status</span><span style="color:#10B981;"><i class="fas fa-check-circle"></i> ${d.quickSummary.verificationStatus}</span></div>
        </div>
      </div>
    </div>
    <!-- Tabs -->
    <div style="border-bottom:1px solid #1E293B;display:flex;gap:0;flex-shrink:0;">
      ${d.tabs.map((t,i)=>`<button class="ri-profile-tab${i===0?' ri-profile-tab-active':''}" onclick="riProfileTab(this,${i})">${t}</button>`).join('')}
    </div>
    <!-- Tab Content: Overview -->
    <div class="ri-grid-3" style="flex:1;min-height:0;">
      <div class="ri-card">
        <div class="ri-card-header"><span class="ri-card-title">Sales Trend</span><span style="font-size:10px;background:#1E293B;color:#94A3B8;padding:2px 8px;border-radius:4px;cursor:pointer;">MTD ▾</span></div>
        <div style="font-size:11px;color:#64748B;margin-bottom:4px;">Total Sales (MTD)</div>
        <div style="font-size:18px;font-weight:700;margin-bottom:2px;">₹ 28.74 L <span style="font-size:11px;color:#10B981;font-weight:400;"><i class="fas fa-caret-up"></i> 24.6% vs last month</span></div>
        <div style="height:120px;"><canvas id="riProfileSalesChart"></canvas></div>
      </div>
      <div class="ri-card">
        <div class="ri-card-header"><span class="ri-card-title">Purchase Trend</span><span style="font-size:10px;background:#1E293B;color:#94A3B8;padding:2px 8px;border-radius:4px;cursor:pointer;">MTD ▾</span></div>
        <div style="font-size:11px;color:#64748B;margin-bottom:4px;">Total Purchases (MTD)</div>
        <div style="font-size:18px;font-weight:700;margin-bottom:2px;">₹ 21.65 L <span style="font-size:11px;color:#10B981;font-weight:400;"><i class="fas fa-caret-up"></i> 18.3% vs last month</span></div>
        <div style="height:120px;"><canvas id="riProfilePurchaseChart"></canvas></div>
      </div>
      <div class="ri-card">
        <div class="ri-card-header"><span class="ri-card-title">Top Selling Categories (MTD)</span></div>
        <div style="display:flex;align-items:center;gap:12px;">
          <div style="position:relative;width:100px;height:100px;flex-shrink:0;"><canvas id="riProfileCategoryDonut"></canvas><div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;"><div style="font-size:10px;color:#64748B;">Total Sales</div><div style="font-size:12px;font-weight:700;">₹28.74 L</div></div></div>
          <div style="flex:1;">
            ${RI_DATA.profiles.current.topCategories.map(cat=>`<div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;"><div style="width:8px;height:8px;border-radius:50%;background:${cat.color};flex-shrink:0;"></div><div style="flex:1;font-size:11px;">${cat.name}</div><span style="font-size:10px;color:#64748B;">${cat.pct}%</span><span style="font-size:11px;font-weight:600;">${cat.value}</span></div>`).join('')}
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

function riProfileTab(btn, idx){
  btn.closest('div').querySelectorAll('.ri-profile-tab').forEach((b,i)=>b.classList.toggle('ri-profile-tab-active',i===idx));
}

// =====================
// SCREEN: SKU INTELLIGENCE
// =====================
function buildRISKU(){
  const d = RI_DATA.skuIntelligence;
  return `<div class="ri-screen">
    ${riPageHeader('SKU Intelligence','Deep product intelligence to drive better decisions','SKU Intelligence','<button class="ri-btn ri-btn-primary"><i class="fas fa-magic"></i> AI Assistant</button>')}
    <div class="ri-kpi-row" style="grid-template-columns:repeat(6,1fr);">${d.kpis.map(riKPICard).join('')}</div>
    <div style="border-bottom:1px solid #1E293B;display:flex;gap:0;flex-shrink:0;">
      ${d.tabs.map((t,i)=>`<button class="ri-profile-tab${i===0?' ri-profile-tab-active':''}" onclick="riProfileTab(this,${i})">${t}</button>`).join('')}
    </div>
    <div class="ri-grid-3">
      <!-- SKU Penetration Map -->
      <div class="ri-card">
        <div class="ri-card-header"><span class="ri-card-title">SKU Penetration by Territory</span><button class="ri-btn-xs ri-btn-ghost">Penetration % ▾</button></div>
        <div style="position:relative;border-radius:8px;overflow:hidden;height:200px;">
          <div id="riSKUMapEl" style="width:100%;height:100%;border-radius:8px;"></div>
          <!-- Legend -->
          <div style="position:absolute;left:6px;bottom:6px;background:rgba(5,8,22,0.88);border:1px solid #1E293B;border-radius:5px;padding:5px 8px;font-size:9px;z-index:1000;pointer-events:none;">
            ${[['#10B981','High','>60%'],['#34D399','Good','40-60%'],['#F59E0B','Medium','25-40%'],['#EF4444','Low','<25%']].map(([c,l,s])=>`<div style="display:flex;align-items:center;gap:5px;margin-bottom:3px;"><div style="width:7px;height:7px;border-radius:50%;background:${c};"></div><span style="color:#94A3B8;">${l}</span><span style="color:#475569;">${s}</span></div>`).join('')}
          </div>
        </div>
        <div style="margin-top:8px;">
          <div style="font-size:10px;color:#64748B;margin-bottom:6px;font-weight:600;">Top 5 States</div>
          ${[['Punjab','72.4%','green'],['Haryana','68.1%','green'],['Gujarat','61.3%','green'],['Maharashtra','55.6%','yellow'],['Karnataka','52.8%','yellow']].map(([s,p,c],i)=>`<div style="display:flex;align-items:center;gap:6px;padding:3px 0;"><span style="font-size:10px;color:#64748B;width:12px;">${i+1}</span><span style="flex:1;font-size:11px;">${s}</span><span style="font-size:11px;font-weight:600;color:${c==='green'?'#10B981':'#F59E0B'};">${p}</span></div>`).join('')}
        </div>
      </div>
      <!-- Top SKUs Table -->
      <div class="ri-card">
        <div class="ri-card-header"><span class="ri-card-title">Top SKUs by Penetration</span><button class="ri-btn-xs ri-btn-ghost">Penetration % ▾</button></div>
        <table class="ri-table" style="width:100%;">
          <thead><tr><th>#</th><th>SKU</th><th>Penetration</th><th>Retailers Covered</th></tr></thead>
          <tbody>
            ${d.topSKUs.map(s=>{
              const barColors = {green:'#10B981',yellow:'#F59E0B',orange:'#F97316'};
              const bc = barColors[s.color]||'#10B981';
              return `<tr><td style="color:#64748B;">${s.rank}</td><td style="font-size:11px;">${s.name}</td>
                <td><div style="display:flex;align-items:center;gap:6px;"><div style="flex:1;background:#1E293B;border-radius:100px;height:4px;min-width:50px;"><div style="background:${bc};height:4px;border-radius:100px;width:${s.penetrationPct}%;"></div></div><span style="font-size:10px;color:${bc};white-space:nowrap;">${s.penetration}</span></div></td>
                <td style="font-size:11px;">${s.retailers}</td></tr>`;}).join('')}
          </tbody>
        </table>
        <div style="text-align:center;margin-top:8px;"><a href="#" style="font-size:10px;color:#10B981;">View All SKUs →</a></div>
      </div>
      <!-- Penetration Trend Chart -->
      <div class="ri-card">
        <div class="ri-card-header"><span class="ri-card-title">Penetration Trend (Top 5 SKUs) <i class="fas fa-info-circle" style="font-size:10px;color:#64748B;"></i></span><span style="font-size:10px;background:#1E293B;color:#94A3B8;padding:2px 8px;border-radius:4px;">MTD</span></div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px;">
          ${d.penetrationTrend.skus.map(s=>`<span style="font-size:9px;display:flex;align-items:center;gap:4px;"><div style="width:8px;height:8px;border-radius:2px;background:${s.color};"></div>${s.name}</span>`).join('')}
        </div>
        <div style="flex:1;height:180px;"><canvas id="riSKUTrendChart"></canvas></div>
        <div style="text-align:center;margin-top:8px;"><a href="#" style="font-size:10px;color:#10B981;">View Full Report →</a></div>
      </div>
    </div>
    <!-- Bottom Row -->
    <div class="ri-grid-3" style="padding-bottom:16px;">
      <!-- Cross Sell Matrix -->
      <div class="ri-card">
        <div class="ri-card-header"><span class="ri-card-title">Cross-Sell Matrix (Top Associations) <i class="fas fa-info-circle" style="font-size:10px;color:#64748B;"></i></span></div>
        <div style="overflow-x:auto;">
          <table class="ri-table" style="font-size:10px;">
            <thead><tr><th style="white-space:nowrap;">Primary SKU \\ Bought With</th>${d.crossSell.skus.map(s=>`<th style="white-space:nowrap;">${s}</th>`).join('')}</tr></thead>
            <tbody>
              ${d.crossSell.skus.map((row,ri)=>`<tr><td style="font-weight:500;white-space:nowrap;">${row}</td>${d.crossSell.matrix[ri].map((val,ci)=>{
                if(val===null) return `<td style="text-align:center;color:#1E293B;">—</td>`;
                const pct = parseInt(val);
                const bg = pct>55?'rgba(16,185,129,0.2)':pct>35?'rgba(245,158,11,0.2)':'rgba(30,41,59,0.5)';
                const fc = pct>55?'#10B981':pct>35?'#F59E0B':'#64748B';
                return `<td style="text-align:center;background:${bg};color:${fc};font-weight:600;border-radius:4px;">${val}</td>`;
              }).join('')}</tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>
      <!-- Velocity -->
      <div class="ri-card">
        <div class="ri-card-header"><span class="ri-card-title">SKU Velocity Classification <i class="fas fa-info-circle" style="font-size:10px;color:#64748B;"></i></span></div>
        <div style="display:flex;align-items:center;gap:16px;flex:1;">
          <div style="position:relative;width:110px;height:110px;flex-shrink:0;"><canvas id="riVelocityDonut"></canvas><div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;"><div style="font-size:18px;font-weight:700;">312</div><div style="font-size:9px;color:#64748B;">Total SKUs</div></div></div>
          <div style="flex:1;">
            ${d.velocityDistribution.map(v=>`<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;"><div style="width:8px;height:8px;border-radius:50%;background:${v.color};flex-shrink:0;"></div><div style="flex:1;font-size:11px;">${v.label}</div><span style="font-size:10px;color:#64748B;">${v.count} (${v.pct}%)</span></div>`).join('')}
          </div>
        </div>
      </div>
      <!-- Dead Stock -->
      <div class="ri-card">
        <div class="ri-card-header"><span class="ri-card-title">Dead Stock Alerts <i class="fas fa-info-circle" style="font-size:10px;color:#64748B;"></i></span><a href="#" style="font-size:10px;color:#10B981;">View All Alerts →</a></div>
        <table class="ri-table" style="width:100%;">
          <thead><tr><th>SKU</th><th>Days Since Last Sale</th><th>Retailers Affected</th><th>Action</th></tr></thead>
          <tbody>
            ${d.deadStock.map(ds=>`<tr><td style="font-size:11px;">${ds.sku}</td><td style="color:#EF4444;font-size:11px;">> ${ds.daysSince} Days</td><td style="font-size:11px;">${ds.retailers}</td><td><button class="ri-btn ri-btn-outline" style="font-size:9px;padding:2px 8px;border-color:#EF4444;color:#EF4444;">${ds.action}</button></td></tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </div>`;
}

function drawProfileCharts(){
  const p = RI_DATA.profiles.current;
  const days = ['18 May','19 May','20 May','21 May','22 May','23 May','24 May'];
  riLineChart('riProfileSalesChart', days, [{
    label:'Sales (₹L)', data:p.salesTrend, borderColor:'#10B981',
    fill:{target:'origin',above:'rgba(16,185,129,0.08)'}
  }], {yFormat:v=>'₹'+v+'L'});
  riLineChart('riProfilePurchaseChart', days, [{
    label:'Purchase (₹L)', data:p.purchaseTrend, borderColor:'#3B82F6',
    fill:{target:'origin',above:'rgba(59,130,246,0.08)'}
  }], {yFormat:v=>'₹'+v+'L'});
  riDoughnutChart('riProfileCategoryDonut',
    p.topCategories.map(c=>c.name),
    p.topCategories.map(c=>c.pct),
    p.topCategories.map(c=>c.color)
  );
}

function drawSKUCharts(){
  const d = RI_DATA.skuIntelligence;
  riLineChart('riSKUTrendChart', d.penetrationTrend.labels,
    d.penetrationTrend.skus.map(s=>({label:s.name,data:s.data,borderColor:s.color,fill:false})),
    {legend:false, yFormat:v=>v+'%'});
  riDoughnutChart('riVelocityDonut',
    d.velocityDistribution.map(v=>v.label),
    d.velocityDistribution.map(v=>v.pct),
    d.velocityDistribution.map(v=>v.color));
  riInitSKUMap('riSKUMapEl');
}

// =====================
// SCREEN: GEO COVERAGE
// =====================
function buildRIGeo(){
  const d = RI_DATA.geoCoverage;
  return `<div class="ri-screen">
    ${riPageHeader('Geo Coverage','Map your reach, find white spaces and expand smarter','Geo Coverage','<button class="ri-btn ri-btn-primary"><i class="fas fa-magic"></i> AI Assistant</button>')}
    <div class="ri-kpi-row" style="grid-template-columns:repeat(6,1fr);">${d.kpis.map(riKPICard).join('')}</div>
    <div style="border-bottom:1px solid #1E293B;display:flex;gap:0;flex-shrink:0;">
      ${d.tabs.map((t,i)=>`<button class="ri-profile-tab${i===0?' ri-profile-tab-active':''}" onclick="riProfileTab(this,${i})">${t}</button>`).join('')}
    </div>
    <div class="ri-grid-3">
      <!-- Coverage Heatmap -->
      <div class="ri-card">
        <div class="ri-card-header"><span class="ri-card-title">Village Coverage Heatmap <i class="fas fa-info-circle" style="font-size:10px;color:#64748B;"></i></span><button class="ri-btn-xs ri-btn-ghost">Village Coverage % ▾</button></div>
        <div style="position:relative;border-radius:8px;overflow:hidden;flex:1;min-height:220px;">
          <div id="riCoverageMapEl" style="width:100%;height:100%;min-height:220px;border-radius:8px;"></div>
          <!-- Legend -->
          <div style="position:absolute;left:8px;top:8px;background:rgba(5,8,22,0.88);border:1px solid #1E293B;border-radius:6px;padding:8px 10px;font-size:9px;z-index:1000;pointer-events:none;">
            ${[['#10B981','Very High','> 60%'],['#34D399','High','45-60%'],['#F59E0B','Medium','30-45%'],['#F97316','Low','15-30%'],['#EF4444','Very Low','< 15%']].map(([c,l,s])=>`<div style="display:flex;align-items:center;gap:5px;margin-bottom:4px;"><div style="width:7px;height:7px;border-radius:50%;background:${c};"></div><span>${l}</span><span style="color:#64748B;">${s}</span></div>`).join('')}
          </div>
        </div>
      </div>
      <!-- Coverage by State -->
      <div class="ri-card">
        <div class="ri-card-header"><span class="ri-card-title">Coverage by State (Top 10)</span><button class="ri-btn-xs ri-btn-ghost">By Villages Covered ▾</button></div>
        <table class="ri-table" style="width:100%;font-size:11px;">
          <thead><tr><th>#</th><th>State</th><th>Coverage %</th><th>Villages Covered</th><th>vs Last Mo</th></tr></thead>
          <tbody>
            ${d.coverageByState.map(s=>{
              const barColors = {green:'#10B981',yellow:'#F59E0B',orange:'#F97316',red:'#EF4444'};
              const bc = barColors[s.color]||'#10B981';
              return `<tr><td style="color:#64748B;">${s.rank}</td><td>${s.state}</td>
                <td><div style="display:flex;align-items:center;gap:5px;"><div style="flex:1;background:#1E293B;border-radius:100px;height:4px;min-width:40px;"><div style="background:${bc};height:4px;border-radius:100px;width:${s.pct}%;"></div></div><span style="color:${bc};">${s.coverage}</span></div></td>
                <td>${s.villages}</td><td style="color:${s.up?'#10B981':'#EF4444'};"><i class="fas fa-caret-${s.up?'up':'down'}"></i> ${s.change}</td></tr>`;}).join('')}
          </tbody>
        </table>
        <div style="text-align:center;margin-top:8px;"><a href="#" style="font-size:10px;color:#10B981;">View All States →</a></div>
      </div>
      <!-- Retailer Density -->
      <div class="ri-card">
        <div class="ri-card-header"><span class="ri-card-title">Retailer Density (Per 10K Population)</span><button class="ri-btn-xs ri-btn-ghost">Density Heat Overlay ▾</button></div>
        <div style="flex:1;background:linear-gradient(135deg,#050816,#0a1628);border-radius:8px;overflow:hidden;min-height:200px;position:relative;">
          <div style="position:absolute;inset:0;background:linear-gradient(to right, rgba(59,130,246,0.4), rgba(16,185,129,0.6), rgba(245,158,11,0.4));border-radius:8px;"></div>
          <div style="position:absolute;bottom:8px;left:8px;right:8px;display:flex;align-items:center;gap:4px;font-size:9px;color:#64748B;">
            <span>Low Density</span>
            <div style="flex:1;height:6px;border-radius:3px;background:linear-gradient(to right,#3B82F6,#10B981,#F59E0B,#EF4444);"></div>
            <span>High Density</span>
          </div>
          <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:4px;">
            <div style="font-size:11px;color:#64748B;">India Average</div>
            <div style="font-size:24px;font-weight:700;color:#10B981;">2.7</div>
            <div style="font-size:10px;color:#64748B;">Retailers per 10K population</div>
          </div>
        </div>
        <div style="text-align:center;margin-top:8px;"><a href="#" style="font-size:10px;color:#10B981;">View Full Density Map →</a></div>
      </div>
    </div>
    <!-- Bottom Row -->
    <div class="ri-grid-3" style="padding-bottom:16px;">
      <div class="ri-card">
        <div class="ri-card-header"><span class="ri-card-title">Uncovered Villages by Population <i class="fas fa-info-circle" style="font-size:10px;color:#64748B;"></i></span><button class="ri-btn-xs ri-btn-ghost">Top 10 ▾</button></div>
        <table class="ri-table"><thead><tr><th>Village / Location District</th><th>State</th><th>Pop.</th><th>Opp. Score</th></tr></thead>
        <tbody>
          ${[['Gaya Rural','Bihar','1.2L','94'],['Darbhanga Central','Bihar','98K','89'],['Barmer East','Rajasthan','87K','86'],['Murshidabad West','West Bengal','82K','83'],['Rewa Rural','Madhya Pradesh','76K','79']].map(([n,s,p,o])=>`<tr><td style="font-size:11px;">${n}</td><td style="font-size:10px;color:#64748B;">${s}</td><td style="font-size:11px;">${p}</td><td><span style="background:rgba(16,185,129,0.1);color:#10B981;font-size:10px;padding:2px 6px;border-radius:4px;">${o}</span></td></tr>`).join('')}
        </tbody></table>
      </div>
      <div class="ri-card">
        <div class="ri-card-header"><span class="ri-card-title">White Space Opportunity Index</span><a href="#" style="font-size:10px;color:#10B981;">View Methodology</a></div>
        <div style="height:160px;"><canvas id="riGeoBarChart"></canvas></div>
      </div>
      <div class="ri-card">
        <div class="ri-card-header"><span class="ri-card-title">Top Expansion Recommendations <i class="fas fa-info-circle" style="font-size:10px;color:#64748B;"></i></span><a href="#" style="font-size:10px;color:#10B981;">View All →</a></div>
        <table class="ri-table"><thead><tr><th>Area / District</th><th>State</th><th>Opp. Score</th><th>Est. Retailers</th></tr></thead>
        <tbody>${d.expansionRecs.map(r=>`<tr><td style="font-size:11px;">${r.area}</td><td style="font-size:10px;color:#64748B;">${r.state}</td><td><span style="background:rgba(16,185,129,0.1);color:#10B981;font-size:10px;padding:2px 6px;border-radius:4px;">${r.oppScore}</span></td><td style="font-size:11px;">${r.estRetailers}</td></tr>`).join('')}
        </tbody></table>
      </div>
    </div>
  </div>`;
}

function drawGeoCharts(){
  riBarChart('riGeoBarChart',
    ['Bihar', 'Rajasthan', 'WB', 'MP', 'UP'],
    [{ data:[94,86,83,79,72], backgroundColor:['#10B981BB','#3B82F6BB','#8B5CF6BB','#F59E0BBB','#F97316BB'], borderColor:['#10B981','#3B82F6','#8B5CF6','#F59E0B','#F97316'], borderWidth:1 }],
    {yFormat:v=>v+' pts'}
  );
  // Leaflet coverage map
  riInitCoverageMap('riCoverageMapEl');
}

// =====================
// SCREEN: BEHAVIOR ANALYTICS
// =====================
function buildRIBehavior(){
  const d = RI_DATA.behaviorAnalytics;
  return `<div class="ri-screen">
    ${riPageHeader('Behavior Analytics','Understand retailer behavior patterns and drive targeted actions','Behavior Analytics','<button class="ri-btn ri-btn-primary" style="background:rgba(139,92,246,0.15);color:#8B5CF6;border:1px solid rgba(139,92,246,0.3);"><i class="fas fa-magic"></i> AI Assistant</button>')}
    <div class="ri-kpi-row" style="grid-template-columns:repeat(6,1fr);">${d.kpis.map(riKPICard).join('')}</div>
    <div style="border-bottom:1px solid #1E293B;display:flex;gap:0;flex-shrink:0;align-items:center;justify-content:space-between;">
      <div style="display:flex;">
        ${d.tabs.map((t,i)=>`<button class="ri-profile-tab${i===0?' ri-profile-tab-active':''}" onclick="riProfileTab(this,${i})">${t}</button>`).join('')}
      </div>
      <div style="display:flex;align-items:center;gap:6px;padding-right:4px;font-size:11px;color:#64748B;">Compare With <button class="ri-btn-xs ri-btn-ghost">Last Month ▾</button></div>
    </div>
    <div class="ri-grid-3">
      <!-- Scan Frequency Donut -->
      <div class="ri-card">
        <div class="ri-card-header"><span class="ri-card-title">Scan Frequency Distribution <i class="fas fa-info-circle" style="font-size:10px;color:#64748B;"></i></span><a href="#" style="font-size:10px;color:#10B981;">View Details →</a></div>
        <div style="display:flex;align-items:center;gap:12px;">
          <div style="position:relative;width:100px;height:100px;flex-shrink:0;"><canvas id="riBehavScanDonut"></canvas><div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;"><div style="font-size:14px;font-weight:700;">24,532</div><div style="font-size:9px;color:#64748B;">Total</div></div></div>
          <div style="flex:1;">
            ${d.scanFrequency.map(s=>`<div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;"><div style="width:8px;height:8px;border-radius:50%;background:${s.color};flex-shrink:0;"></div><div style="flex:1;font-size:10px;">${s.label}</div><span style="font-size:10px;color:${s.color};font-weight:600;">${s.pct}%</span><span style="font-size:10px;color:#64748B;">(${s.count})</span></div>`).join('')}
          </div>
        </div>
        <div style="margin-top:8px;background:rgba(16,185,129,0.07);border:1px solid rgba(16,185,129,0.15);border-radius:6px;padding:6px 10px;font-size:10px;color:#10B981;"><i class="fas fa-caret-up"></i> 12.7% more retailers in High frequency segment vs last month</div>
      </div>
      <!-- Time of Day -->
      <div class="ri-card">
        <div class="ri-card-header"><span class="ri-card-title">Time of Day – Scan Activity <i class="fas fa-info-circle" style="font-size:10px;color:#64748B;"></i></span><a href="#" style="font-size:10px;color:#10B981;">View Details →</a></div>
        <div style="height:140px;"><canvas id="riTimeOfDayChart"></canvas></div>
        <div style="display:flex;justify-content:space-between;font-size:9px;color:#64748B;margin-top:4px;"><span>Low Activity</span><div style="flex:1;margin:0 8px;height:4px;border-radius:2px;background:linear-gradient(to right,#1E293B,#F59E0B,#10B981);align-self:center;"></div><span>High Activity</span></div>
      </div>
      <!-- Day of Week -->
      <div class="ri-card">
        <div class="ri-card-header"><span class="ri-card-title">Day of Week – Avg Scans <i class="fas fa-info-circle" style="font-size:10px;color:#64748B;"></i></span><a href="#" style="font-size:10px;color:#10B981;">View Details →</a></div>
        <div style="height:140px;"><canvas id="riDayOfWeekChart"></canvas></div>
        <div style="font-size:9px;color:#64748B;margin-top:4px;">Scans / Retailer</div>
      </div>
    </div>
    <div class="ri-grid-3">
      <!-- Seasonal Trend -->
      <div class="ri-card">
        <div class="ri-card-header"><span class="ri-card-title">Seasonal Behavior Trend <i class="fas fa-info-circle" style="font-size:10px;color:#64748B;"></i></span><a href="#" style="font-size:10px;color:#10B981;">View Details →</a></div>
        <div style="display:flex;gap:12px;margin-bottom:8px;font-size:10px;color:#64748B;">Scans / Retailer <span style="display:flex;align-items:center;gap:4px;"><div style="width:8px;height:8px;border-radius:2px;background:#10B981;"></div>Kharif</span><span style="display:flex;align-items:center;gap:4px;"><div style="width:8px;height:8px;border-radius:2px;background:#3B82F6;"></div>Rabi</span><span style="display:flex;align-items:center;gap:4px;"><div style="width:8px;height:8px;border-radius:2px;background:#8B5CF6;"></div>Summer</span></div>
        <div style="height:130px;"><canvas id="riSeasonalChart"></canvas></div>
      </div>
      <!-- Campaign Response -->
      <div class="ri-card">
        <div class="ri-card-header"><span class="ri-card-title">Campaign Response Rate Trend <i class="fas fa-info-circle" style="font-size:10px;color:#64748B;"></i></span><a href="#" style="font-size:10px;color:#10B981;">View Details →</a></div>
        <div style="height:140px;"><canvas id="riCampaignResponseChart"></canvas></div>
        <div style="font-size:10px;color:#10B981;margin-top:4px;"><i class="fas fa-caret-up"></i> 24 May: 37.8% (+5.4%)</div>
      </div>
      <!-- Reward Dependency -->
      <div class="ri-card">
        <div class="ri-card-header"><span class="ri-card-title">Reward Dependency Segments <i class="fas fa-info-circle" style="font-size:10px;color:#64748B;"></i></span><a href="#" style="font-size:10px;color:#10B981;">View Details →</a></div>
        <div style="display:flex;align-items:center;gap:12px;">
          <div style="position:relative;width:100px;height:100px;flex-shrink:0;"><canvas id="riRewardDepDonut"></canvas><div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;"><div style="font-size:12px;font-weight:700;">24,532</div><div style="font-size:9px;color:#64748B;">Total</div></div></div>
          <div style="flex:1;">
            ${d.rewardDependency.map(r=>`<div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;"><div style="width:8px;height:8px;border-radius:50%;background:${r.color};flex-shrink:0;"></div><div style="flex:1;font-size:10px;">${r.label}</div><span style="font-size:10px;color:${r.color};font-weight:600;">${r.pct}%</span></div>`).join('')}
          </div>
        </div>
      </div>
    </div>
    <!-- Behavior Segments Table + AI Insights -->
    <div style="display:grid;grid-template-columns:1fr 280px;gap:12px;flex-shrink:0;padding-bottom:16px;">
      <div class="ri-card">
        <div class="ri-card-header"><span class="ri-card-title">Top Behavior Segments <i class="fas fa-info-circle" style="font-size:10px;color:#64748B;"></i></span></div>
        <table class="ri-table"><thead><tr><th>Segment</th><th>Retailers</th><th>Sales Contribution</th><th>Avg Scan/Week</th><th>Avg Order Value</th><th>Repeat Rate</th><th>Reward Dep.</th><th>Action</th></tr></thead>
        <tbody>${d.behaviorSegments.map(s=>{
          const ac = {green:'#10B981',blue:'#3B82F6',yellow:'#F59E0B',red:'#EF4444'}[s.actionColor];
          return `<tr><td style="font-weight:500;">${s.name}</td><td style="color:#64748B;">${s.retailers}</td><td>${s.contribution}</td><td>${s.scanFreq}</td><td>${s.orderVal}</td><td>${s.repeatRate}</td><td>${s.rewardDep}</td><td><button class="ri-btn" style="background:${ac}15;color:${ac};border:1px solid ${ac}30;font-size:10px;padding:3px 8px;">${s.action}</button></td></tr>`;}).join('')}
        </tbody></table>
        <div style="margin-top:12px;">
          <div class="ri-card-header"><span class="ri-card-title">Retailer Engagement Streaks <i class="fas fa-info-circle" style="font-size:10px;color:#64748B;"></i></span></div>
          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:6px;">
            ${d.engagementStreaks.map(s=>{
              const sc = {green:'#10B981',blue:'#3B82F6',purple:'#8B5CF6',yellow:'#F59E0B'}[s.color];
              return `<div style="background:#0F172A;border:1px solid #1E293B;border-radius:6px;padding:10px;text-align:center;"><div style="font-size:10px;color:#64748B;margin-bottom:4px;">${s.label}</div><div style="font-size:18px;font-weight:700;color:${sc};">${s.count}</div><div style="font-size:9px;color:#10B981;margin-top:3px;"><i class="fas fa-caret-up"></i> ${s.change}</div></div>`;}).join('')}
          </div>
        </div>
      </div>
      <!-- AI Insights + Recommended Actions -->
      <div style="display:flex;flex-direction:column;gap:10px;">
        <div class="ri-card">
          <div class="ri-card-header"><span class="ri-card-title" style="font-size:12px;">AI Insights</span></div>
          ${d.aiInsights.map(ins=>{
            const colors = {green:'#10B981',blue:'#3B82F6',orange:'#F97316',purple:'#8B5CF6'};
            const c = colors[ins.color];
            return `<div style="background:#0F172A;border:1px solid #1E293B;border-radius:6px;padding:8px;margin-bottom:6px;">
              <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;"><i class="fas ${ins.icon}" style="color:${c};font-size:11px;"></i><span style="font-size:11px;font-weight:600;color:${c};">${ins.title}</span></div>
              <div style="font-size:10px;color:#64748B;">${ins.body}</div>
            </div>`;}).join('')}
          <div style="text-align:center;margin-top:4px;"><a href="#" style="font-size:10px;color:#10B981;">View All Insights →</a></div>
        </div>
        <div class="ri-card">
          <div class="ri-card-header" style="margin-bottom:8px;"><span class="ri-card-title" style="font-size:12px;">Recommended Actions</span></div>
          ${d.recommendedActions.map(a=>{
            const c = {green:'#10B981',blue:'#3B82F6'}[a.color];
            return `<div style="background:#0F172A;border:1px solid #1E293B;border-radius:6px;padding:8px;margin-bottom:6px;display:flex;align-items:flex-start;gap:8px;">
              <div style="width:26px;height:26px;border-radius:50%;background:${c}20;color:${c};display:flex;align-items:center;justify-content:center;font-size:10px;flex-shrink:0;"><i class="fas ${a.icon}"></i></div>
              <div style="flex:1;"><div style="font-size:11px;font-weight:500;margin-bottom:2px;">${a.title}</div><div style="font-size:10px;color:#64748B;margin-bottom:6px;">${a.sub}</div><button class="ri-btn ri-btn-primary" style="font-size:10px;padding:3px 10px;">${a.btn}</button></div>
            </div>`;}).join('')}
        </div>
      </div>
    </div>
  </div>`;
}

function drawBehaviorCharts(){
  const d = RI_DATA.behaviorAnalytics;
  riDoughnutChart('riBehavScanDonut', d.scanFrequency.map(s=>s.label), d.scanFrequency.map(s=>s.pct), d.scanFrequency.map(s=>s.color));
  riBarChart('riTimeOfDayChart', d.timeOfDay.map(t=>t.hour), [{data:d.timeOfDay.map(t=>t.val), backgroundColor:d.timeOfDay.map(t=>t.val>15?'rgba(16,185,129,0.7)':t.val>8?'rgba(245,158,11,0.7)':'rgba(59,130,246,0.7)'), borderRadius:3}], {yFormat:v=>v+'%'});
  riBarChart('riDayOfWeekChart', d.dayOfWeek.map(t=>t.day), [{data:d.dayOfWeek.map(t=>t.scans), backgroundColor:'rgba(139,92,246,0.6)', borderColor:'#8B5CF6', borderWidth:1, borderRadius:3}]);
  riLineChart('riSeasonalChart', d.seasonalTrend.labels, [
    {label:'Kharif',data:d.seasonalTrend.kharif,borderColor:'#10B981',fill:false},
    {label:'Rabi',data:d.seasonalTrend.rabi,borderColor:'#3B82F6',fill:false},
    {label:'Summer',data:d.seasonalTrend.summer,borderColor:'#8B5CF6',fill:false,borderDash:[4,4]},
  ], {legend:true});
  riLineChart('riCampaignResponseChart', d.campaignResponseTrend.map(t=>t.date), [{label:'Response Rate %',data:d.campaignResponseTrend.map(t=>t.rate),borderColor:'#10B981',fill:{target:'origin',above:'rgba(16,185,129,0.1)'}}], {yFormat:v=>v+'%'});
  riDoughnutChart('riRewardDepDonut', d.rewardDependency.map(r=>r.label), d.rewardDependency.map(r=>r.pct), d.rewardDependency.map(r=>r.color));
}

// =====================
// SCREEN: TRUST SCORE
// =====================
function buildRITrustScore(){
  const d = RI_DATA.trustScore;
  const r = d.retailer;
  return `<div class="ri-screen">
    ${riPageHeader('Retailer Trust Score','Measure trust, detect risk and unlock credit with confidence.','Retailer Trust Score','<button class="ri-btn ri-btn-primary"><i class="fas fa-magic"></i> AI Assistant</button>')}
    <!-- Retailer Header Banner -->
    <div class="ri-card" style="flex-direction:row;align-items:center;gap:16px;flex-shrink:0;">
      <div style="width:60px;height:60px;border-radius:8px;background:#1a2f3a;border:1px solid #1E293B;display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:700;color:#10B981;flex-shrink:0;">MD</div>
      <div style="flex:1;">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:2px;"><span style="font-size:16px;font-weight:700;">${r.name}</span><i class="fas fa-circle-check" style="color:#10B981;"></i></div>
        <div style="font-size:11px;color:#64748B;margin-bottom:4px;">${r.code} · ${r.owner}</div>
        <div style="font-size:11px;color:#64748B;"><i class="fas fa-map-marker-alt" style="margin-right:4px;"></i>${r.location} <span style="margin:0 6px;">›</span> ${r.zone} <span style="margin:0 6px;">›</span> Since ${r.since}</div>
        <div style="display:flex;gap:6px;margin-top:6px;">${r.tags.map(t=>`<span style="background:rgba(16,185,129,0.1);color:#10B981;border:1px solid rgba(16,185,129,0.2);font-size:9px;padding:2px 7px;border-radius:4px;">${t}</span>`).join('')}</div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;text-align:right;">
        ${[['Total Sales (MTD)',r.totalSalesMTD,r.salesGrowth],['Total Purchases (MTD)',r.totalPurchasesMTD,r.purchaseGrowth],['Reward Earned (MTD)',r.rewardEarnedMTD,r.rewardGrowth],['Last Active',r.lastActive,'']].map(([l,v,g])=>`<div><div style="font-size:10px;color:#64748B;margin-bottom:2px;">${l}</div><div style="font-size:14px;font-weight:700;">${v}</div>${g?`<div style="font-size:10px;color:#10B981;"><i class="fas fa-caret-up"></i> ${g}</div>`:''}</div>`).join('')}
      </div>
      <a href="#" style="font-size:11px;color:#10B981;white-space:nowrap;flex-shrink:0;">View Retailer Profile →</a>
    </div>
    <!-- Main Content -->
    <div class="ri-grid-3">
      <!-- Overall Trust Score -->
      <div class="ri-card">
        <div class="ri-card-header"><span class="ri-card-title">Overall Trust Score <i class="fas fa-info-circle" style="font-size:10px;color:#64748B;"></i></span></div>
        <div style="display:flex;align-items:center;gap:16px;">
          <!-- Gauge -->
          <div style="position:relative;width:120px;height:80px;flex-shrink:0;">
            <svg viewBox="0 0 120 80" style="width:100%;height:100%;">
              <path d="M10,70 A50,50 0 0,1 110,70" fill="none" stroke="#1E293B" stroke-width="10" stroke-linecap="round"/>
              <path d="M10,70 A50,50 0 0,1 110,70" fill="none" stroke="#10B981" stroke-width="10" stroke-linecap="round" stroke-dasharray="${d.overallScore * 1.57}, 157" style="transition:stroke-dasharray 1s ease;"/>
              <text x="60" y="72" text-anchor="middle" font-size="20" font-weight="bold" fill="#10B981">${d.overallScore}</text>
              <text x="60" y="85" text-anchor="middle" font-size="8" fill="#64748B">/100</text>
            </svg>
          </div>
          <div>
            <div style="font-size:18px;font-weight:700;color:#10B981;margin-bottom:2px;">${d.scoreLabel}</div>
            <div style="font-size:11px;color:#64748B;margin-bottom:10px;">Retailer shows strong transaction behaviour, low risk and high reliability.</div>
            <div style="background:#0F172A;border:1px solid rgba(16,185,129,0.2);border-radius:6px;padding:8px 10px;margin-bottom:8px;">
              <div style="font-size:10px;color:#64748B;">Credit Eligibility</div>
              <div style="font-size:11px;color:#10B981;font-weight:600;">Eligible for Credit Limit</div>
              <div style="font-size:15px;font-weight:700;margin:4px 0;">${d.creditLimit}</div>
              <div style="background:#1E293B;border-radius:100px;height:4px;"><div style="background:#10B981;border-radius:100px;height:4px;width:75%;"></div></div>
              <div style="display:flex;justify-content:space-between;font-size:9px;color:#64748B;margin-top:2px;"><span>₹0</span><span>₹2.00 L</span></div>
            </div>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px;">
          ${[['Risk Level',d.riskLevel,'#10B981'],['Trend',d.trend,'#10B981'],['Score Change',d.scoreChange2,'#10B981'],['Percentile Rank',d.percentileRank,'#10B981']].map(([l,v,c])=>`<div style="background:#0F172A;border-radius:6px;padding:8px;"><div style="font-size:10px;color:#64748B;">${l}</div><div style="font-size:12px;font-weight:600;color:${c};">${v}</div></div>`).join('')}
        </div>
      </div>
      <!-- Trust Score Breakdown -->
      <div class="ri-card">
        <div class="ri-card-header"><span class="ri-card-title">Trust Score Breakdown <i class="fas fa-info-circle" style="font-size:10px;color:#64748B;"></i></span></div>
        ${d.breakdown.map(b=>{
          const bc = {green:'#10B981',yellow:'#F59E0B'}[b.color];
          return `<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
            <div style="width:26px;height:26px;background:${bc}15;border-radius:6px;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="fas fa-shield-alt" style="color:${bc};font-size:10px;"></i></div>
            <div style="flex:1;">
              <div style="display:flex;justify-content:space-between;margin-bottom:3px;"><span style="font-size:11px;">${b.label}</span><span style="font-size:10px;color:#64748B;">Weight: ${b.weight}</span></div>
              <div style="background:#1E293B;border-radius:100px;height:4px;"><div style="background:${bc};border-radius:100px;height:4px;width:${b.score}%;"></div></div>
            </div>
            <div style="text-align:right;flex-shrink:0;"><div style="font-size:13px;font-weight:700;">${b.score}</div><div style="font-size:10px;color:${parseInt(b.change)>=0?'#10B981':'#EF4444'};">${parseInt(b.change)>=0?'↑':'↓'}${Math.abs(parseInt(b.change))}</div></div>
          </div>`;}).join('')}
        <div style="text-align:center;margin-top:6px;"><a href="#" style="font-size:10px;color:#10B981;">Learn more about score factors →</a></div>
      </div>
      <!-- Risk & Flag Indicators -->
      <div class="ri-card">
        <div class="ri-card-header"><span class="ri-card-title">Risk & Flag Indicators <i class="fas fa-info-circle" style="font-size:10px;color:#64748B;"></i></span></div>
        ${d.riskFlags.map(f=>`<div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-bottom:1px solid #1E293B;">
          <div style="display:flex;align-items:center;gap:8px;"><i class="fas fa-lock" style="color:#64748B;font-size:11px;"></i><span style="font-size:11px;">${f.label}</span></div>
          <span style="font-size:10px;padding:2px 8px;border-radius:4px;background:${f.ok?'rgba(16,185,129,0.1)':'rgba(239,68,68,0.1)'};color:${f.ok?'#10B981':'#EF4444'};">${f.status} ${f.ok?'✓':'⚠'}</span>
        </div>`).join('')}
        <div style="text-align:center;margin-top:8px;"><a href="#" style="font-size:10px;color:#10B981;">View Risk Details →</a></div>
        <!-- AI Recs -->
        <div style="margin-top:12px;border-top:1px solid #1E293B;padding-top:12px;">
          <div class="ri-card-header" style="margin-bottom:8px;"><span class="ri-card-title" style="font-size:12px;">AI Recommendations <i class="fas fa-info-circle" style="font-size:10px;color:#64748B;"></i></span></div>
          ${d.aiRecs.map(rec=>{
            const c = {green:'#10B981',blue:'#3B82F6',yellow:'#F59E0B'}[rec.color];
            return `<div style="display:flex;align-items:flex-start;gap:8px;margin-bottom:8px;"><div style="width:22px;height:22px;border-radius:50%;background:${c}20;color:${c};display:flex;align-items:center;justify-content:center;font-size:10px;flex-shrink:0;"><i class="fas ${rec.icon}"></i></div><div><div style="font-size:11px;font-weight:500;">${rec.title}</div><div style="font-size:10px;color:#64748B;margin-bottom:4px;">${rec.sub}</div><a href="#" style="font-size:10px;color:#10B981;">Take Action →</a></div></div>`;}).join('')}
          <div style="text-align:center;margin-top:4px;"><a href="#" style="font-size:10px;color:#10B981;">View Full Recommendations →</a></div>
        </div>
      </div>
    </div>
    <!-- Trust Charts Row -->
    <div class="ri-grid-3" style="padding-bottom:16px;">
      <div class="ri-card">
        <div class="ri-card-header"><span class="ri-card-title">Trust Score Trend (Last 6 Months) <i class="fas fa-info-circle" style="font-size:10px;color:#64748B;"></i></span><span style="font-size:10px;background:#1E293B;color:#94A3B8;padding:2px 8px;border-radius:4px;">6 Months</span></div>
        <div style="height:140px;"><canvas id="riTrustTrendChart"></canvas></div>
        <div style="font-size:10px;color:#10B981;margin-top:4px;"><i class="fas fa-arrow-trend-up"></i> Trust score improved by 20 pts in last 6 months</div>
      </div>
      <div class="ri-card">
        <div class="ri-card-header"><span class="ri-card-title">Trust Score Distribution <i class="fas fa-info-circle" style="font-size:10px;color:#64748B;"></i></span></div>
        <div style="display:flex;align-items:center;gap:12px;">
          <div style="position:relative;width:100px;height:100px;flex-shrink:0;"><canvas id="riTrustDistDonut"></canvas><div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;"><div style="font-size:12px;font-weight:700;">24,532</div><div style="font-size:9px;color:#64748B;">Total</div></div></div>
          <div style="flex:1;">
            ${RI_DATA.trustScore.distribution.map(t=>`<div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;"><div style="width:8px;height:8px;border-radius:50%;background:${t.color};flex-shrink:0;"></div><div style="flex:1;font-size:10px;">${t.label}</div><span style="font-size:10px;color:#64748B;">${t.count}</span><span style="font-size:10px;font-weight:600;color:${t.color};margin-left:4px;">${t.pct}</span></div>`).join('')}
          </div>
        </div>
        <div style="text-align:center;margin-top:6px;"><a href="#" style="font-size:10px;color:#10B981;">View Full Distribution →</a></div>
      </div>
      <div class="ri-card">
        <div class="ri-card-header"><span class="ri-card-title">Trust Score vs Sales Contribution</span><span style="font-size:10px;background:#1E293B;color:#94A3B8;padding:2px 8px;border-radius:4px;">By Sales</span></div>
        <div style="height:150px;"><canvas id="riTrustScatterChart"></canvas></div>
        <div style="text-align:center;margin-top:4px;"><a href="#" style="font-size:10px;color:#10B981;">View Full Analysis →</a></div>
      </div>
    </div>
  </div>`;
}

function drawTrustCharts(){
  const d = RI_DATA.trustScore;
  riLineChart('riTrustTrendChart', d.scoreTrend.map(t=>t.month), [{label:'Trust Score',data:d.scoreTrend.map(t=>t.score),borderColor:'#10B981',fill:{target:'origin',above:'rgba(16,185,129,0.1)'}}], {yFormat:v=>v});
  riDoughnutChart('riTrustDistDonut', d.distribution.map(x=>x.label), d.distribution.map(x=>parseFloat(x.pct)), d.distribution.map(x=>x.color));
  // Scatter plot as bubble chart
  riDestroyChart('riTrustScatterChart');
  const el = document.getElementById('riTrustScatterChart');
  if(el) riChartInstances['riTrustScatterChart'] = new Chart(el.getContext('2d'), {
    type:'bubble',
    data:{datasets:[
      {label:'Retailers',data:[{x:92,y:2.1,r:8},{x:78,y:5.4,r:12},{x:45,y:1.2,r:5},{x:88,y:8.7,r:15},{x:62,y:3.8,r:9},{x:35,y:0.8,r:4},{x:70,y:4.2,r:10}],
        backgroundColor:'rgba(16,185,129,0.5)',borderColor:'#10B981',borderWidth:1},
      {label:'Maa Durga (Current)',data:[{x:92,y:2.1,r:10}],backgroundColor:'rgba(59,130,246,0.8)',borderColor:'#3B82F6',borderWidth:2},
    ]},
    options:{responsive:true,maintainAspectRatio:false,interaction:{mode:'point'},plugins:{legend:{display:false},tooltip:{backgroundColor:'#0B1220',borderColor:'#1E293B',borderWidth:1,titleColor:'#F8FAFC',bodyColor:'#94A3B8',padding:10,cornerRadius:6}},
      scales:{x:{grid:{color:'rgba(30,41,59,0.5)'},ticks:{color:'#475569',font:{size:10}},border:{display:false},title:{display:true,text:'Trust Score',color:'#64748B',font:{size:10}}},
        y:{grid:{color:'rgba(30,41,59,0.5)'},ticks:{color:'#475569',font:{size:10},callback:v=>v+'%'},border:{display:false},title:{display:true,text:'Sales Contribution %',color:'#64748B',font:{size:10}}}}},
  });
}

// =====================
// SCREEN: FRAUD & VERIFICATION
// =====================
function buildRIFraud(){
  const d = RI_DATA.fraudVerification;
  return `<div class="ri-screen">
    ${riPageHeader('Fraud & Verification','Detect fraud, prevent abuse and ensure 100% verified retail transactions.','Fraud & Verification','<button class="ri-btn ri-btn-primary"><i class="fas fa-magic"></i> AI Assistant</button>')}
    <div class="ri-kpi-row" style="grid-template-columns:repeat(6,1fr);">${d.kpis.map(riKPICard).join('')}</div>
    <div style="border-bottom:1px solid #1E293B;display:flex;gap:0;flex-shrink:0;">
      ${d.tabs.map((t,i)=>`<button class="ri-profile-tab${i===0?' ri-profile-tab-active':''}" onclick="riProfileTab(this,${i})">${t}</button>`).join('')}
    </div>
    <div class="ri-grid-3">
      <!-- Fraud Hotspots -->
      <div class="ri-card">
        <div class="ri-card-header"><span class="ri-card-title">Fraud Hotspots <span style="font-size:9px;background:rgba(239,68,68,0.1);color:#EF4444;padding:2px 6px;border-radius:4px;">⚠</span></span><button class="ri-btn-xs ri-btn-ghost">By District ▾</button></div>
        <div style="flex:1;position:relative;border-radius:8px;overflow:hidden;min-height:200px;">
          <div id="riFraudMapEl" style="width:100%;height:100%;min-height:200px;border-radius:8px;"></div>
          <!-- Legend -->
          <div style="position:absolute;left:8px;top:8px;background:rgba(5,8,22,0.88);border:1px solid #1E293B;border-radius:6px;padding:8px 10px;font-size:9px;z-index:1000;pointer-events:none;">
            ${[['#EF4444','Very High','> 80'],['#F97316','High','50-80'],['#F59E0B','Medium','25-50'],['#3B82F6','Low','10-25'],['#10B981','Very Low','< 10']].map(([c,l,s])=>`<div style="display:flex;align-items:center;gap:5px;margin-bottom:4px;"><div style="width:7px;height:7px;border-radius:50%;background:${c};"></div><span>${l}</span><span style="color:#64748B;">${s}</span></div>`).join('')}
          </div>
        </div>
        <div style="margin-top:8px;background:rgba(239,68,68,0.07);border:1px solid rgba(239,68,68,0.2);border-radius:6px;padding:6px 10px;font-size:10px;display:flex;align-items:center;gap:6px;"><i class="fas fa-map-marker-alt" style="color:#EF4444;"></i><span style="color:#EF4444;font-weight:500;">High risk detected in 24 districts</span></div>
        <div style="font-size:10px;color:#64748B;margin-top:4px;">Increased monitoring in affected areas</div>
      </div>
      <!-- Fraud Trend -->
      <div class="ri-card">
        <div class="ri-card-header"><span class="ri-card-title">Fraud Trend Over Time</span><button class="ri-btn-xs ri-btn-ghost">Daily ▾</button></div>
        <div style="height:200px;"><canvas id="riFraudTrendChart"></canvas></div>
        <div style="font-size:10px;color:#10B981;margin-top:4px;"><i class="fas fa-caret-down"></i> 18.3% fewer fraudulent transactions vs last week</div>
      </div>
      <!-- Fraud by Type Donut -->
      <div class="ri-card">
        <div class="ri-card-header"><span class="ri-card-title">Fraud by Type</span><button class="ri-btn-xs ri-btn-ghost">This Week ▾</button></div>
        <div style="display:flex;align-items:center;gap:12px;">
          <div style="position:relative;width:110px;height:110px;flex-shrink:0;"><canvas id="riFraudTypeDonut"></canvas><div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;"><div style="font-size:16px;font-weight:700;">2,842</div><div style="font-size:9px;color:#64748B;">Total Fraud</div></div></div>
          <div style="flex:1;">
            ${d.fraudByType.map(f=>`<div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;"><div style="width:8px;height:8px;border-radius:50%;background:${f.color};flex-shrink:0;"></div><div style="flex:1;font-size:10px;">${f.label}</div><span style="font-size:10px;font-weight:600;color:${f.color};">${f.pct}%</span><span style="font-size:10px;color:#64748B;">(${f.count})</span></div>`).join('')}
          </div>
        </div>
        <div style="text-align:center;margin-top:6px;"><a href="#" style="font-size:10px;color:#10B981;">View Fraud Types →</a></div>
      </div>
    </div>
    <!-- Bottom Row -->
    <div class="ri-grid-3" style="padding-bottom:16px;">
      <!-- Top Fraudulent Retailers -->
      <div class="ri-card">
        <div class="ri-card-header"><span class="ri-card-title">Top Fraudulent Retailers <span style="font-size:9px;background:rgba(239,68,68,0.1);color:#EF4444;padding:2px 6px;border-radius:4px;">⚠</span></span><a href="#" style="font-size:10px;color:#10B981;">View All →</a></div>
        <table class="ri-table" style="width:100%;"><thead><tr><th>#</th><th>Retailer Name</th><th>District</th><th>Fraud Score</th></tr></thead>
        <tbody>${d.topFraudulent.map(f=>`<tr><td style="color:#64748B;">${f.rank}</td><td style="font-size:11px;">${f.name}</td><td style="font-size:10px;color:#64748B;">${f.district}</td><td><span style="background:rgba(239,68,68,0.1);color:#EF4444;border:1px solid rgba(239,68,68,0.2);font-size:10px;font-weight:700;padding:2px 8px;border-radius:4px;">${f.score}</span></td></tr>`).join('')}
        </tbody></table>
      </div>
      <!-- Verification Method -->
      <div class="ri-card">
        <div class="ri-card-header"><span class="ri-card-title">Verification Method Performance <span style="font-size:9px;background:rgba(239,68,68,0.1);color:#EF4444;padding:2px 6px;border-radius:4px;">⚠</span></span></div>
        <div style="display:flex;align-items:center;gap:12px;">
          <div style="position:relative;width:110px;height:110px;flex-shrink:0;"><canvas id="riVerifMethodDonut"></canvas><div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;"><div style="font-size:14px;font-weight:700;">8.42 Lakh</div><div style="font-size:9px;color:#64748B;">Total</div></div></div>
          <div style="flex:1;">
            ${d.verificationMethods.map(v=>`<div style="display:flex;align-items:center;gap:6px;margin-bottom:5px;"><div style="width:8px;height:8px;border-radius:50%;background:${v.color};flex-shrink:0;"></div><div style="flex:1;font-size:10px;">${v.label}</div><span style="font-size:10px;font-weight:600;color:${v.color};">${v.pct}%</span><span style="font-size:10px;color:#64748B;">(${v.value})</span></div>`).join('')}
          </div>
        </div>
      </div>
      <!-- Recent Fraud Alerts -->
      <div class="ri-card">
        <div class="ri-card-header"><span class="ri-card-title">Recent Fraud Alerts</span><a href="#" style="font-size:10px;color:#10B981;">View All Alerts →</a></div>
        ${d.recentAlerts.map(a=>`<div style="background:#0F172A;border:1px solid #1E293B;border-radius:8px;padding:10px;margin-bottom:8px;">
          <div style="display:flex;align-items:flex-start;gap:8px;">
            <div style="width:28px;height:28px;border-radius:50%;background:${a.severity==='High'?'rgba(239,68,68,0.15)':'rgba(245,158,11,0.15)'};color:${a.severity==='High'?'#EF4444':'#F59E0B'};display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="fas fa-triangle-exclamation" style="font-size:11px;"></i></div>
            <div style="flex:1;"><div style="font-size:11px;font-weight:500;margin-bottom:2px;">${a.title}${a.value?` <span style="color:#EF4444;font-weight:700;">${a.value}</span>`:''}</div><div style="font-size:10px;color:#64748B;">${a.time}</div><div style="font-size:10px;color:#64748B;margin-top:2px;">Retailer: ${a.retailer} · ${a.location}</div></div>
          </div>
          <div style="margin-top:6px;"><span style="background:rgba(239,68,68,0.1);color:#EF4444;font-size:9px;padding:2px 8px;border-radius:4px;">${a.severity}</span></div>
        </div>`).join('')}
      </div>
    </div>
  </div>`;
}

function drawFraudCharts(){
  const d = RI_DATA.fraudVerification;
  riLineChart('riFraudTrendChart', d.fraudTrend.map(t=>t.date), [
    {label:'Fraudulent Transactions',data:d.fraudTrend.map(t=>t.txns),borderColor:'#10B981',fill:false,yAxisID:'y'},
    {label:'Fraud Value Blocked (₹ Cr)',data:d.fraudTrend.map(t=>t.value),borderColor:'#8B5CF6',fill:false,yAxisID:'y1'},
  ], {legend:true, extra:{scales:{y:{type:'linear',position:'left'},y1:{type:'linear',position:'right',grid:{display:false},ticks:{color:'#475569',font:{size:10},callback:v=>'₹'+v+'Cr'}}}}});
  riDoughnutChart('riFraudTypeDonut', d.fraudByType.map(f=>f.label), d.fraudByType.map(f=>f.pct), d.fraudByType.map(f=>f.color));
  riDoughnutChart('riVerifMethodDonut', d.verificationMethods.map(v=>v.label), d.verificationMethods.map(v=>v.pct), d.verificationMethods.map(v=>v.color));
  // Leaflet fraud hotspot map
  riInitFraudMap('riFraudMapEl');
}

// Charts that need to be drawn when profile screen loads
function riHandleProfileCharts(){
  if(document.getElementById('riProfileSalesChart')) drawSKUCharts();
}


// =====================
// SCREEN: SETTINGS
// =====================
function buildRISettings(){
  return `<div class="ri-screen">
    ${riPageHeader('Settings','Configure Retail Intelligence platform preferences','Settings')}
    <div class="ri-grid-2">
      <!-- General Settings -->
      <div class="ri-card">
        <div class="ri-card-header"><span class="ri-card-title"><i class="fas fa-sliders" style="color:#10B981;margin-right:6px;"></i>General Settings</span></div>
        <div style="display:flex;flex-direction:column;gap:14px;margin-top:4px;">
          ${[
            ['Default Date Range','Last 7 Days','select',['Today','Last 7 Days','Last 30 Days','Last 90 Days','Custom']],
            ['Default Landing Screen','Overview','select',['Overview','Retailer Segments','SKU Intelligence','Geo Coverage']],
            ['Data Refresh Interval','Every 5 minutes','select',['Real-time','Every 1 minute','Every 5 minutes','Every 15 minutes','Manual']],
            ['Currency Format','Indian (₹ Lakh / Crore)','select',['Indian (₹ Lakh / Crore)','Standard (₹ 1,00,000)']],
          ].map(([l,v,t,opts])=>`
          <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 12px;background:#0F172A;border:1px solid #1E293B;border-radius:8px;">
            <div><div style="font-size:12px;font-weight:500;">${l}</div><div style="font-size:10px;color:#64748B;margin-top:2px;">Current: ${v}</div></div>
            <select style="background:#1E293B;border:1px solid #334155;color:#F8FAFC;padding:5px 10px;border-radius:6px;font-size:11px;cursor:pointer;">
              ${opts.map(o=>`<option${o===v?' selected':''}>${o}</option>`).join('')}
            </select>
          </div>`).join('')}
        </div>
      </div>
      <!-- Notification Settings -->
      <div class="ri-card">
        <div class="ri-card-header"><span class="ri-card-title"><i class="fas fa-bell" style="color:#F59E0B;margin-right:6px;"></i>Notification Preferences</span></div>
        <div style="display:flex;flex-direction:column;gap:10px;margin-top:4px;">
          ${[
            ['Fraud Alerts','Get notified for high-risk transactions',true,'red'],
            ['Retailer Churn Risk','Alert when retailer engagement drops',true,'orange'],
            ['SKU Dead Stock','Notify for SKUs with no movement > 60 days',true,'yellow'],
            ['Campaign Performance','Weekly campaign result digest',false,'blue'],
            ['New Retailer Registrations','Daily summary of new onboardings',true,'green'],
            ['Credit Limit Breaches','Alert on credit overdue events',true,'red'],
          ].map(([l,sub,on,c])=>{
            const colors={red:'#EF4444',orange:'F97316',yellow:'#F59E0B',blue:'#3B82F6',green:'#10B981'};
            const col = colors[c]||'#10B981';
            return `<div style="display:flex;align-items:center;justify-content:space-between;padding:10px 12px;background:#0F172A;border:1px solid #1E293B;border-radius:8px;">
              <div style="display:flex;align-items:center;gap:10px;">
                <div style="width:8px;height:8px;border-radius:50%;background:${col};flex-shrink:0;"></div>
                <div><div style="font-size:12px;font-weight:500;">${l}</div><div style="font-size:10px;color:#64748B;">${sub}</div></div>
              </div>
              <div onclick="this.classList.toggle('ri-toggle-on')" class="ri-toggle${on?' ri-toggle-on':''}"></div>
            </div>`;}).join('')}
        </div>
      </div>
      <!-- Display Settings -->
      <div class="ri-card">
        <div class="ri-card-header"><span class="ri-card-title"><i class="fas fa-palette" style="color:#8B5CF6;margin-right:6px;"></i>Display & Theme</span></div>
        <div style="display:flex;flex-direction:column;gap:10px;margin-top:4px;">
          <div style="padding:10px 12px;background:#0F172A;border:1px solid #1E293B;border-radius:8px;">
            <div style="font-size:12px;font-weight:500;margin-bottom:10px;">Theme</div>
            <div style="display:flex;gap:8px;">
              ${[['Dark','fa-moon','#10B981',true],['Light','fa-sun','#F59E0B',false],['System','fa-desktop','#64748B',false]].map(([l,ic,c,act])=>`
              <button onclick="riApplyTheme('${l.toLowerCase()}',this)" class="ri-btn${act?' ri-btn-primary':' ri-btn-ghost'}" style="flex:1;justify-content:center;gap:6px;${act?'':''}">
                <i class="fas ${ic}" style="color:${act?'inherit':c};"></i>${l}
              </button>`).join('')}
            </div>
          </div>
          <div style="padding:10px 12px;background:#0F172A;border:1px solid #1E293B;border-radius:8px;">
            <div style="font-size:12px;font-weight:500;margin-bottom:8px;">Sidebar</div>
            <div style="display:flex;align-items:center;justify-content:space-between;">
              <span style="font-size:11px;color:#64748B;">Compact sidebar</span>
              <div onclick="this.classList.toggle('ri-toggle-on')" class="ri-toggle"></div>
            </div>
          </div>
          <div style="padding:10px 12px;background:#0F172A;border:1px solid #1E293B;border-radius:8px;">
            <div style="font-size:12px;font-weight:500;margin-bottom:8px;">Chart animations</div>
            <div style="display:flex;align-items:center;justify-content:space-between;">
              <span style="font-size:11px;color:#64748B;">Enable smooth chart transitions</span>
              <div onclick="this.classList.toggle('ri-toggle-on')" class="ri-toggle ri-toggle-on"></div>
            </div>
          </div>
        </div>
      </div>
      <!-- Data & Export -->
      <div class="ri-card">
        <div class="ri-card-header"><span class="ri-card-title"><i class="fas fa-database" style="color:#06B6D4;margin-right:6px;"></i>Data & Export</span></div>
        <div style="display:flex;flex-direction:column;gap:10px;margin-top:4px;">
          ${[
            ['Export Format','CSV, Excel, PDF available','fa-file-export','#10B981'],
            ['Data Retention','Last 24 months of data','fa-clock','#3B82F6'],
            ['API Access','REST API enabled for your account','fa-code','#8B5CF6'],
            ['Audit Log','All actions logged for compliance','fa-shield-alt','#F59E0B'],
          ].map(([l,sub,ic,c])=>`
          <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 12px;background:#0F172A;border:1px solid #1E293B;border-radius:8px;">
            <div style="display:flex;align-items:center;gap:10px;">
              <div style="width:30px;height:30px;border-radius:8px;background:${c}15;display:flex;align-items:center;justify-content:center;"><i class="fas ${ic}" style="color:${c};font-size:12px;"></i></div>
              <div><div style="font-size:12px;font-weight:500;">${l}</div><div style="font-size:10px;color:#64748B;">${sub}</div></div>
            </div>
            <button class="ri-btn ri-btn-ghost" style="font-size:10px;">Configure</button>
          </div>`).join('')}
          <button class="ri-btn ri-btn-primary" style="width:100%;justify-content:center;margin-top:4px;"><i class="fas fa-download"></i> Export All Data</button>
        </div>
      </div>
    </div>
  </div>`;
}

function riApplyTheme(theme, btn){
  btn.closest('div').querySelectorAll('button').forEach(b=>{b.className=b.className.replace('ri-btn-primary','ri-btn-ghost');});
  btn.className=btn.className.replace('ri-btn-ghost','ri-btn-primary');
  const ri=document.getElementById('riPlatformContainer');
  if(!ri)return;
  if(theme==='light'){
    ri.setAttribute('data-ri-theme','light');
  } else {
    ri.removeAttribute('data-ri-theme');
  }
}

// =====================
// PLACEHOLDER
// =====================
function buildRIPlaceholder(sid){
  return `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:12px;">
    <div style="font-size:40px;">🚧</div>
    <div style="font-size:18px;font-weight:600;">${sid.replace('ri-','').replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase())}</div>
    <div style="font-size:13px;color:#64748B;">Coming soon — screen under construction</div>
    <button class="ri-btn ri-btn-primary" onclick="riNavigate('ri-overview')">← Back to Overview</button>
  </div>`;
}

// Override drawSKUCharts to also handle profiles


// =========================================
// LEAFLET INDIA MAPS MODULE v4
// Fetches real India GeoJSON at runtime
// Full country with all states + proper boundaries
// =========================================
const riMapInstances = {};
let riIndiaGeoCache = null; // cache so we only fetch once

function riDestroyMap(id){
  if(riMapInstances[id]){ try{riMapInstances[id].remove();}catch(e){} delete riMapInstances[id]; }
}

// Fetch real India GeoJSON (proper state boundaries, all 28 states + UTs)
// Uses naturalearth-style simplified boundaries via a public CDN
async function riGetIndiaGeo(){
  if(riIndiaGeoCache) return riIndiaGeoCache;
  // Try multiple CDN sources
  const urls = [
    'https://cdn.jsdelivr.net/npm/india-geojson@1.0.0/india.json',
    'https://raw.githubusercontent.com/geohacker/india/master/state/india_telengana.geojson',
  ];
  for(const url of urls){
    try{
      const r = await fetch(url);
      if(r.ok){ riIndiaGeoCache = await r.json(); return riIndiaGeoCache; }
    }catch(e){}
  }
  return null;
}

// ---- Data maps per screen ----
const RI_SDATA = {
  activity:{
    'Punjab':          {v:85,label:'Very High',extra:'1,824 active retailers'},
    'Haryana':         {v:78,label:'Very High',extra:'1,420 active retailers'},
    'Delhi':           {v:72,label:'Very High',extra:'340 active retailers'},
    'Uttarakhand':     {v:68,label:'High',     extra:'842 active retailers'},
    'Himachal Pradesh':{v:55,label:'High',     extra:'480 active retailers'},
    'Gujarat':         {v:62,label:'High',     extra:'2,180 active retailers'},
    'West Bengal':     {v:58,label:'High',     extra:'1,940 active retailers'},
    'Maharashtra':     {v:55,label:'High',     extra:'3,820 active retailers'},
    'Karnataka':       {v:52,label:'High',     extra:'2,140 active retailers'},
    'Telangana':       {v:48,label:'Medium',   extra:'1,540 active retailers'},
    'Tamil Nadu':      {v:48,label:'Medium',   extra:'2,020 active retailers'},
    'Andhra Pradesh':  {v:44,label:'Medium',   extra:'1,820 active retailers'},
    'Uttar Pradesh':   {v:44,label:'Medium',   extra:'5,240 active retailers'},
    'Assam':           {v:42,label:'Medium',   extra:'980 active retailers'},
    'Madhya Pradesh':  {v:41,label:'Medium',   extra:'2,960 active retailers'},
    'Rajasthan':       {v:38,label:'Medium',   extra:'2,140 active retailers'},
    'Kerala':          {v:35,label:'Medium',   extra:'1,120 active retailers'},
    'Chhattisgarh':    {v:25,label:'Low',      extra:'820 active retailers'},
    'Odisha':          {v:28,label:'Low',      extra:'1,040 active retailers'},
    'Jharkhand':       {v:19,label:'Very Low', extra:'480 active retailers'},
    'Bihar':           {v:22,label:'Very Low', extra:'1,240 active retailers'},
    'Manipur':         {v:31,label:'Low',      extra:'180 active retailers'},
    'Meghalaya':       {v:28,label:'Low',      extra:'140 active retailers'},
    'Nagaland':        {v:22,label:'Very Low', extra:'90 active retailers'},
    'Mizoram':         {v:18,label:'Very Low', extra:'70 active retailers'},
    'Tripura':         {v:26,label:'Low',      extra:'120 active retailers'},
    'Arunachal Pradesh':{v:15,label:'Very Low',extra:'60 active retailers'},
    'Sikkim':          {v:20,label:'Very Low', extra:'40 active retailers'},
    'Goa':             {v:45,label:'Medium',   extra:'210 active retailers'},
    'Jammu and Kashmir':{v:30,label:'Low',     extra:'280 active retailers'},
    'Ladakh':          {v:12,label:'Very Low', extra:'45 active retailers'},
  },
  coverage:{
    'Punjab':          {v:72.4,villages:'12,845'}, 'Haryana':      {v:68.1,villages:'11,209'},
    'Gujarat':         {v:61.3,villages:'9,845'},  'Maharashtra':  {v:55.6,villages:'18,765'},
    'Karnataka':       {v:52.8,villages:'14,521'}, 'Tamil Nadu':   {v:48.3,villages:'10,214'},
    'Telangana':       {v:46.8,villages:'8,920'},  'Andhra Pradesh':{v:44.2,villages:'11,320'},
    'Madhya Pradesh':  {v:41.2,villages:'12,632'}, 'West Bengal':  {v:38.4,villages:'9,240'},
    'Uttarakhand':     {v:38.0,villages:'5,120'},  'Kerala':       {v:35.0,villages:'5,840'},
    'Uttar Pradesh':   {v:32.6,villages:'21,874'}, 'Assam':        {v:31.5,villages:'6,180'},
    'Rajasthan':       {v:29.8,villages:'8,452'},  'Odisha':       {v:26.1,villages:'5,680'},
    'Bihar':           {v:22.7,villages:'4,125'},  'Chhattisgarh': {v:22.0,villages:'4,820'},
    'Jharkhand':       {v:18.5,villages:'3,240'},  'Delhi':        {v:80.0,villages:'180'},
    'Himachal Pradesh':{v:55.0,villages:'6,420'},  'Goa':          {v:58.0,villages:'340'},
    'Manipur':         {v:24.0,villages:'580'},    'Tripura':      {v:28.0,villages:'420'},
    'Meghalaya':       {v:20.0,villages:'380'},    'Nagaland':     {v:16.0,villages:'280'},
  },
  sku:{
    'Punjab':          {v:72.4,topSKU:'Nano DAP'}, 'Haryana':        {v:68.1,topSKU:'Urea'},
    'Gujarat':         {v:61.3,topSKU:'DAP'},       'Maharashtra':    {v:55.6,topSKU:'MOP'},
    'Karnataka':       {v:52.8,topSKU:'Delegate'},  'Tamil Nadu':     {v:42.3,topSKU:'MOP'},
    'Telangana':       {v:46.8,topSKU:'Urea'},      'Andhra Pradesh': {v:38.9,topSKU:'DAP'},
    'Uttar Pradesh':   {v:48.6,topSKU:'Urea'},      'Madhya Pradesh': {v:44.1,topSKU:'DAP'},
    'Rajasthan':       {v:38.2,topSKU:'Nano DAP'},  'West Bengal':    {v:34.8,topSKU:'SAAF'},
    'Bihar':           {v:22.7,topSKU:'Urea'},      'Kerala':         {v:35.0,topSKU:'Delegate'},
    'Assam':           {v:31.5,topSKU:'Urea'},      'Odisha':         {v:26.1,topSKU:'DAP'},
    'Chhattisgarh':    {v:22.0,topSKU:'Urea'},      'Jharkhand':      {v:18.5,topSKU:'DAP'},
    'Goa':             {v:44.0,topSKU:'MOP'},        'Delhi':          {v:68.0,topSKU:'Nano DAP'},
  },
  fraud:{
    'Bihar':           {v:98,label:'Very High'}, 'Uttar Pradesh':   {v:72,label:'High'},
    'Jharkhand':       {v:42,label:'Medium'},    'Rajasthan':       {v:45,label:'Medium'},
    'West Bengal':     {v:38,label:'Medium'},    'Odisha':          {v:32,label:'Medium'},
    'Madhya Pradesh':  {v:28,label:'Low'},       'Chhattisgarh':    {v:25,label:'Low'},
    'Maharashtra':     {v:22,label:'Low'},       'Haryana':         {v:20,label:'Low'},
    'Gujarat':         {v:18,label:'Very Low'},  'Karnataka':       {v:15,label:'Very Low'},
    'Punjab':          {v:12,label:'Very Low'},  'Tamil Nadu':      {v:10,label:'Very Low'},
    'Andhra Pradesh':  {v:14,label:'Very Low'},  'Telangana':       {v:16,label:'Very Low'},
    'Assam':           {v:30,label:'Low'},       'Tripura':         {v:22,label:'Low'},
  },
};

// Color scales
function riActCol(v){return v>=70?'#10B981':v>=50?'#34D399':v>=30?'#F59E0B':v>=10?'#F97316':'#EF4444';}
function riCovCol(v){return v>=60?'#10B981':v>=45?'#34D399':v>=30?'#F59E0B':v>=15?'#F97316':'#EF4444';}
function riSKUCol(v){return v>=60?'#10B981':v>=40?'#34D399':v>=25?'#F59E0B':'#EF4444';}
function riFrdCol(v){return v>=80?'#EF4444':v>=50?'#F97316':v>=25?'#F59E0B':v>=10?'#3B82F6':'#10B981';}

// Tooltip HTML helpers
function riTip(rows){ return `<div style="background:#0B1220;border:1px solid #334155;border-radius:8px;padding:10px 13px;font-family:'DM Sans',sans-serif;min-width:158px;box-shadow:0 8px 24px rgba(0,0,0,0.7);">${rows}</div>`; }
function riTipRow(l,v,c){ return `<div style="display:flex;justify-content:space-between;gap:16px;font-size:11px;margin-bottom:3px;"><span style="color:#94A3B8;">${l}</span><span style="color:${c||'#F8FAFC'};font-weight:600;">${v}</span></div>`; }
function riTipHead(name,color){ return `<div style="display:flex;align-items:center;gap:7px;font-weight:600;color:#F8FAFC;font-size:12px;margin-bottom:7px;padding-bottom:6px;border-bottom:1px solid #1E293B;"><div style="width:9px;height:9px;border-radius:50%;background:${color};flex-shrink:0;"></div>${name}</div>`; }

// Identify state name from GeoJSON feature (handles various property names)
function riStateName(f){
  const p = f.properties;
  return p.NAME_1 || p.name || p.NAME || p.ST_NM || p.statename || p.State || '';
}

// Build a Leaflet map with proper dark background, no tiles needed
const RI_BOUNDS = [[6,68],[37,98]];

function riMakeMap(id){
  riDestroyMap(id);
  const el = document.getElementById(id);
  if(!el) return null;
  const map = L.map(id, {
    zoomControl:false, scrollWheelZoom:true, dragging:true,
    doubleClickZoom:true, attributionControl:false, preferCanvas:false
  });
  map.fitBounds(RI_BOUNDS);
  riMapInstances[id] = map;

  // Dark ocean/background — fill world then Indian Ocean area
  L.rectangle([[-90,-180],[90,180]], {
    color:'transparent', fillColor:'#0A1628', fillOpacity:1, interactive:false
  }).addTo(map);

  L.control.zoom({position:'bottomright'}).addTo(map);
  return map;
}

// Load GeoJSON and render colored state layer
async function riRenderStateMap(containerId, colorFn, dataMap, tooltipFn, opacityFn){
  const map = riMakeMap(containerId);
  if(!map) return;

  // Show loading spinner inside map
  const el = document.getElementById(containerId);
  const spinner = document.createElement('div');
  spinner.id = containerId+'_spin';
  spinner.style.cssText = 'position:absolute;inset:0;display:flex;align-items:center;justify-content:center;z-index:500;pointer-events:none;';
  spinner.innerHTML = '<div style="width:32px;height:32px;border:3px solid #1E293B;border-top-color:#10B981;border-radius:50%;animation:ri-spin 0.8s linear infinite;"></div>';
  if(el) el.style.position='relative', el.appendChild(spinner);

  const geo = await riGetIndiaGeo();
  // Remove spinner
  const sp = document.getElementById(containerId+'_spin');
  if(sp) sp.remove();

  if(!geo){ renderFallbackMap(map, dataMap, colorFn); return; }

  L.geoJSON(geo, {
    style(f){
      const name = riStateName(f);
      const d = dataMap[name];
      const c = d ? colorFn(d.v) : '#1A2F4A';
      return {
        fillColor: c,
        fillOpacity: d ? (opacityFn ? opacityFn(d.v) : 0.75) : 0.20,
        color: '#0B1D2E', weight: 1.2, opacity: 0.9,
      };
    },
    onEachFeature(f, layer){
      const name = riStateName(f);
      const d = dataMap[name];
      const c = d ? colorFn(d.v) : '#1A2F4A';
      const baseOpacity = d ? (opacityFn ? opacityFn(d.v) : 0.75) : 0.20;
      if(d){
        layer.bindTooltip(tooltipFn(name, d), {
          sticky:true, opacity:1, className:'ri-leaflet-tooltip'
        });
      }
      layer.on('mouseover', function(){
        this.setStyle({fillOpacity: Math.min(baseOpacity + 0.18, 0.95), color:'#3B82F6', weight:2});
        this.bringToFront();
      });
      layer.on('mouseout', function(){
        this.setStyle({fillOpacity: baseOpacity, color:'#0B1D2E', weight:1.2});
      });
    }
  }).addTo(map);
}

// Fallback: circle markers when GeoJSON fetch fails (offline)
function renderFallbackMap(map, dataMap, colorFn){
  const centroids = {
    'Punjab':[31.15,75.34],'Haryana':[29.06,76.09],'Delhi':[28.70,77.10],
    'Gujarat':[22.26,71.19],'Maharashtra':[19.75,75.71],'Karnataka':[15.32,75.71],
    'Tamil Nadu':[11.13,78.66],'Andhra Pradesh':[15.91,79.74],'Telangana':[18.11,79.02],
    'Uttar Pradesh':[26.85,80.95],'Madhya Pradesh':[22.97,78.66],'Rajasthan':[27.02,74.22],
    'Bihar':[25.10,85.31],'West Bengal':[22.99,87.85],'Odisha':[20.95,85.10],
    'Jharkhand':[23.61,85.28],'Chhattisgarh':[21.28,81.87],'Assam':[26.20,92.94],
    'Kerala':[10.85,76.27],'Uttarakhand':[30.07,79.02],'Himachal Pradesh':[31.10,77.17],
    'Jammu and Kashmir':[33.78,76.58],'Goa':[15.30,74.00],
  };
  Object.entries(dataMap).forEach(([name, d])=>{
    const ll = centroids[name]; if(!ll) return;
    const c = colorFn(d.v);
    L.circle(ll, {radius:80000+d.v*1200, color:c, weight:1, fillColor:c, fillOpacity:0.45}).addTo(map);
    L.circleMarker(ll, {radius:4, color:'#fff', weight:1, fillColor:c, fillOpacity:1}).addTo(map);
  });
}

// ─── Keyframe animation for spinner ───
if(!document.getElementById('ri-spin-style')){
  const s = document.createElement('style');
  s.id = 'ri-spin-style';
  s.textContent = '@keyframes ri-spin{to{transform:rotate(360deg)}}';
  document.head.appendChild(s);
}

// ─── The 4 public map functions ───

function riInitActivityMap(id){
  riRenderStateMap(id, riActCol, RI_SDATA.activity,
    (n,d)=>riTip(riTipHead(n,riActCol(d.v))+riTipRow('Activity',d.v+'%',riActCol(d.v))+riTipRow('Status',d.label)+`<div style="font-size:10px;color:#64748B;margin-top:5px;">${d.extra}</div>`),
    v=>0.52+v*0.004
  );
}

function riInitSKUMap(id){
  riRenderStateMap(id, riSKUCol, RI_SDATA.sku,
    (n,d)=>riTip(riTipHead(n,riSKUCol(d.v))+riTipRow('Penetration',d.v+'%',riSKUCol(d.v))+riTipRow('Top SKU',d.topSKU)),
    v=>0.52+v*0.005
  ).then(()=>{
    // Add central badge after map renders
    const map = riMapInstances[id]; if(!map) return;
    const badge = L.divIcon({
      html:`<div style="background:rgba(11,18,32,0.93);border:1px solid #1E293B;border-radius:8px;padding:7px 11px;text-align:center;white-space:nowrap;font-family:'DM Sans',sans-serif;pointer-events:none;box-shadow:0 4px 16px rgba(0,0,0,0.5);">
        <div style="font-size:9px;color:#64748B;margin-bottom:1px;">All India Penetration</div>
        <div style="font-size:16px;font-weight:700;color:#10B981;">46.8%</div>
        <div style="font-size:9px;color:#10B981;">▲ 6.3% vs last month</div>
      </div>`,
      className:'', iconAnchor:[58,36]
    });
    L.marker([22,80],{icon:badge,interactive:false}).addTo(map);
  });
}

function riInitCoverageMap(id){
  riRenderStateMap(id, riCovCol, RI_SDATA.coverage,
    (n,d)=>riTip(riTipHead(n,riCovCol(d.v))+riTipRow('Coverage',d.v+'%',riCovCol(d.v))+riTipRow('Villages',d.villages)),
    v=>0.52+v*0.005
  ).then(()=>{
    const map = riMapInstances[id]; if(!map) return;
    const badge = L.divIcon({
      html:`<div style="background:rgba(5,8,22,0.93);border:1px solid #10B981;border-radius:20px;padding:4px 13px;white-space:nowrap;font-family:'DM Sans',sans-serif;pointer-events:none;">
        <span style="font-size:11px;color:#10B981;font-weight:600;">India Overall 38.6%</span>
      </div>`,
      className:'', iconAnchor:[72,12]
    });
    L.marker([9,79],{icon:badge,interactive:false}).addTo(map);
  });
}

function riInitFraudMap(id){
  riRenderStateMap(id, riFrdCol, RI_SDATA.fraud,
    (n,d)=>riTip(riTipHead(n,riFrdCol(d.v))+riTipRow('Fraud Score',String(d.v),riFrdCol(d.v))+riTipRow('Risk Level',d.label,riFrdCol(d.v))),
    v=>0.35+v*0.006
  );
}

// Clean up maps on screen change
const _riNavBase = riNavigate;
riNavigate = function(screenId){
  Object.keys(riMapInstances).forEach(riDestroyMap);
  _riNavBase(screenId);
};
