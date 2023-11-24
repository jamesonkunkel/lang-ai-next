//import stores
import useTranslationStore from "@/stores/translationStore";

function Sentence() {
  // store selector
  const [translation, setTranslation] = useTranslationStore((state) => [
    state.translation,
    state.setTranslation,
  ]);

  return (
    <div className="card w-full bg-base-300 shadow-xl">
      <div className="card-body">
        <div className="card-actions justify-end">
          <button
            onClick={() => setTranslation(null)}
            className="btn btn-primary btn-sm"
          >
            Translate something else
          </button>
        </div>
        <p className="text-xl">English: {translation?.sentence}</p>
        <p className="text-xl">
          Translation: {translation?.translatedSentence}
        </p>
      </div>
    </div>
  );
}

export default Sentence;
