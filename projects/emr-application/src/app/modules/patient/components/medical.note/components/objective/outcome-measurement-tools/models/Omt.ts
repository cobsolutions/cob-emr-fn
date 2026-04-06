import { Balance } from "./Balance";
import { CustomOutcomeMeasurement } from "./CustomOutcomeMeasurement";
import { DizzinessHandicapInventory } from "./DizzinessHandicapInventory";
import { GeneralFunction } from "./GeneralFunction";
import { Lymphedema } from "./Lymphedema";
import { Pelvic } from "./Pelvic";
import { LowerExtremity } from "./LowerExtremity";
import { Pain } from "./Pain";
import { Spine } from "./Spine";
import { UpperExtremity } from "./UpperExtremity";
import { Vestibular } from "./Vestibular";

export interface Omt {
  customOutcomeMeasurement: CustomOutcomeMeasurement;
  vestibular: Vestibular;
  upperExtremity: UpperExtremity;
  spine: Spine;
  lowerExtremity: LowerExtremity;
  balance: Balance;
  pain: Pain;
  dizzinessHandicapInventory: DizzinessHandicapInventory;
  lymphedema: Lymphedema;
  pelvic: Pelvic;
  generalFunction: GeneralFunction;
}
