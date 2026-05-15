import { Outlet } from "react-router-dom";

export default function BackofficeLayout({
  sidebar,
  topbar,
  footer = null,
  rootClassName = "",
  rootStyle = undefined,
  contentClassName = "",
  headerClassName = "",
  mainClassName = "",
  footerClassName = "",
}) {
  return (
    <div className={rootClassName} style={rootStyle}>
      {sidebar}
      <div className={contentClassName}>
        <header className={headerClassName}>{topbar}</header>
        <main className={mainClassName}>
          <Outlet />
        </main>
        {footer ? <footer className={footerClassName}>{footer}</footer> : null}
      </div>
    </div>
  );
}
