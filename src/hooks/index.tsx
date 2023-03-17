import { SidebarDrawerProvider } from "@/contexts/SidebarDrawerContext";
import { theme } from "@/styles/theme";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface HooksProviderProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

export default function HooksProvider({ children }: HooksProviderProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <QueryClientProvider client={queryClient}>
        <SidebarDrawerProvider>{children}</SidebarDrawerProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}
