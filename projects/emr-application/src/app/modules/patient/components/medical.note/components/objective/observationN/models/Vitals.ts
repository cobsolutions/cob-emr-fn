import { BloodPressure } from "./BloodPressure";
import { Pulse } from "./Pulse";
import { Respiration } from "./Respiration";
import { Weight } from "./Weight";

export interface Vitals {
  vitals: boolean;
  temperature: boolean;
  bloodPressure: BloodPressure;
  pulse: Pulse;
  respiration: Respiration;
  weight: Weight;
}
