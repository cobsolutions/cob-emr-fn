import { CurrentMedication } from "./current.medication";
import { HistoryFall } from "./history.falls";
import { MedicalHistoryDisease } from "./medical.history.disease";
import { OccupationSocialHistory } from "./occupation.social.history";
import { PersonalComplication } from "./personal.complication";
import { PreviousHistorySymptoms } from "./previous.history.symptoms";

export interface MedicalHistory {
    //previousHistoryOfSimilarSymptoms
    isPreviousHistoryOfSimilarSymptoms?: boolean,
    previousHistorySymptoms?: PreviousHistorySymptoms,

    //occupationSocialHistory
    isOccupationSocialHistory?: boolean
    occupationSocialHistory?: OccupationSocialHistory,
    //homeHealthCare
    isHomeHealthCare?: boolean,
    //homeHealthCareText
    homeHealthCareDescription?: string,

    //historyOfFalls
    isHistoryOfFalls?: string,
    historyFall?: HistoryFall,

    // medicalHistoryAlzheimersCheckbox?: boolean;
    // medicalHistoryAlzheimersText?: string;
    // medicalHistoryCardiovascularDiseaseCheckbox?: boolean;
    // medicalHistoryCardiovascularDiseaseText?: string;
    // medicalHistoryCaudaEquinaSyndromeCheckbox?: boolean;
    // medicalHistoryCaudaEquinaSyndromeText?: string;
    // medicalHistoryCerebralVascularAccidentCheckbox?: boolean;
    // medicalHistoryCerebralVascularAccidentText?: string;
    // medicalHistoryCurrentInfectionCheckbox?: boolean;
    // medicalHistoryCurrentInfectionText?: string;
    // medicalHistoryDiabetesMellitusType_1Checkbox?: boolean;
    // medicalHistoryDiabetesMellitusType_1Text?: string;
    // medicalHistoryDiabetesMellitusType_2Checkbox?: boolean;
    // medicalHistoryDiabetesMellitusType_2Text?: string;
    // medicalHistoryFibromyalgiaCheckbox?: boolean;
    // medicalHistoryFibromyalgiaText?: string;
    // medicalHistoryFractureOrSuspectedFractureCheckbox?: boolean;
    // medicalHistoryFractureOrSuspectedFractureText?: string;
    // medicalHistoryHighBloodPressureCheckbox?: boolean;
    // medicalHistoryHighBloodPressureText?: string;
    // medicalHistoryHistoryOfCancerCheckbox?: boolean;
    // medicalHistoryHistoryOfCancerText?: string;
    // medicalHistoryHuntingtonsCheckbox?: boolean;
    // medicalHistoryHuntingtonsText?: string;
    // medicalHistoryImmunosuppressionCheckbox?: boolean;
    // medicalHistoryImmunosuppressionText?: string;
    // medicalHistoryLupusCheckbox?: boolean;
    // medicalHistoryLupusText?: string;
    // medicalHistoryMuscularDystrophyCheckbox?: boolean;
    // medicalHistoryMuscularDystrophyText?: string;
    // medicalHistoryOtherEnterDescriptionBelowCheckbox?: boolean;
    // medicalHistoryOtherEnterDescriptionBelowText?: string;
    // medicalHistoryObesityCheckbox?: boolean;
    // medicalHistoryObesityText?: string;
    // medicalHistoryOsteoarthritisCheckbox?: boolean;
    // medicalHistoryOsteoarthritisText?: string;
    // medicalHistoryParkinsonsCheckbox?: boolean;
    // medicalHistoryParkinsonsText?: string;
    // medicalHistoryRheumatoidArthritisCheckbox?: boolean;
    // medicalHistoryRheumatoidArthritisText?: string;
    // medicalHistoryTraumaticBrainInjuryCheckbox?: boolean;
    medicalHistoryDisease?: MedicalHistoryDisease[],

    // complicatingpersonalFactorsMechanismOfInjuryIllnessCheckbox?: boolean;
    // complicatingpersonalFactorsMechanismOfInjuryIllnessText?: string;
    // complicatingpersonalFactorsMultipleTreatmentAreasCheckbox?: boolean;
    // complicatingpersonalFactorsMultipleTreatmentAreasText?: string;
    // complicatingpersonalFactorsPatientAgeCheckbox?: boolean;
    // complicatingpersonalFactorsPatientAgeText?: string;
    // complicatingpersonalFactorsPreviousTherapyCheckbox?: boolean;
    // complicatingpersonalFactorsPreviousTherapyText?: string;
    // complicatingpersonalFactorsPsychoSocialCheckbox?: boolean;
    // complicatingpersonalFactorsPsychoSocialText?: string;
    // complicatingpersonalFactorsRehabPotentialCheckbox?: boolean;
    // complicatingpersonalFactorsRehabPotentialText?: string;
    // complicatingpersonalFactorsSocialBackgroundCheckbox?: boolean;
    // complicatingpersonalFactorsSocialBackgroundText?: string;
    // complicatingpersonalFactorsSurgicalHistoryCheckbox?: boolean;
    // complicatingpersonalFactorsSurgicalHistoryText?: string;
    // complicatingpersonalFactorsTimeSinceOnsetOfInjuryIllnessCheckbox?: boolean;
    // complicatingpersonalFactorsTimeSinceOnsetOfInjuryIllnessText?: string;
    personalComplication?: PersonalComplication[],

    // currentMedicationsPrescriptionCheckbox?: boolean;
    // currentMedicationsPrescriptionText?: string;
    // currentMedicationsOverTheCounterCheckbox?: boolean;
    // currentMedicationsOverTheCounterText?: string;
    // currentMedicationsHerbalsCheckbox?: boolean;
    // currentMedicationsHerbalsText?: string;
    // currentMedicationsVitaminMineralDietarySupplementsCheckbox?: boolean;
    // currentMedicationsVitaminMineralDietarySupplementsText?: string;
    // currentMedicationsOtherCheckbox?: boolean;
    // currentMedicationsOtherText?: string;
    // currentMedicationsNotCurrentlyTakingAnyMedicationsCheckbox?: boolean;
    // currentMedicationsNotCurrentlyTakingAnyMedicationsText?: string;
    currentMedication?: CurrentMedication[],

    //generalHealth
    generalHealth?: string,
    //diagnosticTesting_Imaging
    diagnosticTest?: string,
    //patientGoals
    patientGoals?: string,

    //medicalHistoryReview
    medicalHistoryReview?: string,
    //mentalStatusCognitiveFunctionAppearsImpaired
    isMentalStatus?: boolean,
    // mentalStatusCognitiveFunctionAppearsImpairedText
    mentalStatusDescription?: string,
    //unexplainedWeightLoss
    weightLoss?: string





}