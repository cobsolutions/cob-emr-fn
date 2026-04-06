import { FiveLevelGripData } from './FiveLevelGripData';
import { RapidExchangeData } from './RapidExchangeData';
import { RepeatedGripData } from './RepeatedGripData';

export interface GripPinch {
  gripPinch: boolean;
  gripPinchPowerGripRight: string;
  gripPinchPowerGripRightCustom: string;
  gripPinchPowerGripRightText: string;
  gripPinchPowerGripLeft: string;
  gripPinchPowerGripLeftCustom: string;
  gripPinchPowerGripLeftText: string;
  gripPinchLateralPinchRight: string;
  gripPinchLateralPinchRightCustom: string;
  gripPinchLateralPinchRightText: string;
  gripPinchLateralPinchLeft: string;
  gripPinchLateralPinchLeftCustom: string;
  gripPinchLateralPinchLeftText: string;
  gripPinchTipPinchpincerRight: string;
  gripPinchTipPinchpincerRightCustom: string;
  gripPinchTipPinchpincerRightText: string;
  gripPinchTipPinchpincerLeft: string;
  gripPinchTipPinchpincerLeftCustom: string;
  gripPinchTipPinchpincerLeftText: string;
  gripPinchTripodPinchRight: string;
  gripPinchTripodPinchRightCustom: string;
  gripPinchTripodPinchRightText: string;
  gripPinchTripodPinchLeft: string;
  gripPinchTripodPinchLeftCustom: string;
  gripPinchTripodPinchLeftText: string;
  gripPinchComments: string;
  rapidExchange: boolean;
  rapidExchangeData: RapidExchangeData;
  repeatedGrip: boolean;
  repeatedGripData: RepeatedGripData;
  fiveLevelGrip: boolean;
  fiveLevelGripData: FiveLevelGripData;
}
