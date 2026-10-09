"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = 2026;
  const [logoError, setLogoError] = useState(false);

  return (
    <footer className="bg-[#060D1A] border-t border-slate-800/80 pt-16 pb-10 text-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand & Description */}
          <div className="lg:col-span-2 pr-0 lg:pr-8">
            <Link href="/" className="inline-block mb-6">
              <div className="relative h-20 w-80 flex items-center">
                {logoError ? (
                  <span className="flex items-center font-bold text-xl text-white">
                    FIELD<span className="text-electric-cyan">CRUX</span>
                  </span>
                ) : (
                  <img 
                    src="/logo-dark.png" 
                    alt="FIELDCRUX Logo" 
                    className="object-contain h-full w-auto" 
                    onError={() => setLogoError(true)}
                  />
                )}
              </div>
            </Link>
            <p className="text-slate-400 text-sm font-nohemi leading-relaxed mb-6 max-w-xs">
              The unified enterprise operations platform connecting internal hospital workforce management and external field-force execution into a single, synchronized system.
            </p>
            <a href="#demo" className="inline-flex items-center gap-1.5 text-sm font-nohemi font-semibold text-electric-cyan hover:text-cyan-300 transition-colors">
              Request a Custom Demo <ArrowUpRight size={14} />
            </a>
          </div>

          {/* Solutions Links */}
          <div>
            <h4 className="font-bold font-escucha text-slate-200 mb-4 text-xs uppercase tracking-widest">Solutions</h4>
            <ul className="space-y-3">
              <li><Link href="#solutions" className="text-sm font-nohemi text-slate-400 hover:text-electric-cyan transition-colors">Healthcare HRMS</Link></li>
              <li><Link href="#solutions" className="text-sm font-nohemi text-slate-400 hover:text-electric-cyan transition-colors">Geofenced Attendance</Link></li>
              <li><Link href="#solutions" className="text-sm font-nohemi text-slate-400 hover:text-electric-cyan transition-colors">Field Operations</Link></li>
              <li><Link href="#solutions" className="text-sm font-nohemi text-slate-400 hover:text-electric-cyan transition-colors">Doctor Visit Tracking</Link></li>
              <li><Link href="#solutions" className="text-sm font-nohemi text-slate-400 hover:text-electric-cyan transition-colors">Field Visibility</Link></li>
            </ul>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-bold font-escucha text-slate-200 mb-4 text-xs uppercase tracking-widest">Platform</h4>
            <ul className="space-y-3">
              <li><Link href="#platform" className="text-sm font-nohemi text-slate-400 hover:text-electric-cyan transition-colors">Workforce Management</Link></li>
              <li><Link href="#platform" className="text-sm font-nohemi text-slate-400 hover:text-electric-cyan transition-colors">Field Operations</Link></li>
              <li><Link href="#platform" className="text-sm font-nohemi text-slate-400 hover:text-electric-cyan transition-colors">Role-Based Access</Link></li>
              <li><Link href="#platform" className="text-sm font-nohemi text-slate-400 hover:text-electric-cyan transition-colors">Live Visibility</Link></li>
              <li><Link href="#enterprise" className="text-sm font-nohemi text-slate-400 hover:text-electric-cyan transition-colors">Enterprise Deployment</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-bold font-escucha text-slate-200 mb-4 text-xs uppercase tracking-widest">Company</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm font-nohemi text-slate-400 hover:text-electric-cyan transition-colors">About Us</Link></li>
              <li><Link href="#" className="text-sm font-nohemi text-slate-400 hover:text-electric-cyan transition-colors">Contact</Link></li>
              <li><Link href="#demo" className="text-sm font-nohemi text-electric-cyan font-semibold hover:text-cyan-300 transition-colors">Request a Demo</Link></li>
            </ul>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row justify-between items-center gap-4 font-nohemi">
          <div className="text-xs text-slate-500">
            &copy; {currentYear} FIELDCRUX. All rights reserved.
          </div>
          <div className="flex gap-6">
            <Link href="#" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
