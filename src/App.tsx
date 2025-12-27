import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { WorkGrid } from "./components/WorkGrid";
import { DesignProcess } from "./components/DesignProcess";
import { Tools } from "./components/Tools";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <WorkGrid />
        <DesignProcess />
        <Tools />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}