// News link data for PetroLearn AI's "Oil and Gas News Links" page.
// These are link cards only -- no scraped articles, no live feeds.
// "lastChecked" is a static placeholder, not a live timestamp: always open
// the link directly for the actual latest update.

const NEWS_DATA = [
  // --- Global energy news ---
  { title: "Reuters Energy", url: "https://www.reuters.com/business/energy/", category: "Global energy news", description: "Global energy news covering oil and gas companies, markets, and policy." },
  { title: "EIA Today in Energy", url: "https://www.eia.gov/todayinenergy/", category: "Global energy news", description: "Short daily public analysis on energy statistics across oil, gas, and electricity." },

  // --- Global upstream news ---
  { title: "World Oil News", url: "https://www.worldoil.com/news", category: "Global upstream news", description: "Upstream oil and gas news: drilling, exploration, production, offshore, technology." },
  { title: "Rigzone News", url: "https://www.rigzone.com/news/", category: "Global upstream news", description: "Upstream industry news, including offshore, drilling, markets, and jobs." },

  // --- Oil price and market news ---
  { title: "Oilprice.com", url: "https://oilprice.com/", category: "Oil price and market news", description: "Oil prices, energy markets, and geopolitics commentary." },
  { title: "World Bank Commodity Markets", url: "https://www.worldbank.org/en/research/commodity-markets", category: "Oil price and market news", description: "Public data and outlook on oil and gas commodity prices." },

  // --- Natural gas and LNG news ---
  { title: "LNG Prime", url: "https://lngprime.com/", category: "Natural gas and LNG news", description: "LNG markets, shipping, and project news." },
  { title: "Natural Gas Intelligence", url: "https://www.naturalgasintel.com/", category: "Natural gas and LNG news", description: "Natural gas market analysis, LNG, and North America gas prices." },

  // --- Offshore oil and gas news ---
  { title: "Offshore Energy", url: "https://www.offshore-energy.biz/", category: "Offshore oil and gas news", description: "Offshore energy news spanning oil and gas, LNG, and renewables." },
  { title: "Offshore Technology", url: "https://www.offshore-technology.com/", category: "Offshore oil and gas news", description: "Offshore field developments, technology, and company news." },

  // --- Energy transition and emissions ---
  { title: "IEA News", url: "https://www.iea.org/news", category: "Energy transition and emissions", description: "Public news and analysis on energy security, oil, gas, and the energy transition." },

  // --- Indonesia oil and gas news ---
  { title: "SKK Migas News", url: "https://www.skkmigas.go.id/", category: "Indonesia oil and gas news", description: "Official Indonesian upstream oil and gas institution: lifting, projects, regulation." },
  { title: "Katadata Energi", url: "https://katadata.co.id/energi", category: "Indonesia oil and gas news", description: "Indonesian energy business news and analysis." },
  { title: "CNBC Indonesia Energy", url: "https://www.cnbcindonesia.com/tag/energi", category: "Indonesia oil and gas news", description: "Indonesian business news on energy markets, companies, and prices." },
  { title: "Bisnis Indonesia Energi", url: "https://ekonomi.bisnis.com/energi", category: "Indonesia oil and gas news", description: "Indonesian business news on the energy sector, oil, gas, and mining." },

  // --- Indonesia energy policy news ---
  { title: "Kementerian ESDM", url: "https://www.esdm.go.id/", category: "Indonesia energy policy news", description: "Official Indonesian energy ministry: policy on oil, gas, electricity, and minerals." },
  { title: "Migas ESDM", url: "https://migas.esdm.go.id/", category: "Indonesia energy policy news", description: "Official Indonesian oil and gas directorate: regulation, downstream and upstream policy." },

  // --- AI and technology in oil and gas ---
  { title: "arXiv (oil and gas AI search)", url: "https://arxiv.org/", category: "AI and technology in oil and gas", description: "Not a news outlet -- a preprint repository where new AI/ML-for-petroleum research appears continuously. Search for recent papers as a research-news feed." },
  { title: "OGNet Project Page", url: "http://stanfordmlgroup.github.io/projects/ognet", category: "AI and technology in oil and gas", description: "Deep learning for oil and gas infrastructure detection from satellite imagery, used for methane emission monitoring." },

  // --- Public data and market reports ---
  { title: "EIA: Petroleum and Other Liquids", url: "https://www.eia.gov/petroleum/", category: "Public data and market reports", description: "Public oil price, supply, demand, and inventory data and analysis." },
  { title: "EIA: Natural Gas Data", url: "https://www.eia.gov/naturalgas/", category: "Public data and market reports", description: "Public natural gas price, production, storage, and consumption data." },
  { title: "OPEC Monthly Oil Market Report", url: "https://www.opec.org/opec_web/en/publications/338.htm", category: "Public data and market reports", description: "OPEC's monthly analysis of oil supply, demand, and prices." },
  { title: "IEA Oil Market Report", url: "https://www.iea.org/reports/oil-market-report", category: "Public data and market reports", description: "IEA analysis of oil supply, demand, inventories, and forecasts." },
  { title: "IEA Gas Market Report", url: "https://www.iea.org/reports/gas-market-report-q1-2026", category: "Public data and market reports", description: "IEA analysis of gas markets, LNG, supply, demand, and prices." },
];

const NEWS_CATEGORIES = [
  "Global energy news",
  "Global upstream news",
  "Oil price and market news",
  "Natural gas and LNG news",
  "Offshore oil and gas news",
  "Energy transition and emissions",
  "Indonesia oil and gas news",
  "Indonesia energy policy news",
  "AI and technology in oil and gas",
  "Public data and market reports",
];
