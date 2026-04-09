/* ========= CSS VARIABLES ========= */
:root {
  --bg: #0a0e0f;
  --bg2: #0f1419;
  --bg3: #141c22;
  --bg4: #1a2430;
  --card: #111920;
  --card2: #162028;
  --border: #1e2d3a;
  --border2: #243545;
  --green: #22c55e;
  --green2: #16a34a;
  --green-dim: rgba(34,197,94,0.12);
  --green-glow: rgba(34,197,94,0.25);
  --blue: #3b82f6;
  --blue-dim: rgba(59,130,246,0.15);
  --red: #ef4444;
  --red-dim: rgba(239,68,68,0.15);
  --orange: #f59e0b;
  --orange-dim: rgba(245,158,11,0.15);
  --purple: #8b5cf6;
  --purple-dim: rgba(139,92,246,0.15);
  --text: #e2e8f0;
  --text2: #94a3b8;
  --text3: #64748b;
  --sidebar-w: 200px;
  --topnav-h: 52px;
  --radius: 10px;
  --radius-sm: 6px;
}

* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text); min-height: 100vh; overflow-x: hidden; }

/* ========= SCROLLBAR ========= */
::-webkit-scrollbar { width: 4px; height: 4px; }
::-webkit-scrollbar-track { background: var(--bg2); }
::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 2px; }

