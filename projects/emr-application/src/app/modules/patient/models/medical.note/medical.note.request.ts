export interface MedicalNoteRequest{
    caseId?:number;
    noteType?:string
    createdBy?:string
    noteDate?:number
    subjective?:any
    assessment?:any
    planOfCare?:any
    billing?:any
}