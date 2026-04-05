import { HamstringFlexibilityTest } from "./flexibility/9090-hamstring-flexibility-test";
import { OberTest } from "./flexibility/ober-test";
import { AnteriorDrawer } from "./ligament-integrity-knee/anterior-drawer";
import { Lachmans } from "./ligament-integrity-knee/lachmans";
import { PivotShift } from "./ligament-integrity-knee/pivot-shift";
import { PosteriorDrawer } from "./ligament-integrity-knee/posterior-drawer";
import { ValgusStressAt0KneeFlex } from "./ligament-integrity-knee/valgus-stress-at-0-knee-flex";
import { ValgusStressAt30KneeFlex } from "./ligament-integrity-knee/valgus-stress-at-30-knee-flex";
import { VarusStressAt0KneeFlex } from "./ligament-integrity-knee/varus-stress-at-0-knee-flex";
import { VarusStressAt30KneeFlex } from "./ligament-integrity-knee/varus-stress-at-30-knee-flex";
import { CraigsTest } from "./structural/craigs-test";
import { TibialTorsion } from "./structural/tibial-torsion";
import { SagSign } from "./ligament-integrity-knee/sag-sign";
import { StorkStandSIMobilityTest } from "./stork-stand-si-mobility-test/stork-stand-si-mobility-test";
import { JSign } from "./patellofemoral/j-sign";
import { PatellarBallottement } from "./patellofemoral/patellar-ballottement";
import { PatellarCompression } from "./patellofemoral/patellar-compression";
import { PatellarPassiveMobility } from "./patellofemoral/patellar-passive-mobility";
import { SelectiveFunctionalMovementAssessment } from "./functional/selective-functional-movement-assessment";
import { SingleLegBridgeHold } from "./functional/single-leg-bridge-hold";
import { AlarLigamentTest } from "./alar-ligament-test/alar-ligament-test";
import { SideBridgePlank } from "./functional/side-bridgeplank";
import { PronePlank } from "./functional/prone-plank";
import { SingleLegHopTestForDistance } from "./functional/single-leg-hop-test-for-distance";
import { GastrocnemiusLengthTest } from "./flexibility/gastrocnemius-length-test";
import { SoleusMuscleLengthTest } from "./flexibility/soleus-muscle-length-test";
import { ThomasTest } from "./flexibility/thomas-test";
import { TwoLegSquatWithOverheadReach } from "./functional/2-leg-squat-with-overhead-reach";
import { OneLegSquatWithOverheadReach } from "./functional/1-leg-squat-with-overhead-reach";
import { MaterialHandlingBilateralLifting } from "./work-conditioning/material-handling-bilateral-lifting";
import { NonMaterialHandling } from "./work-conditioning/non-material-handling";
import { CervicalQuadrantConfig } from "./cervical-quadrant/cervical-quadrant";
import { JawCrepitusConfig } from "./jaw-crepitus/jaw-crepitus";
import { SpurlingsManeuverConfig } from "./spurlings-maneuver/spurlings-maneuver";
import { AlarLigamentTestManualConfig } from "./alar-ligament-test-manual/alar-ligament-test-manual";
import { PassiveJointMobilityShoulderConfig } from "./passive-joint-mobility-shoulder/passive-joint-mobility-shoulder";
import { ImpingementConfig } from "./impingement/impingement";
import { GhjStabilityConfig } from "./ghj-stability/ghj-stability";
import { LabrumConfig } from "./labrum/labrum";
import { RotatorCuffConfig } from "./rotator-cuff/rotator-cuff";
import { LigamentIntegrityElbowConfig } from "./ligament-integrity-elbow/ligament-integrity-elbow";
import { UlnarNerveSubluxationConfig } from "./ulnar-nerve-subluxation/ulnar-nerve-subluxation";
import { SiCompressionConfig } from "./si-compression/si-compression";
import { SiDistractionConfig } from "./si-distraction/si-distraction";
import { LegLengthConfig } from "./leg-length/leg-length";
import { LaseguesSlrConfig } from "./lasegues-slr/lasegues-slr";

export class SpecialTestConfig {
    static readonly oberTestNoLabels = OberTest.oberTestNoLabels;
    static readonly ninetynineHamstringFlexibilityTestNoLabels = HamstringFlexibilityTest.ninetynineHamstringFlexibilityTestNoLabels;

