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

const DIVING_BLUR =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAMABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDmLKcQzqz/AHR1p+pyLJPvQ5DAEGqOTT2cugz/AA8CutVm4OBl7Nc/Mf/Z";

const MARATHON_BLUR =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAJABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCu2qL5ZIiAI7HvVK51R3wqIYuRlsZzUd3/AK5vpVUU+ZvqLlXY/9k=";

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
          eyebrow="SSI Divemaster"
          title="Leading underwater, and in the room"
          description="Three years on the board of Hacettepe University's Underwater Sports Club, the last as chairman. I organized dive trips and club events, assisted instructors in training new divers, and mentored the next generation of board members. As an SSI Divemaster — the highest rating I've reached, with 100+ logged dives — I lead certified divers on guided dives: reading conditions, keeping a group calm, and making the call when it matters."
          chips={["3 years on the board", "Chairman, final year", "100+ dives logged", "SSI Divemaster"]}
          imageSrc="/diving-banner.jpg"
          imageAlt="Ahmet Can Özdemir scuba diving"
          imagePosition="center 75%"
          blurDataURL={DIVING_BLUR}
        />
        <FeatureBanner
          id="marathon"
          eyebrow="Marathon"
          title="3:30 — exactly on target"
          description="At the 2025 Istanbul Marathon, I set a goal — a 3:30 finish — and hit it exactly. Running is where I practice the same discipline I bring to a messy dataset: set a target, build a plan, and execute against it. Not a one-off — I train and race year-round, chasing the next number."
          chips={["2025 Istanbul Marathon", "3:30 finish — goal hit exactly", "Races year-round"]}
          imageSrc="/marathon-banner.jpg"
          imageAlt="Ahmet Can Özdemir running the Istanbul Marathon"
          blurDataURL={MARATHON_BLUR}
        />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
