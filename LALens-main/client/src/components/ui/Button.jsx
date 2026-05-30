import { cn } from "../../utils/cn";

const buttonVariants = {
  default: "bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 shadow-lg shadow-purple-500/25",
  secondary: "bg-white border border-gray-200 text-gray-800 hover:bg-gray-50",
  outline: "border border-gray-200 bg-transparent hover:bg-gray-50 text-gray-700",
  ghost: "bg-transparent hover:bg-gray-100 text-gray-600",
  destructive: "bg-red-500 text-white hover:bg-red-600",
  link: "text-purple-600 underline-offset-4 hover:underline bg-transparent"
};

const buttonSizes = {
  default: "h-10 px-4 py-2",
  sm: "h-8 px-3 text-sm",
  lg: "h-12 px-6 text-base",
  icon: "h-10 w-10"
};

/**
 * Button component
 * @param {Object} props - Component props
 * @param {string} props.variant - Button variant
 * @param {string} props.size - Button size
 * @param {string} props.className - Additional classes
 * @param {React.ReactNode} props.children - Button content
 * @param {boolean} props.disabled - Disabled state
 */
function Button({ 
  variant = "default", 
  size = "default", 
  className = "", 
  children, 
  disabled,
  ...props 
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
        buttonVariants[variant] || buttonVariants.default,
        buttonSizes[size] || buttonSizes.default,
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export { Button, buttonVariants };
