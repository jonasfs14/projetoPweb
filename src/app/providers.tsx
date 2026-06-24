'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  // Mantém o cliente estável entre renderizações
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ToastContainer position="top-right" autoClose={3000} />
    </QueryClientProvider>
  );
}