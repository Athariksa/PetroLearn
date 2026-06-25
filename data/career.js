// career.js
// Data for the Career Prep section: role profiles, a fictitious job posting
// breakdown, certifications, a career roadmap by audience/path, and ranked
// companies/countries. All content is original guidance text, not copied
// from any single employer or source.
//
// Note on COMPANIES_DATA / COUNTRIES_DATA: rankings below are illustrative
// and point-in-time (similar in spirit to public EIA/OPEC/Fortune-style
// snapshots), not a live feed. Figures shift year to year -- check
// eia.gov, opec.org, or each company's annual report for current numbers.

const CAREER_ROLES_DATA = [
  {
    id: "drilling-engineer",
    title: "Drilling Engineer",
    category: "Drilling",
    blurb: "Plans and supervises how a well is physically built -- safely, on time, and on budget.",
    dailyResponsibilities: [
      "Review daily drilling reports (DDRs) and compare actual vs planned progress",
      "Monitor mud weight, hole cleaning, and torque/drag trends on active wells",
      "Coordinate with the rig site (company man, mud engineer, directional driller) on plan changes",
      "Update drilling programs and casing/cementing designs for upcoming wells",
    ],
    skillsNeeded: [
      "Well control fundamentals (kicks, BOPs)",
      "Hydraulics and torque/drag calculations",
      "Casing design and cementing principles",
      "Risk assessment under time pressure",
    ],
    tools: ["Landmark/Halliburton WellPlan", "Drillworks", "Excel/Python for hydraulics checks", "Daily report software (e.g., Peloton, EDR systems)"],
    relevantTopics: ["drilling-engineering", "oil-gas-101"],
    realProblems: [
      "Torque suddenly increases while drilling -- is it a packed-off hole, a bit issue, or a tight spot?",
      "Mud losses to a fractured zone threaten well control margins",
      "A directional well is drifting off the planned trajectory and needs a correction run",
    ],
    personaFit: "People who like solving physical, hands-on problems under pressure, are comfortable making fast decisions with incomplete data, and don't mind rig schedules (rotations, time at the wellsite).",
    careerLadder: ["Graduate Trainee (rig-based rotations, shadowing)", "Junior Drilling Engineer (well planning support)", "Drilling Engineer (owns well programs)", "Senior Drilling Engineer (multi-well, complex wells)", "Drilling Superintendent / Manager"],
  },
  {
    id: "reservoir-engineer",
    title: "Reservoir Engineer",
    category: "Reservoir",
    blurb: "Estimates how much hydrocarbon is in the ground and how best to produce it over the field's life.",
    dailyResponsibilities: [
      "Update material balance or simulation models with new production/pressure data",
      "Forecast production rates and remaining reserves for the next budget cycle",
      "Recommend well intervention, infill drilling, or injection strategy changes",
      "Support economics with production profiles for new development decisions",
    ],
    skillsNeeded: [
      "PVT and material balance",
      "Decline curve analysis",
      "Reservoir simulation basics",
      "Statistics and uncertainty/probabilistic reserves (P10/P50/P90)",
    ],
    tools: ["Eclipse / OPM Flow", "Petrel RE", "MBAL / Harmony", "Python/pandas for production analysis"],
    relevantTopics: ["reservoir-engineering", "eor-unconventional"],
    realProblems: [
      "A well's production is declining faster than the type curve predicted -- why?",
      "Should the field invest in a waterflood, or is primary depletion still economic?",
      "Reserves estimates from two methods (decline curve vs simulation) disagree -- which do you trust and why?",
    ],
    personaFit: "People who enjoy modeling, numerical reasoning, and living with uncertainty -- a reservoir engineer's forecast is always a best estimate, not a guarantee.",
    careerLadder: ["Graduate Trainee (data QC, simple decline curves)", "Junior Reservoir Engineer (single-asset support)", "Reservoir Engineer (owns a field's forecast)", "Senior Reservoir Engineer (full-field studies)", "Reservoir Engineering Specialist / Subsurface Manager"],
  },
  {
    id: "production-engineer",
    title: "Production Engineer",
    category: "Production",
    blurb: "Keeps already-drilled wells flowing efficiently and troubleshoots performance problems.",
    dailyResponsibilities: [
      "Review well test data and flag underperforming wells",
      "Run nodal analysis to diagnose whether a problem is reservoir, wellbore, or surface-side",
      "Plan and evaluate workovers, stimulation jobs, or artificial lift changes",
      "Track water cut, GOR, and choke settings across a portfolio of wells",
    ],
    skillsNeeded: [
      "Nodal analysis (IPR/TPR)",
      "Artificial lift selection and troubleshooting",
      "Basic facilities/separation knowledge",
      "Root-cause diagnostic thinking",
    ],
    tools: ["Prosper / PIPESIM", "Excel/Python for well test analysis", "SCADA/production data dashboards"],
    relevantTopics: ["production-engineering", "petroleum-economics"],
    realProblems: [
      "A well's oil rate drops by 30% over a month with stable choke settings -- reservoir decline, skin damage, or a lift problem?",
      "Water cut is climbing on several wells -- is this water breakthrough or a mechanical issue (e.g., tubing leak)?",
      "Should a marginal well get a workover, or is it more economic to let it decline?",
    ],
    personaFit: "People who like ongoing troubleshooting more than long-range planning, enjoy a portfolio of wells to manage rather than one big project, and like seeing the immediate impact of a fix.",
    careerLadder: ["Graduate Trainee (well test review, shadowing)", "Junior Production Engineer (single-field support)", "Production Engineer (owns a well portfolio)", "Senior Production Engineer (optimization programs)", "Production Engineering Lead / Operations Manager"],
  },
  {
    id: "petroleum-geologist",
    title: "Petroleum Geologist",
    category: "Geoscience",
    blurb: "Interprets rock and basin history to find where hydrocarbons are likely trapped.",
    dailyResponsibilities: [
      "Interpret seismic sections and well logs to map structure and stratigraphy",
      "Build and update prospect maps and risk assessments for exploration targets",
      "Integrate core, log, and seismic data into a consistent geological story",
      "Present prospect risking (source, reservoir, seal, trap, timing) to management",
    ],
    skillsNeeded: [
      "Seismic and well-log interpretation",
      "Basin and petroleum systems analysis",
      "Structural and stratigraphic mapping",
      "Probabilistic risk assessment of prospects",
    ],
    tools: ["Petrel", "Kingdom / SeisWare", "ArcGIS/QGIS", "Techlog (for integrated log work)"],
    relevantTopics: ["petroleum-geology", "petroleum-system", "seismic-geophysics"],
    realProblems: [
      "A seismic amplitude anomaly could be a hydrocarbon indicator or just a lithology contrast -- how do you de-risk it?",
      "Two wells with similar logs in the same trend produced very differently -- what changed geologically?",
      "Migration pathway analysis suggests the trap formed after the main charge window -- is the prospect still worth drilling?",
    ],
    personaFit: "People who like piecing together an incomplete story from indirect evidence, enjoy spatial/visual reasoning, and are comfortable with exploration risk (many prospects don't pan out).",
    careerLadder: ["Graduate Trainee (mapping support, log correlation)", "Junior Geologist (prospect support)", "Geologist (owns prospect generation)", "Senior Geologist (basin studies, play assessment)", "Chief Geologist / Exploration Manager"],
  },
  {
    id: "petrophysicist",
    title: "Petrophysicist",
    category: "Petrophysics",
    blurb: "Turns well log measurements into quantitative rock and fluid properties (porosity, saturation, net pay).",
    dailyResponsibilities: [
      "QC and normalize raw log curves from multiple logging runs/vendors",
      "Run log interpretation models (e.g., Archie's equation) to estimate Sw and porosity",
      "Calibrate log-derived properties against core data where available",
      "Deliver net-pay and reservoir-quality summaries to reservoir engineers and geologists",
    ],
    skillsNeeded: [
      "Log interpretation (gamma ray, resistivity, density, neutron, sonic)",
      "Archie's equation and saturation modeling",
      "Core-to-log calibration",
      "Statistics for uncertainty in petrophysical estimates",
    ],
    tools: ["Techlog", "Geolog", "lasio (Python) for log data", "Interactive Petrophysics (IP)"],
    relevantTopics: ["petrophysics-well-logging"],
    realProblems: [
      "Two adjacent wells give very different water saturation estimates from the same Archie parameters -- is the rock different, or is something wrong with the log data?",
      "A new well has only a partial logging suite -- which properties can you still estimate reliably, and which are too uncertain?",
      "Core porosity and log porosity disagree by several percentage points -- which do you trust, and why?",
    ],
    personaFit: "People who like precise, detail-oriented quantitative work and are comfortable being the technical authority other disciplines lean on for 'what does the rock actually look like here'.",
    careerLadder: ["Graduate Trainee (log QC)", "Junior Petrophysicist (single-well interpretation)", "Petrophysicist (field-level studies)", "Senior Petrophysicist (multi-field, complex lithologies)", "Petrophysics Team Lead / Subsurface Specialist"],
  },
  {
    id: "wellsite-geologist",
    title: "Wellsite Geologist",
    category: "Geoscience",
    blurb: "Works directly at the rig, monitoring cuttings, gas, and logs in real time as a well is drilled.",
    dailyResponsibilities: [
      "Describe drill cuttings and compare actual lithology to the pre-drill prognosis",
      "Monitor mud logging gas readings and flag shows or potential overpressure",
      "Coordinate real-time decisions (e.g., when to stop drilling and log/case) with the office geology team",
      "Write daily geological reports for the wellsite and asset team",
    ],
    skillsNeeded: [
      "Cuttings/core description",
      "Mud logging and gas-show interpretation",
      "Real-time decision-making under rig time pressure",
      "Clear, fast communication with both rig crew and office",
    ],
    tools: ["Mud logging unit software", "WellSeen / Geolog real-time tools", "Hand lens, sample trays (still very physical work)"],
    relevantTopics: ["petroleum-geology", "drilling-engineering"],
    realProblems: [
      "Cuttings suggest the well has reached the target formation earlier than predicted -- do you recommend stopping to log now?",
      "Gas readings spike suddenly -- is this a real show, background gas, or a mud system artifact?",
      "The pre-drill prognosis and what you're actually seeing in cuttings don't match -- how do you reconcile and report it?",
    ],
    personaFit: "People who want geology with an operational, field-based, real-time edge rather than office-based interpretation, and who don't mind remote rig rotations.",
    careerLadder: ["Graduate Wellsite Geologist (supervised rotations)", "Wellsite Geologist (independent rotations)", "Senior Wellsite Geologist (complex/HPHT wells)", "Geology Operations Coordinator / Office Geologist transition"],
  },
  {
    id: "hse-officer",
    title: "HSE Officer / Engineer",
    category: "HSE",
    blurb: "Keeps people, assets, and the environment safe across operations -- arguably the most universally required role in the industry.",
    dailyResponsibilities: [
      "Review and approve permits to work (PTW) for site activities",
      "Conduct or audit job safety analyses (JSAs) before high-risk tasks",
      "Run safety briefings, toolbox talks, and emergency drills",
      "Investigate incidents/near-misses and track corrective actions",
    ],
    skillsNeeded: [
      "Hazard identification and risk assessment",
      "Permit-to-work and job safety analysis processes",
      "Incident investigation and root-cause analysis",
      "Calm, assertive communication -- you sometimes have to stop work",
    ],
    tools: ["Permit-to-work systems (e.g., Intelex, Enablon)", "Risk matrices/checklists", "Gas detection equipment basics", "Incident reporting databases"],
    relevantTopics: ["hse-oil-gas"],
    realProblems: [
      "A crew wants to skip a step in the permit process to save time -- how do you handle it without stopping all trust?",
      "A near-miss happened but nobody wants to report it -- how do you build a culture where they do?",
      "Two contractors are doing overlapping high-risk work in the same area (e.g., lifting and hot work) -- how do you sequence it safely?",
    ],
    personaFit: "People who are detail-oriented, comfortable being the one who says 'stop' when something looks unsafe, and who genuinely care about people going home in one piece -- not just ticking boxes.",
    careerLadder: ["HSE Trainee / Graduate (site inductions, documentation)", "HSE Officer (day-to-day permits and audits)", "Senior HSE Engineer / Advisor (program design)", "HSE Manager (site or asset-level)", "HSE Director / VP HSE"],
  },
  {
    id: "field-service-engineer",
    title: "Field Engineer / Service Engineer",
    category: "Production",
    blurb: "Works for an oilfield service company (e.g., wireline, cementing, coiled tubing) delivering a specific technical service at the wellsite.",
    dailyResponsibilities: [
      "Mobilize equipment and crew to a wellsite job",
      "Run and supervise the service job (e.g., perforation, cementing, logging run)",
      "Troubleshoot equipment or job issues in real time at the wellsite",
      "Report job results back to the client (operator) and internal engineering",
    ],
    skillsNeeded: [
      "Deep knowledge of one specific service line's equipment and procedures",
      "Hands-on mechanical/electrical troubleshooting",
      "Client-facing communication under pressure",
      "Strict adherence to HSE procedures (this role is often the most field-exposed)",
    ],
    tools: ["Service-line-specific software (varies by company/discipline)", "Wellsite data acquisition units", "Standard rig-site PPE and safety equipment"],
    relevantTopics: ["drilling-engineering", "production-engineering", "hse-oil-gas"],
    realProblems: [
      "A wireline tool gets stuck downhole during a logging run -- what's the fishing/recovery plan?",
      "Equipment fails right before a scheduled job -- do you delay, substitute equipment, or troubleshoot on site?",
      "The client wants a non-standard procedure to save time -- does it violate your company's safety standards?",
    ],
    personaFit: "People who want to be physically at the wellsite often, like learning one service deeply rather than broad subsurface theory, and are comfortable with significant travel/rotation.",
    careerLadder: ["Field Engineer Trainee (shadowing, equipment basics)", "Field Engineer (independent jobs)", "Senior Field Engineer (complex jobs, crew lead)", "Service Supervisor / District Engineer", "Technical Sales / Operations Manager"],
  },
  {
    id: "process-engineer",
    title: "Process Engineer",
    category: "Production",
    blurb: "Designs and troubleshoots the surface facilities that separate, treat, and prepare oil, gas, and water for sale or disposal.",
    dailyResponsibilities: [
      "Review and update process flow diagrams (PFDs) and P&IDs for facilities",
      "Size or troubleshoot separators, pumps, compressors, and treatment units",
      "Run process simulations for new tie-ins or capacity upgrades",
      "Support HAZOP/HAZID studies for new or modified equipment",
    ],
    skillsNeeded: [
      "Multiphase flow and separation principles",
      "Process simulation software",
      "Equipment sizing fundamentals (pumps, vessels, compressors)",
      "HAZOP participation and process safety awareness",
    ],
    tools: ["Aspen HYSYS / PRO-II", "AutoCAD / P&ID software", "Excel/Python for mass-balance checks"],
    relevantTopics: ["production-engineering"],
    realProblems: [
      "A separator is carrying over liquid into the gas line -- is it undersized, or is the upstream slug flow worse than design?",
      "A facility is being tied into new wells -- does it have spare capacity, or does it need an upgrade?",
      "A HAZOP flags a credible overpressure scenario -- what's the mitigation (relief valve sizing, interlock, procedure)?",
    ],
    personaFit: "People who like systems-level design thinking, are comfortable with simulation software, and enjoy facilities/mechanical-adjacent engineering more than subsurface uncertainty.",
    careerLadder: ["Graduate Process Engineer (design support)", "Junior Process Engineer (single-unit studies)", "Process Engineer (facility-level ownership)", "Senior Process Engineer (HAZOP lead, major projects)", "Principal Process Engineer / Engineering Manager"],
  },
  {
    id: "subsurface-data-analyst",
    title: "Subsurface Data Analyst",
    category: "Data & Software",
    blurb: "Bridges subsurface domain knowledge (geology, reservoir, petrophysics) with data engineering and analytics tools.",
    dailyResponsibilities: [
      "Clean, merge, and QC production, well, and log data from multiple source systems",
      "Build dashboards and automated reports for asset teams",
      "Support or build machine learning models for forecasting or anomaly detection",
      "Maintain data pipelines connecting subsurface databases to analytics tools",
    ],
    skillsNeeded: [
      "Python/pandas (or similar) for data wrangling",
      "SQL and basic database concepts",
      "Enough subsurface domain knowledge to sanity-check results",
      "Data visualization and clear communication to non-technical stakeholders",
    ],
    tools: ["Python (pandas, matplotlib, scikit-learn)", "SQL / Spotfire / Power BI", "lasio, OPM Flow outputs, or vendor APIs depending on employer"],
    relevantTopics: ["ai-ml-oil-gas", "data-lab-volve", "software-lab"],
    realProblems: [
      "Production data has gaps and shut-ins that are silently skewing a decline curve fit -- how do you detect and handle them?",
      "A machine learning model performs great on training wells but poorly on new wells -- is this overfitting, data leakage, or a real domain shift?",
      "Two databases report different values for the same well's cumulative production -- how do you reconcile and decide which is authoritative?",
    ],
    personaFit: "People who enjoy coding and data work but still want their work to matter in a physical, real-world domain rather than a purely abstract dataset.",
    careerLadder: ["Graduate Data Analyst (cleaning, reporting)", "Junior Subsurface Data Analyst (dashboard ownership)", "Subsurface Data Analyst (model building, pipeline ownership)", "Senior Data Analyst / Data Scientist", "Digital/Data Lead for an asset or department"],
  },
];

