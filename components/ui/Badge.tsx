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
    default: "bg-gray-100 text-gray-700 border border-gray-200",
    green: "bg-green-50 text-green-700 border border-green-200",
    white: "bg-white text-gray-900 border border-gray-200",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
