import ToolIcon from "./ToolIcon";

export type FeaturePreviewRow = {
  slug: string;
  name: string;
  meta: string;
  rank?: number;
  tone?: "ok" | "hot" | "steady";
};

type FeaturePreviewProps = {
  kind: "discover" | "auth" | "monetize";
  label: string;
  aside?: string;
  href?: string;
  rows: FeaturePreviewRow[];
};

function HeadIcon({ kind }: { kind: FeaturePreviewProps["kind"] }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {kind === "discover" && <path d="M21 21l-5.2-5.2m0 0a7.5 7.5 0 10-10.6-10.6 7.5 7.5 0 0010.6 10.6z" />}
      {kind === "auth" && <path d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a7.5 7.5 0 0115 0" />}
      {kind === "monetize" && <path d="M4 20V11M10 20V4M16 20v-6M22 20H2" />}
    </svg>
  );
}

/** Plain-language card preview: a labelled field followed by real tools on the platform. */
export default function FeaturePreview({ kind, label, aside, href, rows }: FeaturePreviewProps) {
  const head = (
    <>
      <HeadIcon kind={kind} />
      <span className="feature-preview-label">{label}</span>
      {aside && <span className="feature-preview-aside">{aside}</span>}
      {href && (
        <svg className="feature-preview-go" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      )}
    </>
  );

  return (
    <div className="feature-preview" data-feature-preview={kind}>
      {href ? <a className="feature-preview-head" href={href}>{head}</a> : <div className="feature-preview-head">{head}</div>}
      <ul className="feature-preview-rows">
        {rows.map(row => (
          <li key={row.slug}>
            <a href={`/tools/${row.slug}`}>
              {row.rank !== undefined && <span className="feature-preview-rank">{row.rank}</span>}
              <ToolIcon slug={row.slug} name={row.name} className="w-5 h-5 rounded" />
              <span className="feature-preview-name">{row.name}</span>
              <span className="feature-preview-meta" data-tone={row.tone}>
                {row.tone === "ok" && (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                )}
                {row.meta}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
