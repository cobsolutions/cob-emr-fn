import { MaintainingABodyPosition } from "./MaintainingABodyPosition";
import { Transfers } from "./Transfers";
import { IADLs } from "./IADLs";

export interface ChangingMaintainingBodyPosition {
  // current_functional_limitations_changing-maintaining-body-position_maintaining_body_position
  maintainingABodyPositionFlag:boolean;
  maintainingABodyPosition: MaintainingABodyPosition;

  // current_functional_limitations_changing-maintaining-body-position_transfers
  transfersFlag:boolean;
  transfers: Transfers;

  // current_functional_limitations_changing-maintaining-body-position_body_position_iadls
  iADLsFlag:boolean;
  iADLs: IADLs;
}
