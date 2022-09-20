const tsquerySpecialChars = /[()|&:*!]/g;

const getQueryFromSearchPhrase = (searchPhrase: string) =>
  searchPhrase.replace(tsquerySpecialChars, " ").trim().split(/\s+/).join(" | ");

export { getQueryFromSearchPhrase };
