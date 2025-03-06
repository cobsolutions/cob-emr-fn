import { FieldControlStyles } from "../../../../filed.control.style.selector/field.control.style";
import { GeneralHealthStyles } from "./general.health";
import { PreviousHistoryOfSimilarSymptomsStyles } from "./previous.history.of.similar.symptoms";

export var MedicalHistoryStyles: FieldControlStyles[] = [
    ...PreviousHistoryOfSimilarSymptomsStyles,
    ...GeneralHealthStyles
]