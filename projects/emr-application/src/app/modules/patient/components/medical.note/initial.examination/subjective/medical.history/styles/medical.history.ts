import { FieldControlStyles } from "../../../../filed.control.style.selector/field.control.style";
import { GeneralHealthStyles } from "./general.health";
import { HomeHealthCareStyles } from "./home.health.care";
import { OccupationSocialHistoryStyles } from "./occupation.social.history";
import { PreviousHistoryOfSimilarSymptomsStyles } from "./previous.history.of.similar.symptoms";
import { HistoryOfFallsStyles } from "./اistory.of.falls";

export var MedicalHistoryStyles: FieldControlStyles[] = [
    ...PreviousHistoryOfSimilarSymptomsStyles,
    ...GeneralHealthStyles,
    ...OccupationSocialHistoryStyles,
    ...HomeHealthCareStyles,
    ...HistoryOfFallsStyles
]