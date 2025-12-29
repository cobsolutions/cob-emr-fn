import { Balance } from "./Balance";
import { CustomOutcomeMeasurement } from "./CustomOutcomeMeasurement";
import { GeneralFunction } from "./GeneralFunction";
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
  generalFunction: GeneralFunction;
}
