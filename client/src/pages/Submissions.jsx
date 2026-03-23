import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ChevronLeft, Filter } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ActivityList from '../components/ui/ActivityList';

export default function Submissions() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'verified', 'review', 'issue'

  useEffect(() => {
    const fetchSubmissions = async () => {
      if (!user) return;
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/sales/${user.id}`);
        setActivities(res.data.activities);
      } catch (err) {
        console.error("Failed to fetch submissions:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, [user]);

  const filteredActivities = activities.filter(activity => {
    if (filter === 'all') return true;
    return activity.status === filter;
  });

  const filterOptions = [
    { value: 'all', label: 'All' },
    { value: 'verified', label: 'Accepted' },
    { value: 'review', label: 'Pending' },
    { value: 'issue', label: 'Rejected' }
  ];

  return (
    <div className="px-5 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-screen">
      <div className="flex items-center space-x-3 mb-6 mt-4">
        <button 
          onClick={() => navigate('/progress')}
          className="w-10 h-10 rounded-full bg-slate-100 dark:bg-medical-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-medical-700 transition-colors btn-haptic"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="font-serif text-2xl font-bold text-slate-900 dark:text-enamel-White">
            All Submissions
          </h2>
          <p className="text-sm text-slate-500 font-light">View and track your logs</p>
        </div>
      </div>

      <div className="mb-6 flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
        {filterOptions.map(option => (
          <button
            key={option.value}
            onClick={() => setFilter(option.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors btn-haptic ${
              filter === option.value 
                ? 'bg-medical-Teal text-white shadow-md shadow-teal-500/20' 
                : 'bg-slate-100 dark:bg-medical-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-medical-700'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {loading ? (
          <div className="animate-pulse space-y-3">
            {[1, 2, 3, 4].map(i => <div key={i} className="h-16 bg-slate-100 dark:bg-medical-800 rounded-2xl"></div>)}
          </div>
        ) : filteredActivities.length > 0 ? (
          <ActivityList activities={filteredActivities} />
        ) : (
          <div className="text-center py-12 px-4 glass-panel border border-dashed border-slate-200 dark:border-medical-700">
            <p className="text-slate-500 text-sm">No submissions found for this filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
