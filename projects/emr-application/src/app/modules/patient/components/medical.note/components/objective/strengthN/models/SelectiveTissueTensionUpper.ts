import { BackRibsStt } from './BackRibsStt';
import { CervicalStt } from './CervicalStt';
import { ElbowStt } from './ElbowStt';
import { HandStt } from './HandStt';
import { ShoulderStt } from './ShoulderStt';
import { TrunkStt } from './TrunkStt';
import { WristStt } from './WristStt';

export interface SelectiveTissueTensionUpper {
  selectiveTissueTensionUpper: boolean;
  cervical: boolean;
  cervicalStt: CervicalStt;
  trunk: boolean;
  trunkStt: TrunkStt;
  backRibs: boolean;
  backRibsStt: BackRibsStt;
  shoulder: boolean;
  shoulderStt: ShoulderStt;
  elbow: boolean;
  elbowStt: ElbowStt;
  wrist: boolean;
  wristStt: WristStt;
  hand: boolean;
  handStt: HandStt;
}
