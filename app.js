'use strict';

// ===== STATE =====
let currentRole = 'hq';
let currentScreen = 'hq-dashboard';
let darkMode = true;
let notifOpen = false;
let chartInstances = {};
let activeNotifTab = 'all';
let unreadCount = 4;

// ===== ICONS =====
const IC = {
  dashboard:`<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
  map:`<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>`,
  users:`<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  campaign:`<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
  retail:`<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  rewards:`<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>`,
  reports:`<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
  approvals:`<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>`,
  tasks:`<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/></svg>`,
  scan:`<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 7 23 1 17 1"/><line x1="16" y1="8" x2="23" y2="1"/><polyline points="1 17 1 23 7 23"/><line x1="8" y1="16" x2="1" y2="23"/></svg>`,
  inventory:`<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
  shield:`<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  verified:`<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>`,
  hierarchy:`<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="5" r="3"/><line x1="12" y1="8" x2="12" y2="13"/><line x1="12" y1="13" x2="6" y2="19"/><line x1="12" y1="13" x2="18" y2="19"/><circle cx="6" cy="19" r="2"/><circle cx="18" cy="19" r="2"/></svg>`,
  star:`<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  settings:`<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>`,
  overview:`<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
};

// ===== HELPERS =====
function upArrow(up){return up?`<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="18 15 12 9 6 15"/></svg>`:`<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="6 9 12 15 18 9"/></svg>`;}
function trendSVG(d){return d==='up'?`<svg width="32" height="16" viewBox="0 0 32 16"><polyline points="0,14 8,10 16,6 24,4 32,2" fill="none" stroke="#22c55e" stroke-width="2"/></svg>`:d==='flat'?`<svg width="32" height="16" viewBox="0 0 32 16"><polyline points="0,8 32,8" fill="none" stroke="#eab308" stroke-width="2"/></svg>`:`<svg width="32" height="16" viewBox="0 0 32 16"><polyline points="0,2 8,4 16,8 24,10 32,14" fill="none" stroke="#ef4444" stroke-width="2"/></svg>`;}
function filterSelect(label,value,id='',opts=[]){return `<div class="filter-group"><label class="filter-label">${label}</label><select class="filter-select"${id?` id="${id}" onchange="onFilterChange(this)"`:''}><option>${value}</option>${opts.map(o=>`<option>${o}</option>`).join('')}</select></div>`;}
function metricCard(m){const ic={sales:'💰',box:'📦',store:'🏪',verified:'🛡️',gift:'🎁',roi:'📈',map:'🗺️',village:'🏘️',sku:'📊',score:'⭐',fire:'🔥'}[m.icon]||'📊';return `<div class="metric-card"><div class="metric-icon ${m.color}">${ic}</div><div class="metric-label">${m.label}</div><div class="metric-value">${m.value}</div>${m.change?`<div class="metric-change ${m.up===false?'down':'up'}">${upArrow(m.up!==false)} ${m.change} <span class="sub">${m.sub||''}</span></div>`:`<div style="font-size:11px;color:var(--text3);margin-top:4px;">${m.sub||''}</div>`}</div>`;}
function alertItem(a){const icons={red:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,blue:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,yellow:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,orange:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>`,green:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`};return `<div class="alert-item"><div class="alert-icon-wrap ${a.type}">${icons[a.type]||icons.blue}</div><div><div class="alert-text">${a.title}</div><div class="alert-sub">${a.sub}</div></div></div>`;}
function buildAlertsPanel(alerts,ai){return `<div class="alerts-sidebar-col"><div><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;"><span style="font-size:13px;font-weight:600;color:var(--text);">Alerts</span><span style="font-size:11px;color:var(--green);cursor:pointer;">View All</span></div><div style="display:flex;flex-direction:column;gap:8px;">${alerts.map(a=>alertItem(a)).join('')}</div></div><div class="ai-rec-card"><div class="ai-rec-label">✨ ${ai.t||'AI Recommendation'}</div><div class="ai-rec-sub">${ai.s||''}</div><div class="ai-rec-text">${ai.b||''}</div>${ai.lift?`<div style="font-size:11px;color:var(--green);margin-bottom:8px;font-weight:600;">${ai.lift}</div>`:''}<button class="btn btn-primary btn-sm" style="width:100%;">${ai.a||'Apply Now'}</button></div></div>`;}

// ===== THEME =====
function getCSSVar(name){return getComputedStyle(document.documentElement).getPropertyValue(name).trim();}
function chartColors(){
  return {
    grid: darkMode?'rgba(30,45,61,0.6)':'rgba(200,215,230,0.6)',
    tick: darkMode?'#475569':'#94a3b8',
    tooltip: { bg: darkMode?'#141c22':'#ffffff', border: darkMode?'#243447':'#d1dce8', text: darkMode?'#e2e8f0':'#0f172a' },
  };
}

function setTheme(dark){
  darkMode = dark;
  document.documentElement.setAttribute('data-theme', dark?'dark':'light');
  // Re-init all active charts with new theme
  const screenId = currentScreen;
  setTimeout(()=>drawChartsForScreen(screenId), 80);
}

// ===== NOTIFICATIONS =====
const NOTIFICATIONS = [
  {id:1,type:'red',cat:'alerts',title:'Low Verification Alert',body:'12 districts have verification rate below 38%. Immediate action required.',time:'10 minutes ago',unread:true},
  {id:2,type:'blue',cat:'updates',title:'Campaign Update',body:'Harvest Boost campaign in East Region achieved 4.5x ROI this week.',time:'25 minutes ago',unread:true},
  {id:3,type:'yellow',cat:'alerts',title:'Budget Approval Pending',body:'₹18.5L campaign budget awaiting your approval.',time:'1 hour ago',unread:true},
  {id:4,type:'orange',cat:'alerts',title:'Territory Coverage Gap',body:'86 villages in UP are currently uncovered by any field agent.',time:'2 hours ago',unread:true},
  {id:5,type:'green',cat:'updates',title:'Target Achieved',body:'Maharashtra exceeded monthly sales target by 15.2%.',time:'4 hours ago',unread:false},
  {id:6,type:'blue',cat:'updates',title:'New Field Agent Onboarded',body:'Pooja Verma (Lucknow Zone 2) completed training and is now active.',time:'Yesterday',unread:false},
  {id:7,type:'yellow',cat:'alerts',title:'SKU Stock Low',body:'Nano Urea stock is critically low in 24 villages.',time:'Yesterday',unread:false},
  {id:8,type:'green',cat:'updates',title:'Report Ready',body:'Monthly Performance Report for April 2024 is ready for download.',time:'2 days ago',unread:false},
];

function openNotifPanel(){
  document.getElementById('notifPanel').classList.add('open');
  document.getElementById('notifOverlay').classList.add('active');
  notifOpen = true;
  renderNotifList(activeNotifTab);
  document.getElementById('markAllRead').onclick = markAllRead;
}
function closeNotifPanel(){
  document.getElementById('notifPanel').classList.remove('open');
  document.getElementById('notifOverlay').classList.remove('active');
  notifOpen = false;
}
function switchNotifTab(btn, tab){
  activeNotifTab = tab;
  document.querySelectorAll('.notif-tab').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  renderNotifList(tab);
}
function markAllRead(){
  NOTIFICATIONS.forEach(n=>n.unread=false);
  unreadCount = 0;
  updateNotifBadge();
  renderNotifList(activeNotifTab);
}
function updateNotifBadge(){
  const badge = document.getElementById('notifBadge');
  if(unreadCount > 0){ badge.textContent = unreadCount; badge.classList.remove('hidden'); }
  else { badge.classList.add('hidden'); }
}
function renderNotifList(tab){
  const list = document.getElementById('notifList');
  const icons={red:'⚠️',blue:'ℹ️',yellow:'⏰',orange:'📍',green:'✅'};
  const colors={red:'red',blue:'blue',yellow:'yellow',orange:'orange',green:'green'};
  const filtered = tab==='all' ? NOTIFICATIONS : NOTIFICATIONS.filter(n=>n.cat===tab);
  list.innerHTML = filtered.length === 0
    ? `<div style="text-align:center;padding:30px;color:var(--text3);font-size:12px;">No notifications</div>`
    : filtered.map(n=>`<div class="notif-item ${n.unread?'unread '+n.type:''}" onclick="markNotifRead(${n.id})">
        <div class="notif-item-icon" style="background:var(--${n.type}-dim);color:var(--${n.type});">${icons[n.type]}</div>
        <div style="flex:1;min-width:0;">
          <div class="notif-item-title">${n.title}</div>
          <div class="notif-item-body">${n.body}</div>
          <div class="notif-item-time">${n.time}</div>
        </div>
        ${n.unread?`<div class="notif-unread-dot"></div>`:''}
      </div>`).join('');
}
function markNotifRead(id){
  const n = NOTIFICATIONS.find(x=>x.id===id);
  if(n && n.unread){ n.unread=false; unreadCount=Math.max(0,unreadCount-1); updateNotifBadge(); renderNotifList(activeNotifTab); }
}

// ===== MAPS =====
const _maps = {};
function destroyMap(id){if(_maps[id]){try{_maps[id].remove();}catch(e){}delete _maps[id];}}
function cosMap(id,lat,lng,zoom){
  destroyMap(id);
  const m = L.map(id,{center:[lat,lng],zoom,zoomControl:true,attributionControl:true,scrollWheelZoom:false});
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'© OpenStreetMap',maxZoom:18}).addTo(m);
  _maps[id]=m; return m;
}
function cosIcon(color,letter){return L.divIcon({className:'',html:`<div style="width:30px;height:30px;border-radius:50% 50% 50% 0;background:${color};transform:rotate(-45deg);border:2px solid rgba(255,255,255,0.85);box-shadow:0 2px 10px rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;"><span style="transform:rotate(45deg);color:#fff;font-size:11px;font-weight:700;font-family:'DM Sans',sans-serif;">${letter||''}</span></div>`,iconSize:[30,30],iconAnchor:[15,30],popupAnchor:[0,-34]});}
function dotIcon(color,size=10){return L.divIcon({className:'',html:`<div style="width:${size}px;height:${size}px;border-radius:50%;background:${color};border:1.5px solid rgba(255,255,255,0.5);box-shadow:0 0 7px ${color}90;"></div>`,iconSize:[size,size],iconAnchor:[size/2,size/2],popupAnchor:[0,-(size/2+4)]});}
function mkPopup(title,rows,badge){return `<div class="popup-title">${title}</div>${rows.map(([l,v,c])=>`<div class="popup-row"><span class="popup-label">${l}</span><span class="popup-value ${c||''}">${v}</span></div>`).join('')}${badge?`<span class="popup-badge ${badge[1]}">${badge[0]}</span>`:''}`;}

