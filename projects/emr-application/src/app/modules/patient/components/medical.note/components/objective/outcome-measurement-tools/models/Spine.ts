import { ModifiedOswestryLowBackPain } from "./ModifiedOswestryLowBackPain";
import { NeckDisabilityIndexQuestionnaire } from "./NeckDisabilityIndexQuestionnaire";
import { OswestryLowBackPain } from "./OswestryLowBackPain";
import { TheQuebecBackPainDisabilityScale } from "./TheQuebecBackPainDisabilityScale";

export interface Spine {
  spine: boolean;
  neckDisabilityIndexQuestionnaire: NeckDisabilityIndexQuestionnaire;
  oswestryLowBackPain: OswestryLowBackPain;
  modifiedOswestryLowBackPain: ModifiedOswestryLowBackPain;
  theQuebecBackPainDisabilityScale: TheQuebecBackPainDisabilityScale;
}
