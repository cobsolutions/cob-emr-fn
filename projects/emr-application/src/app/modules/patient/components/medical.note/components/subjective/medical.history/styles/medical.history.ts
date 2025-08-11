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
    ...PatientGoalsStyles,
    {
        "label_style": "white-space: nowrap; min-width: 500px;margin-top:5px",
        "name": "medicalHistoryMedicalHistory",
        "style": "width:700px"
    },
    {
        "label_style": "white-space: nowrap; min-width: 500px;margin-top:5px",
        "name": "complicatingPersonalFactorsMedicalHistory",
        "style": "width:900px"
    },
    {
        "label_style": "white-space: nowrap; min-width: 500px;margin-top:5px;margin-left:300px",
        "name": "medicalHistoryReviewMedicalHistory",
        "style": "width:700px;"
    },
    {
        "label_style": "white-space: nowrap; min-width: 500px;margin-top:5px;margin-left:300px",
        "name": "currentMedicationsMedicalHistory",
        "style": "width:700px;"
    },

]