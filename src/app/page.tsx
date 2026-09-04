import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import FeatureBanner from "@/components/FeatureBanner";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Stats />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <FeatureBanner
          id="diving"
          eyebrow="SSI Dive Master"
          title="Leading underwater, and in the room"
          description="Three years on the board of my university's scuba diving club — the final year as chairman. Leading dive teams through changing conditions and real safety stakes taught me to stay calm, read the situation, and make the call."
          chips={["3 years on the board", "Chairman, final year", "SSI Dive Master"]}
          imageAlt="Ahmet Can Özdemir scuba diving"
        />
        <FeatureBanner
          id="marathon"
          eyebrow="Marathon"
          title="Twenty-six, and still finishing what I start"
          description="At 26, I ran and finished my first marathon — the same discipline that turns a messy dataset into an answer: break the problem down, pace yourself, and keep moving until it's done."
          chips={["Marathon finisher", "Age 26"]}
          imageAlt="Ahmet Can Özdemir running a marathon"
        />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