const JOB_POSTING_EXAMPLE_DATA = {
  title: "Fictitious example: Junior Reservoir Engineer",
  rawText: [
    "We are seeking a Junior Reservoir Engineer to join our Asset Team.",
    "Requirements: Bachelor's degree in Petroleum Engineering or related field. 0-3 years of experience. Strong understanding of material balance and decline curve analysis. Proficiency in Excel required.",
    "Preferred qualifications: Experience with reservoir simulation software (Eclipse or OPM Flow). Exposure to Python or other scripting languages for data analysis. SPE membership.",
    "Certifications: None mandatory, but well control awareness training is a plus.",
    "Field experience: Willingness to travel to field locations for periodic well reviews (up to 10% of time).",
    "Soft skills: Strong communication skills to work with multidisciplinary asset teams. Ability to manage multiple well/field assignments under deadlines.",
  ],
  breakdown: [
    {
      label: "Requirement (must-have)",
      explanation: "\"Bachelor's degree... 0-3 years... material balance and decline curve analysis... Excel required\" -- these are the hard filters. If you don't meet them, your application is often screened out before a human reads it. Make sure your CV explicitly uses these exact terms (material balance, decline curve analysis) if you've done coursework or projects in them.",
    },
    {
      label: "Preferred qualification (nice-to-have)",
      explanation: "\"Experience with... Eclipse or OPM Flow... Python... SPE membership\" -- these don't disqualify you if missing, but they're tie-breakers between similar candidates. A free OPM Flow tutorial project or a Software Lab exercise from this site is enough to honestly list here.",
    },
    {
      label: "Certification",
      explanation: "\"Well control awareness training is a plus\" -- for a reservoir role this is optional; for drilling/production/HSE roles, certifications like IWCF/IADC are often closer to a requirement. Always read whether a certification is listed under Requirements vs Preferred.",
    },
    {
      label: "Software skill",
      explanation: "Excel is a hard requirement here -- don't skip listing it even though it sounds basic, because some applicant-tracking systems keyword-match on it. Simulation software (Eclipse/OPM Flow) is preferred -- listing equivalent free tools you've used (like OPM Flow) is a fair and honest substitute.",
    },
    {
      label: "Field experience",
      explanation: "\"Willingness to travel... up to 10% of time\" tells you the day-to-day reality of the job: this is mostly office-based with occasional field visits, unlike a Wellsite Geologist or Field Engineer role which is field-based most of the time.",
    },
    {
      label: "Soft skill",
      explanation: "\"Strong communication... manage multiple... assignments under deadlines\" signals this role works across disciplines (geology, drilling, economics) and juggles several wells/fields at once -- worth preparing a specific example of cross-team communication for the interview.",
    },
  ],
  tip: "When you read any real posting, sort every line into one of these six buckets before you decide whether to apply. Missing a few 'preferred' items is normal; missing several 'requirement' items means you should target a more junior posting instead.",
};

