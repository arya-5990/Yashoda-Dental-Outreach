import React from 'react';
import { Moon, Sun } from 'lucide-react';

const ClinicBrandToggle = ({ isDark, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`relative rounded-full p-2.5 transition-colors duration-300 outline-none
      ${isDark ? 'bg-medical-800 text-medical-TealLight hover:bg-medical-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}
      btn-haptic focus:ring-2 focus:ring-offset-2 focus:ring-medical-TealLight focus:ring-offset-transparent`}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Moon className="w-5 h-5 stroke-[2]" />
      ) : (
        <Sun className="w-5 h-5 stroke-[2]" />
      )}
    </button>
  );
};

export default ClinicBrandToggle;
