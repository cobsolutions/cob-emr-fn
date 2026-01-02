export interface OccupationSocialHistory{
    isSocialHistory?:boolean,
    isWorkStatus?:boolean,
    isHomeLayout?:boolean,
    isMedicalEquipment?:boolean,
    isTobaccoUser?:boolean,

    socialHistoryList?:string[],
    socialHistoryListDescription?:string,
    occupationName?:string,
    occupationStatus?:string,
    occupationDutyLevel?:string,
    occupationDescription?:string,
    occupationOutOfWorkSince?:Date,
    occupationReturnToWorkDate?:Date,

    homeLayoutDescription?:string,

    MedicalEquipmentsList?:string[],
    MedicalEquipmentsListDescription?:string
    
    isPatientUseOtherFormsOfTobacco?:boolean,
    patientSmokerAdvices?:string[]
    patientSmokerAdvicesDescription?:string






}