import React from 'react';
import { Target, Trophy, Award, TrendingUp } from 'lucide-react';

export default function StipendProgress({ currentSales = 42 }) {
  const tiers = [
    { name: 'Bronze', target: 50, reward: '₹1K' },
    { name: 'Silver', target: 70, reward: '₹2.5K' },
    { name: 'Gold', target: 100, reward: '₹4K' }
  ];

  const maxSales = 100;
  const percentage = Math.min((currentSales / maxSales) * 100, 100);

  return (
    <div className="glass-panel-heavy p-6 mb-8 relative overflow-hidden group">
      {/* Decorative background blur */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-medical-TealLight/10 dark:bg-medical-Teal/20 rounded-full blur-3xl group-hover:bg-medical-TealLight/20 transition-all duration-700"></div>
      
      <div className="relative z-10 flex justify-between items-end mb-8">
        <div>
          <h3 className="text-sm font-semibold tracking-wide text-medical-800 dark:text-medical-TealLight uppercase mb-1 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Your Progress
          </h3>
          <p className="text-3xl font-serif font-bold text-slate-900 dark:text-enamel-White">
            {currentSales} <span className="text-lg font-sans font-normal text-slate-400">/ 100 Sales</span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs font-medium text-slate-500 mb-1">Current Value</p>
          <div className="inline-block px-3 py-1 bg-medical-Teal/10 dark:bg-medical-Teal/20 text-medical-Teal dark:text-medical-TealLight font-bold rounded-lg text-lg">
            {currentSales >= 100 ? '₹4,000' : currentSales >= 70 ? '₹2,500' : currentSales >= 50 ? '₹1,000' : '₹0'}
          </div>
        </div>
      </div>

      {/* Asymmetrical Progress Indicator */}
      <div className="relative mb-6">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 dark:bg-medical-800 -translate-y-1/2 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-teal-400 to-medical-TealLight transition-all duration-1000 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Milestones on top of the thin line */}
        <div className="relative flex justify-between items-center w-full">
          {tiers.map((tier, idx) => {
            const isReached = currentSales >= tier.target;
            const isNext = !isReached && (idx === 0 || currentSales >= tiers[idx - 1].target);
            
            return (
              <div 
                key={tier.name} 
                className="relative flex flex-col items-center" 
                style={{ left: `${idx === 0 ? 0 : idx === 1 ? -1 : -2}%` }}
              >
                <div 
                  className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-[40%_60%_60%_40%/40%_40%_60%_60%] transition-all duration-500 z-10 
                  ${isReached 
                    ? 'bg-medical-Teal text-white shadow-lg shadow-teal-500/30 rotate-12 scale-110' 
                    : isNext 
                      ? 'bg-white dark:bg-medical-700 border-2 border-medical-TealLight text-medical-TealLight animate-pulse scale-100'
                      : 'bg-slate-100 dark:bg-medical-800 text-slate-400 border border-slate-200 dark:border-medical-700 scale-90'
                  }`}
                >
                  {idx === 0 ? <Target className="w-5 h-5 stroke-[1.5]" /> : 
                   idx === 1 ? <Award className="w-5 h-5 stroke-[1.5]" /> : 
                   <Trophy className="w-5 h-5 stroke-[1.5]" />}
                </div>
                
                <div className="absolute top-14 text-center mt-1 w-20">
                  <span className={`block text-xs font-bold ${isReached ? 'text-medical-Teal dark:text-medical-TealLight' : 'text-slate-500'}`}>{tier.reward}</span>
                  <span className="block text-[10px] text-slate-400 font-medium">({tier.target})</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="mt-10 pt-4 border-t border-slate-100 dark:border-medical-800 flex justify-between text-xs text-slate-500">
        <span>Keep pushing! Next milestone is close.</span>
      </div>
    </div>
  );
}
