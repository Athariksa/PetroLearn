// interview.js
// Interview Bank question data. Each entry mimics a real technical-interview
// question (not multiple choice): an ideal answer, the thinking process
// behind it, and common mistakes candidates make. Content is original
// guidance written for this learning project, not copied from any single
// employer's interview guide.
//
// difficulty: "Beginner" | "Intermediate" | "Advanced"
// category: "Reservoir" | "Drilling" | "Production" | "Geology" | "HSE" | "Data & Software"

const INTERVIEW_QUESTIONS_DATA = [
  // ---------- Reservoir ----------
  {
    id: "int-res-1",
    category: "Reservoir",
    role: "reservoir-engineer",
    difficulty: "Beginner",
    question: "Explain the difference between resources and reserves.",
    idealAnswer:
      "Resources are the total estimated quantity of hydrocarbons in place or potentially recoverable, regardless of whether they're currently economic. Reserves are the subset of resources that are commercially recoverable under current economic conditions, technology, and regulations, and are usually further classified by certainty (proved, probable, possible).",
    thinkingApproach:
      "Start broad (resources = everything that might be there) then narrow down (reserves = the economically and technically recoverable slice). Mentioning the P90/P50/P10 or 1P/2P/3P classification shows you understand reserves aren't a single number.",
    commonMistakes: [
      "Using the two terms interchangeably, which signals a fundamental gap to an interviewer.",
      "Forgetting that reserves depend on price and technology assumptions -- a field's reserves can change without a single new well being drilled, just because oil price changed.",
    ],
  },
  {
    id: "int-res-2",
    category: "Reservoir",
    role: "reservoir-engineer",
    difficulty: "Intermediate",
    question: "Walk me through nodal analysis.",
    idealAnswer:
      "Nodal analysis finds the operating point of a well by plotting inflow performance (IPR -- how much the reservoir can deliver to the wellbore at a given bottomhole pressure) against outflow/tubing performance (TPR/VLP -- the pressure needed to lift that rate to surface) on the same chart, both as functions of rate. Where the two curves intersect is the stable operating point. It's used to predict well rate, evaluate the impact of changes (choke size, tubing size, artificial lift) on production, and diagnose where a bottleneck is -- reservoir-side or wellbore/surface-side.",
    thinkingApproach:
      "Describe IPR and TPR separately first, then explain why their intersection matters physically (the well can only produce at a rate where both the reservoir and the wellbore 'agree'). Bring in a practical use case (e.g., testing a larger tubing size) to show you understand it's a design tool, not just a plot.",
    commonMistakes: [
      "Describing it as just 'a chart' without explaining why the intersection point is physically meaningful.",
      "Forgetting that changing one part of the system (e.g., choke) shifts the TPR curve and changes the operating point, not just the IPR.",
    ],
  },
  {
    id: "int-res-3",
    category: "Reservoir",
    role: "reservoir-engineer",
    difficulty: "Intermediate",
    question: "How would you evaluate whether a reservoir is commercially producible?",
    idealAnswer:
      "Combine technical and economic evidence: confirm there's a working petroleum system (source, migration, reservoir, seal, trap, timing), estimate in-place volumes and a realistic recovery factor from analog fields or simulation, build a production profile, and feed that into an economic model (CAPEX, OPEX, fiscal terms, discount rate) to check NPV, IRR, and break-even price under a range of price scenarios. A reservoir can be technically present and still uneconomic.",
    thinkingApproach:
      "Show that you separate 'is it there and producible at all' (technical) from 'is it worth producing' (economic) -- this is the distinction many junior candidates miss.",
    commonMistakes: [
      "Treating 'commercially producible' as a purely technical question and never mentioning economics.",
      "Giving one single NPV number with no sensitivity analysis, implying false certainty.",
    ],
  },
  {
    id: "int-res-4",
    category: "Reservoir",
    role: "reservoir-engineer",
    difficulty: "Advanced",
    question: "A well's production is declining faster than its type curve predicted. How do you investigate?",
    idealAnswer:
      "Check data quality first (shut-ins, choke changes, gauge errors) before trusting the trend. Then separate reservoir causes (faster-than-expected pressure depletion, water/gas breakthrough, compartmentalization) from wellbore/mechanical causes (scale, skin damage, artificial lift degradation, tubing integrity). Compare against offset wells in the same reservoir to see if the issue is well-specific or field-wide, and review recent well interventions or operational changes that line up with the onset of the faster decline.",
    thinkingApproach:
      "Use a structured elimination process: data quality -> reservoir vs wellbore -> well-specific vs field-wide. This signals systematic diagnostic thinking rather than guessing.",
    commonMistakes: [
      "Jumping straight to a reservoir explanation (e.g., 'it must be compartmentalized') without first ruling out simpler data or mechanical issues.",
      "Not comparing against other wells to check if the issue is isolated or systemic.",
    ],
  },
  {
    id: "int-res-5",
    category: "Reservoir",
    role: "reservoir-engineer",
    difficulty: "Beginner",
    question: "What is the difference between porosity and permeability, and why does it matter?",
    idealAnswer:
      "Porosity is the fraction of rock volume that is void space and can store fluids; permeability is a measure of how easily fluids can flow through that void space. A rock can have high porosity but low permeability (e.g., poorly connected pores), meaning it stores fluid but won't produce it economically -- the two properties must both be favorable for a good reservoir.",
    thinkingApproach:
      "Use a simple distinction: porosity = storage, permeability = flow capacity. Then give a concrete example of a rock that has one without the other.",
    commonMistakes: [
      "Treating high porosity as automatically meaning a good reservoir.",
      "Confusing units or scale -- permeability spans many orders of magnitude and is not a percentage like porosity.",
    ],
  },
  {
    id: "int-res-6",
    category: "Reservoir",
    role: "reservoir-engineer",
    difficulty: "Advanced",
    question: "Two reserve estimation methods (decline curve analysis vs simulation) disagree for the same field. Which do you trust, and why?",
    idealAnswer:
      "Neither is automatically 'more correct' -- they have different strengths. Decline curve analysis is data-driven and reliable once a well has enough production history under stable conditions, but it struggles with changing operating conditions (new wells, workovers, pressure maintenance). Simulation can capture those physical mechanisms but is only as good as the input data and history-matching quality. I would check which method's assumptions are better satisfied by this specific field's history, and ideally reconcile the two rather than picking one blindly -- a large discrepancy is itself a signal something needs investigating (e.g., the simulation model isn't history-matched well, or the decline trend has only just changed regime).",
    thinkingApproach:
      "Avoid picking a 'winner' too quickly. Show that you understand each method's assumptions and that a disagreement is diagnostic information, not just a number to resolve.",
    commonMistakes: [
      "Stating one method is always better than the other in general, rather than depending on context.",
      "Not mentioning the possibility that the discrepancy reveals a modeling or data problem worth investigating.",
    ],
  },

  // ---------- Drilling ----------
  {
    id: "int-drill-1",
    category: "Drilling",
    role: "drilling-engineer",
    difficulty: "Intermediate",
    question: "What would you check if drilling torque suddenly increases?",
    idealAnswer:
      "First check for an obvious operational cause: has weight on bit, RPM, or flow rate changed? Then consider hole-related causes: a packed-off hole or cuttings buildup (poor hole cleaning), a tight spot or doglegs causing extra friction, differential sticking, or a bit/BHA issue (balling, wear). I'd also check mud properties (viscosity, lubricity) and compare against the torque/drag model's predicted values to see how far off we are. The response depends on what's found -- e.g., circulate and work the pipe for hole cleaning issues, or adjust mud properties for friction issues.",
    thinkingApproach:
      "Work outward from the simplest, fastest checks (recent parameter changes) to more involved diagnostics (hole condition, BHA, mud properties), referencing the torque/drag model as the benchmark for 'how much is too much'.",
    commonMistakes: [
      "Jumping to the most dramatic explanation (e.g., stuck pipe) before ruling out simple parameter changes.",
      "Not mentioning the torque/drag model as a reference point for what's expected vs abnormal.",
    ],
  },
  {
    id: "int-drill-2",
    category: "Drilling",
    role: "drilling-engineer",
    difficulty: "Beginner",
    question: "What are the main functions of drilling mud?",
    idealAnswer:
      "Drilling mud cools and lubricates the bit, carries cuttings out of the hole, balances formation pressure to prevent kicks or losses, stabilizes the wellbore wall, and suspends cuttings when circulation stops. It also can transmit hydraulic power and provides some corrosion protection.",
    thinkingApproach:
      "Group functions logically: bit-related (cool/lubricate), hole-cleaning, pressure control, and wellbore stability -- a structured list reads better than a random one.",
    commonMistakes: [
      "Only mentioning 'pressure control' and forgetting hole cleaning or cuttings suspension.",
      "Not connecting mud weight choice to the balance between kick risk (too low) and lost circulation risk (too high).",
    ],
  },
  {
    id: "int-drill-3",
    category: "Drilling",
    role: "drilling-engineer",
    difficulty: "Advanced",
    question: "Walk me through what happens, step by step, when a kick is detected at surface.",
    idealAnswer:
      "Detection signs include a pit volume increase, flow-out greater than flow-in, or a drilling break with a sudden penetration rate increase. The driller shuts in the well (hard or soft shut-in per company procedure), closing the BOP, and reads shut-in drillpipe and casing pressures once stabilized. The kill mud weight is calculated from the shut-in drillpipe pressure, and a kill method (e.g., Driller's Method or Wait-and-Weight) is used to circulate the influx out and pump kill-weight mud in, while monitoring pressures throughout to keep bottomhole pressure constant and avoid a secondary kick or losses.",
    thinkingApproach:
      "Structure the answer chronologically: detect -> shut in -> diagnose (pressures) -> plan kill weight and method -> execute while monitoring. This is exactly the order well control training teaches.",
    commonMistakes: [
      "Skipping the shut-in step or describing it vaguely instead of naming the BOP/shut-in procedure.",
      "Forgetting that the kill mud weight is calculated from measured shut-in pressures, not guessed.",
    ],
  },
  {
    id: "int-drill-4",
    category: "Drilling",
    role: "drilling-engineer",
    difficulty: "Intermediate",
    question: "Why are wells cased and cemented in stages rather than all at once?",
    idealAnswer:
      "Different depth intervals have different pressure regimes and formation strengths. Casing in stages lets the engineer isolate problem zones (e.g., weak or high-pressure formations) before drilling deeper, protect shallower formations and groundwater, and manage the pressure window (between pore pressure and fracture pressure) that narrows with depth. Cementing each casing string seals it to the formation, preventing fluid migration between zones and providing structural support.",
    thinkingApproach:
      "Connect the staged design to the pressure-window concept -- it's the core technical reason, not just 'that's how it's done'.",
    commonMistakes: [
      "Describing casing stages without mentioning the pore pressure/fracture pressure window that drives the design.",
      "Forgetting cement's role in zonal isolation, not just structural support.",
    ],
  },
  {
    id: "int-drill-5",
    category: "Drilling",
    role: "drilling-engineer",
    difficulty: "Beginner",
    question: "What does a blowout preventer (BOP) do, and when would it be used?",
    idealAnswer:
      "A BOP is a large valve assembly at the wellhead that can seal the well in an emergency, most commonly when a kick (unwanted influx of formation fluid) is detected. It prevents an uncontrolled blowout by closing off the annulus or the pipe itself, allowing the crew to safely circulate out the influx using planned well control procedures.",
    thinkingApproach:
      "Keep it simple and concrete: what it physically does (seals the well), and when it's triggered (kick detection) -- avoid over-describing every BOP component unless asked to go deeper.",
    commonMistakes: [
      "Describing the BOP as something used routinely rather than as an emergency/safety device.",
      "Not connecting it to the broader well control sequence (detect kick -> close BOP -> circulate out).",
    ],
  },

  // ---------- Production ----------
  {
    id: "int-prod-1",
    category: "Production",
    role: "production-engineer",
    difficulty: "Intermediate",
    question: "How would you diagnose declining well productivity?",
    idealAnswer:
      "Start with data: confirm the decline is real (not a choke or test error), then use nodal analysis to see if the IPR or the TPR side has shifted. Reservoir-side causes include natural pressure depletion or water/gas breakthrough; wellbore-side causes include skin damage (scale, fines, asphaltene), mechanical issues (tubing leak, lift system degradation), or near-wellbore formation damage. Comparing against a recent well test and offset wells helps narrow down whether it's isolated or field-wide.",
    thinkingApproach:
      "Same structured elimination logic as the reservoir decline question: verify data -> isolate reservoir vs wellbore -> isolate well-specific vs field-wide -- this pattern of thinking is what interviewers are really testing for.",
    commonMistakes: [
      "Giving a single guessed cause without describing how you'd confirm it with data.",
      "Forgetting that artificial lift degradation is a very common, easily overlooked cause.",
    ],
  },
  {
    id: "int-prod-2",
    category: "Production",
    role: "production-engineer",
    difficulty: "Beginner",
    question: "What is artificial lift, and why would a well need it?",
    idealAnswer:
      "Artificial lift is any method used to help fluids reach the surface when natural reservoir pressure is no longer enough on its own -- common methods include sucker rod pumps, electric submersible pumps (ESP), gas lift, and progressive cavity pumps. As reservoir pressure declines over a field's life, the natural flowing energy weakens, so artificial lift extends the productive life of a well.",
    thinkingApproach:
      "Define it simply, then explain the underlying reason it's needed (declining reservoir energy) rather than just naming lift types.",
    commonMistakes: [
      "Listing lift methods without explaining why lift becomes necessary in the first place.",
      "Implying every well eventually needs lift -- some wells never need it if they're abandoned while still flowing naturally.",
    ],
  },
  {
    id: "int-prod-3",
    category: "Production",
    role: "production-engineer",
    difficulty: "Intermediate",
    question: "How would you use Python for production data analysis?",
    idealAnswer:
      "Typically: load production data (CSV or database export) into pandas, clean it (handle shut-ins, unit consistency, outliers), then explore trends with matplotlib -- oil rate, water cut, GOR versus time. For forecasting, fit decline curve models (exponential, hyperbolic) or build a simple regression/ML model if enough historical wells exist. The goal is reproducible, auditable analysis instead of one-off spreadsheet work, and it scales much better across many wells.",
    thinkingApproach:
      "Walk through the same load-clean-explore-model workflow used across this site's Data Lab and Software Lab modules -- showing a consistent, practical workflow is more convincing than naming library after library.",
    commonMistakes: [
      "Naming libraries (pandas, matplotlib) without describing what you'd actually do with them.",
      "Skipping the data-cleaning step, which is usually where real production data analysis goes wrong.",
    ],
  },
  {
    id: "int-prod-4",
    category: "Production",
    role: "production-engineer",
    difficulty: "Advanced",
    question: "Water cut is rising across several wells in a field. How do you determine if this is water breakthrough or a mechanical issue?",
    idealAnswer:
      "Check the pattern: if the rise correlates with offset injector activity, proximity to an aquifer, or a known geological trend (e.g., wells closer to a water leg), it points to breakthrough. If it's isolated to specific wells regardless of position, or correlates with a workover or completion change, it's more likely mechanical (e.g., a tubing/casing leak, or channeling behind casing). Production logging (PLT) or a tracer survey can directly identify the water entry point if surface data is ambiguous.",
    thinkingApproach:
      "Separate the diagnosis into 'pattern across the field' (geological/reservoir signal) vs 'pattern within a well' (mechanical signal), and mention a direct diagnostic tool (PLT/tracer) as the tie-breaker.",
    commonMistakes: [
      "Assuming all water cut increases are breakthrough, ignoring mechanical causes.",
      "Not mentioning any way to directly confirm the diagnosis (e.g., production logging) when surface data alone is ambiguous.",
    ],
  },

  // ---------- Geology ----------
  {
    id: "int-geo-1",
    category: "Geology",
    role: "petroleum-geologist",
    difficulty: "Beginner",
    question: "What are the essential elements of a petroleum system, and why does timing matter?",
    idealAnswer:
      "A working petroleum system needs a mature source rock, a migration pathway, a reservoir rock with adequate porosity/permeability, a sealing rock, and a trap. Timing matters because the trap must form before or during hydrocarbon migration -- if the trap forms after the main charge has already migrated through or escaped, the prospect can be structurally perfect but empty.",
    thinkingApproach:
      "List the elements, then immediately explain the timing concept with a concrete consequence (an empty trap) -- this shows you understand it's not just a checklist.",
    commonMistakes: [
      "Listing the elements but not explaining why timing is a separate, critical risk factor.",
      "Confusing migration pathway with the reservoir rock itself.",
    ],
  },
  {
    id: "int-geo-2",
    category: "Geology",
    role: "petroleum-geologist",
    difficulty: "Intermediate",
    question: "A seismic amplitude anomaly could be a hydrocarbon indicator or just a lithology contrast. How do you de-risk it?",
    idealAnswer:
      "Cross-check the anomaly against multiple independent lines of evidence: does it conform to structure (flat spots can indicate a fluid contact, while amplitude that follows bedding rather than structure is more likely lithology)? Is there an AVO (amplitude versus offset) response consistent with hydrocarbons? Do nearby wells show a similar rock type without hydrocarbons, which would suggest the anomaly is lithology-driven? No single seismic attribute is proof on its own -- the goal is convergence of evidence before committing to a well.",
    thinkingApproach:
      "Show you know seismic amplitude alone is ambiguous, and name at least one independent check (structural conformance, AVO, well calibration) rather than treating the anomaly as a yes/no answer.",
    commonMistakes: [
      "Treating a 'bright spot' as automatic proof of hydrocarbons.",
      "Not mentioning calibration against existing well data in the area.",
    ],
  },
  {
    id: "int-geo-3",
    category: "Geology",
    role: "petroleum-geologist",
    difficulty: "Advanced",
    question: "Two wells in the same trend, with similar logs, produced very differently. What geological factors could explain this?",
    idealAnswer:
      "Possible causes include lateral changes in reservoir quality not visible in the log alone (e.g., diagenetic cementation, facies changes), compartmentalization by faults or stratigraphic barriers isolating one well from the main charge, differences in net pay actually penetrated versus what the log suggests, or differences in completion/stimulation effectiveness between the wells. I'd revisit the structural and stratigraphic maps around both wells, check for any mapped faults between them, and look at core or test data if available rather than relying on logs alone.",
    thinkingApproach:
      "Acknowledge that similar logs don't guarantee similar reservoir behavior, then offer multiple categories of explanation (geological compartmentalization, diagenesis, completion) rather than picking just one.",
    commonMistakes: [
      "Assuming similar logs must mean similar reservoirs and looking only at non-geological explanations.",
      "Not considering that faults between the wells could compartmentalize the reservoir even if logs look alike.",
    ],
  },
  {
    id: "int-geo-4",
    category: "Geology",
    role: "wellsite-geologist",
    difficulty: "Intermediate",
    question: "Gas readings spike suddenly while drilling. How do you decide if it's a real show, background gas, or a mud system artifact?",
    idealAnswer:
      "Check the trend shape and duration: a real show usually correlates with a lithology change in cuttings and lasts over a defined interval, while background gas tends to be a low, steady baseline. A mud system artifact (e.g., from a recent mud additive or degassing equipment issue) often doesn't correlate with any change in cuttings or drilling parameters. I'd cross-check against the mud logging unit's chromatograph (gas composition, not just total gas) and compare timing with any recent operational changes (connection gas vs a true formation show).",
    thinkingApproach:
      "Use convergence of evidence again: cuttings, gas composition, and timing relative to operations -- not just the magnitude of the spike.",
    commonMistakes: [
      "Reacting only to the magnitude of the gas reading without checking if it correlates with cuttings or composition.",
      "Not distinguishing connection gas (a normal artifact of stopping circulation) from a genuine formation show.",
    ],
  },

  // ---------- HSE ----------
  {
    id: "int-hse-1",
    category: "HSE",
    role: "hse-officer",
    difficulty: "Beginner",
    question: "What would you do if there is an H2S alarm on site?",
    idealAnswer:
      "Immediately stop work, evacuate to the designated upwind muster point, and follow the site's H2S emergency response plan -- do not attempt to investigate the source yourself unless trained and equipped with proper breathing apparatus. Account for all personnel at the muster point, alert the emergency response team/control room, and only allow re-entry once the area has been tested and declared safe by a qualified person.",
    thinkingApproach:
      "Lead with the immediate safety action (evacuate, don't investigate), then the procedural follow-up (muster, headcount, controlled re-entry) -- interviewers want to see that personal safety comes before curiosity or productivity.",
    commonMistakes: [
      "Suggesting you'd investigate the alarm or source yourself without proper PPE/training -- this is a common wrong answer that signals poor safety judgment.",
      "Forgetting the headcount/muster step, which is how a site confirms everyone is accounted for.",
    ],
  },
  {
    id: "int-hse-2",
    category: "HSE",
    role: "hse-officer",
    difficulty: "Beginner",
    question: "Explain the difference between a hazard and a risk.",
    idealAnswer:
      "A hazard is anything with the potential to cause harm (e.g., a high-pressure line, working at height, H2S gas). Risk is the combination of how likely that hazard is to actually cause harm and how severe the consequence would be if it did. The same hazard can carry different risk levels depending on controls in place -- e.g., working at height is a hazard regardless, but the risk is much lower if proper fall protection and procedures are used.",
    thinkingApproach:
      "Define both terms cleanly, then show you understand risk = likelihood x severity, and that controls change the risk without removing the hazard.",
    commonMistakes: [
      "Using 'hazard' and 'risk' interchangeably.",
      "Implying that controls eliminate the hazard itself, rather than reducing the risk associated with it.",
    ],
  },
  {
    id: "int-hse-3",
    category: "HSE",
    role: "hse-officer",
    difficulty: "Intermediate",
    question: "Explain the Hierarchy of Controls and how you'd apply it to a real task.",
    idealAnswer:
      "The hierarchy, from most to least effective, is: elimination (remove the hazard entirely), substitution (replace with something less hazardous), engineering controls (isolate people from the hazard, e.g., guarding, ventilation), administrative controls (procedures, permits, training), and PPE (the last line of defense, protecting the individual). For example, for working with a noisy compressor: eliminating the need to be near it is best; if not possible, enclosing it (engineering control) is preferred over just issuing ear protection (PPE) to whoever walks past.",
    thinkingApproach:
      "Name the five levels in order, then immediately apply them to one concrete example -- this is far more convincing than reciting the list abstractly.",
    commonMistakes: [
      "Treating PPE as the default or primary control rather than the last resort.",
      "Listing the hierarchy out of order or without explaining why higher levels are preferred.",
    ],
  },
  {
    id: "int-hse-4",
    category: "HSE",
    role: "hse-officer",
    difficulty: "Intermediate",
    question: "A crew wants to skip a step in the permit-to-work process to save time. How do you handle it?",
    idealAnswer:
      "I would not approve the work until the permit process is properly followed -- explain clearly why the step matters (it usually exists because of a past incident or identified hazard), and offer to help expedite the legitimate paperwork rather than skip it. If there's genuine time pressure, escalate to find a faster but still compliant path (e.g., pre-approved permits for routine low-risk tasks) rather than bypassing safety steps. Consistency matters -- making an exception once undermines the whole system's credibility.",
    thinkingApproach:
      "Show firmness without being purely procedural -- acknowledge the time pressure as real, but redirect toward a compliant solution instead of either rigidly refusing to engage or caving to pressure.",
    commonMistakes: [
      "Saying you'd allow it 'just this once' under time pressure -- this is one of the most common wrong answers in HSE interviews.",
      "Being purely bureaucratic without acknowledging the legitimate operational pressure the crew is under.",
    ],
  },
  {
    id: "int-hse-5",
    category: "HSE",
    role: "hse-officer",
    difficulty: "Advanced",
    question: "How would you investigate an incident to find the root cause rather than just the immediate cause?",
    idealAnswer:
      "Start by securing the scene and gathering immediate facts (what happened, who was involved, conditions at the time) before opinions get mixed in. Use a structured method (e.g., the '5 Whys' or a fault tree/fishbone analysis) to dig past the immediate trigger into underlying causes -- often a combination of an unsafe condition, a process gap, and a human factor. The immediate cause (e.g., 'worker wasn't wearing the right glove') is rarely the full story -- the root cause might be inadequate training, unclear procedure, or a supervision gap that let it happen repeatedly.",
    thinkingApproach:
      "Distinguish immediate cause from root cause explicitly, and name a structured method (5 Whys, fishbone) rather than describing investigation vaguely.",
    commonMistakes: [
      "Stopping at the immediate, surface-level cause (e.g., blaming the individual) instead of digging into systemic factors.",
      "Not mentioning the importance of preserving facts before speculation during the investigation.",
    ],
  },

  // ---------- Data & Software ----------
  {
    id: "int-data-1",
    category: "Data & Software",
    role: "subsurface-data-analyst",
    difficulty: "Intermediate",
    question: "How would you use Python for production data analysis?",
    idealAnswer:
      "Load data into pandas, clean it (handle missing values, shut-ins, unit mismatches), explore it visually with matplotlib (rate vs time, water cut vs time), and then apply the right model for the question -- decline curve fitting for forecasting, or simple statistics/clustering for comparing wells. The value of Python over spreadsheets is reproducibility (the same script can be rerun on updated data) and scale (works the same whether it's 5 wells or 500).",
    thinkingApproach:
      "Walk through load-clean-explore-model and explicitly state why code-based analysis beats ad hoc spreadsheet work for this use case.",
    commonMistakes: [
      "Listing libraries without describing the actual workflow.",
      "Not mentioning data cleaning, which is usually the most error-prone step with real field data.",
    ],
  },
  {
    id: "int-data-2",
    category: "Data & Software",
    role: "subsurface-data-analyst",
    difficulty: "Advanced",
    question: "A machine learning model performs well on training wells but poorly on new wells. What's going wrong?",
    idealAnswer:
      "This is a generalization problem -- likely causes include overfitting (the model memorized training-set noise rather than learning a transferable pattern), data leakage (information from the target or future leaked into training features), or a genuine domain shift (the new wells have different reservoir or operating characteristics than the training set). I'd check the train/test split methodology first (is it well-based, not just row-based, to avoid leakage across the same well), then look at feature importance and whether the new wells fall outside the training data's range (extrapolation rather than interpolation).",
    thinkingApproach:
      "Name the three classic explanations (overfitting, leakage, domain shift) and describe a concrete diagnostic step for each rather than guessing one cause.",
    commonMistakes: [
      "Jumping to 'the model needs to be more complex' without first ruling out leakage or a bad train/test split.",
      "Not considering that the new wells might simply be different in kind (e.g., different field, different completion) rather than the model being flawed.",
    ],
  },
  {
    id: "int-data-3",
    category: "Data & Software",
    role: "subsurface-data-analyst",
    difficulty: "Beginner",
    question: "Why is oil and gas data often described as 'hard to work with' for machine learning?",
    idealAnswer:
      "Petroleum data is often sparse (limited wells/samples relative to the complexity of the subsurface), noisy (sensor errors, shut-ins, inconsistent reporting across operators or eras), multidisciplinary (production, log, seismic, and geological data live in different systems with different formats), and expensive to generate (a single well or seismic survey can cost millions), so there's rarely as much clean labeled data as in other ML domains like image or text data.",
    thinkingApproach:
      "Give multiple concrete reasons (sparsity, noise, fragmentation, cost) rather than a single vague one like 'it's messy'.",
    commonMistakes: [
      "Saying only 'the data is messy' without explaining the specific ways it's messy.",
      "Not mentioning that the data is also expensive/slow to generate, which limits dataset size in a way text/image ML doesn't face.",
    ],
  },
  {
    id: "int-data-4",
    category: "Data & Software",
    role: "subsurface-data-analyst",
    difficulty: "Intermediate",
    question: "Two databases report different cumulative production values for the same well. How do you decide which is authoritative?",
    idealAnswer:
      "Trace each number back to its source system and calculation method -- one might be from allocated/estimated volumes and the other from metered/measured volumes, or one might include a different date range or unit convention. Check which system is the official regulatory or partner-reporting source (often the one with audit/compliance requirements is treated as authoritative), and document the discrepancy and its cause rather than silently picking one. If genuinely unclear, flag it to whoever owns each system rather than guessing.",
    thinkingApproach:
      "Show that you investigate root cause (units, date range, allocation method) before declaring a winner, and that you'd document/escalate rather than silently resolve ambiguity.",
    commonMistakes: [
      "Picking the larger or more official-sounding number without investigating why they differ.",
      "Not considering simple explanations like unit conversion or date-range mismatches before assuming a data quality bug.",
    ],
  },
];

const INTERVIEW_CATEGORIES = ["Reservoir", "Drilling", "Production", "Geology", "HSE", "Data & Software"];
