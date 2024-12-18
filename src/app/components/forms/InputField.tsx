"use client";

import React from "react";
import { Input } from "@/components/ui/input";

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  error?: string;
  readOnly?: boolean;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  error = "",
  readOnly = false,
  className = "",
}) => {
  return (
    <div className={`flex items-center justify-between my-4 ${className}`}>
      <span className="text-gray-600 w-1/3">{label}</span>
      <span className="font-medium w-2/3 text-left">
        <div className="relative">
          <Input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            readOnly={readOnly}
            className={`w-full p-2 border-2 rounded-sm text-gray-700 ${
              readOnly ? "bg-gray-100" : "border-gray-200"
            } ${error ? "border-red-500" : "border-gray-200"}`}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      </span>
    </div>
  );
};

export default InputField;
