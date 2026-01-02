import { Basic } from "./Basic";
import { CurrentFunction } from "./CurrentFunction";
import { MedicalHistory } from "./medical.history/medical.history";
import { Pain } from "./Pain";
import { PriorFunction } from "./PriorFunction";

export interface Subjective {
    basic?: Basic;
    pain?: Pain;
    priorFunction?: PriorFunction;
    currentFunction?: CurrentFunction;
    medicalHistory?: MedicalHistory;
}
