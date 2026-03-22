import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "accent" | "dark" | "outline";
  children: ReactNode;
}

export default function Button({ 
  variant = "primary", 
  children, 
  className = "",
  ...props 
}: ButtonProps) {
  const baseStyles = "w-full py-4 px-6 rounded-full font-medium text-base transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-primary text-white shadow-glow-primary hover:shadow-glow-primary hover:brightness-110",
    accent: "bg-accent text-white shadow-glow-accent hover:shadow-glow-accent hover:brightness-110",
    dark: "bg-bunting text-white shadow-soft hover:shadow-elevated",
    outline: "bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white shadow-soft"
  };
  
  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
