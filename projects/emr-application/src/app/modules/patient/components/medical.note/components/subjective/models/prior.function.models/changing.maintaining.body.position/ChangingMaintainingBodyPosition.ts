import { MaintainingABodyPosition } from "./MaintainingABodyPosition";
import { Transfers } from "./Transfers";
import { IADLs } from "./IADLs";

export interface ChangingMaintainingBodyPosition {
  //"prior-level-function_changing-maintaining-body-position_maintaining_body_position": false,
  maintainingABodyPosition: MaintainingABodyPosition;
  //"prior-level-function_changing-maintaining-body-position_transfers": false,
  transfers: Transfers;
  // "prior-level-function_changing-maintaining-body-position_body_position_iadls": false,
  iADLs: IADLs;
}
