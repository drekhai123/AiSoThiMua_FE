"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import LoadingScreen from "@/components/ui/LoadingScreen";

export default function LoadingProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  // Skip loading for homepage
  const skipLoading = pathname === "/";

  useEffect(() => {
    if (skipLoading) {
      setIsLoading(false);
      return;
    }

    // Simulate initial loading for other pages
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Show loading for 2 seconds

    return () => clearTimeout(timer);
  }, [skipLoading]);

  return (
    <>
      {!skipLoading && (
        <LoadingScreen 
          isLoading={isLoading} 
          onLoadingComplete={() => setIsLoading(false)} 
        />
      )}
      <div className={isLoading && !skipLoading ? "opacity-0" : "opacity-100 transition-opacity duration-500"}>
        {children}
      </div>
    </>
  );
}
