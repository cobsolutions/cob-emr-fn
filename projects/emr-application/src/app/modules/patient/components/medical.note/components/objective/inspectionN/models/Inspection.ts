import { AdditionalComments } from "./AdditionalComments";
import { BodyMassIndex } from "./BodyMassIndex";
import { Chaperone } from "./Chaperone";
import { GirthMeasurementLower } from "./GirthMeasurementLower";
import { GirthMeasurementUpper } from "./GirthMeasurementUpper";
import { PatientConsent } from "./PatientConsent";
import { PostOperativeWoundHealing } from "./PostOperativeWoundHealing";
import { SurgicalScarring } from "./SurgicalScarring";
import { WoundCare } from "./WoundCare";

export interface Inspection {
  inspection: string;
  patientConsent: PatientConsent;
  chaperone: Chaperone;
  girthMeasurementUpper: GirthMeasurementUpper;
  girthMeasurementLower: GirthMeasurementLower;
  postOperativeWoundHealing: PostOperativeWoundHealing;
  woundCare: WoundCare;
  surgicalScarring: SurgicalScarring;
  bodyMassIndex: BodyMassIndex;
  additionalComments: AdditionalComments;
}
