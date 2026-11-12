"use client";

import { useState } from "react";

export type Feature = {
  id: "discover" | "auth" | "monetize";
  title: string;
  desc: string;
  code: React.ReactNode;
  icon: React.ReactNode;
  filename: string;
};

function FeatureArtwork({ variant }: { variant: Feature["id"] }) {
  return (
    <svg className="feature-card-art" viewBox="0 0 260 180" fill="none" aria-hidden="true" focusable="false">
      {variant === "discover" && (
        <>
          <rect x="126" y="-26" width="132" height="124" rx="26" transform="rotate(22 126 -26)" fill="#EEF5FF" />
          <path d="M95 -12H173C198 -12 220 10 220 36V54C220 78 201 97 177 97H158C134 97 115 116 115 140V178" stroke="#D8E7FC" strokeWidth="1.5" />
          <path d="M122 -12H177C216 -12 245 17 245 54V70C245 99 222 122 193 122H178C151 122 139 141 139 178" stroke="#D8E7FC" strokeWidth="1.5" />
          <rect x="190" y="29" width="29" height="29" rx="7" fill="#DCEBFF" />
        </>
      )}
      {variant === "auth" && (
        <>
          <path d="M182 -22C207 -5 235 1 260 4V69C260 112 229 139 182 157C135 139 104 112 104 69V4C132 1 157 -5 182 -22Z" fill="#F0F7FF" />
          <path d="M182 -6C203 6 224 13 246 17V68C246 100 225 124 182 142C139 124 118 100 118 68V17C140 13 161 6 182 -6Z" stroke="#D7E7F8" strokeWidth="1.5" />
          <path d="M182 15C198 25 214 30 230 33V67C230 91 215 109 182 124C149 109 134 91 134 67V33C150 30 166 25 182 15Z" stroke="#D7E7F8" strokeWidth="1.5" />
          <path d="M153 64L174 85L211 45" stroke="#D4E6FA" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
      {variant === "monetize" && (
        <>
          <rect x="158" y="-27" width="128" height="94" rx="20" transform="rotate(20 158 -27)" fill="#F1F3FF" />
          <rect x="117" y="15" width="124" height="86" rx="18" transform="rotate(20 117 15)" stroke="#E0E6FC" strokeWidth="1.5" />
          <rect x="97" y="43" width="124" height="86" rx="18" transform="rotate(20 97 43)" stroke="#E0E6FC" strokeWidth="1.5" />
          <path d="M158 146C165 115 194 127 202 97C210 67 236 76 258 49" stroke="#DDE5FC" strokeWidth="2" strokeLinecap="round" />
          <path d="M245 46L258 49L256 63" stroke="#DDE5FC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
    </svg>
  );
}

export function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <article className="feature-card" data-feature-card={feature.id}>
      <FeatureArtwork variant={feature.id} />
      <div className="feature-card-content">
        <div className="feature-card-heading">
          <div className="feature-card-icon" aria-hidden="true">{feature.icon}</div>
          <h3>{feature.title}</h3>
        </div>
        <p className="feature-card-description">{feature.desc}</p>
        <div className="feature-code-spacer" />
        <div className="feature-code" data-feature-code>
          <div className="feature-code-header">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M4 1.5H9L12 4.5V14.5H4V1.5Z" stroke="currentColor" strokeLinejoin="round" />
              <path d="M9 1.5V4.5H12" stroke="currentColor" strokeLinejoin="round" />
            </svg>
            <span>{feature.filename}</span>
          </div>
          <pre tabIndex={0} aria-label={feature.filename}><code>{feature.code}</code></pre>
        </div>
      </div>
    </article>
  );
}

export default function FeatureTabs({ features }: { features: Feature[] }) {
  const [active, setActive] = useState(0);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % features.length;
    else if (event.key === "ArrowLeft") next = (index + features.length - 1) % features.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = features.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>("button")[next]?.focus();
  };

  return (
    <div className="md:hidden" data-feature-tabs>
      <div className="feature-tabs-list" role="tablist" aria-label={features.map(feature => feature.title).join(" / ")}>
        {features.map((feature, index) => (
          <button
            key={feature.id}
            id={`home-feature-tab-${feature.id}`}
            type="button"
            role="tab"
            aria-selected={active === index}
            aria-controls={`home-feature-panel-${feature.id}`}
            tabIndex={active === index ? 0 : -1}
            onClick={() => setActive(index)}
            onKeyDown={event => handleKeyDown(event, index)}
          >
            {feature.title}
          </button>
        ))}
      </div>
      {features.map((feature, index) => (
        <div
          key={feature.id}
          id={`home-feature-panel-${feature.id}`}
          role="tabpanel"
          aria-labelledby={`home-feature-tab-${feature.id}`}
          hidden={active !== index}
        >
          <FeatureCard feature={feature} />
        </div>
      ))}
    </div>
  );
}
