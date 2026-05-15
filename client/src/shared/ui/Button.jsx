import React from 'react';

export default function Button({
  type = "button",
  variant = "primary",
  size = "md",
  isLoading = false,
  className = "",
  children,
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] font-medium transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

  const variants = {
    primary:
      "bg-[var(--color-brand-primary)] text-white hover:brightness-95 active:translate-y-px focus-visible:outline-[var(--color-brand-primary)]",
    ghost:
      "text-[var(--color-text-default)] hover:bg-[var(--color-brand-primary-soft)] hover:text-[var(--color-brand-primary)] focus-visible:outline-[var(--color-brand-primary)]",
    success:
      "bg-green-100 text-green-700 hover:bg-green-200 active:translate-y-px focus-visible:outline-green-400",
    danger:
      "bg-red-100 text-red-700 hover:bg-red-200 active:translate-y-px focus-visible:outline-red-400",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-2.5 text-base",
  };

  return (
    <button
      type={type}
      disabled={props.disabled || isLoading}
      data-loading={isLoading ? "true" : "false"}
      className={`${base} ${variants[variant] ?? variants.primary} ${
        sizes[size] ?? sizes.md
      } ${className}`.trim()}
      {...props}
    >
      {isLoading ? "Memuat..." : children}
    </button>
  );
}