function indiaMapSVG(){return `<div id="indiaMap" class="leaflet-map-wrap" style="height:230px;"></div>`;}
function initIndiaMap(){
  if(!document.getElementById('indiaMap'))return;
  const m=cosMap('indiaMap',22.5,80.5,4);
  [{name:'Uttar Pradesh',lat:26.8,lng:80.9,sales:'₹1.21 Cr',growth:'+14.8%',verified:'63%',score:82,color:'#22c55e',badge:['Active','green']},{name:'Maharashtra',lat:19.0,lng:75.7,sales:'₹1.9 Cr',growth:'+15.2%',verified:'69%',score:87,color:'#22c55e',badge:['Active','green']},{name:'Bihar',lat:25.1,lng:85.3,sales:'₹0.9 Cr',growth:'+4.1%',verified:'34%',score:41,color:'#ef4444',badge:['Needs Attention','red']},{name:'Madhya Pradesh',lat:22.9,lng:78.6,sales:'₹0.8 Cr',growth:'+7.3%',verified:'58%',score:65,color:'#eab308',badge:['Moderate','yellow']},{name:'Punjab',lat:31.1,lng:75.3,sales:'₹1.1 Cr',growth:'+9.2%',verified:'71%',score:79,color:'#22c55e',badge:['Active','green']},{name:'Rajasthan',lat:27.0,lng:74.2,sales:'₹0.7 Cr',growth:'+3.8%',verified:'52%',score:55,color:'#f97316',badge:['Low Activity','yellow']},{name:'Gujarat',lat:22.3,lng:71.2,sales:'₹1.4 Cr',growth:'+11.6%',verified:'66%',score:74,color:'#22c55e',badge:['Active','green']},{name:'Karnataka',lat:15.3,lng:75.7,sales:'₹1.0 Cr',growth:'+8.4%',verified:'64%',score:70,color:'#3b82f6',badge:['Active','green']},{name:'West Bengal',lat:22.9,lng:87.8,sales:'₹0.6 Cr',growth:'+2.1%',verified:'45%',score:49,color:'#f97316',badge:['Low Activity','yellow']},{name:'Tamil Nadu',lat:11.1,lng:78.6,sales:'₹0.8 Cr',growth:'+6.7%',verified:'72%',score:76,color:'#a855f7',badge:['Active','green']},{name:'Andhra Pradesh',lat:15.9,lng:79.7,sales:'₹0.5 Cr',growth:'+3.2%',verified:'55%',score:58,color:'#eab308',badge:['Moderate','yellow']}].forEach(s=>{L.marker([s.lat,s.lng],{icon:cosIcon(s.color,s.name.charAt(0))}).addTo(m).bindPopup(mkPopup(s.name,[['Sales',s.sales,'green'],['Growth',s.growth,s.growth.startsWith('-')?'red':'green'],['Verified %',s.verified,''],['Score',s.score,'']],s.badge),{maxWidth:200});});
  const legend=L.control({position:'bottomright'});legend.onAdd=()=>{const d=L.DomUtil.create('div');d.innerHTML=`<div style="background:${darkMode?'rgba(10,14,15,0.9)':'rgba(255,255,255,0.9)'};border:1px solid ${darkMode?'#1e2d3d':'#d1dce8'};border-radius:6px;padding:6px 10px;font-size:10px;color:${darkMode?'#64748b':'#64748b'};font-family:'DM Sans',sans-serif;"><div style="display:flex;gap:8px;align-items:center;"><span style="display:flex;align-items:center;gap:3px;"><div style="width:8px;height:8px;background:#22c55e;border-radius:50%;display:inline-block;"></div> High</span><span style="display:flex;align-items:center;gap:3px;"><div style="width:8px;height:8px;background:#eab308;border-radius:50%;display:inline-block;"></div> Med</span><span style="display:flex;align-items:center;gap:3px;"><div style="width:8px;height:8px;background:#ef4444;border-radius:50%;display:inline-block;"></div> Low</span></div></div>`;return d;};legend.addTo(m);
}
function upMapSVG(){return `<div id="upMap" class="leaflet-map-wrap" style="height:200px;"></div>`;}
function initUPMap(){
  if(!document.getElementById('upMap'))return;
  const m=cosMap('upMap',26.8,80.9,7);
  [{name:'Lucknow',lat:26.85,lng:80.95,sales:'₹18.4 L',growth:'+16.3%',verified:'66%',score:85,color:'#22c55e'},{name:'Kanpur',lat:26.45,lng:80.33,sales:'₹15.7 L',growth:'+11.8%',verified:'62%',score:78,color:'#22c55e'},{name:'Varanasi',lat:25.32,lng:82.97,sales:'₹12.9 L',growth:'+9.2%',verified:'58%',score:72,color:'#3b82f6'},{name:'Allahabad',lat:25.44,lng:81.84,sales:'₹11.1 L',growth:'+7.4%',verified:'56%',score:68,color:'#3b82f6'},{name:'Agra',lat:27.18,lng:78.01,sales:'₹9.8 L',growth:'-2.1%',verified:'48%',score:52,color:'#f97316'},{name:'Meerut',lat:28.98,lng:77.71,sales:'₹11.3 L',growth:'+6.4%',verified:'55%',score:65,color:'#eab308'},{name:'Gorakhpur',lat:26.76,lng:83.37,sales:'₹8.2 L',growth:'+5.1%',verified:'51%',score:60,color:'#eab308'},{name:'Jhansi',lat:25.45,lng:78.57,sales:'₹6.1 L',growth:'+3.8%',verified:'44%',score:48,color:'#ef4444'},{name:'Baghpat',lat:28.95,lng:77.22,sales:'₹3.1 L',growth:'-5.2%',verified:'38%',score:32,color:'#ef4444'},{name:'Bahraich',lat:27.57,lng:81.59,sales:'₹2.8 L',growth:'-7.1%',verified:'35%',score:28,color:'#ef4444'}].forEach(d=>{L.marker([d.lat,d.lng],{icon:dotIcon(d.color,14)}).addTo(m).bindPopup(mkPopup(d.name,[['Sales',d.sales,'green'],['Growth',d.growth,d.growth.startsWith('-')?'red':'green'],['Verified %',d.verified,''],['Score',d.score,'']]),{maxWidth:180});});
}
function territoryMapSVG(){return `<div id="territoryMap" class="leaflet-map-wrap" style="height:230px;"></div>`;}
function initTerritoryMap(){
  if(!document.getElementById('territoryMap'))return;
  const m=cosMap('territoryMap',26.8,81.1,8);
  [{name:'Lucknow',lat:26.85,lng:80.95,color:'#22c55e',sales:'₹1.62 Cr',verified:'70%',retailers:532,score:85},{name:'Barabanki',lat:26.92,lng:81.20,color:'#3b82f6',sales:'₹1.18 Cr',verified:'65%',retailers:368,score:72},{name:'Raebareli',lat:26.23,lng:81.24,color:'#f97316',sales:'₹1.04 Cr',verified:'52%',retailers:348,score:58}].forEach(d=>{L.circle([d.lat,d.lng],{radius:18000,color:d.color,fillColor:d.color,fillOpacity:0.12,weight:1.5,dashArray:'4 4'}).addTo(m);L.marker([d.lat,d.lng],{icon:cosIcon(d.color,d.name.charAt(0))}).addTo(m).bindPopup(mkPopup(d.name,[['Sales',d.sales,'green'],['Verified %',d.verified,''],['Retailers',d.retailers,''],['Score',d.score,'']]),{maxWidth:180});});
  [{name:'Malihabad',lat:26.92,lng:80.71,color:'#22c55e',sales:'₹24.8 L',verified:'72%'},{name:'Kakori',lat:26.88,lng:80.83,color:'#22c55e',sales:'₹19.1 L',verified:'68%'},{name:'Saidabad',lat:26.81,lng:81.08,color:'#3b82f6',sales:'₹15.6 L',verified:'64%'},{name:'Dewa Road',lat:26.74,lng:81.12,color:'#eab308',sales:'₹13.2 L',verified:'58%'},{name:'Mohanlalganj',lat:26.69,lng:80.97,color:'#eab308',sales:'₹12.7 L',verified:'55%'},{name:'Bakshi Ka Talab',lat:26.97,lng:80.97,color:'#22c55e',sales:'₹11.4 L',verified:'71%'},{name:'Bijnaur',lat:26.63,lng:81.32,color:'#f97316',sales:'₹8.2 L',verified:'44%'},{name:'Haidargarh',lat:26.59,lng:81.37,color:'#ef4444',sales:'₹4.1 L',verified:'32%'}].forEach(v=>{L.marker([v.lat,v.lng],{icon:dotIcon(v.color,10)}).addTo(m).bindPopup(mkPopup(v.name,[['Sales',v.sales,'green'],['Verified %',v.verified,'']]),{maxWidth:160});});
}
function largeMapSVG(){return `<div id="geoBuilderMap" class="leaflet-map-wrap" style="height:320px;"></div>`;}
function initGeoBuilderMap(){
  if(!document.getElementById('geoBuilderMap'))return;
  const m=cosMap('geoBuilderMap',26.75,81.1,9);m.scrollWheelZoom.enable();
  L.polygon([[[27.15,80.60],[27.20,81.30],[27.00,81.60],[26.50,81.70],[26.30,81.40],[26.40,80.80],[26.80,80.65]]],{color:'#22c55e',weight:2,dashArray:'6 3',fillColor:'#22c55e',fillOpacity:0.06}).addTo(m).bindPopup('<div class="popup-title">Lucknow Territory</div><div class="popup-row"><span class="popup-label">Districts</span><span class="popup-value">3</span></div><div class="popup-row"><span class="popup-label">Villages</span><span class="popup-value green">312</span></div>');
  [{name:'Lucknow North',lat:27.02,lng:80.92,color:'#22c55e',villages:98,retailers:210},{name:'Lucknow South',lat:26.72,lng:80.98,color:'#3b82f6',villages:86,retailers:182},{name:'Barabanki East',lat:26.90,lng:81.38,color:'#a855f7',villages:74,retailers:156},{name:'Raebareli West',lat:26.35,lng:81.10,color:'#f97316',villages:54,retailers:110}].forEach(z=>{L.circle([z.lat,z.lng],{radius:12000,color:z.color,fillColor:z.color,fillOpacity:0.15,weight:1.5}).addTo(m);L.marker([z.lat,z.lng],{icon:cosIcon(z.color,z.name.charAt(0))}).addTo(m).bindPopup(mkPopup(z.name,[['Villages',z.villages,''],['Retailers',z.retailers,'green']]),{maxWidth:170});});
  [[26.92,80.71,'#22c55e','Malihabad'],[26.88,80.83,'#22c55e','Kakori'],[26.97,80.97,'#22c55e','Bakshi Ka Talab'],[26.81,81.08,'#3b82f6','Saidabad'],[26.74,81.12,'#eab308','Dewa Road'],[26.63,81.32,'#f97316','Bijnaur'],[26.59,81.37,'#ef4444','Haidargarh'],[27.05,81.15,'#22c55e','Fatehabad'],[27.12,80.88,'#3b82f6','Chinhat'],[26.45,81.22,'#f97316','Lalganj']].forEach(([la,lo,col,n])=>{L.marker([la,lo],{icon:dotIcon(col,9)}).addTo(m).bindPopup(`<div class="popup-title">${n}</div><span class="popup-badge green">Active Village</span>`);});
}

// ===== CHART.JS WRAPPER =====
function destroyChart(id){if(chartInstances[id]){chartInstances[id].destroy();delete chartInstances[id];}}
function cColors(){return chartColors();}

function makeLineChart(id, labels, datasets, opts={}){
  destroyChart(id);
  const el = document.getElementById(id);
  if(!el) return;
  const cc = cColors();
  const ctx = el.getContext('2d');
  chartInstances[id] = new Chart(ctx,{
    type:'line',
    data:{labels,datasets:datasets.map(d=>({...d,tension:0.4,pointRadius:3,pointHoverRadius:5,pointBackgroundColor:d.borderColor,borderWidth:2,fill:d.fill?{target:'origin',above:d.borderColor+'28'}:false}))},
    options:{
      responsive:true,maintainAspectRatio:false,
      interaction:{mode:'index',intersect:false},
      plugins:{
        legend:{display:opts.legend||false,labels:{color:cc.tick,font:{family:'DM Sans',size:11},boxWidth:10,padding:16}},
        tooltip:{backgroundColor:cc.tooltip.bg,borderColor:cc.tooltip.border,borderWidth:1,titleColor:cc.tooltip.text,bodyColor:cc.tick,padding:10,cornerRadius:6,titleFont:{family:'DM Sans',weight:'600',size:12},bodyFont:{family:'DM Sans',size:11}}
      },
      scales:{
        x:{grid:{color:cc.grid,drawBorder:false},ticks:{color:cc.tick,font:{family:'DM Sans',size:10}},border:{display:false}},
        y:{grid:{color:cc.grid,drawBorder:false},ticks:{color:cc.tick,font:{family:'DM Sans',size:10},...(opts.yFormat?{callback:opts.yFormat}:{})},border:{display:false}}
      },...(opts.extra||{})
    }
  });
}

