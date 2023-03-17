import HooksProvider from "@/hooks";
import { makeServer } from "@/services/mirage";
import type { AppProps } from "next/app";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

if (process.env.NODE_ENV === "development") {
  makeServer();
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <HooksProvider>
      <Component {...pageProps} />

      <ReactQueryDevtools initialIsOpen={false} />
    </HooksProvider>
  );
}
