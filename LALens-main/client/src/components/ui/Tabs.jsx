import { useState, createContext, useContext } from "react";
import { cn } from "../../utils/cn";

const TabsContext = createContext(null);

/**
 * Tabs container component
 * @param {Object} props - Component props
 * @param {string} props.defaultValue - Default active tab value
 * @param {string} props.value - Controlled active tab value
 * @param {Function} props.onValueChange - Callback when tab changes
 * @param {string} props.className - Additional classes
 * @param {React.ReactNode} props.children - Tab content
 */
function Tabs({ defaultValue, value, onValueChange, className, children, ...props }) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const activeValue = value !== undefined ? value : internalValue;

  const handleValueChange = (newValue) => {
    if (value === undefined) {
      setInternalValue(newValue);
    }
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  return (
    <TabsContext.Provider value={{ activeValue, onValueChange: handleValueChange }}>
      <div className={cn("flex flex-col gap-4", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

/**
 * TabsList - container for tab triggers
 */
function TabsList({ className, children, ...props }) {
  return (
    <div
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-full bg-gray-100 p-1",
        className
      )}
      role="tablist"
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * TabsTrigger - individual tab button
 * @param {Object} props - Component props
 * @param {string} props.value - Tab value
 */
function TabsTrigger({ value, className, children, ...props }) {
  const context = useContext(TabsContext);
  const isActive = context?.activeValue === value;

  return (
    <button
      role="tab"
      aria-selected={isActive}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 disabled:pointer-events-none disabled:opacity-50",
        isActive
          ? "bg-white text-gray-900 shadow-sm"
          : "text-gray-600 hover:text-gray-900",
        className
      )}
      onClick={() => context?.onValueChange(value)}
      {...props}
    >
      {children}
    </button>
  );
}

/**
 * TabsContent - content panel for a tab
 * @param {Object} props - Component props
 * @param {string} props.value - Tab value this content belongs to
 */
function TabsContent({ value, className, children, ...props }) {
  const context = useContext(TabsContext);
  const isActive = context?.activeValue === value;

  if (!isActive) return null;

  return (
    <div
      role="tabpanel"
      className={cn("focus-visible:outline-none", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
