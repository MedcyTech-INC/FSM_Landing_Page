import React from "react";
import { AlertCircle, Clock, Map, Activity, Layers, ArrowRight, ShieldCheck } from "lucide-react";

export default function ProblemSection() {
  const challenges = [
    { icon: <Map size={20} />, title: "Unverified Field Visits", desc: "No real-time proof of location for territory officers." },
    { icon: <Clock size={20} />, title: "Attendance & Payroll Gaps", desc: "Manual punch-ins leading to errors and delays." },
    { icon: <Activity size={20} />, title: "Fragmented Visibility", desc: "No central view of multi-branch operations." },
    { icon: <AlertCircle size={20} />, title: "Uncoordinated Activity", desc: "Overlapping territory visits and missed targets." },
    { icon: <Layers size={20} />, title: "Disconnected Tools", desc: "Separate apps for HR, mapping, and CRM." },
  ];

  return (
    <section className="py-24 sm:py-28 bg-transparent relative overflow-hidden" id="problem">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-1.5 bg-rose-500/10 text-rose-600 text-xs font-escucha uppercase tracking-widest font-bold rounded-full mb-4 border border-rose-200/80 shadow-xs">
            THE FRAGMENTATION GAP
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-nohemi text-slate-900 mb-6 tracking-tight leading-[1.2]">
            Your Workforce Is Connected.{" "}
            <span className="font-culture font-normal italic text-brand-blue block sm:inline mt-1 sm:mt-0">
              Your Operations Should Be Too.
            </span>
          </h2>
          <p className="text-lg font-nohemi text-slate-700 max-w-2xl mx-auto leading-relaxed">
            As healthcare organizations expand across branches and territories, disconnected systems make it harder to verify attendance, coordinate field visits and maintain operational accountability.
          </p>
        </div>

        {/* Double-Bezel Main Comparison Architecture */}
        <div className="bg-white/70 backdrop-blur-xl rounded-[2rem] p-2.5 sm:p-3.5 border border-blue-200/60 shadow-[0_20px_50px_rgba(22,119,255,0.06)] mb-12">
          <div className="bg-white/95 rounded-[calc(2rem-0.75rem)] p-8 md:p-12 relative overflow-hidden border border-slate-100">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-ice-blue rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
              {/* Fragmented Operations */}
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-red-50 text-red-600 text-xs font-escucha uppercase tracking-widest font-bold rounded-full mb-6 border border-red-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                  OPERATIONAL BLIND SPOTS
                </div>
                
                <div className="flex flex-col gap-3.5 relative before:absolute before:left-6 before:top-4 before:bottom-4 before:w-px before:bg-slate-200">
                  {challenges.map((item, i) => (
                    <div key={i} className="flex gap-4 relative group">
                      <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 shadow-xs z-10 shrink-0 group-hover:border-rose-300 group-hover:text-rose-500 transition-colors">
                        {item.icon}
                      </div>
                      <div className="pt-1.5 bg-slate-50/70 group-hover:bg-white rounded-xl p-3 border border-slate-200/60 group-hover:border-rose-100 group-hover:shadow-sm transition-all flex-1">
                        <h4 className="text-sm font-bold font-nohemi text-slate-900">{item.title}</h4>
                        <p className="text-sm font-nohemi text-slate-600 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Unified Operations (Comparison) */}
              <div className="lg:pl-8 lg:border-l border-slate-200/80 h-full flex flex-col justify-center">
                <div className="bg-gradient-to-b from-white to-blue-50/30 rounded-2xl shadow-xl border border-blue-100 p-8 sm:p-10 text-center relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brand-blue via-blue-500 to-electric-cyan"></div>
                  
                  <div className="w-20 h-20 mx-auto bg-gradient-to-tr from-blue-500/10 to-electric-cyan/20 rounded-2xl flex items-center justify-center mb-6 border border-blue-200/80 relative shadow-inner">
                    <div className="absolute inset-0 rounded-2xl border border-electric-cyan animate-ping opacity-25"></div>
                    <ShieldCheck size={36} className="text-brand-blue" />
                  </div>
                  
                  <h3 className="text-2xl font-bold font-nohemi text-slate-900 mb-3">The Unified FIELDCRUX Advantage</h3>
                  <p className="text-slate-600 text-sm mb-8 leading-relaxed font-nohemi max-w-md mx-auto">
                    Replace fragmented tools with a single, synchronized platform that connects HR data, real-time geofencing, and field force execution.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 text-left">
                    <div className="bg-white/90 p-5 rounded-xl border border-blue-100 shadow-xs hover:border-electric-cyan/50 transition-colors">
                      <div className="font-escucha text-4xl font-bold text-electric-cyan mb-1 tracking-wider">100%</div>
                      <div className="text-xs text-slate-600 font-bold font-nohemi uppercase tracking-wider">Verified Location</div>
                    </div>
                    <div className="bg-white/90 p-5 rounded-xl border border-blue-100 shadow-xs hover:border-brand-blue/50 transition-colors">
                      <div className="font-escucha text-4xl font-bold text-brand-blue mb-1 tracking-wider">ZERO</div>
                      <div className="text-xs text-slate-600 font-bold font-nohemi uppercase tracking-wider">Payroll Gaps</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center max-w-3xl mx-auto">
          <div className="p-7 sm:p-8 bg-white/85 backdrop-blur-md rounded-2xl border border-blue-200/80 shadow-[0_10px_30px_rgba(22,119,255,0.05)]">
            <p className="text-base sm:text-lg font-medium font-nohemi text-slate-800 leading-relaxed">
              The challenge is not simply managing employees or tracking locations. <br className="hidden md:block"/>
              <span className="font-culture font-normal italic text-brand-blue text-xl sm:text-2xl mt-1 block">
                It is maintaining operational accountability across the workforce and field network from one system.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
