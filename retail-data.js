// CounterOS — Retail Intelligence Data Module
const RI_DATA = {

  overview: {
    kpis: [
      { id: 'activeRetailers', label: 'Active Retailers', value: '1,24,532', raw: 124532, change: '+14.5%', up: true, sub: 'vs last week', icon: 'fa-user-friends', color: 'green' },
      { id: 'verifiedSales', label: 'Verified Sales (This Week)', value: '₹ 48.67 Cr', change: '+18.2%', up: true, sub: 'vs last week', icon: 'fa-shopping-cart', color: 'blue' },
      { id: 'avgSales', label: 'Avg. Sales per Retailer', value: '₹ 39,125', change: '+12.1%', up: true, sub: 'vs last week', icon: 'fa-chart-line', color: 'purple' },
      { id: 'rewardBurn', label: 'Reward Burn (This Week)', value: '₹ 2.85 Cr', change: '+16.7%', up: true, sub: 'vs last week', icon: 'fa-gift', color: 'yellow' },
      { id: 'healthScore', label: 'Retailer Health Score', value: '78/100', change: '+6 pts', up: true, sub: 'vs last week', icon: 'fa-shield-alt', color: 'green' },
      { id: 'territories', label: 'Active Territories', value: '622', change: '84%', up: true, sub: 'of 742 districts', icon: 'fa-map-marker-alt', color: 'cyan' },
    ],
    activityDistribution: [
      { label: 'Hyper Active', sublabel: '> ₹1L', pct: 18, count: '22,415', color: '#10B981' },
      { label: 'Active', sublabel: '₹50K - ₹1L', pct: 32, count: '39,872', color: '#34D399' },
      { label: 'Moderate', sublabel: '₹10K - ₹50K', pct: 28, count: '34,482', color: '#F59E0B' },
      { label: 'Low Activity', sublabel: '₹1K - ₹10K', pct: 15, count: '18,913', color: '#F97316' },
      { label: 'Dormant', sublabel: '< ₹1K', pct: 7, count: '8,850', color: '#EF4444' },
    ],
    topProducts: [
      { rank: 1, name: 'Nano DAP', growth: '+22.7%', sales: '₹ 8.74 Cr' },
      { rank: 2, name: 'Mansa (PB)', growth: '+31.2%', sales: '₹ 6.23 Cr' },
      { rank: 3, name: 'Delegate 11.7% SC', growth: '+19.6%', sales: '₹ 4.98 Cr' },
      { rank: 4, name: 'SAAF Fungicide', growth: '+17.8%', sales: '₹ 3.77 Cr' },
      { rank: 5, name: 'Urea (IFFCO)', growth: '+14.5%', sales: '₹ 3.21 Cr' },
    ],
    salesTrend: [
      { week: 'Wk 13', label: '6 Apr - 12 Apr', sales: 28.4 },
      { week: 'Wk 14', label: '13 Apr - 19 Apr', sales: 31.2 },
      { week: 'Wk 15', label: '20 Apr - 26 Apr', sales: 29.8 },
      { week: 'Wk 16', label: '27 Apr - 3 May', sales: 38.5 },
      { week: 'Wk 17', label: '4 May - 10 May', sales: 42.1 },
      { week: 'Wk 18', label: '11 May - 17 May', sales: 48.67 },
    ],
    aiInsights: [
      { icon: 'fa-arrow-trend-up', color: 'green', title: 'West Bengal showed 18% growth in fungicide sales', sub: 'vs last week, driven by Delegate and SAAF.', tag: 'Growth' },
      { icon: 'fa-exclamation-triangle', color: 'orange', title: 'Low retailer engagement in Bihar.', sub: 'Only 32% retailers active this week.', tag: 'At Risk' },
      { icon: 'fa-info', color: 'blue', title: 'High reward burn but low incremental sales in Zone 4.', sub: 'Consider revising campaign structure.', tag: 'Review' },
      { icon: 'fa-users-slash', color: 'purple', title: '127 retailers at risk of churn.', sub: 'Engagement dropped in last 14 days.', tag: 'Action' },
    ],
    opportunityZones: [
      { region: 'North East', score: 92, color: 'green', label: 'High Demand\nLow Penetration', trend: 'up' },
      { region: 'Bihar South', score: 84, color: 'blue', label: 'Low Coverage\nHigh Potential', trend: 'up' },
      { region: 'Odisha West', score: 78, color: 'yellow', label: 'Untapped Market', trend: 'flat' },
      { region: 'MP East', score: 72, color: 'red', label: 'Retailer Density Low', trend: 'down' },
    ],
    microMetrics: [
      { icon: 'fa-trophy', color: 'yellow', label: 'Top Retailer of the Week', name: 'Maa Durga Agro Centre', sub: 'Muzaffarpur, Bihar', extra: 'Sales: ₹ 8.42 L | Scans: 342' },
      { icon: 'fa-chart-line', color: 'green', label: 'Highest Growing Village', name: 'Rampur Kalan', sub: 'Haridwar, Uttarakhand', extra: 'Growth: +42% | Retailers: 18' },
      { icon: 'fa-shield-alt', color: 'blue', label: 'Most Trusted Retailer', name: 'Shri Ganesh Agro', sub: 'Indore, Madhya Pradesh', extra: 'Trust Score: 96/100' },
    ],
    liveMetrics: [
      { icon: 'fa-qrcode', color: 'green', label: 'Live Scans (Today)', value: '24,842', change: '+18.3% vs yesterday' },
      { icon: 'fa-lock', color: 'green', label: 'OTP Verification %', value: '94.6%', change: '+3.2% vs yesterday' },
      { icon: 'fa-chart-pie', color: 'cyan', label: 'Reward Efficiency (ROI)', value: '3.41x', change: '+0.48x vs last week' },
    ]
  },

  segments: {
    summary: [
      { id: 'star', label: 'Star Retailers', count: '2,142', pct: '12.3% of total', sales: '24.6%', color: 'yellow', icon: 'fa-star' },
      { id: 'gold', label: 'Gold Retailers', count: '8,736', pct: '24.8% of total', sales: '38.7%', color: 'orange', icon: 'fa-medal' },
      { id: 'growth', label: 'Growth Retailers', count: '12,452', pct: '35.3% of total', sales: '22.1%', color: 'green', icon: 'fa-chart-line' },
      { id: 'atRisk', label: 'At Risk', count: '2,187', pct: '6.2% of total', sales: '6.1%', color: 'red', icon: 'fa-circle-exclamation' },
      { id: 'churned', label: 'Churned', count: '1,024', pct: '2.9% of total', sales: '0.8%', color: 'red', icon: 'fa-user-minus' },
      { id: 'highCredit', label: 'High Credit Exposure', count: '1,384', pct: 'Total Exposure ₹12.84 Cr', sales: 'Risk', color: 'purple', icon: 'fa-credit-card' },
    ],
    retailers: [
      { id: 'R001245', name: 'Maa Durga Agro Centre', owner: 'Rajesh Kumar', location: 'Muzaffarpur', state: 'Bihar', tier: 'Star', tierId: 'star', sales: '₹ 28.74 L', growth: '+24.6%', up: true, avatar: 'MD', color: '#10B981', healthScore: 92, riskScore: 18, trustScore: 92 },
      { id: 'R004578', name: 'Shri Ganesh Agro', owner: 'Suresh Yadav', location: 'Indore', state: 'Madhya Pradesh', tier: 'Gold', tierId: 'gold', sales: '₹ 18.53 L', growth: '+15.2%', up: true, avatar: 'SG', color: '#F97316', healthScore: 88, riskScore: 12, trustScore: 96 },
      { id: 'R009876', name: 'Rampur Kalan Agro Store', owner: 'Mohan Singh', location: 'Haridwar', state: 'Uttarakhand', tier: 'Growth', tierId: 'growth', sales: '₹ 9.82 L', growth: '+38.7%', up: true, avatar: 'RK', color: '#3B82F6', healthScore: 74, riskScore: 22, trustScore: 78 },
      { id: 'R005432', name: 'Kisan Seva Kendra', owner: 'Amit Patil', location: 'Nashik', state: 'Maharashtra', tier: 'Growth', tierId: 'growth', sales: '₹ 7.65 L', growth: '+8.4%', up: true, avatar: 'KS', color: '#8B5CF6', healthScore: 70, riskScore: 28, trustScore: 72 },
      { id: 'R002341', name: 'Punjab Agri Center', owner: 'Gurpreet Singh', location: 'Ludhiana', state: 'Punjab', tier: 'Star', tierId: 'star', sales: '₹ 25.10 L', growth: '+19.2%', up: true, avatar: 'PA', color: '#10B981', healthScore: 90, riskScore: 15, trustScore: 89 },
      { id: 'R007821', name: 'Bharat Agro Mart', owner: 'Vikram Rathore', location: 'Jaipur', state: 'Rajasthan', tier: 'At Risk', tierId: 'atRisk', sales: '₹ 3.20 L', growth: '-12.4%', up: false, avatar: 'BA', color: '#EF4444', healthScore: 45, riskScore: 72, trustScore: 38 },
      { id: 'R003987', name: 'Khetibadi Suppliers', owner: 'Ravi Prasad', location: 'Patna', state: 'Bihar', tier: 'At Risk', tierId: 'atRisk', sales: '₹ 2.80 L', growth: '-8.1%', up: false, avatar: 'KB', color: '#EF4444', healthScore: 48, riskScore: 65, trustScore: 42 },
      { id: 'R011204', name: 'Green Fields Agro', owner: 'Sita Devi', location: 'Varanasi', state: 'Uttar Pradesh', tier: 'Gold', tierId: 'gold', sales: '₹ 15.40 L', growth: '+11.8%', up: true, avatar: 'GF', color: '#F97316', healthScore: 82, riskScore: 20, trustScore: 85 },
    ],
    snapshot: {
      id: 'R001245', name: 'Maa Durga Agro Centre', verified: true, code: 'R001245', owner: 'Rajesh Kumar',
      location: 'Muzaffarpur, Bihar', zone: 'North East Zone', since: 'Jan 2023',
      tags: ['Star Retailer', 'High Performer', 'Credit Eligible'],
      healthScore: 92, riskScore: 18, trustScore: 92,
      mtd: { sales: '₹ 28.74 L', orders: 156, newFarmers: 48, salesGrowth: '+24.6%', ordersGrowth: '+18.2%', farmersGrowth: '+35.4%' },
      topSKUs: [
        { name: 'Nano DAP', qty: '245 Bags', value: '₹ 8.74 L' },
        { name: 'Delegate 11.7% SC', qty: '132 Bottles', value: '₹ 4.21 L' },
      ],
      action: 'Upgrade this retailer to Star+ tier.',
      actionSub: 'Eligible based on consistent performance',
    }
  },

  profiles: {
    current: {
      id: 'R001245', name: 'Maa Durga Agro Centre', verified: true,
      code: 'R001245', owner: 'Rajesh Kumar', location: 'Muzaffarpur, Bihar', zone: 'Zone: North East',
      tags: ['Star Retailer', 'High Performer', 'Active Since: Jan 2023'],
      trustScore: 92, trustLabel: 'Excellent',
      healthScore: 92, healthLabel: 'Excellent',
      riskScore: 18, riskLabel: 'Low Risk',
      creditLimit: '₹1.50 L', creditLabel: 'High Limit',
      tier: 'Star', tierSince: 'Since Apr 2024',
      contacts: { mobile: '+91 98765 43210', alt: '+91 91234 56789', gstin: '10ABCDE1234F1Z5', shopType: 'Agri Input Retailer', address: 'Brahmpura, Muzaffarpur, Bihar - 842001' },
      quickSummary: { totalSalesMTD: '₹ 28.74 L', salesGrowth: '+24.6%', totalPurchasesMTD: '₹ 21.65 L', purchaseGrowth: '+18.3%', rewardEarnedMTD: '₹ 12,340', rewardGrowth: '+22.1%', lastActive: 'Today, 10:35 AM', verificationStatus: 'Verified' },
      salesTrend: [2.1, 3.4, 3.8, 4.2, 5.24, 4.8, 5.24],
      purchaseTrend: [1.8, 2.9, 3.2, 3.6, 4.12, 3.9, 4.12],
      topCategories: [
        { name: 'Fertilizers', pct: 52, value: '₹ 14.95 L', color: '#10B981' },
        { name: 'Pesticides', pct: 24, value: '₹ 6.90 L', color: '#3B82F6' },
        { name: 'Seeds', pct: 12, value: '₹ 3.45 L', color: '#8B5CF6' },
        { name: 'Micronutrients', pct: 7, value: '₹ 2.01 L', color: '#F59E0B' },
        { name: 'Others', pct: 5, value: '₹ 1.43 L', color: '#6B7280' },
      ],
      tabs: ['Overview', 'Sales & Purchase', 'Credit Ledger', 'Products', 'Customers', 'Campaigns', 'Rewards', 'Activity Timeline']
    }
  },

  skuIntelligence: {
    kpis: [
      { label: 'Total SKUs Tracked', value: '312', change: '+18 vs last month', up: true, icon: 'fa-box', color: 'green' },
      { label: 'Active SKUs', value: '248', sub: '79.5% of total SKUs', icon: 'fa-check-circle', color: 'blue' },
      { label: 'Avg. SKU Penetration', value: '46.8%', change: '+6.3% vs last month', up: true, icon: 'fa-chart-pie', color: 'purple' },
      { label: 'Fast Moving SKUs', value: '78', change: '+12 vs last month', up: true, icon: 'fa-bolt', color: 'yellow' },
      { label: 'Dead Stock SKUs', value: '34', change: '-5 vs last month', up: true, icon: 'fa-skull', color: 'red' },
      { label: 'Reward ROI (Overall)', value: '3.21x', change: '+0.48x vs last month', up: true, icon: 'fa-gem', color: 'cyan' },
    ],
    tabs: ['SKU Penetration', 'Cross-Sell Matrix', 'SKU Performance', 'Dead Stock Alerts', 'Reward ROI', 'Price Intelligence'],
    topSKUs: [
      { rank: 1, name: 'Nano DAP (IFFCO)', penetration: '78.6%', penetrationPct: 78.6, retailers: '1,23,456', color: 'green' },
      { rank: 2, name: 'Urea (IFFCO)', penetration: '74.2%', penetrationPct: 74.2, retailers: '1,16,209', color: 'green' },
      { rank: 3, name: 'DAP (IFFCO)', penetration: '69.1%', penetrationPct: 69.1, retailers: '1,08,453', color: 'green' },
      { rank: 4, name: 'MOP (IFFCO)', penetration: '48.6%', penetrationPct: 48.6, retailers: '76,124', color: 'yellow' },
      { rank: 5, name: 'Delegate 11.7% SC', penetration: '41.3%', penetrationPct: 41.3, retailers: '64,782', color: 'yellow' },
      { rank: 6, name: 'Saaf Fungicide', penetration: '33.8%', penetrationPct: 33.8, retailers: '53,102', color: 'orange' },
      { rank: 7, name: 'Urea Gold', penetration: '29.6%', penetrationPct: 29.6, retailers: '46,521', color: 'orange' },
      { rank: 8, name: 'Mansa (PB)', penetration: '27.4%', penetrationPct: 27.4, retailers: '42,936', color: 'orange' },
    ],
    penetrationTrend: {
      labels: ['18 May', '19 May', '20 May', '21 May', '22 May', '23 May', '24 May'],
      skus: [
        { name: 'Nano DAP', color: '#10B981', data: [74, 75, 76, 77, 77.5, 78, 78.6] },
        { name: 'Urea', color: '#3B82F6', data: [70, 71, 72, 73, 73.5, 74, 74.2] },
        { name: 'DAP', color: '#8B5CF6', data: [65, 66, 67, 68, 68.5, 69, 69.1] },
        { name: 'MOP', color: '#F59E0B', data: [45, 46, 47, 47.5, 48, 48.3, 48.6] },
        { name: 'Delegate 11.7% SC', color: '#F97316', data: [38, 39, 40, 40.5, 41, 41.1, 41.3] },
      ]
    },
    crossSell: {
      skus: ['Urea', 'DAP', 'MOP', 'Nano DAP', 'Saaf Fungicide', 'Delegate 11.7% SC'],
      matrix: [
        [null, '62%', '38%', '41%', '24%', '19%'],
        ['62%', null, '45%', '54%', '33%', '28%'],
        ['38%', '45%', null, '36%', '21%', '17%'],
        ['41%', '54%', '36%', null, '29%', '26%'],
        ['24%', '33%', '21%', '29%', null, '61%'],
        ['19%', '28%', '17%', '26%', '61%', null],
      ]
    },
    velocityDistribution: [
      { label: 'Fast Moving', pct: 25, count: 78, color: '#10B981' },
      { label: 'Normal', pct: 35, count: 109, color: '#3B82F6' },
      { label: 'Slow Moving', pct: 29, count: 91, color: '#F59E0B' },
      { label: 'Dead Stock', pct: 11, count: 34, color: '#EF4444' },
    ],
    deadStock: [
      { sku: 'Neem Oil', daysSince: '>120', retailers: '1,248', action: 'Take Action' },
      { sku: 'IFFCO Zinc Sulphate', daysSince: '98', retailers: '987', action: 'Take Action' },
      { sku: 'PGR (Plant Growth Regulator)', daysSince: '87', retailers: '756', action: 'Take Action' },
    ]
  },

  geoCoverage: {
    kpis: [
      { label: 'Total Districts', value: '742', sub: '100% of India', icon: 'fa-map', color: 'green' },
      { label: 'Districts Covered', value: '512', change: '+4.3% vs last month', sub: '68.9%', up: true, icon: 'fa-check-circle', color: 'blue' },
      { label: 'Villages Covered', value: '1,24,532', change: '+5.2% vs last month', sub: '38.6%', up: true, icon: 'fa-home', color: 'green' },
      { label: 'Uncovered Villages', value: '1,97,841', change: '-2.1% vs last month', sub: '61.4%', up: false, icon: 'fa-circle-xmark', color: 'red' },
      { label: 'Retailer Penetration', value: '27.4%', change: '+3.6% vs last month', up: true, icon: 'fa-store', color: 'purple' },
      { label: 'High Opportunity Villages', value: '28,417', change: '+12.7% vs last month', up: true, icon: 'fa-lightbulb', color: 'yellow' },
    ],
    tabs: ['Coverage Map', 'Uncovered Villages', 'Retailer Density', 'White Space Opportunities', 'Expansion Planner'],
    coverageByState: [
      { rank: 1, state: 'Punjab', coverage: '72.4%', pct: 72.4, villages: '12,845', change: '+6', up: true, color: 'green' },
      { rank: 2, state: 'Haryana', coverage: '68.1%', pct: 68.1, villages: '11,209', change: '+4', up: true, color: 'green' },
      { rank: 3, state: 'Gujarat', coverage: '61.3%', pct: 61.3, villages: '9,845', change: '+3', up: true, color: 'green' },
      { rank: 4, state: 'Maharashtra', coverage: '55.6%', pct: 55.6, villages: '18,765', change: '+2', up: true, color: 'yellow' },
      { rank: 5, state: 'Karnataka', coverage: '52.8%', pct: 52.8, villages: '14,521', change: '+3', up: true, color: 'yellow' },
      { rank: 6, state: 'Tamil Nadu', coverage: '48.3%', pct: 48.3, villages: '10,214', change: '+1', up: true, color: 'yellow' },
      { rank: 7, state: 'Madhya Pradesh', coverage: '41.2%', pct: 41.2, villages: '12,632', change: '+2', up: true, color: 'orange' },
      { rank: 8, state: 'Uttar Pradesh', coverage: '32.6%', pct: 32.6, villages: '21,874', change: '+1', up: true, color: 'orange' },
      { rank: 9, state: 'Rajasthan', coverage: '29.8%', pct: 29.8, villages: '8,452', change: '+0', up: false, color: 'red' },
      { rank: 10, state: 'Bihar', coverage: '22.7%', pct: 22.7, villages: '4,125', change: '-1', up: false, color: 'red' },
    ],
    expansionRecs: [
      { area: 'Gaya, Bihar', state: 'Bihar', oppScore: 94, estRetailers: 48 },
      { area: 'Darbhanga, Bihar', state: 'Bihar', oppScore: 89, estRetailers: 42 },
      { area: 'Barmer, Rajasthan', state: 'Rajasthan', oppScore: 86, estRetailers: 38 },
    ]
  },

  behaviorAnalytics: {
    kpis: [
      { label: 'Active Retailers', value: '24,532', change: '+12.6% vs last month', up: true, icon: 'fa-users', color: 'green' },
      { label: 'Avg. Scan Frequency', value: '15.6/week', change: '+8.3% vs last month', up: true, icon: 'fa-qrcode', color: 'blue' },
      { label: 'Avg. Order Value', value: '₹12,842', change: '+14.2% vs last month', up: true, icon: 'fa-receipt', color: 'purple' },
      { label: 'Repeat Purchase Rate', value: '68.4%', change: '+6.7% vs last month', up: true, icon: 'fa-rotate', color: 'green' },
      { label: 'Reward Dependency', value: '41.2%', change: '-2.1% vs last month', up: false, icon: 'fa-gem', color: 'yellow' },
      { label: 'Campaign Response Rate', value: '37.8%', change: '+5.4% vs last month', up: true, icon: 'fa-bullhorn', color: 'cyan' },
    ],
    tabs: ['Overview', 'Scan Behavior', 'Purchase Behavior', 'Campaign Response', 'Reward Behavior', 'Seasonality'],
    scanFrequency: [
      { label: 'High (20+ / week)', pct: 25.3, count: '6,210', color: '#10B981' },
      { label: 'Medium (10-20 / week)', pct: 34.7, count: '8,507', color: '#3B82F6' },
      { label: 'Low (5-10 / week)', pct: 26.1, count: '6,401', color: '#F59E0B' },
      { label: 'Very Low (< 5 / week)', pct: 13.9, count: '3,414', color: '#EF4444' },
    ],
    timeOfDay: [
      { hour: '12AM', val: 2 }, { hour: '4AM', val: 1 }, { hour: '8AM', val: 8 },
      { hour: '12PM', val: 15 }, { hour: '4PM', val: 19 }, { hour: '8PM', val: 12 }
    ],
    dayOfWeek: [
      { day: 'Mon', scans: 12.4 }, { day: 'Tue', scans: 13.1 }, { day: 'Wed', scans: 15.3 },
      { day: 'Thu', scans: 16.8 }, { day: 'Fri', scans: 17.2 }, { day: 'Sat', scans: 18.6 }, { day: 'Sun', scans: 11.4 }
    ],
    seasonalTrend: {
      labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      kharif: [8, 9, 12, 16.8, 20, 25, 28, 22, 14, 8, 6, 7],
      rabi: [18, 22, 20, 12.4, 8, 5, 4, 6, 12, 18, 22, 20],
      summer: [5, 6, 8.7, 10, 12, 8, 4, 3, 4, 5, 5, 5],
    },
    campaignResponseTrend: [
      { date: '18 Apr', rate: 28 }, { date: '25 Apr', rate: 31 }, { date: '02 May', rate: 33 },
      { date: '09 May', rate: 35 }, { date: '16 May', rate: 36 }, { date: '24 May', rate: 37.8 }
    ],
    rewardDependency: [
      { label: 'High (>60%)', pct: 24.1, count: '5,913', color: '#EF4444' },
      { label: 'Medium (30-60%)', pct: 34.3, count: '8,414', color: '#F59E0B' },
      { label: 'Low (10-30%)', pct: 27.6, count: '6,768', color: '#3B82F6' },
      { label: 'Very Low (<10%)', pct: 14.0, count: '3,437', color: '#10B981' },
    ],
    behaviorSegments: [
      { name: 'High Engagers', retailers: '6,210 (25.3%)', contribution: '32.8%', scanFreq: '28.4', orderVal: '₹15,642', repeatRate: '72.6%', rewardDep: '28.1%', action: 'Nurture', actionColor: 'green' },
      { name: 'Consistent Buyers', retailers: '8,507 (34.7%)', contribution: '38.5%', scanFreq: '16.7', orderVal: '₹13,284', repeatRate: '68.9%', rewardDep: '36.7%', action: 'Reward Boost', actionColor: 'blue' },
      { name: 'Occasional Transactors', retailers: '6,401 (26.1%)', contribution: '21.4%', scanFreq: '7.8', orderVal: '₹8,120', repeatRate: '45.3%', rewardDep: '52.1%', action: 'Re-engage', actionColor: 'yellow' },
      { name: 'Dormant at Risk', retailers: '3,414 (13.9%)', contribution: '7.3%', scanFreq: '2.1', orderVal: '₹4,200', repeatRate: '18.6%', rewardDep: '78.4%', action: 'Win Back', actionColor: 'red' },
    ],
    engagementStreaks: [
      { label: '7+ Days Streak', count: '5,842', change: '+18.6%', color: 'green' },
      { label: '15+ Days Streak', count: '3,126', change: '+16.2%', color: 'blue' },
      { label: '30+ Days Streak', count: '1,248', change: '+14.1%', color: 'purple' },
      { label: '60+ Days Streak', count: '287', change: '+12.4%', color: 'yellow' },
    ],
    aiInsights: [
      { icon: 'fa-clock', color: 'green', title: 'Peak Scan Time', body: 'Retailers are most active between 4 PM - 8 PM. Plan campaigns accordingly.' },
      { icon: 'fa-calendar-day', color: 'blue', title: 'Weekend Opportunity', body: 'Saturday shows highest engagement. Increase weekend promo pushes.' },
      { icon: 'fa-chart-line-down', color: 'orange', title: 'Low Frequency Retailers', body: '3,414 retailers scan less than 5 times / week. Nudge campaign recommended.' },
      { icon: 'fa-gem', color: 'purple', title: 'Reward Dependency', body: '41% retailers rely heavily on rewards. Introduce tiered loyalty benefits.' },
    ],
    recommendedActions: [
      { icon: 'fa-bolt', color: 'green', title: 'Run weekend flash campaign', sub: 'Target high engagement window', btn: 'Create Campaign' },
      { icon: 'fa-envelope', color: 'blue', title: 'Nudge low frequency retailers', sub: 'SMS + push notification sequence', btn: 'Launch Nudge' },
    ]
  },

  trustScore: {
    retailer: {
      id: 'R001245', name: 'Maa Durga Agro Centre', verified: true,
      code: 'RO01245', owner: 'Rajesh Kumar', location: 'Muzaffarpur, Bihar',
      zone: 'North East Zone', since: 'Jan 2023',
      tags: ['Star Retailer', 'High Performer', 'Credit Eligible'],
      totalSalesMTD: '₹ 28.74 L', salesGrowth: '+24.6%',
      totalPurchasesMTD: '₹ 21.65 L', purchaseGrowth: '+18.3%',
      rewardEarnedMTD: '₹ 12,340', rewardGrowth: '+22.1%', lastActive: 'Today, 10:35 AM',
    },
    overallScore: 92,
    scoreLabel: 'Excellent',
    scoreChange: '+8 pts vs last month',
    riskLevel: 'Low Risk',
    trend: 'Improving',
    scoreChange2: '+8 pts',
    percentileRank: 'Top 8%',
    creditEligibility: true,
    creditLimit: '₹ 1.50 L',
    breakdown: [
      { label: 'Payment Discipline', weight: '25%', score: 95, change: '+5', color: 'green' },
      { label: 'Scan & Verification Quality', weight: '20%', score: 93, change: '+7', color: 'green' },
      { label: 'Transaction Consistency', weight: '20%', score: 90, change: '+6', color: 'green' },
      { label: 'Sales Performance', weight: '15%', score: 88, change: '+4', color: 'green' },
      { label: 'Reward Program Behavior', weight: '10%', score: 85, change: '-1', color: 'yellow' },
      { label: 'Credit Utilization', weight: '10%', score: 75, change: '-2', color: 'yellow' },
    ],
    riskFlags: [
      { label: 'Fraud Risk', status: 'Low', ok: true },
      { label: 'Duplicate Scan Risk', status: 'Low', ok: true },
      { label: 'Location Consistency', status: 'High', ok: false },
      { label: 'OTP Failure Rate', status: 'Low', ok: true },
      { label: 'Reward Abuse Risk', status: 'Low', ok: true },
      { label: 'Credit Overdue Risk', status: 'Low', ok: true },
    ],
    scoreTrend: [
      { month: "Dec '24", score: 72 }, { month: "Jan '25", score: 75 }, { month: "Feb '25", score: 78 },
      { month: "Mar '25", score: 82 }, { month: "Apr '25", score: 88 }, { month: "May '25", score: 92 }
    ],
    distribution: [
      { label: 'Excellent (80-100)', count: '8,452', pct: '34.5%', color: '#10B981' },
      { label: 'Good (60-79)', count: '10,632', pct: '43.5%', color: '#3B82F6' },
      { label: 'Poor (20-39)', count: '3,245', pct: '13.2%', color: '#F59E0B' },
      { label: 'Critical (0-19)', count: '691', pct: '2.7%', color: '#EF4444' },
    ],
    aiRecs: [
      { icon: 'fa-credit-card', color: 'green', title: 'Eligible for higher credit limit', sub: 'Strong payment discipline and low credit utilization.' },
      { icon: 'fa-arrows-cross', color: 'blue', title: 'Cross-sell opportunity', sub: 'Retailer buys DAP regularly. Promote MOP & Saaf Fungicide.' },
      { icon: 'fa-star', color: 'yellow', title: 'Reward multiplier candidate', sub: 'High engagement and consistent performance.' },
    ]
  },

  fraudVerification: {
    kpis: [
      { label: 'Total Transactions Scanned', value: '8.42 Lakh', change: '+1.8% vs last week', up: true, icon: 'fa-barcode', color: 'blue' },
      { label: 'Verification Success Rate', value: '98.7%', change: '+1.8% vs last week', up: true, icon: 'fa-check-double', color: 'green' },
      { label: 'Fraudulent Transactions', value: '2,842', change: '-18.3% vs last week', up: true, icon: 'fa-triangle-exclamation', color: 'red' },
      { label: 'Fraud Value Blocked', value: '₹3.72 Cr', change: '', up: true, icon: 'fa-shield-halved', color: 'green' },
      { label: 'High Risk Retailers', value: '1,324', change: '-12.4% vs last week', up: true, icon: 'fa-store-slash', color: 'orange' },
      { label: 'OTP Verification Rate', value: '96.2%', change: '+2.3% vs last week', up: true, icon: 'fa-mobile-screen', color: 'cyan' },
    ],
    tabs: ['Overview', 'Fraud Detection', 'Verification Analytics', 'Risk Scoring', 'Transaction Monitoring', 'Dispute Management'],
    fraudTrend: [
      { date: '18 May', txns: 520, value: 1.8 }, { date: '19 May', txns: 480, value: 1.65 },
      { date: '20 May', txns: 610, value: 2.1 }, { date: '21 May', txns: 2842, value: 3.72 },
      { date: '22 May', txns: 390, value: 1.35 }, { date: '23 May', txns: 320, value: 1.1 }, { date: '24 May', txns: 280, value: 0.95 }
    ],
    fraudByType: [
      { label: 'Duplicate Claims', pct: 32.1, count: '912', color: '#3B82F6' },
      { label: 'Fake Retailer', pct: 24.7, count: '702', color: '#F59E0B' },
      { label: 'Reward Abuse', pct: 18.3, count: '520', color: '#10B981' },
      { label: 'Bill Manipulation', pct: 12.9, count: '366', color: '#8B5CF6' },
      { label: 'OTP Bypass', pct: 7.2, count: '205', color: '#F97316' },
      { label: 'Other', pct: 4.8, count: '137', color: '#6B7280' },
    ],
    topFraudulent: [
      { rank: 1, name: 'Maa Kali Traders', district: 'Sitamarhi, Bihar', score: 98, scoreColor: 'red' },
      { rank: 2, name: 'Shiv Shakti Agency', district: 'Purnia, Bihar', score: 92, scoreColor: 'red' },
      { rank: 3, name: 'Kisan Agro Mart', district: 'Darbhanga, Bihar', score: 87, scoreColor: 'orange' },
    ],
    verificationMethods: [
      { label: 'OTP', pct: 63.2, value: '5.32 L', color: '#10B981' },
      { label: 'QR Scan', pct: 22.8, value: '1.92 L', color: '#3B82F6' },
      { label: 'IVR', pct: 8.6, value: '72.3K', color: '#8B5CF6' },
      { label: 'Manual', pct: 3.4, value: '28.6K', color: '#F59E0B' },
      { label: 'Other', pct: 2.0, value: '16.8K', color: '#6B7280' },
    ],
    recentAlerts: [
      { severity: 'High', title: 'High value duplicate claim detected', value: '₹2.45 L', retailer: 'Maa Kali Traders', location: 'Sitamarhi, Bihar', time: '24 May, 10:25 AM' },
      { severity: 'Medium', title: 'Multiple OTP failures from same device', value: '', retailer: 'Shiv Shakti Agency', location: 'Purnia, Bihar', time: '24 May, 09:48 AM' },
    ]
  },

  retailerTrustScore: {
    allRetailers: 24532,
    scoreTrend: [
      { month: "Dec '24", score: 72 }, { month: "Jan '25", score: 75 },
      { month: "Feb '25", score: 78 }, { month: "Mar '25", score: 82 },
      { month: "Apr '25", score: 88 }, { month: "May '25", score: 92 }
    ],
  }
};
