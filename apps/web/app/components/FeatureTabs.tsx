"use client";

import { useState } from "react";

type Feature = {
  title: string;
  desc: string;
  code: React.ReactNode;
  icon: React.ReactNode;
  bg: string;
};

export default function FeatureTabs({ features }: { features: Feature[] }) {
  const [active, setActive] = useState(0);
  const f = features[active];

  return (
    <div className="md:hidden">
      <div className="flex gap-1 mb-4">
        {features.map((feat, i) => (
          <button
            key={feat.title}
            onClick={() => setActive(i)}
            className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
              active === i
                ? "bg-white text-black"
                : "bg-white/5 text-gray-400 hover:text-white"
            }`}
          >
            {feat.title}
          </button>
        ))}
      </div>
      <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
        <div className={`w-10 h-10 rounded-xl ${f.bg} flex items-center justify-center mb-4`}>
          {f.icon}
        </div>
        <p className="text-sm text-gray-400 leading-relaxed mb-4">{f.desc}</p>
        <div className="p-3 rounded-lg bg-black/40 border border-white/5">
          <code className="text-xs text-gray-300">{f.code}</code>
        </div>
      </div>
    </div>
  );
}
