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

}