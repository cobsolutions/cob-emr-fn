import { CranialNerveScreen } from "./cranial-nerve-screen-config";
import { DermatomesLower } from "./dermatomes-lower";
import { DermatomesUpper } from "./dermatomes-upper";
import { LowerReflexes } from "./lower-reflexes";
import { MyotomesLower } from "./myotomes-lower";
import { MyotomesUpper } from "./myotomes-upper";
import { UpperReflexes } from "./upper-reflexes";

export class NeuroVascularConfig {

    static readonly cranialNerveScreen = CranialNerveScreen.cranialNerveScreen;

    static readonly myotomesUpperSelect = MyotomesUpper.myotomesUpperSelect;

    static readonly myotomesLowerSelect = MyotomesLower.myotomesLowerSelect;

    static readonly dermatomesUpperSelect = DermatomesUpper.dermatomesUpperSelect;

    static readonly dermatomesLower = DermatomesLower.dermatomesLower;

    static readonly upperReflexes = UpperReflexes.upperReflexes;
    
    static readonly lowerReflexes = LowerReflexes.lowerReflexes;
    
}