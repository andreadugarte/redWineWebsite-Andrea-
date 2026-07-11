/**
 * A thin gradient band that bridges two solid-colour sections so the
 * transition between light and dark parts reads as a smooth seam
 * instead of a hard cut. Purely decorative.
 */
const TONE: Record<string, string> = {
  bone: "#f4efe6",
  "bone-warm": "#ece4d6",
  charcoal: "#26221f",
  oxblood: "#5a1420",
  "oxblood-deep": "#3d0d16",
};

export function Seam({
  from,
  to,
  className,
}: {
  from: keyof typeof TONE | (string & {});
  to: keyof typeof TONE | (string & {});
  className?: string;
}) {
  const fromColor = TONE[from] ?? from;
  const toColor = TONE[to] ?? to;
  return (
    <div
      aria-hidden
      className={`h-16 w-full md:h-24 ${className ?? ""}`}
      style={{ background: `linear-gradient(to bottom, ${fromColor}, ${toColor})` }}
    />
  );
}
