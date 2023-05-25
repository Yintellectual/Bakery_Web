import React, { ChangeEventHandler } from "react";

export default function Input({
  label,
  name,
  placeholder,
  onChange,
}: {
  label: string;
  name: string;
  placeholder?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div className="md:col-span-4">
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          name={name}
          id={name}
          autoComplete={name}
          placeholder={placeholder}
          onChange={onChange}
          className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
}
