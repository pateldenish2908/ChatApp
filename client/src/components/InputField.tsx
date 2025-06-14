// components/InputField.tsx
import React from "react";

interface InputFieldProps {
  name: string;
  type: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent) => void;
  onBlur: (e: React.FocusEvent) => void;
  error?: string;
  touched?: boolean;
}

export default function InputField({
  name,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
}: InputFieldProps) {
  return (
    <div>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="w-full px-4 py-2 border rounded"
      />
      {error && touched && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
