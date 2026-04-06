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
        "label_style": "white-space: nowrap;margin-left: 145px;",
        "name": "medicalHistoryMedicalHistory",
        "style": "margin-left: 250px;"
    },
    {
        "label_style": "white-space: nowrap;margin-left: 145px;",
        "name": "complicatingPersonalFactorsMedicalHistory",
        "style": "margin-left: 250px;"
    },
    {
        "label_style": "white-space: nowrap;margin-top:5px;margin-left:400px",
        "name": "medicalHistoryReviewMedicalHistory",
        "style": "width:700px;"
    },
    {
        "label_style": "white-space: nowrap;margin-left: 145px;",
        "name": "currentMedicationsMedicalHistory",
        "style": "margin-left: 250px;"
    },
    {
        "label_style": "white-space: nowrap; min-width: 500px;",
        "name": "pelvicFloorMedicalHistory"
    },
    {
        "label_style": "white-space: nowrap; min-width: 500px;",
        "name": "abusePelvicFloorMedicalHistory",
        "style": "margin-left: 15px;"
    },
    {
        "label_style": "white-space: nowrap; min-width: 500px;",
        "name": "sexualHistoryPelvicFloorMedicalHistory",
        "style": "margin-left: 15px;"
    },
    {
        "label_style": "white-space: nowrap; min-width: 500px;",
        "name": "menstrualHistoryPelvicFloorMedicalHistory",
        "style": "margin-left: 15px;"
    },
    {
        "label_style": "white-space: nowrap; min-width: 500px;",
        "name": "birthControlPelvicFloorMedicalHistory",
        "style": "margin-left: 15px;"
    },
    {
        "label_style": "white-space: nowrap; min-width: 500px;",
        "name": "pregnancyPelvicFloorMedicalHistory",
        "style": "margin-left: 15px;"
    },
    {
        "label_style": "white-space: nowrap; min-width: 500px;",
        "name": "bladderPelvicFloorMedicalHistory",
        "style": "margin-left: 15px;"
    },
    {
        "label_style": "white-space: nowrap; min-width: 500px;",
        "name": "sexualActivityPelvicFloorMedicalHistory",
        "style": "margin-left: 15px;"
    },

]