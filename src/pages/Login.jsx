import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { baseURL } from '../services/baseURL';
import { Lock, Mail, LogIn, AlertCircle, Eye, EyeOff, CheckCircle, User, KeyRound } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [setupStatus, setSetupStatus] = useState(null);
  const [setupLoading, setSetupLoading] = useState(true);
  const [setupUsername, setSetupUsername] = useState('');
  const [setupEmail, setSetupEmail] = useState('');
  const [setupPassword, setSetupPassword] = useState('');
  const [setupConfirm, setSetupConfirm] = useState('');
  const [setupKey, setSetupKey] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const { login, completeSetup } = useAuth();

  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      const t = setTimeout(() => setSuccessMessage(''), 5000);
      return () => clearTimeout(t);
    }
  }, [location]);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setSetupLoading(true);
      try {
        const { data } = await axios.get(`${baseURL}/auth/setup-status`);
        if (!cancelled) setSetupStatus(data);
      } catch {
        if (!cancelled) setSetupStatus({ needsSetup: false, setupKeyRequired: false, setupReady: true });
      } finally {
        if (!cancelled) setSetupLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const showFirstTimeSetup =
    setupStatus?.needsSetup && setupStatus?.setupReady && !setupLoading;
  const showSetupBlocked =
    setupStatus?.needsSetup && !setupStatus?.setupReady && !setupLoading;

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);

    if (result.success) {
      if (result.userType === 'seller') {
        navigate('/seller-dashboard');
      } else {
        navigate('/');
      }
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  const handleSetupSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (setupPassword !== setupConfirm) {
      setError('Passwords do not match');
      return;
    }
    if (setupPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (setupUsername.trim().length < 3) {
      setError('Username must be at least 3 characters');
      return;
    }
    if (setupStatus?.setupKeyRequired && !setupKey.trim()) {
      setError('Setup key is required');
      return;
    }

    setLoading(true);
    const result = await completeSetup(
      setupUsername.trim(),
      setupEmail.trim(),
      setupPassword,
      setupStatus?.setupKeyRequired ? setupKey.trim() : undefined
    );

    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  const title = showFirstTimeSetup ? 'First-time setup' : 'Admin Login';
  const subtitle = showFirstTimeSetup
    ? 'Create the superadmin account for this deployment'
    : 'Inventory Management System';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-gradient-to-r from-slate-700 to-slate-800 p-8 text-white text-center">
          <div className="bg-white bg-opacity-20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock size={40} />
          </div>
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-slate-200 mt-2">{subtitle}</p>
        </div>

        <div className="p-8">
          {setupLoading && (
            <div className="mb-4 text-center text-sm text-gray-500">Checking setup status…</div>
          )}

          {successMessage && (
            <div className="mb-4 bg-emerald-50 border border-emerald-200 rounded-lg p-4 flex items-start gap-3">
              <CheckCircle className="text-emerald-500 flex-shrink-0 mt-0.5" size={20} />
              <p className="text-emerald-700 text-sm">{successMessage}</p>
            </div>
          )}

          {showSetupBlocked && (
            <div className="mb-4 bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="text-amber-600 flex-shrink-0 mt-0.5" size={20} />
              <p className="text-amber-900 text-sm">
                This server has no admins yet, but first-time setup is waiting on configuration. Add
                a strong <span className="font-mono">SETUP_KEY</span> to the backend environment
                (for example in Vercel), redeploy, then return here with that key.
              </p>
            </div>
          )}

          {error && (
            <div className="mb-4 bg-rose-50 border border-rose-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="text-rose-500 flex-shrink-0 mt-0.5" size={20} />
              <p className="text-rose-700 text-sm">{error}</p>
            </div>
          )}

          {showFirstTimeSetup ? (
            <form onSubmit={handleSetupSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="text-gray-400" size={20} />
                  </div>
                  <input
                    type="text"
                    required
                    minLength={3}
                    value={setupUsername}
                    onChange={(e) => setSetupUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Super admin username"
                    autoComplete="username"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="text-gray-400" size={20} />
                  </div>
                  <input
                    type="email"
                    required
                    value={setupEmail}
                    onChange={(e) => setSetupEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="you@company.com"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="text-gray-400" size={20} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    value={setupPassword}
                    onChange={(e) => setSetupPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="At least 6 characters"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="text-gray-400" size={20} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={setupConfirm}
                    onChange={(e) => setSetupConfirm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Repeat password"
                    autoComplete="new-password"
                  />
                </div>
              </div>

              {setupStatus?.setupKeyRequired && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Setup key</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <KeyRound className="text-gray-400" size={20} />
                    </div>
                    <input
                      type="password"
                      required
                      value={setupKey}
                      onChange={(e) => setSetupKey(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Value from server SETUP_KEY"
                      autoComplete="off"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    In production this is required. Locally, omit <span className="font-mono">SETUP_KEY</span> in
                    backend <span className="font-mono">.env</span> to skip this field.
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-medium py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                ) : (
                  <>
                    <LogIn size={20} />
                    Create superadmin
                  </>
                )}
              </button>
            </form>
          ) : (
            !showSetupBlocked && (
              <form onSubmit={handleLoginSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="text-gray-400" size={20} />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="admin@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="text-gray-400" size={20} />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-medium py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                  ) : (
                    <>
                      <LogIn size={20} />
                      Sign In
                    </>
                  )}
                </button>
              </form>
            )
          )}

          {!showFirstTimeSetup && !showSetupBlocked && (
            <>
              <div className="mt-4 text-center">
                <Link
                  to="/forgot-password"
                  className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  Forgot your password?
                </Link>
              </div>

              <div className="mt-4 text-center">
                <p className="text-gray-600">
                  Don&apos;t have an account?{' '}
                  <Link to="/register" className="text-emerald-600 hover:text-emerald-700 font-medium">
                    Register here
                  </Link>
                </p>
              </div>
            </>
          )}
        </div>

        <div className="bg-gray-50 px-8 py-4 text-center border-t">
          <p className="text-xs text-gray-500">Secure authentication powered by JWT</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
