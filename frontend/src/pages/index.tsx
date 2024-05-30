import { ReactElement } from "react";
import dynamic from "next/dynamic";
import DefaultLayout from "@/layouts/DefaultLayout";


const Map = dynamic(() => import("@/components/Map/Map"), { ssr: false });

const Home = () => {
  return (
    <>
      <Map />
    </>
  );
};

Home.getLayout = function getLayout(home: ReactElement) {
  return <DefaultLayout>{home}</DefaultLayout>;
};

export default Home;