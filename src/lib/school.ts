export const school = {
  name: "St. Joseph's National School, Rapogi",
  shortName: "St. Joseph's Rapogi",
  /** Name shown at the top of Google search results. */
  searchName: "St Joseph's Rapogi",
  motto: "Sharpening for the Future",
  pillars: ["Discipline", "Excellence", "Integrity"],
  location: "Sare, Uriri Sub-county, Migori County, Kenya",
  type: "Public Boys' Boarding National School",
  cluster: "C1",
  founded: 1961,
  principal: "Mr. Erastus Nyagwa",
  deputyPrincipal: {
    name: "Mr Duncan Jumba",
    role: "Deputy Principal, Administration",
  },
  /**
   * The school documentary, hosted on YouTube. Paste any YouTube link (or just the
   * video ID) into `youtubeUrl` and the player appears on the site automatically.
   */
  video: {
    youtubeUrl: "",
    title: "St. Joseph's National School, Rapogi — documentary",
    description:
      "A documentary film about life at St. Joseph's Rapogi: our history, classrooms, sports and students.",
    /** YYYY-MM-DD from the YouTube upload date — Google needs it to show the film in results. */
    uploadDate: "2024-11-19",
  },
  meanScore: "9.1264",
  annualFees: "KSh 53,554",
  phones: ["+254 732 441252", "+254 709 841539"] as [string, ...string[]],
  email: "rapogihighschool@gmail.com",
  postal: "P.O. Box 2, Sare-Awendo, 40405, Kenya",
};

export const telHref = (phone: string) => `tel:${phone.replace(/\s/g, "")}`;

export const navLinks = [
  { to: "/about", label: "About" },
  { to: "/academics", label: "Academics" },
  { to: "/student-life", label: "Student Life" },
  { to: "/admissions", label: "Admissions" },
  { to: "/alumni", label: "Alumni" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
] as const;
