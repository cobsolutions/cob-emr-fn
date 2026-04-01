export interface PatientRecord{
    entityId?:number
    noteId?:string
    status?:string
    date?:string
    dos?:string
    actions?:string[]
    note:boolean
    isForwarded?:boolean
    coSigner?:string
}