export function Card({ children, className = "", style }) {
  return (
    <div
      className={`bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] rounded-[var(--radius-xl)] shadow-[var(--shadow-sm)] ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, children, className = "" }) {
  return (
    <div className={`border-b border-[var(--color-border-default)] px-5 py-3 ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">{title}</h3>
      )}
      {subtitle && <p className="text-sm text-[var(--color-text-secondary)]">{subtitle}</p>}
      {children}
    </div>
  );
}

export function CardTitle({ children, className = "" }) {
  return (
    <h2
      className={`text-xl font-semibold text-[var(--color-text-primary)] tracking-tight ${className}`}
    >
      {children}
    </h2>
  );
}

export function CardContent({ children, className = "" }) {
  return <div className={`p-5 ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = "" }) {
  return (
    <div className={`border-t border-[var(--color-border-default)] px-5 py-3 ${className}`}>
      {children}
    </div>
  );
}
