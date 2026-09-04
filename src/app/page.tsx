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
          description="Three years on the board of Hacettepe University's Underwater Sports Club, the last as chairman. I organized dive trips and club events, assisted instructors in training new divers, and mentored the next generation of board members. As an SSI Dive Master — the highest rating I've reached, with 100+ logged dives — I lead certified divers on guided dives: reading conditions, keeping a group calm, and making the call when it matters."
          chips={["3 years on the board", "Chairman, final year", "100+ dives logged", "SSI Dive Master"]}
          imageAlt="Ahmet Can Özdemir scuba diving"
        />
        <FeatureBanner
          id="marathon"
          eyebrow="Marathon"
          title="3:30 — exactly on target"
          description="At the 2025 Istanbul Marathon, I set a goal — a 3:30 finish — and hit it exactly. Running is where I practice the same discipline I bring to a messy dataset: set a target, build a plan, and execute against it. Not a one-off — I train and race year-round, chasing the next number."
          chips={["2025 Istanbul Marathon", "3:30 finish — goal hit exactly", "Races year-round"]}
          imageAlt="Ahmet Can Özdemir running the Istanbul Marathon"
        />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