function makeBarChart(id, labels, datasets, opts={}){
  destroyChart(id);
  const el = document.getElementById(id);
  if(!el) return;
  const cc = cColors();
  chartInstances[id] = new Chart(el.getContext('2d'),{
    type:'bar',
    data:{labels,datasets:datasets.map(d=>({...d,borderRadius:4,borderSkipped:false}))},
    options:{
      responsive:true,maintainAspectRatio:false,
      interaction:{mode:'index',intersect:false},
      plugins:{
        legend:{display:opts.legend||false,labels:{color:cc.tick,font:{family:'DM Sans',size:11},boxWidth:10}},
        tooltip:{backgroundColor:cc.tooltip.bg,borderColor:cc.tooltip.border,borderWidth:1,titleColor:cc.tooltip.text,bodyColor:cc.tick,padding:10,cornerRadius:6,titleFont:{family:'DM Sans',weight:'600'},bodyFont:{family:'DM Sans',size:11}}
      },
      scales:{
        x:{grid:{display:false},ticks:{color:cc.tick,font:{family:'DM Sans',size:10}},border:{display:false}},
        y:{grid:{color:cc.grid,drawBorder:false},ticks:{color:cc.tick,font:{family:'DM Sans',size:10},...(opts.yFormat?{callback:opts.yFormat}:{})},border:{display:false}}
      },...(opts.extra||{})
    }
  });
}

function makeDoughnutChart(id, labels, data, colors, opts={}){
  destroyChart(id);
  const el = document.getElementById(id);
  if(!el) return;
  const cc = cColors();
  chartInstances[id] = new Chart(el.getContext('2d'),{
    type:'doughnut',
    data:{labels,datasets:[{data,backgroundColor:colors,borderColor:'transparent',borderWidth:0,hoverOffset:4}]},
    options:{
      responsive:true,maintainAspectRatio:false,cutout:'68%',
      plugins:{
        legend:{display:opts.legend||false,position:'bottom',labels:{color:cc.tick,font:{family:'DM Sans',size:11},boxWidth:8,padding:12}},
        tooltip:{backgroundColor:cc.tooltip.bg,borderColor:cc.tooltip.border,borderWidth:1,titleColor:cc.tooltip.text,bodyColor:cc.tick,padding:10,cornerRadius:6,titleFont:{family:'DM Sans',weight:'600'},bodyFont:{family:'DM Sans',size:11}}
      }
    }
  });
}

// ===== SIDEBAR TOGGLE =====
function toggleSidebar(){
  document.getElementById('sidebar').classList.toggle('collapsed');
}

// ===== ROLE / NAV =====
function init(){
  renderRoleSwitcher();
  renderNotifList('all');
  switchRole('hq');
}
function renderRoleSwitcher(){
  document.getElementById('roleSwitcher').innerHTML = ['hq','field','state','territory','admin'].map(id=>`<button class="role-btn${id===currentRole?' active':''}" onclick="switchRole('${id}')">${{hq:'HQ',field:'Field',state:'State',territory:'Territory',admin:'Admin'}[id]}</button>`).join('');
}
function switchRole(rid){
  currentRole=rid;
  const role=DATA.roles[rid];
  currentScreen=role.defaultScreen;
  renderRoleSwitcher();
  document.getElementById('userName').textContent=role.name;
  document.getElementById('userRole').textContent=role.label;
  document.getElementById('userAvatar').textContent=role.avatar;
  document.getElementById('userAvatar').style.background=role.avatarColor;
  document.getElementById('orgName').textContent=role.org;
  document.getElementById('orgSub').textContent=role.orgSub;
  renderNav(role);
  renderScreen(currentScreen);
}
function renderNav(role){
  document.getElementById('sidebarNav').innerHTML = role.nav.map(item=>`<a class="nav-item${item.id===currentScreen?' active':''}" onclick="navigate('${item.id}');return false;" href="#" data-label="${item.label}">
    ${IC[item.icon]||IC.dashboard}<span class="nav-label">${item.label}</span>${item.badge?`<span class="nav-badge">${item.badge}</span>`:''}
  </a>`).join('');
}
function navigate(screenId){
  currentScreen=screenId;
  renderNav(DATA.roles[currentRole]);
  renderScreen(screenId);
}
function renderScreen(screenId){
  // Destroy all charts before re-render
  Object.keys(chartInstances).forEach(destroyChart);
  const screens={
    'hq-dashboard':buildHQDashboard,'field-dashboard':buildFieldDashboard,
    'state-dashboard':buildStateDashboard,'territory-dashboard':buildTerritoryDashboard,
    'verified-sales':buildVerifiedSales,'users':buildUsers,'user-assignment':buildUsers,
    'permissions':buildPermissions,'geography':buildGeography,'hierarchy':buildHierarchy,
    'campaigns':buildCampaigns,'field-campaigns':buildCampaigns,
    'reports':buildReports,'settings':buildSettings,'overview':buildOverview,
  };
  document.getElementById('mainContent').innerHTML = (screens[screenId]||buildPlaceholder)(screenId);
  setTimeout(()=>drawChartsForScreen(screenId), 80);
}
function drawChartsForScreen(screenId){
  switch(screenId){
    case 'hq-dashboard':        drawHQCharts();        initIndiaMap();      break;
    case 'field-dashboard':     drawFieldCharts();                           break;
    case 'state-dashboard':     drawStateCharts();     initUPMap();         break;
    case 'territory-dashboard': drawTerritoryCharts(); initTerritoryMap();  break;
    case 'verified-sales':      drawVerifiedCharts();                        break;
    case 'geography':                                  initGeoBuilderMap(); break;
  }
}

// ===== FILTER HANDLER =====
function onFilterChange(sel){
  const screenId=currentScreen;
  setTimeout(()=>drawChartsForScreen(screenId),60);
}

