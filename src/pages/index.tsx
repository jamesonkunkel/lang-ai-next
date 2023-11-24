//import stores
import useTranslationStore from "@/stores/translationStore";

//import components
import PromptBox from "@/components/prompt-box/PromptBox";
import Nouns from "@/components/translation-components/nouns/Nouns";
import Sentence from "@/components/translation-components/sentence/Sentence";
import Verbs from "@/components/translation-components/verbs/Verbs";

export default function Home() {
  const [translation, translationIsLoading] = useTranslationStore((state) => [
    state.translation,
    state.translationIsLoading,
  ]);

  return (
    <div className="w-full h-full px-4 py-4 flex flex-col space-y-4 bg-neutral">
      {!translationIsLoading && !translation && <PromptBox />}

      {translationIsLoading && (
        <span className="loading loading-dots loading-lg"></span>
      )}

      {translation && (
        <>
          <Sentence />
          <Nouns />
          <Verbs />
        </>
      )}
    </div>
  );
}
