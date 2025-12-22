import { HamstringFlexibilityTest } from "./flexibility/9090-hamstring-flexibility-test";
import { OberTest } from "./flexibility/ober-test";
import { ValgusStressAt0KneeFlex } from "./ligament-integrity-knee/valgus-stress-at-0-knee-flex";
import { CraigsTest } from "./structural/craigs-test";
import { TibialTorsion } from "./structural/tibial-torsion";

export class SpecialTestConfig {
    static readonly oberTestNoLabels = OberTest.oberTestNoLabels;
    static readonly ninetynineHamstringFlexibilityTestNoLabels = HamstringFlexibilityTest.ninetynineHamstringFlexibilityTestNoLabels;

    static readonly craigsTestNoLabels = CraigsTest.craigsTestNoLabels;
    
    static readonly tibialTorsionFieldTestNoLabels = TibialTorsion.tibialTorsionFieldTestNoLabels;

    

    static readonly valgusStressAt0KneeFlex = ValgusStressAt0KneeFlex.valgusStressAt0KneeFlex;

}