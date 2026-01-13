import { Inspection } from "../inspectionN/models/Inspection"
import { NeuroVascular } from "../neuro-vascular/models/NeuroVascular"
import { Observation } from "../observationN/models/Observation"
import { Omt } from "../outcome-measurement-tools/models/Omt"
import { RangeOfMotion } from "../range-of-motion/models/RangeOfMotion"
import { SpecialTest } from "../special-tests/model/SpecialTest"
import { Strength } from "../strengthN/models/Strength"

export interface Objective{
    profile?:string
    inspection?:Inspection
    omt?:Omt
    observation?:Observation
    rom?:RangeOfMotion
    strength?:Strength
    neuroVascular?:NeuroVascular
    specialTest?:SpecialTest
}