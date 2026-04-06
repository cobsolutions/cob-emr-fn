// Combined TypeScript interfaces - Auto-generated
// Generated on: 2025-12-27T12:27:33.739Z

export interface IcdtenDiagnosi {
    code?: string;
    description?: string;
    order?: number;
}

export interface TreatmentDiagnosi {
    code?: string;
    description?: string;
    order?: number;
}

export interface Basic {
    dosDate?: string;
    time?: boolean;
    timeIn?: string;
    timeOut?: string;
    numberOfVisit?: number;
    icdtenDiagnosis?: IcdtenDiagnosi[];
    treatmentDiagnosis?: TreatmentDiagnosi[];
    treatmentSide?: boolean;
    specificPhysicianRders?: boolean;
    specificPhysicianRdersText?: string;
    injuryOnsetDate?: string;
    chronic?: boolean;
    Insidious?: boolean;
    newInjury?: boolean;
    newInjuryText?: string;
    surgeryPerformed?: boolean;
    surgeryPerformedDateOfSurgery?: string;
    surgeryPerformedTypeOfSurgery?: string;
    priorHospitalization?: boolean;
    fromDate?: string;
    toDate?: string;
    pelvicSpeechProfile?: string;
    historyOfPresentCondition_MechanismOfInjury?: string;
    primaryConcernChiefComplaint?: string;
}

export interface PainEvaluation {
    location?: string;
    worst?: string;
    current?: string;
    best?: string;
    description?: string;
    custom?: any;
    plan?: string;
}

export interface Pain {
    painScale?: boolean;
    painEvaluations?: PainEvaluation[];
    aggravatingFactors?: string[];
    restrictionsPainAlleviators?: boolean;
    restrictionsPainAlleviatorsText?: string;
}

export interface PriorFunction {
    priorLevelFunctionOther?: boolean;
    priorLevelFunctionOtherText?: string;
    priorLevelFunctionSelfCareComment?: string;
    priorLevelFunctionSelfCareHygiene?: boolean;
    priorLevelFunctionSelfCareSleep?: boolean;
    priorLevelFunctionSelfCareIadls?: boolean;
    priorLevelFunctionSelfCareHouseholdChores?: boolean;
    priorLevelFunctionSelfCareDriveCommunity?: boolean;
    priorLevelFunctionSelfCareVolunteering?: boolean;
    priorLevelFunctionSelfCareCaregiving?: boolean;
    priorLevelFunctionMobilityWalkingMovingAroundComment?: string;
    priorLevelFunctionMobilityWalkingMovingAroundMobilityIadls?: boolean;
    priorLevelFunctionMobilityWalkingMovingAroundAssistiveDevice?: boolean;
    priorLevelFunctionMobilityWalkingMovingAroundWalking?: boolean;
    priorLevelFunctionMobilityWalkingMovingAroundMovingAround?: boolean;
    priorLevelFunctionMobilityWalkingMovingAroundDifferentLocations?: boolean;
    priorLevelFunctionMobilityWalkingMovingAroundNegotiateObstacles?: boolean;
    priorLevelFunctionChangingMaintainingBodyPositionComment?: string;
    priorLevelFunctionChangingMaintainingBodyPositionMaintainingBodyPosition?: boolean;
    priorLevelFunctionChangingMaintainingBodyPositionTransfers?: boolean;
    priorLevelFunctionChangingMaintainingBodyPositionBodyPositionIadls?: boolean;
    priorLevelFunctionCarryingMovingHandlingObjectsComment?: string;
    priorLevelFunctionCarryingMovingHandlingObjectsCarryingIadls?: boolean;
    priorLevelFunctionCarryingMovingHandlingObjectsHandArmUse?: boolean;
    priorLevelFunctionCarryingMovingHandlingObjectsFineHandUse?: boolean;
    priorLevelFunctionCarryingMovingHandlingObjectsLowerExtremities?: boolean;
    priorLevelFunctionCarryingMovingHandlingObjectsCommunityIntegration?: boolean;
    priorLevelFunctionCarryingMovingHandlingObjectsWorkVocation?: boolean;
    priorLevelFunctionCarryingMovingHandlingObjectsRecreation?: boolean;
}

