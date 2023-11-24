//import zustand
import { create } from "zustand";

//import types
import type { TranslationObject } from "@/types/translationTypes";

interface TranslationStore {
  translation: TranslationObject | null;
  setTranslation: (translation: TranslationObject | null) => void;

  translationIsLoading: boolean;
  setTranslationIsLoading: (isLoading: boolean) => void;
}

const useTranslationStore = create<TranslationStore>()((set) => ({
  translation: null,
  setTranslation(translation) {
    set({ translation });
  },

  translationIsLoading: false,
  setTranslationIsLoading(isLoading) {
    set({ translationIsLoading: isLoading });
  },
}));

export default useTranslationStore;
