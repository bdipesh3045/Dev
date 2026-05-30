import { cn } from "../../utils/cn";

const badgeVariants = {
  default: "border-transparent bg-purple-100 text-purple-700",
  secondary: "border-transparent bg-gray-100 text-gray-700",
  destructive: "border-transparent bg-red-100 text-red-700",
  outline: "text-gray-700 border-gray-200 bg-white",
  success: "border-transparent bg-green-100 text-green-700",
  warning: "border-transparent bg-amber-100 text-amber-700",
};

/**
 * Badge component
 * @param {Object} props - Component props
 * @param {string} props.variant - Badge variant
 * @param {string} props.className - Additional classes
 * @param {React.ReactNode} props.children - Badge content
 */
function Badge({ variant = "default", className, children, ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
        badgeVariants[variant] || badgeVariants.default,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export { Badge, badgeVariants };
