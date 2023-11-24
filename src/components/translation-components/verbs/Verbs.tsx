//import react hooks
import { useState } from "react";

//import stores
import useTranslationStore from "@/stores/translationStore";

//import assets
import ChevronUp from "@/assets/ChevronUp";
import ChevronDown from "@/assets/ChevronDown";
import VerbCard from "./VerbCard";

function Verbs() {
  // store selector
  const [translation] = useTranslationStore((state) => [state.translation]);

  //component state
  const [isOpen, setIsOpen] = useState<boolean>(true);

  if (!translation?.verbs) return null;

  return (
    <div className="flex flex-col space-y-4">
      <button onClick={() => setIsOpen(!isOpen)} className="flex space-x-4">
        {isOpen ? <ChevronUp /> : <ChevronDown />}

        <h3 className="text-lg">Verbs:</h3>
      </button>

      {isOpen && (
        <div className="flex flex-col space-y-4">
          {translation.verbs.map((verb) => (
            <VerbCard verb={verb} key={verb.infinitive} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Verbs;
