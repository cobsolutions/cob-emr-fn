import { ScarType } from "./scar.type";
import { ScarMobility } from "./ScarMobility";
import { SurgicalPrecautions } from "./SurgicalPrecautions";

export interface PostOperativeWoundHealing {
  incisionSites: string;
  incisionSitesCustomText: string;
  woundDescription: boolean;
  woundDescriptionText: string;
  woundMeasurements: boolean;
  woundLength: string;
  woundWidth: string;
  surgicalPrecautions: SurgicalPrecautions;
  scarType: ScarType;
  scarMobility: ScarMobility;
}
