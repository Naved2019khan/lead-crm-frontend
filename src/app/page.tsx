import Footer from "@/components/footers/Footer";
import Header from "@/components/headers/Header";
import HeroSection from "@/components/section/home/HeroSection";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <Header />
    <div className="flex min-h-screen items-center justify-center  font-sans ">
     <HeroSection />
    </div>
    <Footer />
    </>
  );
}
