// CounterOS — All Dummy Data
const DATA = {

  roles: {
    hq: {
      id: 'hq', label: 'HQ Admin', name: 'Ankit Mehta',
      avatar: 'AM', avatarColor: '#22c55e',
      org: 'Godrej Agrovet', orgSub: 'HQ Dashboard',
      defaultScreen: 'hq-dashboard',
      nav: [
        { id: 'hq-dashboard', label: 'Dashboards', icon: 'dashboard', badge: null },
        { id: 'geography', label: 'Geography', icon: 'map', badge: null },
        { id: 'users', label: 'Users & Roles', icon: 'users', badge: null },
        { id: 'campaigns', label: 'Campaigns', icon: 'campaign', badge: null },
        { id: 'retail', label: 'Retail Intelligence', icon: 'retail', badge: null },
        { id: 'sales-rewards', label: 'Sales & Rewards', icon: 'rewards', badge: null },
        { id: 'reports', label: 'Reports', icon: 'reports', badge: null },
        { id: 'approvals', label: 'Approvals', icon: 'approvals', badge: '12' },
      ]
    },
    field: {
      id: 'field', label: 'Field Agent', name: 'Ravi Singh',
      avatar: 'RS', avatarColor: '#3b82f6',
      org: 'Godrej Agrovet', orgSub: 'Uttar Pradesh',
      defaultScreen: 'field-dashboard',
      nav: [
        { id: 'field-dashboard', label: 'Dashboard', icon: 'dashboard', badge: null },
        { id: 'my-tasks', label: 'My Tasks', icon: 'tasks', badge: '8' },
        { id: 'retailers', label: 'Retailers', icon: 'retail', badge: null },
        { id: 'scan-sell', label: 'Scan & Sell', icon: 'scan', badge: null },
        { id: 'inventory', label: 'Inventory', icon: 'inventory', badge: null },
        { id: 'field-campaigns', label: 'Campaigns', icon: 'campaign', badge: null },
        { id: 'field-rewards', label: 'Rewards', icon: 'rewards', badge: null },
        { id: 'field-reports', label: 'Reports', icon: 'reports', badge: null },
      ]
    },
    state: {
      id: 'state', label: 'State Head', name: 'Rohit Mehra',
      avatar: 'RM', avatarColor: '#a855f7',
      org: 'Godrej Agrovet', orgSub: 'Uttar Pradesh',
      defaultScreen: 'state-dashboard',
      nav: [
        { id: 'state-dashboard', label: 'Dashboards', icon: 'dashboard', badge: null },
        { id: 'geography', label: 'Geography', icon: 'map', badge: null },
        { id: 'users', label: 'Users & Roles', icon: 'users', badge: null },
        { id: 'campaigns', label: 'Campaigns', icon: 'campaign', badge: null },
        { id: 'retail', label: 'Retail Intelligence', icon: 'retail', badge: null },
        { id: 'sales-rewards', label: 'Sales & Rewards', icon: 'rewards', badge: null },
        { id: 'reports', label: 'Reports', icon: 'reports', badge: null },
        { id: 'approvals', label: 'Approvals', icon: 'approvals', badge: '3' },
      ]
    },
    territory: {
      id: 'territory', label: 'Territory Mgr', name: 'Amit Singh',
      avatar: 'AS', avatarColor: '#f97316',
      org: 'Godrej Agrovet', orgSub: 'Uttar Pradesh',
      defaultScreen: 'territory-dashboard',
      nav: [
        { id: 'territory-dashboard', label: 'Dashboards', icon: 'dashboard', badge: null },
        { id: 'geography', label: 'Geography', icon: 'map', badge: null },
        { id: 'retail', label: 'Retail Intelligence', icon: 'retail', badge: null },
        { id: 'campaigns', label: 'Campaigns', icon: 'campaign', badge: null },
        { id: 'sales-rewards', label: 'Sales & Rewards', icon: 'rewards', badge: null },
        { id: 'field-team', label: 'Field Team', icon: 'users', badge: null },
        { id: 'reports', label: 'Reports', icon: 'reports', badge: null },
        { id: 'approvals', label: 'Approvals', icon: 'approvals', badge: '2' },
      ]
    },
    admin: {
      id: 'admin', label: 'Super Admin', name: 'Admin User',
      avatar: 'AD', avatarColor: '#06b6d4',
      org: 'Godrej Agrovet', orgSub: 'Super Admin',
      defaultScreen: 'verified-sales',
      nav: [
        { id: 'overview', label: 'Overview', icon: 'dashboard', badge: null },
        { id: 'hierarchy', label: 'Hierarchy', icon: 'hierarchy', badge: null },
        { id: 'geography', label: 'Geography', icon: 'map', badge: null },
        { id: 'permissions', label: 'Roles & Permissions', icon: 'shield', badge: null },
        { id: 'verified-sales', label: 'Verified Sales', icon: 'verified', badge: null },
        { id: 'reports', label: 'Reports', icon: 'reports', badge: null },
        { id: 'ratings', label: 'Ratings', icon: 'star', badge: null },
        { id: 'settings', label: 'Settings', icon: 'settings', badge: null },
      ]
    }
  },

  hq: {
    metrics: [
      { label: 'Total Sales', value: '₹9.8 Cr', change: '+12.4%', up: true, sub: 'vs last 30 days', icon: 'sales', color: 'green' },
      { label: 'Units Sold', value: '8,20,000', change: '+8.7%', up: true, sub: 'vs last 30 days', icon: 'box', color: 'blue' },
      { label: 'Active Retailers', value: '4,820', change: '+5.2%', up: true, sub: 'vs last 30 days', icon: 'store', color: 'purple' },
      { label: 'Verified Sales', value: '68%', change: '+6.3pp', up: true, sub: 'vs last 30 days', icon: 'verified', color: 'green' },
      { label: 'Avg. Reward / Sale', value: '₹3.2', change: '+0.4', up: true, sub: 'vs last 30 days', icon: 'gift', color: 'yellow' },
      { label: 'Campaign ROI', value: '3.8x', change: '+0.6x', up: true, sub: 'vs last 30 days', icon: 'roi', color: 'orange' },
    ],
    regions: [
      { name: 'East', dot: '#22c55e', sales: '₹3.2 Cr', growth: '+13.1%', verified: '64%', retailers: '1,842', roi: '3.5x' },
      { name: 'West', dot: '#f97316', sales: '₹2.7 Cr', growth: '+9.4%', verified: '69%', retailers: '1,283', roi: '4.1x' },
      { name: 'North', dot: '#3b82f6', sales: '₹2.1 Cr', growth: '+7.8%', verified: '61%', retailers: '1,125', roi: '3.2x' },
      { name: 'South', dot: '#a855f7', sales: '₹1.8 Cr', growth: '+5.2%', verified: '72%', retailers: '570', roi: '4.3x' },
    ],
    topStates: [
      { rank: 1, name: 'Maharashtra', sales: '₹1.9 Cr', growth: '+15.2%' },
      { rank: 2, name: 'Uttar Pradesh', sales: '₹1.6 Cr', growth: '+9.7%' },
      { rank: 3, name: 'Punjab', sales: '₹1.1 Cr', growth: '+7.3%' },
    ],
    campaigns: [
      { name: 'Harvest Boost', sku: 'Nano Urea', region: 'East', spend: '₹42.5L', sales: '₹1.9 Cr', roi: '4.5x' },
      { name: 'Gromor Push', sku: 'DAP', region: 'West', spend: '₹31.2L', sales: '₹1.1 Cr', roi: '3.6x' },
      { name: 'Soil Health Drive', sku: 'NPK', region: 'North', spend: '₹28.7L', sales: '₹96.4L', roi: '3.4x' },
      { name: 'Monsoon Ready', sku: 'Zyme', region: 'South', spend: '₹18.9L', sales: '₹74.1L', roi: '3.9x' },
    ],
    topActions: [
      { title: 'Increase incentive in Bihar', sub: 'Low verification & high opportunity', impact: '+22% sales', actionLabel: 'Take Action', actionColor: 'green', icon: '📈' },
      { title: 'Reduce spend in Haryana', sub: 'High saturation, low incremental ROI', impact: 'Save ₹6.2L', actionLabel: 'Review', actionColor: 'yellow', icon: '⚠️' },
      { title: 'Push Nano Urea in UP', sub: 'Low penetration, high demand', impact: '+18% sales', actionLabel: 'Create Campaign', actionColor: 'blue', icon: '🌱' },
    ],
    topSKUs: [
      { name: 'Nano Urea', sales: '₹2.8 Cr', units: '2.4L units', growth: '+14.5%', icon: '🌿' },
      { name: 'DAP', sales: '₹2.3 Cr', units: '3.1L units', growth: '+8.2%', icon: '🟡' },
      { name: 'NPK 19:19:19', sales: '₹1.6 Cr', units: '1.8L units', growth: '+6.7%', icon: '🔵' },
    ],
    lowAreas: [
      { name: 'Saharanpur, UP', sales: '₹12L', verification: '32%' },
      { name: 'Gaya, Bihar', sales: '₹9L', verification: '28%' },
      { name: 'Bhiwani, HR', sales: '₹8L', verification: '41%' },
    ],
    alerts: [
      { type: 'red', title: 'Low Verification', sub: '12 districts under 50% · 10m ago' },
      { type: 'blue', title: 'Campaign Overlap', sub: '3 overlapping campaigns · 25m ago' },
      { type: 'yellow', title: 'Budget Approval', sub: '₹18.5L pending approval · 1h ago' },
      { type: 'orange', title: 'Territory Gap', sub: '86 villages uncovered · 2h ago' },
    ]
  },

  field: {
    metrics: [
      { label: "Today's Sales", value: '₹28,450', change: '+12.6%', up: true, sub: 'vs yesterday', icon: 'sales', color: 'green' },
      { label: 'Verified Sales', value: '₹22,350', change: '78%', up: true, sub: 'of total sales', icon: 'verified', color: 'blue' },
      { label: 'Retailers Visited', value: '12 / 18', change: '67%', up: true, sub: 'of daily target', icon: 'store', color: 'purple' },
      { label: 'Orders Placed', value: '8', change: '+2', up: true, sub: 'vs yesterday', icon: 'box', color: 'orange' },
      { label: 'Rewards Earned', value: '₹320', change: '+₹45', up: true, sub: 'vs yesterday', icon: 'gift', color: 'yellow' },
      { label: 'Streak', value: '7 Days', sub: 'Keep it up!', icon: 'fire', color: 'orange', streak: true },
    ],
    tasks: [
      { label: 'Visit 18 retailers', done: 8, total: 18, pct: 44 },
      { label: 'Scan product to sell', done: 0, total: 4, pct: 0 },
      { label: 'Onboard new retailer', done: 0, total: 1, pct: 0 },
      { label: 'Collect farmer OTP', done: 2, total: 6, pct: 33 },
      { label: 'Attend village meeting', done: 0, total: 1, pct: 0, time: '1:30 PM' },
    ],
    villages: [
      { num: 1, name: 'Bakshi Ka Talab', time: '10:00 AM', retailers: 6 },
      { num: 2, name: 'Mohanlalganj', time: '11:30 AM', retailers: 5 },
      { num: 3, name: 'Malihabad', time: '02:30 PM', retailers: 4 },
      { num: 4, name: 'Kakori', time: '04:00 PM', retailers: 3 },
    ],
    recentVisits: [
      { name: 'Ram Kishan Store', location: 'Bakshi Ka Talab', time: '10:15 AM', amount: '₹3,450', status: 'verified' },
      { name: 'Sita Traders', location: 'Mohanlalganj', time: '11:45 AM', amount: '₹2,150', status: 'pending' },
      { name: 'New Bharat Store', location: 'Malihabad', time: '01:30 PM', amount: '₹1,200', status: 'verified' },
      { name: 'Sharma Agro', location: 'Kakori', time: '03:10 PM', amount: '₹2,800', status: 'pending' },
    ],
    topProducts: [
      { name: 'Nano Urea', sales: '₹62,500', icon: '🌿', pct: 85, meta: null },
      { name: 'DAP', sales: '₹41,160', icon: '🟡', pct: 60, meta: null },
      { name: 'NPK 19:19:19', sales: '₹28,880', icon: '🔵', pct: 40, meta: '76 bags' },
      { name: 'Zyme', sales: '₹12,600', icon: '🟢', pct: 20, meta: '42 bottles' },
      { name: 'Soil Health Card', sales: '₹3,000', icon: '📋', pct: 10, meta: '30 cards' },
    ],
    todayPlan: [
      { time: '09:30 AM', label: 'Start from Home', dot: 'yellow' },
      { time: '10:00 AM', label: 'Visit Bakshi Ka Talab (6 retailers)', dot: 'green' },
      { time: '11:30 AM', label: 'Visit Mohanlalganj (5 retailers)', dot: 'green' },
      { time: '01:00 PM', label: 'Lunch Break', dot: 'blue' },
      { time: '02:30 PM', label: 'Visit Malihabad (4 retailers)', dot: 'green' },
      { time: '04:00 PM', label: 'Visit Kakori (3 retailers)', dot: 'green' },
      { time: '06:00 PM', label: 'End Day & Sync Data', dot: 'yellow' },
    ],
    alerts: [
      { type: 'red', title: 'Low Stock Alert', sub: '3 retailers need Nano Urea · 2h ago' },
      { type: 'yellow', title: 'Follow-up Due', sub: '5 retailers to revisit · 4h ago' },
      { type: 'blue', title: 'Campaign Update', sub: 'New scheme in 12 villages · 6h ago' },
      { type: 'green', title: 'Reward Credited', sub: '₹120 added to wallet · 1d ago' },
    ]
  },

  state: {
    metrics: [
      { label: 'State Sales', value: '₹1.21 Cr', change: '+14.8%', up: true, sub: 'vs last 30 days', icon: 'sales', color: 'green' },
      { label: 'Active Districts', value: '61 / 75', change: '+4', up: true, sub: 'new this month', icon: 'map', color: 'blue' },
      { label: 'Active Villages', value: '4,892', change: '+7.2%', up: true, sub: 'vs last 30 days', icon: 'village', color: 'purple' },
      { label: 'Verified Sales', value: '63%', change: '+5.4pp', up: true, sub: 'vs last 30 days', icon: 'verified', color: 'green' },
      { label: 'Active Retailers', value: '18,742', change: '+5.1pp', up: true, sub: 'vs last 30 days', icon: 'store', color: 'orange' },
      { label: 'SKU Penetration', value: '71%', change: '+3.7pp', up: true, sub: 'vs last 30 days', icon: 'sku', color: 'cyan' },
      { label: 'Opportunity Score', value: '77 / 100', change: '+8 pts', up: true, sub: 'vs last 30 days', icon: 'score', color: 'yellow' },
    ],
    districts: [
      { name: 'Lucknow', sales: '₹18.4 L', growth: '+16.3%', up: true, villages: 312, verified: '66%', score: 85, scoreColor: 'score-green' },
      { name: 'Kanpur', sales: '₹15.7 L', growth: '+11.8%', up: true, villages: 280, verified: '62%', score: 78, scoreColor: 'score-green' },
      { name: 'Varanasi', sales: '₹12.9 L', growth: '+9.2%', up: true, villages: 243, verified: '58%', score: 72, scoreColor: 'score-green' },
      { name: 'Meerut', sales: '₹11.3 L', growth: '+6.4%', up: true, villages: 201, verified: '55%', score: 65, scoreColor: 'score-yellow' },
      { name: 'Agra', sales: '₹9.8 L', growth: '-2.1%', up: false, villages: 186, verified: '48%', score: 52, scoreColor: 'score-orange' },
    ],
    villagePerf: [
      { name: 'Akbarpur', district: 'Kanpur', retailers: 12, sales: '₹2.4 L', trend: 'up', lowStock: 2 },
      { name: 'Malihabad', district: 'Lucknow', retailers: 18, sales: '₹3.1 L', trend: 'up', lowStock: 1 },
      { name: 'Shahganj', district: 'Jaunpur', retailers: 9, sales: '₹1.2 L', trend: 'flat', lowStock: 3 },
      { name: 'Bachhraon', district: 'Raebareli', retailers: 11, sales: '₹1.8 L', trend: 'flat', lowStock: 0 },
      { name: 'Kundarki', district: 'Moradabad', retailers: 8, sales: '₹0.9 L', trend: 'down', lowStock: 4 },
    ],
    skuMovement: [
      { sku: 'Nano Urea', district: 'Lucknow', units: '24,320', growth: '+18.6%', share: '28%', icon: '🌿' },
      { sku: 'DAP', district: 'Kanpur', units: '18,540', growth: '+12.4%', share: '21%', icon: '🟡' },
      { sku: 'NPK 19:19:19', district: 'Varanasi', units: '16,780', growth: '+8.7%', share: '19%', icon: '🔵' },
      { sku: 'Zyme', district: 'Agra', units: '9,620', growth: '+5.1%', share: '11%', icon: '🟢' },
      { sku: 'Soil Health Card', district: 'Meerut', units: '6,310', growth: '+3.3%', share: '7%', icon: '📋' },
    ],
    focusItems: [
      { title: 'Improve verification in 12 low-performing districts', sub: 'Potential lift: ₹8.7L' },
      { title: 'Push Nano Urea in 245 villages', sub: 'Low penetration detected' },
      { title: 'Reactivate 540 inactive villages', sub: 'Potential retailers: 1,120' },
    ],
    topDistricts: [
      { rank: 1, name: 'Lucknow', sales: '₹18.4 L', growth: '+16.3%' },
      { rank: 2, name: 'Kanpur', sales: '₹15.7 L', growth: '+11.8%' },
      { rank: 3, name: 'Varanasi', sales: '₹12.9 L', growth: '+9.2%' },
    ],
    lowDistricts: [
      { rank: 1, name: 'Baghpat', sales: '₹3.1 L', growth: '-5.2%' },
      { rank: 2, name: 'Bahraich', sales: '₹2.8 L', growth: '-7.1%' },
      { rank: 3, name: 'Shravasti', sales: '₹2.2 L', growth: '-9.3%' },
    ],
    alerts: [
      { type: 'red', title: 'Low Verification', sub: '18 districts below 38% · 2h ago' },
      { type: 'orange', title: 'Low Stock', sub: '245 villages affected · 4h ago' },
      { type: 'yellow', title: 'Inactive Villages', sub: '540 villages inactive · 1d ago' },
      { type: 'yellow', title: 'Budget Update', sub: '₹8.4L remaining · 2d ago' },
    ]
  },

  territory: {
    metrics: [
      { label: 'Territory Sales', value: '₹3.84 Cr', change: '+12.6%', up: true, sub: 'vs last 30 days', icon: 'sales', color: 'green' },
      { label: 'Verified Sales', value: '68%', change: '+4.8pp', up: true, sub: 'vs last 30 days', icon: 'verified', color: 'blue' },
      { label: 'Total Retailers', value: '1,248', change: '+18', up: true, sub: 'new this month', icon: 'store', color: 'purple' },
      { label: 'Active Villages', value: '242 / 310', change: '78%', up: true, sub: 'coverage', icon: 'village', color: 'green' },
      { label: 'SKU Penetration', value: '65%', change: '+3.5pp', up: true, sub: 'vs last 30 days', icon: 'sku', color: 'cyan' },
      { label: 'Opportunity Score', value: '74 / 100', change: '+6 pts', up: true, sub: 'vs last 30 days', icon: 'score', color: 'yellow' },
    ],
    districts: [
      { name: 'Lucknow', sales: '₹1.62 Cr', growth: '+16.3%', up: true, verified: '70%', retailers: 532, score: 85, scoreColor: 'score-green' },
      { name: 'Barabanki', sales: '₹1.18 Cr', growth: '+9.7%', up: true, verified: '65%', retailers: 368, score: 72, scoreColor: 'score-green' },
      { name: 'Raebareli', sales: '₹1.04 Cr', growth: '-2.1%', up: false, verified: '52%', retailers: 348, score: 58, scoreColor: 'score-orange' },
    ],
    leaderboard: [
      { village: 'Malihabad', district: 'Lucknow', sales: '₹24.8 L', verified: '72%', retailers: 18, trend: 'up' },
      { village: 'Kakori', district: 'Lucknow', sales: '₹19.1 L', verified: '68%', retailers: 14, trend: 'up' },
      { village: 'Saidabad', district: 'Barabanki', sales: '₹15.6 L', verified: '64%', retailers: 12, trend: 'up' },
      { village: 'Dewa Road', district: 'Raebareli', sales: '₹13.2 L', verified: '58%', retailers: 9, trend: 'flat' },
      { village: 'Mohanlalganj', district: 'Lucknow', sales: '₹12.7 L', verified: '55%', retailers: 11, trend: 'down' },
    ],
    skuMovement: [
      { sku: 'Nano Urea', units: '45,620', growth: '+18.6%', share: '28%', icon: '🌿' },
      { sku: 'DAP', units: '32,140', growth: '+11.3%', share: '20%', icon: '🟡' },
      { sku: 'NPK 19:19:19', units: '28,750', growth: '+7.8%', share: '18%', icon: '🔵' },
      { sku: 'Zyme', units: '18,930', growth: '+5.2%', share: '12%', icon: '🟢' },
      { sku: 'Soil Health Card', units: '12,860', growth: '+3.1%', share: '8%', icon: '📋' },
    ],
    teamPerf: [
      { name: 'Vikram Chauhan', role: 'Field Agent', villages: 65, sales: '₹96.4 L', verified: '72%', score: 85, scoreColor: 'score-green' },
      { name: 'Pooja Verma', role: 'Field Agent', villages: 58, sales: '₹78.1 L', verified: '68%', score: 78, scoreColor: 'score-green' },
      { name: 'Rajesh Yadav', role: 'Field Agent', villages: 53, sales: '₹64.7 L', verified: '61%', score: 65, scoreColor: 'score-yellow' },
      { name: 'Anjali Mishra', role: 'Field Agent', villages: 47, sales: '₹45.9 L', verified: '55%', score: 52, scoreColor: 'score-orange' },
    ],
    alerts: [
      { type: 'red', title: 'Low Verification', sub: '12 villages below 50% · 2h ago' },
      { type: 'orange', title: 'Low Stock', sub: '6 villages affected · 8h ago' },
      { type: 'yellow', title: 'Inactive Retailers', sub: '15 retailers inactive · 1d ago' },
      { type: 'blue', title: 'Budget Update', sub: '₹1.2L remaining · 1d ago' },
    ]
  },

  verifiedSales: {
    metrics: [
      { label: 'Total Sales (All)', value: '₹156.48 Cr', change: '+12.6%', up: true },
      { label: 'Verified Sales', value: '₹98.73 Cr', change: '+16.3%', up: true },
      { label: 'Non-Verified Sales', value: '₹57.75 Cr', change: '-6.7%', up: false },
      { label: 'Verification Rate', value: '63.1%', change: '+4.8pp', up: true },
      { label: 'ROI per Verified Sale', value: '3.74x', change: '+0.36x', up: true },
      { label: 'Total Incentive Paid', value: '₹7.36 Cr', change: '+9.5%', up: true },
    ],
    topSKUs: [
      { sku: 'Nano Urea', rate: '78%', sales: '₹34.68', barPct: 78, barColor: 'green' },
      { sku: 'DAP', rate: '61%', sales: '₹24.35', barPct: 61, barColor: 'green' },
      { sku: 'NPK 19:19:19', rate: '58%', sales: '₹21.48', barPct: 58, barColor: 'yellow' },
      { sku: 'Zyme', rate: '49%', sales: '₹9.84', barPct: 49, barColor: 'yellow' },
      { sku: 'Soil Health Card', rate: '43%', sales: '₹8.21', barPct: 43, barColor: 'red' },
    ],
    underVerified: [
      { region: 'Bihar / Gaya', rate: '34%', gap: '-46pp' },
      { region: 'Uttar Pradesh / Pratapgarh', rate: '40%', gap: '-38pp' },
      { region: 'West Bengal / Murshidabad', rate: '45%', gap: '-23pp' },
      { region: 'Madhya Pradesh / Rewa', rate: '50%', gap: '-18pp' },
      { region: 'Rajasthan / Barmer', rate: '53%', gap: '-15pp' },
    ]
  },

  users: [
    { name: 'Rohit Mehra', email: 'rohit.m@godrej.com', role: 'HQ Admin', territory: 'Headquarters', reportsTo: '—', status: 'active', lastActive: '2h ago', initials: 'RM', color: '#a855f7' },
    { name: 'Anita Sharma', email: 'anita.s@godrej.com', role: 'Region Head', territory: 'East Region', reportsTo: 'HQ Admin', status: 'active', lastActive: '3h ago', initials: 'AS', color: '#06b6d4' },
    { name: 'Vikram Singh', email: 'vikram.s@godrej.com', role: 'State Head', territory: 'Uttar Pradesh', reportsTo: 'Anita Sharma', status: 'active', lastActive: '5h ago', initials: 'VS', color: '#3b82f6' },
    { name: 'Amit Singh', email: 'amit.s@godrej.com', role: 'Territory Manager', territory: 'Lucknow Territory', reportsTo: 'Vikram Singh', status: 'active', lastActive: '1h ago', initials: 'AS', color: '#f97316' },
    { name: 'Ravi Kumar', email: 'ravi.k@godrej.com', role: 'Field Agent', territory: 'Lucknow Zone 1', reportsTo: 'Amit Singh', status: 'active', lastActive: '30m ago', initials: 'RK', color: '#22c55e' },
    { name: 'Pooja Verma', email: 'pooja.v@godrej.com', role: 'Field Agent', territory: 'Lucknow Zone 2', reportsTo: 'Amit Singh', status: 'inactive', lastActive: '2d ago', initials: 'PV', color: '#ef4444' },
    { name: 'Suresh Yadav', email: 'suresh.y@godrej.com', role: 'Field Agent', territory: 'Barabanki Zone', reportsTo: 'Amit Singh', status: 'active', lastActive: '1h ago', initials: 'SY', color: '#eab308' },
  ],

  permissions: {
    modules: [
      {
        name: 'Dashboards', icon: 'dashboard',
        items: [
          { label: 'View Dashboard', hq: 'allow', rh: 'allow', sh: 'allow', tm: 'partial', fa: 'deny' },
          { label: 'Export Dashboard', hq: 'allow', rh: 'allow', sh: 'partial', tm: 'deny', fa: 'deny' },
        ]
      },
      {
        name: 'Retail Intelligence', icon: 'retail',
        items: [
          { label: 'View Retailer Data', hq: 'allow', rh: 'allow', sh: 'allow', tm: 'allow', fa: 'deny' },
          { label: 'View Village Intelligence', hq: 'na', rh: 'na', sh: 'na', tm: 'na', fa: 'deny' },
          { label: 'Export Retail Data', hq: 'allow', rh: 'allow', sh: 'partial', tm: 'deny', fa: 'deny' },
        ]
      },
      {
        name: 'Sales & Campaigns', icon: 'campaign',
        items: [
          { label: 'Create Campaign / Approve Campaign', hq: 'allow', rh: 'deny', sh: 'partial', tm: 'deny', fa: 'deny' },
          { label: 'Manage Budget', hq: 'allow', rh: 'partial', sh: 'partial', tm: 'na', fa: 'na' },
          { label: 'View Campaign Performance', hq: 'allow', rh: 'deny', sh: 'partial', tm: 'partial', fa: 'deny' },
        ]
      },
      {
        name: 'Users & Team', icon: 'users',
        items: [
          { label: 'Manage Users / Assign Territories', hq: 'partial', rh: 'partial', sh: 'partial', tm: 'deny', fa: 'deny' },
          { label: 'View Team Performance', hq: 'allow', rh: 'allow', sh: 'allow', tm: 'allow', fa: 'deny' },
        ]
      },
      {
        name: 'Settings', icon: 'settings',
        items: [
          { label: 'Manage Geography / Manage Roles', hq: 'deny', rh: 'deny', sh: 'deny', tm: 'deny', fa: 'deny' },
          { label: 'System Settings', hq: 'allow', rh: 'deny', sh: 'partial', tm: 'deny', fa: 'deny' },
        ]
      }
    ]
  },

  geoTree: {
    label: 'India', children: [
      {
        label: 'East Region', color: '#22c55e', children: [
          {
            label: 'Uttar Pradesh', color: '#3b82f6', children: [
              { label: 'Lucknow', color: '#a855f7', territories: 5 },
              { label: 'Kanpur', color: '#f97316' },
              { label: 'Varanasi', color: '#06b6d4' },
              { label: 'Agra', color: '#eab308' },
            ]
          },
          { label: 'Bihar', color: '#22c55e' },
          { label: 'West Bengal', color: '#22c55e' },
          { label: 'Jharkhand', color: '#22c55e' },
          { label: 'Odisha', color: '#22c55e' },
        ]
      },
      { label: 'West Region', color: '#f97316', children: [] }
    ]
  }
};
