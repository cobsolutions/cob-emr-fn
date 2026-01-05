import { MaintainingABodyPosition } from "./MaintainingABodyPosition";
import { Transfers } from "./Transfers";
import { IADLs } from "./IADLs";

export interface ChangingMaintainingBodyPosition {
  //"prior-level-function_changing-maintaining-body-position"
  changingMaintainingBodyPositionFlag?: boolean;
  maintainingABodyPosition: MaintainingABodyPosition;
  transfers: Transfers;
  iadls: IADLs;
}
