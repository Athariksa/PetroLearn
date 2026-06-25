// Learning roadmap stages for PetroLearn AI.
// "relatedModules" references ids from data/modules.js (some stages have no
// dedicated module page yet -- those are marked with relatedModules: [] and
// can be expanded later).

const ROADMAP_DATA = [
  {
    id: "roadmap-oil-gas-101",
    stage: "Oil and Gas 101",
    difficulty: "Beginner",
    estimatedTime: "2-3 hours",
    relatedModules: ["oil-gas-101"],
    recommendedSources: [
      { title: "Alison: Petroleum Engineering Principles and Concepts", url: "https://alison.com/course/petroleum-engineering-principles-and-concepts" },
    ],
  },
  {
    id: "roadmap-petroleum-geology",
    stage: "Petroleum Geology",
    difficulty: "Beginner",
    estimatedTime: "3-4 hours",
    relatedModules: ["petroleum-geology"],
    recommendedSources: [{ title: "AAPG Wiki", url: "https://wiki.aapg.org/" }],
  },
  {
    id: "roadmap-petroleum-system",
    stage: "Petroleum System",
    difficulty: "Beginner",
    estimatedTime: "2-3 hours",
    relatedModules: ["petroleum-system"],
    recommendedSources: [{ title: "AAPG Wiki: Petroleum system", url: "https://wiki.aapg.org/Petroleum_system" }],
  },
  {
    id: "roadmap-reservoir-rock",
    stage: "Reservoir Rock Properties",
    difficulty: "Intermediate",
    estimatedTime: "4-5 hours",
    relatedModules: ["reservoir-engineering"],
    recommendedSources: [{ title: "Petroleum Reservoir Dynamics (Open Textbook)", url: "https://open.umn.edu/opentextbooks/textbooks/1812" }],
  },
  {
    id: "roadmap-reservoir-fluid",
    stage: "Reservoir Fluid Properties",
    difficulty: "Intermediate",
    estimatedTime: "4-5 hours",
    relatedModules: ["reservoir-engineering"],
    recommendedSources: [{ title: "NPTEL Petroleum Reservoir Engineering", url: "https://nptel.ac.in/courses/103103223" }],
  },
  {
    id: "roadmap-drive-mechanisms",
    stage: "Reservoir Drive Mechanisms",
    difficulty: "Intermediate",
    estimatedTime: "3-4 hours",
    relatedModules: ["reservoir-engineering"],
    recommendedSources: [{ title: "NPTEL Petroleum Reservoir Engineering", url: "https://nptel.ac.in/courses/103103223" }],
  },
  {
    id: "roadmap-drilling",
    stage: "Drilling Engineering",
    difficulty: "Intermediate",
    estimatedTime: "5-6 hours",
    relatedModules: ["drilling-engineering"],
    recommendedSources: [{ title: "Class Central: Drilling Engineering", url: "https://www.classcentral.com/subject/drilling-engineering" }],
  },
  {
    id: "roadmap-production",
    stage: "Production Engineering",
    difficulty: "Intermediate",
    estimatedTime: "5-6 hours",
    relatedModules: ["production-engineering"],
    recommendedSources: [{ title: "NExT Training", url: "https://www.nexttraining.net/" }],
  },
  {
    id: "roadmap-petrophysics",
    stage: "Petrophysics and Well Logging",
    difficulty: "Advanced",
    estimatedTime: "5-6 hours",
    relatedModules: ["petrophysics-well-logging"],
    recommendedSources: [{ title: "SLB Energy Glossary", url: "https://glossary.slb.com/en/" }],
  },
  {
    id: "roadmap-eor-unconventional",
    stage: "Enhanced Oil Recovery and Unconventional Resources",
    difficulty: "Advanced",
    estimatedTime: "4-5 hours",
    relatedModules: ["eor-unconventional"],
    recommendedSources: [{ title: "NPTEL Petroleum Reservoir Engineering", url: "https://nptel.ac.in/courses/103103223" }],
  },
  {
    id: "roadmap-economics",
    stage: "Petroleum Economics",
    difficulty: "Intermediate",
    estimatedTime: "3-4 hours",
    relatedModules: [],
    recommendedSources: [{ title: "NExT Training", url: "https://www.nexttraining.net/" }],
  },
  {
    id: "roadmap-data-software-lab",
    stage: "Data and Software Lab",
    difficulty: "Advanced",
    estimatedTime: "Open-ended",
    relatedModules: ["data-lab-volve", "software-lab"],
    recommendedSources: [
      { title: "Equinor Volve Data Sharing", url: "https://www.equinor.com/energy/volve-data-sharing" },
      { title: "Open Porous Media Project", url: "https://opm-project.org/" },
    ],
  },
];
