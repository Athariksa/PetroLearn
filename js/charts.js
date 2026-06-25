// charts.js
// Small, dependency-free inline-SVG visual components used inside module
// detail views and the Data/Software Lab pages. No chart library, no
// canvas -- just generated SVG markup, so it stays readable and works
// completely offline. All sample data here is illustrative, not measured
// field data, and is labeled as such in the caption.
//
// Every chart is wrapped by buildChartCard() so each one consistently shows
// a title, a short explanation, clear axis labels, and a source/sample note.

function buildChartCard(title, explanation, svgMarkup, viewBox, sourceNote) {
  return `
    <figure class="chart-card">
      <figcaption>
        <strong>${title}</strong>
        <p>${explanation}</p>
      </figcaption>
      <svg viewBox="${viewBox}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${title}">
        ${svgMarkup}
      </svg>
      <p class="chart-source-note">${sourceNote}</p>
    </figure>
  `;
}

function buildLineChartSVG(points, xLabel, yLabel) {
  const width = 320;
  const height = 160;
  const padding = 32;
  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  const xMin = Math.min(...xs);
  const xMax = Math.max(...xs);
  const yMin = 0;
  const yMax = Math.max(...ys) * 1.15;

  const scaleX = (x) => padding + ((x - xMin) / (xMax - xMin)) * (width - padding * 1.5);
  const scaleY = (y) => height - padding - ((y - yMin) / (yMax - yMin)) * (height - padding * 1.5);

  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"}${scaleX(p.x).toFixed(1)},${scaleY(p.y).toFixed(1)}`).join(" ");
  const dots = points
    .map((p) => `<circle cx="${scaleX(p.x).toFixed(1)}" cy="${scaleY(p.y).toFixed(1)}" r="2.5" class="chart-dot" />`)
    .join("");

  return {
    viewBox: `0 0 ${width} ${height}`,
    svg: `
      <line x1="${padding}" y1="${height - padding}" x2="${width - 8}" y2="${height - padding}" class="chart-axis" />
      <line x1="${padding}" y1="8" x2="${padding}" y2="${height - padding}" class="chart-axis" />
      <path d="${pathD}" class="chart-line" />
      ${dots}
      <text x="${width / 2}" y="${height - 4}" class="chart-axis-label">${xLabel}</text>
      <text x="10" y="${height / 2}" class="chart-axis-label" transform="rotate(-90 10 ${height / 2})">${yLabel}</text>
    `,
  };
}

function buildInfoCard(title, explanation, bodyHtml, sourceNote) {
  return `
    <figure class="chart-card">
      <figcaption>
        <strong>${title}</strong>
        <p>${explanation}</p>
      </figcaption>
      ${bodyHtml}
      <p class="chart-source-note">${sourceNote}</p>
    </figure>
  `;
}

// Like buildLineChartSVG, but the y-axis can start below zero -- needed for
// charts such as NPV sensitivity where values cross from negative to
// positive.
function buildSignedLineChartSVG(points, xLabel, yLabel) {
  const width = 320;
  const height = 170;
  const padding = 34;
  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  const xMin = Math.min(...xs);
  const xMax = Math.max(...xs);
  const yMin = Math.min(0, ...ys) * 1.15;
  const yMax = Math.max(0, ...ys) * 1.15;

  const scaleX = (x) => padding + ((x - xMin) / (xMax - xMin)) * (width - padding * 1.5);
  const scaleY = (y) => height - padding - ((y - yMin) / (yMax - yMin)) * (height - padding * 1.5);
  const zeroY = scaleY(0);

  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"}${scaleX(p.x).toFixed(1)},${scaleY(p.y).toFixed(1)}`).join(" ");

  return {
    viewBox: `0 0 ${width} ${height}`,
    svg: `
      <line x1="${padding}" y1="${zeroY.toFixed(1)}" x2="${width - 8}" y2="${zeroY.toFixed(1)}" class="chart-axis" />
      <line x1="${padding}" y1="8" x2="${padding}" y2="${height - padding}" class="chart-axis" />
      <path d="${pathD}" class="chart-line" />
      <text x="${width / 2}" y="${height - 4}" class="chart-axis-label">${xLabel}</text>
      <text x="10" y="${height / 2}" class="chart-axis-label" transform="rotate(-90 10 ${height / 2})">${yLabel}</text>
    `,
  };
}

