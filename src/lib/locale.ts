export type LocalizedValue<T> = { en: T; vi: T } | T;

/**
 * Resolves a localized string or value based on active language flag.
 * Handles both plain strings and bilingual { en, vi } dictionaries cleanly with full type inference.
 */
export function resolveLocale<T = string>(
  value: LocalizedValue<T> | undefined | null,
  isVi: boolean,
  fallback: T
): T;
export function resolveLocale<T = string>(
  value: LocalizedValue<T> | undefined | null,
  isVi: boolean
): T;
export function resolveLocale<T = string>(
  value: LocalizedValue<T> | undefined | null,
  isVi: boolean,
  fallback?: T
): T {
  if (value === undefined || value === null) {
    return fallback !== undefined ? fallback : ("" as unknown as T);
  }
  if (typeof value === "object" && value !== null && ("en" in value || "vi" in value)) {
    const dict = value as { en?: T; vi?: T };
    const resolved = isVi ? dict.vi ?? dict.en : dict.en ?? dict.vi;
    return resolved !== undefined ? resolved : (fallback !== undefined ? fallback : ("" as unknown as T));
  }
  return value as T;
}

/**
 * Specifically resolves a localized array of items, ensuring safe array fallback.
 */
export function resolveLocaleArray<T = string>(
  value: LocalizedValue<T[]> | undefined | null,
  isVi: boolean,
  fallback: T[] = []
): T[] {
  if (!value) return fallback;
  if (typeof value === "object" && ("en" in value || "vi" in value)) {
    const dict = value as { en?: T[]; vi?: T[] };
    const resolved = isVi ? dict.vi ?? dict.en : dict.en ?? dict.vi;
    return Array.isArray(resolved) ? resolved : fallback;
  }
  return Array.isArray(value) ? value : fallback;
}