const CERTIFICATIONS_DATA = [
  {
    name: "SPE Membership / Student Chapter",
    what: "Society of Petroleum Engineers membership, often free or discounted for students, gives access to papers (OnePetro), local chapter events, and sometimes scholarships or paper-writing competitions.",
    whoNeedsIt: "Any student or early-career professional in upstream technical roles.",
    howToGet: "Join online via spe.org; many universities have an active local student chapter you can join directly.",
  },
  {
    name: "IWCF / IADC Well Control",
    what: "Industry-recognized well control certification (Surface or Subsea stack, various levels) proving you understand kick detection and well control procedures.",
    whoNeedsIt: "Drilling engineers, wellsite supervisors, mud engineers -- often a hard requirement to even visit certain rig sites.",
    howToGet: "Accredited training centers run multi-day courses ending in a proctored exam; check iwcf.org or iadc.org for accredited providers near you.",
  },
  {
    name: "NEBOSH / IOSH (HSE)",
    what: "NEBOSH (National/International General Certificate) and IOSH (Managing Safely) are globally recognized HSE qualifications covering risk assessment, legal frameworks, and safety management.",
    whoNeedsIt: "HSE Officers/Engineers, and increasingly expected of supervisors and engineers in any field-facing role.",
    howToGet: "Offered by accredited training providers worldwide, often as a 1-2 week course plus written exam; NEBOSH General Certificate is the most commonly requested baseline.",
  },
  {
    name: "HUET / BOSIET (Offshore)",
    what: "Helicopter Underwater Escape Training (HUET) and Basic Offshore Safety Induction and Emergency Training (BOSIET) -- practical survival training for anyone going offshore.",
    whoNeedsIt: "Anyone visiting an offshore platform or rig, regardless of discipline.",
    howToGet: "OPITO-approved training centers; typically a 2-3 day course with pool/sea survival exercises, valid for a limited period (commonly 4 years) before refresher.",
  },
  {
    name: "H2S Safety",
    what: "Short course covering hydrogen sulfide hazard awareness, detection, and emergency response -- H2S is colorless, can be lethal at low concentrations, and is common in many reservoirs.",
    whoNeedsIt: "Anyone working at a wellsite or facility where H2S exposure is possible -- essentially most field roles.",
    howToGet: "Widely available 1-day courses from safety training providers; often a prerequisite just to badge into a site.",
  },
  {
    name: "Software training (Petrel, Eclipse, CMG, Techlog, Python, MATLAB, QGIS)",
    what: "Vendor or open-source training in the specific software your target discipline uses day to day.",
    whoNeedsIt: "Subsurface and data-facing roles; expectations vary -- e.g., Petrel/Techlog for geoscience and petrophysics, Eclipse/CMG for reservoir, Python for almost everyone now.",
    howToGet: "Schlumberger/SLB and CMG offer free or discounted academic licenses and tutorials for students; Python/QGIS/MATLAB have free or open-source learning paths (see this site's Software Lab and Sources pages).",
  },
];

