import React from 'react';
import { CheckCircle2, Clock, AlertTriangle, ChevronRight } from 'lucide-react';

const statsMap = {
  verified: { icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10', label: 'Verified' },
  review: { icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-500/10', label: 'Under Review' },
  issue: { icon: AlertTriangle, color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-500/10', label: 'Issue Found' },
};

export default function ActivityList({ activities = [] }) {
  if (activities.length === 0) {
    return (
      <div className="text-center py-10 px-4 glass-panel border border-dashed border-slate-200 dark:border-medical-700">
        <p className="text-slate-500 text-sm">No recent activity detected.</p>
        <p className="text-xs text-slate-400 mt-1">Log a sale to start your streak.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {activities.map((item, idx) => {
        const statusConfig = statsMap[item.status];
        const Icon = statusConfig.icon;
        
        return (
          <div key={idx} className="glass-panel p-4 flex items-center space-x-4 btn-haptic hover:bg-slate-50 dark:hover:bg-medical-800/80 cursor-pointer">
            <div className={`p-3 rounded-2xl ${statusConfig.bg}`}>
              <Icon className={`w-5 h-5 ${statusConfig.color} stroke-[2]`} />
            </div>
            
            <div className="flex-1">
              <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{item.phone}</h4>
              <p className="text-xs text-slate-400 mt-0.5">{item.time}</p>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${statusConfig.color} ${statusConfig.bg}`}>
                {statusConfig.label}
              </span>
              <ChevronRight className="w-4 h-4 text-slate-300 dark:text-medical-700" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
