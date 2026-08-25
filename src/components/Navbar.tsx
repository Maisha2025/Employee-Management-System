import React from 'react';
import { TabType } from '../types';
import { 
  Users, 
  Building2, 
  CalendarCheck, 
  BarChart3, 
  Code2, 
  Database,
  LayoutDashboard,
  RotateCcw,
  LogOut,
  ShieldCheck,
  LogIn
} from 'lucide-react';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  totalEmployees: number;
  totalDepartments: number;
  todayPresent: number;
  isAdminLoggedIn: boolean;
  adminName: string | null;
  onLogout: () => void;
  onResetData: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  totalEmployees,
  totalDepartments,
  todayPresent,
  isAdminLoggedIn,
  adminName,
  onLogout,
  onResetData
}) => {
  const navItems: { id: TabType; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'departments', label: 'Departments', icon: <Building2 className="w-4 h-4" />, badge: `${totalDepartments}` },
    { id: 'employees', label: 'Employees', icon: <Users className="w-4 h-4" />, badge: `${totalEmployees}` },
    { id: 'attendance', label: 'Attendance', icon: <CalendarCheck className="w-4 h-4" />, badge: `${todayPresent}/${totalEmployees}` },
    { id: 'reports', label: 'Reports', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'mysql', label: 'MySQL Studio', icon: <Database className="w-4 h-4" />, badge: 'SQL' },
    { id: 'codehub', label: 'PHP & SQL Code Hub', icon: <Code2 className="w-4 h-4" /> },
  ];

  return (
    <header className="bg-slate-900 text-white border-b border-pink-950 sticky top-0 z-40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Title */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-600 to-rose-500 flex items-center justify-center shadow-lg shadow-pink-500/25">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-pink-100 to-rose-200 bg-clip-text text-transparent">
                  EMS Pro
                </span>
                <span className="text-[10px] font-semibold bg-pink-500/20 text-pink-300 border border-pink-500/30 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  PHP + MySQL
                </span>
              </div>
              <p className="text-xs text-rose-300/70 hidden sm:block">Employee Management System</p>
            </div>
          </div>

          {/* Desktop Nav Tabs */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-pink-600 text-white shadow-sm shadow-pink-600/40 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-rose-950/50'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[11px] px-1.5 py-0.2 rounded-full font-semibold ${
                        isActive
                          ? 'bg-pink-700 text-white'
                          : 'bg-slate-800 text-pink-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Utilities & Admin Profile */}
          <div className="flex items-center space-x-2.5">
            {isAdminLoggedIn ? (
              <>
                <div className="hidden lg:flex items-center space-x-2 bg-rose-950/80 border border-pink-900/80 px-3 py-1.5 rounded-xl text-xs">
                  <ShieldCheck className="w-4 h-4 text-pink-400" />
                  <span className="font-semibold text-pink-100">{adminName || 'Admin'}</span>
                  <span className="text-[10px] bg-pink-600 text-white px-1.5 py-0.2 rounded font-mono">
                    SUPERADMIN
                  </span>
                </div>

                <button
                  onClick={onResetData}
                  title="Reset sample data"
                  className="flex items-center space-x-1 text-xs text-rose-200/80 hover:text-white bg-pink-950/60 hover:bg-pink-900 px-2.5 py-1.5 rounded-xl border border-pink-800/60 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden xl:inline">Reset</span>
                </button>

                <button
                  onClick={onLogout}
                  title="Log Out of Admin Portal"
                  className="flex items-center space-x-1.5 text-xs text-white bg-rose-700 hover:bg-rose-600 px-3 py-1.5 rounded-xl font-semibold shadow-sm transition-all"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Log Out</span>
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <span className="text-xs text-pink-300 flex items-center gap-1 font-mono">
                  <LogIn className="w-3.5 h-3.5 text-pink-400" />
                  Logged Out
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Tab Strip */}
      <div className="md:hidden flex items-center overflow-x-auto px-4 py-2 border-t border-pink-950 gap-1 scrollbar-none">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center space-x-1.5 whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === item.id
                ? 'bg-pink-600 text-white font-semibold'
                : 'text-slate-300 bg-slate-800/50'
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </header>
  );
};
