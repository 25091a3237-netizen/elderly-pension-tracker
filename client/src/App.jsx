import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  LogOut, 
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
  ChevronRight,
  TrendingUp,
  Download,
  Filter,
  Check,
  Send,
  Eye,
  Calendar,
  Building,
  Phone,
  MapPin,
  Coins
} from 'lucide-react';

// ==========================================
// SEED DATA STORE
// Problem Statement 126: Rural Elderly Pension
// ==========================================
const INITIAL_DATA = [
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
    remarks: 'Aadhaar and age documents certified',
    payments: [
      { id: 'PAY-101-09', month: 'September 2024', amount: 2016, dueDate: '2024-09-01', payDate: '2024-09-03', status: 'Paid', txnRef: 'TXN-902148' },
      { id: 'PAY-101-10', month: 'October 2024', amount: 2016, dueDate: '2024-10-01', payDate: null, status: 'Delayed', txnRef: null }
    ],
    reminders: [
      { id: 'REM-101-1', message: 'Urgent: October pension disbursement is delayed by >7 days. Treasury escalation initiated.', date: '2024-10-08', status: 'Sent' }
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
      { id: 'REM-102-1', message: 'Automated delay notice: October pension exceeded standard 7-day disbursement window.', date: '2024-10-08', status: 'Sent' }
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
  // Navigation State: 'dashboard' | 'beneficiaries' | 'verifications' | 'pensions' | 'payments' | 'reminders' | 'reports'
  const [activeTab, setActiveTab] = useState('dashboard');

  // Text Resizer: 'A' | 'A+' | 'A++'
  const [textSize, setTextSize] = useState('A++');

  // Mobile menu toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Main Persistent Beneficiary State
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('pension_tracker_main_data_v2');
    return saved ? JSON.parse(saved) : INITIAL_DATA;
  });

  useEffect(() => {
    localStorage.setItem('pension_tracker_main_data_v2', JSON.stringify(data));
  }, [data]);

  // Search Filter State for Beneficiaries
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
  const [customReminderMsg, setCustomReminderMsg] = useState('');

  // -------------------------------------------------------------
  // BUSINESS LOGIC: DISBURSEMENT, VERIFICATION & DELAY ENGINE
  // -------------------------------------------------------------
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
  const totalDisbursedThisMonth = paidPayments
    .filter(p => p.month === 'October 2024')
    .reduce((acc, p) => acc + p.amount, 0);

  // Action: Verify Beneficiary Application
  const handleVerifyApplication = (id, newStatus, remarks) => {
    setData(prev => prev.map(b => {
      if (b.id === id) {
        return {
          ...b,
          verificationStatus: newStatus,
          verifiedBy: 'District Welfare Officer (Admin)',
          verifyDate: new Date().toISOString().split('T')[0],
          remarks: remarks || `Application approved and ${newStatus} by officer.`,
          reminders: [
            {
              id: `REM-${id}-${Date.now()}`,
              message: `Official Notice: Application marked as ${newStatus}.`,
              date: new Date().toISOString().split('T')[0],
              status: 'Sent'
            },
            ...b.reminders
          ]
        };
      }
      return b;
    }));
  };

  // Action: Disburse Payment (Mark Paid)
  const handleDisbursePayment = (beneficiaryId, paymentId) => {
    const txn = 'TXN-' + Math.floor(100000 + Math.random() * 900000);
    setData(prev => prev.map(b => {
      if (b.id === beneficiaryId) {
        const updatedPayments = b.payments.map(p => {
          if (p.id === paymentId) {
            return {
              ...p,
              status: 'Paid',
              payDate: new Date().toISOString().split('T')[0],
              txnRef: txn
            };
          }
          return p;
        });

        return {
          ...b,
          payments: updatedPayments,
          reminders: [
            {
              id: `REM-${b.id}-${Date.now()}`,
              message: `Payment Disbursed: ₹${b.amount} credited successfully. Ref: ${txn}`,
              date: new Date().toISOString().split('T')[0],
              status: 'Sent'
            },
            ...b.reminders
          ]
        };
      }
      return b;
    }));
  };

  // Action: Add New Beneficiary
  const handleAddBeneficiary = (e) => {
    e.preventDefault();
    if (!newPensioner.name || !newPensioner.phone || !newPensioner.age || !newPensioner.address) {
      alert('Please fill all mandatory fields.');
      return;
    }

    const nextId = 100 + data.length + 1;
    const item = {
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
      remarks: 'Newly registered application. Pending initial document check.',
      payments: [
        {
          id: `PAY-${nextId}-10`,
          month: 'October 2024',
          amount: parseFloat(newPensioner.amount) || 2016,
          dueDate: new Date().toISOString().split('T')[0],
          payDate: null,
          status: 'Pending',
          txnRef: null
        }
      ],
      reminders: [
        {
          id: `REM-${nextId}-1`,
          message: 'Welcome: Beneficiary application registered. Field verification in progress.',
          date: new Date().toISOString().split('T')[0],
          status: 'Pending'
        }
      ]
    };

    setData([item, ...data]);
    setShowAddModal(false);
    setNewPensioner({
      name: '',
      teluguName: '',
      age: '',
      phone: '',
      address: '',
      district: 'Warangal Rural',
      scheme: 'Asara Old Age Pension',
      amount: 2016
    });
    alert(`✅ Beneficiary Registered! Assigned ID: #${nextId}`);
  };

  // Action: Send Custom In-App Reminder
  const handleSendReminder = () => {
    if (!reminderTarget || !customReminderMsg) return;
    setData(prev => prev.map(b => {
      if (b.id === reminderTarget.id) {
        return {
          ...b,
          reminders: [
            {
              id: `REM-${b.id}-${Date.now()}`,
              message: customReminderMsg,
              date: new Date().toISOString().split('T')[0],
              status: 'Sent'
            },
            ...b.reminders
          ]
        };
      }
      return b;
    }));
    setShowReminderModal(false);
    setCustomReminderMsg('');
    alert('🔔 In-App reminder logged and delivered to beneficiary passbook!');
  };

  // Typography scale classes
  const getTextSizeClass = () => {
    if (textSize === 'A') return 'text-sm';
    if (textSize === 'A+') return 'text-base';
    return 'text-lg'; // 'A++' default high visibility
  };

  // Navigation Items Specification (Exact 7 requested tabs)
  const NAV_ITEMS = [
    { key: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { key: 'beneficiaries', label: 'Beneficiaries', icon: Users, badge: totalBeneficiaries },
    { key: 'verifications', label: 'Verifications', icon: ShieldCheck, badge: pendingVerifications.length > 0 ? pendingVerifications.length : null, badgeColor: 'bg-amber-500' },
    { key: 'pensions', label: 'Pensions', icon: FileText },
    { key: 'payments', label: 'Payments', icon: CreditCard },
    { key: 'reminders', label: 'Reminders', icon: Bell },
    { key: 'reports', label: 'Reports', icon: Coins }
  ];

  return (
    <div className={`min-h-screen bg-[#f4f7fa] text-slate-900 font-sans ${getTextSizeClass()}`}>
      
      {/* ============================================================== */}
      {/* 1. TOP HEADER & ACCESSIBILITY CONTROLS */}
      {/* ============================================================== */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          
          {/* Left: Brand Identity */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 cursor-pointer"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight">
                Dashboard &amp; Overview
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-slate-500">
                Elderly Pension Disbursement Tracker System
              </p>
            </div>
          </div>

          {/* Right: Text Size Resizer & Officer Profile */}
          <div className="flex items-center gap-3 sm:gap-6">
            
            {/* Exact Pill Font Resizer from Screenshot */}
            <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
              <span className="text-xs sm:text-sm font-bold text-slate-600 flex items-center gap-1">
                <span className="font-serif">T</span> Text Size:
              </span>
              <div className="inline-flex items-center gap-1">
                <button
                  onClick={() => setTextSize('A')}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    textSize === 'A' ? 'bg-[#0f4a3e] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                  }`}
                >
                  A
                </button>
                <button
                  onClick={() => setTextSize('A+')}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    textSize === 'A+' ? 'bg-[#0f4a3e] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                  }`}
                >
                  A+
                </button>
                <button
                  onClick={() => setTextSize('A++')}
                  className={`px-3 py-1 text-xs sm:text-sm font-extrabold rounded-lg transition-all cursor-pointer ${
                    textSize === 'A++' ? 'bg-[#0f4a3e] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                  }`}
                >
                  A++
                </button>
              </div>
            </div>

            {/* Officer Info */}
            <div className="hidden md:flex flex-col items-end text-right">
              <span className="text-sm font-bold text-slate-800 leading-tight">District Welfare Officer</span>
              <span className="text-xs font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 mt-0.5">
                Administrator
              </span>
            </div>

            {/* Avatar "D" */}
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-teal-100 border-2 border-teal-300 text-teal-900 font-extrabold text-base flex items-center justify-center shadow-xs">
              D
            </div>

            {/* Logout */}
            <button 
              onClick={() => alert('Official Administrator Mode Active')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-rose-300 text-rose-700 hover:bg-rose-50 text-xs sm:text-sm font-bold transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>

          </div>

        </div>

        {/* ============================================================== */}
        {/* 2. DEDICATED 7-TAB HORIZONTAL NAVIGATION BAR */}
        {/* ============================================================== */}
        <nav className="border-t border-slate-200 bg-white px-4 sm:px-6 overflow-x-auto scrollbar-none">
          <div className="max-w-7xl mx-auto flex items-center gap-1 sm:gap-2 py-2">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.key;

              return (
                <button
                  key={item.key}
                  onClick={() => {
                    setActiveTab(item.key);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#0b483c] text-white shadow-xs scale-100 font-extrabold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                  <span>{item.label}</span>
                  {item.badge !== undefined && item.badge !== null && (
                    <span className={`text-[10px] font-black px-1.5 py-0.2 rounded-full ${
                      isActive 
                        ? 'bg-teal-300 text-slate-950' 
                        : (item.badgeColor ? `${item.badgeColor} text-white` : 'bg-slate-200 text-slate-700')
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div onClick={() => setMobileMenuOpen(false)} className="fixed inset-0 bg-slate-900/40" />
          <div className="relative w-64 bg-white h-full shadow-2xl p-4 flex flex-col z-10 space-y-2">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200 font-black">
              <span>Navigation</span>
              <button onClick={() => setMobileMenuOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.key}
                onClick={() => { setActiveTab(item.key); setMobileMenuOpen(false); }}
                className={`w-full text-left px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-3 ${
                  activeTab === item.key ? 'bg-[#0b483c] text-white' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 3. MAIN DASHBOARD CONTENT AREA */}
      {/* ============================================================== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">

        {/* ------------------------------------------------------------ */}
        {/* FOREST GREEN BANNER (Cleaned - No Step 1/Step 2 tags) */}
        {/* ------------------------------------------------------------ */}
        <div className="bg-[#0b483c] text-white rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                Welcome to Elderly Pension Disbursement Tracker
              </h2>
              <p className="text-teal-100 text-sm sm:text-base font-normal leading-relaxed max-w-2xl">
                Track • Transparency • Timely Support. A dedicated system ensuring rural senior citizens receive their monthly welfare pension disbursements on time.
              </p>
            </div>

            <div className="bg-[#083a30] border border-[#145d4f] rounded-xl px-5 py-3 text-right self-start sm:self-auto min-w-[140px]">
              <span className="text-[11px] font-bold text-teal-300 block uppercase tracking-wider">
                System Mode
              </span>
              <span className="text-sm sm:text-base font-black text-white block mt-0.5">
                Official Admin
              </span>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------ */}
        {/* TAB 1: DASHBOARD OVERVIEW */}
        {/* ------------------------------------------------------------ */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* 4 KPI Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              
              <div 
                onClick={() => setActiveTab('beneficiaries')}
                className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs hover:shadow-sm transition-all space-y-2 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-semibold text-slate-600">Total Beneficiaries</span>
                  <span className="p-2 rounded-lg bg-teal-50 text-teal-700"><Users className="w-5 h-5" /></span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{totalBeneficiaries}</div>
                <p className="text-xs font-semibold text-slate-400">Registered senior pensioners</p>
              </div>

              <div 
                onClick={() => setActiveTab('payments')}
                className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs hover:shadow-sm transition-all space-y-2 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-semibold text-slate-600">Disbursed This Month</span>
                  <span className="p-2 rounded-lg bg-emerald-50 text-emerald-700"><CreditCard className="w-5 h-5" /></span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">₹{totalDisbursedThisMonth.toLocaleString('en-IN')}</div>
                <p className="text-xs font-semibold text-slate-400">Direct Bank Transfers</p>
              </div>

              <div 
                onClick={() => setActiveTab('verifications')}
                className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs hover:shadow-sm transition-all space-y-2 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-semibold text-slate-600">Pending Verifications</span>
                  <span className="p-2 rounded-lg bg-amber-50 text-amber-700"><ShieldCheck className="w-5 h-5" /></span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{pendingVerifications.length}</div>
                <p className="text-xs font-semibold text-slate-400">Awaiting officer approval</p>
              </div>

              <div 
                onClick={() => setActiveTab('payments')}
                className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs hover:shadow-sm transition-all space-y-2 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-semibold text-slate-600">Delayed Alerts</span>
                  <span className="p-2 rounded-lg bg-rose-50 text-rose-700"><Bell className="w-5 h-5" /></span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-rose-600 tracking-tight">{delayedPayments.length}</div>
                <p className="text-xs font-semibold text-slate-400">Exceeded disbursement window</p>
              </div>

            </div>

            {/* Delay Detection Engine Notification Banner */}
            {delayedPayments.length > 0 && (
              <div className="bg-rose-50 border-2 border-rose-300 rounded-2xl p-5 sm:p-6 shadow-xs">
                <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="p-2 bg-rose-600 text-white rounded-xl"><AlertTriangle className="w-5 h-5" /></span>
                    <div>
                      <h3 className="font-extrabold text-base sm:text-lg text-rose-950">
                        7-Day Delay Detection Alert Engine
                      </h3>
                      <p className="text-xs sm:text-sm text-rose-800 font-semibold">
                        {delayedPayments.length} elderly beneficiaries have payments exceeding 7 days past scheduled due date.
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setActiveTab('payments')}
                    className="px-4 py-2 bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs sm:text-sm rounded-xl cursor-pointer"
                  >
                    View All Delayed Payments
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {delayedPayments.map(p => (
                    <div key={p.id} className="bg-white p-3.5 rounded-xl border border-rose-200 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-slate-900">{p.beneficiaryName} ({p.teluguName})</div>
                        <div className="text-xs text-slate-500">ID #{p.beneficiaryId} • Due: {p.dueDate}</div>
                      </div>
                      <button
                        onClick={() => handleDisbursePayment(p.beneficiaryId, p.id)}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg cursor-pointer"
                      >
                        Disburse Now
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Actions & Recent Activity Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-black text-lg text-slate-900">Recent Disbursement Activity</h3>
                  <button onClick={() => setActiveTab('payments')} className="text-xs font-bold text-teal-800 hover:underline">
                    View Payments Ledger →
                  </button>
                </div>

                <div className="divide-y divide-slate-100">
                  {allPayments.slice(0, 4).map(p => (
                    <div key={p.id} className="py-3 flex items-center justify-between text-sm">
                      <div>
                        <div className="font-bold text-slate-800">{p.beneficiaryName}</div>
                        <div className="text-xs text-slate-400">{p.month} • {p.scheme}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-extrabold text-slate-900">₹{p.amount}</div>
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          p.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' :
                          p.status === 'Delayed' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {p.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Official Actions Card */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-3">
                <h3 className="font-black text-lg text-slate-900">Quick Official Actions</h3>
                <p className="text-xs text-slate-500 font-semibold">Immediate workflow actions for Welfare Officers</p>
                
                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="w-full text-left px-4 py-3 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-900 font-bold text-sm flex items-center gap-3 transition-colors cursor-pointer border border-teal-200"
                  >
                    <UserPlus className="w-5 h-5 text-teal-700" />
                    <span>Register New Beneficiary</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('verifications')}
                    className="w-full text-left px-4 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-sm flex items-center gap-3 transition-colors cursor-pointer border border-slate-200"
                  >
                    <ShieldCheck className="w-5 h-5 text-amber-600" />
                    <span>Verify Applications ({pendingVerifications.length})</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('reports')}
                    className="w-full text-left px-4 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-sm flex items-center gap-3 transition-colors cursor-pointer border border-slate-200"
                  >
                    <FileText className="w-5 h-5 text-blue-600" />
                    <span>Generate Monthly Report</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* TAB 2: BENEFICIARIES */}
        {/* ------------------------------------------------------------ */}
        {activeTab === 'beneficiaries' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6 animate-fadeIn">
            
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">Beneficiary Directory</h3>
                <p className="text-xs sm:text-sm text-slate-500 font-semibold">
                  Complete registry of rural senior citizens receiving welfare pension disbursements.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search name, phone, district..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-teal-700"
                  />
                </div>

                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-4 py-2 bg-[#0b483c] hover:bg-[#07332b] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Register Beneficiary</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-50 text-slate-700 font-extrabold border-b border-slate-200">
                    <th className="py-3 px-4">Beneficiary Name</th>
                    <th className="py-3 px-4">Age</th>
                    <th className="py-3 px-4">Contact Phone</th>
                    <th className="py-3 px-4">Village / District</th>
                    <th className="py-3 px-4">Allocated Scheme</th>
                    <th className="py-3 px-4">Verification</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-semibold">
                  {data
                    .filter(b => 
                      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      b.phone.includes(searchQuery) ||
                      b.district.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map(b => (
                      <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-900">{b.name}</div>
                          <div className="text-xs text-slate-400">{b.teluguName} • ID #{b.id}</div>
                        </td>
                        <td className="py-3 px-4">{b.age} yrs</td>
                        <td className="py-3 px-4 text-slate-600">{b.phone}</td>
                        <td className="py-3 px-4 text-slate-600">{b.address}, {b.district}</td>
                        <td className="py-3 px-4 font-bold text-slate-800">{b.scheme}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                            b.verificationStatus === 'Verified' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-amber-100 text-amber-800 border border-amber-300'
                          }`}>
                            {b.verificationStatus}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right space-x-1">
                          <button
                            onClick={() => {
                              setReminderTarget(b);
                              setShowReminderModal(true);
                            }}
                            className="px-2.5 py-1 text-xs font-bold rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 cursor-pointer"
                            title="Send In-App Reminder"
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
        {/* TAB 3: VERIFICATIONS */}
        {/* ------------------------------------------------------------ */}
        {activeTab === 'verifications' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6 animate-fadeIn">
            
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">Application Verifications</h3>
                <p className="text-xs sm:text-sm text-slate-500 font-semibold">
                  Mandal and Panchayat officer verification queue for newly enrolled elderly pensioners.
                </p>
              </div>
              <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full border border-amber-300">
                {pendingVerifications.length} Pending Approval
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.map(b => (
                <div key={b.id} className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-extrabold text-base text-slate-900">{b.name} ({b.teluguName})</h4>
                      <p className="text-xs text-slate-500">ID #{b.id} • Age: {b.age} • Phone: {b.phone}</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      b.verificationStatus === 'Verified' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {b.verificationStatus}
                    </span>
                  </div>

                  <div className="text-xs text-slate-600 bg-white p-3 rounded-lg border border-slate-200 space-y-1">
                    <div><strong>Scheme:</strong> {b.scheme} (₹{b.amount}/month)</div>
                    <div><strong>Address:</strong> {b.address}, {b.district}</div>
                    <div><strong>Officer:</strong> {b.verifiedBy}</div>
                    <div><strong>Remarks:</strong> {b.remarks || 'No remarks recorded.'}</div>
                  </div>

                  {b.verificationStatus === 'Pending' ? (
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => handleVerifyApplication(b.id, 'Verified', 'All documents certified and approved')}
                        className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl cursor-pointer"
                      >
                        Approve &amp; Verify
                      </button>
                      <button
                        onClick={() => handleVerifyApplication(b.id, 'Rejected', 'Document discrepancy identified')}
                        className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl cursor-pointer"
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <div className="text-xs text-emerald-700 font-bold flex items-center gap-1.5 pt-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Verification verified by Mandal Revenue Office on {b.verifyDate}
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* TAB 4: PENSIONS */}
        {/* ------------------------------------------------------------ */}
        {activeTab === 'pensions' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6 animate-fadeIn">
            
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">Pension Scheme Allocations</h3>
                <p className="text-xs sm:text-sm text-slate-500 font-semibold">
                  Approved monthly welfare pension allocations mirroring system class models (Pension 1-1 Verification).
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-teal-50/60 border border-teal-200 space-y-1">
                <span className="text-xs font-bold text-teal-800 uppercase tracking-wider">Asara Old Age Pension</span>
                <div className="text-2xl font-black text-slate-900">₹2,016 <span className="text-xs text-slate-500 font-semibold">/ month</span></div>
                <p className="text-xs text-slate-600">Standard monthly rural elderly welfare support.</p>
              </div>

              <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 space-y-1">
                <span className="text-xs font-bold text-blue-800 uppercase tracking-wider">Senior Citizen Special Support</span>
                <div className="text-2xl font-black text-slate-900">₹3,016 <span className="text-xs text-slate-500 font-semibold">/ month</span></div>
                <p className="text-xs text-slate-600">Advanced medical and disability assisted support.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">National IGNOAPS</span>
                <div className="text-2xl font-black text-slate-900">₹2,000 <span className="text-xs text-slate-500 font-semibold">/ month</span></div>
                <p className="text-xs text-slate-600">Central welfare elderly contribution scheme.</p>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-50 text-slate-700 font-extrabold border-b border-slate-200">
                    <th className="py-3 px-4">Beneficiary</th>
                    <th className="py-3 px-4">Scheme Name</th>
                    <th className="py-3 px-4">Monthly Amount</th>
                    <th className="py-3 px-4">Disbursement Frequency</th>
                    <th className="py-3 px-4">Start Date</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-semibold">
                  {data.map(b => (
                    <tr key={b.id} className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-bold text-slate-900">{b.name} (ID #{b.id})</td>
                      <td className="py-3 px-4">{b.scheme}</td>
                      <td className="py-3 px-4 font-black text-slate-900">₹{b.amount}</td>
                      <td className="py-3 px-4">{b.frequency}</td>
                      <td className="py-3 px-4 text-slate-600">{b.startDate}</td>
                      <td className="py-3 px-4">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                          Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* TAB 5: PAYMENTS & DELAY TRACKING */}
        {/* ------------------------------------------------------------ */}
        {activeTab === 'payments' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6 animate-fadeIn">
            
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">Disbursement Payments Ledger</h3>
                <p className="text-xs sm:text-sm text-slate-500 font-semibold">
                  Payment records, bank transfer UTRs, and automated 7-day delay detection rules.
                </p>
              </div>

              <div className="text-xs text-rose-800 bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-200 font-bold">
                ⚠️ Business Rule: Unpaid payments &gt;7 days past due date are flagged as "Delayed".
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-50 text-slate-700 font-extrabold border-b border-slate-200">
                    <th className="py-3 px-4">Beneficiary</th>
                    <th className="py-3 px-4">Month</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Due Date</th>
                    <th className="py-3 px-4">Paid Date</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Bank Ref / UTR</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-semibold">
                  {allPayments.map(p => (
                    <tr key={p.id} className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-bold text-slate-900">
                        {p.beneficiaryName}
                        <div className="text-xs text-slate-400">ID #{p.beneficiaryId}</div>
                      </td>
                      <td className="py-3 px-4">{p.month}</td>
                      <td className="py-3 px-4 font-black text-slate-900">₹{p.amount}</td>
                      <td className="py-3 px-4 text-slate-600">{p.dueDate}</td>
                      <td className="py-3 px-4 text-slate-600">{p.payDate || '—'}</td>
                      <td className="py-3 px-4">
                        {p.status === 'Paid' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Paid
                          </span>
                        )}
                        {p.status === 'Delayed' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300 animate-pulse">
                            <AlertTriangle className="w-3.5 h-3.5" /> Delayed (&gt;7 Days)
                          </span>
                        )}
                        {p.status === 'Pending' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                            <Clock className="w-3.5 h-3.5" /> Pending
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-xs font-mono text-slate-500">
                        {p.txnRef || <span className="text-slate-400 italic font-sans">Processing</span>}
                      </td>
                      <td className="py-3 px-4 text-right">
                        {p.status !== 'Paid' ? (
                          <button
                            onClick={() => handleDisbursePayment(p.beneficiaryId, p.id)}
                            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg cursor-pointer"
                          >
                            Disburse
                          </button>
                        ) : (
                          <span className="text-xs text-slate-400 font-semibold">Completed</span>
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
        {/* TAB 6: REMINDERS */}
        {/* ------------------------------------------------------------ */}
        {activeTab === 'reminders' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6 animate-fadeIn">
            
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">In-App Reminders &amp; Alerts</h3>
                <p className="text-xs sm:text-sm text-slate-500 font-semibold">
                  Automated reminders and notifications logged for delays and verification follow-ups.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {data.flatMap(b => b.reminders.map(r => ({ ...r, beneficiaryName: b.name, beneficiaryId: b.id }))).map(r => (
                <div key={r.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <span className="p-2 bg-blue-100 text-blue-700 rounded-lg mt-0.5">
                      <Bell className="w-4 h-4" />
                    </span>
                    <div>
                      <div className="font-extrabold text-sm text-slate-900">
                        {r.beneficiaryName} <span className="text-xs font-normal text-slate-500">(ID #{r.beneficiaryId})</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 font-semibold mt-0.5 leading-relaxed">
                        {r.message}
                      </p>
                      <span className="text-[11px] text-slate-400 font-semibold mt-1 block">
                        Logged Date: {r.date}
                      </span>
                    </div>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    r.status === 'Sent' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {r.status}
                  </span>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* TAB 7: REPORTS */}
        {/* ------------------------------------------------------------ */}
        {activeTab === 'reports' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6 animate-fadeIn">
            
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">Welfare Reports &amp; Analytics</h3>
                <p className="text-xs sm:text-sm text-slate-500 font-semibold">
                  Comprehensive performance reporting on pension disbursement rates, delays, and district summaries.
                </p>
              </div>

              <button
                onClick={() => alert('📊 Generating PDF & CSV Disbursement Audit Report... (Completed)')}
                className="px-4 py-2 bg-[#0b483c] hover:bg-[#07332b] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <Download className="w-4 h-4" />
                <span>Download Official Audit Report</span>
              </button>
            </div>

            {/* Performance Summary Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-[#f9fbfd] space-y-1">
                <span className="text-xs font-bold text-slate-500 uppercase">On-Time Disbursement Rate</span>
                <div className="text-2xl sm:text-3xl font-black text-emerald-700">71.4%</div>
                <p className="text-xs text-slate-400">Target government benchmark: 90%</p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-[#f9fbfd] space-y-1">
                <span className="text-xs font-bold text-slate-500 uppercase">Average Processing Time</span>
                <div className="text-2xl sm:text-3xl font-black text-blue-700">3.2 Days</div>
                <p className="text-xs text-slate-400">From treasury release to credit</p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-[#f9fbfd] space-y-1">
                <span className="text-xs font-bold text-slate-500 uppercase">District Coverage</span>
                <div className="text-2xl sm:text-3xl font-black text-teal-800">5 Districts</div>
                <p className="text-xs text-slate-400">Warangal, Nalgonda, Medak, Yadadri, Karimnagar</p>
              </div>
            </div>

            {/* District Breakdown Table */}
            <div>
              <h4 className="font-extrabold text-sm text-slate-800 mb-3">District-Wise Disbursement Performance</h4>
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-slate-50 text-slate-700 font-extrabold border-b border-slate-200">
                      <th className="py-3 px-4">District</th>
                      <th className="py-3 px-4">Registered Pensioners</th>
                      <th className="py-3 px-4">October Disbursed (₹)</th>
                      <th className="py-3 px-4">Delayed Cases</th>
                      <th className="py-3 px-4">Performance Rating</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold">
                    <tr className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-bold">Warangal Rural</td>
                      <td className="py-3 px-4">1</td>
                      <td className="py-3 px-4">₹0 (Delayed)</td>
                      <td className="py-3 px-4 text-rose-600 font-bold">1</td>
                      <td className="py-3 px-4"><span className="text-xs font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800">Attention Needed</span></td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-bold">Nalgonda</td>
                      <td className="py-3 px-4">1</td>
                      <td className="py-3 px-4">₹0 (Delayed)</td>
                      <td className="py-3 px-4 text-rose-600 font-bold">1</td>
                      <td className="py-3 px-4"><span className="text-xs font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800">Attention Needed</span></td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-bold">Yadadri Bhuvanagiri</td>
                      <td className="py-3 px-4">1</td>
                      <td className="py-3 px-4">₹2,016</td>
                      <td className="py-3 px-4 text-emerald-600 font-bold">0</td>
                      <td className="py-3 px-4"><span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">Excellent</span></td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-bold">Karimnagar</td>
                      <td className="py-3 px-4">1</td>
                      <td className="py-3 px-4">₹2,016</td>
                      <td className="py-3 px-4 text-emerald-600 font-bold">0</td>
                      <td className="py-3 px-4"><span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">Excellent</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* ============================================================== */}
      {/* 4. MODALS: REGISTER BENEFICIARY */}
      {/* ============================================================== */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-scaleUp">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200 mb-4">
              <h3 className="font-black text-lg text-slate-900 flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-teal-700" />
                <span>Register New Elderly Beneficiary</span>
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddBeneficiary} className="space-y-3.5 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name (English) *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramaiah K."
                    value={newPensioner.name}
                    onChange={e => setNewPensioner({ ...newPensioner, name: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-teal-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Name (తెలుగు)</label>
                  <input
                    type="text"
                    placeholder="రామయ్య"
                    value={newPensioner.teluguName}
                    onChange={e => setNewPensioner({ ...newPensioner, teluguName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-teal-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Age (60+ yrs) *</label>
                  <input
                    type="number"
                    required
                    min="60"
                    placeholder="e.g. 67"
                    value={newPensioner.age}
                    onChange={e => setNewPensioner({ ...newPensioner, age: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-teal-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9848011223"
                    value={newPensioner.phone}
                    onChange={e => setNewPensioner({ ...newPensioner, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-teal-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">District</label>
                  <select
                    value={newPensioner.district}
                    onChange={e => setNewPensioner({ ...newPensioner, district: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-teal-700"
                  >
                    <option value="Warangal Rural">Warangal Rural</option>
                    <option value="Nalgonda">Nalgonda</option>
                    <option value="Medak">Medak</option>
                    <option value="Yadadri">Yadadri</option>
                    <option value="Karimnagar">Karimnagar</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Monthly Scheme</label>
                  <select
                    value={newPensioner.scheme}
                    onChange={e => setNewPensioner({ ...newPensioner, scheme: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-teal-700"
                  >
                    <option value="Asara Old Age Pension">Asara Old Age Pension (₹2,016)</option>
                    <option value="Senior Citizen Special Support">Senior Citizen Special Support (₹3,016)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Residential Address *</label>
                <textarea
                  required
                  rows="2"
                  placeholder="H.No, Village / Ward street address..."
                  value={newPensioner.address}
                  onChange={e => setNewPensioner({ ...newPensioner, address: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-teal-700"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl font-bold text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0b483c] hover:bg-[#07332b] text-white rounded-xl font-bold cursor-pointer"
                >
                  Register Beneficiary
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CUSTOM IN-APP REMINDER */}
      {showReminderModal && reminderTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-scaleUp">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200 mb-3">
              <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
                <Bell className="w-5 h-5 text-teal-700" />
                <span>Send Reminder to {reminderTarget.name}</span>
              </h3>
              <button onClick={() => setShowReminderModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500 font-semibold mb-3">
              This reminder will be logged in the database and shown on the citizen status passbook.
            </p>

            <textarea
              rows="3"
              placeholder="Enter in-app alert message..."
              value={customReminderMsg}
              onChange={e => setCustomReminderMsg(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-teal-700 mb-3"
            ></textarea>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowReminderModal(false)}
                className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-bold text-slate-700 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSendReminder}
                className="px-4 py-1.5 bg-[#0b483c] hover:bg-[#07332b] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send In-App Alert</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 5. FOOTER */}
      {/* ============================================================== */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-center text-xs text-slate-500 font-semibold">
        <div className="max-w-7xl mx-auto px-4 space-y-1">
          <p className="text-slate-700 font-bold">
            Elderly Pension Disbursement Tracker System • Problem Statement 126
          </p>
          <p>
            Designed for rural senior citizens • High contrast, accessible typography, automated delay alerts
          </p>
        </div>
      </footer>

    </div>
  );
}
