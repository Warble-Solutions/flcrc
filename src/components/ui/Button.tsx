import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "glow" | "outline" | "text";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function Button({
  children,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
}: ButtonProps) {
  const base =
    "px-8 py-3 rounded-full font-bold uppercase tracking-wider text-xs transition-all duration-300 relative overflow-hidden group cursor-pointer";

  const variants: Record<string, string> = {
    primary: "text-black bg-white hover:text-white",
    glow: "text-white border border-luminous-cyan/50 hover:border-luminous-cyan hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]",
    outline:
      "bg-transparent border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/40",
    text: "text-luminous-muted hover:text-white",
  };

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <span className="relative z-10 flex items-center gap-2 justify-center">
        {children}
      </span>
      {variant === "primary" && (
        <div className="absolute inset-0 bg-gradient-to-r from-luminous-cyan via-luminous-violet to-luminous-fuchsia opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
      {variant === "glow" && (
        <div className="absolute inset-0 bg-luminous-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
    </button>
  );
}
