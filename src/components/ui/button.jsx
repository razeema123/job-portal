import * as React from "react";

export const Button = React.forwardRef(({ className, ...props }, ref) => {
  return <button ref={ref} className={`px-4 py-2 bg-blue-600 text-white rounded ${className}`} {...props} />;
});
