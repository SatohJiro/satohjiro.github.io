import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** False during SSR/static prerender and hydration, true once running on the client. */
export function useHydrated() {
  return useSyncExternalStore(subscribe, () => true, () => false);
}
