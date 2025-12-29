import { IndexFingerAROMPROM } from "./IndexFingerAROMPROM";
import { MiddleFingerAROMPROM } from "./MiddleFingerAROMPROM";
import { RingFingerAROMPROM } from "./RingFingerAROMPROM";
import { SmallFingerAROMPROM } from "./SmallFingerAROMPROM";
import { ThumbAROMPROM } from "./ThumbAROMPROM";

export interface HandAROMPROM {
  handArromProm: boolean;
  calculateTotalRom: boolean;
  thumbAROMPROM: ThumbAROMPROM;
  indexFingerAROMPROM: IndexFingerAROMPROM;
  middleFingerAROMPROM: MiddleFingerAROMPROM;
  ringFingerAROMPROM: RingFingerAROMPROM;
  smallFingerAROMPROM: SmallFingerAROMPROM;
}
