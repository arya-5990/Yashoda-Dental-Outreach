import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import CallSubmissionForm from '../components/ui/CallSubmissionForm';

export default function WorkDesk() {
  const navigate = useNavigate();

  return (
    <div className="pb-32 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="px-6 py-4 flex items-center space-x-3 mb-4">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl bg-slate-100 dark:bg-medical-800 text-slate-600 dark:text-slate-300 btn-haptic hover:bg-slate-200"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="font-serif text-2xl font-bold text-slate-900 dark:text-enamel-White">
          The Work Desk
        </h2>
      </div>

      <div className="px-6 mb-6">
        <p className="text-slate-500 dark:text-slate-400 font-light text-sm">
          Log every successful consultation here. Make sure names and screenshots are clear to speed up the verification process.
        </p>
      </div>

      <div className="bg-slate-50/50 dark:bg-medical-900/50 rounded-t-3xl pt-2 pb-12 w-full min-h-[60vh] border-t border-slate-100 dark:border-medical-800">
        <CallSubmissionForm />
      </div>
    </div>
  );
}
