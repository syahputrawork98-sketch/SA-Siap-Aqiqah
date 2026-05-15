import React from 'react';

export default function PublicCard({ className = "", children }) {
  return (
    <article
      className={`rounded-3xl border border-[var(--color-public-surface-border)] bg-[var(--color-public-surface)] shadow-[var(--shadow-sm)] transition duration-300 hover:shadow-[var(--shadow-lg)] ${className}`.trim()}
    >
      {children}
    </article>
  );
}
