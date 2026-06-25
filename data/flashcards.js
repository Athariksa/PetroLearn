// Flashcards for PetroLearn AI, generated from glossary terms.
// "front" is the term, "back" is the simple definition (technical definition
// is shown as a secondary hint inside the flashcard UI).

const FLASHCARDS_DATA = GLOSSARY_DATA.map((entry, index) => ({
  id: "fc-" + index,
  category: entry.category,
  front: entry.term,
  back: entry.simpleDefinition,
  technicalHint: entry.technicalDefinition,
}));
