//import state
import { useState } from "react";

//import axios
import axios from "axios";

//import types
import type { TranslationResponseObject } from "@/types/translationTypes";

//import stores
import useTranslationStore from "@/stores/translationStore";

// create an axios get request to the api
const getTranslation = async (prompt: string) => {
  const response = await axios.post<TranslationResponseObject>(
    "/api/translator",
    { prompt: prompt }
  );
  return response.data;
};

function PromptBox() {
  //store selector
  const [setTranslation, setTranslationIsLoading] = useTranslationStore(
    (state) => [state.setTranslation, state.setTranslationIsLoading]
  );

  //component state
  const [prompt, setPrompt] = useState<string>("");

  const handleSubmit = async () => {
    if (prompt === "") return;

    setTranslationIsLoading(true);
    const response = await getTranslation(prompt);
    setTranslationIsLoading(false);

    if (response.success) {
      setTranslation(response.translation);
    }
  };

  return (
    <div className="w-full flex flex-col space-y-4">
      <h3 className="text-xl font-semibold">
        Enter English text to translate it to Spanish:
      </h3>
      <div className="flex space-x-4">
        <textarea
          className="textarea textarea-accent textarea-lg w-full"
          placeholder="type here"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button onClick={handleSubmit} className="btn btn-success">
          Translate
        </button>
      </div>
    </div>
  );
}

export default PromptBox;
