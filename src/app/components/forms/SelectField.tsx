"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectFieldProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  options: { label: string; value: string | number }[];
  placeholder: string;
  error?: string;
  className?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder,
  error = "",
  className = "",
}) => {
  return (
    <div className={`flex items-center justify-between my-4 ${className}`}>
      <span className="text-gray-600 w-1/3">{label}</span>
      <span className="font-medium w-2/3 text-left">
        <Select value={value.toString()} onValueChange={onChange}>
          <SelectTrigger
            className={`w-full border-2 text-gray-700 rounded-sm p-2 "border-gray-200"}`}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value.toString()}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </span>
    </div>
  );
};

export default SelectField;
