//import react hooks
import { useState } from "react";

//import stores
import useTranslationStore from "@/stores/translationStore";

//import components
import NounCard from "./NounCard";
import ChevronUp from "@/assets/ChevronUp";
import ChevronDown from "@/assets/ChevronDown";

function Nouns() {
  // store selector
  const [translation] = useTranslationStore((state) => [state.translation]);

  //component state
  const [isOpen, setIsOpen] = useState<boolean>(true);

  if (!translation?.nouns) return null;

  return (
    <div className="flex flex-col space-y-4">
      <button onClick={() => setIsOpen(!isOpen)} className="flex space-x-4">
        {isOpen ? <ChevronUp /> : <ChevronDown />}

        <h3 className="text-lg">Nouns:</h3>
      </button>

      {isOpen && (
        <div className="grid grid-cols-3 gap-4">
          {translation.nouns.map((noun) => (
            <NounCard noun={noun} key={noun.noun} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Nouns;
