import { Inspection } from "../inspectionN/models/Inspection"
import { Omt } from "../outcome-measurement-tools/models/Omt"

export interface Objective{
    profile?:string
    inspection?:Inspection
    omt?:Omt
}