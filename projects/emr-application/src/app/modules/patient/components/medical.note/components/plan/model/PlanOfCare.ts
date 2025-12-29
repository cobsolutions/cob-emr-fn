import { Modalities } from "./Modalities";
import { Procedures } from "./Procedures";
import { Specialties } from "./Specialties";

export interface PlanOfCare {
  createPlanOfCare: boolean;
  frequency: string;
  duration: string;
  plan: string;
  physicianSignature: boolean;
  procedures: Procedures;
  modalities: Modalities;
  specialties: Specialties;
}
