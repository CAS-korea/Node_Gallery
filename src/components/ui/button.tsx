import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-6 [&_svg]:shrink-0",
    {
        variants: {
            variant: {
                default: "text-primary-foreground  active:scale-95",
                destructive:
                    "bg-destructive text-destructive-foreground hover:shadow-md active:scale-95",
                outline:
                    "border border-input bg-background shadow-sm hover:text-accent-foreground hover:border-accent hover:shadow-md active:scale-95",
                secondary:
                    "bg-secondary text-secondary-foreground shadow-sm hover:shadow-md active:scale-95",
                ghost: "text-primary hover:text-accent-foreground active:scale-95",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-9 px-4 py-2",
                sm: "h-8 rounded-md px-3 text-xs",
                lg: "h-10 rounded-md px-8",
                icon: "h-9 w-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    },
)
Button.displayName = "Button"

export { Button, buttonVariants }

