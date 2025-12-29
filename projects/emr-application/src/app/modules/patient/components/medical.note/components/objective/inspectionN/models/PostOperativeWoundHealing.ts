import { ScarMobility } from "./ScarMobility";
import { SurgicalPrecautions } from "./SurgicalPrecautions";

export interface PostOperativeWoundHealing {
  incisionSites: string;
  woundDescription: boolean;
  woundDescriptionText: string;
  woundMeasurements: boolean;
  woundLength: string;
  woundWidth: string;
  surgicalPrecautions: SurgicalPrecautions;
  scarMobility: ScarMobility;
}
