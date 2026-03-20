import React from 'react'
import Link from 'next/link'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: React.ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  href?: string
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  outline: 'btn-outline',
  ghost: 'btn-ghost',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'btn-sm',
  md: 'btn-md',
  lg: 'btn-lg',
}

const AppButton: React.FC<ButtonProps> = ({
  label,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  href,
  className = '',
  ...props
}) => {
  const classes = `group btn ${variantStyles[variant]} ${sizeStyles[size]} ${className} p-0`

  if (href) {
    return (
      <Link href={href} className={classes}>
        {isLoading && <span className="loading loading-spinner loading-sm"></span>}
        {label}
      </Link>
    )
  }

  return (
    <button className={classes} disabled={isLoading || props.disabled} {...props}>
      {isLoading && <span className="loading loading-spinner loading-sm"></span>}
      {label}
    </button>
  )
}

export default AppButton
