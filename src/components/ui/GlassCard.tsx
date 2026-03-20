import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export default function GlassCard({
  children,
  className = "",
  hoverEffect = true,
}: GlassCardProps) {
  return (
    <div
      className={`glass rounded-2xl p-8 ${
        hoverEffect ? "glass-hover transition-all duration-500" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
