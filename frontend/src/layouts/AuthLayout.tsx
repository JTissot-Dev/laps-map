import Head from "next/head";
import { ReactNode } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import clsx from "clsx";
import { Toaster } from "@/components/ui/toaster";


const AuthLayout: React.FC<{children: ReactNode}> = ({ 
  children }) => {

    const router = useRouter(); 

    return (
      <>
        <Head>
          <title>Laps Map</title>
          <meta name="description" content="Laps Map" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <>
          <Toaster />
          <main 
            className={
              clsx(
                "main-content h-[100vh] w-full pb-[120px]",
                "flex flex-col justify-center items-center",
                "px-5 sm:px-0"
              )
            }>
            <div 
              className={
                clsx(
                  "w-full", 
                  "flex justify-center"
                )
              }
            >
              <h1 className="text-lg font-semibold">
                { router.pathname === "/login" ? "Connexion" : "Inscription" }
              </h1>
            </div>
            { children }
            <Link
              className={
                clsx(
                  "text-sm text-center text-blue-600 hover:underline",
                  "mt-[70px]"
                )
              }
              href={ router.pathname === "/login" ? "/signup" : "/login" }
            >
              { router.pathname === "/login" ? 
                "Créer un compte" : "Déjà inscrit? Se connecter" 
              }
              
            </Link>
          </main>
        </>
      </>
    );
};

export default AuthLayout;