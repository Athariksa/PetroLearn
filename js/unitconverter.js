// unitconverter.js
// Renders the Unit Converter: a category picker, two unit dropdowns, and a
// live-updating result, plus a separate API gravity <-> specific gravity
// converter since that relationship isn't a linear factor.

let unitConverterCategoryId = UNIT_CONVERTER_CATEGORIES[0].id;

function getUnitConverterCategory(id) {
  return UNIT_CONVERTER_CATEGORIES.find((c) => c.id === id);
}

function convertUnitValue(category, value, fromKey, toKey) {
  const fromUnit = category.units.find((u) => u.key === fromKey);
  const toUnit = category.units.find((u) => u.key === toKey);
  if (!fromUnit || !toUnit || Number.isNaN(value)) return null;
  const baseValue = value * fromUnit.toBase;
  return baseValue / toUnit.toBase;
}

function renderUnitConverter() {
  const container = document.getElementById("unit-converter");
  if (!container) return;
  const category = getUnitConverterCategory(unitConverterCategoryId);

  container.innerHTML = `
    <div class="card">
      <h3>Unit Converter</h3>
      <p class="section-subtitle">Common field-unit conversions used across petroleum engineering.</p>
      <div id="unit-converter-tabs" class="filter-bar">
        ${UNIT_CONVERTER_CATEGORIES.map(
          (c) => `<button class="filter-chip${c.id === unitConverterCategoryId ? " active" : ""}" data-unit-category="${c.id}">${c.label}</button>`
        ).join("")}
      </div>
      <div class="unit-converter-form">
        <input type="number" id="unit-converter-value" class="search-bar" value="1" />
        <select id="unit-converter-from" class="search-bar">
          ${category.units.map((u) => `<option value="${u.key}">${u.label}</option>`).join("")}
        </select>
        <span>=</span>
        <select id="unit-converter-to" class="search-bar">
          ${category.units.map((u, i) => `<option value="${u.key}"${i === 1 ? " selected" : ""}>${u.label}</option>`).join("")}
        </select>
      </div>
      <p id="unit-converter-result" class="quiz-score"></p>
    </div>

    <div class="card">
      <h3>${API_GRAVITY_FORMULA.label}</h3>
      <p class="glossary-meta">${API_GRAVITY_FORMULA.note}</p>
      <div class="unit-converter-form">
        <label>API gravity: <input type="number" id="api-gravity-input" class="search-bar" value="30" /></label>
        <span>↔</span>
        <label>Specific gravity: <input type="number" id="sg-input" class="search-bar" step="0.001" /></label>
      </div>
      <p id="api-gravity-result" class="glossary-meta"></p>
    </div>
  `;

  container.querySelectorAll("[data-unit-category]").forEach((btn) => {
    btn.addEventListener("click", () => {
      unitConverterCategoryId = btn.dataset.unitCategory;
      renderUnitConverter();
    });
  });

  const valueInput = document.getElementById("unit-converter-value");
  const fromSelect = document.getElementById("unit-converter-from");
  const toSelect = document.getElementById("unit-converter-to");
  const updateResult = () => {
    const value = parseFloat(valueInput.value);
    const result = convertUnitValue(category, value, fromSelect.value, toSelect.value);
    document.getElementById("unit-converter-result").textContent =
      result === null ? "Enter a valid number." : `${value} ${fromSelect.value} = ${result.toFixed(5)} ${toSelect.value}`;
  };
  [valueInput, fromSelect, toSelect].forEach((el) => el.addEventListener("input", updateResult));
  updateResult();

  const apiInput = document.getElementById("api-gravity-input");
  const sgInput = document.getElementById("sg-input");
  const apiResult = document.getElementById("api-gravity-result");
  const syncFromApi = () => {
    const api = parseFloat(apiInput.value);
    if (Number.isNaN(api)) return;
    const sg = API_GRAVITY_FORMULA.apiToSg(api);
    sgInput.value = sg.toFixed(4);
    apiResult.textContent = `${api}° API ≈ ${sg.toFixed(4)} specific gravity.`;
  };
  const syncFromSg = () => {
    const sg = parseFloat(sgInput.value);
    if (Number.isNaN(sg) || sg <= 0) return;
    const api = API_GRAVITY_FORMULA.sgToApi(sg);
    apiInput.value = api.toFixed(2);
    apiResult.textContent = `${sg} specific gravity ≈ ${api.toFixed(2)}° API.`;
  };
  apiInput.addEventListener("input", syncFromApi);
  sgInput.addEventListener("input", syncFromSg);
  syncFromApi();
}
