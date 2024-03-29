'use client';
import Image from "next/image";
import dynamic from "next/dynamic";


const Map = dynamic(() => import("@/components/Map/Map"), { ssr: false });


export default function Home() {
  return (
    <main className="">
      <Map />
    </main>
  );
}
