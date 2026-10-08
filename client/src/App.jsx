import React, { useState, useEffect } from 'react';
import { 
  Users, 
  CreditCard, 
  ShieldCheck, 
  Bell, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Search, 
  UserPlus, 
  FileText, 
  TrendingUp, 
  Download, 
  Send, 
  Sun, 
  Moon, 
  Eye, 
  LogOut,
  Calendar,
  Phone,
  MapPin,
  Check,
  X,
  Coins
} from 'lucide-react';

// ==========================================
// PERSISTENT SEED DATA
// Problem Statement 126: Rural Elderly Pension
// ==========================================
const SEED_BENEFICIARIES = [
  {
    id: 101,
    name: 'Narasimha Rao',
    teluguName: 'నరసింహ రావు',
    age: 68,
    phone: '9876543210',
    address: 'H.No 3-45, Gandhi Nagar',
    district: 'Warangal Rural',
    scheme: 'Asara Old Age Pension',
    amount: 2016,
    frequency: 'Monthly',
    startDate: '2024-01-01',
    verificationStatus: 'Verified',
    verifiedBy: 'Mandal Revenue Officer (MRO)',
    verifyDate: '2024-01-05',
    remarks: 'Aadhaar and age proof certified',
    payments: [
      { id: 'PAY-101-09', month: 'September 2024', amount: 2016, dueDate: '2024-09-01', payDate: '2024-09-03', status: 'Paid', txnRef: 'TXN-902148' },
      { id: 'PAY-101-10', month: 'October 2024', amount: 2016, dueDate: '2024-10-01', payDate: null, status: 'Delayed', txnRef: null }
    ],
    reminders: [
      { id: 'REM-101-1', message: 'Urgent: October pension disbursement is delayed (>7 days). Treasury escalation sent.', date: '2024-10-08', status: 'Sent' }
    ]
  },
  {
    id: 102,
    name: 'Lakshmi Devi',
    teluguName: 'లక్ష్మీ దేవి',
    age: 72,
    phone: '9848012345',
    address: 'Plot 12, Ramalayam Veedhi',
    district: 'Nalgonda',
    scheme: 'Asara Old Age Pension',
    amount: 2016,
    frequency: 'Monthly',
    startDate: '2024-02-01',
    verificationStatus: 'Verified',
    verifiedBy: 'Panchayat Secretary',
    verifyDate: '2024-02-08',
    remarks: 'Physical verification completed',
    payments: [
      { id: 'PAY-102-09', month: 'September 2024', amount: 2016, dueDate: '2024-09-01', payDate: '2024-09-05', status: 'Paid', txnRef: 'TXN-902149' },
      { id: 'PAY-102-10', month: 'October 2024', amount: 2016, dueDate: '2024-10-01', payDate: null, status: 'Delayed', txnRef: null }
    ],
    reminders: [
      { id: 'REM-102-1', message: 'Automated delay alert: October pension exceeded 7-day payment window.', date: '2024-10-08', status: 'Sent' }
    ]
  },
  {
    id: 103,
    name: 'Venkat Reddy',
    teluguName: 'వెంకట్ రెడ్డి',
    age: 65,
    phone: '9912345678',
    address: 'Main Road, Janagaon Village',
    district: 'Medak',
    scheme: 'Senior Citizen Special Support',
    amount: 3016,
    frequency: 'Monthly',
    startDate: '2024-03-01',
    verificationStatus: 'Pending',
    verifiedBy: 'Awaiting Official Review',
    verifyDate: null,
    remarks: 'Aadhaar submitted, field physical verification pending',
    payments: [
      { id: 'PAY-103-10', month: 'October 2024', amount: 3016, dueDate: '2024-10-05', payDate: null, status: 'Pending', txnRef: null }
    ],
    reminders: [
      { id: 'REM-103-1', message: 'Reminder: Application verification pending with Panchayat office.', date: '2024-10-02', status: 'Pending' }
    ]
  },
  {
    id: 104,
    name: 'Anasuya Amma',
    teluguName: 'అనసూయమ్మ',
    age: 78,
    phone: '9123456780',
    address: 'Near Old Water Tank, Bhuvanagiri',
    district: 'Yadadri',
    scheme: 'Asara Old Age Pension',
    amount: 2016,
    frequency: 'Monthly',
    startDate: '2023-12-01',
    verificationStatus: 'Verified',
    verifiedBy: 'Mandal Revenue Officer (MRO)',
    verifyDate: '2023-11-20',
    remarks: 'Eligible elderly pensioner verified',
    payments: [
      { id: 'PAY-104-09', month: 'September 2024', amount: 2016, dueDate: '2024-09-01', payDate: '2024-09-02', status: 'Paid', txnRef: 'TXN-819283' },
      { id: 'PAY-104-10', month: 'October 2024', amount: 2016, dueDate: '2024-10-01', payDate: '2024-10-04', status: 'Paid', txnRef: 'TXN-983726' }
    ],
    reminders: [
      { id: 'REM-104-1', message: 'October pension disbursed to bank account.', date: '2024-10-04', status: 'Sent' }
    ]
  },
  {
    id: 105,
    name: 'Balaraju M.',
    teluguName: 'బాలరాజు ఎం.',
    age: 71,
    phone: '9849112233',
    address: 'Gandhi Chowk, Choppadandi',
    district: 'Karimnagar',
    scheme: 'Asara Old Age Pension',
    amount: 2016,
    frequency: 'Monthly',
    startDate: '2024-02-01',
    verificationStatus: 'Verified',
    verifiedBy: 'Mandal Revenue Officer (MRO)',
    verifyDate: '2024-02-04',
    remarks: 'Verified successfully',
    payments: [
      { id: 'PAY-105-09', month: 'September 2024', amount: 2016, dueDate: '2024-09-01', payDate: '2024-09-03', status: 'Paid', txnRef: 'TXN-773821' },
      { id: 'PAY-105-10', month: 'October 2024', amount: 2016, dueDate: '2024-10-01', payDate: '2024-10-03', status: 'Paid', txnRef: 'TXN-882910' }
    ],
    reminders: []
  }
];

