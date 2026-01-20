import { FaamSports } from "./FaamSports";
import { Hoos } from "./Hoos";
import { Koos } from "./Koos";
import { LowerExtremityFunctionalScale } from "./LowerExtremityFunctionalScale";

export interface LowerExtremity {
  lowerExtremity: boolean;
  lowerExtremityFunctionalScale: LowerExtremityFunctionalScale;
  faamSports: FaamSports;
  hoos: Hoos;
  koos: Koos;
}
