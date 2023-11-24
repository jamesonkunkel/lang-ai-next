import { NounObject } from "@/types/translationTypes";

//props typing
interface Props {
  noun: NounObject;
}

function NounCard({ noun }: Props) {
  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{noun.noun}</h2>
        <p>Translation: {noun.translation}</p>
      </div>
    </div>
  );
}

export default NounCard;