    static readonly craigsTestNoLabels = CraigsTest.craigsTestNoLabels;

    static readonly tibialTorsionFieldTestNoLabels = TibialTorsion.tibialTorsionFieldTestNoLabels;



    static readonly valgusStressAt0KneeFlex = ValgusStressAt0KneeFlex.valgusStressAt0KneeFlex;


    static readonly valgusStressAt30KneeFlex = ValgusStressAt30KneeFlex.valgusStressAt30KneeFlex;

    static readonly varusStressAt0KneeFlex = VarusStressAt0KneeFlex.varusStressAt0KneeFlex;

    static readonly varusStressAt30KneeFlex = VarusStressAt30KneeFlex.varusStressAt30KneeFlex;


    static readonly anteriorDrawer = AnteriorDrawer.anteriorDrawer;


    static readonly posteriorDrawer = PosteriorDrawer.posteriorDrawer;


    static readonly lachmans = Lachmans.lachmans;

    static readonly pivotShift = PivotShift.pivotShift;

    static readonly sagSign = SagSign.sagSign;

    static readonly storkStandSiMobilityTest = StorkStandSIMobilityTest.storkStandSiMobilityTest


    static readonly jSign = JSign.jSign


    static readonly patellarBallottement = PatellarBallottement.patellarBallottement
    
    static readonly patellarCompression = PatellarCompression.patellarCompression

    
    static readonly patellarPassiveMobility = PatellarPassiveMobility.patellarPassiveMobility

    static readonly selectiveFunctionalMovementAssessment = SelectiveFunctionalMovementAssessment.selectiveFunctionalMovementAssessment;

    static readonly singleLegBridgeHold = SingleLegBridgeHold.singleLegBridgeHold;

    static readonly alarLigamentTest = AlarLigamentTest.alarLigamentTest;
    
    static readonly sideBridgePlank = SideBridgePlank.sideBridgePlank;
    static readonly pronePlank = PronePlank.pronePlank;
    static readonly singleLegHopTestForDistance = SingleLegHopTestForDistance.singleLegHopTestForDistance;
    static readonly gastrocnemiusLengthTest = GastrocnemiusLengthTest.gastrocnemiusLengthTest;
    static readonly soleusMuscleLengthTest = SoleusMuscleLengthTest.soleusMuscleLengthTest;
    static readonly thomasTest = ThomasTest.thomasTest;

    static readonly twoLegSquatWithOverheadReach = TwoLegSquatWithOverheadReach.twoLegSquatWithOverheadReach;
    static readonly oneLegSquatWithOverheadReach = OneLegSquatWithOverheadReach.oneLegSquatWithOverheadReach;
    static readonly liftingTest = MaterialHandlingBilateralLifting.liftingTest;
    static readonly nonMaterialHandling = NonMaterialHandling.nonMaterialHandling;

    static readonly cervicalQuadrant = CervicalQuadrantConfig.cervicalQuadrant;
    static readonly jawCrepitus = JawCrepitusConfig.jawCrepitus;
    static readonly spurlingsManeuver = SpurlingsManeuverConfig.spurlingsManeuver;
    static readonly alarLigamentTestManual = AlarLigamentTestManualConfig.alarLigamentTestManual;
    static readonly passiveJointMobilityShoulder = PassiveJointMobilityShoulderConfig.passiveJointMobilityShoulder;
    static readonly impingementConfig = ImpingementConfig.impingement;
    static readonly ghjStability = GhjStabilityConfig.ghjStability;
    static readonly labrumConfig = LabrumConfig.labrum;
    static readonly rotatorCuff = RotatorCuffConfig.rotatorCuff;
    static readonly ligamentIntegrityElbow = LigamentIntegrityElbowConfig.ligamentIntegrityElbow;
    static readonly ulnarNerveSubluxation = UlnarNerveSubluxationConfig.ulnarNerveSubluxation;
    static readonly siCompression = SiCompressionConfig.siCompression;
    static readonly siDistraction = SiDistractionConfig.siDistraction;
    static readonly legLengthConfig = LegLengthConfig.legLength;
    static readonly laseguesSlr = LaseguesSlrConfig.laseguesSlr;
}