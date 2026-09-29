"use client";

import { Leaf, Github } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-eco-100/80">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-eco-500 to-eco-700 flex items-center justify-center shadow-lg shadow-eco-500/30">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-eco-900 leading-tight">
              Campus Carbon Tracker
            </h1>
            <p className="text-xs text-eco-600/80">Measure • Understand • Reduce</p>
          </div>
        </div>
        <a
          href="https://github.com/phemanthsai08/campus-carbon-footprint-tracker"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost text-sm"
        >
          <Github className="w-4 h-4" />
          <span className="hidden sm:inline">Source</span>
        </a>
      </div>
    </header>
  );
}
