import { CroftDisabilityQuestionnaire } from "./CroftDisabilityQuestionnaire";
import { McGillPainQuestionnaire } from "./McGillPainQuestionnaire";
import { PainDisabilityIndex } from "./PainDisabilityIndex";
import { TheFearAvoidanceBeliefsQuestionnaireFABQ } from "./TheFear-AvoidanceBeliefsQuestionnaireFABQ";
import { WongBakerFACESPainRatingScale } from "./WongBakerFACESPainRatingScale";

export interface Pain {
  pain: boolean;
  mcGillPainQuestionnaire: McGillPainQuestionnaire;
  wongBakerFACESPainRatingScale: WongBakerFACESPainRatingScale;
  painDisabilityIndex: PainDisabilityIndex;
  croftDisabilityQuestionnaire: CroftDisabilityQuestionnaire;
  theFearAvoidanceBeliefsQuestionnaireFABQ: TheFearAvoidanceBeliefsQuestionnaireFABQ;
}
