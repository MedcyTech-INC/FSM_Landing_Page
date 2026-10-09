"use client";

import React, { useState } from "react";
import { ChevronDown, ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const faqs = [
    { q: "What is FIELDCRUX?", a: "FIELDCRUX is an enterprise-grade platform designed to manage both internal healthcare workforce attendance and external field operations from a single unified system." },
    { q: "Is the platform an HRMS?", a: "It includes core HRMS capabilities such as employee master data, organizational hierarchy, shift management, leave approvals, and payroll processing, tightly integrated with field operations." },
    { q: "What does Field Operations include?", a: "It covers doctor and clinic visit planning, GPS-tagged execution, prescription potential capture, multi-level visit approvals, and live agent location visibility." },
    { q: "How does GPS verification work?", a: "The mobile application captures coordinates at the time of punch-in or visit execution, matching them against predefined geofences for clinics or branches." },
    { q: "Can managers see field activity in real time?", a: "Yes. The command center provides a live map view showing agent locations, routes taken, and visit status as they happen." },
    { q: "Can it support multiple branches?", a: "Absolutely. The platform is built for distributed operations, allowing you to map multiple clinics, hospitals, or diagnostic centers under one organizational umbrella." },
    { q: "How are user permissions managed?", a: "Access is strictly governed by role-based permissions tied to your organizational hierarchy, ensuring managers only see data relevant to their teams." },
    { q: "Can employee data be imported from Excel?", a: "Yes, bulk onboarding via Excel is fully supported for staff lists, territory mapping, and historical records." },
    { q: "Can the platform be customized?", a: "Yes, enterprise deployments include custom configuration for shifts, leave policies, geofences, and approval workflows." },
    { q: "Is it suitable for hospitals, clinics and diagnostic centers?", a: "It is specifically tailored for these environments, bridging the gap between facility-based staff and field-based territory managers." },
    { q: "Does the platform use AI?", a: "Current capabilities focus on robust GPS, workflow, and operational management. Advanced AI features like Daily Sales Planning are planned for future expansions." },
    { q: "How can an organization evaluate the platform?", a: "You can request a custom demo using the form below. Our team will configure a demonstration tailored to your specific network size and requirements." }
  ];

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <section className="py-24 sm:py-28 bg-gradient-to-b from-[#E9F3FC] via-[#EEF5FD] to-[#DCEEFD] relative overflow-hidden" id="faq">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-blue/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-1/3 -right-20 w-96 h-96 bg-electric-cyan/15 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-1.5 bg-blue-500/10 text-brand-blue text-xs font-escucha uppercase tracking-widest font-bold rounded-full mb-4 border border-blue-200/80 shadow-xs">
            KNOWLEDGE BASE
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-nohemi text-slate-900 mb-6 tracking-tight leading-[1.2]">
            Everything You Need to Know <br className="hidden md:block"/>
            <span className="font-flaviotte font-normal italic text-brand-blue">
              Before Getting Started.
            </span>
          </h2>
        </div>

        {/* FAQ Accordion with Individual Elevated Cards */}
        <div className="max-w-3xl mx-auto mb-32 space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white/95 backdrop-blur-sm rounded-2xl border border-blue-100 shadow-xs hover:border-brand-blue/40 transition-all overflow-hidden">
              <button
                suppressHydrationWarning
                className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none focus-visible:bg-slate-50 transition-colors hover:bg-slate-50/50"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span className="font-bold font-nohemi text-slate-900 text-base sm:text-lg pr-8">{faq.q}</span>
                <ChevronDown 
                  size={20} 
                  className={cn("text-brand-blue transition-transform duration-300 shrink-0", openIndex === i ? "rotate-180" : "")} 
                />
              </button>
              <div 
                className={cn(
                  "overflow-hidden transition-all duration-300 px-6",
                  openIndex === i ? "max-h-40 pb-5 opacity-100" : "max-h-0 opacity-0"
                )}
              >
                <p className="text-slate-600 text-sm sm:text-base font-nohemi leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Final CTA & Demo Form */}
        <div id="demo" className="relative rounded-[2.5rem] overflow-hidden bg-[#0A1322] border border-blue-900/60 shadow-[0_25px_70px_rgba(10,19,34,0.35)]">
          {/* Background effects */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-brand-blue/30 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-electric-cyan/20 rounded-full blur-[100px]"></div>
            {/* Geometric motion lines */}
            <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M 0 100 L 100 0" stroke="#08D5F5" strokeWidth="0.2" fill="none" className="animate-pulse" />
              <path d="M 20 100 L 100 20" stroke="#1677FF" strokeWidth="0.5" fill="none" className="animate-pulse" style={{ animationDelay: '1s' }} />
            </svg>
          </div>

          <div className="grid lg:grid-cols-2 relative z-10">
            {/* CTA Messaging */}
            <div className="p-10 md:p-16 flex flex-col justify-center">
              <div className="inline-block px-3.5 py-1.5 bg-blue-500/20 text-electric-cyan text-xs font-escucha uppercase tracking-widest font-bold rounded-full mb-4 border border-electric-cyan/30 w-fit">
                READY TO TRANSFORM OPERATIONS
              </div>
              <h2 className="text-3xl md:text-5xl font-bold font-nohemi text-white mb-6 leading-tight">
                Manage Your Healthcare Workforce & Field Operations in{" "}
                <span className="font-culture font-normal italic text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan to-brand-blue">
                  One System.
                </span>
              </h2>
              <p className="text-lg font-nohemi text-slate-300 mb-8 max-w-md">
                Bring workforce activity, field execution and operational visibility together.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-300 font-nohemi">
                  <div className="w-6 h-6 rounded-full bg-blue-900/50 flex items-center justify-center text-electric-cyan">✓</div>
                  <span>Custom configuration for your network</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300 font-nohemi">
                  <div className="w-6 h-6 rounded-full bg-blue-900/50 flex items-center justify-center text-electric-cyan">✓</div>
                  <span>Guided deployment and onboarding</span>
                </div>
              </div>
            </div>

            {/* Demo Form */}
            <div className="bg-white p-8 md:p-12 lg:rounded-l-3xl shadow-[-10px_0_30px_rgba(0,0,0,0.1)]">
              {isSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-fade-in-up">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <h3 className="text-2xl font-bold text-primary-text mb-2">Request Received</h3>
                  <p className="text-secondary-text mb-8">This is a frontend UI demonstration. In a production environment, this form would connect directly to your CRM or backend sales team.</p>
                  <button 
                    suppressHydrationWarning 
                    onClick={() => setIsSubmitted(false)} 
                    className="text-brand-blue font-medium hover:underline"
                  >
                    Reset form
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-primary-text mb-6">Request a Demo</h3>
                  <form onSubmit={handleDemoSubmit} className="space-y-4" suppressHydrationWarning>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-600">Full Name</label>
                        <input suppressHydrationWarning required type="text" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-colors" placeholder="John Doe" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-600">Work Email</label>
                        <input suppressHydrationWarning required type="email" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-colors" placeholder="john@hospital.com" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-600">Organization Name</label>
                        <input suppressHydrationWarning required type="text" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-colors" placeholder="City Healthcare" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-600">Organization Type</label>
                        <select suppressHydrationWarning required className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-colors text-slate-700">
                          <option value="">Select Type...</option>
                          <option value="hospital">Hospital Chain</option>
                          <option value="clinic">Clinic Network</option>
                          <option value="diagnostic">Diagnostic Center</option>
                          <option value="pharma">Pharma/Medical Sales</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-600">Branches / Facilities</label>
                        <select suppressHydrationWarning required className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-colors text-slate-700">
                          <option value="">Select...</option>
                          <option value="1-5">1 - 5</option>
                          <option value="6-20">6 - 20</option>
                          <option value="21-50">21 - 50</option>
                          <option value="50+">50+</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-600">Total Workforce Size</label>
                        <select suppressHydrationWarning required className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-colors text-slate-700">
                          <option value="">Select...</option>
                          <option value="1-50">1 - 50</option>
                          <option value="51-200">51 - 200</option>
                          <option value="201-1000">201 - 1000</option>
                          <option value="1000+">1000+</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-600">Primary Interest</label>
                      <select suppressHydrationWarning required className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-colors text-slate-700">
                        <option value="">Select Interest...</option>
                        <option value="both">Both HRMS & Field Operations</option>
                        <option value="hrms">Workforce Management (HRMS) Only</option>
                        <option value="field">Field Operations & GPS Only</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-600">Additional Requirements (Optional)</label>
                      <textarea suppressHydrationWarning className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-colors" rows={2} placeholder="Tell us about specific integrations or needs..."></textarea>
                    </div>

                    <button 
                      suppressHydrationWarning
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-brand-blue hover:bg-blue-600 active:scale-[0.98] text-white font-bold font-nohemi py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 mt-4 shadow-[0_6px_20px_rgba(22,119,255,0.25)] hover:shadow-[0_8px_25px_rgba(22,119,255,0.35)]"
                    >
                      {isSubmitting ? (
                        <Loader2 className="animate-spin" size={20} />
                      ) : (
                        <>Request a Demo <ArrowRight size={18} /></>
                      )}
                    </button>
                    
                    <p className="text-[10px] text-slate-400 font-nohemi text-center mt-4">
                      By submitting, you agree to our Privacy Policy. Your data will only be used to process this request.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
