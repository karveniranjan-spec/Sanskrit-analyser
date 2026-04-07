export interface WordAnalysis {
  word: string;
  transliteration: string;
  meaning: string;
}

export interface VedicData {
  verseId: string;
  mantraDevanagari: string;
  mantraTransliteration: string;
  literalTranslation: string;
  philosophicalTranslation: string;
  padapathaDevanagari: string;
  padapathaTransliteration: string;
  wordAnalysis: WordAnalysis[];
  imagePrompt: string;
  notebookLmInput: string;
}
