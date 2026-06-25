// Module content data for PetroLearn AI.
// Each module is original summary content (not copied from sources).
// Add new modules by appending another object to this array.
//
// Fields beyond the original spec (added in the design/content upgrade):
//   difficulty            "Beginner" | "Intermediate" | "Advanced" -- used by the
//                          difficulty filter on the Modules page.
//   simpleExplanation      Plain-language explanation, one or two sentences.
//   technicalExplanation   More precise engineering/geoscience phrasing.
//   whyItMatters           Why this concept matters in real oil and gas work.
//   commonMistakes[]       Beginner mistakes to watch for.
//   miniExample             A short worked or illustrative example.
//   chart                  Optional key into CHART_RENDERERS (see js/charts.js)
//                          rendered inside the module detail view.

const MODULES_DATA = [
  {
    id: "oil-gas-101",
    title: "Oil and Gas 101",
    category: "Fundamentals",
    difficulty: "Beginner",
    summary:
      "An orientation to the oil and gas industry: where hydrocarbons come from, how the upstream-midstream-downstream chain works, and the vocabulary used across the rest of this site.",
    keyConcepts: [
      "Upstream, midstream, downstream segments",
      "Conventional vs unconventional resources",
      "Hydrocarbon phases: oil, gas, condensate",
      "Basic well anatomy and field lifecycle",
    ],
    objectives: [
      "Describe the three segments of the oil and gas value chain.",
      "Distinguish conventional and unconventional resources.",
      "Explain the typical lifecycle of a field from exploration to abandonment.",
    ],
    simpleExplanation:
      "The oil and gas industry finds hydrocarbons underground, gets them out of the ground, moves them, and turns them into things people use, like fuel and plastics.",
    technicalExplanation:
      "The industry is organized into upstream (exploration and production), midstream (transport and storage), and downstream (refining and marketing) segments. Petroleum engineers mainly work upstream, but decisions made there are shaped by economics and demand from the other two segments.",
    whyItMatters:
      "Understanding the full value chain helps you see why upstream decisions, like where to drill or how fast to produce, are driven by midstream and downstream constraints such as pipeline capacity and product demand.",
    commonMistakes: [
      "Assuming all oil and gas work is drilling -- most disciplines (geology, reservoir, facilities, economics) never touch a drill bit directly.",
      "Confusing 'reserves' with 'resources' -- reserves are the economically recoverable subset of total resources.",
    ],
    miniExample:
      "A field is discovered (exploration), wells are drilled and equipped (development), oil flows to surface and is sold (production), and eventually the field is decommissioned (abandonment) when it is no longer economic.",
    analogy:
      "Upstream is like finding and collecting raw ingredients, midstream is like transporting and storing them, and downstream is like cooking, packaging, and selling the final product to customers.",
    memoryTrick:
      "Think U-M-D in the order hydrocarbons travel: Upstream finds and produces, Midstream moves and stores, Downstream refines and sells.",
    explainLikeNew:
      "Forget the engineering for a second: oil and gas is just a long supply chain. Someone finds it underground, someone else moves it, and someone else turns it into things you actually use, like gasoline or plastic. Petroleum engineers mostly work at the 'finding and producing' end of that chain.",
    sources: [
      { title: "Alison: Petroleum Engineering Principles and Concepts", url: "https://alison.com/course/petroleum-engineering-principles-and-concepts" },
      { title: "PetroSkills", url: "https://www.petroskills.com/" },
      { title: "NExT Training", url: "https://www.nexttraining.net/" },
    ],
  },
  {
    id: "petroleum-geology",
    title: "Petroleum Geology",
    category: "Geoscience",
    difficulty: "Beginner",
    summary:
      "How sedimentary basins form, how rocks are deposited and buried, and why some basins generate and trap hydrocarbons while others do not.",
    keyConcepts: [
      "Sedimentary basin formation",
      "Depositional environments",
      "Source, reservoir, and seal rock",
      "Structural and stratigraphic traps",
    ],
    objectives: [
      "Explain how sedimentary basins accumulate organic-rich rock.",
      "Identify the rock types needed for a working petroleum system.",
      "Differentiate structural traps from stratigraphic traps.",
    ],
    simpleExplanation:
      "Petroleum geology studies how layers of rock formed over millions of years, and which arrangements of rock let oil and gas collect underground instead of escaping.",
    technicalExplanation:
      "Basin subsidence and sediment supply control deposition; burial then governs maturation of organic-rich intervals. A play requires a source rock, a migration path, a reservoir rock, a seal, and a trap geometry, with the right relative timing.",
    whyItMatters:
      "Exploration decisions, where to spend drilling budget, depend entirely on geological interpretation of basin history and trap viability before a single well is drilled.",
    commonMistakes: [
      "Treating structural traps and stratigraphic traps as mutually exclusive -- many real traps are a combination of both.",
      "Forgetting that a good reservoir rock without a working seal or trap will not hold hydrocarbons.",
    ],
    miniExample:
      "A buried river-delta sandstone (reservoir) sealed above by marine shale (seal), folded into an anticline (trap), charged by an underlying organic-rich shale (source) is a classic structural play.",
    analogy:
      "Think of petroleum geology like reading the biography of a sandwich: you need to know which ingredients were stacked in which order, how long they sat, and what shape the plate ended up in before you can say whether anything good got trapped inside.",
    memoryTrick:
      "Remember the geology checklist with B-D-T: Basin (where), Deposition (how the layers formed), Trap (what holds it).",
    explainLikeNew:
      "You don't need a geology degree to get this: rock layers build up over millions of years like pages in a very slow book, and where those pages bend or change type can create a pocket where oil and gas get stuck instead of escaping.",
    charts: ["trapSchematic"],
    sources: [
      { title: "AAPG Wiki", url: "https://wiki.aapg.org/" },
      { title: "AAPG Wiki: Petroleum system", url: "https://wiki.aapg.org/Petroleum_system" },
    ],
  },
  {
    id: "petroleum-system",
    title: "Petroleum System",
    category: "Geoscience",
    difficulty: "Beginner",
    summary:
      "The petroleum system ties geology together: a source rock generates hydrocarbons, which migrate into a reservoir rock and are held in place by a seal and a trap. Timing of these elements determines whether a prospect actually holds hydrocarbons.",
    keyConcepts: [
      "Source rock maturation and generation",
      "Migration pathways (primary and secondary)",
      "Reservoir, seal, and trap interplay",
      "Charge timing relative to trap formation",
    ],
    objectives: [
      "List the essential elements of a petroleum system.",
      "Explain why timing of trap formation matters for charge.",
      "Give an example of a complete vs a breached petroleum system.",
    ],
    simpleExplanation:
      "Think of the petroleum system as a recipe: you need a source of hydrocarbons, a path for them to travel, a container to hold them, a lid to keep them in, and the right order of events.",
    technicalExplanation:
      "A working petroleum system requires a mature source rock, an effective migration pathway, a reservoir rock with adequate porosity and permeability, a sealing lithology, and a trap that forms before or during hydrocarbon charge. Risk assessment in exploration is essentially risking each of these elements.",
    whyItMatters:
      "Most dry exploration wells fail because one petroleum system element was missing or mistimed, not because the rocks were absent -- understanding this framework is central to exploration risk analysis.",
    commonMistakes: [
      "Assuming a mature source rock guarantees a filled reservoir -- migration pathways and timing also have to work.",
      "Ignoring trap timing -- a perfect trap that formed after migration already happened will be empty.",
    ],
    miniExample:
      "If a trap forms 10 million years after peak hydrocarbon generation and migration, the charge may have already escaped, leaving a structurally perfect but empty trap.",
    analogy:
      "Petroleum system is like a complete cooking and storage system: the source rock is the kitchen where heat 'cooks' hydrocarbons, migration is the delivery route, the reservoir rock is the storage room, the seal rock is the lid, and the trap is the shape of the container -- all of it only works if the timing lines up.",
    memoryTrick:
      "Petroleum system = S-M-R-S-T-T: Source, Migration, Reservoir, Seal, Trap, Timing.",
    explainLikeNew:
      "If anyone asks 'how does oil even end up in one specific spot underground,' this module is the answer: it has to be cooked somewhere, travel somewhere, and get stuck somewhere, all before anything else changes the rocks around it.",
    charts: ["petroleumSystemDiagram"],
    sources: [
      { title: "AAPG Wiki: Petroleum system", url: "https://wiki.aapg.org/Petroleum_system" },
      { title: "AAPG Wiki: Petroleum system examples", url: "https://wiki.aapg.org/Petroleum_system_concept:_examples_of_application" },
    ],
  },
  {
    id: "reservoir-engineering",
    title: "Reservoir Engineering",
    category: "Reservoir",
    difficulty: "Intermediate",
    summary:
      "Reservoir engineering quantifies how much hydrocarbon is in place and how it will flow and deplete over time, using rock and fluid properties, drive mechanisms, and material balance.",
    keyConcepts: [
      "Porosity and permeability",
      "Fluid PVT properties",
      "Drive mechanisms (solution gas, gas cap, water drive)",
      "Material balance fundamentals",
    ],
    objectives: [
      "Calculate basic rock property values from given data.",
      "Identify the dominant drive mechanism from production behavior.",
      "Apply simple material balance reasoning to estimate depletion.",
    ],
    simpleExplanation:
      "Reservoir engineers figure out how much oil and gas is underground and predict how it will behave as it is produced, almost like managing a slowly draining tank.",
    technicalExplanation:
      "Reservoir engineering combines rock properties (porosity, permeability), fluid PVT behavior, and energy sources (drive mechanisms) within a material balance framework to estimate original hydrocarbons in place and forecast depletion and recovery.",
    whyItMatters:
      "Development planning, well count, facility sizing, and recovery strategy all depend on reservoir engineering estimates of in-place volumes and depletion behavior.",
    commonMistakes: [
      "Confusing porosity (storage capacity) with permeability (flow capacity) -- a rock can be porous but barely permeable.",
      "Applying Darcy's Law outside its assumptions (e.g., to highly turbulent or non-Newtonian flow) without correction.",
    ],
    miniExample:
      "A reservoir with porosity of 20% and a bulk volume of 10 million m^3 has roughly 2 million m^3 of pore space available to hold oil, gas, and water.",
    analogy:
      "Porosity is storage space, permeability is road quality, saturation is who is occupying the rooms, and a drive mechanism is the natural energy source pushing fluids out, like water pressure behind a dam.",
    memoryTrick:
      "Remember reservoir quality with P and P: Porosity stores, Permeability flows.",
    explainLikeNew:
      "Imagine the reservoir as a giant, messy warehouse with sponge-like walls. Reservoir engineers are figuring out how much stuff (oil, gas, water) is stored in the sponge, how easily it can be pushed out, and what is doing the pushing.",
    charts: ["porosityPermeabilityScatter"],
    sources: [
      { title: "NPTEL Petroleum Reservoir Engineering", url: "https://nptel.ac.in/courses/103103223" },
      { title: "Petroleum Reservoir Dynamics (Open Textbook)", url: "https://open.umn.edu/opentextbooks/textbooks/1812" },
    ],
  },
  {
    id: "drilling-engineering",
    title: "Drilling Engineering",
    category: "Drilling",
    difficulty: "Intermediate",
    summary:
      "Covers how wells are physically constructed: drilling fluids, casing and cementing, well control, and the basics of directional drilling.",
    keyConcepts: [
      "Drilling fluid functions and properties",
      "Casing strings and cementing purpose",
      "Well control and blowout preventers",
      "Directional drilling basics",
    ],
    objectives: [
      "Explain the main functions of drilling mud.",
      "Describe why wells are cased and cemented in stages.",
      "Identify the role of a blowout preventer in well control.",
    ],
    simpleExplanation:
      "Drilling engineering is about safely and efficiently building the physical hole that connects the surface to the reservoir.",
    technicalExplanation:
      "A drilling program defines mud properties, casing design, and well control equipment for each hole section, balancing wellbore stability, formation pressure, and cost. Directional drilling extends this to steer the wellbore toward an offset target.",
    whyItMatters:
      "Poor drilling fluid design or casing planning can cause stuck pipe, lost circulation, or even a blowout -- drilling engineering directly governs well safety and cost.",
    commonMistakes: [
      "Treating mud weight purely as a cost variable -- too low risks a kick, too high risks lost circulation.",
      "Underestimating how directional drilling changes torque, drag, and hole cleaning compared to vertical wells.",
    ],
    miniExample:
      "If formation pressure rises faster than planned, mud weight must increase ahead of it, or the well risks an influx of formation fluid (a kick) that the blowout preventer must then contain.",
    analogy:
      "Drilling mud is like blood circulation for the well: it cools the bit, cleans out debris, and balances pressure, the same way blood regulates temperature and carries waste out of your body. Casing is like the wall of a tunnel, cement is the glue sealing that wall, and a blowout preventer is like an emergency brake.",
    memoryTrick:
      "Remember the well control order: 'Mud first, Casing next, Cement seals, BOP saves' -- the sequence things go wrong in, and the sequence that protects against it.",
    explainLikeNew:
      "Drilling a well is basically tunneling, except the tunnel is thousands of meters underground, filled with fluid instead of air, and the ground itself is pushing back with pressure the whole time.",
    charts: ["drillingWellControlDiagram"],
    sources: [
      { title: "Class Central: Drilling Engineering", url: "https://www.classcentral.com/subject/drilling-engineering" },
      { title: "PetroWiki", url: "https://petrowiki.spe.org/PetroWiki" },
      { title: "IADC Lexicon", url: "https://www.iadclexicon.org/" },
    ],
  },
  {
    id: "production-engineering",
    title: "Production Engineering",
    category: "Production",
    difficulty: "Intermediate",
    summary:
      "Focuses on getting hydrocarbons from the reservoir to the surface efficiently: well performance, artificial lift, nodal analysis, and surface facilities.",
    keyConcepts: [
      "Inflow and outflow performance",
      "Nodal analysis concept",
      "Artificial lift methods",
      "Surface separation basics",
    ],
    objectives: [
      "Explain the purpose of nodal analysis.",
      "Compare common artificial lift methods at a high level.",
      "Describe the role of surface facilities in production.",
    ],
    simpleExplanation:
      "Production engineering keeps oil and gas flowing efficiently from the reservoir, up the well, and through surface equipment once a well is already drilled.",
    technicalExplanation:
      "Production engineers analyze inflow performance (reservoir to wellbore) against outflow performance (wellbore to surface) using nodal analysis, select artificial lift when natural energy is insufficient, and design surface separation and flow assurance to handle multiphase production.",
    whyItMatters:
      "As reservoir pressure declines, water cut rises and natural flow weakens -- production engineering interventions (lift, stimulation, facility upgrades) are what keep a field economic for years after first oil.",
    commonMistakes: [
      "Selecting artificial lift based only on initial conditions without planning for how water cut and rate will change over the well's life.",
      "Ignoring skin factor when diagnosing low well productivity -- it can mimic a poor reservoir when the real issue is near-wellbore damage.",
    ],
    miniExample:
      "A well producing at 40% water cut may still be highly profitable if the oil rate and price are high enough, but climbing water cut over time is a signal to revisit lift design or workover options.",
    analogy:
      "A production system is like drinking through a straw from a deep cup: if the cup (reservoir) still has plenty of liquid but you can't suck hard enough, you need help, just like artificial lift helps a tired well bring fluids to the surface. Nodal analysis is like finding the exact bottleneck in a plumbing system.",
    memoryTrick:
      "Remember IPR vs TPR with: Inflow comes IN from the reservoir, Tubing performance is the way OUT -- nodal analysis is just where those two meet.",
    explainLikeNew:
      "Once a well is drilled, someone still has to keep the fluid actually moving all the way to the surface and through the pipes -- that ongoing 'keep it flowing efficiently' job is production engineering.",
    charts: ["waterCutChart", "productionEngineeringConceptMap"],
    sources: [
      { title: "PetroWiki", url: "https://petrowiki.spe.org/PetroWiki" },
      { title: "NExT Training", url: "https://www.nexttraining.net/" },
    ],
  },
  {
    id: "petrophysics-well-logging",
    title: "Petrophysics and Well Logging",
    category: "Petrophysics",
    difficulty: "Advanced",
    summary:
      "Petrophysics interprets rock and fluid properties from well logs: gamma ray, resistivity, density, neutron, and sonic measurements are combined to estimate porosity and saturation.",
    keyConcepts: [
      "Gamma ray and lithology indication",
      "Resistivity log and water saturation",
      "Density and neutron porosity logs",
      "Basic log interpretation workflow",
    ],
    objectives: [
      "Identify what each common log type measures.",
      "Explain how resistivity relates to water saturation.",
      "Outline a basic log interpretation workflow.",
    ],
    simpleExplanation:
      "Well logging lowers instruments into a borehole to measure the rock and fluids around it, turning those measurements into a picture of what is down there.",
    technicalExplanation:
      "Petrophysical interpretation combines gamma ray (lithology/shale indication), resistivity (fluid type via Archie's equation), and porosity logs (density, neutron, sonic) to estimate net pay, porosity, and water saturation along a wellbore.",
    whyItMatters:
      "Log interpretation is the main way to evaluate a well's commercial potential before committing to expensive completion or development decisions.",
    commonMistakes: [
      "Reading a single log in isolation -- lithology and fluid effects are usually only resolved by combining multiple log curves.",
      "Using generic Archie parameters (a, m, n) in unusual rock types without calibrating them to core or local data.",
    ],
    miniExample:
      "High gamma ray plus low resistivity usually indicates shale; low gamma ray plus high resistivity in a porous zone is a classic signature of a hydrocarbon-bearing reservoir interval.",
    analogy:
      "Well logs are like medical scans of the subsurface: gamma ray is like a shale detector, resistivity gives a clue about fluid type, and density-neutron logs are like tools to estimate how much pore space (storage room) the rock has.",
    memoryTrick:
      "In well logging: GR finds shale, Resistivity hints at fluid type, Density-Neutron estimates porosity.",
    explainLikeNew:
      "Think of lowering a sensor down a well like running an ultrasound or X-ray on a patient: you can't see the rock directly, but the measurements it sends back let you infer what is down there.",
    charts: ["wellLogTrack"],
    sources: [
      { title: "SLB Energy Glossary", url: "https://glossary.slb.com/en/" },
      { title: "Class Central: Well Logging", url: "https://www.classcentral.com/subject/well-logging" },
    ],
  },
  {
    id: "seismic-geophysics",
    title: "Seismic and Geophysics Basics",
    category: "Geophysics",
    difficulty: "Advanced",
    summary:
      "Introduces how seismic surveys image the subsurface before a well is ever drilled, and how that imaging feeds exploration and reservoir characterization.",
    keyConcepts: [
      "Seismic reflection principle",
      "Seismic surveys (2D vs 3D)",
      "Time-to-depth conversion",
      "Seismic interpretation basics",
    ],
    objectives: [
      "Explain the basic physics of seismic reflection.",
      "Describe the difference between 2D and 3D seismic surveys.",
      "Identify what seismic interpretation is used for in exploration.",
    ],
    simpleExplanation:
      "Geophysics uses sound waves sent into the ground to create images of underground rock layers, similar to how an ultrasound images inside the body.",
    technicalExplanation:
      "Seismic surveys generate acoustic waves at surface and record their reflections off subsurface impedance contrasts. Processed seismic volumes are interpreted for structure (faults, folds) and stratigraphy, then tied to well data and converted from time to depth for prospect evaluation.",
    whyItMatters:
      "Seismic interpretation is usually the first and cheapest way to evaluate trap geometry and basin structure before committing to an expensive exploration well.",
    commonMistakes: [
      "Treating a seismic 'bright spot' as automatic proof of hydrocarbons -- many lithology contrasts can produce similar amplitude effects.",
      "Skipping time-to-depth conversion uncertainty when picking a well location from a time-domain seismic map.",
    ],
    miniExample:
      "A 3D seismic survey over a basin can reveal a buried anticline invisible at the surface, guiding where an exploration well should be placed to test the trap.",
    analogy:
      "A seismic survey is like shouting into a canyon and listening to the echoes to figure out its shape -- except the 'shout' is a controlled sound wave and the 'canyon walls' are underground rock boundaries.",
    memoryTrick:
      "Remember the seismic chain: Source makes the wave, Reflection bounces it back, Recording captures it, Interpretation explains it.",
    explainLikeNew:
      "Before anyone drills an expensive well, geophysicists send sound waves into the ground and listen to what bounces back, turning echoes into a rough picture of what the rock layers below look like.",
    sources: [
      { title: "SEG Wiki", url: "https://wiki.seg.org/wiki/Main_Page" },
      { title: "SEG Wiki: Open data", url: "https://wiki.seg.org/wiki/Open_data" },
    ],
  },
  {
    id: "eor-unconventional",
    title: "Enhanced Oil Recovery and Unconventional Resources",
    category: "Reservoir",
    difficulty: "Advanced",
    summary:
      "Covers techniques used to recover oil left behind after primary and secondary production, plus an introduction to unconventional resources like shale gas and tight oil.",
    keyConcepts: [
      "Waterflooding and gas injection",
      "Chemical and thermal EOR methods",
      "Recovery factor",
      "Unconventional reservoirs (shale, tight formations)",
    ],
    objectives: [
      "Compare common EOR methods at a conceptual level.",
      "Explain why recovery factor is rarely 100% even with EOR.",
      "Describe what makes unconventional resources different from conventional ones.",
    ],
    simpleExplanation:
      "Even after a field stops flowing naturally, a large fraction of the oil is usually still underground -- EOR is the set of techniques used to coax more of it out.",
    technicalExplanation:
      "EOR methods (waterflooding, miscible/immiscible gas injection, chemical flooding, thermal methods such as steam injection) alter reservoir fluid properties or displacement efficiency to increase recovery factor beyond primary depletion. Unconventional resources require non-standard development, typically horizontal wells with multistage hydraulic fracturing, because matrix permeability is too low for economic flow without stimulation.",
    whyItMatters:
      "Many mature conventional fields and most shale plays are economically dependent on EOR or stimulation -- without it, large volumes of technically present oil and gas would be unrecoverable.",
    commonMistakes: [
      "Assuming any EOR method works in any reservoir -- fluid and rock compatibility (e.g., miscibility, clay sensitivity) heavily constrain which method is viable.",
      "Treating unconventional reservoirs like conventional ones for well spacing and forecasting -- decline behavior and drainage geometry are fundamentally different.",
    ],
    miniExample:
      "A field with a 25% recovery factor under natural depletion might reach 40-50% recovery after a successful waterflood, but the remaining oil can still exceed half of the original oil in place.",
    analogy:
      "Enhanced oil recovery is like squeezing a nearly-empty toothpaste tube with a tool instead of giving up once your fingers stop working -- there is still product inside, you just need a better method to get it out.",
    memoryTrick:
      "Remember EOR families with W-G-C-T: Waterflood, Gas injection, Chemical, Thermal.",
    explainLikeNew:
      "Even a 'depleted' field usually still has more than half its oil left underground -- EOR and unconventional development are about going back for the part that simple production methods couldn't reach.",
    charts: ["eorComparisonChart"],
    sources: [
      { title: "NPTEL Petroleum Reservoir Engineering", url: "https://nptel.ac.in/courses/103103223" },
      { title: "PetroWiki", url: "https://petrowiki.spe.org/PetroWiki" },
    ],
  },
  {
    id: "software-lab",
    title: "Software Lab using Python and OPM Flow",
    category: "Data & Software",
    difficulty: "Advanced",
    summary:
      "Introduces the open-source software stack used throughout this site's Data Lab: Python for data analysis, and OPM Flow for reservoir simulation.",
    keyConcepts: [
      "Python data stack (pandas, matplotlib, lasio)",
      "Open Porous Media (OPM) Flow simulator",
      "Basic reservoir simulation workflow",
      "ResInsight for simulation visualization",
    ],
    objectives: [
      "List the Python libraries commonly used for petroleum data analysis.",
      "Describe what OPM Flow does in a reservoir simulation workflow.",
      "Outline the basic steps from input deck to simulation results.",
    ],
    simpleExplanation:
      "This module is a guide to the free, open-source tools that let you analyze real field data and run reservoir simulations without buying commercial software.",
    technicalExplanation:
      "Python with pandas and matplotlib (and lasio for well logs) covers most production and log data analysis tasks. OPM Flow is an open-source black-oil and compositional reservoir simulator; a simulation run takes an input deck (grid, rock and fluid properties, wells, schedule), solves the flow equations over time, and produces output that can be visualized in tools like ResInsight.",
    whyItMatters:
      "Open-source tools remove the cost barrier to practicing real reservoir engineering and data analysis workflows, which is exactly what this site's Data Lab is built around.",
    commonMistakes: [
      "Jumping straight to simulation without first exploring and cleaning the input data -- bad data produces a confidently wrong simulation.",
      "Treating a single simulation run as a final answer rather than as one scenario to be checked against alternative assumptions.",
    ],
    miniExample:
      "A typical first project: load Volve production data into pandas, plot oil rate and water cut versus time with matplotlib, then later try reproducing similar trends with a simple OPM Flow model.",
    analogy:
      "Using open-source tools like Python and OPM Flow is like cooking with a fully stocked shared kitchen instead of buying every appliance yourself -- the tools are free, but you still need to know the recipe.",
    memoryTrick:
      "Remember the workflow with 'Load, Clean, Explore, Model' -- the same four steps apply whether you're using pandas on production data or building an OPM Flow simulation deck.",
    explainLikeNew:
      "If 'reservoir simulation' sounds intimidating, think of it as a very detailed, very slow physics engine for underground fluid flow -- you describe the rules and starting conditions, and the software plays out what happens over time.",
    charts: ["opmWorkflowDiagram"],
    sources: [
      { title: "Open Porous Media Project", url: "https://opm-project.org/" },
      { title: "SINTEF Open Porous Media Page", url: "https://www.sintef.no/en/software/open-porous-media-opm/" },
    ],
  },
  {
    id: "data-lab-volve",
    title: "Data Lab using Volve Field Dataset",
    category: "Data & Software",
    difficulty: "Intermediate",
    summary:
      "Introduces the Equinor Volve open dataset and how it can be used to practice real production data analysis, well log analysis, and Python-based petroleum data workflows.",
    keyConcepts: [
      "Volve dataset structure",
      "Production data analysis",
      "Well log data exploration",
      "Python tooling for petroleum data",
    ],
    objectives: [
      "Describe what the Volve dataset contains.",
      "List sample analyses that can be performed with this data.",
      "Identify Python tools commonly used for petroleum data analysis.",
    ],
    simpleExplanation:
      "The Volve dataset is real field data Equinor gave away for free, making it one of the best ways to practice petroleum data analysis on an actual field instead of a textbook example.",
    technicalExplanation:
      "The Volve dataset includes daily and monthly production volumes, well trajectories and logs, and reservoir simulation models from the Volve field on the Norwegian Continental Shelf, suitable for production analysis, decline curve fitting, and basic log interpretation exercises.",
    whyItMatters:
      "Working with real, messy field data (gaps, shut-ins, workovers) builds practical skills that idealized textbook datasets cannot teach.",
    commonMistakes: [
      "Plotting raw daily rates without checking for shut-in periods or data gaps, which can distort decline curve fits.",
      "Forgetting to convert units consistently when combining production data with log or simulation outputs.",
    ],
    miniExample:
      "Plotting oil rate versus time for a single Volve well typically reveals a build-up period, a plateau, and then a declining trend suitable for a decline curve fit.",
    analogy:
      "Working with the Volve dataset is like being handed a real patient's full medical history instead of a textbook case study -- it's messier, but it's real, and that's exactly what makes it useful practice.",
    memoryTrick:
      "Remember the data lab order: 'Load, Look, Clean, Plot' -- always look at and clean real data before trusting any plot or fit.",
    explainLikeNew:
      "This module is your sandbox: real numbers from a real, decommissioned oil field that Equinor gave away for free, so you can practice the same kind of analysis a working petroleum data analyst would do.",
    charts: ["declineCurveChart", "waterCutChart"],
    sources: [
      { title: "Equinor Volve Data Sharing", url: "https://www.equinor.com/energy/volve-data-sharing" },
      { title: "Kaggle: Volve Field Production Data Analysis", url: "https://www.kaggle.com/code/imranulhaquenoor/volve-field-production-data-analysis-eda" },
      { title: "Norsk Petroleum: Volve field facts", url: "https://www.norskpetroleum.no/en/facts/field/volve/" },
      { title: "Offshore Technology: Volve Oil Field, North Sea", url: "https://www.offshore-technology.com/projects/volve-oil-field-north-sea/" },
    ],
  },
  {
    id: "petroleum-economics",
    title: "Petroleum Economics",
    category: "Economics",
    difficulty: "Intermediate",
    summary:
      "Covers how petroleum projects are evaluated financially: capital and operating costs, cash flow, discounting, and the metrics used to decide whether a project is worth sanctioning.",
    keyConcepts: [
      "CAPEX and OPEX",
      "Cash flow and discount rate",
      "Net present value (NPV) and internal rate of return (IRR)",
      "Break-even price and sensitivity analysis",
      "Fiscal regimes (royalty, tax, production sharing contracts)",
    ],
    objectives: [
      "Distinguish CAPEX from OPEX in a project cash flow.",
      "Explain how NPV and IRR are used to evaluate a project.",
      "Describe what a break-even price represents and why sensitivity analysis matters.",
    ],
    simpleExplanation:
      "Petroleum economics asks one core question: even if we can technically get the oil or gas out, is it actually worth the money to do so?",
    technicalExplanation:
      "A project's economics are modeled as a cash flow over time: capital expenditure (CAPEX) upfront, operating expenditure (OPEX) and revenue over the producing life, royalties and taxes under the applicable fiscal regime, discounted back to present value using a chosen discount rate to compute NPV and IRR, then stress-tested with sensitivity analysis on price, cost, and production assumptions.",
    whyItMatters:
      "A technically excellent discovery can still be uneconomic at low prices, high costs, or under an unfavorable fiscal regime -- the final investment decision (FID) ultimately rests on economics, not just geology and engineering.",
    commonMistakes: [
      "Treating a single NPV number as certain rather than running sensitivity cases across price, cost, and production scenarios.",
      "Confusing nominal cash flow with discounted cash flow -- a dollar ten years from now is not worth the same as a dollar today.",
      "Ignoring that technical success (finding and being able to produce hydrocarbons) does not automatically mean economic success.",
    ],
    miniExample:
      "A field needs $500 million CAPEX and produces cash flow that, once discounted at a 10% rate, sums to an NPV of $120 million at a $70/bbl oil price -- but in a sensitivity case at $45/bbl, NPV could turn negative, flagging the project as highly price-sensitive.",
    analogy:
      "Petroleum project economics is like deciding whether opening a restaurant is worth it: upfront cost, monthly cost, uncertain customers, price changes, and profit timing. NPV is like asking, how much is future money actually worth today? Break-even price is the minimum selling price needed so the project does not lose money. Sensitivity analysis is like checking which ingredient price hurts the restaurant's profit the most.",
    memoryTrick:
      "Remember project evaluation order with 'CAPEX in, Cash flows out, Discount it, Compare it' -- C-C-D-C.",
    explainLikeNew:
      "You don't need to be an accountant: imagine you spend a big chunk of money up front to build something, then slowly earn money back over years while also paying ongoing costs. Petroleum economics is just figuring out whether that slow payback, adjusted for the fact that future money is worth less than money today, makes the project worth doing.",
    charts: ["cashFlowTimeline", "capexOpexCard", "npvSensitivityChart", "breakEvenDiagram"],
    sources: [
      { title: "MIT OpenCourseWare: Energy Economics", url: "https://ocw.mit.edu/courses/14-44-energy-economics-spring-2007/" },
      { title: "NPTEL: Petroleum Economics and Management", url: "https://onlinecourses.nptel.ac.in/noc21_mg99/preview" },
      { title: "EIA: Petroleum and Other Liquids", url: "https://www.eia.gov/petroleum/" },
    ],
  },
  {
    id: "ai-ml-oil-gas",
    title: "AI and Machine Learning in Oil and Gas",
    category: "Data & Software",
    difficulty: "Advanced",
    summary:
      "Introduces core machine learning concepts and how they are actually applied across petroleum engineering and geoscience, from production forecasting to seismic interpretation.",
    keyConcepts: [
      "Regression, classification, and clustering",
      "Time series forecasting and anomaly detection",
      "Digital twins and physics-informed machine learning",
      "Why oil and gas data is hard to work with",
      "Real ML applications across the E&P workflow",
    ],
    objectives: [
      "Distinguish regression, classification, and clustering at a conceptual level.",
      "Describe at least three real machine learning applications in oil and gas.",
      "Explain why data quality is a recurring challenge for ML in this industry.",
    ],
    simpleExplanation:
      "Machine learning lets a computer find patterns in large amounts of past data instead of someone writing every rule by hand, and oil and gas generates a huge amount of exactly that kind of data.",
    technicalExplanation:
      "ML tasks map onto petroleum problems in recognizable ways: regression predicts a continuous number (like production rate), classification assigns a category (like lithofacies), clustering groups similar examples without labels (like grouping similar wells), and anomaly detection flags unusual behavior (like an equipment fault or well integrity issue). Time series forecasting and physics-informed or digital-twin approaches are increasingly used for production forecasting and reservoir simulation acceleration.",
    whyItMatters:
      "Petroleum datasets are often large, multidisciplinary, and expensive to generate (seismic surveys, well logs, production history) -- ML offers a way to extract more value from data that has often already been collected, not just a way to do something flashy.",
    commonMistakes: [
      "Applying a powerful ML model to a small, noisy, or biased dataset and trusting the result without validation.",
      "Ignoring data leakage, where information from the future or from the test set accidentally leaks into training.",
      "Treating a model's output as ground truth instead of as a probabilistic estimate that still needs domain expertise to interpret.",
    ],
    miniExample:
      "A decline curve model fit with classical equations can be compared against a machine learning regression model trained on many historical wells -- the ML model may generalize better across wells with different characteristics, but only if trained on clean, representative data.",
    analogy:
      "Machine learning is like learning patterns from many examples instead of writing every rule manually: regression predicts numbers, classification chooses labels, clustering groups similar things, and anomaly detection finds strange behavior. A digital twin is like a living simulation of a real asset that updates as new data comes in.",
    memoryTrick:
      "Remember the four core ML tasks with R-C-C-A: Regression (numbers), Classification (labels), Clustering (groups), Anomaly detection (outliers).",
    explainLikeNew:
      "You don't need to code to understand this: machine learning is just a way for a computer to get better at a task (like predicting production or spotting equipment problems) by studying lots of past examples instead of following a fixed set of human-written rules.",
    charts: ["mlWorkflowDiagram", "mlUseCaseMatrix"],
    sources: [
      { title: "Estimating Oil and Gas Recovery Factors via Machine Learning", url: "https://arxiv.org/abs/2210.12491" },
      { title: "Scikit-learn Documentation", url: "https://scikit-learn.org/stable/" },
      { title: "3W Dataset (GitHub)", url: "https://github.com/ricardovvargas/3w_dataset" },
    ],
  },
  {
    id: "hse-oil-gas",
    title: "HSE in Oil and Gas",
    category: "HSE",
    difficulty: "Beginner",
    estimatedTime: "30 min",
    summary:
      "The practical safety system that runs underneath every other discipline in this industry: hazard and risk thinking, the hierarchy of controls, permits to work, and the everyday procedures that keep people going home safe.",
    keyConcepts: [
      "Hazard vs risk, and the risk assessment matrix",
      "Hierarchy of controls",
      "Permit to work and job safety analysis (JSA/JHA)",
      "H2S, fire/explosion, confined space, and working-at-height hazards",
      "Emergency response and incident reporting",
    ],
    objectives: [
      "Distinguish a hazard from a risk and explain how a risk matrix scores them.",
      "Apply the hierarchy of controls to a real task.",
      "Describe what a permit to work and a JSA are for, and why skipping them is dangerous.",
      "Explain the basic emergency response steps for an H2S alarm or other site emergency.",
    ],
    simpleExplanation:
      "HSE is the system of rules, checks, and habits that keep people, equipment, and the environment safe on an oil and gas site -- it's not paperwork for its own sake, it exists because this industry deals with real hazards: pressure, flammable fluids, heavy lifting, heights, and toxic gas.",
    technicalExplanation:
      "HSE management combines hazard identification, risk assessment (likelihood x severity), and a structured hierarchy of controls (elimination, substitution, engineering controls, administrative controls, PPE) with procedural systems -- permit to work, job safety analysis, incident investigation -- to keep residual risk as low as reasonably practicable across drilling, production, and facility operations.",
    whyItMatters:
      "HSE is the one topic almost guaranteed to come up in onboarding and interviews regardless of discipline -- a technically brilliant engineer who can't reason about hazards and controls is not field-ready, and most operators will not let you on site without HSE competency.",
    commonMistakes: [
      "Treating PPE as the main safety control instead of the last line of defense after elimination, substitution, and engineering controls have been considered.",
      "Confusing 'hazard' (the thing that could cause harm) with 'risk' (how likely and how severe the harm actually is).",
      "Assuming a permit to work is just paperwork rather than a deliberate check that conditions are actually safe right now.",
    ],
    miniExample:
      "Before hot work (welding) near a process area, a permit to work and a gas test confirm the area is free of flammable vapors, a fire watch is posted, and a JSA has identified nearby hazards (e.g., open drains, other simultaneous operations) -- skipping any one of these steps is how fires and explosions actually happen.",
    analogy:
      "Think of HSE like a pilot's pre-flight checklist: every item exists because something, somewhere, once went wrong without it. The checklist feels slow until you remember what it's preventing.",
    memoryTrick:
      "Remember the hierarchy of controls from strongest to weakest with 'Eliminate, Substitute, Engineer, Administer, Protect' -- E-S-E-A-P, strongest control first, PPE last.",
    explainLikeNew:
      "You don't need an engineering background for this: HSE is just the answer to 'how do we stop people from getting hurt doing a dangerous job' -- and in oil and gas, almost every job has some real danger in it, from heavy machinery to toxic gas to working offshore.",
    charts: ["hseRiskMatrix"],
    sources: [
      { title: "OSHA Oil and Gas Extraction Safety and Health", url: "https://www.osha.gov/oil-gas-extraction" },
      { title: "IADC Lexicon", url: "https://www.iadclexicon.org/" },
      { title: "IWCF", url: "https://www.iwcf.org/" },
    ],
  },
];
