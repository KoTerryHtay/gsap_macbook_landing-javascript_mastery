import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
import ProductViewer from "./components/ProductViewer";
import Showcase from "./components/Showcase";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  return (
    <main className="">
      <NavBar />
      <Hero />
      <ProductViewer />
      <Showcase />
    </main>
  );
}