// ===== HQ DASHBOARD =====
function buildHQDashboard(){
  const d=DATA.hq;
  return `<div style="display:grid;grid-template-columns:1fr 230px;height:calc(100vh - 52px);">
  <div style="overflow-y:auto;padding:20px 16px 20px 20px;">
    <div class="page-header">
      <div><div class="page-title">HQ Command Dashboard</div><div class="page-subtitle">National-level performance overview</div></div>
      <div class="page-actions"><button class="btn btn-outline btn-sm">↓ Export</button><button class="btn btn-primary btn-sm">+ Campaign</button></div>
    </div>
    <div class="filter-bar">
      ${filterSelect('Company','Godrej Agrovet')}${filterSelect('Geography','All India','hqGeo',['East Region','West Region','North Region','South Region'])}${filterSelect('Time Range','Last 30 Days','hqTime',['Last 7 Days','Last 90 Days','This Year'])}${filterSelect('SKU','All SKUs','hqSKU',['Nano Urea','DAP','NPK 19:19:19','Zyme'])}
    </div>
    <div class="metrics-row mb-14" style="grid-template-columns:repeat(6,1fr);">${d.metrics.map(m=>metricCard(m)).join('')}</div>
    <div class="grid-2-1 mb-14">
      <div class="card">
        <div class="card-header"><div><div class="card-title">National Performance Map</div><div class="card-subtitle">Sales intensity by state — click a marker for details</div></div></div>
        ${indiaMapSVG()}
        <div style="display:flex;align-items:center;gap:6px;margin-top:8px;font-size:10px;color:var(--text3);">
          ${['#22c55e','#3b82f6','#eab308','#f97316','#ef4444'].map((c,i)=>`<span style="display:flex;align-items:center;gap:3px;"><div style="width:8px;height:8px;background:${c};border-radius:50%;"></div> ${['High','Active','Moderate','Low Activity','Attention'][i]}</span>`).join('<span style="color:var(--border2);">·</span>')}
        </div>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">Region Performance</div><span class="card-link" onclick="navigate('state-dashboard')">View State →</span></div>
        <table class="data-table"><thead><tr><th>Region</th><th>Sales</th><th>Growth</th><th>Verified%</th><th>ROI</th></tr></thead>
        <tbody>${d.regions.map(r=>`<tr><td><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${r.dot};margin-right:5px;"></span><span class="td-name">${r.name}</span></td><td class="td-value">${r.sales}</td><td><span class="metric-change up">${upArrow(true)} ${r.growth}</span></td><td>${r.verified}</td><td style="color:var(--green);font-weight:700;">${r.roi}</td></tr>`).join('')}</tbody></table>
        <div style="margin-top:10px;border-top:1px solid var(--border);padding-top:10px;">
          <div style="font-size:11px;color:var(--text3);margin-bottom:6px;">Top 3 States</div>
          ${d.topStates.map(s=>`<div style="display:flex;justify-content:space-between;padding:4px 0;font-size:12px;"><span style="color:var(--text);">${s.name}</span><span style="color:var(--green);font-weight:600;">${s.growth}</span></div>`).join('')}
        </div>
      </div>
    </div>
    <div class="grid-3 mb-14">
      <div class="card">
        <div class="card-header"><div class="card-title">Performance Trend</div>
          <select class="filter-select" id="hqTrendPeriod" onchange="drawHQCharts()" style="font-size:10px;"><option>Monthly</option><option>Weekly</option></select>
        </div>
        <div class="chart-box" style="height:130px;"><canvas id="hqTrendChart"></canvas></div>
        <div style="display:flex;gap:14px;margin-top:8px;">${[['#22c55e','Sales (₹ Cr)'],['#3b82f6','Verified %']].map(([c,l])=>`<span style="display:flex;align-items:center;gap:4px;font-size:10px;color:var(--text3);"><div style="width:8px;height:8px;background:${c};border-radius:2px;"></div>${l}</span>`).join('')}</div>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">Campaign Performance</div><span class="card-link" onclick="navigate('campaigns')">View All</span></div>
        <table class="data-table"><thead><tr><th>Campaign</th><th>Spend</th><th>Sales</th><th>ROI</th></tr></thead>
        <tbody>${d.campaigns.map(c=>`<tr><td class="td-name">${c.name}</td><td>${c.spend}</td><td class="td-value">${c.sales}</td><td style="color:var(--green);font-weight:700;">${c.roi}</td></tr>`).join('')}</tbody></table>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">SKU Mix</div><div class="card-subtitle">Verified sales by product</div></div>
        <div style="display:flex;align-items:center;gap:14px;">
          <div style="position:relative;flex-shrink:0;width:110px;height:110px;"><canvas id="hqSkuDonut"></canvas><div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;"><div style="font-size:15px;font-weight:800;color:var(--text);">₹9.8Cr</div><div style="font-size:9px;color:var(--text3);">Total</div></div></div>
          <div class="donut-legend">${[['#22c55e','Nano Urea','29%'],['#3b82f6','DAP','23%'],['#a855f7','NPK','17%'],['#f97316','Zyme','18%'],['#eab308','Others','13%']].map(([c,l,v])=>`<div class="legend-item"><div class="legend-dot" style="background:${c}"></div>${l} <span class="legend-val">${v}</span></div>`).join('')}</div>
        </div>
      </div>
    </div>
    <div class="grid-3">
      <div class="card">
        <div class="card-header"><div class="card-title">Today's Top Actions</div><span class="card-link">View All</span></div>
        ${d.topActions.map(a=>`<div style="display:flex;gap:10px;padding:10px 0;border-bottom:1px solid rgba(30,45,61,0.35);"><span style="font-size:18px;">${a.icon}</span><div style="flex:1;"><div style="font-size:12.5px;font-weight:600;color:var(--text);">${a.title}</div><div style="font-size:11px;color:var(--text3);">${a.sub}</div><div style="font-size:11px;color:var(--green);margin-top:1px;">Impact: <b>${a.impact}</b></div></div><button class="btn btn-sm ${a.actionColor==='green'?'btn-primary':a.actionColor==='yellow'?'btn-orange':'btn-blue'}" style="align-self:center;">${a.actionLabel}</button></div>`).join('')}
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">Top SKUs</div><span class="card-link">View All</span></div>
        ${d.topSKUs.map(s=>`<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid rgba(30,45,61,0.35);"><span style="font-size:18px;">${s.icon}</span><div style="flex:1;"><div style="font-size:12px;font-weight:500;color:var(--text);">${s.name}</div><div style="font-size:10px;color:var(--text3);">${s.units}</div></div><div style="text-align:right;"><div style="font-size:13px;font-weight:700;">${s.sales}</div><div style="font-size:11px;color:var(--green);">${s.growth}</div></div></div>`).join('')}
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">Coverage Gaps</div><span class="card-link">View All</span></div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px;">${[['86','Low Activation Districts','orange'],['1,248','Villages No Sales','red'],['0','Unassigned States','green'],['24','Inactive Field Zones','yellow']].map(([n,l,c])=>`<div style="background:var(--bg3);border-radius:8px;padding:10px;text-align:center;"><div style="font-size:20px;font-weight:700;color:var(--${c});">${n}</div><div style="font-size:10px;color:var(--text3);">${l}</div></div>`).join('')}</div>
        ${d.lowAreas.map(a=>`<div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid rgba(30,45,61,0.35);"><div style="width:26px;height:26px;background:var(--red-dim);border-radius:50%;display:flex;align-items:center;justify-content:center;color:var(--red);font-size:12px;">⚠</div><div style="flex:1;"><div style="font-size:12px;font-weight:500;color:var(--text);">${a.name}</div><div style="font-size:11px;color:var(--red);">Verification: ${a.verification}</div></div><span style="font-size:12px;font-weight:600;">${a.sales}</span></div>`).join('')}
      </div>
    </div>
  </div>
  ${buildAlertsPanel(d.alerts,{t:'AI Recommendation',s:'Based on your national data',b:'Increase incentive for Nano Urea in Bihar. Low verification, high opportunity.',lift:'Expected lift: +22%',a:'Apply Now'})}
  </div>`;
}

// ===== FIELD DASHBOARD =====
function buildFieldDashboard(){
  const d=DATA.field;
  return `<div style="display:grid;grid-template-columns:1fr 220px;height:calc(100vh - 52px);">
  <div style="overflow-y:auto;padding:20px 16px 20px 20px;">
    <div class="page-header">
      <div><div class="page-title">Welcome back, Ravi! 👋</div><div class="page-subtitle">Track your daily progress across all villages</div></div>
      <div style="display:flex;align-items:center;gap:6px;background:var(--bg3);border:1px solid var(--border);padding:5px 10px;border-radius:6px;font-size:12px;color:var(--text2);">📍 Lucknow Territory</div>
    </div>
    <div class="metrics-row mb-14" style="grid-template-columns:repeat(6,1fr);">${d.metrics.map((m,i)=>i===5?`<div class="metric-card" style="background:linear-gradient(135deg,${darkMode?'#1a1500,#201800':'#fffbeb,#fef3c7'});border-color:rgba(234,179,8,0.3);"><div class="metric-icon yellow">🔥</div><div class="metric-label">Streak</div><div class="metric-value" style="color:var(--yellow);">7 Days</div><div style="font-size:10px;color:var(--text3);margin-top:3px;">Keep it up!</div></div>`:metricCard(m)).join('')}</div>
    <div class="grid-3 mb-14">
      <div class="card">
        <div class="card-header"><div class="card-title">Today's Tasks</div><span class="badge badge-orange">8 Pending</span></div>
        ${d.tasks.map(t=>`<div class="task-item"><div class="task-check ${t.pct===100?'done':''}"></div><div style="flex:1;font-size:12px;color:var(--text);">${t.label}${t.time?` <span style="color:var(--text3);font-size:10px;">— ${t.time}</span>`:''}</div><div style="display:flex;align-items:center;gap:6px;flex-shrink:0;"><div style="width:65px;"><div class="progress-bar"><div class="progress-fill ${t.pct===0?'red':t.pct<50?'yellow':''}" style="width:${t.pct}%"></div></div></div><span style="font-size:10px;color:var(--text3);">${t.done}/${t.total}</span></div></div>`).join('')}
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">Sales Trend (This Week)</div></div>
        <div class="chart-box" style="height:140px;"><canvas id="fieldTrendChart"></canvas></div>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">Monthly Progress</div><span class="card-link">Details</span></div>
        <div style="display:flex;align-items:center;gap:14px;">
          <div style="position:relative;width:90px;height:90px;flex-shrink:0;"><canvas id="fieldProgressDonut"></canvas><div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;"><div style="font-size:17px;font-weight:800;color:var(--green);">67%</div><div style="font-size:9px;color:var(--text3);">Target</div></div></div>
          <div style="flex:1;">
            <div style="display:flex;justify-content:space-between;margin-bottom:5px;font-size:11px;"><span style="color:var(--text3);">Target</span><span style="font-weight:600;">₹1,50,000</span></div>
            <div style="display:flex;justify-content:space-between;margin-bottom:10px;font-size:11px;"><span style="color:var(--text3);">Achieved</span><span style="font-weight:600;color:var(--green);">₹1,00,650</span></div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:5px;">
              <div style="background:var(--bg3);border-radius:6px;padding:7px;text-align:center;"><div style="font-size:13px;font-weight:700;">85/120</div><div style="font-size:9px;color:var(--text3);">Retailers</div></div>
              <div style="background:var(--bg3);border-radius:6px;padding:7px;text-align:center;"><div style="font-size:13px;font-weight:700;">42</div><div style="font-size:9px;color:var(--text3);">Orders</div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="grid-3 mb-14">
      <div class="card">
        <div class="card-header"><div class="card-title">Village Coverage</div></div>
        <div style="display:flex;align-items:center;gap:12px;">
          <div style="position:relative;width:90px;height:90px;flex-shrink:0;"><canvas id="villageCoverageDonut"></canvas><div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;"><div style="font-size:16px;font-weight:800;">76%</div><div style="font-size:8px;color:var(--text3);">Coverage</div></div></div>
          <div class="donut-legend"><div class="legend-item"><div class="legend-dot" style="background:var(--green)"></div>Active <span class="legend-val">31</span></div><div class="legend-item"><div class="legend-dot" style="background:var(--orange)"></div>Low Activity <span class="legend-val">7</span></div><div class="legend-item"><div class="legend-dot" style="background:var(--red)"></div>Not Visited <span class="legend-val">3</span></div></div>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">Top Products</div><span class="card-link">View All</span></div>
        ${d.topProducts.map(p=>`<div style="display:flex;align-items:center;gap:8px;padding:5px 0;border-bottom:1px solid rgba(30,45,61,0.35);"><span style="font-size:15px;">${p.icon}</span><div style="flex:1;"><div style="display:flex;justify-content:space-between;font-size:11.5px;"><span style="color:var(--text);font-weight:500;">${p.name}</span><span style="font-weight:600;">${p.sales}</span></div><div class="progress-bar" style="height:3px;margin-top:3px;"><div class="progress-fill" style="width:${p.pct}%"></div></div></div></div>`).join('')}
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">Today's Plan</div><span class="badge badge-green" style="font-size:9px;">8 tasks</span></div>
        ${d.todayPlan.map(p=>`<div style="display:flex;gap:8px;padding:4px 0;"><span style="font-size:10px;color:var(--text3);width:52px;flex-shrink:0;">${p.time}</span><div class="timeline-dot ${p.dot}"></div><span style="font-size:11px;color:var(--text2);">${p.label}</span></div>`).join('')}
      </div>
    </div>
    <div class="grid-3">
      <div class="card">
        <div class="card-header"><div class="card-title">Village Visits Today</div><span class="card-link">View Route</span></div>
        ${d.villages.map(v=>`<div style="display:flex;align-items:center;gap:8px;padding:7px 0;border-bottom:1px solid rgba(30,45,61,0.35);"><div style="width:20px;height:20px;background:var(--bg4);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:var(--text3);">${v.num}</div><div style="flex:1;"><div style="font-size:12px;font-weight:500;color:var(--text);">${v.name}</div><div style="font-size:11px;color:var(--text3);">${v.time} · ${v.retailers} retailers</div></div><button class="btn btn-primary btn-sm" style="font-size:10px;">📍 Go</button></div>`).join('')}
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">Recent Visits</div><span class="card-link">View All +</span></div>
        ${d.recentVisits.map(v=>`<div class="visit-item"><div style="width:30px;height:30px;background:var(--bg4);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;">${v.name.charAt(0)}</div><div style="flex:1;"><div style="font-size:12px;font-weight:500;color:var(--text);">${v.name}</div><div style="font-size:10px;color:var(--text3);">${v.location} · ${v.time}</div></div><div style="text-align:right;"><div style="font-size:12px;font-weight:600;">${v.amount}</div><span class="badge ${v.status==='verified'?'badge-green':'badge-yellow'}" style="font-size:9px;">${v.status}</span></div></div>`).join('')}
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">Retailer Activity</div></div>
        <div style="display:flex;align-items:center;gap:12px;">
          <div style="position:relative;width:90px;height:90px;flex-shrink:0;"><canvas id="retailerActivityDonut"></canvas><div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;"><div style="font-size:16px;font-weight:800;">124</div><div style="font-size:8px;color:var(--text3);">Total</div></div></div>
          <div class="donut-legend"><div class="legend-item"><div class="legend-dot" style="background:var(--green)"></div>Active <span class="legend-val">85</span></div><div class="legend-item"><div class="legend-dot" style="background:var(--yellow)"></div>At Risk <span class="legend-val">25</span></div><div class="legend-item"><div class="legend-dot" style="background:var(--red)"></div>Inactive <span class="legend-val">14</span></div></div>
        </div>
      </div>
    </div>
  </div>
  <div class="alerts-sidebar-col">
    <div><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;"><span style="font-size:13px;font-weight:600;color:var(--text);">Alerts</span><span style="font-size:11px;color:var(--green);cursor:pointer;">View All</span></div><div style="display:flex;flex-direction:column;gap:8px;">${d.alerts.map(a=>alertItem(a)).join('')}</div></div>
    <div><div style="font-size:13px;font-weight:600;margin-bottom:8px;">Quick Actions</div><div class="quick-actions-grid">${[['📷','Scan to Sell'],['➕','Add Retailer'],['📦','Inventory'],['📢','Campaigns'],['💰','My Wallet'],['📊','Reports']].map(([i,l])=>`<button class="quick-action-btn"><div style="font-size:18px;">${i}</div><span>${l}</span></button>`).join('')}</div></div>
  </div>
  </div>`;
}

// ===== STATE DASHBOARD =====
function buildStateDashboard(){
  const d=DATA.state;
  return `<div style="display:grid;grid-template-columns:1fr 230px;height:calc(100vh - 52px);">
  <div style="overflow-y:auto;padding:20px 16px 20px 20px;">
    <div class="page-header"><div><div class="page-title">State Dashboard</div><div class="page-subtitle">Uttar Pradesh — district, village and SKU performance</div></div><div class="page-actions"><button class="btn btn-outline btn-sm">↓ Export</button></div></div>
    <div class="filter-bar">${filterSelect('State','Uttar Pradesh')}${filterSelect('District','All Districts','stateDistrict',['Lucknow','Kanpur','Varanasi','Agra','Meerut'])}${filterSelect('Time Range','Last 30 Days','stateTime',['Last 7 Days','Last 90 Days'])}${filterSelect('SKU','All SKUs')}</div>
    <div class="metrics-row mb-14" style="grid-template-columns:repeat(7,1fr);">${d.metrics.map(m=>metricCard(m)).join('')}</div>
    <div class="grid-3 mb-14">
      <div class="card">
        <div class="card-header"><div class="card-title">District Performance</div><span class="card-link">View All</span></div>
        <table class="data-table"><thead><tr><th>District</th><th>Sales</th><th>Growth</th><th>Villages</th><th>Verified%</th><th>Score</th></tr></thead>
        <tbody>${d.districts.map(r=>`<tr><td class="td-name">${r.name}</td><td class="td-value">${r.sales}</td><td><span class="metric-change ${r.up?'up':'down'}">${upArrow(r.up)} ${r.growth}</span></td><td>${r.villages}</td><td>${r.verified}</td><td><span class="score-badge ${r.scoreColor}">${r.score}</span></td></tr>`).join('')}</tbody></table>
      </div>
      <div class="card"><div class="card-header"><div class="card-title">UP District Map</div></div>${upMapSVG()}</div>
      <div class="card">
        <div class="card-header"><div class="card-title">Activation Trend</div></div>
        <div class="chart-box" style="height:120px;"><canvas id="stateActivationChart"></canvas></div>
        <div style="display:flex;gap:10px;margin-top:8px;">${[['#22c55e','Active Villages'],['#3b82f6','Verified %']].map(([c,l])=>`<span style="display:flex;align-items:center;gap:4px;font-size:10px;color:var(--text3);"><div style="width:8px;height:8px;background:${c};border-radius:2px;"></div>${l}</span>`).join('')}</div>
      </div>
    </div>
    <div class="grid-3 mb-14">
      <div class="card">
        <div class="card-header"><div class="card-title">SKU Movement</div><span class="card-link">View All</span></div>
        <table class="data-table"><thead><tr><th>SKU</th><th>Units</th><th>Growth</th><th>Share</th></tr></thead>
        <tbody>${d.skuMovement.map(s=>`<tr><td><span style="margin-right:4px;">${s.icon}</span><span class="td-name">${s.sku}</span></td><td class="td-value">${s.units}</td><td><span class="metric-change up">${upArrow(true)} ${s.growth}</span></td><td>${s.share}</td></tr>`).join('')}</tbody></table>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">Bottlenecks</div></div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;">
          ${[['🔴','Low Stock','12','districts','red'],['⚠️','Low Verification','18','districts','yellow'],['🟡','Inactive Villages','540','villages','orange']].map(([i,l,n,s,c])=>`<div class="bottleneck-card ${c}" style="padding:12px;"><div style="font-size:9px;color:var(--${c});font-weight:600;">${i} ${l}</div><div style="font-size:20px;font-weight:700;color:var(--${c});margin:5px 0;">${n}</div><div style="font-size:10px;color:var(--text3);">${s}</div><div style="font-size:11px;color:var(--green);margin-top:5px;cursor:pointer;">Investigate →</div></div>`).join('')}
        </div>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">Village Performance</div></div>
        <table class="data-table"><thead><tr><th>Village</th><th>District</th><th>Sales</th><th>Trend</th></tr></thead>
        <tbody>${d.villagePerf.map(v=>`<tr><td class="td-name">${v.name}</td><td>${v.district}</td><td class="td-value">${v.sales}</td><td>${trendSVG(v.trend)}</td></tr>`).join('')}</tbody></table>
      </div>
    </div>
    <div class="grid-4">
      <div class="card"><div class="card-header"><div class="card-title">This Week's Focus</div></div>${d.focusItems.map(f=>`<div style="display:flex;gap:8px;padding:8px 0;border-bottom:1px solid rgba(30,45,61,0.35);"><div style="width:6px;height:6px;background:var(--green);border-radius:50%;margin-top:5px;flex-shrink:0;"></div><div style="flex:1;"><div style="font-size:12px;color:var(--text);">${f.title}</div><div style="font-size:10px;color:var(--text3);">${f.sub}</div></div></div>`).join('')}</div>
      <div class="card"><div class="card-header"><div class="card-title">Top Districts</div></div>${d.topDistricts.map((x,i)=>`<div style="display:flex;align-items:center;gap:8px;padding:7px 0;border-bottom:1px solid rgba(30,45,61,0.35);"><div class="area-rank top">${i+1}</div><div style="flex:1;font-size:12px;font-weight:500;color:var(--text);">${x.name}</div><div style="text-align:right;"><div style="font-size:12px;font-weight:600;">${x.sales}</div><div style="font-size:11px;color:var(--green);">${x.growth}</div></div></div>`).join('')}</div>
      <div class="card"><div class="card-header"><div class="card-title">Low Districts</div></div>${d.lowDistricts.map((x,i)=>`<div style="display:flex;align-items:center;gap:8px;padding:7px 0;border-bottom:1px solid rgba(30,45,61,0.35);"><div class="area-rank bottom">${i+1}</div><div style="flex:1;font-size:12px;font-weight:500;color:var(--text);">${x.name}</div><div style="text-align:right;"><div style="font-size:12px;font-weight:600;">${x.sales}</div><div style="font-size:11px;color:var(--red);">${x.growth}</div></div></div>`).join('')}</div>
      <div class="card"><div class="card-title" style="margin-bottom:10px;">Quick Actions</div><div class="quick-actions-grid">${[['📢','Campaign'],['📦','Push SKU'],['⬇️','Report'],['👥','Agents']].map(([i,l])=>`<button class="quick-action-btn"><div style="font-size:18px;">${i}</div><span>${l}</span></button>`).join('')}</div></div>
    </div>
  </div>
  ${buildAlertsPanel(d.alerts,{t:'AI Recommendation',s:'Based on your state data',b:'Pushing Nano Urea in Pratapgarh and Sultanpur can increase sales by ₹6.2 L this month.',a:'View Plan'})}
  </div>`;
}

// ===== TERRITORY DASHBOARD =====
function buildTerritoryDashboard(){
  const d=DATA.territory;
  return `<div style="display:grid;grid-template-columns:1fr 230px;height:calc(100vh - 52px);">
  <div style="overflow-y:auto;padding:20px 16px 20px 20px;">
    <div class="page-header"><div><div class="page-title">Territory Dashboard</div><div class="page-subtitle">Lucknow Territory — village demand, retailer coverage, team performance</div></div><button class="btn btn-outline btn-sm">↓ Export</button></div>
    <div class="filter-bar">${filterSelect('Territory','Lucknow Territory')}${filterSelect('District','All Districts','terDistrict',['Lucknow','Barabanki','Raebareli'])}${filterSelect('Time Range','Last 30 Days','terTime',['Last 7 Days','Last 90 Days'])}${filterSelect('SKU','All SKUs')}</div>
    <div class="metrics-row mb-14" style="grid-template-columns:repeat(6,1fr);">${d.metrics.map(m=>metricCard(m)).join('')}</div>
    <div class="grid-3 mb-14">
      <div class="card">
        <div class="card-header"><div class="card-title">District Overview</div><span class="card-link">Details</span></div>
        <table class="data-table"><thead><tr><th>District</th><th>Sales</th><th>Growth</th><th>Verified%</th><th>Score</th></tr></thead>
        <tbody>${d.districts.map(r=>`<tr><td class="td-name">${r.name}</td><td class="td-value">${r.sales}</td><td><span class="metric-change ${r.up?'up':'down'}">${upArrow(r.up)} ${r.growth}</span></td><td>${r.verified}</td><td><span class="score-badge ${r.scoreColor}">${r.score}</span></td></tr>`).join('')}</tbody></table>
      </div>
      <div class="card"><div class="card-header"><div class="card-title">Territory Map</div></div>${territoryMapSVG()}</div>
      <div class="card">
        <div class="card-header"><div class="card-title">Sales Trend</div><select class="filter-select" id="terTrendPeriod" onchange="drawTerritoryCharts()" style="font-size:10px;"><option>Monthly</option><option>Weekly</option></select></div>
        <div class="chart-box" style="height:130px;"><canvas id="territoryTrendChart"></canvas></div>
      </div>
    </div>
    <div class="grid-3 mb-14">
      <div class="card"><div class="card-header"><div class="card-title">Village Leaderboard</div><span class="card-link">View All</span></div>
        <table class="data-table"><thead><tr><th>Village</th><th>District</th><th>Sales</th><th>Verified%</th><th>Trend</th></tr></thead>
        <tbody>${d.leaderboard.map(l=>`<tr><td class="td-name">${l.village}</td><td>${l.district}</td><td class="td-value">${l.sales}</td><td>${l.verified}</td><td>${trendSVG(l.trend)}</td></tr>`).join('')}</tbody></table>
      </div>
      <div class="card"><div class="card-header"><div class="card-title">SKU Movement</div><span class="card-link">View All</span></div>
        <table class="data-table"><thead><tr><th>SKU</th><th>Units</th><th>Growth</th><th>Share</th></tr></thead>
        <tbody>${d.skuMovement.map(s=>`<tr><td><span style="margin-right:4px;">${s.icon}</span><span class="td-name">${s.sku}</span></td><td class="td-value">${s.units}</td><td><span class="metric-change up">${upArrow(true)} ${s.growth}</span></td><td>${s.share}</td></tr>`).join('')}</tbody></table>
      </div>
      <div class="card"><div class="card-header"><div class="card-title">Team Performance</div><span class="card-link">View All</span></div>
        <table class="data-table"><thead><tr><th>Name</th><th>Sales</th><th>Verified%</th><th>Score</th></tr></thead>
        <tbody>${d.teamPerf.map(t=>`<tr><td><div style="display:flex;align-items:center;gap:5px;"><div style="width:24px;height:24px;background:var(--bg4);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:600;">${t.name.charAt(0)}</div><span class="td-name">${t.name.split(' ')[0]}</span></div></td><td class="td-value">${t.sales}</td><td>${t.verified}</td><td><span class="score-badge ${t.scoreColor}">${t.score}</span></td></tr>`).join('')}</tbody></table>
      </div>
    </div>
    <div class="grid-2-1">
      <div class="card">
        <div class="card-header"><div class="card-title">Village Overview</div></div>
        <div style="display:flex;align-items:center;gap:14px;">
          <div style="position:relative;width:90px;height:90px;flex-shrink:0;"><canvas id="territoryVillageDonut"></canvas><div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;"><div style="font-size:15px;font-weight:800;">310</div><div style="font-size:8px;color:var(--text3);">Total</div></div></div>
          <div class="donut-legend"><div class="legend-item"><div class="legend-dot" style="background:var(--green)"></div>Active <span class="legend-val">242 (78%)</span></div><div class="legend-item"><div class="legend-dot" style="background:var(--yellow)"></div>Low Activity <span class="legend-val">41 (13%)</span></div><div class="legend-item"><div class="legend-dot" style="background:var(--red)"></div>Inactive <span class="legend-val">27 (9%)</span></div></div>
        </div>
      </div>
      <div class="card"><div class="card-title" style="margin-bottom:10px;">Quick Actions</div><div class="quick-actions-grid">${[['📢','Campaign'],['📦','Push SKU'],['➕','Add Retailer'],['📍','Assign Villages'],['👥','Field Team'],['⬇️','Report']].map(([i,l])=>`<button class="quick-action-btn"><div style="font-size:18px;">${i}</div><span>${l}</span></button>`).join('')}</div></div>
    </div>
  </div>
  ${buildAlertsPanel(d.alerts,{t:'AI Recommendation',s:'Based on your territory',b:'Pushing Nano Urea in 34 high potential villages can increase sales by ₹18.6 L this month.',a:'View Recommendation'})}
  </div>`;
}

// ===== VERIFIED SALES =====
function buildVerifiedSales(){
  const d=DATA.verifiedSales;
  return `<div style="overflow-y:auto;height:calc(100vh - 52px);padding:20px 24px;">
    <div class="page-header"><div><div class="page-title">Verified Sales Intelligence</div><div class="page-subtitle">Track authenticity, impact, and ROI of verified sales across your network.</div></div><button class="btn btn-outline">↓ Download Report</button></div>
    <div class="metrics-row mb-18" style="grid-template-columns:repeat(6,1fr);">${d.metrics.map((m,i)=>{const ic=['💰','🛡️','❌','📊','📈','🎁'][i];const col=['green','green','red','blue','orange','purple'][i];return `<div class="metric-card"><div class="metric-icon ${col}">${ic}</div><div class="metric-label">${m.label}</div><div class="metric-value" style="font-size:20px;">${m.value}</div><div class="metric-change ${m.up?'up':'down'}">${upArrow(m.up)} ${m.change} <span class="sub">vs 30d</span></div></div>`;}).join('')}</div>
    <div class="tab-bar">${['Overview','Trend Analysis','Geography','SKU Performance','Field Agents'].map((t,i)=>`<div class="tab-item${i===0?' active':''}">${t}</div>`).join('')}<div style="margin-left:auto;display:flex;gap:8px;align-items:center;">${filterSelect('Time','Last 30 Days','vsTime',['Last 7 Days','Last 90 Days'])}${filterSelect('Region','All Regions','vsRegion',['East','West','North','South'])}</div></div>
    <div class="grid-2-1 mb-14">
      <div class="card"><div class="card-title" style="margin-bottom:10px;">Verified vs Non-Verified Trend</div><div class="chart-box" style="height:160px;"><canvas id="verifiedTrendChart"></canvas></div></div>
      <div class="card">
        <div class="card-title" style="margin-bottom:14px;">Sales Split</div>
        <div style="display:flex;align-items:center;gap:16px;margin-bottom:12px;">
          <div style="position:relative;width:110px;height:110px;flex-shrink:0;"><canvas id="verifiedStatusDonut"></canvas><div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;"><div style="font-size:12px;font-weight:800;color:var(--text);">₹156.48Cr</div><div style="font-size:9px;color:var(--text3);">Total Sales</div></div></div>
          <div><div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;"><div style="width:10px;height:10px;background:var(--green);border-radius:50%;"></div><div><div style="font-size:12px;font-weight:600;">Verified</div><div style="font-size:11px;color:var(--text3);">₹98.73 Cr (63.1%)</div></div></div><div style="display:flex;align-items:center;gap:8px;"><div style="width:10px;height:10px;background:var(--orange);border-radius:50%;"></div><div><div style="font-size:12px;font-weight:600;">Non-Verified</div><div style="font-size:11px;color:var(--text3);">₹57.75 Cr (36.9%)</div></div></div></div>
        </div>
        <div style="background:var(--bg3);border-radius:6px;padding:10px;text-align:center;"><div style="font-size:11px;color:var(--text3);">Verified sales are</div><div style="font-size:22px;font-weight:800;color:var(--green);">1.71x</div><div style="font-size:11px;color:var(--text3);">higher than non-verified</div></div>
      </div>
    </div>
    <div class="grid-3">
      <div class="card"><div class="card-title" style="margin-bottom:12px;">ROI Bridge</div><div class="chart-box" style="height:150px;"><canvas id="roiBridgeChart"></canvas></div><div style="text-align:center;margin-top:8px;font-size:11px;color:var(--text3);">ROI per Verified Sale: <span style="color:var(--green);font-weight:700;">3.74x</span></div></div>
      <div class="card"><div class="card-header"><div class="card-title">SKUs by Verification Rate</div><span class="card-link">View All</span></div><table class="data-table"><thead><tr><th>SKU</th><th>Rate</th><th>Sales (₹Cr)</th></tr></thead><tbody>${d.topSKUs.map(s=>`<tr><td class="td-name">${s.sku}</td><td><div style="display:flex;align-items:center;gap:6px;"><div style="flex:1;background:var(--bg4);border-radius:2px;height:5px;max-width:80px;"><div style="width:${s.barPct}%;height:100%;background:${s.barColor==='green'?'var(--green)':s.barColor==='yellow'?'var(--yellow)':'var(--red)'};border-radius:2px;"></div></div><span style="font-size:11px;font-weight:600;">${s.rate}</span></div></td><td class="td-value">${s.sales}</td></tr>`).join('')}</tbody></table></div>
      <div class="card"><div class="card-header"><div class="card-title">Under-Verified Areas</div><span class="card-link">View Action Plan</span></div><table class="data-table"><thead><tr><th>Region</th><th>Rate</th><th>Gap</th><th></th></tr></thead><tbody>${d.underVerified.map(u=>`<tr><td class="td-name">${u.region}</td><td>${u.rate}</td><td><span class="gap-val">${u.gap}</span></td><td><button class="btn btn-blue btn-sm" style="font-size:10px;">Act</button></td></tr>`).join('')}</tbody></table></div>
    </div>
  </div>`;
}

// ===== USERS =====
function buildUsers(){
  return `<div style="display:grid;grid-template-columns:1fr 240px;height:calc(100vh - 52px);">
  <div style="overflow-y:auto;padding:20px;">
    <div class="page-header"><div><div class="page-title">User Assignment</div><div class="page-subtitle">Assign users to roles and geographical areas</div></div><div class="page-actions"><button class="btn btn-primary">+ Invite User</button><button class="btn btn-outline">↓ Export</button></div></div>
    <div class="tab-bar"><div class="tab-item active">Users</div><div class="tab-item">Bulk Assignment</div><div class="tab-item">Pending Invitations</div></div>
    <div class="metrics-row mb-14" style="grid-template-columns:repeat(4,1fr);">${[['Total Users','1,248','+12 this month'],['Active Users','1,156','92.8%'],['Pending','45','— 30d'],['Inactive','47 ⚠️','3.8%']].map(([l,v,s])=>`<div class="metric-card"><div class="metric-label">${l}</div><div class="metric-value">${v}</div><div style="font-size:11px;color:var(--text3);margin-top:4px;">${s}</div></div>`).join('')}</div>
    <div class="card"><table class="data-table"><thead><tr><th>User</th><th>Role</th><th>Territory</th><th>Reports To</th><th>Last Active</th><th>Status</th><th></th></tr></thead>
    <tbody>${DATA.users.map(u=>`<tr><td><div style="display:flex;align-items:center;gap:8px;"><div style="width:32px;height:32px;border-radius:50%;background:${u.color}22;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:${u.color};">${u.initials}</div><div><div style="font-size:12.5px;font-weight:600;color:var(--text);">${u.name}</div><div style="font-size:10px;color:var(--text3);">${u.email}</div></div></div></td><td>${u.role}</td><td>${u.territory}</td><td>${u.reportsTo}</td><td style="font-size:11px;">${u.lastActive}</td><td><span class="badge ${u.status==='active'?'badge-green':'badge-red'}">${u.status}</span></td><td><button class="btn btn-ghost btn-sm">⋮</button></td></tr>`).join('')}</tbody></table>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-top:12px;"><span style="font-size:11px;color:var(--text3);">Showing 1-7 of 1,248</span><div class="pagination"><button class="pg-btn">‹</button><button class="pg-btn active">1</button><button class="pg-btn">2</button><button class="pg-btn">...</button><button class="pg-btn">178</button><button class="pg-btn">›</button></div></div>
    </div>
  </div>
  <div style="background:var(--bg2);border-left:1px solid var(--border);padding:16px;overflow-y:auto;">
    <div class="assign-panel">
      <div style="font-size:14px;font-weight:600;margin-bottom:10px;">Assign Geography</div>
      <div style="display:flex;align-items:center;gap:8px;padding:10px;background:var(--bg3);border-radius:8px;margin-bottom:12px;"><div style="width:32px;height:32px;border-radius:50%;background:var(--orange-dim);color:var(--orange);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;">AS</div><div><div style="font-size:13px;font-weight:600;">Amit Singh</div><div style="font-size:11px;color:var(--text3);">Territory Manager</div></div></div>
      <div style="font-size:11px;color:var(--text3);margin-bottom:6px;">Current Assignment</div>
      <div style="background:var(--bg4);border-radius:6px;padding:10px;margin-bottom:12px;"><div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;"><div style="width:8px;height:8px;background:var(--green);border-radius:50%;"></div><div style="font-size:12.5px;font-weight:600;color:var(--green);">Lucknow Territory</div></div><div style="font-size:11px;color:var(--text3);">3 Districts, 24 Talukas, 312 Villages</div></div>
      <div style="font-size:11px;color:var(--text3);font-weight:600;margin-bottom:6px;">Modify Assignment</div>
      <div style="padding:6px 0;font-size:11.5px;color:var(--green);cursor:pointer;">+ Add Districts / Add Talukas</div>
      <div style="padding:6px 0;font-size:11.5px;color:var(--green);cursor:pointer;">+ Set Role As</div>
      <div style="padding:8px 0;font-size:11.5px;color:var(--red);cursor:pointer;">🗑 Remove</div>
      <button class="btn btn-primary" style="width:100%;margin-top:8px;">Update Assignment</button>
    </div>
  </div>
  </div>`;
}

// ===== PERMISSIONS =====
const permState = {};
function initPermState(){
  if(Object.keys(permState).length>0)return;
  DATA.permissions.modules.forEach(mod=>{mod.items.forEach(item=>{['hq','rh','sh','tm','fa'].forEach(r=>{permState[`${item.label}__${r}`]=item[r];});});});
}
function cyclePerm(label,role){
  const key=`${label}__${role}`;
  const cycle={allow:'partial',partial:'deny',deny:'na',na:'allow'};
  permState[key]=cycle[permState[key]]||'allow';
  document.getElementById(`perm_${key.replace(/ /g,'_').replace(/\//g,'_')}`).innerHTML=permIconHTML(permState[key]);
}
function permIconHTML(v){
  if(v==='allow') return `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>`;
  if(v==='deny') return `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
  if(v==='partial') return `<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#eab308" stroke-width="2"/><path d="M8 12h8" stroke="#eab308" stroke-width="2" stroke-linecap="round"/></svg>`;
  return `<span style="color:var(--text4);font-size:13px;">—</span>`;
}
function buildPermissions(){
  initPermState();
  const p=DATA.permissions;
  return `<div style="display:grid;grid-template-columns:1fr 220px;height:calc(100vh - 52px);">
  <div style="overflow-y:auto;padding:20px;">
    <div class="page-header"><div><div class="page-title">Role Rights & Permissions</div><div class="page-subtitle">Click any permission cell to toggle — changes are reflected live</div></div><div class="page-actions"><button class="btn btn-primary" onclick="alert('Permissions saved!')">Save Changes</button><button class="btn btn-outline">↓ Export Matrix</button></div></div>
    <div class="tab-bar"><div class="tab-item">Roles</div><div class="tab-item active">Permissions</div><div class="tab-item">Data Access</div></div>
    <div style="display:flex;gap:8px;margin-bottom:12px;">
      <div class="search-wrap" style="max-width:220px;border-radius:6px;"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg><input type="text" placeholder="Search permissions" class="search-input" style="font-size:11px;" oninput="filterPerms(this.value)"/></div>
      <div style="margin-left:auto;display:flex;gap:6px;"><button class="btn btn-outline btn-sm" onclick="resetPerms()">↺ Reset All</button></div>
    </div>
    <div class="card" style="padding:0;overflow:hidden;" id="permCard">
      <table class="perm-table">
        <thead><tr><th class="left" style="padding:10px 14px;min-width:220px;">Module / Permission</th><th>HQ Admin</th><th>Region Head</th><th>State Head</th><th>Territory Mgr</th><th>Field Agent</th></tr></thead>
        <tbody id="permBody">
          ${p.modules.map(mod=>`
            <tr class="module-row perm-module-row"><td class="left" colspan="6" style="padding:8px 14px;"><div style="display:flex;align-items:center;gap:6px;">${IC[mod.icon]||IC.dashboard} ${mod.name}</div></td></tr>
            ${mod.items.map(item=>{
              const roles=['hq','rh','sh','tm','fa'];
              return `<tr class="perm-data-row"><td class="left" style="padding:8px 14px 8px 28px;color:var(--text2);font-size:12px;"><div style="display:flex;align-items:center;gap:6px;"><div style="width:5px;height:5px;border-radius:50%;background:var(--border2);"></div>${item.label}</div></td>${roles.map(r=>{const key=`${item.label}__${r}`;const safeKey=key.replace(/ /g,'_').replace(/\//g,'_');return `<td style="text-align:center;"><div class="perm-cell" id="perm_${safeKey}" onclick="cyclePerm('${item.label}','${r}')" title="Click to change">${permIconHTML(permState[key]||item[r])}</div></td>`;}).join('')}</tr>`;}).join('')}
          `).join('')}
        </tbody>
      </table>
      <div style="padding:10px 14px;border-top:1px solid var(--border);display:flex;gap:16px;flex-wrap:wrap;">
        ${[['#22c55e','Allow'],['#eab308','Partial'],['#ef4444','Denied'],['#475569','Not Applicable']].map(([c,l])=>`<span style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--text3);"><div style="width:9px;height:9px;border-radius:50%;background:${c};"></div>${l} — click cell to cycle</span>`).join('')}
      </div>
    </div>
  </div>
  <div style="background:var(--bg2);border-left:1px solid var(--border);padding:16px;overflow-y:auto;">
    <div class="assign-panel">
      <div style="font-size:14px;font-weight:600;margin-bottom:10px;">Permission Details</div>
      <div style="font-size:13px;font-weight:600;color:var(--green);margin-bottom:4px;">View Retailer Data</div>
      <div style="font-size:11.5px;color:var(--text2);line-height:1.5;margin-bottom:12px;">Allows viewing retailer-level data including sales, stock, and sell details</div>
      <hr style="border-color:var(--border);margin:12px 0;"/>
      <div style="font-size:12px;font-weight:600;margin-bottom:8px;">Data Level Access</div>
      ${[['None',false],['Aggregated (District/Village)',false],['Full (Retailer-level)',true]].map(([l,checked])=>`<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;cursor:pointer;" onclick="this.querySelector('div').style.background=this.querySelector('div').style.background==='#22c55e'?'transparent':'#22c55e'"><div style="width:14px;height:14px;border-radius:50%;border:2px solid ${checked?'var(--green)':'var(--border2)'};background:${checked?'var(--green)':'transparent'};display:flex;align-items:center;justify-content:center;">${checked?'<div style="width:5px;height:5px;background:#fff;border-radius:50%;"></div>':''}</div><span style="font-size:12px;color:var(--text2);">${l}</span></div>`).join('')}
      <hr style="border-color:var(--border);margin:12px 0;"/>
      <div style="font-size:12px;font-weight:600;margin-bottom:8px;">Role Summary</div>
      ${[['HQ Admin','Full access to all modules'],['Region Head','Read-only regional data'],['State Head','State-level write access'],['Territory Mgr','Territory data, limited write'],['Field Agent','Own data only']].map(([r,d])=>`<div style="padding:6px 0;border-bottom:1px solid rgba(30,45,61,0.4);"><div style="font-size:12px;font-weight:600;color:var(--text);">${r}</div><div style="font-size:10px;color:var(--text3);">${d}</div></div>`).join('')}
      <button class="btn btn-primary" style="width:100%;margin-top:12px;" onclick="alert('Permissions saved!')">Save Changes</button>
    </div>
  </div>
  </div>`;
}
function filterPerms(q){
  document.querySelectorAll('.perm-data-row').forEach(row=>{
    const label=row.querySelector('td.left').textContent.trim().toLowerCase();
    row.style.display=!q||label.includes(q.toLowerCase())?'':'none';
  });
  document.querySelectorAll('.perm-module-row').forEach(row=>{
    const next=row.nextElementSibling;
    if(next&&next.style.display==='none')row.style.display='none';
    else row.style.display='';
  });
}
function resetPerms(){
  DATA.permissions.modules.forEach(mod=>{mod.items.forEach(item=>{['hq','rh','sh','tm','fa'].forEach(r=>{const key=`${item.label}__${r}`;permState[key]=item[r];const safeKey=key.replace(/ /g,'_').replace(/\//g,'_');const el=document.getElementById(`perm_${safeKey}`);if(el)el.innerHTML=permIconHTML(item[r]);});});});
}

// ===== GEOGRAPHY =====
function buildGeography(){
  const g=DATA.geoTree;
  function renderTree(node,depth=0){const has=node.children&&node.children.length>0;return `<div><div class="geo-tree-item ${depth===2?'active':''}" style="padding-left:${8+depth*12}px;">${node.color?`<div class="geo-color-dot" style="background:${node.color};"></div>`:''}${has?`<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>`:'<div style="width:10px;"></div>'}<span>${node.label}</span>${node.territories?`<span style="font-size:10px;color:var(--text3);margin-left:4px;">${node.territories} Territories</span>`:''}</div>${has?node.children.map(c=>renderTree(c,depth+1)).join(''):''}</div>`;}
  return `<div style="overflow-y:auto;height:calc(100vh - 52px);padding:20px;">
    <div class="page-header"><div><div class="page-title">Geography Mapping Builder</div><div class="page-subtitle">Map and manage geographical boundaries</div></div><button class="btn btn-ghost btn-sm">ℹ How it works</button></div>
    <div class="filter-bar">${filterSelect('Company','Godrej Agrovet')}${filterSelect('View by','Territory')}${filterSelect('Territory','Lucknow Territory')}</div>
    <div style="display:flex;gap:12px;margin-bottom:14px;padding:10px 14px;background:var(--bg3);border:1px solid var(--border);border-radius:8px;font-size:12px;">${['3 Districts','24 Talukas','372 Villages','12,842 Retailers'].map(v=>`<span style="font-weight:600;color:var(--text);">${v}</span>`).join('<span style="color:var(--border2);">|</span>')}</div>
    <div style="display:grid;grid-template-columns:200px 1fr 190px;gap:14px;">
      <div class="card" style="padding:10px;"><div style="font-size:12px;font-weight:600;margin-bottom:8px;">Geography Tree</div><div class="geo-tree">${renderTree(g)}</div></div>
      <div class="card" style="padding:10px;"><div style="display:flex;justify-content:flex-end;gap:4px;margin-bottom:8px;"><button class="btn btn-outline btn-sm active" style="font-size:11px;">Map</button><button class="btn btn-ghost btn-sm" style="font-size:11px;">Satellite</button></div>${largeMapSVG()}</div>
      <div style="display:flex;flex-direction:column;gap:10px;">
        <div class="card"><div style="font-size:13px;font-weight:600;margin-bottom:10px;">Mapping Tools</div>${filterSelect('Select Level','Village')}<div style="display:flex;gap:8px;justify-content:center;margin:12px 0;">${[['✏️','Draw'],['⬆️','Upload'],['➕','Bulk Add']].map(([i,l])=>`<div style="display:flex;flex-direction:column;align-items:center;gap:4px;cursor:pointer;"><div style="width:32px;height:32px;background:var(--bg3);border:1px solid var(--border);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:14px;">${i}</div><span style="font-size:10px;color:var(--text3);">${l}</span></div>`).join('')}</div></div>
        <div class="card"><div style="font-size:12px;font-weight:600;margin-bottom:10px;">Selected Area</div><div style="font-size:13px;font-weight:700;color:var(--green);margin-bottom:8px;">Lucknow Territory</div>${[['5','Districts'],['24','Talukas'],['312','Villages'],['12,642','Retailers']].map(([n,l])=>`<div style="display:flex;justify-content:space-between;margin-bottom:5px;"><span style="font-size:20px;font-weight:700;">${n}</span><span style="font-size:10px;color:var(--text3);align-self:flex-end;">${l}</span></div>`).join('')}<button class="btn btn-primary" style="width:100%;margin-top:8px;">Save Mapping</button></div>
      </div>
    </div>
  </div>`;
}

// ===== HIERARCHY =====
function buildHierarchy(){
  return `<div style="overflow-y:auto;height:calc(100vh - 52px);padding:20px;">
    <div class="page-header"><div><div class="page-title">Hierarchy Setup</div><div class="page-subtitle">Define your organizational structure and role hierarchy</div></div><button class="btn btn-outline">↓ Export</button></div>
    <div class="tab-bar"><div class="tab-item active">Hierarchy Builder</div><div class="tab-item">Role Levels</div></div>
    <div style="display:grid;grid-template-columns:1fr 220px;gap:16px;">
      <div>
        <div style="display:flex;gap:8px;margin-bottom:14px;align-items:center;">${filterSelect('Company','Godrej Agrovet')}${filterSelect('Version','2024 - v1 (Active)')}<div style="margin-left:auto;"><button class="btn btn-primary">+ Add Level</button></div></div>
        <div class="card" style="overflow-x:auto;min-height:400px;">
          <div style="display:flex;flex-direction:column;align-items:center;padding:20px;gap:0;">
            <div style="display:flex;flex-direction:column;align-items:center;"><div class="org-node-box hq" style="min-width:120px;"><div style="font-size:18px;margin-bottom:2px;">🏢</div><div class="org-node-title">HQ</div><div class="org-node-sub">Level 1 · National</div></div><div class="org-connector"></div></div>
            <div style="display:flex;gap:50px;align-items:flex-start;position:relative;">${[['East Region','5 States'],['West Region','5 States']].map(([n,s])=>`<div style="display:flex;flex-direction:column;align-items:center;"><div class="org-node-box region"><div style="font-size:14px;margin-bottom:2px;">🌍</div><div class="org-node-title">${n}</div><div class="org-node-sub">${s}</div></div><div class="org-connector"></div></div>`).join('')}</div>
            <div style="display:flex;gap:20px;align-items:flex-start;position:relative;">${['UP','Bihar','Maharashtra','Rajasthan'].map(n=>`<div style="display:flex;flex-direction:column;align-items:center;"><div class="org-node-box state"><div style="font-size:13px;margin-bottom:2px;">🏛️</div><div class="org-node-title">${n}</div><div class="org-node-sub">Level 3</div></div><div class="org-connector"></div></div>`).join('')}</div>
            <div style="display:flex;gap:12px;align-items:flex-start;position:relative;">${['Ter A','Ter B','Ter C','Ter D'].map((n,i)=>`<div style="display:flex;flex-direction:column;align-items:center;"><div class="org-node-box territory" style="${i===1?'border-color:var(--orange);':''}"><div style="font-size:12px;margin-bottom:2px;">🗺️</div><div class="org-node-title">${n}</div><div class="org-node-sub">Level 4</div></div><div class="org-connector"></div></div>`).join('')}</div>
            <div style="display:flex;gap:6px;align-items:flex-start;">${['Agent','Agent','Agent','Agent','Agent','Agent'].map((n,i)=>`<div style="display:flex;flex-direction:column;align-items:center;"><div class="org-node-box agent" style="min-width:72px;"><div style="font-size:12px;margin-bottom:2px;">👤</div><div class="org-node-title">${n}</div><div class="org-node-sub">10-15 Villages</div></div></div>`).join('')}</div>
            <div style="text-align:center;margin-top:16px;font-size:10px;color:var(--text3);">🟢 Click on any node to edit · Drag to reorder</div>
          </div>
        </div>
      </div>
      <div class="assign-panel" style="height:fit-content;">
        <div style="font-size:13px;font-weight:600;margin-bottom:12px;">Level Configuration</div>
        <div style="display:flex;align-items:center;gap:8px;padding:8px;background:var(--bg3);border-radius:6px;margin-bottom:12px;"><div style="width:28px;height:28px;background:var(--orange-dim);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:14px;">🗺️</div><div><div style="font-size:13px;font-weight:600;">Territory</div><div style="font-size:11px;color:var(--text3);">Level 4</div></div></div>
        ${[['Level Name','Territory'],['Reports To','State']].map(([l,v])=>`<div style="margin-bottom:10px;"><div style="font-size:11px;color:var(--text3);margin-bottom:4px;">${l}</div>${l==='Reports To'?`<select class="filter-select" style="width:100%;"><option>${v}</option></select>`:`<input type="text" value="${v}" style="width:100%;background:var(--bg3);border:1px solid var(--border);color:var(--text);font-family:var(--font);font-size:12px;padding:6px 10px;border-radius:6px;outline:none;"/>`}</div>`).join('')}
        <div style="margin-bottom:10px;"><div style="font-size:11px;color:var(--text3);margin-bottom:4px;">Description</div><textarea style="width:100%;background:var(--bg3);border:1px solid var(--border);color:var(--text);font-family:var(--font);font-size:11px;padding:6px 10px;border-radius:6px;outline:none;resize:none;height:56px;">Manages a group of districts and oversees field agent operations</textarea></div>
        <button class="btn btn-primary" style="width:100%;margin-top:4px;" onclick="alert('Level configuration saved!')">Save Changes</button>
      </div>
    </div>
  </div>`;
}

// ===== CAMPAIGNS =====
function buildCampaigns(){
  const all=DATA.hq.campaigns.concat([{name:'Kisan Mela 2024',sku:'All SKUs',region:'All India',spend:'₹52.1L',sales:'₹2.1 Cr',roi:'4.0x'},{name:'Soil Doctor',sku:'Soil Health Card',region:'West',spend:'₹12.3L',sales:'₹48.2L',roi:'3.9x'}]);
  return `<div style="overflow-y:auto;height:calc(100vh - 52px);padding:20px;">
    <div class="page-header"><div><div class="page-title">Campaigns</div><div class="page-subtitle">Track and manage all active campaigns</div></div><button class="btn btn-primary">+ Create Campaign</button></div>
    <div class="metrics-row mb-14" style="grid-template-columns:repeat(4,1fr);">${[['Active Campaigns','12','+2 this month'],['Total Spend','₹2.4 Cr','Within budget'],['Avg. ROI','3.9x','+0.4x vs last month'],['Expiring Soon','3','In next 7 days']].map(([l,v,s])=>`<div class="metric-card"><div class="metric-label">${l}</div><div class="metric-value">${v}</div><div style="font-size:11px;color:var(--text3);margin-top:4px;">${s}</div></div>`).join('')}</div>
    <div class="card"><table class="data-table"><thead><tr><th>Campaign</th><th>SKU</th><th>Region</th><th>Status</th><th>Spend</th><th>Sales</th><th>ROI</th><th>End Date</th><th></th></tr></thead>
    <tbody>${all.map((c,i)=>`<tr><td class="td-name">${c.name}</td><td>${c.sku}</td><td>${c.region}</td><td><span class="badge badge-green">Active</span></td><td>${c.spend}</td><td class="td-value">${c.sales}</td><td style="color:var(--green);font-weight:700;">${c.roi}</td><td style="font-size:11px;color:var(--text3);">Apr ${20+i}, 2024</td><td><button class="btn btn-ghost btn-sm">⋮</button></td></tr>`).join('')}</tbody></table></div>
  </div>`;
}

// ===== REPORTS =====
function buildReports(){
  return `<div style="overflow-y:auto;height:calc(100vh - 52px);padding:20px;">
    <div class="page-header"><div><div class="page-title">Reports</div><div class="page-subtitle">Download and schedule reports</div></div><button class="btn btn-primary">+ Schedule Report</button></div>
    <div class="grid-2">${[['Monthly Performance Report','All India — Last 30 Days','Ready','green'],['Verified Sales Analysis','All Regions — Apr 2024','Ready','green'],['Campaign ROI Report','Q1 2024 Campaign Summary','Processing','yellow'],['Field Agent Activity','Lucknow Territory — This Week','Ready','green'],['Retailer Health Report','Low Activity Villages','Ready','green'],['SKU Penetration Analysis','All SKUs — Last 90 Days','Scheduled','blue']].map(([t,s,b,c])=>`<div class="card" style="display:flex;align-items:center;gap:12px;"><div style="width:40px;height:40px;background:var(--bg3);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:20px;">📊</div><div style="flex:1;"><div style="font-size:13px;font-weight:600;">${t}</div><div style="font-size:11px;color:var(--text3);">${s}</div></div><div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px;"><span class="badge badge-${c}">${b}</span><button class="btn btn-outline btn-sm" style="font-size:10px;">↓ Download</button></div></div>`).join('')}</div>
  </div>`;
}

// ===== SETTINGS =====
function buildSettings(){
  return `<div style="overflow-y:auto;height:calc(100vh - 52px);padding:20px;max-width:700px;">
    <div class="page-header"><div><div class="page-title">Settings</div><div class="page-subtitle">Manage your account and platform preferences</div></div></div>
    ${[
      {section:'Profile',items:[{l:'Display Name',s:'Ankit Mehta',type:'input'},{l:'Email Address',s:'ankit.m@godrej.com',type:'input'},{l:'Phone Number',s:'+91 98765 43210',type:'input'}]},
      {section:'Notifications',items:[{l:'Email Notifications',s:'Receive daily summary emails',type:'toggle',on:true},{l:'Push Notifications',s:'Alerts on mobile app',type:'toggle',on:true},{l:'Weekly Reports',s:'Auto-receive reports every Monday',type:'toggle',on:false}]},
      {section:'Display',items:[{l:'Dark Mode',s:'Toggle between dark and light theme',type:'toggle-theme',on:true},{l:'Compact View',s:'Reduce spacing in tables and cards',type:'toggle',on:false},{l:'Show Grid Lines',s:'Display grid lines in charts',type:'toggle',on:true}]},
      {section:'Security',items:[{l:'Two-Factor Authentication',s:'Enabled via Authenticator App',type:'toggle',on:true},{l:'Session Timeout',s:'Auto-logout after 2 hours',type:'select'}]},
    ].map(s=>`<div class="settings-section"><div class="settings-section-title">${s.section}</div>${s.items.map(item=>`<div class="settings-row"><div><div class="settings-label">${item.l}</div><div class="settings-sub">${item.s}</div></div>${item.type==='toggle-theme'?`<button class="toggle ${darkMode?'on':''}" id="darkModeToggle" onclick="toggleDarkMode(this)"></button>`:item.type==='toggle'?`<button class="toggle ${item.on?'on':''}" onclick="this.classList.toggle('on')"></button>`:item.type==='select'?`<select class="filter-select" style="font-size:11px;"><option>2 hours</option><option>4 hours</option><option>8 hours</option></select>`:`<input type="text" value="${item.s}" style="width:200px;background:var(--bg3);border:1px solid var(--border);color:var(--text);font-family:var(--font);font-size:12px;padding:5px 10px;border-radius:6px;outline:none;"/>`}</div>`).join('')}</div>`).join('')}
  </div>`;
}
function toggleDarkMode(btn){
  btn.classList.toggle('on');
  const isDark = btn.classList.contains('on');
  setTheme(isDark);
}

// ===== OVERVIEW (ADMIN) =====
function buildOverview(){
  return `<div style="overflow-y:auto;height:calc(100vh - 52px);padding:20px;">
    <div class="page-header"><div><div class="page-title">Platform Overview</div><div class="page-subtitle">Super admin — full platform intelligence</div></div></div>
    <div class="metrics-row" style="grid-template-columns:repeat(6,1fr);">${[['Total Users','1,248','green'],['Total Retailers','82,410','blue'],['Active Villages','1,24,890','purple'],['Sales (National)','₹156.48 Cr','green'],['Verified Sales','63.1%','green'],['Platform Health','98.4%','cyan']].map(([l,v,c])=>`<div class="metric-card"><div class="metric-icon ${c}">${{green:'💰',blue:'🏪',purple:'🏘️',cyan:'⚙️'}[c]||'📊'}</div><div class="metric-label">${l}</div><div class="metric-value">${v}</div></div>`).join('')}</div>
    <div class="grid-2 mb-14" style="margin-top:14px;">
      <div class="card"><div class="card-title" style="margin-bottom:12px;">System Health</div>${[['API Uptime','99.98%','green'],['Data Sync','Real-time','green'],['Active Sessions','1,248','blue'],['Failed Logins','3','red']].map(([l,v,c])=>`<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(30,45,61,0.4);"><span style="font-size:12px;color:var(--text2);">${l}</span><span style="font-size:12px;font-weight:600;color:var(--${c});">${v}</span></div>`).join('')}</div>
      <div class="card"><div class="card-title" style="margin-bottom:12px;">Quick Navigation</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">${[['🏗️','Hierarchy Setup','hierarchy'],['🗺️','Geography Mapping','geography'],['🛡️','Roles & Permissions','permissions'],['🛡️','Verified Sales','verified-sales']].map(([i,l,s])=>`<button class="quick-action-btn" onclick="navigate('${s}')"><span style="font-size:20px;">${i}</span><span style="font-size:10px;">${l}</span></button>`).join('')}</div></div>
    </div>
  </div>`;
}

// ===== PLACEHOLDER =====
function buildPlaceholder(sid){return `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:calc(100vh - 52px);gap:12px;"><div style="font-size:40px;">🚧</div><div style="font-size:18px;font-weight:600;color:var(--text);">${sid.replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase())}</div><div style="font-size:13px;color:var(--text3);">Screen under construction</div><button class="btn btn-outline" onclick="navigate('${DATA.roles[currentRole].defaultScreen}')">← Back to Dashboard</button></div>`;}

// ===== CHART DRAWING (Chart.js) =====
function drawHQCharts(){
  const labels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  makeLineChart('hqTrendChart', labels, [
    {label:'Sales (₹ Cr)',data:[6.8,7.1,6.9,7.4,8.2,8.6,9.1,9.3,9.8,9.5,9.8,10.1],borderColor:'#22c55e',fill:true},
    {label:'Verified %',data:[55,58,56,60,62,63,65,66,68,67,68,69],borderColor:'#3b82f6',fill:false,yAxisID:'y1'},
  ], {legend:true,extra:{scales:{y:{type:'linear',position:'left'},y1:{type:'linear',position:'right',grid:{display:false},ticks:{color:chartColors().tick,font:{family:'DM Sans',size:10},callback:v=>v+'%'}}}}});
  makeDoughnutChart('hqSkuDonut',['Nano Urea','DAP','NPK','Zyme','Others'],[29,23,17,18,13],['#22c55e','#3b82f6','#a855f7','#f97316','#eab308']);
}
function drawFieldCharts(){
  makeLineChart('fieldTrendChart',['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],[
    {label:'Sales (₹)',data:[18000,22000,19500,25000,28000,24000,28450],borderColor:'#22c55e',fill:true},
    {label:'Verified (₹)',data:[14000,17000,15000,20000,22000,19000,22350],borderColor:'#3b82f6',fill:false},
  ],{legend:true,yFormat:v=>v>=1000?`₹${(v/1000).toFixed(0)}k`:v});
  makeDoughnutChart('fieldProgressDonut',['Achieved','Remaining'],[67,33],['#22c55e','#1a2430']);
  makeDoughnutChart('villageCoverageDonut',['Active','Low Activity','Not Visited'],[76,17,7],['#22c55e','#f97316','#ef4444']);
  makeDoughnutChart('retailerActivityDonut',['Active','At Risk','Inactive'],[68,20,11],['#22c55e','#eab308','#ef4444']);
}
function drawStateCharts(){
  makeLineChart('stateActivationChart',['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep'],[
    {label:'Active Villages',data:[4100,4200,4350,4450,4550,4650,4750,4800,4892],borderColor:'#22c55e',fill:true},
    {label:'Verified %',data:[52,54,55,57,58,60,61,62,63],borderColor:'#3b82f6',fill:false,yAxisID:'y1'},
  ],{legend:true,extra:{scales:{y:{type:'linear',position:'left'},y1:{type:'linear',position:'right',grid:{display:false},ticks:{color:chartColors().tick,font:{family:'DM Sans',size:10},callback:v=>v+'%'}}}}});
}
function drawTerritoryCharts(){
  const period=document.getElementById('terTrendPeriod');
  const weekly = period&&period.value==='Weekly';
  makeLineChart('territoryTrendChart',weekly?['W1','W2','W3','W4','W5','W6','W7','W8']:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep'],[
    {label:'Sales (₹ Cr)',data:weekly?[0.82,0.91,0.88,0.96,1.04,0.99,1.12,1.10]:[2.8,3.0,2.9,3.2,3.5,3.4,3.7,3.8,3.84],borderColor:'#22c55e',fill:true},
  ],{yFormat:v=>'₹'+v+'Cr'});
  makeDoughnutChart('territoryVillageDonut',['Active','Low Activity','Inactive'],[78,13,9],['#22c55e','#eab308','#ef4444']);
}
function drawVerifiedCharts(){
  makeLineChart('verifiedTrendChart',['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],[
    {label:'Verified Sales',data:[72,75,74,78,80,82,84,86,88,90,95,98.73],borderColor:'#22c55e',fill:true},
    {label:'Non-Verified Sales',data:[48,50,49,52,54,56,55,57,57,58,58,57.75],borderColor:'#f97316',fill:false},
    {label:'Verification Rate %',data:[55,58,56,59,60,61,62,63,63,64,64,63],borderColor:'#3b82f6',fill:false,yAxisID:'y1'},
  ],{legend:true,extra:{scales:{y:{type:'linear',position:'left'},y1:{type:'linear',position:'right',grid:{display:false},ticks:{color:chartColors().tick,font:{family:'DM Sans',size:10},callback:v=>v+'%'}}}}});
  makeDoughnutChart('verifiedStatusDonut',['Verified','Non-Verified'],[63,37],['#22c55e','#f97316']);
  makeBarChart('roiBridgeChart',['Base Cost','After Verif.','+ Loyalty','+ Repeat','Total ROI'],[
    {label:'ROI Index',data:[100,171,220,280,374],backgroundColor:['#22c55e55','#3b82f655','#a855f755','#f9731655','#22c55e'],borderColor:['#22c55e','#3b82f6','#a855f7','#f97316','#22c55e'],borderWidth:1.5},
  ],{yFormat:v=>v+'x (idx)'});
}

// ===== BOOT =====
document.addEventListener('DOMContentLoaded', init);
