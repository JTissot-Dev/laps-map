import "@/styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { ContextProvider } from "@/contexts/context";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ContextProvider>
      <Component {...pageProps} />
    </ContextProvider>
  );
}

// Disabling SSR
export default dynamic(() => Promise.resolve(App), { ssr: false });