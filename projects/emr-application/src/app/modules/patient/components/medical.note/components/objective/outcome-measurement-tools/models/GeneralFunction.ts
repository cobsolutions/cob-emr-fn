import { AUDITC } from "./AUDITC";
import { BarthelIndex } from "./BarthelIndex";
import { DynamicGaitIndex } from "./DynamicGaitIndex";
import { ElderAbuseSuspicionIndex } from "./ElderAbuseSuspicionIndex";
import { FallsEfficacyScale } from "./FallsEfficacyScale";
import { FiveTimeSitToStand } from "./FiveTimeSitToStand";
import { FOTOPatientInquiry } from "./FOTOPatientInquiry";
import { FunctionalReachTest } from "./FunctionalReachTest";
import { GeriatricDepressionScale } from "./GeriatricDepressionScale";
import { SLUMS } from "./SLUMS";
import { TimedUpandGo } from "./TimedUpandGo";

export interface GeneralFunction {
  generalFunction: boolean;
  timedUpandGo: TimedUpandGo;
  fiveTimeSitToStand: FiveTimeSitToStand;
  aUDITC: AUDITC;
  barthelIndex: BarthelIndex;
  fallsEfficacyScale: FallsEfficacyScale;
  dynamicGaitIndex: DynamicGaitIndex;
  functionalReachTest: FunctionalReachTest;
  sLUMS: SLUMS;
  geriatricDepressionScale: GeriatricDepressionScale;
  elderAbuseSuspicionIndex: ElderAbuseSuspicionIndex;
  fOTOPatientInquiry: FOTOPatientInquiry;
}
