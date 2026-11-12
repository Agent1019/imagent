type HeadingTextProps = {
  text: string;
  breakAfter: string;
};

/** Prefer a translated phrase boundary; balance extra lines on narrow screens. */
export default function HeadingText({ text, breakAfter }: HeadingTextProps) {
  if (!breakAfter || !text.startsWith(breakAfter)) return <>{text}</>;
  const remainder = text.slice(breakAfter.length);

  return (
    <>
      <span className="inline-block max-w-full align-top text-balance" data-heading-lead>{breakAfter}</span>
      {remainder.startsWith(" ") ? " " : null}
      <span className="inline-block max-w-full align-top text-balance" data-heading-continuation>{remainder.trimStart()}</span>
    </>
  );
}