function buildBarChartSVG(bars) {
  const width = 320;
  const height = 170;
  const padding = 30;
  const barGap = 14;
  const barWidth = (width - padding - 10 - barGap * (bars.length - 1)) / bars.length;
  const maxVal = Math.max(...bars.map((b) => b.value)) * 1.15;

  const barsSvg = bars
    .map((b, i) => {
      const barHeight = ((height - padding - 24) * b.value) / maxVal;
      const x = padding + i * (barWidth + barGap);
      const y = height - padding - barHeight;
      return `
        <rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${barWidth.toFixed(1)}" height="${barHeight.toFixed(1)}" class="chart-bar" style="fill:${b.color}" />
        <text x="${(x + barWidth / 2).toFixed(1)}" y="${(y - 6).toFixed(1)}" class="chart-bar-value">${b.value}%</text>
        <text x="${(x + barWidth / 2).toFixed(1)}" y="${height - 10}" class="chart-bar-label">${b.label}</text>
      `;
    })
    .join("");

  return {
    viewBox: `0 0 ${width} ${height}`,
    svg: `
      <line x1="${padding}" y1="${height - padding}" x2="${width - 8}" y2="${height - padding}" class="chart-axis" />
      ${barsSvg}
    `,
  };
}

function buildSignedBarChartSVG(bars) {
  const width = 320;
  const height = 170;
  const padding = 34;
  const barGap = 8;
  const barWidth = (width - padding - 10 - barGap * (bars.length - 1)) / bars.length;
  const maxAbs = Math.max(...bars.map((b) => Math.abs(b.value))) * 1.2;
  const zeroY = height / 2;
  const halfPlot = height / 2 - padding / 2;

  const barsSvg = bars
    .map((b, i) => {
      const barHeight = (halfPlot * Math.abs(b.value)) / maxAbs;
      const x = padding + i * (barWidth + barGap);
      const y = b.value >= 0 ? zeroY - barHeight : zeroY;
      return `
        <rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${barWidth.toFixed(1)}" height="${barHeight.toFixed(1)}" class="chart-bar" style="fill:${b.value >= 0 ? "var(--color-teal)" : "var(--color-rose)"}" />
        <text x="${(x + barWidth / 2).toFixed(1)}" y="${(b.value >= 0 ? y - 4 : y + barHeight + 10).toFixed(1)}" class="chart-bar-value">${b.value}</text>
        <text x="${(x + barWidth / 2).toFixed(1)}" y="${height - 6}" class="chart-bar-label">${b.label}</text>
      `;
    })
    .join("");

  return {
    viewBox: `0 0 ${width} ${height}`,
    svg: `
      <line x1="${padding}" y1="${zeroY}" x2="${width - 8}" y2="${zeroY}" class="chart-axis" />
      ${barsSvg}
    `,
  };
}

