import { FieldControlStyles } from "../../../../filed.control.style.selector/field.control.style";
import { DiagnosticTestingImagingStyles } from "./diagnostic.testing.imaging";
import { GeneralHealthStyles } from "./general.health";
import { HomeHealthCareStyles } from "./home.health.care";
import { MentalStatusCognitiveFunctionAppearsImpairedStyles } from "./mental.status.cognitive.function.appears.impaired";
import { OccupationSocialHistoryStyles } from "./occupation.social.history";
import { PatientGoalsStyles } from "./patient.goals";
import { PreviousHistoryOfSimilarSymptomsStyles } from "./previous.history.of.similar.symptoms";
import { UnexplainedWeightLossStyles } from "./unexplained.weight.loss";
import { HistoryOfFallsStyles } from "./اistory.of.falls";

export var MedicalHistoryStyles: FieldControlStyles[] = [
    ...PreviousHistoryOfSimilarSymptomsStyles,
    ...GeneralHealthStyles,
    ...OccupationSocialHistoryStyles,
    ...HomeHealthCareStyles,
    ...HistoryOfFallsStyles,
    ...DiagnosticTestingImagingStyles,
    ...MentalStatusCognitiveFunctionAppearsImpairedStyles,
    ...UnexplainedWeightLossStyles,
    ...PatientGoalsStyles
]