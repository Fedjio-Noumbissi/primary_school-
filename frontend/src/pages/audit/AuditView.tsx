import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { name: '10:00', logs: 15, alerts: 2 },
  { name: '11:00', logs: 28, alerts: 0 },
  { name: '12:00', logs: 45, alerts: 5 },
  { name: '13:00', logs: 12, alerts: 1 }, 
  { name: '14:00', logs: 60, alerts: 10 }, 
  { name: '15:00', logs: 35, alerts: 3 },
];

export const AuditView = () => {

  return (
    <div className="p-4 lg:p-8 font-sora bg-[#f4f6f8] min-h-screen text-gray-800">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Audit & Sécurité</h1>
          <p className="text-sm text-gray-500 mt-1">Supervision du système ERP</p>
        </div>
        
        {/* Fake Topbar elements */}
        <div className="flex items-center space-x-4">
           <div className="relative hidden md:block">
             <input type="text" placeholder="Rechercher un log..." className="bg-white rounded-full py-2.5 pl-10 pr-4 w-64 lg:w-80 text-sm focus:outline-none shadow-sm" />
             <svg className="w-4 h-4 absolute left-4 top-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
             <button className="absolute right-2 top-1.5 w-7 h-7 bg-gray-50 rounded-full flex items-center justify-center text-gray-500"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg></button>
           </div>
           
           <div className="flex space-x-2">
             <button className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors">
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
             </button>
             <button className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors">
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
             </button>
             <button className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors relative">
               <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-orange-500 border-2 border-white rounded-full"></span>
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
             </button>
           </div>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-6">
        {/* Left Column (Main) */}
        <div className="flex-1 space-y-6 min-w-0">
          
          {/* Tabs */}
          <div className="flex items-center space-x-4 mb-2">
            <span className="text-gray-800 font-semibold text-lg">Métriques <span className="text-gray-400 font-normal">/ Système</span></span>
            <div className="flex space-x-1 bg-white rounded-full p-1 shadow-sm">
              <button className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-500"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></button>
              <button className="w-8 h-8 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-700"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg></button>
            </div>
          </div>

          {/* Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-[24px] shadow-sm flex flex-col justify-between border border-white hover:border-orange-100 transition-colors">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 mb-6">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <div>
                <p className="text-gray-500 text-[13px] mb-1">Connexions (1h)</p>
                <p className="text-2xl font-bold text-gray-800"><span className="text-orange-500">1,240</span></p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-[24px] shadow-sm flex flex-col justify-between border border-white hover:border-emerald-100 transition-colors">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-6">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
              <div>
                <p className="text-gray-500 text-[13px] mb-1">Alertes Sécurité</p>
                <p className="text-2xl font-bold text-gray-800"><span className="text-emerald-600">3</span></p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-[24px] shadow-sm flex flex-col justify-between border border-white hover:border-gray-200 transition-colors">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-800 mb-6">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </div>
              <div>
                <p className="text-gray-500 text-[13px] mb-1">Logs générés</p>
                <p className="text-2xl font-bold text-gray-800">45k</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-[24px] shadow-sm flex flex-col justify-between">
               <div className="flex justify-between items-center mb-4">
                 <h3 className="text-[13px] font-bold text-gray-800">Santé Serveur</h3>
                 <button className="text-gray-300 hover:text-gray-500"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg></button>
               </div>
               <div className="space-y-3">
                 <div className="flex items-center justify-between">
                   <span className="text-[11px] font-semibold text-gray-600 w-20">CPU</span>
                   <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden mx-2"><div className="bg-orange-400 h-full w-[45%] rounded-full"></div></div>
                   <span className="text-[11px] text-gray-400 font-medium w-8 text-right">45%</span>
                 </div>
                 <div className="flex items-center justify-between">
                   <span className="text-[11px] font-semibold text-gray-600 w-20">RAM</span>
                   <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden mx-2"><div className="bg-emerald-600 h-full w-[65%] rounded-full"></div></div>
                   <span className="text-[11px] text-gray-400 font-medium w-8 text-right">65%</span>
                 </div>
                 <div className="flex items-center justify-between">
                   <span className="text-[11px] font-semibold text-gray-600 w-20">Disque</span>
                   <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden mx-2"><div className="bg-gray-800 h-full w-[82%] rounded-full"></div></div>
                   <span className="text-[11px] text-gray-400 font-medium w-8 text-right">82%</span>
                 </div>
               </div>
            </div>
          </div>

          {/* Chart Area */}
          <div className="bg-white p-6 rounded-[24px] shadow-sm h-[320px] flex flex-col relative">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-800">Volume des requêtes</h2>
              <div className="flex items-center space-x-4 text-xs font-medium">
                <span className="flex items-center text-gray-500"><span className="w-2 h-2 rounded-full bg-emerald-600 mr-1.5"></span> Logs Normaux</span>
                <span className="flex items-center text-gray-500"><span className="w-2 h-2 rounded-full bg-orange-400 mr-1.5"></span> Alertes (x10)</span>
              </div>
            </div>
            
            <div className="absolute top-28 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center">
              <div className="bg-emerald-600 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md">Stable</div>
              <div className="w-px h-24 border-l-2 border-dashed border-gray-200 mt-1"></div>
            </div>

            <div className="flex-1 w-full min-h-0 relative z-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorLogs" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#059669" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorAlerts" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#fb923c" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#fb923c" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={true} stroke="#f3f4f6" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#9ca3af', fontWeight: 500}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#9ca3af', fontWeight: 500}} />
                  <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'}} />
                  <Area type="monotone" dataKey="logs" stroke="#059669" strokeWidth={0} fillOpacity={1} fill="url(#colorLogs)" />
                  <Area type="monotone" dataKey="alerts" stroke="#fb923c" strokeWidth={0} fillOpacity={1} fill="url(#colorAlerts)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Table Area */}
          <div className="bg-white p-6 rounded-[24px] shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-800">Derniers événements système</h2>
              <button className="text-[11px] text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full font-medium flex items-center">
                Temps Réel <svg className="w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[600px]">
                <thead>
                  <tr className="text-[12px] text-gray-400 border-b border-gray-100">
                    <th className="pb-3 font-medium px-2">Utilisateur</th>
                    <th className="pb-3 font-medium px-2">Action</th>
                    <th className="pb-3 font-medium px-2">IP Source</th>
                    <th className="pb-3 font-medium px-2">Heure</th>
                    <th className="pb-3 font-medium px-2">Niveau</th>
                    <th className="pb-3 font-medium px-2"></th>
                  </tr>
                </thead>
                <tbody className="text-[13px]">
                  <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-3 px-2 flex items-center">
                      <div className="w-9 h-9 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold mr-3">UN</div>
                      <div>
                        <p className="font-semibold text-gray-800">Inconnu</p>
                        <p className="text-[11px] text-gray-400 mt-0.5">Échec Auth</p>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-gray-500">Tentative de connexion échouée (x5)</td>
                    <td className="py-3 px-2 text-gray-500">192.168.1.45</td>
                    <td className="py-3 px-2 text-gray-500 font-medium">14:22:10</td>
                    <td className="py-3 px-2">
                      <span className="text-red-600 text-[11px] bg-red-50 px-2 py-1 rounded-full font-medium">Critique</span>
                    </td>
                    <td className="py-3 px-2 text-right">
                      <button className="text-gray-400 hover:text-red-500 transition-colors">Bannir IP</button>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3 px-2 flex items-center">
                      <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold mr-3">AD</div>
                      <div>
                        <p className="font-semibold text-gray-800">Admin Système</p>
                        <p className="text-[11px] text-gray-400 mt-0.5">Role: admin_systeme</p>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-gray-500">Modification droits accès</td>
                    <td className="py-3 px-2 text-gray-500">10.0.0.15</td>
                    <td className="py-3 px-2 text-gray-500 font-medium">14:15:00</td>
                    <td className="py-3 px-2">
                      <span className="text-orange-600 text-[11px] bg-orange-50 px-2 py-1 rounded-full font-medium">Attention</span>
                    </td>
                    <td className="py-3 px-2 text-right">
                      <button className="text-gray-400 hover:text-emerald-500 transition-colors">Détails</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full xl:w-[340px] space-y-6 flex-shrink-0">
          
          {/* Agenda -> Tâches de maintenance */}
          <div className="bg-white p-6 rounded-[24px] shadow-sm">
            <div className="flex justify-between items-center mb-1">
              <h2 className="text-[15px] font-bold text-gray-800">Plan de Maintenance</h2>
            </div>
            <p className="text-[11px] text-gray-400 mb-6">Tâches planifiées et mises à jour</p>
            
            {/* Calendar Widget */}
            <div className="grid grid-cols-5 gap-1.5 mb-8">
              {[{d:22,m:'Sep'}, {d:23,m:'Sep', active:true}, {d:24,m:'Sep'}, {d:25,m:'Sep'}, {d:26,m:'Sep'},
                {d:27,m:'Sep'}, {d:28,m:'Sep'}, {d:29,m:'Sep'}, {d:30,m:'Sep'}, {d:'01',m:'Oct'}].map((day, i) => (
                <div key={i} className={`flex flex-col items-center justify-center py-2.5 rounded-[14px] text-[11px] transition-colors ${day.active ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' : 'text-gray-400 hover:bg-gray-50 cursor-pointer'}`}>
                  <span className={`font-bold text-[13px] mb-0.5 ${day.active ? 'text-white' : 'text-gray-700'}`}>{day.d}</span>
                  <span>{day.m}</span>
                </div>
              ))}
            </div>

            {/* Schedule List */}
            <div className="space-y-5">
              {[
                {name: 'Sauvegarde DB', role: 'Backup automatique', time: '02:00'},
                {name: 'Mise à jour SSL', role: 'Certificats', time: 'Demain'},
              ].map((task, i) => (
                <div key={i} className="flex items-center justify-between group">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-xs"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>
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

          {/* Upcoming Course Gradient Card -> État du réseau */}
          <div className="bg-gradient-to-br from-[#c9a786] via-[#7d9b7b] to-[#25654b] p-6 rounded-[24px] text-white shadow-xl shadow-emerald-900/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-10 rounded-full blur-3xl transform translate-x-10 -translate-y-10"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-900 opacity-20 rounded-full blur-2xl transform -translate-x-10 translate-y-10"></div>
            
            <div className="flex justify-between items-center mb-10 relative z-10">
              <h3 className="font-semibold text-sm">Rapport Réseau</h3>
              <button className="text-[11px] bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full transition-colors font-medium">Scanner</button>
            </div>
            
            <div className="relative z-10 mb-6">
              <h2 className="text-2xl font-bold mb-2">Uptime 99.9%</h2>
              <p className="text-[11px] text-white/80 leading-relaxed font-light">Le système ERP est opérationnel. Aucun goulot d'étranglement réseau détecté sur la dernière heure.</p>
            </div>
            
            <div className="flex flex-wrap gap-2 relative z-10">
              <span className="text-[10px] font-medium bg-white/20 backdrop-blur-md border border-white/10 px-2.5 py-1.5 rounded-md flex items-center"><svg className="w-3 h-3 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Tout est vert</span>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};
