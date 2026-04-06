import { CervicalMovementsConfig } from "./cervical-movements-config";
import { CervicalMotorControlTestsConfig } from "./cervical-motor-control-tests-config";
import { LumbarMotorControlTestsConfig } from "./lumbar-motor-control-tests-config";
import { UpperBodyMyofascialTestsConfig } from "./upper-body-myofascial-tests-config";
import { LowerBodyMyofascialTestsConfig } from "./lower-body-myofascial-tests-config";
import { BackRibs } from "./back-ribs-config";
import { Cervical } from "./cervical-config";
import { Elbow } from "./elbow-config";
import { GripPinch } from "./grip-pinch-config";
import { Hand } from "./hand-config";
import { Hip } from "./hip-config";
import { Knee } from "./knee-config";
import { Ankle } from "./ankle-config";
import { Foot } from "./foot-config";
import { GrossMuscleTestsLowerAnkle } from "./gross-muscle-tests-lower-ankle-config";
import { GrossMuscleTestsLowerHip } from "./gross-muscle-tests-lower-hip-config";
import { GrossMuscleTestsLowerKnee } from "./gross-muscle-tests-lower-knee-config";
import { GrossMuscleTestsTrunk } from "./gross-muscle-tests-trunk-config";
import { GrossMuscleTestsUpperCervical } from "./gross-muscle-tests-upper-cervical-config";
import { GrossMuscleTestsUpperElbow } from "./gross-muscle-tests-upper-elbow-config";
import { GrossMuscleTestsUpperShoulder } from "./gross-muscle-tests-upper-shoulder-config";
import { GrossMuscleTestsUpperWrist } from "./gross-muscle-tests-upper-wrist-config";
import { ManualMuscleTests } from "./manual-muscle-tests-config";
import { RapidExchange } from "./rapid-exchange-config";
import { RepeatedGrip } from "./repeated-grip-config";
import { FiveLevelGrip } from "./five-level-grip-config";
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

    //Hip (Selective Tissue Tension Lower)
    static readonly hip = Hip.hip;

    //Knee (Selective Tissue Tension Lower)
    static readonly knee = Knee.knee;

    //Ankle (Selective Tissue Tension Lower)
    static readonly ankle = Ankle.ankle;

    //Foot (Selective Tissue Tension Lower)
    static readonly foot = Foot.foot;

    //Grip / Pinch
    static readonly gripPinch = GripPinch.gripPinch;

    //Rapid Exchange (Grip / Pinch)
    static readonly rapidExchange = RapidExchange.rapidExchange;

    //Repeated Grip (Grip / Pinch)
    static readonly repeatedGrip = RepeatedGrip.repeatedGrip;

    //Five Level Grip (Grip / Pinch)
    static readonly fiveLevelGrip = FiveLevelGrip.fiveLevelGrip;

    //Gross Muscle Tests Upper - Cervical
    static readonly cervicalGmtUpper = GrossMuscleTestsUpperCervical.cervicalGmtUpper;

    //Gross Muscle Tests Upper - Shoulder
    static readonly shoulderGmtUpper = GrossMuscleTestsUpperShoulder.shoulderGmtUpper;

    //Gross Muscle Tests Upper - Elbow
    static readonly elbowGmtUpper = GrossMuscleTestsUpperElbow.elbowGmtUpper;

    //Gross Muscle Tests Upper - Wrist
    static readonly wristGmtUpper = GrossMuscleTestsUpperWrist.wristGmtUpper;

    //GrossMuscleTestsTrunk
    static readonly grossMuscleTestsTrunk = GrossMuscleTestsTrunk.grossMuscleTestsTrunk;

    //Gross Muscle Tests Lower - Hip
    static readonly hipGmtLower = GrossMuscleTestsLowerHip.hipGmtLower;

    //Gross Muscle Tests Lower - Knee
    static readonly kneeGmtLower = GrossMuscleTestsLowerKnee.kneeGmtLower;

    //Gross Muscle Tests Lower - Ankle
    static readonly ankleGmtLower = GrossMuscleTestsLowerAnkle.ankleGmtLower;

    //Manual Muscle Tests
    static readonly manualMuscleTests = ManualMuscleTests.manualMuscleTests;

    //Cervical Movements (Redcord Neurac Stability Tests)
    static readonly cervicalMovements = CervicalMovementsConfig.cervicalMovements;

    //Cervical Motor Control Tests (Redcord Neurac Stability Tests)
    static readonly cervicalMotorControlTests = CervicalMotorControlTestsConfig.cervicalMotorControlTests;

    //Lumbar Motor Control Tests (Redcord Neurac Stability Tests)
    static readonly lumbarMotorControlTests = LumbarMotorControlTestsConfig.lumbarMotorControlTests;

    //Upper Body Myofascial Tests (Redcord Neurac Stability Tests)
    static readonly upperBodyMyofascialTests = UpperBodyMyofascialTestsConfig.upperBodyMyofascialTests;

    //Lower Body Myofascial Tests (Redcord Neurac Stability Tests)
    static readonly lowerBodyMyofascialTests = LowerBodyMyofascialTestsConfig.lowerBodyMyofascialTests;
}