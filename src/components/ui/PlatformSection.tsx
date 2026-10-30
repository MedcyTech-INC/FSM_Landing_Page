"use client";

import React, { useState } from "react";
import { Users, Map, CheckCircle2, ChevronRight, Activity, Calendar, FileText, CheckSquare, MessageSquare, Briefcase, Navigation, Mic, LocateFixed, Eye, MapPin, Compass } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PlatformSection() {
  const [activeTab, setActiveTab] = useState<"workforce" | "field">("workforce");

  const workforceFeatures = [
    { icon: <Users size={16} />, text: "Employee master & org hierarchy" },
    { icon: <FileText size={16} />, text: "Bulk Excel data import/export" },
    { icon: <CheckCircle2 size={16} />, text: "Geofenced selfie attendance" },
    { icon: <Calendar size={16} />, text: "Shift & leave quota management" },
    { icon: <CheckSquare size={16} />, text: "Kanban task execution" },
    { icon: <Briefcase size={16} />, text: "Payroll, payslips & advances" },
    { icon: <MessageSquare size={16} />, text: "Internal team chat" },
  ];

  const fieldFeatures = [
    { icon: <Map size={16} />, text: "Doctor & clinic visit planning" },
    { icon: <Briefcase size={16} />, text: "RSM target delegation" },
    { icon: <Navigation size={16} />, text: "GPS-tagged field execution" },
    { icon: <FileText size={16} />, text: "Prescription & potential capture" },
    { icon: <Mic size={16} />, text: "Discussion notes & audio summaries" },
    { icon: <CheckCircle2 size={16} />, text: "Multi-level visit approvals" },
    { icon: <Eye size={16} />, text: "Live agent visibility & breadcrumbs" },
  ];

  return (
    <section className="py-24 sm:py-28 bg-transparent relative overflow-hidden" id="solutions">
      <div id="platform" className="absolute -top-24 pointer-events-none" />
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-1.5 bg-blue-500/10 text-brand-blue text-xs font-escucha uppercase tracking-widest font-bold rounded-full mb-4 border border-blue-200/80 shadow-xs">
            DUAL OPERATIONAL ENGINE
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-nohemi text-slate-900 mb-4 tracking-tight leading-[1.2]">
            One Platform. <span className="font-flaviotte font-normal italic text-brand-blue">Two Operational Layers.</span>
          </h2>
          <p className="text-lg font-nohemi text-slate-700 max-w-2xl mx-auto leading-relaxed">
            Bring workforce management and field-force execution into a single operational view.
          </p>
        </div>

        {/* Double-Bezel Platform Container */}
        <div className="bg-white/75 backdrop-blur-xl rounded-[2rem] p-3 sm:p-4 border border-blue-200/70 shadow-[0_25px_60px_rgba(22,119,255,0.08)]">
          {/* Segmented Tab Pill Navigation */}
          <div className="grid grid-cols-2 p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200/70 mb-4">
            <button
              suppressHydrationWarning
              onClick={() => setActiveTab("workforce")}
              className={cn(
                "py-4 px-4 flex items-center justify-center gap-3 font-escucha tracking-widest font-bold transition-all duration-300 text-sm md:text-base uppercase rounded-xl",
                activeTab === "workforce" 
                  ? "bg-white text-brand-blue shadow-md border border-blue-200/90" 
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
              )}
            >
              <Users size={20} className={activeTab === "workforce" ? "text-brand-blue" : "text-slate-400"} />
              WORKFORCE MANAGEMENT
            </button>
            <button
              suppressHydrationWarning
              onClick={() => setActiveTab("field")}
              className={cn(
                "py-4 px-4 flex items-center justify-center gap-3 font-escucha tracking-widest font-bold transition-all duration-300 text-sm md:text-base uppercase rounded-xl",
                activeTab === "field" 
                  ? "bg-white text-cyan-600 shadow-md border border-cyan-300" 
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
              )}
            >
              <Map size={20} className={activeTab === "field" ? "text-cyan-500" : "text-slate-400"} />
              FIELD OPERATIONS
            </button>
          </div>

          {/* Main Content Area */}
          <div className="bg-white rounded-[calc(2rem-0.75rem)] border border-slate-200/80 overflow-hidden shadow-xs">
            <div className="grid lg:grid-cols-12 min-h-[500px]">
              {/* Left Content area */}
              <div className="lg:col-span-4 p-8 md:p-12 border-r border-slate-100 bg-gradient-to-b from-white to-slate-50/40">
                <h3 className="text-2xl font-bold font-nohemi text-slate-900 mb-6">
                  {activeTab === "workforce" ? "Centralized HR & Staffing" : "Precision Field Execution"}
                </h3>
              
              <ul className="space-y-4">
                {(activeTab === "workforce" ? workforceFeatures : fieldFeatures).map((feat, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className={cn("mt-0.5 w-6 h-6 rounded flex items-center justify-center shrink-0", activeTab === "workforce" ? "bg-blue-50 text-brand-blue" : "bg-cyan-50 text-electric-cyan")}>
                      {feat.icon}
                    </div>
                    <span className="text-sm font-medium text-secondary-text">{feat.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Dashboard area */}
            <div className="lg:col-span-8 bg-slate-50 p-6 md:p-12 relative overflow-hidden flex items-center justify-center">
              
              {/* Workforce UI Mockup */}
              <div className={cn("w-full max-w-2xl bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden transition-all duration-500 absolute", activeTab === "workforce" ? "opacity-100 translate-y-0 relative z-10" : "opacity-0 translate-y-4 pointer-events-none")}>
                <div className="h-10 bg-slate-100 border-b border-slate-200 flex items-center px-4 justify-between">
                   <div className="flex gap-4">
                     <span className="text-[11px] font-semibold text-brand-blue border-b-2 border-brand-blue pb-2 pt-2">Attendance</span>
                     <span className="text-[11px] font-semibold text-slate-500 pb-2 pt-2">Leave Requests</span>
                     <span className="text-[11px] font-semibold text-slate-500 pb-2 pt-2">Payroll</span>
                   </div>
                   <div className="w-24 h-6 bg-white rounded border border-slate-200 flex items-center px-2">
                     <span className="text-[9px] text-slate-400">Search staff...</span>
                   </div>
                </div>
                <div className="p-5 flex flex-col gap-4">
                  <div className="flex gap-4">
                    <div className="flex-1 bg-green-50 border border-green-100 rounded-md p-3">
                      <div className="text-[10px] text-green-700 font-medium">Present Today</div>
                      <div className="text-xl font-bold text-green-800">412</div>
                    </div>
                    <div className="flex-1 bg-amber-50 border border-amber-100 rounded-md p-3">
                      <div className="text-[10px] text-amber-700 font-medium">Late Entries</div>
                      <div className="text-xl font-bold text-amber-800">18</div>
                    </div>
                    <div className="flex-1 bg-red-50 border border-red-100 rounded-md p-3">
                      <div className="text-[10px] text-red-700 font-medium">Absent</div>
                      <div className="text-xl font-bold text-red-800">3</div>
                    </div>
                  </div>
                  
                  <div className="border border-slate-100 rounded-md overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-slate-500 border-b border-slate-100">
                        <tr>
                          <th className="py-2 px-3 font-medium">Employee</th>
                          <th className="py-2 px-3 font-medium">Shift</th>
                          <th className="py-2 px-3 font-medium">Punch In</th>
                          <th className="py-2 px-3 font-medium">Location</th>
                          <th className="py-2 px-3 font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { name: "Rahul S.", shift: "Morning", time: "08:55 AM", loc: "City Hosp (Geofence)", status: "On Time", color: "text-green-600 bg-green-50" },
                          { name: "Priya M.", shift: "Morning", time: "09:15 AM", loc: "Branch B (Selfie)", status: "Late", color: "text-amber-600 bg-amber-50" },
                          { name: "Amit K.", shift: "Evening", time: "-", loc: "-", status: "Pending", color: "text-slate-500 bg-slate-100" }
                        ].map((row, i) => (
                          <tr key={i} className="border-b border-slate-50 last:border-0">
                            <td className="py-3 px-3 font-medium text-slate-800 flex items-center gap-2">
                              <div className="w-5 h-5 rounded-full bg-blue-100 text-[9px] flex items-center justify-center text-blue-700">{row.name[0]}</div>
                              {row.name}
                            </td>
                            <td className="py-3 px-3 text-slate-500">{row.shift}</td>
                            <td className="py-3 px-3 text-slate-800 font-medium">{row.time}</td>
                            <td className="py-3 px-3 text-slate-500">{row.loc}</td>
                            <td className="py-3 px-3"><span className={`px-2 py-0.5 rounded text-[10px] font-medium ${row.color}`}>{row.status}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Field Operations UI Mockup */}
              <div className={cn("w-full max-w-2xl bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden transition-all duration-500 absolute", activeTab === "field" ? "opacity-100 translate-y-0 relative z-10" : "opacity-0 translate-y-4 pointer-events-none")}>
                <div className="h-10 bg-slate-800 text-white border-b border-slate-700 flex items-center px-4 justify-between">
                   <div className="flex gap-4">
                     <span className="text-[11px] font-semibold text-electric-cyan border-b-2 border-electric-cyan pb-2 pt-2">Live Map</span>
                     <span className="text-[11px] font-semibold text-slate-400 pb-2 pt-2">Route Plans</span>
                     <span className="text-[11px] font-semibold text-slate-400 pb-2 pt-2">Approvals</span>
                   </div>
                   <div className="flex items-center gap-2">
                     <LocateFixed size={12} className="text-electric-cyan" />
                     <span className="text-[10px] font-medium">Tracking Active</span>
                   </div>
                </div>
                
                <div className="flex h-[320px]">
                  {/* Left panel - agents */}
                  <div className="w-1/3 border-r border-slate-200 bg-slate-50 flex flex-col">
                    <div className="p-3 border-b border-slate-200 bg-white">
                      <div className="text-[10px] font-semibold text-slate-500 mb-2">FIELD AGENTS (North Region)</div>
                      <div className="flex flex-col gap-2">
                        <div className="bg-blue-50 border border-blue-100 rounded p-2 flex justify-between items-center cursor-pointer">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-electric-cyan"></div>
                            <span className="text-[11px] font-semibold text-slate-800">S. Kumar</span>
                          </div>
                          <span className="text-[9px] text-brand-blue font-medium">4/6 Visits</span>
                        </div>
                        <div className="bg-white border border-slate-100 rounded p-2 flex justify-between items-center cursor-pointer">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <span className="text-[11px] font-semibold text-slate-600">V. Singh</span>
                          </div>
                          <span className="text-[9px] text-slate-500">2/5 Visits</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 flex-1">
                      <div className="text-[9px] font-semibold text-slate-400 mb-2">RECENT VISITS</div>
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-2 items-start">
                           <CheckCircle2 size={12} className="text-green-500 mt-0.5" />
                           <div>
                             <div className="text-[10px] font-medium text-slate-700">Dr. Mehta Clinic</div>
                             <div className="text-[9px] text-slate-400">Audio note attached</div>
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right panel - Real GIS City Map */}
                  <div className="flex-1 bg-slate-100 relative overflow-hidden flex items-center justify-center select-none">
                    {/* Real City Map Cartography */}
                    <img
                      src="/map-bg.jpg"
                      alt="Real GPS City Map"
                      className="absolute inset-0 w-full h-full object-cover object-center filter saturate-[1.15] contrast-[1.02]"
                    />

                    {/* Subtle map gradient vignette for depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-slate-900/10 pointer-events-none" />

                    {/* Geofence Boundary Zone circle */}
                    <div className="absolute top-[26%] left-[24%] w-24 h-24 rounded-full border-2 border-dashed border-brand-blue/60 bg-blue-500/15 pointer-events-none flex items-center justify-center shadow-inner">
                      <span className="text-[7.5px] font-bold font-escucha uppercase tracking-widest text-brand-blue bg-white/95 px-1.5 py-0.5 rounded shadow-2xs border border-blue-200/60">Geofence Zone</span>
                    </div>

                    {/* Realistic Street Route SVG */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <path
                        d="M 28 36 Q 38 44 48 52 T 64 68 T 80 74"
                        fill="none"
                        stroke="#08D5F5"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        className="opacity-95 drop-shadow-[0_2px_4px_rgba(8,213,245,0.4)]"
                      />
                      <path
                        d="M 28 36 Q 38 44 48 52 T 64 68 T 80 74"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="0.8"
                        strokeDasharray="2 3"
                        className="opacity-90 animate-pulse"
                      />
                    </svg>

                    {/* Waypoint 1: Completed Clinic */}
                    <div className="absolute top-[32%] left-[23%] z-10 flex flex-col items-center">
                      <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md border-2 border-white">
                        <CheckCircle2 size={11} />
                      </div>
                      <div className="mt-1 bg-white/95 backdrop-blur-sm text-slate-800 text-[8px] font-bold px-1.5 py-0.5 rounded shadow-xs border border-slate-200 whitespace-nowrap">
                        Dr. Mehta Clinic • 09:30 AM
                      </div>
                    </div>

                    {/* Active Live Agent Pin (Middle of Route) */}
                    <div className="absolute top-[48%] left-[44%] z-20">
                      <div className="relative flex flex-col items-center">
                        <div className="absolute -top-1 w-9 h-9 rounded-full bg-cyan-400/35 animate-ping"></div>
                        <div className="w-5 h-5 bg-gradient-to-tr from-brand-blue to-electric-cyan text-white border-2 border-white rounded-full shadow-lg flex items-center justify-center z-10">
                          <Navigation size={10} className="transform rotate-45" />
                        </div>
                        <div className="mt-1 bg-slate-900/95 backdrop-blur-sm text-white text-[8px] font-semibold py-1 px-2 rounded-md shadow-lg flex items-center gap-1.5 whitespace-nowrap border border-slate-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan animate-pulse"></span>
                          <span>S. Kumar • 42 km/h</span>
                        </div>
                      </div>
                    </div>

                    {/* Waypoint 2: Next Scheduled Doctor */}
                    <div className="absolute top-[68%] left-[76%] z-10 flex flex-col items-center">
                      <div className="w-5 h-5 rounded-full bg-brand-blue text-white flex items-center justify-center shadow-md border-2 border-white">
                        <MapPin size={11} />
                      </div>
                      <div className="mt-1 bg-white/95 backdrop-blur-sm text-slate-800 text-[8px] font-bold px-1.5 py-0.5 rounded shadow-xs border border-slate-200 whitespace-nowrap">
                        Apex Hospital • Scheduled
                      </div>
                    </div>

                    {/* Map Navigation Controls (Top Right) */}
                    <div className="absolute top-2.5 right-2.5 z-20 flex flex-col gap-1">
                      <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-md border border-slate-200/80 p-0.5 flex flex-col">
                        <button suppressHydrationWarning className="w-5 h-5 flex items-center justify-center text-slate-700 hover:text-brand-blue hover:bg-slate-100 rounded transition-colors text-xs font-bold leading-none" title="Zoom in">+</button>
                        <div className="h-px bg-slate-200 w-full" />
                        <button suppressHydrationWarning className="w-5 h-5 flex items-center justify-center text-slate-700 hover:text-brand-blue hover:bg-slate-100 rounded transition-colors text-xs font-bold leading-none" title="Zoom out">−</button>
                      </div>
                      <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-md border border-slate-200/80 w-6 h-6 flex items-center justify-center text-brand-blue">
                        <Compass size={13} />
                      </div>
                    </div>

                    {/* Map Scale & Accuracy Footer (Bottom Right & Left) */}
                    <div className="absolute bottom-2 left-2 z-20 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded text-[8px] font-semibold text-slate-700 border border-slate-200/80 shadow-2xs flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      GPS ±2m Accurate
                    </div>
                    <div className="absolute bottom-2 right-2 z-20 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded text-[8px] font-semibold text-slate-500 border border-slate-200/80 shadow-2xs">
                      500 m
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
}
