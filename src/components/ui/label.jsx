import * as React from "react";

export const Label = ({ className, ...props }) => {
  return <label className={`font-medium text-sm ${className}`} {...props} />;
};
