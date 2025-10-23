"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

interface SelectContextValue {
  value: unknown;
  setValue: (v: unknown) => void;
  open: boolean;
  setOpen: (o: boolean) => void;
  onValueChange?: (v: unknown) => void;
}

const SelectCtx = createContext<SelectContextValue | null>(null);

interface SelectProps<T = unknown> {
  value?: T;
  onValueChange?: (v: T) => void;
  children: React.ReactNode;
}

export function Select<T = unknown>({ value, onValueChange, children }: SelectProps<T>) {
  const [internalValue, setInternalValue] = useState<T | undefined>(value);
  const [open, setOpen] = useState(false);

  const ctx = useMemo(
    () => ({
      value: value ?? internalValue,
      setValue: (v: unknown) => {
        setInternalValue(v as T);
        onValueChange?.(v as T);
      },
      open,
      setOpen,
      onValueChange: onValueChange as (v: unknown) => void,
    }),
    [value, internalValue, open, onValueChange]
  );

  return (
    <SelectCtx.Provider value={ctx}>
      <div className="relative inline-block">
        {children}
      </div>
    </SelectCtx.Provider>
  );
}

export function SelectTrigger({ children, className, ...props }: React.HTMLAttributes<HTMLButtonElement>) {
  const ctx = useContext(SelectCtx);
  if (!ctx) return null;
  return (
    <button
      type="button"
      onClick={() => ctx.setOpen(!ctx.open)}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
}

export function SelectValue({ placeholder, className }: { placeholder?: string; className?: string }) {
  const ctx = useContext(SelectCtx);
  if (!ctx) return null;
  return <span className={className}>{String(ctx.value) ?? placeholder ?? ""}</span>;
}

export function SelectContent({ children, className }: { children: React.ReactNode; className?: string }) {
  const ctx = useContext(SelectCtx);
  if (!ctx || !ctx.open) return null;
  return (
    <>
      <div className="fixed inset-0 z-30" onClick={() => ctx.setOpen(false)} />
      <div className={`absolute top-full left-0 mt-2 z-40 bg-neutral-900 border border-neutral-600 rounded-lg shadow-2xl overflow-hidden min-w-[120px] ${className}`} role="listbox">
        {children}
      </div>
    </>
  );
}

export function SelectItem({ value, children, className }: { value: unknown; children: React.ReactNode; className?: string }) {
  const ctx = useContext(SelectCtx);
  if (!ctx) return null;
  const isSelected = ctx.value === value;
  return (
    <div
      role="option"
      aria-selected={isSelected}
      onClick={() => {
        ctx.setValue(value);
        ctx.setOpen(false);
      }}
      className={`px-3 py-2 cursor-pointer transition-colors ${isSelected ? 'bg-blue-600 text-white' : 'text-neutral-300 hover:bg-neutral-800'} ${className}`}
    >
      {children}
    </div>
  );
}
