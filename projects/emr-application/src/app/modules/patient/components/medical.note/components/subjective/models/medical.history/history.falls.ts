export interface HistoryFall{
    //historyOfFallsDocument
    isFallsDocumented?:boolean
    // historyOfFallsDocumentText
    isFallsDocumentedDescription?:string,
    //riskAssessmentMedicationsContributingFactor
    //riskAssessmentHomeFallHazards
    //riskAssessmentPosturalBloodPressure
    //riskAssessmentVision
    riskAssessment?:boolean[]
}