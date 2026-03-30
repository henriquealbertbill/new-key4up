interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "green" | "white";
  className?: string;
}

export default function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  const variants = {
    default:
      "border border-gray-200 bg-gray-100 text-gray-700 dark:border-card-border dark:bg-card-border dark:text-figma-muted",
    green:
      "border border-green-200 bg-green-50 text-green-700 dark:border-green-800/50 dark:bg-green-950/50 dark:text-green-400",
    white:
      "border border-gray-200 bg-card text-gray-900 dark:border-card-border dark:text-foreground",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
