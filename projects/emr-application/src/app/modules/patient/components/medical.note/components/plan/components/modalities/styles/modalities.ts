import { FieldControlStyles } from "../../../../../filed.control.style.selector/field.control.style";
import { BiofeedbackTrainingStyles } from "./biofeedback-training";
import { CryotherapyStyles } from "./cryotherapy";
import { DiathermyStyles } from "./diathermy";
import { ElectricalStimulationStyles } from "./electrical-stimulation";
import { HotPacksStyles } from "./hot-packs";
import { InfraredLightStyles } from "./infrared-light";
import { LaserStyles } from "./laser";
import { MechanicalTractionStyles } from "./mechanical-traction";
import { ParaffinBathStyles } from "./paraffin-bath";
import { UltrasoundPhonophoresisStyles } from "./ultrasoundphonophoresis";
import { UltravioletStyles } from "./ultraviolet";
import { VasopneumaticStyles } from "./vasopneumatic";
import { WhirlpoolStyles } from "./whirlpool";

export const ModalitiesStyles: FieldControlStyles[] = [
    {
        "label_style": "white-space: nowrap;",
        "name": "87_painRelief",
        "style": "margin-left: 10px;"
    },
    {
        "label_style": "white-space: nowrap;",
        "name": "88_decreaseInflammation",
        "style": "margin-left: 10px;"
    },
    {
        "label_style": "white-space: nowrap;",
        "name": "89_increaseBloodFlow",
        "style": "margin-left: 10px;"
    },
    {
        "label_style": "white-space: nowrap;",
        "name": "90_improveTissueHealing",
        "style": "margin-left: 10px;"
    },
    ...ElectricalStimulationStyles,
    ...UltrasoundPhonophoresisStyles,
    ...LaserStyles,
    ...InfraredLightStyles,
    ...DiathermyStyles,
    ...UltravioletStyles,
    ...VasopneumaticStyles,
    ...BiofeedbackTrainingStyles,
    ...WhirlpoolStyles,
    ...ParaffinBathStyles,
    ...CryotherapyStyles,
    ...HotPacksStyles,
    ...MechanicalTractionStyles
]