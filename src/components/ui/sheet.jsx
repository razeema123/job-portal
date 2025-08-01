import React, { useState, createContext, useContext } from "react";
import "@/components/ui/sheet.css"; // Ensure path is correct

const SheetContext = createContext();

export function Sheet({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <SheetContext.Provider value={{ open, setOpen }}>
      {children}
    </SheetContext.Provider>
  );
}

export function SheetTrigger({ asChild, children }) {
  const { setOpen } = useContext(SheetContext);
  const child = React.Children.only(children);
  return React.cloneElement(child, {
    onClick: () => setOpen(true),
  });
}

export function SheetContent({ children, side = "right", className = "" }) {
  const { open, setOpen } = useContext(SheetContext);

  return (
    <div className={`sheet-overlay ${open ? "visible" : "hidden"}`}>
      <div
        className={`sheet-content ${side} ${
          open ? "translate-x-0" : "translate-x-full"
        } ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="sheet-close" onClick={() => setOpen(false)}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
