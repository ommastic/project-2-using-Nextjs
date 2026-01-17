import Image from "next/image";
import Navbar from "@/components/Navbar";
import Landing from "@/components/Landing";
import Features from "@/components/Features";
import Reviews from "@/components/Reviews";
import Numbers from "@/components/Numbers";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div>
        <Navbar />
        <Landing />
        <Features />
        <Reviews />
        <Numbers />
        <Footer />
    </div>
  );
}
