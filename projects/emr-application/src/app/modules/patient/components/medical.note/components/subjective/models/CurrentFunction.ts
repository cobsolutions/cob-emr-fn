import { CarryingMovingHandlingObjects } from "./prior.function.models/carrying.moving.handling.objects/CarryingMovingHandlingObjects";
import { ChangingMaintainingBodyPosition } from "./prior.function.models/changing.maintaining.body.position/ChangingMaintainingBodyPosition";
import { MobilityWalkingMovingAround } from "./prior.function.models/mobility.walking.moving.around/MobilityWalkingMovingAround";
import { SelfCare } from "./prior.function.models/self.care/SelfCare";


export interface CurrentFunction {
    selfCare?:SelfCare;
    mobilityWalkingMovingAround?:MobilityWalkingMovingAround;
    changingMaintainingBodyPosition?:ChangingMaintainingBodyPosition;
    carryingMovingHandlingObjects?:CarryingMovingHandlingObjects

    currentFunctionalLimitationsOther?: boolean;
    currentFunctionalLimitationsOtherText?: string;
    currentFunctionalLimitationsSelfCareComment?: string;
    currentFunctionalLimitationsMobilityWalkingMovingAroundComment?: string;
    currentFunctionalLimitationsChangingMaintainingBodyPositionComment?: string;
    currentFunctionalLimitationsCarryingMovingHandlingObjectsComment?: string;

    // Additional specialty fields
    currentFunctionalLimitationsLymphedema?: boolean;
    currentFunctionalLimitationsLymphedemaText?: string;
    currentFunctionalLimitationsWoundHealing?: boolean;
    currentFunctionalLimitationsWoundHealingText?: string;
    currentFunctionalLimitationsPelvicHealth?: boolean;
    currentFunctionalLimitationsPelvicHealthText?: string;
}
