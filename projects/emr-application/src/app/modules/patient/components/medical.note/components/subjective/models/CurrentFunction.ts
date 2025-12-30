import { CarryingMovingHandlingObjects } from "./current.function.models/carrying.moving.handling.objects/CarryingMovingHandlingObjects";
import { ChangingMaintainingBodyPosition } from "./current.function.models/changing.maintaining.body.position/ChangingMaintainingBodyPosition";
import { MobilityWalkingMovingAround } from "./current.function.models/mobility.walking.moving.around/MobilityWalkingMovingAround";
import { SelfCare } from "./current.function.models/self.care/SelfCare";

export interface CurrentFunction {
    selfCare?:SelfCare;
    mobilityWalkingMovingAround?:MobilityWalkingMovingAround;
    changingMaintainingBodyPosition?:ChangingMaintainingBodyPosition;
    carryingMovingHandlingObjects?:CarryingMovingHandlingObjects

    priorLevelFunctionOther?: boolean;
    priorLevelFunctionOtherText?: string;
    priorLevelFunctionSelfCareComment?: string;
    priorLevelFunctionMobilityWalkingMovingAroundComment?: string;
    priorLevelFunctionChangingMaintainingBodyPositionComment?: string;
    priorLevelFunctionCarryingMovingHandlingObjectsComment?: string;
}
