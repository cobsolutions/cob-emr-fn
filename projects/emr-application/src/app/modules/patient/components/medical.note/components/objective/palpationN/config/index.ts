import { MuscleAssessmentConfig } from "./muscle-assessment-config";
import { TemperaturePalpation } from "./temperature-palpation-config";

export class PalpationConfig{
    static readonly temperaturePalpation = TemperaturePalpation.temperaturePalpation;
    static readonly rightTemporalis = MuscleAssessmentConfig.rightTemporalis;
}