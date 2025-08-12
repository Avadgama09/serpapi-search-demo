import React from "react";

export default function TopPanel({ title, subtitle, children }) {
  return (
    <div className="hero">
      <div className="hero__inner">
        <h1 className="hero__title">{title}</h1>
        {subtitle && <p className="hero__subtitle">{subtitle}</p>}
        {children ? <div className="hero__controls">{children}</div> : null}
      </div>
    </div>
  );
}
