import React from "react";
import "./sheet.css";

export function Sheet({ children }) {
  return <>{children}</>;
}

export function SheetTrigger({ children }) {
  return <>{children}</>;
}

export function SheetContent({ children, side = "right", className = "", setOpen }) {
  const handleClose = () => {
    console.log("Sheet closed");
    setOpen(false);
  };

  return (
    <div className={`sheet-overlay ${side} ${className} ${setOpen ? "show" : ""}`}>
      <button className="sheet-close-btn" onClick={handleClose}>×</button>
      {children}
    </div>
  );
}
