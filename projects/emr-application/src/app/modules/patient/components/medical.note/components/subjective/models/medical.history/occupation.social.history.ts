export interface OccupationSocialHistory {
    //occupationSocialHistorySocialHistory
    isSocialHistory?: boolean,
    //occupationSocialHistoryOccupationAndWorkStatus
    isWorkStatus?: boolean,
    //occupationSocialHistoryHomeLayout
    isHomeLayout?: boolean,
    //occupationSocialHistoryDurableMedicalEquipmentList
    isMedicalEquipment?: boolean,

    //occupationSocialHistoryPatientTobaccoUser
    isTobaccoUser?: boolean,

    //occupationSocialHistoryList
    socialHistoryList?: string[],
    // occupationSocialHistoryText
    socialHistoryListDescription?: string,
    //occupationSocialHistoryOccupationAndWorkNameOfOccupation
    occupationName?: string,
    // occupationSocialHistoryOccupationAndWorkStatusStatus
    occupationStatus?: string,
    // occupationSocialHistoryOccupationAndWorkStatusDutyLevel
    occupationDutyLevel?: string,
    //occupationSocialHistoryOccupationAndWorkStatusSescription
    occupationDescription?: string,
    // occupationSocialHistoryOccupationAndWorkStatusOutOfWorkSince
    occupationOutOfWorkSince?: Date,
    // occupationSocialHistoryOccupationAndWorkStatusReturnToWorkDate
    occupationReturnToWorkDate?: Date,
    // occupationSocialHistoryHomeLayoutText
    homeLayoutDescription?: string,
    //occupationSocialHistoryHomeLayoutList
    homeLayoutList?: string,
    // occupationSocialHistoryDurableMedicalEquipmentList
    MedicalEquipmentsList?: string[],
    //occupationSocialHistoryDurableMedicalEquipmentText
    MedicalEquipmentsListDescription?: string

    //occupationSocialHistoryPatientTobaccoUser
    isPatientUseOtherFormsOfTobacco?: boolean,
    //tobaccoCessationRecommendationMade
    //tobaccoCessationAdviceSupportProvided
    //tobaccoCessationContinuedSupport
    patientSmokerAdvices?: boolean[]
    // occupationSocialHistoryPatientTobaccoUserOtherFormText
    patientSmokerAdvicesDescription?: string






}