/** Serializable command definition — the executable `run` is attached by UI. */
export interface OsCommandDef {
  id: string;
  label: { en: string; vi: string };
  hint?: string;
  keywords: string[];
}

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .trim();
}

/**
 * Diacritic-insensitive, case-insensitive AND-token filter over both
 * language labels plus keywords. Empty query returns everything.
 * Pure — safe to unit test and reuse.
 */
export function filterOsCommands(commands: OsCommandDef[], query: string): OsCommandDef[] {
  const tokens = normalize(query).split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return [...commands];
  return commands.filter((cmd) => {
    const haystack = normalize(
      [cmd.label.en, cmd.label.vi, ...cmd.keywords].join(" "),
    );
    return tokens.every((token) => haystack.includes(token));
  });
}
