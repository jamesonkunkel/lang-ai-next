export interface NounObject {
  noun: string;
  translation: string;
}
export interface ConjugationPronounsObject {
  yo: string;
  tu: string;
  el: string;
  nosotros: string;
  vosotros: string;
  ellos: string;
}

export interface VerbConjugationsObject {
  present: ConjugationPronounsObject;
  preterite: ConjugationPronounsObject;
  imperfect: ConjugationPronounsObject;
}

export interface VerbObject {
  infinitive: string;
  translation: string;
  conjugations: VerbConjugationsObject;
}

export interface TranslationObject {
  sentence: string;
  translatedSentence: string;
  nouns: NounObject[];
  verbs: VerbObject[];
}

export interface TranslationResponseObject {
  success: boolean;
  translation: TranslationObject | null;
}
