// Unit converter data for PetroLearn AI.
// Each category lists units with a linear factor to a common base unit
// (toBase), so converting between any two units in the same category is
// just value -> base -> target. API gravity is handled separately below
// since it is not a linear conversion.

const UNIT_CONVERTER_CATEGORIES = [
  {
    id: "volume",
    label: "Volume",
    baseUnit: "m3",
    units: [
      { key: "bbl", label: "Barrels (bbl, oil)", toBase: 0.158987 },
      { key: "m3", label: "Cubic meters (m3)", toBase: 1 },
      { key: "ft3", label: "Cubic feet (ft3)", toBase: 0.0283168 },
      { key: "L", label: "Liters (L)", toBase: 0.001 },
      { key: "gal", label: "US gallons (gal)", toBase: 0.00378541 },
    ],
  },
  {
    id: "gas-volume",
    label: "Gas Volume",
    baseUnit: "m3",
    units: [
      { key: "scf", label: "Standard cubic feet (scf)", toBase: 0.0283168 },
      { key: "Mscf", label: "Thousand standard cubic feet (Mscf)", toBase: 28.3168 },
      { key: "MMscf", label: "Million standard cubic feet (MMscf)", toBase: 28316.8 },
      { key: "sm3", label: "Standard cubic meters (Sm3)", toBase: 1 },
    ],
  },
  {
    id: "pressure",
    label: "Pressure",
    baseUnit: "kPa",
    units: [
      { key: "psi", label: "Pounds per square inch (psi)", toBase: 6.89476 },
      { key: "bar", label: "Bar", toBase: 100 },
      { key: "kPa", label: "Kilopascals (kPa)", toBase: 1 },
      { key: "atm", label: "Atmospheres (atm)", toBase: 101.325 },
    ],
  },
  {
    id: "length",
    label: "Length / Depth",
    baseUnit: "m",
    units: [
      { key: "ft", label: "Feet (ft)", toBase: 0.3048 },
      { key: "m", label: "Meters (m)", toBase: 1 },
      { key: "in", label: "Inches (in)", toBase: 0.0254 },
      { key: "mi", label: "Miles (mi)", toBase: 1609.34 },
      { key: "km", label: "Kilometers (km)", toBase: 1000 },
    ],
  },
  {
    id: "permeability",
    label: "Permeability",
    baseUnit: "mD",
    units: [
      { key: "mD", label: "Millidarcy (mD)", toBase: 1 },
      { key: "D", label: "Darcy (D)", toBase: 1000 },
      { key: "um2", label: "Square micrometers (µm², SI permeability)", toBase: 1.01325 },
    ],
  },
  {
    id: "rate",
    label: "Production Rate",
    baseUnit: "m3/d",
    units: [
      { key: "bblpd", label: "Barrels per day (bbl/d)", toBase: 0.158987 },
      { key: "m3pd", label: "Cubic meters per day (m3/d)", toBase: 1 },
      { key: "scfpd", label: "Standard cubic feet per day (scf/d)", toBase: 0.0283168 },
    ],
  },
];

// API gravity vs specific gravity (SG) is a defined nonlinear relationship,
// not a constant factor, so it gets its own small converter instead of a
// row in UNIT_CONVERTER_CATEGORIES.
const API_GRAVITY_FORMULA = {
  label: "API Gravity ↔ Specific Gravity",
  note: "API = (141.5 / SG) - 131.5, and SG = 141.5 / (API + 131.5). Defined at 60°F (15.6°C).",
  apiToSg(apiGravity) {
    return 141.5 / (apiGravity + 131.5);
  },
  sgToApi(sg) {
    return 141.5 / sg - 131.5;
  },
};
