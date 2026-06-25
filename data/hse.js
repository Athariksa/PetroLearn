// hse.js
// Supporting data for the dedicated HSE page: "What would you do?" case
// studies, a pre-site checklist, and the 5x5 risk matrix used by the
// hseRiskMatrix chart renderer (see js/charts.js).

const HSE_CASE_STUDIES_DATA = [
  {
    id: "case-1",
    scenario:
      "You're walking past a confined space entry where two workers are inside a tank, and you notice the gas monitor at the entrance has been switched off.",
    question: "What would you do?",
    answer:
      "Stop the job immediately and have the workers evacuate the confined space. A gas monitor being off during confined space entry is a critical control failure -- atmospheres inside tanks can change quickly and silently (oxygen depletion, toxic gas buildup). Report it to the permit holder/supervisor, do not let work resume until continuous monitoring is restored and the permit is re-validated.",
  },
  {
    id: "case-2",
    scenario:
      "A contractor asks to use a ladder instead of the scheduled scaffold for a 4-meter height job because the scaffold crew is delayed and the contractor is behind schedule.",
    question: "What would you do?",
    answer:
      "Do not approve the substitution without a proper risk assessment. A ladder is generally not an equivalent control to scaffold for sustained work at that height -- it changes the risk profile (fall protection, hands-free work, duration of exposure). If there's genuine schedule pressure, look for a compliant alternative (e.g., a mobile elevated work platform) rather than downgrading the control to save time.",
  },
  {
    id: "case-3",
    scenario:
      "During a toolbox talk, a senior technician says the JSA for today's job is 'basically the same as always' and suggests skipping the review since the crew has done this job many times before.",
    question: "What would you do?",
    answer:
      "Insist on reviewing the JSA, even briefly -- conditions change (weather, nearby simultaneous operations, equipment condition) even when the task itself is routine. Routine, repetitive jobs are actually a known incident pattern because complacency sets in. A 2-minute review that confirms 'yes, conditions match the JSA' is cheap insurance against the rare day they don't.",
  },
  {
    id: "case-4",
    scenario:
      "You smell a faint rotten-egg odor near a wellhead, but your personal gas monitor isn't alarming.",
    question: "What would you do?",
    answer:
      "Treat it seriously: move away from the area to fresh air immediately. H2S can deaden your sense of smell at higher concentrations, so 'I can still smell it' is not a reliable safety indicator, and a monitor reading low doesn't rule out a developing or localized higher concentration nearby. Report the odor, verify your monitor is calibrated and functioning, and do not return until the area is confirmed safe by a proper gas test.",
  },
  {
    id: "case-5",
    scenario:
      "A crane lift is about to begin, and you notice the rigging crew is one person short of the number specified in the lift plan.",
    question: "What would you do?",
    answer:
      "Stop the lift until the crew matches the approved lift plan, or the plan is formally revised and re-approved for the actual crew size. Lift plans specify crew size for a reason -- communication, load control, and exclusion zone management all depend on having enough people in the right positions. Proceeding short-staffed is a common precursor to dropped-load or struck-by incidents.",
  },
  {
    id: "case-6",
    scenario:
      "You're new on site and see an experienced colleague not wearing the required hearing protection in a marked high-noise area, but they wave it off saying 'I've worked here for 20 years, I'm fine.'",
    question: "What would you do?",
    answer:
      "Speak up regardless of their experience level -- hearing damage from chronic noise exposure is cumulative and often doesn't feel acute until it's permanent. PPE rules apply uniformly because risk doesn't decrease with experience; if you're not comfortable confronting them directly, report it to the area supervisor or HSE officer. A genuine safety culture means anyone can raise a concern regardless of seniority.",
  },
];

const HSE_CHECKLIST_DATA = [
  "Confirm your induction/site orientation is current for this specific site.",
  "Verify you have the correct PPE for the area you're entering (hard hat, safety glasses, FR clothing, H2S monitor where required).",
  "Check that any required certifications (H2S, HUET/BOSIET, confined space, working at height) are valid and not expired.",
  "Know the muster point and emergency assembly procedure before you start work.",
  "Confirm a permit to work is issued and current for any task that requires one.",
  "Review the JSA/JHA for your specific task, even if you've done it before.",
  "Locate the nearest emergency shower/eyewash and fire extinguisher if working near chemicals or hot work.",
  "Confirm communication method with the control room or supervisor (radio channel, phone, check-in schedule).",
  "Check weather and environmental conditions if working outdoors or at height.",
  "Know who your HSE point of contact is on site, and how to report a near-miss or stop a job.",
];

// Likelihood (rows) x Severity (columns), 1 (lowest) to 5 (highest).
// riskLevel: "Low" | "Medium" | "High" | "Critical" -- used to color the
// hseRiskMatrix chart cells.
const HSE_RISK_MATRIX_DATA = {
  severityLabels: ["Negligible", "Minor", "Moderate", "Major", "Catastrophic"],
  likelihoodLabels: ["Rare", "Unlikely", "Possible", "Likely", "Almost Certain"],
  // grid[likelihoodIndex][severityIndex] -> riskLevel
  grid: [
    ["Low", "Low", "Low", "Medium", "Medium"],
    ["Low", "Low", "Medium", "Medium", "High"],
    ["Low", "Medium", "Medium", "High", "High"],
    ["Medium", "Medium", "High", "High", "Critical"],
    ["Medium", "High", "High", "Critical", "Critical"],
  ],
};