/* ========= TOPNAV ========= */
.topnav { position: fixed; top: 0; left: 0; right: 0; height: var(--topnav-h); background: var(--bg2); border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; padding: 0 16px; z-index: 100; }
.topnav-left { display: flex; align-items: center; gap: 12px; }
.logo { display: flex; align-items: center; gap: 8px; min-width: 150px; }
.logo-text { font-size: 16px; font-weight: 700; color: var(--text); }
.logo-green { color: var(--green); }
.menu-btn { background: none; border: none; color: var(--text2); cursor: pointer; padding: 6px; border-radius: var(--radius-sm); transition: background 0.2s; }
.menu-btn:hover { background: var(--bg4); }
.search-bar { display: flex; align-items: center; gap: 8px; background: var(--bg4); border: 1px solid var(--border); border-radius: 20px; padding: 6px 14px; min-width: 260px; }
.search-bar input { background: none; border: none; outline: none; color: var(--text2); font-size: 13px; width: 220px; font-family: 'Inter', sans-serif; }
.search-bar svg { color: var(--text3); flex-shrink: 0; }
.topnav-right { display: flex; align-items: center; gap: 10px; }
.icon-btn { position: relative; background: none; border: none; color: var(--text2); cursor: pointer; padding: 6px; border-radius: var(--radius-sm); transition: all 0.2s; }
.icon-btn:hover { background: var(--bg4); color: var(--text); }
.badge { position: absolute; top: 2px; right: 2px; background: var(--red); color: #fff; font-size: 9px; font-weight: 700; width: 14px; height: 14px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
.user-avatar { width: 32px; height: 32px; border-radius: 50%; background: var(--green2); color: #fff; font-size: 13px; font-weight: 700; display: flex; align-items: center; justify-content: center; cursor: pointer; }
.user-info { display: flex; flex-direction: column; }
.user-name { font-size: 13px; font-weight: 600; color: var(--text); line-height: 1.2; }
.user-role { font-size: 11px; color: var(--text3); }

/* ========= SIDEBAR ========= */
.sidebar { position: fixed; left: 0; top: var(--topnav-h); bottom: 0; width: var(--sidebar-w); background: var(--bg2); border-right: 1px solid var(--border); display: flex; flex-direction: column; overflow-y: auto; z-index: 90; transition: width 0.25s; }
.sidebar.collapsed { width: 52px; }
.sidebar.collapsed .company-info, .sidebar.collapsed .company-name, .sidebar.collapsed .company-sub { display: none; }
.sidebar.collapsed .nav-label { display: none; }
.sidebar.collapsed .company-selector { justify-content: center; padding: 10px; }
.sidebar.collapsed .side-nav-item { justify-content: center; padding: 10px; }
.company-selector { display: flex; align-items: center; gap: 8px; padding: 12px; border-bottom: 1px solid var(--border); cursor: pointer; }
.company-selector:hover { background: var(--bg4); }
.company-logo img { width: 36px; height: 36px; border-radius: 8px; }
.company-name { font-size: 13px; font-weight: 600; color: var(--text); }
.company-sub { font-size: 11px; color: var(--text3); }
.side-nav { flex: 1; padding: 8px 0; }
.side-nav-item { display: flex; align-items: center; gap: 10px; padding: 9px 14px; color: var(--text2); text-decoration: none; font-size: 13px; font-weight: 500; border-radius: 0; cursor: pointer; transition: all 0.15s; white-space: nowrap; overflow: hidden; border: none; background: none; width: 100%; text-align: left; }
.side-nav-item:hover { background: var(--bg4); color: var(--text); }
.side-nav-item.active { background: var(--green-dim); color: var(--green); border-left: 2px solid var(--green); }
.nav-icon { display: flex; flex-shrink: 0; }
.nav-badge { margin-left: auto; background: var(--green); color: #000; font-size: 10px; font-weight: 700; padding: 1px 6px; border-radius: 10px; }
.sidebar-footer { padding: 12px; border-top: 1px solid var(--border); }
.help-box { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
.help-icon { width: 28px; height: 28px; border-radius: 50%; background: var(--green-dim); border: 1px solid var(--green); color: var(--green); font-size: 13px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.help-title { font-size: 12px; font-weight: 600; color: var(--text); }
.help-sub { font-size: 10px; color: var(--text3); }
.contact-btn { width: 100%; padding: 7px; background: var(--green-dim); border: 1px solid var(--green); color: var(--green); border-radius: var(--radius-sm); font-size: 12px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
.contact-btn:hover { background: var(--green); color: #000; }

/* ========= MAIN CONTENT ========= */
.main-content { margin-left: var(--sidebar-w); margin-top: var(--topnav-h); padding: 20px; min-height: calc(100vh - var(--topnav-h)); overflow-y: auto; transition: margin-left 0.25s; }
.main-content.expanded { margin-left: 52px; }

/* ========= SCREEN ========= */
.screen { display: none; }
.screen.active { display: block; }

/* ========= PAGE HEADER ========= */
.page-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 16px; }
.page-title { font-size: 22px; font-weight: 700; color: var(--text); display: flex; align-items: center; gap: 8px; }
.page-title svg { color: var(--green); }
.page-sub { font-size: 13px; color: var(--text3); margin-top: 2px; }
.header-actions { display: flex; align-items: center; gap: 8px; }

/* ========= FILTER BAR ========= */
.filter-bar { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; flex-wrap: wrap; }
.filter-select { display: flex; flex-direction: column; gap: 3px; }
.filter-label { font-size: 10px; color: var(--text3); text-transform: uppercase; letter-spacing: 0.5px; }
.filter-select select, .filter-select-btn { background: var(--bg4); border: 1px solid var(--border2); color: var(--text2); border-radius: var(--radius-sm); padding: 6px 10px; font-size: 12px; outline: none; cursor: pointer; font-family: 'Inter', sans-serif; min-width: 120px; }
.filter-select select:hover, .filter-select-btn:hover { border-color: var(--green); }

/* ========= METRIC CARDS ========= */
.metrics-row { display: flex; gap: 10px; margin-bottom: 16px; flex-wrap: wrap; }
.metric-card { flex: 1; min-width: 130px; background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 14px; display: flex; flex-direction: column; gap: 6px; position: relative; overflow: hidden; transition: border-color 0.2s; }
.metric-card:hover { border-color: var(--border2); }
.metric-card .mc-label { font-size: 11px; color: var(--text3); font-weight: 500; }
.metric-card .mc-value { font-size: 22px; font-weight: 700; color: var(--text); line-height: 1; }
.metric-card .mc-change { font-size: 11px; display: flex; align-items: center; gap: 4px; }
.mc-change.up { color: var(--green); }
.mc-change.down { color: var(--red); }
.mc-icon { position: absolute; top: 12px; right: 12px; width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
.mc-icon.green { background: var(--green-dim); color: var(--green); }
.mc-icon.blue { background: var(--blue-dim); color: var(--blue); }
.mc-icon.purple { background: var(--purple-dim); color: var(--purple); }
.mc-icon.orange { background: var(--orange-dim); color: var(--orange); }
.mc-icon.red { background: var(--red-dim); color: var(--red); }

/* ========= GRID LAYOUTS ========= */
.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px; }
.grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; margin-bottom: 14px; }
.grid-4 { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 14px; margin-bottom: 14px; }
.grid-main-side { display: grid; grid-template-columns: 1fr 300px; gap: 14px; margin-bottom: 14px; }
.grid-3-1 { display: grid; grid-template-columns: 1fr 1fr 1fr 300px; gap: 14px; margin-bottom: 14px; }

/* ========= CARD ========= */
.card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 16px; }
.card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
.card-title { font-size: 14px; font-weight: 600; color: var(--text); }
.card-sub { font-size: 11px; color: var(--text3); margin-top: 2px; }
.card-link { font-size: 12px; color: var(--green); text-decoration: none; cursor: pointer; }
.card-link:hover { text-decoration: underline; }

/* ========= TABLE ========= */
.data-table { width: 100%; border-collapse: collapse; }
.data-table th { font-size: 11px; font-weight: 600; color: var(--text3); text-transform: uppercase; letter-spacing: 0.5px; padding: 8px 10px; border-bottom: 1px solid var(--border); text-align: left; }
.data-table td { font-size: 12px; color: var(--text2); padding: 10px 10px; border-bottom: 1px solid var(--border); }
.data-table tr:last-child td { border-bottom: none; }
.data-table tr:hover td { background: var(--bg4); }
.data-table td.num { color: var(--text); font-weight: 600; }

/* ========= BADGES ========= */
.badge-score { display: inline-flex; align-items: center; justify-content: center; min-width: 28px; height: 22px; border-radius: var(--radius-sm); font-size: 11px; font-weight: 700; padding: 0 6px; }
.badge-score.high { background: var(--green-dim); color: var(--green); }
.badge-score.med { background: var(--orange-dim); color: var(--orange); }
.badge-score.low { background: var(--red-dim); color: var(--red); }
.tag { display: inline-flex; align-items: center; padding: 2px 8px; border-radius: 10px; font-size: 11px; font-weight: 500; }
.tag.green { background: var(--green-dim); color: var(--green); }
.tag.red { background: var(--red-dim); color: var(--red); }
.tag.orange { background: var(--orange-dim); color: var(--orange); }
.tag.blue { background: var(--blue-dim); color: var(--blue); }

/* ========= TREND INDICATORS ========= */
.trend-up { color: var(--green); font-size: 11px; font-weight: 600; }
.trend-down { color: var(--red); font-size: 11px; font-weight: 600; }

/* ========= BUTTONS ========= */
.btn { display: inline-flex; align-items: center; gap: 6px; padding: 7px 14px; border-radius: var(--radius-sm); font-size: 12px; font-weight: 600; cursor: pointer; border: none; transition: all 0.2s; font-family: 'Inter', sans-serif; }
.btn-green { background: var(--green); color: #000; }
.btn-green:hover { background: #16a34a; }
.btn-outline { background: transparent; border: 1px solid var(--border2); color: var(--text2); }
.btn-outline:hover { border-color: var(--green); color: var(--green); }
.btn-red { background: var(--red-dim); border: 1px solid var(--red); color: var(--red); }
.btn-sm { padding: 5px 10px; font-size: 11px; }
.btn-blue { background: var(--blue-dim); border: 1px solid var(--blue); color: var(--blue); }

/* ========= PROGRESS BAR ========= */
.progress-bar { width: 100%; height: 6px; background: var(--bg4); border-radius: 3px; overflow: hidden; }
.progress-fill { height: 100%; border-radius: 3px; transition: width 0.6s ease; }
.progress-fill.green { background: var(--green); }
.progress-fill.orange { background: var(--orange); }
.progress-fill.red { background: var(--red); }
.progress-fill.blue { background: var(--blue); }

/* ========= CHART PLACEHOLDER ========= */
.chart-container { position: relative; height: 180px; }
.mini-chart { height: 100%; width: 100%; }

/* ========= INDIA MAP (CSS Art) ========= */
.map-placeholder { width: 100%; height: 260px; background: var(--bg4); border-radius: var(--radius); position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; }
.map-placeholder canvas { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }

/* ========= ALERTS PANEL ========= */
.alerts-panel { display: flex; flex-direction: column; gap: 8px; }
.alert-item { display: flex; align-items: flex-start; gap: 10px; padding: 10px; background: var(--bg4); border-radius: var(--radius-sm); border-left: 3px solid transparent; }
.alert-item.red { border-left-color: var(--red); }
.alert-item.orange { border-left-color: var(--orange); }
.alert-item.blue { border-left-color: var(--blue); }
.alert-item.yellow { border-left-color: var(--orange); }
.alert-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; margin-top: 4px; }
.alert-dot.red { background: var(--red); }
.alert-dot.orange { background: var(--orange); }
.alert-dot.blue { background: var(--blue); }
.alert-title { font-size: 12px; font-weight: 600; color: var(--text); }
.alert-desc { font-size: 11px; color: var(--text3); margin-top: 2px; }

/* ========= AI RECOMMENDATION BOX ========= */
.ai-rec-box { background: var(--bg4); border: 1px solid var(--border2); border-radius: var(--radius); padding: 14px; }
.ai-rec-label { font-size: 10px; color: var(--text3); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; }
.ai-rec-title { font-size: 13px; font-weight: 600; color: var(--text); margin-bottom: 4px; }
.ai-rec-text { font-size: 12px; color: var(--text2); margin-bottom: 10px; line-height: 1.5; }
.ai-rec-highlight { color: var(--green); font-weight: 600; }

/* ========= DONUT CHART ========= */
.donut-wrap { display: flex; align-items: center; gap: 16px; }
.donut-svg { flex-shrink: 0; }
.donut-legend { display: flex; flex-direction: column; gap: 6px; }
.donut-legend-item { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--text2); }
.legend-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }

/* ========= TASK LIST ========= */
.task-item { display: flex; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 1px solid var(--border); }
.task-item:last-child { border-bottom: none; }
.task-icon { width: 30px; height: 30px; border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.task-name { font-size: 13px; font-weight: 500; color: var(--text); }
.task-sub { font-size: 11px; color: var(--text3); }
.task-progress { flex: 1; display: flex; flex-direction: column; gap: 3px; max-width: 80px; }
.task-count { font-size: 11px; color: var(--text3); text-align: right; }

/* ========= COVERAGE RING ========= */
.coverage-wrap { display: flex; align-items: center; gap: 20px; }

/* ========= NOTIFICATION PANEL ========= */
.notif-panel { position: fixed; top: var(--topnav-h); right: 0; width: 320px; background: var(--bg2); border-left: 1px solid var(--border); height: calc(100vh - var(--topnav-h)); overflow-y: auto; z-index: 95; transform: translateX(100%); transition: transform 0.25s; padding: 16px; }
.notif-panel.open { transform: translateX(0); }
.notif-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; font-size: 14px; font-weight: 600; }
.notif-header button { background: none; border: none; color: var(--text3); cursor: pointer; font-size: 16px; }
.notif-item { display: flex; align-items: flex-start; gap: 10px; padding: 10px; border-radius: var(--radius-sm); margin-bottom: 8px; background: var(--bg4); cursor: pointer; }
.notif-item:hover { background: var(--card2); }
.notif-dot { width: 8px; height: 8px; border-radius: 50%; margin-top: 5px; flex-shrink: 0; }
.notif-dot.red { background: var(--red); }
.notif-dot.blue { background: var(--blue); }
.notif-dot.yellow { background: var(--orange); }
.notif-dot.orange { background: var(--orange); }
.notif-title { font-size: 13px; font-weight: 600; color: var(--text); }
.notif-desc { font-size: 11px; color: var(--text3); margin-top: 2px; }

/* ========= COVERAGE GAP BOXES ========= */
.gap-stat { display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 14px; background: var(--bg4); border-radius: var(--radius-sm); flex: 1; text-align: center; }
.gap-stat .gs-val { font-size: 24px; font-weight: 700; }
.gap-stat .gs-label { font-size: 11px; color: var(--text3); }

/* ========= TABS ========= */
.tabs { display: flex; gap: 0; border-bottom: 1px solid var(--border); margin-bottom: 16px; }
.tab-item { padding: 10px 16px; font-size: 13px; font-weight: 500; color: var(--text3); cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -1px; transition: all 0.2s; }
.tab-item:hover { color: var(--text); }
.tab-item.active { color: var(--green); border-bottom-color: var(--green); }

/* ========= STREAK BOX ========= */
.streak-box { background: linear-gradient(135deg, #92400e, #d97706); border-radius: var(--radius); padding: 14px; display: flex; align-items: center; gap: 12px; }
.streak-icon { font-size: 24px; }
.streak-val { font-size: 24px; font-weight: 700; color: #fff; }
.streak-label { font-size: 12px; color: rgba(255,255,255,0.8); }

/* ========= TODAY PLAN ========= */
.plan-timeline { display: flex; flex-direction: column; gap: 0; }
.plan-item { display: flex; align-items: flex-start; gap: 10px; padding: 8px 0; position: relative; }
.plan-item::before { content: ''; position: absolute; left: 8px; top: 24px; bottom: -8px; width: 1px; background: var(--border); }
.plan-item:last-child::before { display: none; }
.plan-dot { width: 16px; height: 16px; border-radius: 50%; background: var(--bg4); border: 2px solid var(--border2); flex-shrink: 0; margin-top: 3px; }
.plan-dot.done { background: var(--green); border-color: var(--green); }
.plan-dot.active { background: var(--orange); border-color: var(--orange); }
.plan-time { font-size: 11px; color: var(--text3); min-width: 45px; }
.plan-text { font-size: 12px; color: var(--text2); }

/* ========= FIELD AGENT DASHBOARD ========= */
.progress-target-box { background: var(--bg4); border: 1px solid var(--border); border-radius: var(--radius); padding: 14px; text-align: center; }
.pt-label { font-size: 11px; color: var(--text3); }
.pt-val { font-size: 18px; font-weight: 700; color: var(--text); }

/* ========= VERIFIED SALES ========= */
.roi-bridge { display: flex; align-items: flex-end; gap: 6px; height: 120px; }
.bridge-bar { display: flex; flex-direction: column; align-items: center; gap: 4px; flex: 1; }
.bridge-bar-fill { width: 100%; border-radius: 4px 4px 0 0; }
.bridge-label { font-size: 9px; color: var(--text3); text-align: center; line-height: 1.2; }
.bridge-val { font-size: 10px; color: var(--green); font-weight: 600; }

/* ========= MAP DISTRICT BLOCK ========= */
.district-map { height: 220px; background: var(--bg4); border-radius: var(--radius); display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; }

/* ========= GEOGRAPHY TREE ========= */
.geo-tree { font-size: 12px; }
.geo-tree-item { display: flex; align-items: center; gap: 6px; padding: 5px 8px; border-radius: var(--radius-sm); cursor: pointer; color: var(--text2); }
.geo-tree-item:hover { background: var(--bg4); color: var(--text); }
.geo-tree-item.active { background: var(--green-dim); color: var(--green); }
.geo-tree-children { padding-left: 16px; border-left: 1px solid var(--border); margin-left: 14px; }

/* ========= HIERARCHY TREE ========= */
.org-tree { display: flex; flex-direction: column; align-items: center; gap: 0; overflow-x: auto; }
.org-level { display: flex; gap: 12px; justify-content: center; margin-bottom: 0; }
.org-node { position: relative; }
.org-node-box { border: 2px solid var(--border2); border-radius: var(--radius); padding: 10px 14px; text-align: center; cursor: pointer; transition: all 0.2s; min-width: 100px; background: var(--card); }
.org-node-box:hover { border-color: var(--green); }
.org-node-box.hq { border-color: var(--green); background: var(--green-dim); }
.org-node-box.region { border-color: var(--blue); background: var(--blue-dim); }
.org-node-box.state { border-color: var(--purple); background: var(--purple-dim); }
.org-node-box.territory { border-color: var(--orange); background: var(--orange-dim); }
.org-node-box.agent { border-color: var(--border2); background: var(--bg4); }
.org-connector { display: flex; justify-content: center; height: 24px; }
.org-connector::before { content: ''; width: 1px; height: 100%; background: var(--border2); }
.org-node-title { font-size: 12px; font-weight: 700; color: var(--text); }
.org-node-sub { font-size: 10px; color: var(--text3); margin-top: 2px; }

/* ========= PERMISSIONS TABLE ========= */
.perm-table { width: 100%; border-collapse: collapse; }
.perm-table th { font-size: 11px; font-weight: 600; color: var(--text3); padding: 8px; text-align: center; border-bottom: 1px solid var(--border); }
.perm-table th:first-child { text-align: left; }
.perm-table td { font-size: 12px; padding: 8px; text-align: center; border-bottom: 1px solid var(--border); color: var(--text2); }
.perm-table td:first-child { text-align: left; }
.perm-table tr:hover td { background: var(--bg4); }
.perm-allow { color: var(--green); font-size: 16px; }
.perm-deny { color: var(--red); font-size: 14px; font-weight: 700; }
.perm-partial { color: var(--orange); font-size: 16px; }
.perm-na { color: var(--text3); }
.perm-section { font-weight: 700; color: var(--text); background: var(--bg4) !important; }

/* ========= USER TABLE ========= */
.user-row { display: flex; align-items: center; gap: 10px; padding: 10px 0; border-bottom: 1px solid var(--border); }
.user-row:last-child { border-bottom: none; }
.user-ava { width: 36px; height: 36px; border-radius: 50%; background: var(--bg4); border: 1px solid var(--border2); display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; flex-shrink: 0; }
.user-row-name { font-size: 13px; font-weight: 600; color: var(--text); }
.user-row-email { font-size: 11px; color: var(--text3); }
.status-active { color: var(--green); font-size: 11px; font-weight: 600; }
.status-inactive { color: var(--red); font-size: 11px; font-weight: 600; }

/* ========= QUICK ACTIONS ========= */
.quick-actions-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.qa-item { background: var(--bg4); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 10px; display: flex; flex-direction: column; align-items: center; gap: 6px; cursor: pointer; transition: all 0.2s; }
.qa-item:hover { border-color: var(--green); background: var(--green-dim); }
.qa-icon { width: 32px; height: 32px; border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; }
.qa-label { font-size: 11px; font-weight: 500; color: var(--text2); text-align: center; }

/* ========= MINI SPARKLINE ========= */
.sparkline { display: flex; align-items: flex-end; gap: 2px; height: 24px; }
.spark-bar { flex: 1; border-radius: 2px; min-width: 3px; }
.spark-bar.green { background: var(--green); }
.spark-bar.red { background: var(--red); }
.spark-bar.orange { background: var(--orange); }

/* ========= INSIGHT BOX ========= */
.insight-banner { display: flex; align-items: center; justify-content: space-between; gap: 12px; background: var(--blue-dim); border: 1px solid var(--blue); border-radius: var(--radius); padding: 12px 16px; margin-bottom: 14px; }
.insight-text { font-size: 13px; color: var(--text); }
.insight-text span { color: var(--blue); font-weight: 600; }

/* ========= REGION COLORS FOR MAP ========= */
.region-east { background: #22c55e; }
.region-west { background: #3b82f6; }
.region-north { background: #8b5cf6; }
.region-south { background: #f59e0b; }

/* ========= RESPONSIVE ========= */
@media (max-width: 1200px) {
  .grid-3-1 { grid-template-columns: 1fr 1fr; }
  .grid-4 { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 900px) {
  .grid-2, .grid-3, .grid-main-side { grid-template-columns: 1fr; }
  .metrics-row { flex-wrap: wrap; }
  .metric-card { min-width: calc(50% - 5px); }
}

/* ========= ANIMATIONS ========= */
@keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
.screen.active { animation: fadeIn 0.25s ease; }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
.loading { animation: pulse 1.5s infinite; }

/* ========= TOOLTIP ========= */
[data-tip] { position: relative; cursor: pointer; }
[data-tip]:hover::after { content: attr(data-tip); position: absolute; bottom: 125%; left: 50%; transform: translateX(-50%); background: var(--bg2); border: 1px solid var(--border); color: var(--text2); font-size: 11px; padding: 4px 8px; border-radius: 4px; white-space: nowrap; z-index: 999; pointer-events: none; }

/* ========= WATERFALL / ROI CHART ========= */
.waterfall { display: flex; gap: 6px; align-items: flex-end; height: 160px; padding-top: 20px; position: relative; }
.wf-col { display: flex; flex-direction: column; align-items: center; gap: 4px; flex: 1; }
.wf-label { font-size: 9px; color: var(--text3); text-align: center; line-height: 1.3; }
.wf-bar-wrap { flex: 1; display: flex; align-items: flex-end; width: 100%; }
.wf-bar { width: 100%; border-radius: 3px 3px 0 0; min-height: 4px; }
.wf-val { font-size: 9px; color: var(--green); font-weight: 600; }

/* ========= SKILL VERIFICATION PROGRESS ========= */
.veri-bar { display: flex; gap: 2px; height: 8px; border-radius: 4px; overflow: hidden; background: var(--bg4); }
.veri-seg { height: 100%; }

/* ========= LEADERBOARD ITEMS ========= */
.lb-item { display: flex; align-items: center; gap: 10px; padding: 9px 0; border-bottom: 1px solid var(--border); }
.lb-rank { width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; flex-shrink: 0; }
.lb-rank.gold { background: var(--orange-dim); color: var(--orange); }
.lb-rank.silver { background: var(--bg4); color: var(--text3); }
.lb-rank.bronze { background: var(--red-dim); color: var(--red); }

/* ========= CAMPAIGN TABLE ROWS ========= */
.campaign-row { display: grid; grid-template-columns: 2fr 1.5fr 1fr 1fr 1fr 1fr; gap: 8px; align-items: center; padding: 10px 0; border-bottom: 1px solid var(--border); font-size: 12px; color: var(--text2); }
.campaign-row.header { color: var(--text3); font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.4px; }

/* ========= ACTIVE STATE HELPERS ========= */
.selected-node { outline: 2px solid var(--green); outline-offset: 2px; }

/* ========= SECTION DIVIDERS ========= */
.section-divider { height: 1px; background: var(--border); margin: 16px 0; }
