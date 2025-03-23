export interface MedicalNoteRequest{
    id?:number,
    caseId?:number;
    noteType?:string
    createdBy?:string
    noteDate?:number
    subjective?:any
    assessment?:any
    planOfCare?:any
    billing?:any
}