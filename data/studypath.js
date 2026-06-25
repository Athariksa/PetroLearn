// Study path data for PetroLearn AI, based on the "Suggested Beginner Study
// Path" section of the free/open sources document. Each step links to a
// module id where one exists; otherwise it is a free-text topic to study
// later (a module can be added for it down the line).

const STUDY_PATH_DATA = {
  Beginner: [
    { label: "Oil and Gas 101", moduleId: "oil-gas-101" },
    { label: "Petroleum Geology", moduleId: "petroleum-geology" },
    { label: "Petroleum System", moduleId: "petroleum-system" },
    { label: "Reservoir Rock Properties", moduleId: "reservoir-engineering" },
    { label: "Reservoir Fluid Properties", moduleId: "reservoir-engineering" },
    { label: "Drilling Basics", moduleId: "drilling-engineering" },
    { label: "Production Basics", moduleId: "production-engineering" },
    { label: "Petrophysics Basics", moduleId: "petrophysics-well-logging" },
    { label: "Glossary Review", moduleId: null, sectionId: "glossary" },
    { label: "Basic Quiz", moduleId: null, sectionId: "quiz" },
  ],
  Intermediate: [
    { label: "Reservoir Drive Mechanisms", moduleId: "reservoir-engineering" },
    { label: "Darcy's Law", moduleId: "reservoir-engineering" },
    { label: "Well Performance", moduleId: "production-engineering" },
    { label: "Well Logging Interpretation", moduleId: "petrophysics-well-logging" },
    { label: "Artificial Lift", moduleId: "production-engineering" },
    { label: "Decline Curve Analysis", moduleId: "data-lab-volve" },
    { label: "EOR Basics", moduleId: "eor-unconventional" },
    { label: "Volve Data Lab", moduleId: "data-lab-volve" },
  ],
  Advanced: [
    { label: "Reservoir Simulation", moduleId: "software-lab" },
    { label: "OPM Flow", moduleId: "software-lab" },
    { label: "Machine Learning for Well Logs", moduleId: "petrophysics-well-logging" },
    { label: "Seismic AI", moduleId: "seismic-geophysics" },
    { label: "Production Forecasting", moduleId: "data-lab-volve" },
    { label: "Formation Evaluation Benchmark", moduleId: null, sectionId: "research" },
    { label: "Open Research Papers", moduleId: null, sectionId: "research" },
  ],
};
