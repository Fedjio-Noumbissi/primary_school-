
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { name: 'Lun', success: 75, fail: 25 },
  { name: 'Mar', success: 80, fail: 20 },
  { name: 'Mer', success: 65, fail: 35 },
  { name: 'Jeu', success: 90, fail: 10 }, 
  { name: 'Ven', success: 85, fail: 15 }, 
];

export const EnseignantDashboard = () => {
  // const { user } = useAuthStore();

  return (
    <div className="p-4 lg:p-8 font-sora bg-[#f4f6f8] min-h-screen text-gray-800">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Espace Enseignant</h1>
          <p className="text-sm text-gray-500 mt-1">23 Septembre, 2024</p>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-6">
        {/* Left Column (Main) */}
        <div className="flex-1 space-y-6 min-w-0">
          
          {/* Tabs */}
          <div className="flex items-center space-x-4 mb-2">
            <span className="text-gray-800 font-semibold text-lg">Classes <span className="text-gray-400 font-normal">/ Évaluations</span></span>
            <div className="flex space-x-1 bg-white rounded-full p-1 shadow-sm">
              <button className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-500"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></button>
              <button className="w-8 h-8 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-700"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg></button>
            </div>
          </div>

          {/* Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-[24px] shadow-sm flex flex-col justify-between border border-white hover:border-orange-100 transition-colors">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 mb-6">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              </div>
              <div>
                <p className="text-gray-500 text-[13px] mb-1">Mes Classes</p>
                <p className="text-2xl font-bold text-gray-800"><span className="text-orange-500">2</span></p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-[24px] shadow-sm flex flex-col justify-between border border-white hover:border-emerald-100 transition-colors">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-6">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              </div>
              <div>
                <p className="text-gray-500 text-[13px] mb-1">Évaluations (à corriger)</p>
                <p className="text-2xl font-bold text-gray-800"><span className="text-emerald-600">5</span></p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-[24px] shadow-sm flex flex-col justify-between border border-white hover:border-gray-200 transition-colors">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-800 mb-6">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                <p className="text-gray-500 text-[13px] mb-1">Cours du jour</p>
                <p className="text-2xl font-bold text-gray-800">3</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-[24px] shadow-sm flex flex-col justify-between">
               <div className="flex justify-between items-center mb-4">
                 <h3 className="text-[13px] font-bold text-gray-800">Statistiques Classe</h3>
                 <button className="text-gray-300 hover:text-gray-500"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg></button>
               </div>
               <div className="space-y-3">
                 <div className="flex items-center justify-between">
                   <span className="text-[11px] font-semibold text-gray-600 w-20">Moy. &gt; 10</span>
                   <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden mx-2"><div className="bg-orange-400 h-full w-[75%] rounded-full"></div></div>
                   <span className="text-[11px] text-gray-400 font-medium w-8 text-right">75%</span>
                 </div>
                 <div className="flex items-center justify-between">
                   <span className="text-[11px] font-semibold text-gray-600 w-20">Assiduité</span>
                   <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden mx-2"><div className="bg-emerald-600 h-full w-[95%] rounded-full"></div></div>
                   <span className="text-[11px] text-gray-400 font-medium w-8 text-right">95%</span>
                 </div>
                 <div className="flex items-center justify-between">
                   <span className="text-[11px] font-semibold text-gray-600 w-20">Retards</span>
                   <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden mx-2"><div className="bg-gray-800 h-full w-[12%] rounded-full"></div></div>
                   <span className="text-[11px] text-gray-400 font-medium w-8 text-right">12%</span>
                 </div>
               </div>
            </div>
          </div>

          {/* Chart Area */}
          <div className="bg-white p-6 rounded-[24px] shadow-sm h-[320px] flex flex-col relative">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-800">Performances globales des élèves</h2>
              <div className="flex items-center space-x-4 text-xs font-medium">
                <span className="flex items-center text-gray-500"><span className="w-2 h-2 rounded-full bg-orange-400 mr-1.5"></span> Réussite</span>
                <span className="flex items-center text-gray-500"><span className="w-2 h-2 rounded-full bg-emerald-600 mr-1.5"></span> Échec</span>
              </div>
            </div>
            
            <div className="absolute top-28 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center">
              <div className="bg-orange-400 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md">90%</div>
              <div className="w-px h-24 border-l-2 border-dashed border-gray-200 mt-1"></div>
            </div>

            <div className="flex-1 w-full min-h-0 relative z-0">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#fb923c" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#fb923c" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorFail" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#059669" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={true} stroke="#f3f4f6" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#9ca3af', fontWeight: 500}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#9ca3af', fontWeight: 500}} tickFormatter={(value) => `${value}%`} />
                  <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'}} />
                  <Area type="monotone" dataKey="success" stroke="#fb923c" strokeWidth={0} fillOpacity={1} fill="url(#colorSuccess)" />
                  <Area type="monotone" dataKey="fail" stroke="#059669" strokeWidth={0} fillOpacity={1} fill="url(#colorFail)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Table Area */}
          <div className="bg-white p-6 rounded-[24px] shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-800">Dernières évaluations corrigées</h2>
              <button className="text-[11px] text-orange-500 bg-orange-50 px-3 py-1.5 rounded-full font-medium flex items-center">
                Classe : SIL <svg className="w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[600px]">
                <thead>
                  <tr className="text-[12px] text-gray-400 border-b border-gray-100">
                    <th className="pb-3 font-medium px-2">Élève</th>
                    <th className="pb-3 font-medium px-2">Nom</th>
                    <th className="pb-3 font-medium px-2">Matricule</th>
                    <th className="pb-3 font-medium px-2">Discipline</th>
                    <th className="pb-3 font-medium px-2">Note</th>
                    <th className="pb-3 font-medium px-2"></th>
                  </tr>
                </thead>
                <tbody className="text-[13px]">
                  <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-3 px-2"><img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-9 h-9 rounded-full bg-gray-200" /></td>
                    <td className="py-3 px-2">
                      <p className="font-semibold text-gray-800">Antwan Graham</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">Section SIL</p>
                    </td>
                    <td className="py-3 px-2 text-gray-500 font-medium">M-62358</td>
                    <td className="py-3 px-2 text-gray-500">Mathématiques</td>
                    <td className="py-3 px-2 font-semibold text-orange-500">18<span className="text-gray-400 font-medium">/20</span></td>
                    <td className="py-3 px-2 text-right">
                      <button className="text-orange-500 text-[11px] bg-orange-50 hover:bg-orange-100 px-4 py-1.5 rounded-full font-semibold transition-colors">Modifier note</button>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3 px-2"><img src="https://i.pravatar.cc/150?img=12" alt="Profile" className="w-9 h-9 rounded-full bg-gray-200" /></td>
                    <td className="py-3 px-2">
                      <p className="font-semibold text-gray-800">Dwight Brown</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">Section SIL</p>
                    </td>
                    <td className="py-3 px-2 text-gray-500 font-medium">M-62359</td>
                    <td className="py-3 px-2 text-gray-500">Mathématiques</td>
                    <td className="py-3 px-2 font-semibold text-gray-800">14<span className="text-gray-400 font-medium">/20</span></td>
                    <td className="py-3 px-2 text-right">
                      <button className="text-blue-500 text-[11px] bg-blue-50 hover:bg-blue-100 px-4 py-1.5 rounded-full font-semibold transition-colors">Modifier note</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full xl:w-[340px] space-y-6 flex-shrink-0">
          
          {/* Course Schedule */}
          <div className="bg-white p-6 rounded-[24px] shadow-sm">
            <div className="flex justify-between items-center mb-1">
              <h2 className="text-[15px] font-bold text-gray-800">Emploi du temps</h2>
            </div>
            <p className="text-[11px] text-gray-400 mb-6">Vos cours prévus pour aujourd'hui</p>
            
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
                {name: 'Classe SIL', role: 'Mathématiques', time: '08:00 - 10:00'},
                {name: 'Classe CP', role: 'Lecture', time: '10:30 - 12:30'},
              ].map((course, i) => (
                <div key={i} className="flex items-center justify-between group">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 font-bold text-xs">{course.name.split(' ')[1]}</div>
                    <div>
                      <p className="font-bold text-[13px] text-gray-800">{course.name}</p>
                      <p className="text-[11px] text-gray-400">{course.role}</p>
                    </div>
                  </div>
                  <div className="text-[11px] text-gray-500 font-medium">
                    {course.time}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Course Gradient Card */}
          <div className="bg-gradient-to-br from-[#c9a786] via-[#7d9b7b] to-[#25654b] p-6 rounded-[24px] text-white shadow-xl shadow-emerald-900/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-10 rounded-full blur-3xl transform translate-x-10 -translate-y-10"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-900 opacity-20 rounded-full blur-2xl transform -translate-x-10 translate-y-10"></div>
            
            <div className="flex justify-between items-center mb-10 relative z-10">
              <h3 className="font-semibold text-sm">Prochain Cours</h3>
              <button className="text-[11px] bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full transition-colors font-medium">Détails</button>
            </div>
            
            <div className="relative z-10 mb-6">
              <h2 className="text-2xl font-bold mb-2">Mathématiques - SIL</h2>
              <p className="text-[11px] text-white/80 leading-relaxed font-light">Chapitre 4 : Les additions et soustractions simples. N'oubliez pas le matériel didactique.</p>
            </div>
            
            <div className="flex flex-wrap gap-2 relative z-10">
              <span className="text-[10px] font-medium bg-white/20 backdrop-blur-md border border-white/10 px-2.5 py-1.5 rounded-md flex items-center"><svg className="w-3 h-3 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> 08:00 - 10:00</span>
              <span className="text-[10px] font-medium bg-white/20 backdrop-blur-md border border-white/10 px-2.5 py-1.5 rounded-md flex items-center"><svg className="w-3 h-3 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg> Salle 1</span>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};
