import React from "react";
import { ArrowRight, ArrowDown } from "lucide-react";

export default function WorkflowSection() {
  const workforceFlow = [
    "Staff Onboarding",
    "Geofenced Selfie Punch",
    "Shift & Task Execution",
    "Leave & Manager Approval",
    "Payroll & Payslip",
  ];

  const fieldFlow = [
    "Schedule Visit",
    "Arrive at Clinic/Doctor",
    "GPS Geotag Verification",
    "Log Call & Notes",
    "Manager Review",
    "Live Map Visibility",
  ];

  const hierarchy = [
    "Executive Director",
    "Senior Manager",
    "Branch Operations Manager",
    "Team Lead/RSM",
    "Staff/Field Officer"
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-[#E9F3FC] via-[#E0EDF9] to-[#EAF4FD] relative overflow-hidden" id="workflow">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 right-10 w-80 h-80 bg-electric-cyan/15 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-block px-3.5 py-1 bg-blue-500/10 text-brand-blue text-[11px] font-escucha uppercase tracking-widest font-bold rounded-full mb-3 border border-blue-200/80 shadow-xs">
            TRACEABLE ARCHITECTURE
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-nohemi text-slate-900 mb-2.5 tracking-tight leading-[1.2]">
            From <span className="font-flaviotte font-normal italic text-brand-blue">Execution</span> to <span className="font-culture font-normal italic text-slate-900">Visibility</span>.
          </h2>
          <p className="text-sm sm:text-base font-nohemi text-slate-700 max-w-2xl mx-auto leading-relaxed">
            End-to-end traceability for every action taken by your workforce and field teams.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          {/* Main Workflows (spanning 8 columns on desktop) */}
          <div className="lg:col-span-8 flex flex-col gap-4 sm:gap-5 justify-between">
            
            {/* Workforce Flow Double-Bezel */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-2 sm:p-2.5 border border-blue-200/70 shadow-[0_12px_30px_rgba(22,119,255,0.06)]">
              <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-100 shadow-xs">
                <div className="flex items-center gap-2.5 mb-4 border-b border-slate-100 pb-2.5">
                  <div className="w-2 h-5 bg-brand-blue rounded-full"></div>
                  <h3 className="text-base font-bold font-nohemi text-slate-900">Workforce Flow</h3>
                </div>
                
                {/* Steps with connecting line and arrows */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0">
                  {workforceFlow.map((step, i) => (
                    <React.Fragment key={i}>
                      {/* Step node */}
                      <div className="flex flex-row md:flex-col items-center gap-3 md:gap-2 text-center group flex-1 w-full md:w-auto">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-blue to-blue-600 text-white flex items-center justify-center font-escucha text-xs font-bold shadow-[0_3px_10px_rgba(22,119,255,0.35)] shrink-0 group-hover:scale-105 transition-transform z-10">
                          0{i + 1}
                        </div>
                        <div className="bg-slate-50/90 group-hover:bg-blue-50/50 group-hover:border-blue-200 transition-colors px-2 py-1.5 rounded-lg border border-slate-200/80 text-[11px] sm:text-xs font-nohemi font-semibold text-slate-800 text-left md:text-center w-full md:w-24 shadow-2xs">
                          {step}
                        </div>
                      </div>

                      {/* Connecting line with arrow between steps (Desktop) */}
                      {i < workforceFlow.length - 1 && (
                        <div className="hidden md:flex items-center justify-center w-6 shrink-0 -mt-6">
                          <div className="w-full flex items-center">
                            <div className="h-0.5 bg-blue-200 flex-1"></div>
                            <ArrowRight size={13} className="text-brand-blue -ml-1 shrink-0" />
                          </div>
                        </div>
                      )}

                      {/* Connecting arrow between steps (Mobile) */}
                      {i < workforceFlow.length - 1 && (
                        <ArrowDown size={14} className="text-brand-blue/70 md:hidden my-0.5 shrink-0" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* Field Operations Flow Double-Bezel */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-2 sm:p-2.5 border border-blue-200/70 shadow-[0_12px_30px_rgba(22,119,255,0.06)]">
              <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-100 shadow-xs">
                <div className="flex items-center gap-2.5 mb-4 border-b border-slate-100 pb-2.5">
                  <div className="w-2 h-5 bg-electric-cyan rounded-full"></div>
                  <h3 className="text-base font-bold font-nohemi text-slate-900">Field Operations Flow</h3>
                </div>
                
                {/* Steps with connecting line and arrows */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0">
                  {fieldFlow.map((step, i) => (
                    <React.Fragment key={i}>
                      {/* Step node */}
                      <div className="flex flex-row md:flex-col items-center gap-3 md:gap-2 text-center group flex-1 w-full md:w-auto">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-600 to-electric-cyan text-slate-950 flex items-center justify-center font-escucha text-xs font-black shadow-[0_3px_10px_rgba(8,213,245,0.35)] shrink-0 group-hover:scale-105 transition-transform z-10">
                          0{i + 1}
                        </div>
                        <div className="bg-slate-50/90 group-hover:bg-cyan-50/50 group-hover:border-cyan-200 transition-colors px-1.5 py-1.5 rounded-lg border border-slate-200/80 text-[11px] sm:text-xs font-nohemi font-semibold text-slate-800 text-left md:text-center w-full md:w-20 shadow-2xs">
                          {step}
                        </div>
                      </div>

                      {/* Connecting line with arrow between steps (Desktop) */}
                      {i < fieldFlow.length - 1 && (
                        <div className="hidden md:flex items-center justify-center w-5 shrink-0 -mt-6">
                          <div className="w-full flex items-center">
                            <div className="h-0.5 bg-cyan-200 flex-1"></div>
                            <ArrowRight size={13} className="text-cyan-500 -ml-1 shrink-0" />
                          </div>
                        </div>
                      )}

                      {/* Connecting arrow between steps (Mobile) */}
                      {i < fieldFlow.length - 1 && (
                        <ArrowDown size={14} className="text-cyan-500 md:hidden my-0.5 shrink-0" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
            
          </div>

          {/* Hierarchy (spanning 4 columns on desktop) */}
          <div className="lg:col-span-4 bg-[#0B1526] rounded-2xl shadow-xl border border-blue-900/40 p-4 sm:p-5 text-white relative overflow-hidden flex flex-col justify-between">
            {/* Decorative background */}
            <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none"></div>
            
            <div>
              <h3 className="text-base font-bold font-nohemi mb-3.5 border-b border-slate-800 pb-2.5 text-white/90">
                Operational Hierarchy
              </h3>
              
              <div className="flex flex-col relative space-y-2.5">
                <div className="absolute left-[13px] top-3 bottom-4 w-0.5 bg-slate-700 pointer-events-none"></div>
                
                {hierarchy.map((role, i) => (
                  <div key={i} className="flex items-start gap-3 relative z-10">
                    <div className="w-7 h-7 rounded-lg bg-slate-800/90 border border-slate-600/90 flex items-center justify-center shrink-0 shadow-xs">
                      <ArrowDown size={13} className="text-electric-cyan" />
                    </div>
                    <div className="pt-0.5">
                      <div className="text-xs sm:text-sm font-semibold font-nohemi text-slate-100">{role}</div>
                      <div className="text-[10px] sm:text-[11px] font-nohemi text-slate-400 mt-0.5">
                        {i === 0 && "Full cross-branch visibility"}
                        {i === 1 && "Regional operations oversight"}
                        {i === 2 && "Branch-level approvals"}
                        {i === 3 && "Team target management"}
                        {i === 4 && "Daily task execution"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
