import "@/styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import 'leaflet/dist/leaflet.css';
import { ApolloProvider } from "@apollo/client";
import { ContextProvider } from "../contexts/context";
import DefaultLayout from "../layouts/DefaultLayout";
import apolloClient from "@/apolloClient";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ContextProvider>
      <ApolloProvider client={ apolloClient }>
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </ApolloProvider>
    </ContextProvider>
  );
}

// Disabling SSR
export default dynamic(() => Promise.resolve(App), { ssr: false });
