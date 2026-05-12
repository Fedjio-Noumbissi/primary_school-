import { useAuthStore } from '../../store/authStore';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { name: 'Lun', income: 450, expense: 120 },
  { name: 'Mar', income: 800, expense: 200 },
  { name: 'Mer', income: 650, expense: 400 },
  { name: 'Jeu', income: 1200, expense: 150 }, 
  { name: 'Ven', income: 950, expense: 500 }, 
];

export const AdministratifDashboard = () => {
  // const { user } = useAuthStore();

  return (
    <div className="p-4 lg:p-8 font-sora bg-[#f4f6f8] min-h-screen text-gray-800">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Finance & Admin</h1>
          <p className="text-sm text-gray-500 mt-1">23 Septembre, 2024</p>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-6">
        {/* Left Column (Main) */}
        <div className="flex-1 space-y-6 min-w-0">
          
          {/* Tabs */}
          <div className="flex items-center space-x-4 mb-2">
            <span className="text-gray-800 font-semibold text-lg">Finances <span className="text-gray-400 font-normal">/ Opérations</span></span>
            <div className="flex space-x-1 bg-white rounded-full p-1 shadow-sm">
              <button className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-500"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></button>
              <button className="w-8 h-8 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-700"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg></button>
            </div>
          </div>

          {/* Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-[24px] shadow-sm flex flex-col justify-between border border-white hover:border-orange-100 transition-colors">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 mb-6">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                <p className="text-gray-500 text-[13px] mb-1">Recettes (Jour)</p>
                <p className="text-2xl font-bold text-gray-800"><span className="text-orange-500">150K</span></p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-[24px] shadow-sm flex flex-col justify-between border border-white hover:border-emerald-100 transition-colors">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-6">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              </div>
              <div>
                <p className="text-gray-500 text-[13px] mb-1">Inscriptions</p>
                <p className="text-2xl font-bold text-gray-800"><span className="text-emerald-600">42</span></p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-[24px] shadow-sm flex flex-col justify-between border border-white hover:border-gray-200 transition-colors">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-800 mb-6">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </div>
              <div>
                <p className="text-gray-500 text-[13px] mb-1">Dossiers Attente</p>
                <p className="text-2xl font-bold text-gray-800">15</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-[24px] shadow-sm flex flex-col justify-between">
               <div className="flex justify-between items-center mb-4">
                 <h3 className="text-[13px] font-bold text-gray-800">Caisse & Objectifs</h3>
                 <button className="text-gray-300 hover:text-gray-500"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg></button>
               </div>
               <div className="space-y-3">
                 <div className="flex items-center justify-between">
                   <span className="text-[11px] font-semibold text-gray-600 w-20">Scolarité</span>
                   <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden mx-2"><div className="bg-orange-400 h-full w-[85%] rounded-full"></div></div>
                   <span className="text-[11px] text-gray-400 font-medium w-8 text-right">85%</span>
                 </div>
                 <div className="flex items-center justify-between">
                   <span className="text-[11px] font-semibold text-gray-600 w-20">Inscriptions</span>
                   <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden mx-2"><div className="bg-emerald-600 h-full w-[98%] rounded-full"></div></div>
                   <span className="text-[11px] text-gray-400 font-medium w-8 text-right">98%</span>
                 </div>
                 <div className="flex items-center justify-between">
                   <span className="text-[11px] font-semibold text-gray-600 w-20">Reste</span>
                   <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden mx-2"><div className="bg-gray-800 h-full w-[15%] rounded-full"></div></div>
                   <span className="text-[11px] text-gray-400 font-medium w-8 text-right">15%</span>
                 </div>
               </div>
            </div>
          </div>

          {/* Chart Area */}
          <div className="bg-white p-6 rounded-[24px] shadow-sm h-[320px] flex flex-col relative">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-800">Évolution de la trésorerie</h2>
              <div className="flex items-center space-x-4 text-xs font-medium">
                <span className="flex items-center text-gray-500"><span className="w-2 h-2 rounded-full bg-emerald-600 mr-1.5"></span> Entrées</span>
                <span className="flex items-center text-gray-500"><span className="w-2 h-2 rounded-full bg-orange-400 mr-1.5"></span> Sorties</span>
              </div>
            </div>
            
            <div className="absolute top-28 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center">
              <div className="bg-emerald-600 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md">1.2M FCFA</div>
              <div className="w-px h-24 border-l-2 border-dashed border-gray-200 mt-1"></div>
            </div>

            <div className="flex-1 w-full min-h-0 relative z-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#059669" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#fb923c" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#fb923c" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={true} stroke="#f3f4f6" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#9ca3af', fontWeight: 500}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#9ca3af', fontWeight: 500}} tickFormatter={(value) => `${value}K`} />
                  <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'}} />
                  <Area type="monotone" dataKey="income" stroke="#059669" strokeWidth={0} fillOpacity={1} fill="url(#colorIncome)" />
                  <Area type="monotone" dataKey="expense" stroke="#fb923c" strokeWidth={0} fillOpacity={1} fill="url(#colorExpense)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Table Area */}
          <div className="bg-white p-6 rounded-[24px] shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-800">Dernières opérations financières</h2>
              <button className="text-[11px] text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full font-medium flex items-center">
                Aujourd'hui <svg className="w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[600px]">
                <thead>
                  <tr className="text-[12px] text-gray-400 border-b border-gray-100">
                    <th className="pb-3 font-medium px-2">Client / Élève</th>
                    <th className="pb-3 font-medium px-2">Motif</th>
                    <th className="pb-3 font-medium px-2">Mode</th>
                    <th className="pb-3 font-medium px-2">Heure</th>
                    <th className="pb-3 font-medium px-2 text-right">Montant</th>
                    <th className="pb-3 font-medium px-2"></th>
                  </tr>
                </thead>
                <tbody className="text-[13px]">
                  <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-3 px-2 flex items-center">
                      <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-3">AT</div>
                      <div>
                        <p className="font-semibold text-gray-800">Atangana Paul</p>
                        <p className="text-[11px] text-gray-400 mt-0.5">Matricule: M-62358</p>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-gray-500">Scolarité - Tranche 1</td>
                    <td className="py-3 px-2 text-gray-500">Orange Money</td>
                    <td className="py-3 px-2 text-gray-400 font-medium">10:45</td>
                    <td className="py-3 px-2 text-right font-semibold text-emerald-600">+25 000 <span className="text-gray-400 font-normal">FCFA</span></td>
                    <td className="py-3 px-2 text-right">
                      <button className="text-emerald-600 text-[11px] bg-emerald-50 hover:bg-emerald-100 px-4 py-1.5 rounded-full font-semibold transition-colors">Reçu</button>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3 px-2 flex items-center">
                      <div className="w-9 h-9 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold mr-3">NF</div>
                      <div>
                        <p className="font-semibold text-gray-800">Ndiaye Fatou</p>
                        <p className="text-[11px] text-gray-400 mt-0.5">Matricule: M-62359</p>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-gray-500">Frais d'inscription</td>
                    <td className="py-3 px-2 text-gray-500">Espèces</td>
                    <td className="py-3 px-2 text-gray-400 font-medium">09:15</td>
                    <td className="py-3 px-2 text-right font-semibold text-emerald-600">+10 000 <span className="text-gray-400 font-normal">FCFA</span></td>
                    <td className="py-3 px-2 text-right">
                      <button className="text-emerald-600 text-[11px] bg-emerald-50 hover:bg-emerald-100 px-4 py-1.5 rounded-full font-semibold transition-colors">Reçu</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full xl:w-[340px] space-y-6 flex-shrink-0">
          
          {/* Course Schedule -> Rendez-vous */}
          <div className="bg-white p-6 rounded-[24px] shadow-sm">
            <div className="flex justify-between items-center mb-1">
              <h2 className="text-[15px] font-bold text-gray-800">Agenda & Échéances</h2>
            </div>
            <p className="text-[11px] text-gray-400 mb-6">Planification administrative du jour</p>
            
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
                {name: 'Rencontre Parents', role: 'Retard de paiement', time: '14:00'},
                {name: 'Clôture de caisse', role: 'Vérification', time: '17:30'},
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

          {/* Upcoming Course Gradient Card -> Trésorerie */}
          <div className="bg-gradient-to-br from-[#c9a786] via-[#7d9b7b] to-[#25654b] p-6 rounded-[24px] text-white shadow-xl shadow-emerald-900/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-10 rounded-full blur-3xl transform translate-x-10 -translate-y-10"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-900 opacity-20 rounded-full blur-2xl transform -translate-x-10 translate-y-10"></div>
            
            <div className="flex justify-between items-center mb-10 relative z-10">
              <h3 className="font-semibold text-sm">Point Trésorerie</h3>
              <button className="text-[11px] bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full transition-colors font-medium">Imprimer</button>
            </div>
            
            <div className="relative z-10 mb-6">
              <h2 className="text-2xl font-bold mb-2">Clôture du Jour</h2>
              <p className="text-[11px] text-white/80 leading-relaxed font-light">Le solde actuel tient compte de toutes les opérations validées en caisse aujourd'hui.</p>
            </div>
            
            <div className="flex flex-wrap gap-2 relative z-10">
              <span className="text-[10px] font-medium bg-white/20 backdrop-blur-md border border-white/10 px-2.5 py-1.5 rounded-md flex items-center"><svg className="w-3 h-3 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> +160 000 FCFA</span>
              <span className="text-[10px] font-medium bg-white/20 backdrop-blur-md border border-white/10 px-2.5 py-1.5 rounded-md flex items-center"><svg className="w-3 h-3 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Validé</span>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};