export interface CurrentFunction {
    currentFunctionalLimitationsOther?: boolean;
    currentFunctionalLimitationsFunctionOtherText?: string;
    currentFunctionalLimitationsFunctionOtherLymphedema?: boolean;
    currentFunctionalLimitationsFunctionOtherLymphedemaText?: string;
    currentFunctionalLimitationsFunctionOtherWoundHealing?: boolean;
    currentFunctionalLimitationsFunctionOtherWoundHealingText?: string;
    currentFunctionalLimitationsFunctionOtherPelvicHealth?: boolean;
    currentFunctionalLimitationsFunctionOtherPelvicHealthText?: string;
    currentFunctionalLimitationsSelfCareComment?: string;
    currentFunctionalLimitationsSelfCareHygiene?: boolean;
    currentFunctionalLimitationsSelfCareSleep?: boolean;
    currentFunctionalLimitationsSelfCareIadls?: boolean;
    currentFunctionalLimitationsSelfCareHouseholdChores?: boolean;
    currentFunctionalLimitationsSelfCareDriveCommunity?: boolean;
    currentFunctionalLimitationsSelfCareVolunteering?: boolean;
    currentFunctionalLimitationsSelfCareCaregiving?: boolean;
    currentFunctionalLimitationsMobilityWalkingMovingAroundComment?: string;
    currentFunctionalLimitationsMobilityWalkingMovingAroundMobilityIadls?: boolean;
    currentFunctionalLimitationsMobilityWalkingMovingAroundAssistiveDevice?: boolean;
    currentFunctionalLimitationsMobilityWalkingMovingAroundWalking?: boolean;
    currentFunctionalLimitationsMobilityWalkingMovingAroundMovingAround?: boolean;
    currentFunctionalLimitationsMobilityWalkingMovingAroundDifferentLocations?: boolean;
    currentFunctionalLimitationsMobilityWalkingMovingAroundNegotiateObstacles?: boolean;
    currentFunctionalLimitationsChangingMaintainingBodyPositionComment?: string;
    currentFunctionalLimitationsChangingMaintainingBodyPositionMaintainingBodyPosition?: boolean;
    currentFunctionalLimitationsChangingMaintainingBodyPositionTransfers?: boolean;
    currentFunctionalLimitationsChangingMaintainingBodyPositionBodyPositionIadls?: boolean;
    currentFunctionalLimitationsCarryingMovingHandlingObjectsComment?: string;
    currentFunctionalLimitationsCarryingMovingHandlingObjectsCarryingIadls?: boolean;
    currentFunctionalLimitationsCarryingMovingHandlingObjectsHandArmUse?: boolean;
    currentFunctionalLimitationsCarryingMovingHandlingObjectsFineHandUse?: boolean;
    currentFunctionalLimitationsCarryingMovingHandlingObjectsLowerExtremities?: boolean;
    currentFunctionalLimitationsCarryingMovingHandlingObjectsCommunityIntegration?: boolean;
    currentFunctionalLimitationsCarryingMovingHandlingObjectsWorkVocation?: boolean;
    currentFunctionalLimitationsCarryingMovingHandlingObjectsRecreation?: boolean;
}

