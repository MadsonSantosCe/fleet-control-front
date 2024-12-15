import React from "react";

export function Loader() {
  return (
    <div className="flex items-center justify-center">
      <div className="h-6 w-6 animate-spin rounded-full border-4 border-t-transparent border-gray-500"></div>
    </div>
  );
}
