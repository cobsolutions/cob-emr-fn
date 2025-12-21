import { CranialNerveScreen } from "./cranial-nerve-screen-config";
import { DermatomesUpper } from "./dermatomes-upper";
import { MyotomesLower } from "./myotomes-lower";
import { MyotomesUpper } from "./myotomes-upper";

export class NeuroVascularConfig {

    static readonly cranialNerveScreen = CranialNerveScreen.cranialNerveScreen;

    static readonly myotomesUpperSelect = MyotomesUpper.myotomesUpperSelect;

    static readonly myotomesLowerSelect = MyotomesLower.myotomesLowerSelect;

    static readonly dermatomesUpperSelect = DermatomesUpper.dermatomesUpperSelect;
}