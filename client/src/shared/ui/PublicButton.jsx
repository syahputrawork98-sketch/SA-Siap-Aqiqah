import React from 'react';

const baseClassName =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

const variantClassName = {
  solid:
    "bg-[var(--color-public-accent)] text-[var(--color-text-inverse)] hover:bg-[var(--color-public-accent-hover)] focus-visible:outline-[var(--color-public-accent)]",
  outline:
    "border border-[var(--color-text-inverse)] text-[var(--color-text-inverse)] hover:bg-white/10 focus-visible:outline-[var(--color-text-inverse)]",
  light:
    "bg-white/90 text-[var(--color-public-primary)] hover:bg-white focus-visible:outline-[var(--color-text-inverse)]",
};

const sizeClassName = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-3 text-base",
};

export default function PublicButton({
  as = "button",
  href,
  variant = "solid",
  size = "md",
  className = "",
  children,
  ...props
}) {
  const classes =
    `${baseClassName} ${variantClassName[variant] ?? variantClassName.solid} ${sizeClassName[size] ?? sizeClassName.md} ${className}`.trim();

  if (as === "a" || href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
