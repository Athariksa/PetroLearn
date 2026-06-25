// Job board links for PetroLearn AI.
// These are link cards to live search pages, career portals, and
// industry-specific job boards -- not stored job postings -- so they stay
// current automatically without this site needing to scrape or maintain
// listings itself. Always open the link to see what's actually live.

const JOB_LINK_CATEGORIES = ["Indonesia", "Global / International", "Industry-Specific Boards", "Company Career Pages"];

const JOB_LINKS_DATA = [
  // --- Indonesia ---
  {
    category: "Indonesia",
    title: "Pertamina Recruitment Portal",
    url: "https://recruitment.pertamina.com/",
    description: "Official recruitment site for Pertamina and its upstream/downstream subholdings -- the most direct source for openings at Indonesia's national oil company.",
  },
  {
    category: "Indonesia",
    title: "SKK Migas - Announcements",
    url: "https://www.skkmigas.go.id/",
    description: "Check the announcements/pengumuman section for KKKS recruitment notices and industry vacancies coordinated through SKK Migas.",
  },
  {
    category: "Indonesia",
    title: "Indeed Indonesia - Migas / Oil and Gas search",
    url: "https://id.indeed.com/jobs?q=migas",
    description: "Live search results for 'migas' (oil and gas) postings across Indonesia, refreshed continuously by Indeed.",
  },
  {
    category: "Indonesia",
    title: "JobStreet Indonesia - Oil & Gas search",
    url: "https://www.jobstreet.co.id/id/oil-gas-jobs",
    description: "One of Indonesia's largest job portals; search or filter by 'oil and gas' / 'migas' for current openings.",
  },
  {
    category: "Indonesia",
    title: "LinkedIn Jobs - Indonesia, oil and gas",
    url: "https://www.linkedin.com/jobs/search/?keywords=oil%20and%20gas&location=Indonesia",
    description: "LinkedIn's live job search filtered to Indonesia and the keyword 'oil and gas' -- also useful for spotting which KKKS are actively hiring.",
  },

  // --- Global / International ---
  {
    category: "Global / International",
    title: "LinkedIn Jobs - Global, oil and gas",
    url: "https://www.linkedin.com/jobs/search/?keywords=oil%20and%20gas",
    description: "Global live search across LinkedIn for 'oil and gas' roles -- filter further by location, seniority, or company once there.",
  },
  {
    category: "Global / International",
    title: "Rigzone Jobs",
    url: "https://www.rigzone.com/oil/jobs/",
    description: "Long-running oil and gas industry job board covering drilling, production, engineering, and offshore roles worldwide.",
  },
  {
    category: "Global / International",
    title: "Oil and Gas Job Search",
    url: "https://www.oilandgasjobsearch.com/",
    description: "Industry-specific board aggregating upstream, midstream, and downstream vacancies from operators and service companies globally.",
  },
  {
    category: "Global / International",
    title: "Energy Jobline",
    url: "https://www.energyjobline.com/",
    description: "Energy-sector job board covering oil, gas, and increasingly renewables roles across multiple countries.",
  },

  // --- Industry-Specific Boards ---
  {
    category: "Industry-Specific Boards",
    title: "SPE Career Center",
    url: "https://careers.spe.org/",
    description: "Society of Petroleum Engineers' official career center, listing technical roles posted directly by employers in the SPE network.",
  },
  {
    category: "Industry-Specific Boards",
    title: "AAPG Career Center (Geoscience)",
    url: "https://careercenter.aapg.org/",
    description: "American Association of Petroleum Geologists job board, focused on geoscience and exploration roles.",
  },

  // --- Company Career Pages ---
  {
    category: "Company Career Pages",
    title: "Shell Careers",
    url: "https://www.shell.com/careers.html",
    description: "Official careers site for Shell, an integrated supermajor with global upstream, downstream, and trading roles.",
  },
  {
    category: "Company Career Pages",
    title: "ExxonMobil Careers",
    url: "https://corporate.exxonmobil.com/careers",
    description: "Official careers site for ExxonMobil, covering upstream, downstream, and chemicals roles globally.",
  },
  {
    category: "Company Career Pages",
    title: "SLB (Schlumberger) Careers",
    url: "https://careers.slb.com/",
    description: "Official careers site for SLB, one of the largest oilfield service companies, with field engineer and technical roles worldwide, including Indonesia.",
  },
  {
    category: "Company Career Pages",
    title: "Halliburton Careers",
    url: "https://careers.halliburton.com/",
    description: "Official careers site for Halliburton, a major oilfield service company with field-based and technical openings globally.",
  },
  {
    category: "Company Career Pages",
    title: "Petronas Careers",
    url: "https://www.petronas.com/careers",
    description: "Official careers site for Petronas, Malaysia's national oil company and a major regional employer in Southeast Asia.",
  },
];
