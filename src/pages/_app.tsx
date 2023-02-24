import HooksProvider from "@/hooks";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <HooksProvider>
      <Component {...pageProps} />
    </HooksProvider>
  );
}
