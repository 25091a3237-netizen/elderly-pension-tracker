import { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Database, 
  Server, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  RefreshCw,
  Users,
  Coins,
  FileCheck2,
  BellRing
} from 'lucide-react';

export default function App() {
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fontSizeClass, setFontSizeClass] = useState('text-lg');

  const fetchHealth = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/health');
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      const data = await res.json();
      setHealthData(data);
    } catch (err) {
      console.error('Failed to fetch health status:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  return (
    <div className={`min-h-screen bg-slate-50 text-slate-900 ${fontSizeClass}`}>
      {/* Top Accessibility Bar */}
      <div className="bg-slate-900 text-slate-100 py-2 px-4 border-b border-slate-700">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center text-sm">
          <div className="flex items-center gap-2">
            <span className="font-semibold tracking-wide">GOVERNMENT OF TELANGANA / ANDHRA PRADESH</span>
            <span className="hidden sm:inline text-slate-400">|</span>
            <span className="hidden sm:inline text-slate-300">Social Welfare & Pensions Department</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase font-bold text-slate-400">Text Size:</span>
            <button 
              onClick={() => setFontSizeClass('text-base')} 
              className={`px-2 py-0.5 rounded text-xs font-bold ${fontSizeClass === 'text-base' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'}`}
              title="Normal Font Size"
            >
              A
            </button>
            <button 
              onClick={() => setFontSizeClass('text-lg')} 
              className={`px-2.5 py-0.5 rounded text-sm font-bold ${fontSizeClass === 'text-lg' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'}`}
              title="Large Font Size (Recommended for Elderly)"
            >
              A+
            </button>
            <button 
              onClick={() => setFontSizeClass('text-xl')} 
              className={`px-3 py-0.5 rounded text-base font-bold ${fontSizeClass === 'text-xl' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'}`}
              title="Extra Large Font Size"
            >
              A++
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b-4 border-blue-700 shadow-sm sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-700 text-white flex items-center justify-center font-black text-2xl shadow-md">
              ₹
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Elderly Pension Disbursement Tracker
              </h1>
              <p className="text-sm sm:text-base font-semibold text-blue-800">
                Problem Statement 126 • Transparent Status, Delay Detection & Automated Reminders
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300">
              Week 1: Foundations
            </span>
          </div>
        </div>
      </header>

      {/* Body Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 sm:px-6 space-y-8">
        
        {/* System Connectivity & Health Status Card */}
        <section className="bg-white rounded-2xl border-2 border-slate-200 shadow-sm p-6 sm:p-8">
          <div className="flex flex-wrap justify-between items-center gap-4 mb-6 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <Server className="w-6 h-6 text-blue-700" />
                Backend & MySQL Architecture Health
              </h2>
              <p className="text-slate-600 text-base mt-1">
                Real-time connection verification between React frontend, Express API, and MySQL.
              </p>
            </div>
            <button
              onClick={fetchHealth}
              disabled={loading}
              className="btn-elderly btn-elderly-secondary text-base py-2.5 px-4 cursor-pointer"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              Check Status
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Express Server Tile */}
            <div className="p-5 rounded-xl border-2 bg-slate-50 border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-slate-700 text-base">Node.js Express API</span>
                <span className={`w-3.5 h-3.5 rounded-full ${healthData ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
              </div>
              <div className="text-xl font-extrabold text-slate-900">
                {loading ? 'Checking...' : healthData ? 'ONLINE (Port 5000)' : 'OFFLINE'}
              </div>
              <p className="text-sm text-slate-500 mt-1">
                REST API endpoint: <code className="bg-slate-200 px-1 py-0.5 rounded text-xs">/api/health</code>
              </p>
            </div>

            {/* MySQL Database Tile */}
            <div className="p-5 rounded-xl border-2 bg-slate-50 border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-slate-700 text-base">MySQL Database</span>
                <span className={`w-3.5 h-3.5 rounded-full ${healthData?.database?.connected ? 'bg-emerald-500' : 'bg-amber-500'}`} />
              </div>
              <div className="text-xl font-extrabold text-slate-900">
                {loading ? 'Verifying...' : healthData?.database?.connected ? 'CONNECTED' : 'CONFIGURED'}
              </div>
              <p className="text-sm text-slate-500 mt-1">
                {healthData?.database?.message || 'Database connection pool active'}
              </p>
            </div>

            {/* ES6 Domain Engine Tile */}
            <div className="p-5 rounded-xl border-2 bg-slate-50 border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-slate-700 text-base">ES6 Model Layer</span>
                <ShieldCheck className="w-5 h-5 text-blue-700" />
              </div>
              <div className="text-xl font-extrabold text-slate-900">
                5 Domain Classes
              </div>
              <p className="text-sm text-slate-500 mt-1">
                Mirroring class diagram specifications
              </p>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-4 rounded-xl bg-amber-50 border-2 border-amber-300 text-amber-900 text-base flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0" />
              <div>
                <p className="font-bold">Backend connection pending:</p>
                <p className="text-sm">{error}. Start server via <code className="font-mono bg-amber-100 px-1.5 py-0.5 rounded">npm start</code> in /server.</p>
              </div>
            </div>
          )}
        </section>

        {/* Elderly Accessibility Design System Preview */}
        <section className="bg-white rounded-2xl border-2 border-slate-200 shadow-sm p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Design Rules & Color-Coded Status Badges
          </h2>
          <p className="text-slate-600 text-base mb-6">
            Specially tailored for rural elderly citizens: large fonts, clear visual symbols, high contrast.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Paid Badge */}
            <div className="p-5 rounded-xl border-2 border-emerald-200 bg-emerald-50/50">
              <div className="flex items-center gap-2 mb-2">
                <span className="badge-status badge-paid">
                  <CheckCircle2 className="w-5 h-5" />
                  PAID (చెల్లించబడింది)
                </span>
              </div>
              <p className="text-sm text-emerald-900 font-medium mt-2">
                Indicates pension payment has been successfully disbursed to the beneficiary bank/post account.
              </p>
            </div>

            {/* Pending Badge */}
            <div className="p-5 rounded-xl border-2 border-amber-200 bg-amber-50/50">
              <div className="flex items-center gap-2 mb-2">
                <span className="badge-status badge-pending">
                  <Clock className="w-5 h-5" />
                  PENDING (పెండింగ్‌లో ఉంది)
                </span>
              </div>
              <p className="text-sm text-amber-900 font-medium mt-2">
                Disbursement is currently in normal processing within the 7-day scheduled window.
              </p>
            </div>

            {/* Delayed Badge */}
            <div className="p-5 rounded-xl border-2 border-rose-200 bg-rose-50/50">
              <div className="flex items-center gap-2 mb-2">
                <span className="badge-status badge-delayed">
                  <AlertTriangle className="w-5 h-5" />
                  DELAYED (ఆలస్యం అయింది)
                </span>
              </div>
              <p className="text-sm text-rose-900 font-medium mt-2">
                <strong>Business Rule:</strong> Triggered automatically when today is more than 7 days past due date and unpaid.
              </p>
            </div>
          </div>
        </section>

        {/* ES6 Domain Classes & Workflow Reference Card */}
        <section className="bg-white rounded-2xl border-2 border-slate-200 shadow-sm p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Week 1 Architecture: ES6 Class Diagram Mapping
          </h2>
          <p className="text-slate-600 text-base mb-6">
            Each ES6 class in <code className="bg-slate-100 px-2 py-0.5 rounded font-mono text-sm">server/models/</code> directly corresponds to your project class diagram for your viva evaluation:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
              <div className="flex items-center gap-2 font-bold text-slate-800 text-lg mb-1">
                <Users className="w-5 h-5 text-blue-600" />
                Beneficiary
              </div>
              <div className="text-xs text-slate-500 font-mono space-y-1 mt-2">
                <div>+ beneficiaryId, name, age</div>
                <div>+ address, phoneNo</div>
                <div className="text-blue-700 font-semibold pt-1">Methods:</div>
                <div>register(), updateDetails(), viewStatus()</div>
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
              <div className="flex items-center gap-2 font-bold text-slate-800 text-lg mb-1">
                <Coins className="w-5 h-5 text-amber-600" />
                Pension
              </div>
              <div className="text-xs text-slate-500 font-mono space-y-1 mt-2">
                <div>+ pensionId, beneficiaryId</div>
                <div>+ amount, frequency, startDate</div>
                <div className="text-blue-700 font-semibold pt-1">Methods:</div>
                <div>createPension(), updatePension()</div>
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
              <div className="flex items-center gap-2 font-bold text-slate-800 text-lg mb-1">
                <FileCheck2 className="w-5 h-5 text-emerald-600" />
                Verification
              </div>
              <div className="text-xs text-slate-500 font-mono space-y-1 mt-2">
                <div>+ verificationId, beneficiaryId</div>
                <div>+ verifiedBy, verifyDate, status</div>
                <div className="text-blue-700 font-semibold pt-1">Methods:</div>
                <div>verify(), updateVerification()</div>
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
              <div className="flex items-center gap-2 font-bold text-slate-800 text-lg mb-1">
                <Clock className="w-5 h-5 text-purple-600" />
                Payment
              </div>
              <div className="text-xs text-slate-500 font-mono space-y-1 mt-2">
                <div>+ paymentId, pensionId</div>
                <div>+ amount, payDate, status</div>
                <div className="text-blue-700 font-semibold pt-1">Methods:</div>
                <div>recordPayment(), updateStatus()</div>
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
              <div className="flex items-center gap-2 font-bold text-slate-800 text-lg mb-1">
                <BellRing className="w-5 h-5 text-indigo-600" />
                Reminder
              </div>
              <div className="text-xs text-slate-500 font-mono space-y-1 mt-2">
                <div>+ reminderId, beneficiaryId</div>
                <div>+ message, reminderDate, status</div>
                <div className="text-blue-700 font-semibold pt-1">Methods:</div>
                <div>createReminder(), markAsSent()</div>
              </div>
            </div>

            <div className="border-2 border-dashed border-blue-300 rounded-xl p-4 bg-blue-50/50 flex flex-col justify-center">
              <div className="font-bold text-blue-900 text-base mb-1">
                Relationships:
              </div>
              <div className="text-xs text-blue-800 space-y-1 font-medium">
                <div>• Beneficiary 1 — * Pension</div>
                <div>• Pension 1 — * Payment</div>
                <div>• Pension 1 — 1 Verification</div>
                <div>• Beneficiary 1 — * Reminder</div>
              </div>
            </div>
          </div>
        </section>

        {/* Big Accessible Buttons Preview */}
        <section className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-wrap justify-between items-center gap-4">
          <div>
            <h3 className="text-xl font-bold">
              Ready for Week 2 Beneficiary Implementation
            </h3>
            <p className="text-slate-300 text-base mt-1">
              Architecture baseline completed. Ready for Beneficiary registration, profiles, and citizen lookup.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-4 py-2 bg-blue-600 text-white font-bold rounded-xl text-base shadow">
              Week 1 Verified
            </span>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="mt-12 bg-white border-t border-slate-200 py-6 text-center text-sm text-slate-600">
        <div className="max-w-6xl mx-auto px-4">
          <p className="font-semibold text-slate-800">
            Elderly Pension Disbursement Tracker • Problem Statement 126
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Built with React, Tailwind CSS, Node.js Express, and MySQL (ES6 Class Architecture).
          </p>
        </div>
      </footer>
    </div>
  );
}
