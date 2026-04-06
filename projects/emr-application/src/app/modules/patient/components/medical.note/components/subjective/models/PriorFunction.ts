import { CarryingMovingHandlingObjects } from "./prior.function.models/carrying.moving.handling.objects/CarryingMovingHandlingObjects";
import { ChangingMaintainingBodyPosition } from "./prior.function.models/changing.maintaining.body.position/ChangingMaintainingBodyPosition";
import { MobilityWalkingMovingAround } from "./prior.function.models/mobility.walking.moving.around/MobilityWalkingMovingAround";
import { SelfCare } from "./prior.function.models/self.care/SelfCare";

export interface PriorFunction {
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
