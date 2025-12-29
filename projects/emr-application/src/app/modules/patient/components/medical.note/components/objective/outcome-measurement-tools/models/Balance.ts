import { ABCScale } from "./ABCScale";
import { Berg } from "./Berg";
import { FullertonAdvancedBalanceFABScale } from "./FullertonAdvancedBalanceFABScale";
import { mCTSIB } from "./mCTSIB";
import { Tinetti } from "./Tinetti";

export interface Balance {
  balance: boolean;
  aBCScale: ABCScale;
  mCTSIB: mCTSIB;
  tinetti: Tinetti;
  berg: Berg;
  fullertonAdvancedBalanceFABScale: FullertonAdvancedBalanceFABScale;
}
