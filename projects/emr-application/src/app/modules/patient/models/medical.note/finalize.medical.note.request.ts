import { MedicalNoteType } from "./medical.note.type";

export interface FinalizeMedicalNoteRequest{
    id?:number,
    caseId?:number,
    noteType?:MedicalNoteType,
    finalizedBy?:string
}
