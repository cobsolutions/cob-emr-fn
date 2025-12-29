import { AdditionalComments } from "./AdditionalComments";
import { AlarLigamentStress } from "./AlarLigamentStress";
import { AlarLigamentTest } from "./AlarLigamentTest";
import { Flexibility } from "./Flexibility";
import { Functional } from "./Functional";
import { LigamentIntegrityKnee } from "./LigamentIntegrityKnee";
import { Patellofemoral } from "./Patellofemoral";
import { StorkStandSIMobilityTest } from "./StorkStandSIMobilityTest";
import { Structural } from "./Structural";
import { TMRFAB4Worksheet } from "./TMRFAB4Worksheet";
import { WorkConditioning } from "./WorkConditioning";

export interface SpecialTest {
  flexibility: Flexibility;
  structural: Structural;
  ligamentIntegrityKnee: LigamentIntegrityKnee;
  storkStandSIMobilityTest: StorkStandSIMobilityTest;
  patellofemoral: Patellofemoral;
  functional: Functional;
  alarLigamentTest: AlarLigamentTest;
  alarLigamentStress: AlarLigamentStress;
  workConditioning: WorkConditioning;
  tMRFAB4Worksheet: TMRFAB4Worksheet;
  additionalComments: AdditionalComments;
}
