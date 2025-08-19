import { FieldControlStyles } from "../../../../filed.control.style.selector/field.control.style";
import { CarryingMovingANDHandlingObjectsStyles } from "./carrying.moving.handling.objects";
import { ChangingMaintainingBodyPositionStyles } from "./changing.maintaining.body.position";
import { MobilityWalkingMovingAroundStyles } from "./mobility.walking.moving.around";
import { OtherStyles } from "./other";
import { SelfCareStyles } from "./self.care.styles";


export var CurrentFunctionStyles: FieldControlStyles[] = [
    ...SelfCareStyles,
    ...MobilityWalkingMovingAroundStyles,
    ...ChangingMaintainingBodyPositionStyles,
    ...CarryingMovingANDHandlingObjectsStyles,
    ...OtherStyles,
    {
        name: "functionaldeficitsgains",
        style: "max-width: 690px;height:171px",
        label_style: "white-space: nowrap; width: 3000px;"
    }
]
