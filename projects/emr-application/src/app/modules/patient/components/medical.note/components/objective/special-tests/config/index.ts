import { HamstringFlexibilityTest } from "./flexibility/9090-hamstring-flexibility-test";
import { OberTest } from "./flexibility/ober-test";
import { AnteriorDrawer } from "./ligament-integrity-knee/anterior-drawer";
import { PosteriorDrawer } from "./ligament-integrity-knee/posterior-drawer";
import { ValgusStressAt0KneeFlex } from "./ligament-integrity-knee/valgus-stress-at-0-knee-flex";
import { ValgusStressAt30KneeFlex } from "./ligament-integrity-knee/valgus-stress-at-30-knee-flex";
import { VarusStressAt0KneeFlex } from "./ligament-integrity-knee/varus-stress-at-0-knee-flex";
import { VarusStressAt30KneeFlex } from "./ligament-integrity-knee/varus-stress-at-30-knee-flex";
import { CraigsTest } from "./structural/craigs-test";
import { TibialTorsion } from "./structural/tibial-torsion";

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

    PosteriorDrawer
    static readonly posteriorDrawer = PosteriorDrawer.posteriorDrawer;
}