const CHART_RENDERERS = {
  trapSchematic(containerId) {
    const svgMarkup = `
      <rect x="0" y="0" width="320" height="180" class="chart-bg" />
      <path d="M0,140 Q160,90 320,140 L320,180 L0,180 Z" class="chart-layer chart-layer-seal" />
      <path d="M0,150 Q160,105 320,150 L320,170 L0,170 Z" class="chart-layer chart-layer-reservoir" />
      <path d="M0,160 Q160,150 320,160 L320,180 L0,180 Z" class="chart-layer chart-layer-oil" />
      <path d="M0,178 L320,178 L320,200 L0,200 Z" class="chart-layer chart-layer-source" />
      <text x="20" y="118" class="chart-svg-label">Seal rock</text>
      <text x="20" y="138" class="chart-svg-label">Reservoir rock (trap crest)</text>
      <text x="160" y="165" class="chart-svg-label chart-svg-label-light">Oil / gas</text>
      <text x="20" y="195" class="chart-svg-label">Source rock (below)</text>
    `;
    document.getElementById(containerId).innerHTML = buildChartCard(
      "Source - Reservoir - Seal - Trap Schematic",
      "A simplified cross-section: hydrocarbons generated in the source rock migrate upward into the curved reservoir rock, where the overlying seal rock prevents further escape, accumulating at the structural high point (the trap).",
      svgMarkup,
      "0 0 320 200",
      "Illustrative schematic, not to scale. Concept reference: AAPG Wiki."
    );
  },

  petroleumSystemDiagram(containerId) {
    const boxes = [
      { x: 4, label: "Source Rock" },
      { x: 84, label: "Migration" },
      { x: 164, label: "Reservoir Rock" },
      { x: 244, label: "Seal + Trap" },
    ];
    const boxesSvg = boxes
      .map(
        (b, i) => `
        <rect x="${b.x}" y="60" width="72" height="40" rx="6" class="chart-flow-box" />
        <text x="${b.x + 36}" y="84" class="chart-flow-label">${b.label}</text>
        ${i < boxes.length - 1 ? `<line x1="${b.x + 72}" y1="80" x2="${boxes[i + 1].x}" y2="80" class="chart-flow-arrow" marker-end="url(#arrowhead)" />` : ""}
      `
      )
      .join("");

    const svgMarkup = `
      <defs>
        <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" class="chart-arrowhead" />
        </marker>
      </defs>
      ${boxesSvg}
      <text x="160" y="30" class="chart-flow-title">Timing matters: the trap must exist before or during migration</text>
    `;
    document.getElementById(containerId).innerHTML = buildChartCard(
      "Petroleum System Process Flow",
      "The four linked elements of a working petroleum system, shown in the order hydrocarbons must pass through them.",
      svgMarkup,
      "0 0 320 110",
      "Concept reference: AAPG Wiki: Petroleum system."
    );
  },

  porosityPermeabilityScatter(containerId) {
    const width = 320;
    const height = 170;
    const padding = 32;
    const points = [
      { por: 8, perm: 2, rock: "Tight sandstone" },
      { por: 14, perm: 15, rock: "Sandstone" },
      { por: 18, perm: 60, rock: "Clean sandstone" },
      { por: 22, perm: 220, rock: "High-quality sandstone" },
      { por: 12, perm: 5, rock: "Carbonate (low quality)" },
      { por: 25, perm: 400, rock: "High-quality carbonate" },
    ];
    const scaleX = (v) => padding + (v / 30) * (width - padding - 16);
    const scaleY = (v) => height - padding - (Math.log10(v + 1) / 2.7) * (height - padding - 16);

    const dotsSvg = points
      .map(
        (p) => `<circle cx="${scaleX(p.por).toFixed(1)}" cy="${scaleY(p.perm).toFixed(1)}" r="4" class="chart-dot"><title>${p.rock}: ${p.por}% porosity, ${p.perm} mD</title></circle>`
      )
      .join("");

    const svgMarkup = `
      <line x1="${padding}" y1="${height - padding}" x2="${width - 8}" y2="${height - padding}" class="chart-axis" />
      <line x1="${padding}" y1="8" x2="${padding}" y2="${height - padding}" class="chart-axis" />
      ${dotsSvg}
      <text x="${width / 2}" y="${height - 4}" class="chart-axis-label">Porosity (%)</text>
      <text x="10" y="${height / 2}" class="chart-axis-label" transform="rotate(-90 10 ${height / 2})">Permeability (mD, log scale)</text>
    `;
    document.getElementById(containerId).innerHTML = buildChartCard(
      "Porosity vs Permeability (Sample Rock Types)",
      "Higher porosity often correlates with higher permeability, but rock fabric (sandstone vs carbonate, cementation) causes real scatter around that trend.",
      svgMarkup,
      `0 0 ${width} ${height}`,
      "Sample illustrative data, not measured core data."
    );
  },

  waterCutChart(containerId) {
    // Annual-average shape anchored to one verified public data point (peak
    // reported water production of ~9,500 Sm3/d in Sept 2014, against an oil
    // rate of roughly 14,000 bbl/d that year -- implying a water cut near
    // 80% at that point in field life). Other years are interpolated to
    // match the field's known waterflood/water-breakthrough behavior, since
    // the full per-well daily CSVs are not parsed by this static site.
    const points = [
      { x: 2008, y: 5 },
      { x: 2009, y: 10 },
      { x: 2010, y: 18 },
      { x: 2011, y: 30 },
      { x: 2012, y: 45 },
      { x: 2013, y: 60 },
      { x: 2014, y: 81 },
      { x: 2015, y: 88 },
      { x: 2016, y: 92 },
    ];
    const { viewBox, svg } = buildLineChartSVG(points, "Year", "Field water cut (%)");
    document.getElementById(containerId).innerHTML = buildChartCard(
      "Volve Field Water Cut Trend (2008-2016)",
      "Water cut rose sharply over Volve's field life as water injection (used for pressure support) broke through to producers. Anchored to the one concrete public figure available: peak reported water production of about 9,500 Sm3/d (~60,000 bbl/d) in September 2014.",
      svg,
      viewBox,
      "Approximate annual shape based on publicly reported Volve facts (Equinor, Norsk Petroleum), not the full per-well daily CSV."
    );
  },

  declineCurveChart(containerId) {
    // Annual-average oil rate shape built to match three verified public
    // facts about the real Volve field: production ran 2008-2016 (~8
    // years), peak instantaneous rate was about 56,000 bbl/d, and total
    // recovery was about 63 million barrels (54% recovery factor). This is
    // a field-level approximation, not the actual per-well daily CSV --
    // real Volve well data has far more short-term noise than this curve.
    const points = [
      { x: 2008, y: 9000 },
      { x: 2009, y: 25000 },
      { x: 2010, y: 32000 },
      { x: 2011, y: 30000 },
      { x: 2012, y: 25000 },
      { x: 2013, y: 19000 },
      { x: 2014, y: 14000 },
      { x: 2015, y: 9000 },
      { x: 2016, y: 5000 },
    ];
    const { viewBox, svg } = buildLineChartSVG(points, "Year", "Field oil rate (bbl/d, annual avg)");
    document.getElementById(containerId).innerHTML = buildChartCard(
      "Volve Field Oil Rate, 2008-2016 (Annual Average)",
      "Volve's reported peak instantaneous rate (~56,000 bbl/d) was higher than any single year's average shown here, since production ramped up in 2008-2010, plateaued, then declined toward shutdown in 2016. Total recovery was about 63 million barrels (54% recovery factor).",
      svg,
      viewBox,
      "Approximate annual-average shape based on publicly reported Volve totals (Equinor, SPE/JPT, Offshore Technology), not the full per-well daily CSV."
    );
  },

  wellLogTrack(containerId) {
    const grValues = [20, 35, 80, 90, 30, 25, 70, 85, 40];
    const resValues = [60, 50, 15, 10, 65, 70, 20, 12, 55];
    const trackHeight = 160;
    const trackTop = 10;
    const step = trackHeight / (grValues.length - 1);

    const grPath = grValues
      .map((v, i) => `${i === 0 ? "M" : "L"}${(40 + v * 0.4).toFixed(1)},${(trackTop + i * step).toFixed(1)}`)
      .join(" ");
    const resPath = resValues
      .map((v, i) => `${i === 0 ? "M" : "L"}${(200 + v * 0.6).toFixed(1)},${(trackTop + i * step).toFixed(1)}`)
      .join(" ");

    const svgMarkup = `
      <line x1="40" y1="${trackTop}" x2="40" y2="${trackTop + trackHeight}" class="chart-axis" />
      <line x1="200" y1="${trackTop}" x2="200" y2="${trackTop + trackHeight}" class="chart-axis" />
      <path d="${grPath}" class="chart-line chart-line-gr" />
      <path d="${resPath}" class="chart-line chart-line-res" />
      <text x="40" y="${trackTop - 2}" class="chart-axis-label">GR</text>
      <text x="200" y="${trackTop - 2}" class="chart-axis-label">Resistivity</text>
      <text x="10" y="${trackTop + trackHeight / 2}" class="chart-axis-label" transform="rotate(-90 10 ${trackTop + trackHeight / 2})">Depth</text>
    `;
    document.getElementById(containerId).innerHTML = buildChartCard(
      "Well Logging Track (Mock Example)",
      "A simplified two-track mock-up: a gamma ray (GR) curve on the left and a resistivity curve on the right. High GR with low resistivity often suggests shale; low GR with high resistivity in a porous zone suggests a hydrocarbon-bearing reservoir.",
      svgMarkup,
      "0 0 320 180",
      "Mock log shape for illustration, not a real well log."
    );
  },

  eorComparisonChart(containerId) {
    const bars = [
      { label: "Waterflood", value: 15, color: "var(--color-teal)" },
      { label: "Gas Inj.", value: 10, color: "var(--color-teal-bright)" },
      { label: "Chemical", value: 8, color: "var(--color-amber)" },
      { label: "Thermal", value: 18, color: "#fb7185" },
    ];
    const { viewBox, svg } = buildBarChartSVG(bars);
    document.getElementById(containerId).innerHTML = buildChartCard(
      "EOR Method Comparison (Typical Incremental Recovery)",
      "Approximate additional recovery factor each EOR method can add on top of primary and secondary recovery. Actual performance depends heavily on reservoir and fluid properties.",
      svg,
      viewBox,
      "Illustrative typical ranges, not a specific field result."
    );
  },

  opmWorkflowDiagram(containerId) {
    const boxes = [
      { x: 4, label: "Input Deck" },
      { x: 84, label: "OPM Flow Solver" },
      { x: 184, label: "Output (Restart/VTK)" },
    ];
    const boxesSvg = boxes
      .map(
        (b, i) => `
        <rect x="${b.x}" y="40" width="${i === 1 ? 92 : 72}" height="40" rx="6" class="chart-flow-box" />
        <text x="${b.x + (i === 1 ? 46 : 36)}" y="64" class="chart-flow-label">${b.label}</text>
        ${i < boxes.length - 1 ? `<line x1="${b.x + (i === 1 ? 92 : 72)}" y1="60" x2="${boxes[i + 1].x}" y2="60" class="chart-flow-arrow" marker-end="url(#arrowhead2)" />` : ""}
      `
      )
      .join("");

    const svgMarkup = `
      <defs>
        <marker id="arrowhead2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" class="chart-arrowhead" />
        </marker>
      </defs>
      ${boxesSvg}
      <line x1="320" y1="60" x2="320" y2="110" class="chart-flow-arrow" marker-end="url(#arrowhead2)" />
      <rect x="220" y="110" width="92" height="40" rx="6" class="chart-flow-box" />
      <text x="266" y="134" class="chart-flow-label">ResInsight View</text>
    `;
    document.getElementById(containerId).innerHTML = buildChartCard(
      "OPM Flow Simulation Workflow",
      "A basic reservoir simulation loop: an input deck (grid, properties, wells, schedule) is solved by OPM Flow, producing output that can be visualized in a tool such as ResInsight.",
      svgMarkup,
      "0 0 320 160",
      "Concept workflow reference: opm-project.org and SINTEF OPM page."
    );
  },

  drillingWellControlDiagram(containerId) {
    const boxes = [
      { x: 4, label: "Mud Weight" },
      { x: 84, label: "Casing" },
      { x: 164, label: "Cementing" },
      { x: 244, label: "BOP" },
    ];
    const boxesSvg = boxes
      .map(
        (b, i) => `
        <rect x="${b.x}" y="50" width="72" height="40" rx="6" class="chart-flow-box" />
        <text x="${b.x + 36}" y="74" class="chart-flow-label">${b.label}</text>
        ${i < boxes.length - 1 ? `<line x1="${b.x + 72}" y1="70" x2="${boxes[i + 1].x}" y2="70" class="chart-flow-arrow" marker-end="url(#arrowhead3)" />` : ""}
      `
      )
      .join("");
    const svgMarkup = `
      <defs>
        <marker id="arrowhead3" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" class="chart-arrowhead" />
        </marker>
      </defs>
      ${boxesSvg}
      <text x="160" y="25" class="chart-flow-title">Layered well control: each barrier backs up the one before it</text>
    `;
    document.getElementById(containerId).innerHTML = buildChartCard(
      "Drilling Well Control Concept Map",
      "Well control is layered: correctly weighted mud is the first barrier, casing and cementing provide structural and zonal isolation, and the blowout preventer is the last-resort mechanical barrier.",
      svgMarkup,
      "0 0 320 100",
      "Concept reference: IADC Lexicon, PetroWiki."
    );
  },

  productionEngineeringConceptMap(containerId) {
    const boxes = [
      { x: 4, label: "Reservoir" },
      { x: 84, label: "Inflow (IPR)" },
      { x: 164, label: "Wellbore" },
      { x: 244, label: "Outflow (TPR)" },
    ];
    const boxesSvg = boxes
      .map(
        (b, i) => `
        <rect x="${b.x}" y="50" width="72" height="40" rx="6" class="chart-flow-box" />
        <text x="${b.x + 36}" y="74" class="chart-flow-label">${b.label}</text>
        ${i < boxes.length - 1 ? `<line x1="${b.x + 72}" y1="70" x2="${boxes[i + 1].x}" y2="70" class="chart-flow-arrow" marker-end="url(#arrowhead4)" />` : ""}
      `
      )
      .join("");
    const svgMarkup = `
      <defs>
        <marker id="arrowhead4" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" class="chart-arrowhead" />
        </marker>
      </defs>
      ${boxesSvg}
      <text x="160" y="25" class="chart-flow-title">Nodal analysis = where Inflow and Outflow performance meet</text>
    `;
    document.getElementById(containerId).innerHTML = buildChartCard(
      "Production Engineering Concept Map",
      "Fluid travels from the reservoir (inflow performance) through the wellbore and out through tubing and surface equipment (outflow performance); nodal analysis finds where the two curves intersect.",
      svgMarkup,
      "0 0 320 100",
      "Concept reference: PetroWiki."
    );
  },

  cashFlowTimeline(containerId) {
    const bars = [
      { label: "Yr1", value: -250 },
      { label: "Yr2", value: -250 },
      { label: "Yr3", value: 80 },
      { label: "Yr4", value: 120 },
      { label: "Yr5", value: 140 },
      { label: "Yr6", value: 130 },
      { label: "Yr7", value: 110 },
    ];
    const { viewBox, svg } = buildSignedBarChartSVG(bars);
    document.getElementById(containerId).innerHTML = buildChartCard(
      "Upstream Project Cash Flow Timeline",
      "A simplified project cash flow: large negative CAPEX in the first two years, followed by positive net cash flow once production starts and OPEX is covered by revenue.",
      svg,
      viewBox,
      "Sample illustrative cash flow ($ million), not a real project."
    );
  },

  capexOpexCard(containerId) {
    const bars = [
      { label: "CAPEX (total)", value: 500, color: "var(--color-navy)" },
      { label: "OPEX (per year)", value: 60, color: "var(--color-teal)" },
    ];
    const { viewBox, svg } = buildBarChartSVG(bars);
    document.getElementById(containerId).innerHTML = buildChartCard(
      "CAPEX vs OPEX (Sample Field)",
      "CAPEX is a large one-time investment to build the project; OPEX is a smaller cost repeated every year of production. Both must be covered by revenue for the project to be profitable.",
      svg,
      viewBox,
      "Sample illustrative figures ($ million), not a real project."
    );
  },

  npvSensitivityChart(containerId) {
    const points = [
      { x: 40, y: -90 },
      { x: 50, y: -30 },
      { x: 60, y: 30 },
      { x: 70, y: 90 },
      { x: 80, y: 150 },
      { x: 90, y: 210 },
    ];
    const { viewBox, svg } = buildSignedLineChartSVG(points, "Oil price ($/bbl)", "Project NPV ($ million)");
    document.getElementById(containerId).innerHTML = buildChartCard(
      "NPV Sensitivity to Oil Price (Sample Project)",
      "As the assumed oil price rises, project NPV rises too -- the price at which the line crosses zero is the break-even price for this sample project.",
      svg,
      viewBox,
      "Sample illustrative sensitivity, not a real project's economics."
    );
  },

  breakEvenDiagram(containerId) {
    const width = 320;
    const height = 140;
    const breakEvenX = 170;
    const svgMarkup = `
      <rect x="20" y="20" width="${breakEvenX - 20}" height="90" class="chart-bg" style="fill:rgba(251,113,133,0.15)" />
      <rect x="${breakEvenX}" y="20" width="${width - breakEvenX - 20}" height="90" class="chart-bg" style="fill:rgba(31,122,108,0.12)" />
      <line x1="${breakEvenX}" y1="15" x2="${breakEvenX}" y2="115" class="chart-axis" style="stroke:var(--color-amber); stroke-width:2" />
      <line x1="20" y1="115" x2="300" y2="115" class="chart-axis" />
      <text x="60" y="65" class="chart-svg-label">Below break-even:<tspan x="60" dy="12">project loses money</tspan></text>
      <text x="${breakEvenX + 15}" y="65" class="chart-svg-label">Above break-even:<tspan x="${breakEvenX + 15}" dy="12">project is profitable</tspan></text>
      <text x="${breakEvenX - 28}" y="130" class="chart-axis-label">Break-even price</text>
      <text x="${width / 2}" y="10" class="chart-axis-label">Increasing oil price -&gt;</text>
    `;
    document.getElementById(containerId).innerHTML = buildChartCard(
      "Break-even Price Concept Diagram",
      "Below the break-even price, a project's NPV is negative; above it, the project becomes profitable. Sensitivity analysis is used to see how close current price assumptions are to this line.",
      svgMarkup,
      `0 0 ${width} ${height}`,
      "Conceptual diagram, not drawn from real project data."
    );
  },

  mlWorkflowDiagram(containerId) {
    const boxes = [
      { x: 0, label: "Data" },
      { x: 66, label: "Feature Eng." },
      { x: 132, label: "Model Training" },
      { x: 198, label: "Validation" },
      { x: 264, label: "Deployment" },
    ];
    const boxesSvg = boxes
      .map(
        (b, i) => `
        <rect x="${b.x}" y="50" width="58" height="40" rx="6" class="chart-flow-box" />
        <text x="${b.x + 29}" y="68" class="chart-flow-label" style="font-size:6.5px">${b.label}</text>
        ${i < boxes.length - 1 ? `<line x1="${b.x + 58}" y1="70" x2="${boxes[i + 1].x}" y2="70" class="chart-flow-arrow" marker-end="url(#arrowhead5)" />` : ""}
      `
      )
      .join("");
    const svgMarkup = `
      <defs>
        <marker id="arrowhead5" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" class="chart-arrowhead" />
        </marker>
      </defs>
      ${boxesSvg}
      <text x="160" y="25" class="chart-flow-title">Validation failures send the loop back to feature engineering</text>
    `;
    document.getElementById(containerId).innerHTML = buildChartCard(
      "Machine Learning Workflow",
      "A typical ML workflow: raw data is turned into useful features, a model is trained, then validated against unseen data before being deployed -- and the loop often repeats.",
      svgMarkup,
      "0 0 322 100",
      "Generic ML workflow, not specific to one tool."
    );
  },

  mlUseCaseMatrix(containerId) {
    const useCases = [
      { domain: "Reservoir", task: "Regression", example: "Recovery factor / production forecasting" },
      { domain: "Petrophysics", task: "Classification", example: "Lithofacies prediction from well logs" },
      { domain: "Geophysics", task: "Classification", example: "Seismic fault detection" },
      { domain: "Production", task: "Anomaly detection", example: "Equipment failure / well integrity issues" },
      { domain: "Drilling", task: "Regression", example: "Drilling parameter optimization" },
      { domain: "Sustainability", task: "Classification", example: "Methane emission detection from imagery" },
    ];
    const rows = useCases
      .map(
        (u) => `<tr><td>${u.domain}</td><td><span class="badge">${u.task}</span></td><td>${u.example}</td></tr>`
      )
      .join("");
    const bodyHtml = `
      <table class="formula-table">
        <thead><tr><th>Domain</th><th>ML Task</th><th>Example use case</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    `;
    document.getElementById(containerId).innerHTML = buildInfoCard(
      "Oil and Gas ML Use-Case Matrix",
      "A sample of how core ML tasks map onto real petroleum engineering and geoscience problems.",
      bodyHtml,
      "Illustrative selection, not an exhaustive list."
    );
  },

  hseRiskMatrix(containerId) {
    const data = HSE_RISK_MATRIX_DATA;
    const riskClass = { Low: "risk-low", Medium: "risk-medium", High: "risk-high", Critical: "risk-critical" };

    const headerRow = `<tr><th></th>${data.severityLabels.map((s) => `<th>${s}</th>`).join("")}</tr>`;
    const bodyRows = data.likelihoodLabels
      .map((label, rowIdx) => {
        const cells = data.grid[rowIdx]
          .map((level) => `<td class="risk-matrix-cell ${riskClass[level]}">${level}</td>`)
          .join("");
        return `<tr><th>${label}</th>${cells}</tr>`;
      })
      .join("");

    const bodyHtml = `
      <table class="risk-matrix-table">
        <thead>${headerRow}</thead>
        <tbody>${bodyRows}</tbody>
      </table>
    `;
    document.getElementById(containerId).innerHTML = buildInfoCard(
      "Risk Assessment Matrix",
      "Rows are likelihood, columns are severity. Each cell shows the resulting risk level used to decide how urgently a hazard needs additional controls.",
      bodyHtml,
      "Illustrative matrix shape -- specific risk-scoring rules vary by company."
    );
  },
};

function renderModuleChart(moduleId, containerId) {
  const mod = MODULES_DATA.find((m) => m.id === moduleId);
  if (!mod || !mod.charts || !mod.charts[0]) return;
  const renderer = CHART_RENDERERS[mod.charts[0]];
  if (renderer) renderer(containerId);
}

// Renders every chart key listed in mod.charts (in order) into containerId,
// each in its own wrapper div so multiple visuals can stack inside one
// module detail view.
function renderModuleCharts(moduleId, containerId) {
  const mod = MODULES_DATA.find((m) => m.id === moduleId);
  const container = document.getElementById(containerId);
  if (!mod || !container || !mod.charts) return;

  container.innerHTML = mod.charts.map((key) => `<div id="${containerId}-${key}"></div>`).join("");
  mod.charts.forEach((key) => {
    const renderer = CHART_RENDERERS[key];
    if (renderer) renderer(`${containerId}-${key}`);
  });
}
