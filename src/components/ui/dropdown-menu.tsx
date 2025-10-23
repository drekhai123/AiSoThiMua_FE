"use client";

import React, { createContext, useContext, useState } from "react";

interface DropdownMenuContextValue {
  open: boolean;
  setOpen: (o: boolean) => void;
}

const DropdownMenuCtx = createContext<DropdownMenuContextValue | null>(null);

export function DropdownMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <DropdownMenuCtx.Provider value={{ open, setOpen }}>
      <div className="relative inline-block">
        {children}
      </div>
    </DropdownMenuCtx.Provider>
  );
}

export function DropdownMenuTrigger({ children, asChild, className }: { children: React.ReactNode; asChild?: boolean; className?: string }) {
  const ctx = useContext(DropdownMenuCtx);
  if (!ctx) return null;

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick: () => ctx.setOpen(!ctx.open),
    } as any);
  }

  return (
    <button
      type="button"
      onClick={() => ctx.setOpen(!ctx.open)}
      className={className}
    >
      {children}
    </button>
  );
}

export function DropdownMenuContent({ children, className }: { children: React.ReactNode; className?: string }) {
  const ctx = useContext(DropdownMenuCtx);
  if (!ctx || !ctx.open) return null;

  return (
    <>
      <div className="fixed inset-0 z-30" onClick={() => ctx.setOpen(false)} />
      <div className={`absolute top-full left-0 mt-2 z-40 ${className}`} role="menu">
        {children}
      </div>
    </>
  );
}

export function DropdownMenuGroup({ children }: { children: React.ReactNode }) {
  return <div role="group">{children}</div>;
}

export function DropdownMenuItem({ children, onClick, className }: { children: React.ReactNode; onClick?: () => void; className?: string }) {
  const ctx = useContext(DropdownMenuCtx);
  
  const handleClick = () => {
    onClick?.();
    ctx?.setOpen(false);
  };

  return (
    <div
      role="menuitem"
      onClick={handleClick}
      className={className}
    >
      {children}
    </div>
  );
}