const CAREER_ROADMAP_DATA = {
  "Year 1-2 student": [
    "Build a strong foundation in math, physics, chemistry, and geology -- these underpin every petroleum discipline later.",
    "Work through this site's Oil and Gas 101, Petroleum Geology, and Petroleum System modules to get oriented.",
    "Join (or start) your university's SPE student chapter; attend talks even before you know your specialization.",
    "Start learning Python or Excel data analysis early -- it pays off in every discipline.",
  ],
  "Year 3-4 student": [
    "Pick 1-2 disciplines to go deeper in (e.g., Reservoir + Data, or Drilling + HSE) based on what you enjoyed in Year 1-2.",
    "Do at least one hands-on project with open data (this site's Data Lab using the Volve dataset is a good start).",
    "Apply for internships -- even unpaid or short ones are far more valuable on a CV than another course.",
    "Start collecting one certification that matches your target discipline (e.g., H2S Safety is cheap and broadly useful).",
  ],
  "Fresh graduate": [
    "Tailor your CV per application using the job-posting breakdown method above -- generic CVs get filtered out fast.",
    "Target graduate trainee / junior programs specifically -- they expect 0-2 years experience, unlike generic postings.",
    "Use the Interview Bank on this site to practice explaining your reasoning out loud, not just knowing the answer.",
    "Network deliberately: SPE events, alumni in the industry, and LinkedIn outreach with a specific, genuine question outperform mass-applying.",
  ],
  "Career switcher": [
    "Identify which of your existing skills transfer directly (e.g., data analysis, mechanical/process engineering, project management, safety roles in other industries).",
    "Target roles that explicitly value transferable skills first: Subsurface Data Analyst, Process Engineer, HSE Officer often have the lowest domain-specific entry bar.",
    "Take a structured course (NPTEL, PetroSkills, or this site's modules) to fill domain-knowledge gaps quickly and be able to speak the vocabulary in interviews.",
    "Be upfront in interviews about your transition story -- frame it as added breadth, not a weakness.",
  ],
};

