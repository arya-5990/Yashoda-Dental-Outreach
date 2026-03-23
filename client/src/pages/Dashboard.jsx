import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Power, Clock } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import StipendProgress from '../components/ui/StipendProgress';
import ActivityList from '../components/ui/ActivityList';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [activities, setActivities] = useState([]);
  const [salesData, setSalesData] = useState({ currentSales: 0, totalSalesSubmitted: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/sales/${user.id}`);
        setActivities(res.data.activities);
        setSalesData({
          currentSales: res.data.currentSales,
          totalSalesSubmitted: res.data.totalSalesSubmitted
        });
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [user]);

  return (
    <div className="px-5 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-500 relative min-h-screen">
      <div className="mb-6 mt-4 flex justify-between items-center">
        <div>
          <h2 className="font-serif text-2xl font-bold text-slate-900 dark:text-enamel-White">
            Hello, {user?.name || 'Intern'}
          </h2>
          <p className="text-slate-500 font-light text-sm">Let's build more smiles today.</p>
        </div>
        
        {/* Profile Avatar placeholder */}
        <div className="w-10 h-10 rounded-full bg-medical-Teal/10 border-2 border-white dark:border-medical-800 shadow-sm flex items-center justify-center text-medical-Teal dark:text-medical-TealLight font-bold font-serif">
          {user?.name ? user.name.charAt(0).toUpperCase() : 'Y'}
        </div>
      </div>

      <StipendProgress currentSales={salesData.currentSales} />

      <div className="mb-8">
        <button 
          onClick={() => navigate('/log-success')}
          className="w-full glass-panel-heavy p-4 border border-medical-Teal/20 dark:border-medical-TealLight/20 flex flex-col items-center justify-center group overflow-hidden relative btn-haptic shadow-lg shadow-teal-500/10"
        >
          {/* Subtle gradient sweep */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-medical-TealLight/10 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-1000"></div>
          
          <div className="w-12 h-12 bg-medical-Teal text-white rounded-[20px] flex items-center justify-center mb-3 shadow-md rotate-3 group-hover:rotate-6 transition-all">
            <Plus className="w-6 h-6 stroke-[2.5]" />
          </div>
          <h3 className="font-bold text-slate-800 dark:text-slate-100 font-sans tracking-wide">Log Your Success</h3>
          <p className="text-xs text-slate-400 mt-1">Upload call recordings & proof</p>
        </button>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-end mb-4">
          <h3 className="text-sm font-semibold tracking-wide text-medical-800 dark:text-medical-TealLight uppercase">
            Recent Activity
          </h3>
          <button onClick={() => navigate('/submissions')} className="text-xs text-medical-Teal dark:text-medical-TealLight font-medium hover:underline transition-colors">
            All submissions ({salesData.totalSalesSubmitted})
          </button>
        </div>
        {loading ? (
            <div className="animate-pulse space-y-3">
              {[1, 2].map(i => <div key={i} className="h-16 bg-slate-100 dark:bg-medical-800 rounded-2xl"></div>)}
            </div>
        ) : (
            <ActivityList activities={activities.slice(0, 5)} />
        )}
      </div>

      {/* Sticky Clock In/Out FAB */}
      <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
        <button
          onClick={() => setIsClockedIn(!isClockedIn)}
          className={`flex items-center justify-center space-x-2 px-5 py-3 rounded-full shadow-2xl transition-all duration-300 btn-haptic
            ${isClockedIn 
              ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/40' 
              : 'bg-medical-800 dark:bg-medical-TealLight hover:bg-medical-700 text-white shadow-medical-800/40 dark:text-medical-900 font-semibold'
            }`}
        >
          {isClockedIn ? <Power className="w-4 h-4 stroke-[2.5]" /> : <Clock className="w-4 h-4 stroke-[2.5]" />}
          <span className="font-bold text-sm tracking-wide">
            {isClockedIn ? 'Clock Out' : 'Clock In'}
          </span>
        </button>
      </div>
    </div>
  );
}
