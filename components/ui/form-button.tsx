import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-black text-white hover:bg-gray-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white",
    secondary:
      "border border-gray-200 bg-card text-foreground hover:bg-figma-gallery dark:border-card-border dark:hover:bg-card-border",
    outline:
      "border border-black text-black hover:bg-black hover:text-white dark:border-foreground dark:text-foreground dark:hover:bg-foreground dark:hover:text-background",
    ghost:
      "text-foreground hover:bg-figma-gallery dark:hover:bg-card-border",
  };

  const sizes = {
    sm: "px-4 py-1.5 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={`rounded-full font-medium transition-all duration-200 inline-flex items-center gap-2 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
