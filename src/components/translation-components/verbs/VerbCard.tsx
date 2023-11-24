//import types
import type { VerbObject } from "@/types/translationTypes";

//props typing
interface Props {
  verb: VerbObject;
}

function VerbCard({ verb }: Props) {
  return (
    <div className="card w-full bg-base-100 shadow-xl px-4 py-4">
      <div className="card-body">
        <h2 className="card-title">{verb.infinitive}</h2>
      </div>

      {/* present conjugations */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Tense</th>
              <th>Yo</th>
              <th>Tú</th>
              <th>Él/Ella</th>
              <th>Nosotros</th>
              <th>Vosotros</th>
              <th>Ellos/Ellas</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Present</th>
              <td>{verb.conjugations.present.yo}</td>
              <td>{verb.conjugations.present.tu}</td>
              <td>{verb.conjugations.present.el}</td>
              <td>{verb.conjugations.present.nosotros}</td>
              <td>{verb.conjugations.present.vosotros}</td>
              <td>{verb.conjugations.present.ellos}</td>
            </tr>

            <tr>
              <th>Preterite</th>
              <td>{verb.conjugations.preterite.yo}</td>
              <td>{verb.conjugations.preterite.tu}</td>
              <td>{verb.conjugations.preterite.el}</td>
              <td>{verb.conjugations.preterite.nosotros}</td>
              <td>{verb.conjugations.preterite.vosotros}</td>
              <td>{verb.conjugations.preterite.ellos}</td>
            </tr>

            <tr>
              <th>Imperfect</th>
              <td>{verb.conjugations.imperfect.yo}</td>
              <td>{verb.conjugations.imperfect.tu}</td>
              <td>{verb.conjugations.imperfect.el}</td>
              <td>{verb.conjugations.imperfect.nosotros}</td>
              <td>{verb.conjugations.imperfect.vosotros}</td>
              <td>{verb.conjugations.imperfect.ellos}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VerbCard;
