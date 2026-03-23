import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { ArrowRight, UserCircle, KeyRound, AlertCircle, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [method, setMethod] = useState('phone');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, register, user } = useAuth();
  const navigate = useNavigate();

  // If already logged in, redirect
  if (user) {
    return <Navigate to="/progress" />;
  }

  const handleConnect = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    let result;
    if (isRegister) {
      result = await register(method, name, contact, password);
    } else {
      result = await login(contact, password);
    }
    
    if (result.success) {
      navigate('/progress');
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="px-6 flex flex-col justify-center min-h-[calc(100vh-140px)] animate-in fade-in duration-500 py-10">
      <div className="space-y-4 mb-8">
        <h2 className="font-serif text-3xl font-bold text-slate-900 dark:text-enamel-White leading-tight transition-all">
          {isRegister ? 'Join the \nYashoda Network.' : 'Welcome to \nYashoda Network.'}
        </h2>
        <p className="text-slate-500 dark:text-slate-400 font-light leading-relaxed text-sm">
          {isRegister 
            ? 'Create your intern account to start tracking your clinical success and stipends.'
            : 'The finest platform for modern dental health membership professionals.'}
        </p>
      </div>

      <div className="glass-panel-heavy p-6 sm:p-8 space-y-6">
        {/* Method Toggle */}
        <div className="flex space-x-2 p-1 bg-slate-100 dark:bg-medical-900 rounded-2xl">
          <button
            type="button"
            onClick={() => setMethod('phone')}
            className={`flex-1 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${method === 'phone' ? 'bg-white dark:bg-medical-800 shadow-sm text-medical-Teal dark:text-medical-TealLight' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'}`}
          >
            Mobile No.
          </button>
          <button
            type="button"
            onClick={() => setMethod('email')}
            className={`flex-1 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${method === 'email' ? 'bg-white dark:bg-medical-800 shadow-sm text-medical-Teal dark:text-medical-TealLight' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'}`}
          >
            Email ID
          </button>
        </div>

        {error && (
            <div className="bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 px-4 py-3 rounded-xl text-sm flex items-center gap-2 font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
            </div>
        )}

        <form onSubmit={handleConnect} className="space-y-4">
          
          {isRegister && (
            <div className="relative animate-in slide-in-from-top-4 duration-300 fade-in">
              <input 
                type="text" 
                placeholder="Full Name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={isRegister}
                className="w-full bg-slate-50 dark:bg-medical-900/50 border border-slate-200 dark:border-medical-700 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-medical-Teal/50 text-slate-800 dark:text-slate-200 placeholder-slate-400 font-medium text-[15px]"
              />
              <UserIcon className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5 stroke-[1.5]" />
            </div>
          )}

          <div className="relative">
            {method === 'phone' ? (
              <input 
                type="tel" 
                placeholder="+91 Phone Number" 
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
                className="w-full bg-slate-50 dark:bg-medical-900/50 border border-slate-200 dark:border-medical-700 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-medical-Teal/50 text-slate-800 dark:text-slate-200 placeholder-slate-400 font-medium text-[15px] tracking-wide"
              />
            ) : (
              <input 
                type="email" 
                placeholder="Clinic Email Address" 
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
                className="w-full bg-slate-50 dark:bg-medical-900/50 border border-slate-200 dark:border-medical-700 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-medical-Teal/50 text-slate-800 dark:text-slate-200 placeholder-slate-400 font-medium text-[15px]"
              />
            )}
            <UserCircle className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5 stroke-[1.5]" />
          </div>

          <div className="relative">
             <input 
                type="password" 
                placeholder="Secure Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-slate-50 dark:bg-medical-900/50 border border-slate-200 dark:border-medical-700 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-medical-Teal/50 text-slate-800 dark:text-slate-200 placeholder-slate-400 font-medium text-[15px] tracking-wide"
              />
              <KeyRound className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5 stroke-[1.5]" />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-medical-Teal hover:bg-teal-700 text-white rounded-2xl py-4 font-semibold text-[15px] flex items-center justify-center space-x-2 btn-haptic shadow-lg shadow-teal-500/30 mt-6 disabled:opacity-50"
          >
            <span>{loading ? 'Authenticating...' : (isRegister ? 'Create Account' : 'Access Portal')}</span>
            {!loading && <ArrowRight className="w-5 h-5" />}
          </button>
        </form>
      </div>

      <div className="mt-8 text-center animate-in fade-in duration-700">
        <p className="text-[13px] text-slate-400 dark:text-slate-500">
          {isRegister ? "Already an intern?" : "New to the programme?"} {' '}
          <button 
            onClick={() => {
              setIsRegister(!isRegister);
              setError('');
            }}
            className="text-medical-Teal dark:text-medical-TealLight hover:underline font-medium outline-none"
          >
             {isRegister ? 'Log in here' : 'Register now'}
          </button>
        </p>
      </div>
    </div>
  );
}
