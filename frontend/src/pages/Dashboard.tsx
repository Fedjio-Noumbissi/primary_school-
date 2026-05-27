import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const Dashboard = () => {
  const navigate = useNavigate();
  const [periode, setPeriode] = useState<'3m' | '6m' | '1a'>('6m');

  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboard-stats', periode],
    queryFn: async () => {
      const res = await api.get(`/dashboard/stats?periode=${periode}`);
      return res.data.data;
    }
  });

  const chartData = stats?.chartData || [];
  const recentEleves = stats?.recentEleves || [];

  return (
    <div className="p-4 lg:p-8 font-sora bg-[#f4f6f8] min-h-screen text-gray-800">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Direction Générale</h1>
          <p className="text-sm text-gray-500 mt-1">Vue globale de l'établissement</p>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-6">
        {/* Left Column (Main) */}
        <div className="flex-1 space-y-6 min-w-0">
          
          {/* Tabs */}
          <div className="flex items-center space-x-4 mb-2">
            <span className="text-gray-800 font-semibold text-lg">Indicateurs <span className="text-gray-400 font-normal">/ Clés</span></span>
            <div className="flex space-x-1 bg-white rounded-full p-1 shadow-sm">
              <button className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-500"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></button>
              <button className="w-8 h-8 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-700"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg></button>
            </div>
          </div>

          {/* Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div 
              onClick={() => navigate('/scolarite/eleves')}
              className="bg-white p-5 rounded-[24px] shadow-sm flex flex-col justify-between border border-white hover:border-orange-100 transition-all cursor-pointer hover:shadow-md active:scale-95"
            >
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 mb-6">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              </div>
              <div>
                <p className="text-gray-500 text-[13px] mb-1">Élèves Inscrits</p>
                <p className="text-2xl font-bold text-gray-800">
                  <span className="text-orange-500">{isLoading ? '...' : stats?.eleves || 0}</span>
                </p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-[24px] shadow-sm flex flex-col justify-between border border-white hover:border-emerald-100 transition-colors">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-6">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                <p className="text-gray-500 text-[13px] mb-1">Total Finances</p>
                <p className="text-2xl font-bold text-gray-800">
                  <span className="text-emerald-600">{isLoading ? '...' : (stats?.financeTotal || 0).toLocaleString()} <span className="text-xs">F</span></span>
                </p>
              </div>
            </div>

            <div 
              onClick={() => navigate('/personnes/enseignants')}
              className="bg-white p-5 rounded-[24px] shadow-sm flex flex-col justify-between border border-white hover:border-gray-200 transition-all cursor-pointer hover:shadow-md active:scale-95"
            >
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-800 mb-6">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              </div>
              <div>
                <p className="text-gray-500 text-[13px] mb-1">Enseignants</p>
                <p className="text-2xl font-bold text-gray-800">{isLoading ? '...' : stats?.enseignants || 0}</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-[24px] shadow-sm flex flex-col justify-between">
               <div className="flex justify-between items-center mb-4">
                 <h3 className="text-[13px] font-bold text-gray-800">Capacité d'accueil</h3>
                 <button className="text-gray-300 hover:text-gray-500"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg></button>
               </div>
               <div className="space-y-3">
                 <div className="flex items-center justify-between">
                   <span className="text-[11px] font-semibold text-gray-600 w-20">Occupé</span>
                   <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden mx-2"><div className="bg-orange-400 h-full w-[95%] rounded-full"></div></div>
                   <span className="text-[11px] text-gray-400 font-medium w-8 text-right">95%</span>
                 </div>
                 <div className="flex items-center justify-between">
                   <span className="text-[11px] font-semibold text-gray-600 w-20">Disponible</span>
                   <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden mx-2"><div className="bg-emerald-600 h-full w-[5%] rounded-full"></div></div>
                   <span className="text-[11px] text-gray-400 font-medium w-8 text-right">5%</span>
                 </div>
               </div>
            </div>
          </div>

          {/* Chart Area */}
          <div className="bg-white p-6 rounded-[24px] shadow-sm h-[320px] flex flex-col relative">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-800">Évolution financière</h2>
              <div className="flex bg-gray-100 p-1 rounded-lg">
                <button 
                  onClick={() => setPeriode('3m')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${periode === '3m' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
                >3M</button>
                <button 
                  onClick={() => setPeriode('6m')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${periode === '6m' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
                >6M</button>
                <button 
                  onClick={() => setPeriode('1a')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${periode === '1a' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
                >1A</button>
              </div>
            </div>
            
            <div className="flex-1 w-full min-h-0 relative z-0">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                <BarChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#9ca3af', fontWeight: 500}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#9ca3af', fontWeight: 500}} tickFormatter={(val) => `${val / 1000}k`} />
                  <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'}} cursor={{fill: 'rgba(0,0,0,0.02)'}} />
                  <Bar dataKey="paiements" name="Paiements" fill="#059669" radius={[4, 4, 0, 0]} barSize={12} />
                  <Bar dataKey="depenses" name="Dépenses" fill="#fb923c" radius={[4, 4, 0, 0]} barSize={12} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Table Area */}
          <div className="bg-white p-6 rounded-[24px] shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-800">Dernières inscriptions</h2>
              <button 
                onClick={() => navigate('/scolarite/eleves?sort=recent')}
                className="text-[12px] text-gray-500 hover:text-emerald-600 bg-gray-50 hover:bg-emerald-50 px-3 py-1.5 rounded-full font-medium transition-colors"
              >
                Voir tout
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[600px]">
                <thead>
                  <tr className="text-[12px] text-gray-400 border-b border-gray-100">
                    <th className="pb-3 font-medium px-2">Acteur</th>
                    <th className="pb-3 font-medium px-2">Type d'action</th>
                    <th className="pb-3 font-medium px-2">Service</th>
                    <th className="pb-3 font-medium px-2">Heure</th>
                    <th className="pb-3 font-medium px-2">Statut</th>
                    <th className="pb-3 font-medium px-2"></th>
                  </tr>
                </thead>
                <tbody className="text-[13px]">
                  {recentEleves.length === 0 ? (
                    <tr><td colSpan={6} className="py-8 text-center text-gray-400">Aucune inscription récente</td></tr>
                  ) : (
                    recentEleves.map((eleve: any) => (
                      <tr key={eleve.matricule} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                        <td className="py-3 px-2 flex items-center">
                          <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-3">
                            {eleve.nom?.charAt(0) || 'E'}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">{eleve.nom} {eleve.prenom}</p>
                            <p className="text-[11px] text-gray-400 mt-0.5">Matricule: {eleve.matricule}</p>
                          </div>
                        </td>
                        <td className="py-3 px-2 text-gray-500">Nouvelle Inscription</td>
                        <td className="py-3 px-2 text-gray-500">Scolarité</td>
                        <td className="py-3 px-2 text-gray-500 font-medium">
                          {eleve.created_at ? new Date(eleve.created_at).toLocaleDateString() : '-'}
                        </td>
                        <td className="py-3 px-2">
                          <span className="text-emerald-600 text-[11px] bg-emerald-50 px-2 py-1 rounded-full font-medium">Validé</span>
                        </td>
                        <td className="py-3 px-2 text-right">
                          <button 
                            onClick={() => navigate(`/scolarite/eleves/${eleve.matricule}`)}
                            className="text-gray-400 hover:text-blue-500 transition-colors"
                          >
                            Détails
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full xl:w-[340px] space-y-6 flex-shrink-0">
          
          {/* Agenda */}
          <div className="bg-white p-6 rounded-[24px] shadow-sm">
            <div className="flex justify-between items-center mb-1">
              <h2 className="text-[15px] font-bold text-gray-800">Agenda Direction</h2>
            </div>
            <p className="text-[11px] text-gray-400 mb-6">Réunions et événements clés</p>
            
            {/* Calendar Widget */}
            <div className="grid grid-cols-5 gap-1.5 mb-8">
              {[{d:22,m:'Sep'}, {d:23,m:'Sep', active:true}, {d:24,m:'Sep'}, {d:25,m:'Sep'}, {d:26,m:'Sep'},
                {d:27,m:'Sep'}, {d:28,m:'Sep'}, {d:29,m:'Sep'}, {d:30,m:'Sep'}, {d:'01',m:'Oct'}].map((day, i) => (
                <div key={i} className={`flex flex-col items-center justify-center py-2.5 rounded-[14px] text-[11px] transition-colors ${day.active ? 'bg-orange-400 text-white shadow-lg shadow-orange-200' : 'text-gray-400 hover:bg-gray-50 cursor-pointer'}`}>
                  <span className={`font-bold text-[13px] mb-0.5 ${day.active ? 'text-white' : 'text-gray-700'}`}>{day.d}</span>
                  <span>{day.m}</span>
                </div>
              ))}
            </div>

            {/* Schedule List */}
            <div className="space-y-5">
              {[
                {name: 'Conseil de discipline', role: 'Salle de réunion', time: '14:30'},
                {name: 'Inspection', role: 'Délégation régionale', time: 'Demain'},
              ].map((task, i) => (
                <div key={i} className="flex items-center justify-between group">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 font-bold text-xs"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>
                    <div>
                      <p className="font-bold text-[13px] text-gray-800">{task.name}</p>
                      <p className="text-[11px] text-gray-400">{task.role}</p>
                    </div>
                  </div>
                  <div className="text-[11px] text-gray-500 font-medium">
                    {task.time}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Course Gradient Card -> Alerte Globale */}
          <div className="bg-gradient-to-br from-[#c9a786] via-[#7d9b7b] to-[#25654b] p-6 rounded-[24px] text-white shadow-xl shadow-emerald-900/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-10 rounded-full blur-3xl transform translate-x-10 -translate-y-10"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-900 opacity-20 rounded-full blur-2xl transform -translate-x-10 translate-y-10"></div>
            
            <div className="flex justify-between items-center mb-10 relative z-10">
              <h3 className="font-semibold text-sm">Action Requise</h3>
              <button className="text-[11px] bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full transition-colors font-medium">Voir le rapport</button>
            </div>
            
            <div className="relative z-10 mb-6">
              <h2 className="text-2xl font-bold mb-2">Renouvellement Licences</h2>
              <p className="text-[11px] text-white/80 leading-relaxed font-light">Les licences logicielles éducatives arrivent à expiration dans 15 jours.</p>
            </div>
            
            <div className="flex flex-wrap gap-2 relative z-10">
              <span className="text-[10px] font-medium bg-white/20 backdrop-blur-md border border-white/10 px-2.5 py-1.5 rounded-md flex items-center"><svg className="w-3 h-3 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> Échéance : 10 Oct</span>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};