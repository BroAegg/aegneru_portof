"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
}

export default function MagneticButton({
  children,
  className = "",
  onClick,
  href,
  variant = "primary",
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const variantClasses: Record<string, string> = {
    primary:
      "bg-accent text-white hover:bg-accent/90 shadow-lg shadow-accent/20",
    secondary:
      "border border-dark-border text-foreground hover:border-accent/50 hover:bg-dark-hover",
    ghost:
      "text-muted hover:text-foreground hover:bg-dark-hover",
  };

  const Tag = href ? "a" : "button";

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 300, damping: 15, mass: 0.2 }}
      className="inline-block"
    >
      <Tag
        href={href}
        onClick={onClick}
        className={`inline-flex items-center gap-2 rounded-xl px-6 py-3 font-heading font-semibold text-sm tracking-wide transition-all duration-300 cursor-pointer ${variantClasses[variant]} ${className}`}
      >
        {children}
      </Tag>
    </motion.div>
  );
}
