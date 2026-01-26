import Image from "next/image";
import Navbar from "@/components/web/Navbar";
import Landing from "@/components/web/Landing";
import Features from "@/components/web/Features";
import Reviews from "@/components/web/Reviews";
import Numbers from "@/components/web/Numbers";
import Footer from "@/components/web/Footer";

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
