import { HipGmtLower } from './HipGmtLower';
import { KneeGmtLower } from './KneeGmtLower';
import { AnkleGmtLower } from './AnkleGmtLower';

export interface GrossMuscleTestsLower {
  grossMuscleTestsLower: boolean;
  hipGrossMuscleTestsLower: boolean;
  hipGmtLower: HipGmtLower;
  kneeGrossMuscleTestsLower: boolean;
  kneeGmtLower: KneeGmtLower;
  ankleGrossMuscleTestsLower: boolean;
  ankleGmtLower: AnkleGmtLower;
}
