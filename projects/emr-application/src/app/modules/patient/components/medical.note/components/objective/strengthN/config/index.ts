import { GripPinch } from "./grip-pinch-config";
import { GrossMuscleTestsTrunk } from "./gross-muscle-tests-trunk-config";
import { ManualMuscleTests } from "./manual-muscle-tests-config";

export class StrengthSectionsConfig {
    //Grip / Pinch
    static readonly gripPinch = GripPinch.gripPinch;

    //GrossMuscleTestsTrunk
    static readonly grossMuscleTestsTrunk = GrossMuscleTestsTrunk.grossMuscleTestsTrunk;

    //Manual Muscle Tests
    static readonly manualMuscleTests = ManualMuscleTests.manualMuscleTests;
}