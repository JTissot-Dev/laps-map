import Head from "next/head";
import { ReactNode } from "react";
import Header from "@/components/Header/Header";
import SideBar from "@/components/SideBar/SideBar";
import { Toaster } from "@/components/ui/toaster";


const DefaultLayout: React.FC<{children: ReactNode}> = ({ 
  children }) => {
    return (
      <>
        <Head>
          <title>Laps Map</title>
          <meta name="description" content="Laps Map" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <>
          <Header />
          <SideBar />
          <Toaster />
          <main className="main-content h-[100vh]">
            { children }
          </main>
        </>
      </>
    );
};

export default DefaultLayout;