// Short, original-text overview of how Indonesia's upstream industry is
// structured -- relevant for readers targeting jobs in Indonesia, where the
// contract model (PSC / Gross Split) differs from concession-style regimes
// used in some other countries.
const INDONESIA_REGULATION_DATA = {
  intro:
    "Indonesia was a founding OPEC member and pioneered the Production Sharing Contract (PSC) model in the 1960s, now used by many other producing countries. Unlike a concession system, the state always retains ownership of the hydrocarbons; companies are contractors that take on exploration risk in exchange for a share of production.",
  structure: [
    { label: "Ministry of ESDM", detail: "Sets overall energy policy and approves major decisions such as Plan of Development (POD) and Working Area (Wilayah Kerja) tenders." },
    { label: "SKK Migas", detail: "The operational regulator that manages day-to-day upstream cooperation contracts, approves budgets (work programs), and monitors KKKS performance on behalf of the state." },
    { label: "KKKS (contractors)", detail: "State (Pertamina subholding upstream) and foreign/private companies that hold a Working Area under a PSC or Gross Split contract and carry out exploration and production." },
    { label: "Pertamina", detail: "The national oil company, active both as a KKKS operator in its own Working Areas and, since 2018 reforms, as the entity offered first right of refusal on Working Areas approaching contract expiry." },
  ],
  contractModels: [
    {
      name: "Cost Recovery PSC",
      detail: "The original Indonesian model (used from the 1960s through the 2010s for most contracts): the contractor recovers allowable costs from gross production first, then the remaining profit hydrocarbons are split between contractor and state at a pre-agreed ratio (commonly cited around 85:15 for oil and 70:30 for gas before tax, though actual splits vary by contract and incentives).",
    },
    {
      name: "Gross Split",
      detail: "Introduced in 2017 to simplify cost audits and speed up project sanctioning: the production split is agreed upfront (with base splits adjusted by field-specific and price-based variables), and the contractor funds its own costs without claiming them back from the state.",
    },
  ],
  whyItMatters:
    "If you're interviewing for a role in Indonesia (or any PSC-based regime), expect questions about how the contract type affects project economics -- a Gross Split contract puts more cost-control incentive directly on the contractor than Cost Recovery does, which changes how engineers justify spending.",
};

