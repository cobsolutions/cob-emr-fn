import { BackRibs } from "./back-ribs-config";
import { Cervical } from "./cervical-config";
import { Elbow } from "./elbow-config";
import { GripPinch } from "./grip-pinch-config";
import { Hand } from "./hand-config";
import { GrossMuscleTestsTrunk } from "./gross-muscle-tests-trunk-config";
import { ManualMuscleTests } from "./manual-muscle-tests-config";
import { Shoulder } from "./shoulder-config";
import { Trunk } from "./trunk-config";
import { Wrist } from "./wrist-config";

export class StrengthSectionsConfig {
    //Cervical (Selective Tissue Tension Upper)
    static readonly cervical = Cervical.cervical;

    //Trunk (Selective Tissue Tension Upper)
    static readonly trunk = Trunk.trunk;

    //Back Ribs (Selective Tissue Tension Upper)
    static readonly backRibs = BackRibs.backRibs;

    //Shoulder (Selective Tissue Tension Upper)
    static readonly shoulder = Shoulder.shoulder;

    //Elbow (Selective Tissue Tension Upper)
    static readonly elbow = Elbow.elbow;

    //Hand (Selective Tissue Tension Upper)
    static readonly hand = Hand.hand;

    //Wrist (Selective Tissue Tension Upper)
    static readonly wrist = Wrist.wrist;

    //Grip / Pinch
    static readonly gripPinch = GripPinch.gripPinch;

    //GrossMuscleTestsTrunk
    static readonly grossMuscleTestsTrunk = GrossMuscleTestsTrunk.grossMuscleTestsTrunk;

    //Manual Muscle Tests
    static readonly manualMuscleTests = ManualMuscleTests.manualMuscleTests;
}