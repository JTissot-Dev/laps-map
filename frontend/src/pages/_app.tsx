import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import 'leaflet/dist/leaflet.css';
import { ApolloProvider } from "@apollo/client";
import { ContextProvider } from "../contexts/context";
import apolloClient from "@/apolloClient";


export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
};
 
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {

  const getLayout = Component.getLayout ?? ((page) => page);
  
  return (
    <ContextProvider>
      <ApolloProvider client={ apolloClient }>
          { getLayout(<Component {...pageProps} />) }
      </ApolloProvider>
    </ContextProvider>
  );
};

// Disabling SSR
export default dynamic(() => Promise.resolve(App), { ssr: false });