export default function App() {
  // Navigation: 7 working sections
  const [activeTab, setActiveTab] = useState('dashboard');

  // Text Resizing State: 'A' (Normal), 'A+' (Large), 'A++' (Extra Large)
  const [textSize, setTextSize] = useState(() => localStorage.getItem('pension_text_size') || 'A++');

  // Theme State: 'light' | 'dark' | 'contrast'
  const [theme, setTheme] = useState(() => localStorage.getItem('pension_theme') || 'light');

  // Data Store with persistence
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('pension_tracker_records_v3');
    return saved ? JSON.parse(saved) : SEED_BENEFICIARIES;
  });

  useEffect(() => {
    localStorage.setItem('pension_tracker_records_v3', JSON.stringify(data));
  }, [data]);

  // Apply Global Root Font-Size to scale EVERYTHING proportionally
  useEffect(() => {
    localStorage.setItem('pension_text_size', textSize);
    if (textSize === 'A') {
      document.documentElement.style.fontSize = '14px';
    } else if (textSize === 'A+') {
      document.documentElement.style.fontSize = '17px';
    } else if (textSize === 'A++') {
      document.documentElement.style.fontSize = '20px';
    }
  }, [textSize]);

  // Apply Theme class to document root
  useEffect(() => {
    localStorage.setItem('pension_theme', theme);
  }, [theme]);

  // Filter State
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPensioner, setNewPensioner] = useState({
    name: '',
    teluguName: '',
    age: '',
    phone: '',
    address: '',
    district: 'Warangal Rural',
    scheme: 'Asara Old Age Pension',
    amount: 2016
  });

  const [showReminderModal, setShowReminderModal] = useState(false);
  const [reminderTarget, setReminderTarget] = useState(null);
  const [customMsg, setCustomMsg] = useState('');

  // Derived metrics
  const allPayments = data.flatMap(b => b.payments.map(p => ({
    ...p,
    beneficiaryId: b.id,
    beneficiaryName: b.name,
    teluguName: b.teluguName,
    phone: b.phone,
    district: b.district,
    scheme: b.scheme
  })));

  const totalBeneficiaries = data.length;
  const verifiedCount = data.filter(b => b.verificationStatus === 'Verified').length;
  const pendingVerifications = data.filter(b => b.verificationStatus === 'Pending');
  const delayedPayments = allPayments.filter(p => p.status === 'Delayed');
  const paidPayments = allPayments.filter(p => p.status === 'Paid');
  const totalDisbursedAmount = paidPayments.reduce((acc, p) => acc + p.amount, 0);

  // Business actions
  const handleVerify = (id, status) => {
    setData(prev => prev.map(b => b.id === id ? {
      ...b,
      verificationStatus: status,
      verifiedBy: 'District Welfare Officer',
      verifyDate: new Date().toISOString().split('T')[0],
      remarks: `Official review: ${status} by Administrator.`
    } : b));
  };

  const handleDisburse = (beneficiaryId, paymentId) => {
    const txn = 'TXN-' + Math.floor(100000 + Math.random() * 900000);
    setData(prev => prev.map(b => {
      if (b.id === beneficiaryId) {
        return {
          ...b,
          payments: b.payments.map(p => p.id === paymentId ? {
            ...p,
            status: 'Paid',
            payDate: new Date().toISOString().split('T')[0],
            txnRef: txn
          } : p)
        };
      }
      return b;
    }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newPensioner.name || !newPensioner.phone || !newPensioner.age) return;
    const nextId = 100 + data.length + 1;
    const entry = {
      id: nextId,
      name: newPensioner.name,
      teluguName: newPensioner.teluguName || newPensioner.name,
      age: parseInt(newPensioner.age, 10),
      phone: newPensioner.phone,
      address: newPensioner.address,
      district: newPensioner.district,
      scheme: newPensioner.scheme,
      amount: parseFloat(newPensioner.amount) || 2016,
      frequency: 'Monthly',
      startDate: new Date().toISOString().split('T')[0],
      verificationStatus: 'Pending',
      verifiedBy: 'Awaiting Official Review',
      verifyDate: null,
      remarks: 'Application submitted for field check.',
      payments: [
        { id: `PAY-${nextId}-10`, month: 'October 2024', amount: parseFloat(newPensioner.amount) || 2016, dueDate: new Date().toISOString().split('T')[0], payDate: null, status: 'Pending', txnRef: null }
      ],
      reminders: [
        { id: `REM-${nextId}-1`, message: 'Application registered. Verification pending.', date: new Date().toISOString().split('T')[0], status: 'Pending' }
      ]
    };
    setData([entry, ...data]);
    setShowAddModal(false);
    setNewPensioner({ name: '', teluguName: '', age: '', phone: '', address: '', district: 'Warangal Rural', scheme: 'Asara Old Age Pension', amount: 2016 });
  };

  const handleSendReminderAlert = () => {
    if (!reminderTarget || !customMsg) return;
    setData(prev => prev.map(b => b.id === reminderTarget.id ? {
      ...b,
      reminders: [{ id: `REM-${b.id}-${Date.now()}`, message: customMsg, date: new Date().toISOString().split('T')[0], status: 'Sent' }, ...b.reminders]
    } : b));
    setShowReminderModal(false);
    setCustomMsg('');
  };

  // Theme-based style classes
  const themeClasses = {
    light: {
      bg: 'bg-[#f4f7fa]',
      card: 'bg-white border-slate-200 text-slate-900',
      textMain: 'text-slate-900',
      textSub: 'text-slate-600',
      navBg: 'bg-white border-slate-200',
      bannerBg: 'bg-[#0b483c] text-white',
      badgeBg: 'bg-slate-100 text-slate-800',
      tableHeader: 'bg-slate-50 text-slate-700',
      tableHover: 'hover:bg-slate-50'
    },
    dark: {
      bg: 'bg-slate-950',
      card: 'bg-slate-900 border-slate-800 text-slate-100',
      textMain: 'text-white',
      textSub: 'text-slate-400',
      navBg: 'bg-slate-900 border-slate-800',
      bannerBg: 'bg-teal-950 text-teal-100 border border-teal-800',
      badgeBg: 'bg-slate-800 text-slate-200',
      tableHeader: 'bg-slate-800 text-slate-200',
      tableHover: 'hover:bg-slate-800/60'
    },
    contrast: {
      bg: 'bg-black',
      card: 'bg-zinc-950 border-2 border-yellow-400 text-yellow-300',
      textMain: 'text-yellow-300',
      textSub: 'text-yellow-200',
      navBg: 'bg-zinc-950 border-b-2 border-yellow-400',
      bannerBg: 'bg-black border-2 border-yellow-400 text-yellow-300',
      badgeBg: 'bg-zinc-900 text-yellow-400 border border-yellow-400',
      tableHeader: 'bg-zinc-900 text-yellow-400 border-b border-yellow-400',
      tableHover: 'hover:bg-zinc-900'
    }
  }[theme];

  return (
    <div className={`min-h-screen ${themeClasses.bg} ${themeClasses.textMain} transition-colors duration-200`}>
      
      {/* ============================================================== */}
      {/* 1. TOP NAVBAR (Text Resizer & Theme Changer Side-by-Side) */}
      {/* ============================================================== */}
      <header className={`${themeClasses.navBg} border-b px-4 sm:px-6 py-3.5 sticky top-0 z-40 shadow-xs`}>
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          {/* Left: Branding */}
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
              Dashboard &amp; Overview
            </h1>
            <p className="text-xs sm:text-sm font-semibold opacity-70">
              Elderly Pension Disbursement Tracker System
            </p>
          </div>

          {/* Right: Text Size Resizer + Theme Changer Beside It */}
          <div className="flex items-center flex-wrap gap-2.5 sm:gap-4">
            
            {/* Global Text Size Resizer (Scales Entire Dashboard) */}
            <div className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border ${theme === 'contrast' ? 'border-yellow-400 bg-black' : 'bg-slate-100 border-slate-200 dark:bg-slate-800 dark:border-slate-700'}`}>
              <span className="text-xs font-bold mr-1 opacity-80">
                Text Size:
              </span>
              <button
                onClick={() => setTextSize('A')}
                title="Normal Font Size"
                className={`px-2 py-0.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  textSize === 'A' ? 'bg-[#0f4a3e] text-white shadow-xs' : 'opacity-70 hover:opacity-100'
                }`}
              >
                A
              </button>
              <button
                onClick={() => setTextSize('A+')}
                title="Large Font Size"
                className={`px-2 py-0.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  textSize === 'A+' ? 'bg-[#0f4a3e] text-white shadow-xs' : 'opacity-70 hover:opacity-100'
                }`}
              >
                A+
              </button>
              <button
                onClick={() => setTextSize('A++')}
                title="Extra Large Font Size (Recommended for Elderly)"
                className={`px-2.5 py-0.5 text-xs font-extrabold rounded-lg transition-all cursor-pointer ${
                  textSize === 'A++' ? 'bg-[#0f4a3e] text-white shadow-xs' : 'opacity-70 hover:opacity-100'
                }`}
              >
                A++
              </button>
            </div>

            {/* Theme Changer (Placed Beside Text Size) */}
            <div className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border ${theme === 'contrast' ? 'border-yellow-400 bg-black' : 'bg-slate-100 border-slate-200 dark:bg-slate-800 dark:border-slate-700'}`}>
              <span className="text-xs font-bold mr-1 opacity-80">
                Theme:
              </span>
              <button
                onClick={() => setTheme('light')}
                title="Light Theme"
                className={`px-2 py-1 text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer transition-all ${
                  theme === 'light' ? 'bg-amber-500 text-white shadow-xs' : 'opacity-70 hover:opacity-100'
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
                <span>Light</span>
              </button>
              <button
                onClick={() => setTheme('dark')}
                title="Dark Theme"
                className={`px-2 py-1 text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer transition-all ${
                  theme === 'dark' ? 'bg-indigo-600 text-white shadow-xs' : 'opacity-70 hover:opacity-100'
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
                <span>Dark</span>
              </button>
              <button
                onClick={() => setTheme('contrast')}
                title="High Contrast Theme (High Visibility)"
                className={`px-2 py-1 text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer transition-all ${
                  theme === 'contrast' ? 'bg-yellow-400 text-black font-extrabold shadow-xs' : 'opacity-70 hover:opacity-100'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Contrast</span>
              </button>
            </div>

            {/* Officer Badge & Logout */}
            <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-300 dark:border-slate-700">
              <div className="w-8 h-8 rounded-full bg-teal-100 border border-teal-300 text-teal-900 font-extrabold text-sm flex items-center justify-center">
                D
              </div>
              <button 
                onClick={() => alert('Official Administrator Mode Active')}
                className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-800 cursor-pointer"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

        {/* ============================================================== */}
        {/* 2. DEDICATED WORKING 7-TAB NAVIGATION BUTTONS */}
        {/* ============================================================== */}
        <div className="border-t border-slate-200 dark:border-slate-800 mt-2 pt-2 overflow-x-auto scrollbar-none">
          <div className="max-w-7xl mx-auto flex items-center gap-1.5 sm:gap-2">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
              { id: 'beneficiaries', label: 'Beneficiaries', icon: Users, count: totalBeneficiaries },
              { id: 'verifications', label: 'Verifications', icon: ShieldCheck, count: pendingVerifications.length, alert: pendingVerifications.length > 0 },
              { id: 'pensions', label: 'Pensions', icon: FileText },
              { id: 'payments', label: 'Payments', icon: CreditCard },
              { id: 'reminders', label: 'Reminders', icon: Bell },
              { id: 'reports', label: 'Reports', icon: Coins }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-black flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? (theme === 'contrast' ? 'bg-yellow-400 text-black shadow-md' : 'bg-[#0b483c] text-white shadow-sm scale-102')
                      : (theme === 'contrast' ? 'text-yellow-400 hover:bg-zinc-900' : 'opacity-70 hover:opacity-100 hover:bg-slate-200 dark:hover:bg-slate-800')
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive 
                        ? (theme === 'contrast' ? 'bg-black text-yellow-300' : 'bg-teal-300 text-slate-950')
                        : (tab.alert ? 'bg-amber-500 text-white' : 'bg-slate-300 dark:bg-slate-700 text-slate-800 dark:text-slate-200')
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

      </header>

      {/* ============================================================== */}
      {/* 3. MAIN DASHBOARD CONTENT */}
      {/* ============================================================== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">

        {/* Forest Green Welcome Banner (Clean - No Step tags) */}
        <div className={`${themeClasses.bannerBg} rounded-2xl p-6 sm:p-8 shadow-sm`}>
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
                Welcome to Elderly Pension Disbursement Tracker
              </h2>
              <p className="text-sm sm:text-base font-normal opacity-90 leading-relaxed max-w-2xl">
                Track • Transparency • Timely Support. A dedicated system ensuring rural senior citizens receive their monthly welfare pension disbursements on time.
              </p>
            </div>

            <div className={`rounded-xl px-4 py-2.5 text-right self-start sm:self-auto border ${theme === 'contrast' ? 'border-yellow-400 bg-black' : 'border-teal-700 bg-teal-900/40'}`}>
              <span className="text-[11px] font-bold block uppercase tracking-wider opacity-80">
                System Mode
              </span>
              <span className="text-sm sm:text-base font-black block mt-0.5">
                Official Admin
              </span>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------ */}
        {/* VIEW 1: DASHBOARD OVERVIEW */}
        {/* ------------------------------------------------------------ */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            
            {/* 4 KPI Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              
              <div onClick={() => setActiveTab('beneficiaries')} className={`${themeClasses.card} rounded-xl p-5 border shadow-2xs hover:shadow-sm transition-all space-y-2 cursor-pointer`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-semibold opacity-70">Total Beneficiaries</span>
                  <span className="p-2 rounded-lg bg-teal-50 dark:bg-slate-800 text-teal-700 dark:text-teal-400"><Users className="w-5 h-5" /></span>
                </div>
                <div className="text-2xl sm:text-3xl font-black tracking-tight">{totalBeneficiaries}</div>
                <p className="text-xs opacity-60">Registered senior pensioners</p>
              </div>

              <div onClick={() => setActiveTab('payments')} className={`${themeClasses.card} rounded-xl p-5 border shadow-2xs hover:shadow-sm transition-all space-y-2 cursor-pointer`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-semibold opacity-70">Disbursed This Month</span>
                  <span className="p-2 rounded-lg bg-emerald-50 dark:bg-slate-800 text-emerald-700 dark:text-emerald-400"><CreditCard className="w-5 h-5" /></span>
                </div>
                <div className="text-2xl sm:text-3xl font-black tracking-tight">₹4,032</div>
                <p className="text-xs opacity-60">Direct Bank Transfers</p>
              </div>

              <div onClick={() => setActiveTab('verifications')} className={`${themeClasses.card} rounded-xl p-5 border shadow-2xs hover:shadow-sm transition-all space-y-2 cursor-pointer`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-semibold opacity-70">Pending Verifications</span>
                  <span className="p-2 rounded-lg bg-amber-50 dark:bg-slate-800 text-amber-700 dark:text-amber-400"><ShieldCheck className="w-5 h-5" /></span>
                </div>
                <div className="text-2xl sm:text-3xl font-black tracking-tight">{pendingVerifications.length}</div>
                <p className="text-xs opacity-60">Awaiting officer approval</p>
              </div>

              <div onClick={() => setActiveTab('payments')} className={`${themeClasses.card} rounded-xl p-5 border shadow-2xs hover:shadow-sm transition-all space-y-2 cursor-pointer`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-semibold opacity-70">Delayed Alerts</span>
                  <span className="p-2 rounded-lg bg-rose-50 dark:bg-slate-800 text-rose-700 dark:text-rose-400"><Bell className="w-5 h-5" /></span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-rose-600 tracking-tight">{delayedPayments.length}</div>
                <p className="text-xs opacity-60">Exceeded disbursement window</p>
              </div>

            </div>

            {/* Delay Engine Alert */}
            {delayedPayments.length > 0 && (
              <div className="bg-rose-50 dark:bg-rose-950/40 border-2 border-rose-300 dark:border-rose-800 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2.5">
                    <AlertTriangle className="w-5 h-5 text-rose-600" />
                    <span className="font-black text-base text-rose-950 dark:text-rose-200">
                      7-Day Delay Alert: {delayedPayments.length} Overdue Pension Disbursements
                    </span>
                  </div>
                  <button onClick={() => setActiveTab('payments')} className="text-xs font-bold text-rose-700 dark:text-rose-300 underline cursor-pointer">
                    View Payments Ledger →
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {delayedPayments.map(p => (
                    <div key={p.id} className={`${themeClasses.card} p-3.5 rounded-xl border flex items-center justify-between`}>
                      <div>
                        <div className="font-bold">{p.beneficiaryName} ({p.teluguName})</div>
                        <div className="text-xs opacity-60">ID #{p.beneficiaryId} • Due Date: {p.dueDate}</div>
                      </div>
                      <button
                        onClick={() => handleDisburse(p.beneficiaryId, p.id)}
                        className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold cursor-pointer"
                      >
                        Disburse
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Actions Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                onClick={() => setShowAddModal(true)}
                className={`${themeClasses.card} p-5 rounded-2xl border text-left hover:scale-101 transition-transform cursor-pointer flex items-center gap-3`}
              >
                <span className="p-3 bg-teal-100 text-teal-800 rounded-xl"><UserPlus className="w-5 h-5" /></span>
                <div>
                  <div className="font-black text-base">Register Beneficiary</div>
                  <div className="text-xs opacity-60">Enroll new elderly citizen</div>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('verifications')}
                className={`${themeClasses.card} p-5 rounded-2xl border text-left hover:scale-101 transition-transform cursor-pointer flex items-center gap-3`}
              >
                <span className="p-3 bg-amber-100 text-amber-800 rounded-xl"><ShieldCheck className="w-5 h-5" /></span>
                <div>
                  <div className="font-black text-base">Process Verifications</div>
                  <div className="text-xs opacity-60">{pendingVerifications.length} applications pending</div>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('reports')}
                className={`${themeClasses.card} p-5 rounded-2xl border text-left hover:scale-101 transition-transform cursor-pointer flex items-center gap-3`}
              >
                <span className="p-3 bg-blue-100 text-blue-800 rounded-xl"><Coins className="w-5 h-5" /></span>
                <div>
                  <div className="font-black text-base">Download Reports</div>
                  <div className="text-xs opacity-60">Monthly disbursement audits</div>
                </div>
              </button>
            </div>

          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* VIEW 2: BENEFICIARIES */}
        {/* ------------------------------------------------------------ */}
        {activeTab === 'beneficiaries' && (
          <div className={`${themeClasses.card} rounded-2xl p-6 border space-y-5`}>
            <div className="flex flex-wrap justify-between items-center gap-3">
              <div>
                <h3 className="text-xl sm:text-2xl font-black">Beneficiaries Directory</h3>
                <p className="text-xs sm:text-sm opacity-70">Search and manage registered elderly citizens</p>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Search name, phone, district..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`px-3 py-1.5 rounded-xl border text-xs sm:text-sm font-bold focus:outline-none ${theme === 'contrast' ? 'border-yellow-400 bg-black text-yellow-300' : 'border-slate-300 dark:border-slate-700 dark:bg-slate-800'}`}
                />
                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-4 py-2 bg-[#0b483c] hover:bg-[#07332b] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Register</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className={`${themeClasses.tableHeader} font-extrabold`}>
                    <th className="py-3 px-4">Beneficiary</th>
                    <th className="py-3 px-4">Age / Phone</th>
                    <th className="py-3 px-4">District</th>
                    <th className="py-3 px-4">Scheme</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-semibold">
                  {data.filter(b => b.name.toLowerCase().includes(searchQuery.toLowerCase()) || b.phone.includes(searchQuery) || b.district.toLowerCase().includes(searchQuery.toLowerCase())).map(b => (
                    <tr key={b.id} className={themeClasses.tableHover}>
                      <td className="py-3 px-4">
                        <div className="font-bold">{b.name}</div>
                        <div className="text-xs opacity-60">{b.teluguName} • ID #{b.id}</div>
                      </td>
                      <td className="py-3 px-4">{b.age} yrs • {b.phone}</td>
                      <td className="py-3 px-4">{b.district}</td>
                      <td className="py-3 px-4 font-bold">{b.scheme} (₹{b.amount})</td>
                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          b.verificationStatus === 'Verified' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-amber-100 text-amber-800 border border-amber-300'
                        }`}>
                          {b.verificationStatus}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => { setReminderTarget(b); setShowReminderModal(true); }}
                          className="px-2.5 py-1 text-xs font-bold rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                        >
                          <Bell className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* VIEW 3: VERIFICATIONS */}
        {/* ------------------------------------------------------------ */}
        {activeTab === 'verifications' && (
          <div className={`${themeClasses.card} rounded-2xl p-6 border space-y-5`}>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl sm:text-2xl font-black">Official Application Verifications</h3>
                <p className="text-xs sm:text-sm opacity-70">Review elderly pensioner documents and certify eligibility</p>
              </div>
              <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full">
                {pendingVerifications.length} Pending Approval
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.map(b => (
                <div key={b.id} className={`${themeClasses.card} p-5 rounded-xl border space-y-3`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-extrabold text-base">{b.name} ({b.teluguName})</h4>
                      <p className="text-xs opacity-70">ID #{b.id} • Age: {b.age} • Phone: {b.phone}</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      b.verificationStatus === 'Verified' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {b.verificationStatus}
                    </span>
                  </div>

                  <div className="text-xs opacity-80 p-3 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
                    <div><strong>Scheme:</strong> {b.scheme} (₹{b.amount}/month)</div>
                    <div><strong>Address:</strong> {b.address}, {b.district}</div>
                    <div><strong>Remarks:</strong> {b.remarks || 'No remarks recorded.'}</div>
                  </div>

                  {b.verificationStatus === 'Pending' ? (
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => handleVerify(b.id, 'Verified')}
                        className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl cursor-pointer"
                      >
                        Approve &amp; Verify
                      </button>
                      <button
                        onClick={() => handleVerify(b.id, 'Rejected')}
                        className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl cursor-pointer"
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <div className="text-xs text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1.5 pt-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Verified by Mandal Revenue Office on {b.verifyDate}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* VIEW 4: PENSIONS */}
        {/* ------------------------------------------------------------ */}
        {activeTab === 'pensions' && (
          <div className={`${themeClasses.card} rounded-2xl p-6 border space-y-5`}>
            <div>
              <h3 className="text-xl sm:text-2xl font-black">Pension Scheme Allocations</h3>
              <p className="text-xs sm:text-sm opacity-70">Approved monthly schemes and frequencies (Class Diagram: Pension 1-1 Verification)</p>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className={`${themeClasses.tableHeader} font-extrabold`}>
                    <th className="py-3 px-4">Beneficiary</th>
                    <th className="py-3 px-4">Scheme Name</th>
                    <th className="py-3 px-4">Monthly Amount</th>
                    <th className="py-3 px-4">Frequency</th>
                    <th className="py-3 px-4">Start Date</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-semibold">
                  {data.map(b => (
                    <tr key={b.id} className={themeClasses.tableHover}>
                      <td className="py-3 px-4 font-bold">{b.name} (ID #{b.id})</td>
                      <td className="py-3 px-4">{b.scheme}</td>
                      <td className="py-3 px-4 font-black">₹{b.amount}</td>
                      <td className="py-3 px-4">{b.frequency}</td>
                      <td className="py-3 px-4 opacity-70">{b.startDate}</td>
                      <td className="py-3 px-4"><span className="px-2 py-0.5 rounded text-xs font-bold bg-emerald-100 text-emerald-800">Active</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* VIEW 5: PAYMENTS */}
        {/* ------------------------------------------------------------ */}
        {activeTab === 'payments' && (
          <div className={`${themeClasses.card} rounded-2xl p-6 border space-y-5`}>
            <div className="flex flex-wrap justify-between items-center gap-3">
              <div>
                <h3 className="text-xl sm:text-2xl font-black">Payments &amp; Delay Tracking</h3>
                <p className="text-xs sm:text-sm opacity-70">Disbursement records with 7-day delay rule detection</p>
              </div>
              <div className="text-xs text-rose-800 dark:text-rose-200 bg-rose-50 dark:bg-rose-950/60 px-3 py-1.5 rounded-lg border border-rose-300 font-bold">
                ⚠️ Business Rule: Unpaid &gt;7 days past due date is marked "Delayed".
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className={`${themeClasses.tableHeader} font-extrabold`}>
                    <th className="py-3 px-4">Beneficiary</th>
                    <th className="py-3 px-4">Month</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Due Date</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">UTR Reference</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-semibold">
                  {allPayments.map(p => (
                    <tr key={p.id} className={themeClasses.tableHover}>
                      <td className="py-3 px-4 font-bold">{p.beneficiaryName}</td>
                      <td className="py-3 px-4">{p.month}</td>
                      <td className="py-3 px-4 font-black">₹{p.amount}</td>
                      <td className="py-3 px-4 opacity-70">{p.dueDate}</td>
                      <td className="py-3 px-4">
                        {p.status === 'Paid' && <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">Paid</span>}
                        {p.status === 'Delayed' && <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 animate-pulse">Delayed (&gt;7 Days)</span>}
                        {p.status === 'Pending' && <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">Pending</span>}
                      </td>
                      <td className="py-3 px-4 text-xs font-mono opacity-70">{p.txnRef || '—'}</td>
                      <td className="py-3 px-4 text-right">
                        {p.status !== 'Paid' ? (
                          <button
                            onClick={() => handleDisburse(p.beneficiaryId, p.id)}
                            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold cursor-pointer"
                          >
                            Disburse
                          </button>
                        ) : (
                          <span className="text-xs opacity-60">Completed</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* VIEW 6: REMINDERS */}
        {/* ------------------------------------------------------------ */}
        {activeTab === 'reminders' && (
          <div className={`${themeClasses.card} rounded-2xl p-6 border space-y-5`}>
            <div>
              <h3 className="text-xl sm:text-2xl font-black">In-App Reminders Center</h3>
              <p className="text-xs sm:text-sm opacity-70">Logged notifications and automated delay follow-ups (no real SMS required)</p>
            </div>

            <div className="space-y-3">
              {data.flatMap(b => b.reminders.map(r => ({ ...r, beneficiaryName: b.name, beneficiaryId: b.id }))).map(r => (
                <div key={r.id} className={`${themeClasses.card} p-4 rounded-xl border flex items-start justify-between gap-4`}>
                  <div className="flex items-start gap-3">
                    <span className="p-2 bg-blue-100 dark:bg-slate-800 text-blue-700 dark:text-blue-400 rounded-lg mt-0.5"><Bell className="w-4 h-4" /></span>
                    <div>
                      <div className="font-extrabold text-sm">{r.beneficiaryName} (ID #{r.beneficiaryId})</div>
                      <p className="text-xs sm:text-sm opacity-90 mt-0.5">{r.message}</p>
                      <span className="text-[11px] opacity-60 mt-1 block">Date: {r.date}</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">{r.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* VIEW 7: REPORTS */}
        {/* ------------------------------------------------------------ */}
        {activeTab === 'reports' && (
          <div className={`${themeClasses.card} rounded-2xl p-6 border space-y-6`}>
            <div className="flex flex-wrap justify-between items-center gap-3">
              <div>
                <h3 className="text-xl sm:text-2xl font-black">Welfare Reports &amp; Analytics</h3>
                <p className="text-xs sm:text-sm opacity-70">Disbursement performance metrics and district audit breakdowns</p>
              </div>
              <button
                onClick={() => alert('📊 Audit report downloaded successfully!')}
                className="px-4 py-2 bg-[#0b483c] hover:bg-[#07332b] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Export Report</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-xs font-bold opacity-70 uppercase">On-Time Disbursement Rate</span>
                <div className="text-2xl sm:text-3xl font-black text-emerald-600">71.4%</div>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-xs font-bold opacity-70 uppercase">Total Disbursed (FY)</span>
                <div className="text-2xl sm:text-3xl font-black text-blue-600">₹{totalDisbursedAmount.toLocaleString('en-IN')}</div>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-xs font-bold opacity-70 uppercase">Covered Districts</span>
                <div className="text-2xl sm:text-3xl font-black text-teal-600">5 Districts</div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ============================================================== */}
      {/* 4. MODALS */}
      {/* ============================================================== */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className={`${themeClasses.card} rounded-2xl max-w-lg w-full p-6 shadow-2xl border`}>
            <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-slate-800 mb-4">
              <h3 className="font-black text-lg flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-teal-700" />
                <span>Register New Elderly Beneficiary</span>
              </h3>
              <button onClick={() => setShowAddModal(false)}><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleAdd} className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Full Name (English) *"
                  value={newPensioner.name}
                  onChange={e => setNewPensioner({ ...newPensioner, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg font-semibold dark:bg-slate-800 dark:border-slate-700"
                />
                <input
                  type="text"
                  placeholder="పేరు (తెలుగు)"
                  value={newPensioner.teluguName}
                  onChange={e => setNewPensioner({ ...newPensioner, teluguName: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg font-semibold dark:bg-slate-800 dark:border-slate-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  required
                  min="60"
                  placeholder="Age (60+ yrs) *"
                  value={newPensioner.age}
                  onChange={e => setNewPensioner({ ...newPensioner, age: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg font-semibold dark:bg-slate-800 dark:border-slate-700"
                />
                <input
                  type="tel"
                  required
                  placeholder="Phone Number *"
                  value={newPensioner.phone}
                  onChange={e => setNewPensioner({ ...newPensioner, phone: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg font-semibold dark:bg-slate-800 dark:border-slate-700"
                />
              </div>

              <textarea
                required
                rows="2"
                placeholder="Residential Address & Village *"
                value={newPensioner.address}
                onChange={e => setNewPensioner({ ...newPensioner, address: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg font-semibold dark:bg-slate-800 dark:border-slate-700"
              ></textarea>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 border rounded-xl font-bold cursor-pointer">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-[#0b483c] text-white rounded-xl font-bold cursor-pointer">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showReminderModal && reminderTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className={`${themeClasses.card} rounded-2xl max-w-md w-full p-6 shadow-2xl border`}>
            <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-slate-800 mb-3">
              <h3 className="font-black text-base flex items-center gap-2">
                <Bell className="w-5 h-5 text-teal-700" />
                <span>Send In-App Reminder to {reminderTarget.name}</span>
              </h3>
              <button onClick={() => setShowReminderModal(false)}><X className="w-5 h-5" /></button>
            </div>
            <textarea
              rows="3"
              placeholder="Enter reminder notification message..."
              value={customMsg}
              onChange={e => setCustomMsg(e.target.value)}
              className="w-full px-3 py-2 text-sm border rounded-lg font-semibold dark:bg-slate-800 dark:border-slate-700 mb-3"
            ></textarea>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowReminderModal(false)} className="px-3 py-1.5 border rounded-lg text-xs font-bold cursor-pointer">
                Cancel
              </button>
              <button onClick={handleSendReminderAlert} className="px-4 py-1.5 bg-[#0b483c] text-white rounded-lg text-xs font-bold cursor-pointer">
                Send Alert
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 5. FOOTER */}
      {/* ============================================================== */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-6 mt-12 text-center text-xs opacity-70 font-semibold">
        <p>Elderly Pension Disbursement Tracker System • Problem Statement 126</p>
        <p className="mt-0.5">High Contrast, Accessible Typography &amp; Automated Delay Alerts</p>
      </footer>

    </div>
  );
}
