"use client";

import { TooltipProvider } from "@radix-ui/react-tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const AppClientProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <TooltipProvider>
      <QueryClientProvider client={new QueryClient()}>
        {children}
      </QueryClientProvider>
    </TooltipProvider>
  );
};
