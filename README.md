# PetroLearn AI

A personal, offline-friendly static website for learning oil and gas and petroleum engineering: a roadmap with progress bar, a beginner/intermediate/advanced study path, 14 module cards (including Petroleum Economics, AI/Machine Learning in Oil and Gas, and a dedicated HSE module) with explanations, analogies, memory tricks, "Explain Like I'm New" framing, inline SVG diagrams/concept maps, a searchable glossary with key-term highlighting, a formula sheet, a full quiz bank plus beginner checkpoint quizzes, flashcards, a data lab, a software lab, a research library, a filterable sources page, a categorized oil and gas news links page, a **Career Prep** section (role profiles, a job-posting breakdown guide, certifications, a career roadmap by audience, and ranked companies/countries), and an **Interview Bank** with real interview-style questions (ideal answer, thinking approach, common mistakes, bookmarking, and an Interview Mode) -- all built on free and open-access references. Progress (completed roadmap stages, known flashcards, quiz scores, theme, news notes, interview bookmarks/answers, HSE checklist, career roles viewed) is saved locally with `localStorage` -- nothing is sent to a server.

## How to use

Open `index.html` directly in a browser (double-click it, or use a "Open with Live Server" extension). No build step, no backend, no install required. Use the search box in the top bar to look across modules, glossary, formulas, and sources at once. On the Quiz page, toggle between "Full Quiz" and "Beginner Checkpoint" to switch question sets.

## Why data files are `.js`, not `.json`

The original task brief asked for data in JSON files. In practice, browsers block `fetch()` of local files opened via `file://` (CORS), so a pure-JSON + `fetch()` approach would break the "just open index.html" requirement. Instead, each file in `data/` defines a plain JavaScript `const` (e.g. `MODULES_DATA`, `GLOSSARY_DATA`) and is loaded with a `<script>` tag in `index.html`. The structure is otherwise identical to what JSON would look like, and each file can still be edited like a small database -- this just keeps everything working offline with zero setup.

## Project structure

```
petrolearn-ai/
  index.html            All page sections (single-page app, no router lib)
  css/styles.css         Theme variables (light/dark), hero, callouts, analogy/memory-trick/
                         ELI-new boxes, key-term chips, filter chips, progress bars,
                         chart cards, news cards, layout and components
  js/
    app.js               Navigation, theme toggle, global search, formulas/sources/research/
                         study-path/software-lab/news-links/progress rendering
    modules.js           Module cards (with difficulty filter + category icons), roadmap
                         timeline (with progress bar), expanded module detail + Ask AI prompt
    glossary.js          Searchable glossary rendering
    quiz.js              Quiz engine (full quiz + beginner checkpoint mode, scoring, review)
    flashcards.js        Flashcard flip/next/prev/mark known-review
    progress.js          localStorage read/write helpers
    terms.js             highlightTerms() -- wraps glossary terms in styled,
                         tooltip-bearing <span class="term"> chips
    charts.js            Dependency-free inline-SVG chart/diagram/concept-map components
  data/
    modules.js, roadmap.js, glossary.js, quizzes.js, flashcards.js,
    formulas.js, sources.js, studypath.js, news.js, career.js,
    interview.js, hse.js   Content data (see note above)
  assets/icons/, assets/images/   Empty, ready for future icons/images
```

`js/career.js` renders the Career Prep section (role cards, job posting breakdown,
certifications, career roadmap tabs, ranked companies/countries tables) and also
exposes `renderCareerPathsRow()`, used by the home page's "Choose Your Path" row.
`js/interview.js` renders the Interview Bank (Browse and Interview Mode, category/
difficulty/bookmark filters). `js/hse.js` renders the dedicated HSE page (reuses the
`hse-oil-gas` entry in `MODULES_DATA` for its explanation content, plus case studies
and a pre-site checklist from `data/hse.js`).

## Adding new content

