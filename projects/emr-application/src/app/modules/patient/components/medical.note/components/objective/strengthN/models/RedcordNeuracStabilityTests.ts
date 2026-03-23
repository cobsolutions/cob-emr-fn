import { CervicalMovements } from './CervicalMovements';
import { CervicalMotorControlTestsData } from './CervicalMotorControlTests';
import { LumbarMotorControlTestsData } from './LumbarMotorControlTests';
import { UpperBodyMyofascialTestsData } from './UpperBodyMyofascialTests';
import { LowerBodyMyofascialTestsData } from './LowerBodyMyofascialTests';

export interface RedcordNeuracStabilityTests {
  redcordNeuracStabilityTests: boolean;
  upperBodyMyofascialTests: boolean;
  upperBodyMyofascialTestsData?: UpperBodyMyofascialTestsData;
  lowerBodyMyofascialTests: boolean;
  lowerBodyMyofascialTestsData?: LowerBodyMyofascialTestsData;
  cervicalMovements: boolean;
  cervicalMovementsData?: CervicalMovements;
  cervicalMotorControlTests: boolean;
  cervicalMotorControlTestsData?: CervicalMotorControlTestsData;
  lumbarMotorControlTests: boolean;
  lumbarMotorControlTestsData?: LumbarMotorControlTestsData;
}
