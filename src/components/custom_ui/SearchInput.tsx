"use client";
import React, { useState, useEffect } from "react";

interface SearchInputProps {
  onChange?: (value: string) => void;
  className?: string;
}

const DEBOUNCE_DELAY = 300;

const SearchInput: React.FC<SearchInputProps> = ({ onChange, className }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (!onChange) return;
    const handler = setTimeout(() => {
      onChange(value);
    }, DEBOUNCE_DELAY);
    return () => clearTimeout(handler);
  }, [value, onChange]);

  return (
    <form
      className={`w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl flex items-center gap-2 px-2 py-1 bg-white rounded-3xl shadow-sm border border-gray-200 focus-within:ring-2 focus-within:ring-primary transition-all ${className ? ` ${className}` : ""}`}
      onSubmit={(e) => e.preventDefault()}
    >
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        id="search"
        type="search"
        placeholder="Search..."
        className="flex-1 border border-[rgba(255, 255, 255, .25)]  focus:ring-0 shadow-none text-base bg-transparent p-0 min-w-0
"
        autoComplete="off"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
};

export default SearchInput;
