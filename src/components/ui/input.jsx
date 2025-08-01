import * as React from "react";

export const Input = React.forwardRef(({ className, ...props }, ref) => {
  return <input ref={ref} className={`border px-3 py-2 rounded ${className}`} {...props} />;
});
