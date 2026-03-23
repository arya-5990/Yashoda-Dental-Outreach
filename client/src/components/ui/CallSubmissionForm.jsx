import React, { useState } from 'react';
import { Camera, Mic, UploadCloud, CheckCircle2, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CallSubmissionForm() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [screenshot, setScreenshot] = useState(null);
  const [audio, setAudio] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Cloudinary Direct Upload Simulation
  // Real implementation would use: fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, { method: 'POST', body: formData })
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!phone || !screenshot || !audio) return;
    
    setIsSubmitting(true);
    
    // Simulate upload delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      
      setTimeout(() => navigate('/progress'), 2000);
    }, 1500);
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center min-h-[50vh] animate-in zoom-in duration-500">
        <div className="w-20 h-20 bg-medical-TealLight/20 text-medical-TealLight rounded-full flex items-center justify-center mb-6 shadow-xl shadow-teal-500/20">
          <CheckCircle2 className="w-10 h-10 stroke-[2]" />
        </div>
        <h3 className="text-2xl font-serif font-bold text-slate-800 dark:text-slate-100">Success Logged</h3>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm font-light">Great job! Your submission is under review.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <form onSubmit={handleUpload} className="space-y-6 max-w-sm mx-auto">
        <div className="space-y-4">
          <label className="block text-sm font-semibold tracking-wide text-medical-800 dark:text-medical-TealLight uppercase">
            Customer Details
          </label>
          <input 
            type="tel" 
            placeholder="+91 Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full bg-white dark:bg-medical-900 border border-slate-200 dark:border-medical-700 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-medical-Teal/50 text-slate-800 dark:text-slate-200 placeholder-slate-400 font-medium text-lg btn-haptic transition-all"
          />
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-medical-800">
          <label className="block text-sm font-semibold tracking-wide text-medical-800 dark:text-medical-TealLight uppercase">
            Evidences
          </label>
          
          {/* Audio Upload */}
          <div className="relative group cursor-pointer glass-panel border border-dashed border-slate-300 dark:border-medical-700 p-5 rounded-2xl flex flex-col items-center justify-center text-center transition-all hover:bg-slate-50 dark:hover:bg-medical-800">
            <input 
              type="file" 
              accept="audio/*" 
              onChange={(e) => setAudio(e.target.files[0])}
              required
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
            />
            <div className={`w-12 h-12 rounded-[18px] flex items-center justify-center mb-3 transition-colors ${audio ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-slate-100 text-slate-500 dark:bg-medical-800 dark:text-slate-400 group-hover:bg-medical-Teal/10 group-hover:text-medical-Teal'}`}>
              <Mic className="w-6 h-6 stroke-[2]" />
            </div>
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              {audio ? audio.name : 'Upload Call Recording'}
            </p>
            <p className="text-xs text-slate-400 mt-1">.mp3, .m4a accepted</p>
            {audio && <CheckCircle2 className="absolute top-4 right-4 w-5 h-5 text-emerald-500" />}
          </div>

          {/* Screenshot Upload */}
          <div className="relative group cursor-pointer glass-panel border border-dashed border-slate-300 dark:border-medical-700 p-5 rounded-2xl flex flex-col items-center justify-center text-center transition-all hover:bg-slate-50 dark:hover:bg-medical-800">
            <input 
              type="file" 
              accept="image/*" 
              onChange={(e) => setScreenshot(e.target.files[0])}
              required
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
            />
            <div className={`w-12 h-12 rounded-[18px] flex items-center justify-center mb-3 transition-colors ${screenshot ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-slate-100 text-slate-500 dark:bg-medical-800 dark:text-slate-400 group-hover:bg-medical-Teal/10 group-hover:text-medical-Teal'}`}>
              <Camera className="w-6 h-6 stroke-[2]" />
            </div>
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              {screenshot ? screenshot.name : 'Upload Payment Screenshot'}
            </p>
            <p className="text-xs text-slate-400 mt-1">Clear image required</p>
            {screenshot && <CheckCircle2 className="absolute top-4 right-4 w-5 h-5 text-emerald-500" />}
          </div>
        </div>

        <button 
          type="submit" 
          disabled={!phone || !audio || !screenshot || isSubmitting}
          className="w-full bg-medical-800 hover:bg-slate-900 dark:bg-medical-TealLight dark:hover:bg-medical-Teal dark:text-medical-900 text-white rounded-2xl py-4 font-bold text-[15px] tracking-wide flex items-center justify-center space-x-2 mt-8 btn-haptic disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-slate-900/20 dark:shadow-teal-500/20 transition-all top-0"
        >
          {isSubmitting ? (
             <span className="flex items-center space-x-2 animate-pulse">
               <UploadCloud className="w-5 h-5 animate-bounce" />
               <span>Uploading...</span>
             </span>
          ) : (
            <span>Submit Verification</span>
          )}
        </button>
      </form>
    </div>
  );
}
