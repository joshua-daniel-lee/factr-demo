import { ReactNode } from "react";

interface CardProps {
  variant?: "default" | "glass" | "gradient";
  children: ReactNode;
  className?: string;
}

export default function Card({ variant = "default", children, className = "" }: CardProps) {
  const variants = {
    default: "bg-white border-2 border-gray-100 shadow-soft hover-lift",
    glass: "glass shadow-elevated hover-lift",
    gradient: "bg-gradient-to-br from-primary to-blue-chill text-white shadow-glow-primary hover-lift"
  };
  
  return (
    <div className={`rounded-2xl p-6 ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
}
