//import zustand
import { create } from "zustand";

//import types
import type { TranslationObject } from "@/types/translationTypes";

interface TranslationStore {
  translation: TranslationObject | null;
  setTranslation: (translation: TranslationObject) => void;
}

const useTranslationStore = create<TranslationStore>()((set) => ({
  translation: null,
  setTranslation(translation) {
    set({ translation });
  },
}));

export default useTranslationStore;
