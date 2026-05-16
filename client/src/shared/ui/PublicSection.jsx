import React from 'react';

export default function PublicSection({
  id,
  className = "",
  containerClassName = "",
  overlay = "soft",
  overlayClassName = "",
  usePattern = false,
  fixedBackground = true,
  backgroundImage,
  style,
  children,
}) {
  const overlayClass = {
    none: "",
    soft: "bg-[var(--color-public-overlay-soft)]",
    dark: "bg-[var(--color-public-overlay-strong)]",
    hero: "bg-[image:var(--color-public-overlay-hero)] mix-blend-multiply",
  };

  const sectionStyle = {
    ...(usePattern && {
      backgroundImage: backgroundImage ? `url('${backgroundImage}')` : "var(--image-public-background)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: fixedBackground ? "fixed" : "scroll",
    }),
    ...style,
  };

  return (
    <section
      id={id}
      className={`relative overflow-hidden px-6 py-20 md:px-16 ${className}`.trim()}
      style={sectionStyle}
    >
      {overlay !== "none" && (
        <div className={`absolute inset-0 ${overlayClass[overlay] ?? overlayClass.soft} ${overlayClassName}`.trim()} />
      )}
      <div className={`relative z-10 mx-auto w-full max-w-6xl ${containerClassName}`.trim()}>
        {children}
      </div>
    </section>
  );
}
