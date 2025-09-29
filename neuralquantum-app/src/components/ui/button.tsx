import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-250 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-quantum-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-quantum-600 text-white shadow-quantum hover:bg-quantum-700 hover:shadow-quantum-hover hover:-translate-y-0.5",
        secondary:
          "bg-transparent text-quantum-600 border-2 border-quantum-600 hover:bg-quantum-600 hover:text-white",
        outline:
          "border border-gray-300 bg-transparent hover:bg-gray-100 hover:text-gray-900",
        ghost:
          "hover:bg-quantum-100 hover:text-quantum-900",
        link:
          "text-quantum-600 underline-offset-4 hover:underline",
        nvidia:
          "bg-nvidia-green text-black shadow-lg hover:shadow-nvidia-green/30 hover:-translate-y-0.5",
        quantum:
          "bg-gradient-quantum text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 animated-gradient",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-9 px-4 text-sm",
        lg: "h-12 px-8 text-lg",
        xl: "h-14 px-10 text-xl",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }