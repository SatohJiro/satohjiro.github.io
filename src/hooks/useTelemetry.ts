"use client";

import { useEffect, useState, useCallback } from "react";
import { TelemetryEvent } from "@/types";
import { telemetry } from "@/lib/telemetry";

export function useTelemetry() {
  const [events, setEvents] = useState<TelemetryEvent[]>([]);
  const [isOptedOut, setIsOptedOut] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    const handleUpdate = () => {
      if (isMounted) {
        setEvents(telemetry.getEvents());
        setIsOptedOut(telemetry.isOptedOut());
      }
    };

    handleUpdate();

    window.addEventListener("satoh-telemetry-update", handleUpdate);
    return () => {
      isMounted = false;
      window.removeEventListener("satoh-telemetry-update", handleUpdate);
    };
  }, []);

  const track = (
    type: TelemetryEvent["type"],
    target?: string,
    metadata?: Record<string, string | number | boolean>
  ) => {
    telemetry.track(type, target, metadata);
  };

  const toggleOptOut = () => {
    const nextVal = !isOptedOut;
    telemetry.setOptOut(nextVal);
    setIsOptedOut(nextVal);
  };

  const clearEvents = () => {
    telemetry.clearEvents();
  };

  return {
    events,
    isOptedOut,
    track,
    toggleOptOut,
    clearEvents,
  };
}
