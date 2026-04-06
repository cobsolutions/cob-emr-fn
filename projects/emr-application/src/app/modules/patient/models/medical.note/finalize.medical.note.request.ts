import { MedicalNoteType } from "./medical.note.type";

export interface FinalizeMedicalNoteRequest{
    id?:number,
    caseId?:string,
    noteType?:MedicalNoteType,
    finalizedBy?:string
}
