import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, UserCircle } from 'lucide-react';

export default function Login() {
  const [method, setMethod] = useState('phone');
  const navigate = useNavigate();

  const handleConnect = (e) => {
    e.preventDefault();
    localStorage.setItem('ysp_auth', 'true');
    navigate('/progress');
  };

  return (
    <div className="px-6 flex flex-col justify-center h-[calc(100vh-140px)]">
      <div className="space-y-4 mb-10">
        <h2 className="font-serif text-3xl font-bold text-slate-900 dark:text-enamel-White leading-tight">
          Welcome to <br /> Yashoda Network.
        </h2>
        <p className="text-slate-500 dark:text-slate-400 font-light leading-relaxed">
          The finest platform for modern dental health membership professionals.
        </p>
      </div>

      <div className="glass-panel-heavy p-8 space-y-8">
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

        <form onSubmit={handleConnect} className="space-y-6">
          <div className="relative">
            {method === 'phone' ? (
              <input 
                type="tel" 
                placeholder="+91 Phone Number" 
                required
                className="w-full bg-slate-50 dark:bg-medical-900/50 border border-slate-200 dark:border-medical-700 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-medical-Teal/50 focus:border-medical-Teal/50 text-slate-800 dark:text-slate-200 placeholder-slate-400 transition-all text-lg font-medium tracking-wide"
              />
            ) : (
              <input 
                type="email" 
                placeholder="Clinic Email Address" 
                required
                className="w-full bg-slate-50 dark:bg-medical-900/50 border border-slate-200 dark:border-medical-700 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-medical-Teal/50 focus:border-medical-Teal/50 text-slate-800 dark:text-slate-200 placeholder-slate-400 transition-all text-lg font-medium"
              />
            )}
            <UserCircle className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 h-6 w-6 stroke-[1.5]" />
          </div>

          <button 
            type="submit" 
            className="w-full bg-medical-Teal hover:bg-teal-700 text-white rounded-2xl py-4 font-semibold text-lg flex items-center justify-center space-x-2 btn-haptic shadow-lg shadow-teal-500/30"
          >
            <span>Access Portal</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </div>

      <div className="mt-12 text-center">
        <p className="text-sm text-slate-400 dark:text-slate-500">
          New to the programme? <a href="#" className="text-medical-Teal dark:text-medical-TealLight hover:underline font-medium">Request Invitation</a>
        </p>
      </div>
    </div>
  );
}
