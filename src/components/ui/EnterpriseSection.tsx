import React from "react";
import { Building2, MapPin, Shield, Layers, CheckSquare, UploadCloud, Settings, ChevronRight } from "lucide-react";

export default function EnterpriseSection() {
  const capabilities = [
    { icon: <Building2 size={24} />, title: "Multi-branch Architecture", desc: "Manage multiple clinic locations and regional offices from a single tenant." },
    { icon: <MapPin size={24} />, title: "Geofenced & GPS Verification", desc: "Enforce attendance bounds and verify field visit locations automatically." },
    { icon: <Shield size={24} />, title: "Role-Based Access", desc: "Strict data visibility controls based on organizational hierarchy." },
    { icon: <CheckSquare size={24} />, title: "Structured Approvals", desc: "Multi-tier workflow for leaves, visits, and payroll processing." },
    { icon: <UploadCloud size={24} />, title: "Bulk Data Onboarding", desc: "Import staff, territories, and historical records via Excel." },
    { icon: <Settings size={24} />, title: "Enterprise Configuration", desc: "Customizable shifts, leave policies, and reporting structures." }
  ];

  return (
    <section className="py-24 sm:py-28 bg-gradient-to-b from-[#EAF4FD] via-[#F2F7FE] to-[#E9F3FC] relative overflow-hidden" id="enterprise">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-brand-blue/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 -left-20 w-96 h-96 bg-electric-cyan/15 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-1.5 bg-blue-500/10 text-brand-blue text-xs font-escucha uppercase tracking-widest font-bold rounded-full mb-4 border border-blue-200/80 shadow-xs">
            ENTERPRISE ARCHITECTURE
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-nohemi text-slate-900 mb-4 tracking-tight leading-[1.2]">
            Built for <span className="font-culture font-normal italic text-brand-blue">Distributed Healthcare</span> Operations.
          </h2>
          <p className="text-lg font-nohemi text-slate-700 max-w-2xl mx-auto leading-relaxed">
            Enterprise-grade architecture designed for complex healthcare networks, hospital chains, and regional diagnostic centers.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 mb-16">
          {/* Large Capability Block Double-Bezel */}
          <div className="lg:col-span-5 bg-white/80 backdrop-blur-xl rounded-[2rem] p-2.5 sm:p-3.5 border border-blue-200/70 shadow-[0_20px_50px_rgba(22,119,255,0.06)] flex flex-col">
            <div className="bg-gradient-to-b from-white to-slate-50/50 rounded-[calc(2rem-0.75rem)] p-8 flex flex-col h-full relative overflow-hidden border border-slate-100">
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-transparent to-ice-blue/40 pointer-events-none"></div>
              
              <div className="relative z-10 mb-8">
                <div className="w-14 h-14 bg-white rounded-2xl border border-blue-100 flex items-center justify-center text-brand-blue mb-6 shadow-sm">
                  <Layers size={26} />
                </div>
                <h3 className="text-2xl font-bold font-nohemi text-slate-900 mb-4">Centralized Visibility</h3>
                <p className="text-slate-600 leading-relaxed font-nohemi text-sm sm:text-base">
                  Connect your entire operational footprint. Monitor branch-level attendance, regional field performance, and executive-level summaries without switching systems or consolidating spreadsheets.
                </p>
              </div>
              
              <div className="mt-auto relative z-10 bg-white/95 border border-slate-200/80 rounded-2xl p-5 shadow-xs">
                <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-2">
                  <span className="text-xs font-bold font-escucha uppercase tracking-wider text-slate-500">Network Status</span>
                  <span className="text-xs font-bold font-escucha uppercase tracking-wider text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-200">All Systems Nominal</span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-nohemi text-slate-600">Active Branches</span>
                    <span className="text-sm font-bold font-nohemi text-slate-900">Regional Network</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-blue w-full"></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-nohemi text-slate-600">Field Territories</span>
                    <span className="text-sm font-bold font-nohemi text-slate-900">Mapped & Active</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-electric-cyan w-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Capability Grid */}
          <div className="lg:col-span-7 grid md:grid-cols-2 gap-4">
            {capabilities.map((cap, i) => (
              <div key={i} className="bg-white/95 backdrop-blur-sm border border-slate-200/80 rounded-2xl p-6 hover:border-brand-blue/40 hover:shadow-lg transition-all group">
                <div className="w-12 h-12 bg-blue-50/70 rounded-xl border border-blue-100 flex items-center justify-center text-slate-700 mb-4 group-hover:bg-brand-blue group-hover:text-white transition-all shadow-2xs">
                  {cap.icon}
                </div>
                <h4 className="text-base font-bold font-nohemi text-slate-900 mb-2">{cap.title}</h4>
                <p className="text-sm font-nohemi text-slate-600 leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Positioning */}
        <div className="bg-[#0B1526] rounded-[2rem] p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden border border-blue-900/40 shadow-xl">
          <div className="absolute top-0 right-0 bottom-0 w-1/2 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-blue/20 to-transparent"></div>
          
          <div className="relative z-10 max-w-2xl">
            <h3 className="text-2xl font-bold font-nohemi text-white mb-3">Custom Enterprise Deployment</h3>
            <p className="text-slate-300 font-nohemi text-sm sm:text-base leading-relaxed">
              Configuration depends on your employee count, branches, field territories, geofence requirements, data migration, and implementation support needs.
            </p>
          </div>
          
          <div className="relative z-10 shrink-0 w-full md:w-auto">
            <a href="#demo" className="block w-full text-center bg-electric-cyan hover:bg-[#06b8d4] text-slate-950 font-bold font-nohemi px-8 py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(8,213,245,0.3)] hover:shadow-[0_0_30px_rgba(8,213,245,0.5)] active:scale-95">
              Request Custom Quote
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
