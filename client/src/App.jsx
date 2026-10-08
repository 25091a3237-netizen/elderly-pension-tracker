import React, { useState } from 'react';
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
  Settings,
  HelpCircle,
  Eye,
  RefreshCw,
  Send
} from 'lucide-react';

export default function App() {
  // Navigation / Drawer state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('dashboard');

  // Text size state: 'A' (normal), 'A+' (large), 'A++' (extra-large, default active in screenshot)
  const [textSize, setTextSize] = useState('A++');

  // Interactive Tab: 'overview' or 'beneficiaries' or 'disbursements' or 'delays'
  const [activeSection, setActiveSection] = useState('overview');

  // Sample data to make metrics and tables functional & live
  const [beneficiaries, setBeneficiaries] = useState([
    { id: 101, name: 'Narasimha Rao', age: 68, phone: '9876543210', district: 'Warangal Rural', scheme: 'Old Age Welfare Pension', amount: 2016, status: 'Delayed', due: '2024-10-01', paidDate: null },
    { id: 102, name: 'Lakshmi Devi', age: 72, phone: '9848012345', district: 'Nalgonda', scheme: 'Asara Pension Scheme', amount: 2016, status: 'Delayed', due: '2024-10-01', paidDate: null },
    { id: 103, name: 'Venkat Reddy', age: 65, phone: '9912345678', district: 'Medak', scheme: 'Rural Senior Pension', amount: 3016, status: 'Pending Verification', due: '2024-10-05', paidDate: null },
    { id: 104, name: 'Anasuya Amma', age: 78, phone: '9123456780', district: 'Yadadri Bhuvanagiri', scheme: 'Old Age Welfare Pension', amount: 2016, status: 'Paid', due: '2024-10-01', paidDate: '2024-10-03' },
    { id: 105, name: 'Balaraju M.', age: 71, phone: '9849112233', district: 'Karimnagar', scheme: 'Asara Pension Scheme', amount: 2016, status: 'Paid', due: '2024-10-01', paidDate: '2024-10-04' }
  ]);

  // Dynamic font sizing
  const getTextSizeClass = () => {
    if (textSize === 'A') return 'text-sm';
    if (textSize === 'A+') return 'text-base';
    return 'text-lg'; // 'A++' large high readability
  };

  const getHeadingSizeClass = () => {
    if (textSize === 'A') return 'text-xl sm:text-2xl';
    if (textSize === 'A+') return 'text-2xl sm:text-3xl';
    return 'text-3xl sm:text-4xl';
  };

  return (
    <div className={`min-h-screen bg-[#f4f7fa] text-slate-900 font-sans ${getTextSizeClass()}`}>
      
      {/* ============================================================== */}
      {/* 1. TOP NAVBAR (Matches Screenshot Exact Layout) */}
      {/* ============================================================== */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3.5 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Left: Hamburger & Header Title */}
          <div className="flex items-center gap-3.5">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 -ml-2 rounded-lg text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
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

          {/* Right Controls: Font Resizer, Officer Profile, Logout */}
          <div className="flex items-center gap-3 sm:gap-6">
            
            {/* Text Size: A / A+ / A++ Selector (Exact Pill from Screenshot) */}
            <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
              <span className="text-xs sm:text-sm font-bold text-slate-600 flex items-center gap-1">
                <span className="font-serif">T</span> Text Size:
              </span>
              <div className="inline-flex items-center gap-1">
                <button
                  onClick={() => setTextSize('A')}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                    textSize === 'A' 
                      ? 'bg-[#0f4a3e] text-white shadow-xs' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                  }`}
                >
                  A
                </button>
                <button
                  onClick={() => setTextSize('A+')}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                    textSize === 'A+' 
                      ? 'bg-[#0f4a3e] text-white shadow-xs' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                  }`}
                >
                  A+
                </button>
                <button
                  onClick={() => setTextSize('A++')}
                  className={`px-3 py-1 text-xs sm:text-sm font-extrabold rounded-lg transition-all ${
                    textSize === 'A++' 
                      ? 'bg-[#0f4a3e] text-white shadow-xs' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                  }`}
                >
                  A++
                </button>
              </div>
            </div>

            {/* Officer Profile Info */}
            <div className="hidden md:flex flex-col items-end text-right">
              <span className="text-sm font-bold text-slate-800 leading-tight">
                District Welfare Officer
              </span>
              <span className="text-xs font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 mt-0.5">
                Administrator
              </span>
            </div>

            {/* Officer Avatar Badge "D" */}
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-teal-100 border-2 border-teal-300 text-teal-900 font-extrabold text-base flex items-center justify-center shadow-xs">
              D
            </div>

            {/* Logout Button */}
            <button 
              onClick={() => alert('Logged in as Administrator (Live Demo Mode)')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-rose-300 text-rose-700 hover:bg-rose-50 text-xs sm:text-sm font-bold transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>

          </div>

        </div>
      </header>

      {/* ============================================================== */}
      {/* SIDEBAR DRAWER (Slides out on Hamburger click) */}
      {/* ============================================================== */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div 
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
          />

          {/* Drawer Menu */}
          <div className="relative w-72 sm:w-80 bg-white h-full shadow-2xl flex flex-col z-10 border-r border-slate-200 animate-slideRight">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h2 className="font-black text-lg text-slate-900">Pension Portal Menu</h2>
                <p className="text-xs text-slate-500 font-semibold">Problem Statement 126</p>
              </div>
              <button 
                onClick={() => setSidebarOpen(false)}
                className="p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-1.5 flex-1 overflow-y-auto font-bold text-sm">
              <button
                onClick={() => { setActiveSection('overview'); setSidebarOpen(false); }}
                className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-colors ${
                  activeSection === 'overview' ? 'bg-[#0f4a3e] text-white' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <TrendingUp className="w-5 h-5" />
                <span>Dashboard &amp; Overview</span>
              </button>

              <button
                onClick={() => { setActiveSection('beneficiaries'); setSidebarOpen(false); }}
                className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-colors ${
                  activeSection === 'beneficiaries' ? 'bg-[#0f4a3e] text-white' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Users className="w-5 h-5" />
                <span>Beneficiary Directory</span>
              </button>

              <button
                onClick={() => { setActiveSection('disbursements'); setSidebarOpen(false); }}
                className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-colors ${
                  activeSection === 'disbursements' ? 'bg-[#0f4a3e] text-white' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <CreditCard className="w-5 h-5" />
                <span>Disbursements &amp; Payments</span>
              </button>

              <button
                onClick={() => { setActiveSection('delays'); setSidebarOpen(false); }}
                className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-colors ${
                  activeSection === 'delays' ? 'bg-[#0f4a3e] text-white' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <AlertTriangle className="w-5 h-5 text-rose-500" />
                <span>Delay Detection Alerts</span>
                <span className="ml-auto bg-rose-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">2</span>
              </button>
            </div>

            <div className="p-4 border-t border-slate-200 text-xs text-slate-500">
              <p className="font-bold text-slate-700">Elderly Pension Tracker</p>
              <p>Government Rural Welfare Initiative</p>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. MAIN DASHBOARD CONTENT */}
      {/* ============================================================== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">

        {/* ------------------------------------------------------------ */}
        {/* HERO GREEN BANNER (Matches Screenshot 100%) */}
        {/* ------------------------------------------------------------ */}
        <div className="bg-[#0b483c] text-white rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
          
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            
            <div className="space-y-3 max-w-3xl">
              {/* Green Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#145d4f] text-[#55e6c7] border border-[#207c6a]">
                <span className="w-2 h-2 rounded-full bg-[#55e6c7] animate-pulse"></span>
                <span>STEP 1: Project Setup &amp; Architecture Active</span>
              </div>

              {/* Banner Heading */}
              <h2 className={`${getHeadingSizeClass()} font-extrabold text-white tracking-tight leading-tight`}>
                Welcome to Elderly Pension Disbursement Tracker
              </h2>

              {/* Banner Description */}
              <p className="text-teal-100 text-sm sm:text-base font-normal leading-relaxed max-w-2xl">
                Track • Transparency • Timely Support. A dedicated system ensuring rural senior citizens receive their monthly welfare pension disbursements on time.
              </p>
            </div>

            {/* Right System Mode Card */}
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
        {/* 4 METRICS CARDS (Matches Screenshot 2x2 Layout) */}
        {/* ------------------------------------------------------------ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          {/* Card 1: Total Beneficiaries */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs hover:shadow-sm transition-all space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-semibold text-slate-600">
                Total Beneficiaries
              </span>
              <span className="p-2 rounded-lg bg-teal-50 text-teal-700">
                <Users className="w-5 h-5" />
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {beneficiaries.length}
            </div>
            <p className="text-xs font-semibold text-slate-400">
              Registered senior pensioners
            </p>
          </div>

          {/* Card 2: Disbursed This Month */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs hover:shadow-sm transition-all space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-semibold text-slate-600">
                Disbursed This Month
              </span>
              <span className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
                <CreditCard className="w-5 h-5" />
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              ₹4,032
            </div>
            <p className="text-xs font-semibold text-slate-400">
              Direct Bank Transfers
            </p>
          </div>

          {/* Card 3: Pending Verifications */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs hover:shadow-sm transition-all space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-semibold text-slate-600">
                Pending Verifications
              </span>
              <span className="p-2 rounded-lg bg-amber-50 text-amber-700">
                <ShieldCheck className="w-5 h-5" />
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              1
            </div>
            <p className="text-xs font-semibold text-slate-400">
              Awaiting officer approval
            </p>
          </div>

          {/* Card 4: Delayed Alerts */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs hover:shadow-sm transition-all space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-semibold text-slate-600">
                Delayed Alerts
              </span>
              <span className="p-2 rounded-lg bg-rose-50 text-rose-700">
                <Bell className="w-5 h-5" />
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-rose-600 tracking-tight">
              2
            </div>
            <p className="text-xs font-semibold text-slate-400">
              Exceeded disbursement window
            </p>
          </div>

        </div>

        {/* ------------------------------------------------------------ */}
        {/* PROJECT SETUP STATUS CARD (Matches Screenshot Exact Box) */}
        {/* ------------------------------------------------------------ */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6">
          
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Project Setup Status (Step 1 Complete)
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm font-medium mt-1">
              Client and Express server setup is complete with responsive sidebar navigation, routing, authentication context, and accessible font controls.
            </p>
          </div>

          {/* 3 Status Sub-Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {/* Sub-Card 1: Frontend */}
            <div className="p-4 rounded-xl border border-slate-200 bg-[#f9fbfd] space-y-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                FRONTEND
              </span>
              <div className="text-sm sm:text-base font-extrabold text-slate-900">
                React + Vite + Tailwind CSS
              </div>
            </div>

            {/* Sub-Card 2: Backend API */}
            <div className="p-4 rounded-xl border border-slate-200 bg-[#f9fbfd] space-y-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                BACKEND API
              </span>
              <div className="text-sm sm:text-base font-extrabold text-slate-900">
                Node.js + Express (Port 5000)
              </div>
            </div>

            {/* Sub-Card 3: Database */}
            <div className="p-4 rounded-xl border border-teal-200 bg-[#f0faf7] space-y-1">
              <span className="text-[11px] font-bold text-teal-700 uppercase tracking-wider block">
                DATABASE
              </span>
              <div className="text-sm sm:text-base font-extrabold text-slate-900">
                MySQL (Configured for Step 4)
              </div>
            </div>

          </div>

          {/* Footer Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
            <span className="text-xs sm:text-sm font-semibold text-slate-500">
              Ready for Step 2: Full Dashboard with Charts &amp; Metrics
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#e6f7f2] text-[#0f4a3e] border border-[#a8e6d5]">
              <span className="w-2 h-2 rounded-full bg-[#0f4a3e]"></span>
              Ready for testing
            </span>
          </div>

        </div>

        {/* ------------------------------------------------------------ */}
        {/* INTERACTIVE DATA DIRECTORY & DELAY ENGINE PREVIEW */}
        {/* ------------------------------------------------------------ */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6">
          
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                <Users className="w-6 h-6 text-[#0f4a3e]" />
                <span>Live Pensioners &amp; Disbursement Status</span>
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">
                Real-time tracking of elderly beneficiaries, bank transfers, and 7-day delay detection alerts.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveSection('overview')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeSection === 'overview' ? 'bg-[#0f4a3e] text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                All Records
              </button>
              <button
                onClick={() => setActiveSection('delays')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeSection === 'delays' ? 'bg-rose-700 text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                Delayed Only (2)
              </button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 text-slate-700 font-extrabold border-b border-slate-200">
                  <th className="py-3 px-4">Beneficiary</th>
                  <th className="py-3 px-4">Phone &amp; District</th>
                  <th className="py-3 px-4">Scheme</th>
                  <th className="py-3 px-4">Monthly Amount</th>
                  <th className="py-3 px-4">Disbursement Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold">
                {beneficiaries
                  .filter(b => activeSection === 'delays' ? b.status === 'Delayed' : true)
                  .map(b => (
                    <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900">{b.name}</div>
                        <span className="text-xs text-slate-400 font-mono">ID: #{b.id}</span>
                      </td>

                      <td className="py-3 px-4 text-slate-600">
                        <div>{b.phone}</div>
                        <div className="text-xs text-slate-400">{b.district}</div>
                      </td>

                      <td className="py-3 px-4 text-slate-700">
                        {b.scheme}
                      </td>

                      <td className="py-3 px-4 font-black text-slate-900">
                        ₹{b.amount.toLocaleString('en-IN')}
                      </td>

                      <td className="py-3 px-4">
                        {b.status === 'Paid' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Paid
                          </span>
                        )}
                        {b.status === 'Delayed' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            Delayed (&gt;7 Days)
                          </span>
                        )}
                        {b.status === 'Pending Verification' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                            <Clock className="w-3.5 h-3.5" />
                            Pending Verification
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-4 text-right">
                        {b.status === 'Delayed' && (
                          <button
                            onClick={() => {
                              setBeneficiaries(prev => prev.map(item => item.id === b.id ? { ...item, status: 'Paid', paidDate: new Date().toISOString().split('T')[0] } : item));
                            }}
                            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold cursor-pointer transition-colors shadow-2xs"
                          >
                            Mark Paid
                          </button>
                        )}
                        {b.status === 'Pending Verification' && (
                          <button
                            onClick={() => {
                              setBeneficiaries(prev => prev.map(item => item.id === b.id ? { ...item, status: 'Paid', paidDate: new Date().toISOString().split('T')[0] } : item));
                            }}
                            className="px-3 py-1 bg-[#0f4a3e] hover:bg-[#0b3a30] text-white rounded-lg text-xs font-bold cursor-pointer transition-colors shadow-2xs"
                          >
                            Verify &amp; Disburse
                          </button>
                        )}
                        {b.status === 'Paid' && (
                          <span className="text-xs text-slate-400 font-medium">Completed</span>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

        </div>

      </main>

      {/* ============================================================== */}
      {/* 3. FOOTER */}
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