export interface MedicalHistory {
    previousHistoryOfSimilarSymptoms?: boolean;
    previousEpisodesOfSameComplaints?: boolean;
    previousEpisodesOfSameComplaintsRange?: string;
    previousEpisodesOfSameComplaintsYearFirstEpisode?: number;
    previousTreatmentsForSimilarSymptoms?: boolean;
    previousHistoryOfSimilarSymptomsText?: string;
    previousTreatmentsForSimilarSymptomsText?: string;
    generalHealth?: string;
    occupationSocialHistory?: boolean;
    occupationSocialHistoryList?: string[];
    occupationSocialHistoryText?: any;
    occupationSocialHistorySocialHistory?: boolean;
    occupationSocialHistoryOccupationAndWorkStatus?: boolean;
    occupationSocialHistoryOccupationAndWorkNameOfOccupation?: string;
    occupationSocialHistoryOccupationAndWorkStatusStatus?: string;
    occupationSocialHistoryOccupationAndWorkStatusDutyLevel?: string;
    occupationSocialHistoryOccupationAndWorkStatusSescription?: string;
    occupationSocialHistoryOccupationAndWorkStatusOutOfWorkSince?: string;
    occupationSocialHistoryOccupationAndWorkStatusReturnToWorkDate?: string;
    occupationSocialHistoryHomeLayout?: boolean;
    occupationSocialHistoryHomeLayoutList?: string[];
    occupationSocialHistoryHomeLayoutText?: string;
    occupationSocialHistoryDurableMedicalEquipment?: boolean;
    occupationSocialHistoryDurableMedicalEquipmentList?: string[];
    occupationSocialHistoryDurableMedicalEquipmentText?: string;
    occupationSocialHistoryPatientTobaccoUser?: boolean;
    occupationSocialHistoryPatientTobaccoUserCigarettesOrAndOtherFormsTobacco?: boolean;
    occupationSocialHistoryPatientTobaccoUserOtherFormText?: string;
    tobaccoCessationRecommendationMade?: boolean;
    tobaccoCessationAdviceSupportProvided?: boolean;
    tobaccoCessationContinuedSupport?: boolean;
    homeHealthCare?: boolean;
    homeHealthCareText?: string;
    historyOfFalls?: boolean;
    historyOfFallsDocument?: boolean;
    historyOfFallsDocumentText?: string;
    riskAssessmentMedicationsContributingFactor?: boolean;
    riskAssessmentHomeFallHazards?: boolean;
    riskAssessmentPosturalBloodPressure?: boolean;
    riskAssessmentVision?: boolean;
    medicalHistoryReview?: string;
    mentalStatusCognitiveFunctionAppearsImpaired?: boolean;
    mentalStatusCognitiveFunctionAppearsImpairedText?: string;
    unexplainedWeightLoss?: boolean;
    diagnosticTesting_Imaging?: string;
    patientGoals?: string;
    medicalHistoryNoKnownSignificantPmhToAffectTreatmentCheckbox?: boolean;
    medicalHistoryNoKnownSignificantPmhToAffectTreatmentText?: string;
    medicalHistoryAlzheimersCheckbox?: boolean;
    medicalHistoryAlzheimersText?: string;
    medicalHistoryCardiovascularDiseaseCheckbox?: boolean;
    medicalHistoryCardiovascularDiseaseText?: string;
    medicalHistoryCaudaEquinaSyndromeCheckbox?: boolean;
    medicalHistoryCaudaEquinaSyndromeText?: string;
    medicalHistoryCerebralVascularAccidentCheckbox?: boolean;
    medicalHistoryCerebralVascularAccidentText?: string;
    medicalHistoryCurrentInfectionCheckbox?: boolean;
    medicalHistoryCurrentInfectionText?: string;
    medicalHistoryDiabetesMellitusType_1Checkbox?: boolean;
    medicalHistoryDiabetesMellitusType_1Text?: string;
    medicalHistoryDiabetesMellitusType_2Checkbox?: boolean;
    medicalHistoryDiabetesMellitusType_2Text?: string;
    medicalHistoryFibromyalgiaCheckbox?: boolean;
    medicalHistoryFibromyalgiaText?: string;
    medicalHistoryFractureOrSuspectedFractureCheckbox?: boolean;
    medicalHistoryFractureOrSuspectedFractureText?: string;
    medicalHistoryHighBloodPressureCheckbox?: boolean;
    medicalHistoryHighBloodPressureText?: string;
    medicalHistoryHistoryOfCancerCheckbox?: boolean;
    medicalHistoryHistoryOfCancerText?: string;
    medicalHistoryHuntingtonsCheckbox?: boolean;
    medicalHistoryHuntingtonsText?: string;
    medicalHistoryImmunosuppressionCheckbox?: boolean;
    medicalHistoryImmunosuppressionText?: string;
    medicalHistoryLupusCheckbox?: boolean;
    medicalHistoryLupusText?: string;
    medicalHistoryMuscularDystrophyCheckbox?: boolean;
    medicalHistoryMuscularDystrophyText?: string;
    medicalHistoryOtherEnterDescriptionBelowCheckbox?: boolean;
    medicalHistoryOtherEnterDescriptionBelowText?: string;
    medicalHistoryObesityCheckbox?: boolean;
    medicalHistoryObesityText?: string;
    medicalHistoryOsteoarthritisCheckbox?: boolean;
    medicalHistoryOsteoarthritisText?: string;
    medicalHistoryParkinsonsCheckbox?: boolean;
    medicalHistoryParkinsonsText?: string;
    medicalHistoryRheumatoidArthritisCheckbox?: boolean;
    medicalHistoryRheumatoidArthritisText?: string;
    medicalHistoryTraumaticBrainInjuryCheckbox?: boolean;
    medicalHistoryTraumaticBrainInjuryText?: string;
    complicatingpersonalFactorsNoKnownComplicatingFactorsAffectingThePlanOfCareCheckbox?: boolean;
    complicatingpersonalFactorsNoKnownComplicatingFactorsAffectingThePlanOfCareText?: string;
    complicatingpersonalFactorsAllergiesCheckbox?: boolean;
    complicatingpersonalFactorsAllergiesText?: string;
    complicatingpersonalFactorsAttitudesMotivationCheckbox?: boolean;
    complicatingpersonalFactorsAttitudesMotivationText?: string;
    complicatingpersonalFactorsCharacterCheckbox?: boolean;
    complicatingpersonalFactorsCharacterText?: string;
    complicatingpersonalFactorsCopingStyleCheckbox?: boolean;
    complicatingpersonalFactorsCopingStyleText?: string;
    complicatingpersonalFactorsEducationLevelCheckbox?: boolean;
    complicatingpersonalFactorsEducationLevelText?: string;
    complicatingpersonalFactorsHomeEnvironmentCheckbox?: boolean;
    complicatingpersonalFactorsHomeEnvironmentText?: string;
    complicatingpersonalFactorsLifestyleCheckbox?: boolean;
    complicatingpersonalFactorsLifestyleText?: string;
    complicatingpersonalFactorsLitigationCheckbox?: boolean;
    complicatingpersonalFactorsLitigationText?: string;
    complicatingpersonalFactorsOtherEnterDescriptionBelowCheckbox?: boolean;
    complicatingpersonalFactorsOtherEnterDescriptionBelowText?: string;
    complicatingpersonalFactorsMechanismOfInjuryIllnessCheckbox?: boolean;
    complicatingpersonalFactorsMechanismOfInjuryIllnessText?: string;
    complicatingpersonalFactorsMultipleTreatmentAreasCheckbox?: boolean;
    complicatingpersonalFactorsMultipleTreatmentAreasText?: string;
    complicatingpersonalFactorsPatientAgeCheckbox?: boolean;
    complicatingpersonalFactorsPatientAgeText?: string;
    complicatingpersonalFactorsPreviousTherapyCheckbox?: boolean;
    complicatingpersonalFactorsPreviousTherapyText?: string;
    complicatingpersonalFactorsPsychoSocialCheckbox?: boolean;
    complicatingpersonalFactorsPsychoSocialText?: string;
    complicatingpersonalFactorsRehabPotentialCheckbox?: boolean;
    complicatingpersonalFactorsRehabPotentialText?: string;
    complicatingpersonalFactorsSocialBackgroundCheckbox?: boolean;
    complicatingpersonalFactorsSocialBackgroundText?: string;
    complicatingpersonalFactorsSurgicalHistoryCheckbox?: boolean;
    complicatingpersonalFactorsSurgicalHistoryText?: string;
    complicatingpersonalFactorsTimeSinceOnsetOfInjuryIllnessCheckbox?: boolean;
    complicatingpersonalFactorsTimeSinceOnsetOfInjuryIllnessText?: string;
    currentMedicationsPrescriptionCheckbox?: boolean;
    currentMedicationsPrescriptionText?: string;
    currentMedicationsOverTheCounterCheckbox?: boolean;
    currentMedicationsOverTheCounterText?: string;
    currentMedicationsHerbalsCheckbox?: boolean;
    currentMedicationsHerbalsText?: string;
    currentMedicationsVitaminMineralDietarySupplementsCheckbox?: boolean;
    currentMedicationsVitaminMineralDietarySupplementsText?: string;
    currentMedicationsOtherCheckbox?: boolean;
    currentMedicationsOtherText?: string;
    currentMedicationsNotCurrentlyTakingAnyMedicationsCheckbox?: boolean;
    currentMedicationsNotCurrentlyTakingAnyMedicationsText?: string;
}

export interface Subjective {
    basic?: Basic;
    pain?: Pain;
    priorFunction?: PriorFunction;
    currentFunction?: CurrentFunction;
    medicalHistory?: MedicalHistory;
}

