import { AllensTestCirculation } from "./allens-test-circulation";
import { CapillaryRefill } from "./capillary-refill";
import { CramTest } from "./cram-test";
import { CranialNerveScreen } from "./cranial-nerve-screen-config";
import { DermatomesLower } from "./dermatomes-lower";
import { DermatomesUpper } from "./dermatomes-upper";
import { HomansSign } from "./homans-sign";
import { KernigBrudzinskiTest } from "./kernigbrudzinski-test";
import { LaseguesSLR } from "./lasegues-slr";
import { LowerReflexes } from "./lower-reflexes";
import { MyotomesLower } from "./myotomes-lower";
import { MyotomesUpper } from "./myotomes-upper";
import { NeuralTissueTensionLower } from "./neural-tissue-tension-lower";
import { NeuralTissueTensionUpper } from "./neural-tissue-tension-upper";
import { ProneKneeBendNachlas } from "./prone-knee-bend-nachlas";
import { QuadrantTesting } from "./quadrant-testing";
import { SeatedDuralStretch } from "./seated-dural-stretch";
import { Slump } from "./slump";
import { ThoracicOutlet } from "./thoracic-outlet";
import { TinelsLower } from "./tinels-lower";
import { TinelsUpper } from "./tinels-upper";
import { UpperReflexes } from "./upper-reflexes";
import { Vascular } from "./vascular";

export class NeuroVascularConfig {

    static readonly cranialNerveScreen = CranialNerveScreen.cranialNerveScreen;

    static readonly myotomesUpperSelect = MyotomesUpper.myotomesUpperSelect;

    static readonly myotomesLowerSelect = MyotomesLower.myotomesLowerSelect;

    static readonly dermatomesUpperSelect = DermatomesUpper.dermatomesUpperSelect;

    static readonly dermatomesLower = DermatomesLower.dermatomesLower;

    static readonly upperReflexes = UpperReflexes.upperReflexes;

    static readonly lowerReflexes = LowerReflexes.lowerReflexes;

    static readonly neuralTissueTensionUpper = NeuralTissueTensionUpper.neuralTissueTensionUpper;

    static readonly neuralTissueTensionLower = NeuralTissueTensionLower.neuralTissueTensionLower;
    
    static readonly vascular = Vascular.vascular;

    

    static readonly allensTestCirculation = AllensTestCirculation.allensTestCirculation;
    
    static readonly capillaryRefill = CapillaryRefill.capillaryRefill;
    
    static readonly homansSign = HomansSign.homansSign;
    
    static readonly thoracicOutlet = ThoracicOutlet.thoracicOutlet;

    
    static readonly laseguesSLR = LaseguesSLR.laseguesSLR;

    
    static readonly slump = Slump.slump;
    
    static readonly quadrantTesting = QuadrantTesting.quadrantTesting;

    
    static readonly proneKneeBendNachlas = ProneKneeBendNachlas.proneKneeBendNachlas;

    
    static readonly kernigBrudzinskiTest = KernigBrudzinskiTest.kernigBrudzinskiTest;

    
    static readonly cramTest = CramTest.cramTest;

    
    static readonly seatedDuralStretch = SeatedDuralStretch.seatedDuralStretch;

    
    static readonly tinelsLower = TinelsLower.tinelsLower;
    
    static readonly tinelsUpper = TinelsUpper.tinelsUpper;
}