- **New module**: add an object to `data/modules.js` (include `difficulty`, `simpleExplanation`, `technicalExplanation`, `whyItMatters`, `commonMistakes[]`, `miniExample`, `analogy`, `memoryTrick`, `explainLikeNew`, and optionally `charts` -- an array of keys from `CHART_RENDERERS` in `js/charts.js`). It appears automatically in the Modules grid and difficulty filter.
- **New roadmap stage**: add an object to `data/roadmap.js`.
- **New study path step**: add an entry to the relevant level array in `data/studypath.js`.
- **New glossary term**: add an object to `data/glossary.js`. A matching flashcard is generated automatically (see `data/flashcards.js`), and the term is automatically highlighted wherever it appears in module text (see `js/terms.js`).
- **New quiz question**: add an object to `data/quizzes.js` with a `moduleId` matching an existing module. Add `checkpoint: true` to make it part of that module's Beginner Checkpoint set instead of the full quiz.
- **New formula**: add an object to `data/formulas.js`.
- **New chart/diagram/concept map**: add a render function to `CHART_RENDERERS` in `js/charts.js`, then reference its key from a module's `charts` array.
- **New source / research entry**: add an object to the `SOURCES_DATA` array in `data/sources.js` (include `group`, `type`, `level`, `topics[]`, `why`, `suggestedModule`); it is automatically picked up by the Sources page filters and, where the `type` matches, the Research Library grouping.
- **New news link**: add an object to `NEWS_DATA` in `data/news.js` with a `category` matching one of `NEWS_CATEGORIES`.
- **New career role**: add an object to `CAREER_ROLES_DATA` in `data/career.js`. It appears automatically in the Career Prep role grid.
- **New interview question**: add an object to `INTERVIEW_QUESTIONS_DATA` in `data/interview.js` with a `category` matching one of `INTERVIEW_CATEGORIES`. It appears automatically in both Browse and Interview Mode.
- **New HSE case study or checklist item**: add an object to `HSE_CASE_STUDIES_DATA` or a string to `HSE_CHECKLIST_DATA` in `data/hse.js`.

## Content and copyright notes

All summaries, explanations, analogies, memory tricks, callouts, and examples are original text written for this learning project, not copied from the referenced sources. `data/sources.js`, `data/news.js`, and the Research Library are built only from free or openly accessible material; paywalled or copyrighted material is never a required source, and news pages are link cards only (no scraped article text) with a note that links should be checked directly for the latest updates. Source links are kept visible throughout the site (module detail view, Glossary, Research Library, Sources page, and News page) so the original material can always be consulted.

## Known limitations

- Data Lab and the chart components use illustrative sample data (clearly labeled in each chart's caption), not measured Volve field data or real project economics -- CSV upload and real charting from user data is a planned future step.
- Full quiz bank covers 10 of the 13 modules; Beginner Checkpoint quizzes (5 multiple choice + 1 analogy-based + 1 common-mistake question) cover 9 modules named in the content-expansion brief. The Data Lab module has no quiz since it is meant as a hands-on lab, not a graded module.
- Ask AI Prompt Helper only generates a copyable text prompt; it does not call any AI API.
- Global search does basic substring matching across modules/glossary/formulas/sources -- no fuzzy matching or ranking.
- News links page has no live feed or scraping -- it is a curated, manually maintained set of link cards, by design (per the "do not scrape" rule).
- Visual design upgrades in this pass were scoped to: analogy/memory-trick/ELI-new boxes, progress bars, and emoji category icons -- a full icon-system or layout redesign was intentionally not attempted.
- Career Prep's `COMPANIES_DATA` and `COUNTRIES_DATA` rankings are illustrative and point-in-time, not a live feed -- figures shift year to year, so check [EIA](https://www.eia.gov/) or [OPEC](https://www.opec.org/) for current numbers before relying on them.
- Interview Bank "ideal answers" are guidance written for this learning project to model good reasoning, not a guarantee of what any specific employer or interviewer expects -- use them to practice structuring an answer, not to memorize verbatim.
- The site now loads "Space Grotesk" and "Inter" from Google Fonts via a `<link>` tag for the redesigned typography; this degrades gracefully to the existing system-font stack if there's no internet connection, so the "just open index.html" offline promise still holds.
