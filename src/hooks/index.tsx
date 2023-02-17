import { theme } from "@/styles/theme";
import { ChakraProvider } from "@chakra-ui/react";

interface HooksProviderProps {
  children: React.ReactNode;
}

export default function HooksProvider({ children }: HooksProviderProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      {children}
    </ChakraProvider>
  );
}
