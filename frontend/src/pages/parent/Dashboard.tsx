import { useAuthStore } from '../../store/authStore';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { name: '23 Sep', present: 10, absent: 5 },
  { name: '24 Sep', present: 40, absent: 25 },
  { name: '25 Sep', present: 30, absent: 40 },
  { name: '26 Sep', present: 85, absent: 35 }, 
  { name: '27 Sep', present: 50, absent: 80 }, 
  { name: '28 Sep', present: 40, absent: 50 },
  { name: '29 Sep', present: 60, absent: 30 },
  { name: '30 Sep', present: 20, absent: 15 },
  { name: '01 Oct', present: 10, absent: 5 },
];

export const ParentDashboard = () => {
  // const { user } = useAuthStore();

  return (
    <div className="p-4 lg:p-8 font-sora bg-[#f4f6f8] min-h-screen text-gray-800">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">23 September, 2024</p>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-6">
        {/* Left Column (Main) */}
        <div className="flex-1 space-y-6 min-w-0">
          
          {/* Tabs */}
          <div className="flex items-center space-x-4 mb-2">
            <span className="text-gray-800 font-semibold text-lg">Student <span className="text-gray-400 font-normal">/ Teacher</span></span>
            <div className="flex space-x-1 bg-white rounded-full p-1 shadow-sm">
              <button className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-500"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></button>
              <button className="w-8 h-8 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-700"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg></button>
            </div>
          </div>

          {/* Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-[24px] shadow-sm flex flex-col justify-between border border-white hover:border-orange-100 transition-colors">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 mb-6">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <div>
                <p className="text-gray-500 text-[13px] mb-1">Presentation</p>
                <p className="text-2xl font-bold text-gray-800"><span className="text-orange-500">8</span><span className="text-[16px] text-gray-400">/20</span></p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-[24px] shadow-sm flex flex-col justify-between border border-white hover:border-emerald-100 transition-colors">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-6">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
              </div>
              <div>
                <p className="text-gray-500 text-[13px] mb-1">Examination</p>
                <p className="text-2xl font-bold text-gray-800"><span className="text-emerald-600">3</span><span className="text-[16px] text-gray-400">/10</span></p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-[24px] shadow-sm flex flex-col justify-between border border-white hover:border-gray-200 transition-colors">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-800 mb-6">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </div>
              <div>
                <p className="text-gray-500 text-[13px] mb-1">Reports</p>
                <p className="text-2xl font-bold text-gray-800">6<span className="text-[16px] text-gray-400">/15</span></p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-[24px] shadow-sm flex flex-col justify-between">
               <div className="flex justify-between items-center mb-4">
                 <h3 className="text-[13px] font-bold text-gray-800">Course Statistics</h3>
                 <button className="text-gray-300 hover:text-gray-500"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg></button>
               </div>
               <div className="space-y-3">
                 <div className="flex items-center justify-between">
                   <span className="text-[11px] font-semibold text-gray-600 w-20">Done</span>
                   <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden mx-2"><div className="bg-orange-400 h-full w-[45%] rounded-full"></div></div>
                   <span className="text-[11px] text-gray-400 font-medium w-8 text-right">45%</span>
                 </div>
                 <div className="flex items-center justify-between">
                   <span className="text-[11px] font-semibold text-gray-600 w-20">On Progress</span>
                   <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden mx-2"><div className="bg-emerald-600 h-full w-[85%] rounded-full"></div></div>
                   <span className="text-[11px] text-gray-400 font-medium w-8 text-right">85%</span>
                 </div>
                 <div className="flex items-center justify-between">
                   <span className="text-[11px] font-semibold text-gray-600 w-20">To Do</span>
                   <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden mx-2"><div className="bg-gray-800 h-full w-[32%] rounded-full"></div></div>
                   <span className="text-[11px] text-gray-400 font-medium w-8 text-right">32%</span>
                 </div>
               </div>
            </div>
          </div>

          {/* Chart Area */}
          <div className="bg-white p-6 rounded-[24px] shadow-sm h-[320px] flex flex-col relative">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-800">Total Attendance Report</h2>
              <div className="flex items-center space-x-4 text-xs font-medium">
                <span className="flex items-center text-gray-500"><span className="w-2 h-2 rounded-full bg-orange-400 mr-1.5"></span> Present</span>
                <span className="flex items-center text-gray-500"><span className="w-2 h-2 rounded-full bg-emerald-600 mr-1.5"></span> Absence</span>
                <button className="text-gray-300 hover:text-gray-500 ml-2"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg></button>
              </div>
            </div>
            
            <div className="absolute top-28 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center">
              <div className="bg-orange-400 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md">128</div>
              <div className="w-px h-24 border-l-2 border-dashed border-gray-200 mt-1"></div>
            </div>

            <div className="flex-1 w-full min-h-0 relative z-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorPresent" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#fb923c" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#fb923c" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorAbsent" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#059669" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={true} stroke="#f3f4f6" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#9ca3af', fontWeight: 500}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#9ca3af', fontWeight: 500}} tickFormatter={(value) => `${value}%`} />
                  <Tooltip 
                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'}}
                  />
                  <Area type="monotone" dataKey="present" stroke="#fb923c" strokeWidth={0} fillOpacity={1} fill="url(#colorPresent)" />
                  <Area type="monotone" dataKey="absent" stroke="#059669" strokeWidth={0} fillOpacity={1} fill="url(#colorAbsent)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Table Area */}
          <div className="bg-white p-6 rounded-[24px] shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-800">Visualize your academic success</h2>
              <button className="text-[11px] text-orange-500 bg-orange-50 px-3 py-1.5 rounded-full font-medium flex items-center">
                Annual Exam <svg className="w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[600px]">
                <thead>
                  <tr className="text-[12px] text-gray-400 border-b border-gray-100">
                    <th className="pb-3 font-medium px-2">Profile</th>
                    <th className="pb-3 font-medium px-2">Name</th>
                    <th className="pb-3 font-medium px-2">Student ID</th>
                    <th className="pb-3 font-medium px-2">Group</th>
                    <th className="pb-3 font-medium px-2">Mark-sheet</th>
                    <th className="pb-3 font-medium px-2"></th>
                  </tr>
                </thead>
                <tbody className="text-[13px]">
                  <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-3 px-2"><img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-9 h-9 rounded-full bg-gray-200" /></td>
                    <td className="py-3 px-2">
                      <p className="font-semibold text-gray-800">Antwan Graham</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">Class XI</p>
                    </td>
                    <td className="py-3 px-2 text-gray-500 font-medium">M-62358</td>
                    <td className="py-3 px-2 text-gray-500">Science</td>
                    <td className="py-3 px-2 font-semibold text-orange-500">98<span className="text-gray-400 font-medium">/100</span></td>
                    <td className="py-3 px-2 text-right">
                      <button className="text-orange-500 text-[11px] bg-orange-50 hover:bg-orange-100 px-4 py-1.5 rounded-full font-semibold transition-colors">Edit Profile</button>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3 px-2"><img src="https://i.pravatar.cc/150?img=12" alt="Profile" className="w-9 h-9 rounded-full bg-gray-200" /></td>
                    <td className="py-3 px-2">
                      <p className="font-semibold text-gray-800">Dwight Brown</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">Class XI</p>
                    </td>
                    <td className="py-3 px-2 text-gray-500 font-medium">M-62358</td>
                    <td className="py-3 px-2 text-gray-500">Science</td>
                    <td className="py-3 px-2 font-semibold text-gray-800">98<span className="text-gray-400 font-medium">/100</span></td>
                    <td className="py-3 px-2 text-right">
                      <button className="text-blue-500 text-[11px] bg-blue-50 hover:bg-blue-100 px-4 py-1.5 rounded-full font-semibold transition-colors">Edit Profile</button>
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
              <h2 className="text-[15px] font-bold text-gray-800">Course Schedule</h2>
              <button className="text-gray-300 hover:text-gray-500"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg></button>
            </div>
            <p className="text-[11px] text-gray-400 mb-6">Here's your schedule activity for today</p>
            
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
                {name: 'Britt Gamble', role: 'Sr. UI/UX designer', img: 'https://i.pravatar.cc/150?img=33'},
                {name: 'Steven Williamson', role: 'Project Manager', img: 'https://i.pravatar.cc/150?img=13'},
                {name: 'Conrad Glass', role: 'Course Mentor', img: 'https://i.pravatar.cc/150?img=14'},
              ].map((person, i) => (
                <div key={i} className="flex items-center justify-between group">
                  <div className="flex items-center space-x-3">
                    <img src={person.img} alt={person.name} className="w-10 h-10 rounded-full bg-gray-200 object-cover" />
                    <div>
                      <p className="font-bold text-[13px] text-gray-800">{person.name}</p>
                      <p className="text-[11px] text-gray-400">{person.role}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2 text-gray-400">
                    <button className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center hover:bg-gray-50 hover:text-gray-600 transition-colors"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></button>
                    <button className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center hover:bg-gray-50 hover:text-gray-600 transition-colors"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg></button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Course Gradient Card */}
          <div className="bg-gradient-to-br from-[#c9a786] via-[#7d9b7b] to-[#25654b] p-6 rounded-[24px] text-white shadow-xl shadow-emerald-900/10 relative overflow-hidden">
            {/* Decorative background blurs */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-10 rounded-full blur-3xl transform translate-x-10 -translate-y-10"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-900 opacity-20 rounded-full blur-2xl transform -translate-x-10 translate-y-10"></div>
            
            <div className="flex justify-between items-center mb-10 relative z-10">
              <h3 className="font-semibold text-sm">Upcoming Course</h3>
              <button className="text-[11px] bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full transition-colors font-medium">Learn more</button>
            </div>
            
            <div className="relative z-10 mb-6">
              <h2 className="text-2xl font-bold mb-2">UI/UX design</h2>
              <p className="text-[11px] text-white/80 leading-relaxed font-light">Our design process is focused on understanding user behavior, creating visually appealing layouts</p>
            </div>
            
            <div className="flex flex-wrap gap-2 relative z-10">
              <span className="text-[10px] font-medium bg-white/20 backdrop-blur-md border border-white/10 px-2.5 py-1.5 rounded-md flex items-center"><svg className="w-3 h-3 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> 10AM -12PM</span>
              <span className="text-[10px] font-medium bg-white/20 backdrop-blur-md border border-white/10 px-2.5 py-1.5 rounded-md flex items-center"><svg className="w-3 h-3 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> 16th Oct</span>
              <span className="text-[10px] font-medium bg-white/20 backdrop-blur-md border border-white/10 px-2.5 py-1.5 rounded-md flex items-center"><svg className="w-3 h-3 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg> Zoom Link</span>
            </div>
          </div>
          
          {/* Bottom Right Course Statistics */}
          <div className="bg-white p-5 rounded-[24px] shadow-sm flex justify-between items-center opacity-80">
            <h3 className="text-[13px] font-bold text-gray-800">Course Statistics</h3>
            <button className="text-gray-300 hover:text-gray-500"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg></button>
          </div>

        </div>
      </div>
    </div>
  );
};
