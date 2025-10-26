/**
 * React Query Provider
 * Khởi tạo QueryClient và bọc app với QueryClientProvider
 */

"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState, type ReactNode } from "react";

interface QueryProviderProps {
  children: ReactNode;
}

export default function QueryProvider({ children }: QueryProviderProps) {
  // Tạo QueryClient trong useState để tránh tạo lại mỗi lần render
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Cấu hình mặc định cho tất cả queries
            staleTime: 1000 * 60, // 1 minute
            gcTime: 1000 * 60 * 5, // 5 minutes (formerly cacheTime)
            refetchOnWindowFocus: false, // Tắt refetch khi focus window
            refetchOnReconnect: true, // Refetch khi reconnect
            retry: 1, // Retry 1 lần khi fail
          },
          mutations: {
            // Cấu hình mặc định cho tất cả mutations
            retry: 0, // Không retry mutations
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* React Query Devtools - chỉ hiện ở development */}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools
          initialIsOpen={false}
          position="bottom"
          buttonPosition="bottom-right"
        />
      )}
    </QueryClientProvider>
  );
}

