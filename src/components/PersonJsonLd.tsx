// Structured data (schema.org Person) so search engines can tie this site to
// the same person as the LinkedIn and GitHub profiles.
const SITE_URL = "https://acozdemir.com";

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ahmet Can Özdemir",
  url: SITE_URL,
  image: `${SITE_URL}/headshot.jpg`,
  jobTitle: "Senior Data Analyst",
  worksFor: { "@type": "Organization", name: "Turkish Aerospace" },
  knowsAbout: [
    "Data analysis",
    "Business intelligence",
    "Dashboard design",
    "KPI frameworks",
    "SQL",
  ],
  sameAs: ["https://linkedin.com/in/acozdemir", "https://github.com/ac-ozdemir"],
};

export default function PersonJsonLd() {
  return (
    <script
      type="application/ld+json"
      // Escaping "<" keeps the JSON from closing the script tag early.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }}
    />
  );
}
