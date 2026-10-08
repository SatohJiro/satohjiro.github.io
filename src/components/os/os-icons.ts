"use client";

import {
  Home,
  User,
  Briefcase,
  Layers,
  Cpu,
  Award,
  Terminal,
  Mail,
  Search,
  type LucideIcon,
} from "lucide-react";

/** Shared icon resolution for SatohOS chrome (dock, palette). */
export const osIconMap: Record<string, LucideIcon> = {
  Home,
  User,
  Briefcase,
  Layers,
  Cpu,
  Award,
  Terminal,
  Mail,
  Search,
};

export function resolveOsIcon(name: string): LucideIcon {
  return osIconMap[name] ?? Home;
}
