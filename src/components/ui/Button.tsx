import type { Component, ComponentProps } from "solid-js"
import { splitProps } from "solid-js"

import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground hover:bg-primary/90",
                destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                outline: "border border-input hover:bg-accent hover:text-accent-foreground",
                secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline"
            },
            size: {
                default: "h-10 py-2 px-4",
                sm: "h-9 px-3 rounded-md",
                lg: "h-11 px-8 rounded-md",
                icon: "h-12 w-12 p-3 rounded-md md:h-14 md:w-14",
                "icon-sm": "h-10 w-10 p-2 rounded-md md:h-12 md:w-12",
                none: "p-0",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default"
        }
    }
)

export interface ButtonProps
    extends ComponentProps<"button">,
    VariantProps<typeof buttonVariants> { }

const Button: Component<ButtonProps> = (props) => {
    const [, rest] = splitProps(props, ["variant", "size", "class"])
    return (
        <button
            class={cn(buttonVariants({ variant: props.variant, size: props.size }), props.class)}
            {...rest}
        />
    )
}

export { Button, buttonVariants }
