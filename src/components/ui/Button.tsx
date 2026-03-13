import React from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white hover:bg-primary/90",
  secondary: "bg-gray-600 text-white hover:bg-gray-700",
  outline: "border border-blue-600 text-blue-600 hover:bg-blue-50",
  ghost: "bg-neutral-200 hover:bg-neutral-200/60",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "min-h-9 min-w-28 text-xs",
  md: "min-h-11 min-w-35.5 text-sm",
  lg: "min-h-11 min-w-43.5 text-sm",
};

const Button: React.FC<ButtonProps> = ({
  label,
  variant = "primary",
  size = "md",
  isLoading = false,
  className = "",
  ...props
}) => {
  return (
    <button
      className={`inline-flex group items-center justify-center gap-1 rounded-sm font-medium transition duration-200 
      ${variantStyles[variant]} ${sizeStyles[size]} ${className} 
      disabled:opacity-50 disabled:cursor-not-allowed`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? "Loading..." : label}
    </button>
  );
};

export default Button;
