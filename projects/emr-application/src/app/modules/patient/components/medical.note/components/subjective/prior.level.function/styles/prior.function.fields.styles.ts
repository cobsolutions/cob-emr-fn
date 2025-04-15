import { FieldControlStyles } from "../../../../filed.control.style.selector/field.control.style";
import { CarryingMovingANDHandlingObjectsStyles } from "./carrying.moving.handling.objects";
import { ChangingMaintainingBodyPositionStyles } from "./changing.maintaining.body.position";
import { MobilityWalkingMovingAroundStyles } from "./mobility.walking.moving.around";
import { OtherStyles } from "./other";
import { SelfCareStyles } from "./self.care.styles";

export var PriorFunctionStyles: FieldControlStyles[] = [
    ...SelfCareStyles,
    ...MobilityWalkingMovingAroundStyles,
    ...ChangingMaintainingBodyPositionStyles,
    ...CarryingMovingANDHandlingObjectsStyles,
    ...OtherStyles
]
