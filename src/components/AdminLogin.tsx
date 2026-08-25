import React, { useState } from 'react';
import { ShieldCheck, Lock, User, Key, ArrowRight, Database, AlertCircle, Sparkles, Eye, EyeOff } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: (username: string) => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      // Validate credentials (accepts 'admin' / 'admin123' or 'admin@company.com' / 'admin123')
      if (
        (username.trim().toLowerCase() === 'admin' || username.trim().toLowerCase() === 'admin@company.com') &&
        password === 'admin123'
      ) {
        onLoginSuccess('System Administrator (admin)');
      } else {
        setError('Invalid MySQL Admin credentials. Please check your username or password.');
      }
      setIsLoading(false);
    }, 400);
  };

  const handleQuickFill = () => {
    setUsername('admin');
    setPassword('admin123');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-rose-600/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-md w-full space-y-6 relative z-10 my-auto">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-pink-600 to-rose-500 text-white shadow-xl shadow-pink-600/25 border border-pink-400/30">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              EMS Pro Admin Portal
            </h1>
            <p className="text-xs text-pink-200/80 mt-1 max-w-sm mx-auto">
              Employee Management System &bull; MySQL Database Authentication Engine
            </p>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-slate-900 rounded-3xl border border-pink-900/60 shadow-2xl overflow-hidden backdrop-blur-md">
          {/* Top Status Strip */}
          <div className="bg-slate-950/80 p-4 border-b border-pink-950 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <Database className="w-4 h-4 text-pink-400" />
              <span className="font-mono text-pink-300 font-medium">ems_db &bull; admin_users</span>
            </div>
            <span className="bg-pink-500/20 text-pink-300 border border-pink-500/30 text-[10px] px-2.5 py-0.5 rounded-full font-mono font-semibold">
              PDO Prepared Statements
            </span>
          </div>

          <form onSubmit={handleSubmit} className="p-7 space-y-5">
            {error && (
              <div className="p-3.5 bg-rose-950/60 border border-rose-800 rounded-2xl text-xs text-rose-200 flex items-start space-x-2.5 animate-fadeIn">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span className="font-medium">{error}</span>
              </div>
            )}

            {/* Username Input */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Admin Username / Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-pink-400/70">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin or admin@company.com"
                  className="w-full pl-10 pr-4 py-3 bg-slate-950 text-white rounded-xl border border-slate-800 text-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all font-medium placeholder-slate-500"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Master Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-pink-400/70">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full pl-10 pr-10 py-3 bg-slate-950 text-white rounded-xl border border-slate-800 text-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all font-medium placeholder-slate-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Demo Credentials Helper Box */}
            <div className="p-3.5 bg-slate-950/80 border border-pink-950/80 rounded-2xl flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-pink-200 block">Default Admin Account:</span>
                <span className="font-mono text-slate-400 text-[11px]">User: <strong className="text-pink-400">admin</strong> &bull; Pass: <strong className="text-pink-400">admin123</strong></span>
              </div>
              <button
                type="button"
                onClick={handleQuickFill}
                className="px-3 py-1.5 bg-pink-600/20 hover:bg-pink-600/30 text-pink-300 border border-pink-500/40 rounded-xl font-semibold text-[11px] transition-all flex items-center gap-1 shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                <span>Auto Fill</span>
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center space-x-2 py-3.5 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-pink-600/30 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 cursor-pointer"
            >
              {isLoading ? (
                <span>Authenticating with MySQL...</span>
              ) : (
                <>
                  <Key className="w-4 h-4" />
                  <span>Log In to Admin Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer Note */}
          <div className="px-6 py-3.5 bg-slate-950 border-t border-pink-950 text-[11px] text-slate-400 text-center font-mono">
            MySQL Security: bcrypt password_hash() & PDO prepared parameters
          </div>
        </div>
      </div>

      {/* Page Footer */}
      <div className="mt-8 text-center text-xs text-slate-500 font-mono">
        Employee Management System (EMS Pro) &bull; MySQL & PHP Native Stack
      </div>
    </div>
  );
};
