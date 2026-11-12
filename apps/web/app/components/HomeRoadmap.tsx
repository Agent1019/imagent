type Stage = { phase: string; title: string; desc: string; tags: string[] };

type HomeRoadmapProps = {
  stages: Stage[];
  current: string;
  planned: string;
  currentHref: string;
  currentLabel: string;
};

/** Three product stages; only the first is live, so it alone carries a link. */
export default function HomeRoadmap({ stages, current, planned, currentHref, currentLabel }: HomeRoadmapProps) {
  return (
    <ol className="home-roadmap" data-home-roadmap>
      {stages.map((stage, index) => {
        const isCurrent = index === 0;
        return (
          <li key={stage.title} className="home-roadmap-stage" data-current={isCurrent}>
            <span className="home-roadmap-dot" aria-hidden="true" />
            <div className="home-roadmap-card">
              <div className="home-roadmap-meta">
                <span className="home-roadmap-phase">{stage.phase}</span>
                <span className="home-roadmap-status">{isCurrent ? current : planned}</span>
              </div>
              <h3>{stage.title}</h3>
              <p>{stage.desc}</p>
              <div className="home-roadmap-foot">
                <ul className="home-roadmap-tags">
                  {stage.tags.map(tag => <li key={tag}>{tag}</li>)}
                </ul>
                {isCurrent && (
                  <a className="home-roadmap-link" href={currentHref}>
                    {currentLabel}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
