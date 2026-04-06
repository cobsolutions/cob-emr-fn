import { DASHDisabilitiesofArmShouldeHand } from "./DASHDisabilitiesofArmShouldeHand";
import { HandProfile } from "./HandProfile";
import { ShoulderPainandDisabilityIndex } from "./ShoulderPainandDisabilityIndex";
import { UpperExtremityFunctionalIndex } from "./UpperExtremityFunctionalIndex";

export interface UpperExtremity {
  upperExtremity: boolean;
  shoulderPainandDisabilityIndex: ShoulderPainandDisabilityIndex;
  upperExtremityFunctionalIndex: UpperExtremityFunctionalIndex;
  dASHDisabilitiesofArmShouldeHand: DASHDisabilitiesofArmShouldeHand;
  handProfile: HandProfile;
}
