import { Inspection } from "../inspectionN/models/Inspection"
import { Observation } from "../observationN/models/Observation"
import { Omt } from "../outcome-measurement-tools/models/Omt"
import { RangeOfMotion } from "../range-of-motion/models/RangeOfMotion"

export interface Objective{
    profile?:string
    inspection?:Inspection
    omt?:Omt
    observation?:Observation
    rom?:RangeOfMotion
}