const CAREER_PATHS_DATA = [
  { id: "subsurface", label: "Subsurface Path", roles: ["petroleum-geologist", "reservoir-engineer", "petrophysicist", "wellsite-geologist"], moduleCategories: ["Geoscience", "Reservoir", "Petrophysics", "Geophysics"] },
  { id: "drilling", label: "Drilling Path", roles: ["drilling-engineer", "field-service-engineer"], moduleCategories: ["Drilling"] },
  { id: "production", label: "Production Path", roles: ["production-engineer", "process-engineer", "field-service-engineer"], moduleCategories: ["Production"] },
  { id: "hse", label: "HSE Path", roles: ["hse-officer"], moduleCategories: ["HSE"] },
  { id: "data-software", label: "Data & Software Path", roles: ["subsurface-data-analyst"], moduleCategories: ["Data & Software", "Economics"] },
];

// Illustrative, point-in-time snapshot -- not a live feed. Verify current
// figures at eia.gov, opec.org, or each company's investor relations page.
// Expanded beyond the original top 10 to include major NOCs from Asia,
// Africa, and the Middle East that a more global / Indonesia-aware
// audience is likely to ask about.
const COMPANIES_DATA = [
  { rank: 1, name: "Saudi Aramco", country: "Saudi Arabia", metric: "Revenue & production", note: "World's largest oil producer by volume; state-owned." },
  { rank: 2, name: "ExxonMobil", country: "United States", metric: "Revenue", note: "Major integrated supermajor, upstream + downstream + chemicals." },
  { rank: 3, name: "Chevron", country: "United States", metric: "Revenue", note: "Integrated supermajor with large US shale and international upstream." },
  { rank: 4, name: "Shell", country: "United Kingdom / Netherlands", metric: "Revenue", note: "Integrated supermajor, large LNG and trading business." },
  { rank: 5, name: "PetroChina", country: "China", metric: "Revenue & production", note: "State-controlled, largest oil and gas producer in China." },
  { rank: 6, name: "TotalEnergies", country: "France", metric: "Revenue", note: "Integrated supermajor with growing renewables portfolio." },
  { rank: 7, name: "BP", country: "United Kingdom", metric: "Revenue", note: "Integrated supermajor; significant trading and downstream business." },
  { rank: 8, name: "Sinopec", country: "China", metric: "Revenue", note: "State-controlled, large refining and chemicals footprint." },
  { rank: 9, name: "ConocoPhillips", country: "United States", metric: "Production", note: "Pure-play upstream independent, large US shale presence." },
  { rank: 10, name: "Petrobras", country: "Brazil", metric: "Revenue & production", note: "State-controlled, deepwater pre-salt specialist." },
  { rank: 11, name: "Pertamina", country: "Indonesia", metric: "Revenue & production", note: "Indonesia's state-owned energy company; upstream (via Pertamina Hulu Energi/Subholding Upstream), refining, and retail fuel across the country." },
  { rank: 12, name: "QatarEnergy", country: "Qatar", metric: "Production (LNG)", note: "State-owned; one of the world's largest LNG exporters via the North Field expansion." },
  { rank: 13, name: "ADNOC", country: "United Arab Emirates", metric: "Production & reserves", note: "Abu Dhabi's state oil company, large conventional reserves and growing downstream/petrochemicals." },
  { rank: 14, name: "Kuwait Petroleum Corporation (KPC)", country: "Kuwait", metric: "Production", note: "State-owned, oversees Kuwait's upstream, refining, and international marketing arms." },
  { rank: 15, name: "National Iranian Oil Company (NIOC)", country: "Iran", metric: "Production & reserves", note: "State-owned; production levels have fluctuated with international sanctions." },
  { rank: 16, name: "Equinor", country: "Norway", metric: "Revenue", note: "Majority state-owned; North Sea operator and major offshore wind investor; publisher of the open Volve dataset used in this site's Data Lab." },
  { rank: 17, name: "Eni", country: "Italy", metric: "Revenue", note: "Integrated supermajor with strong exploration track record in Africa and the Mediterranean." },
  { rank: 18, name: "Petronas", country: "Malaysia", metric: "Revenue & production", note: "State-owned; major regional upstream operator in Southeast Asia and a large global LNG player." },
  { rank: 19, name: "Rosneft", country: "Russia", metric: "Production", note: "State-controlled, one of the world's largest listed oil producers by volume." },
  { rank: 20, name: "Gazprom", country: "Russia", metric: "Production (gas)", note: "State-controlled, historically the world's largest natural gas producer and pipeline operator." },
  { rank: 21, name: "Lukoil", country: "Russia", metric: "Production", note: "Privately held, one of the largest non-state Russian oil producers." },
  { rank: 22, name: "Occidental Petroleum", country: "United States", metric: "Production", note: "Independent with strong US Permian Basin and enhanced-oil-recovery (CO2 EOR) expertise." },
  { rank: 23, name: "EOG Resources", country: "United States", metric: "Production", note: "Pure-play US shale/tight oil independent known for capital discipline." },
  { rank: 24, name: "CNOOC", country: "China", metric: "Production", note: "State-controlled, China's main offshore exploration and production company." },
  { rank: 25, name: "Woodside Energy", country: "Australia", metric: "Production (LNG)", note: "Australia's largest independent oil and gas company, major LNG exporter." },
  { rank: 26, name: "Santos", country: "Australia", metric: "Production", note: "Major Australian independent with assets across Australia and Papua New Guinea." },
  { rank: 27, name: "Repsol", country: "Spain", metric: "Revenue", note: "Integrated company with international upstream and a growing renewables arm." },
  { rank: 28, name: "Petroleos Mexicanos (Pemex)", country: "Mexico", metric: "Production", note: "State-owned, Mexico's national oil company, heavily indebted but central to domestic supply." },
  { rank: 29, name: "ONGC", country: "India", metric: "Production", note: "State-controlled, India's largest crude oil and natural gas producer." },
  { rank: 30, name: "PTTEP", country: "Thailand", metric: "Production", note: "Thailand's state-affiliated upstream company, active across Southeast Asia including Indonesia." },
];

