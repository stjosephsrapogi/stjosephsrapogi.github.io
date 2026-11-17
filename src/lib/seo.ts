import { school } from "./school";

/** Public address of the live website. Change this one line if the site moves to a new domain. */
export const SITE_URL = "https://stjosephsrapogi.github.io";

export const absoluteUrl = (path: string) => `${SITE_URL}${path === "/" ? "/" : path}`;

type PageSeo = {
  path: string;
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  /** Share picture in public/og/, 1200x630. */
  ogImage: string;
  ogImageAlt: string;
};

/** Builds the complete head (title, description, canonical, Open Graph, Twitter) for a page. */
export function pageHead(p: PageSeo) {
  const url = absoluteUrl(p.path);
  const image = `${SITE_URL}${p.ogImage}`;
  return {
    meta: [
      { title: p.title },
      { name: "description", content: p.description },
      { property: "og:title", content: p.ogTitle },
      { property: "og:description", content: p.ogDescription },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { property: "og:site_name", content: school.searchName },
      { property: "og:locale", content: "en_KE" },
      { property: "og:image", content: image },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: p.ogImageAlt },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: p.ogTitle },
      { name: "twitter:description", content: p.ogDescription },
      { name: "twitter:image", content: image },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

/** Every public page, used for the sitemap and for pre-building static HTML. */
export const sitePages = [
  "/",
  "/about",
  "/academics",
  "/student-life",
  "/admissions",
  "/alumni",
  "/gallery",
  "/contact",
] as const;

/** Tells Google which name to show for the site in search results (homepage only). */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: school.searchName,
    alternateName: [school.shortName, school.name, "Rapogi High School"],
    url: `${SITE_URL}/`,
    publisher: { "@id": `${SITE_URL}/#school` },
  };
}

/** Structured data so Google understands this is a school, with its address and contacts. */
export function schoolJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HighSchool",
    "@id": `${SITE_URL}/#school`,
    name: school.name,
    alternateName: [school.searchName, school.shortName, "Rapogi High School", "St. Joseph's School Rapogi"],
    url: `${SITE_URL}/`,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/icon-512.png`, width: 512, height: 512 },
    image: `${SITE_URL}/og/home.jpg`,
    description: `${school.type} in ${school.location}, founded in ${school.founded}. ${school.motto}.`,
    slogan: school.motto,
    foundingDate: String(school.founded),
    telephone: school.phones[0],
    email: school.email,
    address: {
      "@type": "PostalAddress",
      postOfficeBoxNumber: "2",
      addressLocality: "Sare-Awendo",
      addressRegion: "Migori County",
      postalCode: "40405",
      addressCountry: "KE",
    },
    contactPoint: school.phones.map((telephone) => ({
      "@type": "ContactPoint",
      telephone,
      email: school.email,
      contactType: "admissions",
      areaServed: "KE",
      availableLanguage: ["English", "Swahili"],
    })),
    employee: { "@type": "Person", name: school.principal, jobTitle: "Chief Principal" },
  };
}
