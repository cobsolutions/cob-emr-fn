import { AdditionalComments } from "./AdditionalComments";
import { CoreStrength } from "./CoreStrength";
import { GripPinch } from "./GripPinch";
import { GrossMuscleTestsLower } from "./GrossMuscleTestsLower";
import { GrossMuscleTestsPelvicFloor } from "./GrossMuscleTestsPelvicFloor";
import { GrossMuscleTestsTrunk } from "./GrossMuscleTestsTrunk";
import { GrossMuscleTestsUpper } from "./GrossMuscleTestsUpper";
import { ManualMuscleTests } from "./ManualMuscleTests";
import { NoLimitationsNoted } from "./NoLimitationsNoted";
import { RedcordNeuracStabilityTests } from "./RedcordNeuracStabilityTests";
import { SelectiveTissueTensionLower } from "./SelectiveTissueTensionLower";
import { SelectiveTissueTensionUpper } from "./SelectiveTissueTensionUpper";

export interface Strength {
  noLimitationsNoted: NoLimitationsNoted;
  selectiveTissueTensionUpper: SelectiveTissueTensionUpper;
  selectiveTissueTensionLower: SelectiveTissueTensionLower;
  gripPinch: GripPinch;
  grossMuscleTestsUpper: GrossMuscleTestsUpper;
  redcordNeuracStabilityTests: RedcordNeuracStabilityTests;
  grossMuscleTestsTrunk: GrossMuscleTestsTrunk;
  grossMuscleTestsLower: GrossMuscleTestsLower;
  coreStrength: CoreStrength;
  grossMuscleTestsPelvicFloor: GrossMuscleTestsPelvicFloor;
  manualMuscleTests: ManualMuscleTests;
  additionalComments: AdditionalComments;
}