// Expanded beyond the original top 10 to better cover OPEC, Southeast Asia,
// Africa, and Latin America, since regional context matters for readers
// targeting jobs outside the largest producers.
const COUNTRIES_DATA = [
  { rank: 1, name: "United States", metric: "Production", note: "World's largest crude oil producer, driven heavily by shale/tight oil." },
  { rank: 2, name: "Saudi Arabia", metric: "Production & reserves", note: "Largest proved conventional reserves among major producers; OPEC leader." },
  { rank: 3, name: "Russia", metric: "Production", note: "Major producer and exporter, large Siberian and Arctic resource base." },
  { rank: 4, name: "Canada", metric: "Reserves", note: "Large reserves dominated by oil sands (Alberta)." },
  { rank: 5, name: "Iraq", metric: "Production & reserves", note: "OPEC member, significant conventional onshore reserves." },
  { rank: 6, name: "China", metric: "Production & consumption", note: "Large domestic producer but also the world's largest crude importer." },
  { rank: 7, name: "United Arab Emirates", metric: "Production & reserves", note: "OPEC member, large reserves concentrated in Abu Dhabi." },
  { rank: 8, name: "Iran", metric: "Reserves", note: "OPEC member, large reserves, production affected by sanctions over time." },
  { rank: 9, name: "Kuwait", metric: "Reserves", note: "OPEC member, high reserves-to-production ratio relative to its size." },
  { rank: 10, name: "Venezuela", metric: "Reserves", note: "Holds among the largest proved reserves globally (heavy crude/Orinoco belt), though production has been constrained for years." },
  { rank: 11, name: "Brazil", metric: "Production", note: "Fast-growing deepwater pre-salt production, mostly operated by Petrobras and partners." },
  { rank: 12, name: "Norway", metric: "Production & exports", note: "Major North Sea producer and Europe's largest gas exporter via pipeline; not an OPEC member." },
  { rank: 13, name: "Nigeria", metric: "Production & reserves", note: "OPEC member, West Africa's largest producer, mostly offshore/Niger Delta onshore fields." },
  { rank: 14, name: "Indonesia", metric: "Production & consumption", note: "Founding OPEC member that became a net importer; upstream now run under PSC/Gross Split contracts overseen by SKK Migas, with Pertamina and foreign KKKS as operators." },
  { rank: 15, name: "Qatar", metric: "Production (LNG)", note: "Among the world's top LNG exporters via the giant North Field; left OPEC in 2019 to focus on gas." },
  { rank: 16, name: "Algeria", metric: "Production & reserves", note: "OPEC member, major North African gas and oil exporter via Sonatrach." },
  { rank: 17, name: "Libya", metric: "Reserves", note: "OPEC member, large reserves but production has been volatile due to internal conflict." },
  { rank: 18, name: "Kazakhstan", metric: "Production", note: "Major Central Asian producer, large fields like Tengiz and Kashagan; OPEC+ participant (non-member)." },
  { rank: 19, name: "Mexico", metric: "Production", note: "Major producer via state company Pemex, historically declining output from mature offshore fields." },
  { rank: 20, name: "Angola", metric: "Production", note: "OPEC member, major West African deepwater producer." },
  { rank: 21, name: "Malaysia", metric: "Production & reserves", note: "Major Southeast Asian producer and LNG exporter via Petronas, operating in waters near Indonesia." },
  { rank: 22, name: "Oman", metric: "Production", note: "Non-OPEC Gulf producer, OPEC+ participant; significant EOR programs." },
  { rank: 23, name: "Azerbaijan", metric: "Production", note: "Major Caspian Sea producer, key pipeline link (BTC) from the Caspian to Europe." },
  { rank: 24, name: "Colombia", metric: "Production", note: "Major South American producer led by state-linked Ecopetrol." },
  { rank: 25, name: "Argentina", metric: "Production (growth)", note: "Rapidly growing production from the Vaca Muerta shale play." },
  { rank: 26, name: "Egypt", metric: "Production (gas)", note: "Major Eastern Mediterranean gas producer, notably the Zohr field." },
  { rank: 27, name: "Australia", metric: "Production (LNG)", note: "One of the world's largest LNG exporters, led by Woodside and Santos." },
  { rank: 28, name: "India", metric: "Consumption & production", note: "Large and growing consumer, with domestic production led by state company ONGC." },
];
