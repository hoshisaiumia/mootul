export function getInitials(name: string): String {
  const parts = name
    .trim()
    .split(/[\s._-]+/)
    .filter(Boolean);
  if (parts.length === 0) return "?";

  const chars = (s: string) => Array.from(s);

  const first = chars(parts[0])[0];
  const second =
    parts.length > 1
      ? chars(parts[parts.length - 1])[0]
      : (chars(parts[0])[1] ?? "");

  return (first + second).toUpperCase();
}
