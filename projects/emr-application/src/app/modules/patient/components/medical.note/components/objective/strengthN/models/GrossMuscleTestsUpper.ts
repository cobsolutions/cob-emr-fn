import { CervicalGmtUpper } from './CervicalGmtUpper';
import { ElbowGmtUpper } from './ElbowGmtUpper';
import { ShoulderGmtUpper } from './ShoulderGmtUpper';
import { WristGmtUpper } from './WristGmtUpper';

export interface GrossMuscleTestsUpper {
  grossMuscleTestsUpper: boolean;
  cervicalGrossMuscleTestsUpper: boolean;
  cervicalGmtUpper: CervicalGmtUpper;
  shoulderGrossMuscleTestsUpper: boolean;
  shoulderGmtUpper: ShoulderGmtUpper;
  elbowGrossMuscleTestsUpper: boolean;
  elbowGmtUpper: ElbowGmtUpper;
  wristGrossMuscleTestsUpper: boolean;
  wristGmtUpper: WristGmtUpper;
}
