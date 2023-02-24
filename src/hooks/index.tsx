import { SidebarDrawerProvider } from "@/contexts/SidebarDrawerContext";
import { theme } from "@/styles/theme";
import { ChakraProvider } from "@chakra-ui/react";

interface HooksProviderProps {
  children: React.ReactNode;
}

export default function HooksProvider({ children }: HooksProviderProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <SidebarDrawerProvider>{children}</SidebarDrawerProvider>
    </ChakraProvider>
  );
}
