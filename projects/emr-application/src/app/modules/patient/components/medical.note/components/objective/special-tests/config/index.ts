import { HamstringFlexibilityTest } from "./flexibility/9090-hamstring-flexibility-test";
import { OberTest } from "./flexibility/ober-test";
import { CraigsTest } from "./structural/craigs-test";
import { TibialTorsion } from "./structural/tibial-torsion";

export class SpecialTestConfig {
    static readonly oberTestNoLabels = OberTest.oberTestNoLabels;
    static readonly ninetynineHamstringFlexibilityTestNoLabels = HamstringFlexibilityTest.ninetynineHamstringFlexibilityTestNoLabels;

    static readonly craigsTestNoLabels = CraigsTest.craigsTestNoLabels;
    TibialTorsion
    static readonly tibialTorsionFieldTestNoLabels = TibialTorsion.tibialTorsionFieldTestNoLabels;

}