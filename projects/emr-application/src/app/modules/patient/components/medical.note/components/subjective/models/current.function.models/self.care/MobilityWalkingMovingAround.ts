import { IADLs } from "./IADLs";
import { UseOfAnAssistiveDevice } from "./UseOfAnAssistiveDevice";
import { Walking } from "./Walking";
import { MovingAround } from "./MovingAround";
import { MovingAroundInDifferentLocations } from "./MovingAroundInDifferentLocations";
import { NegotiateObstacles } from "./NegotiateObstacles";

export interface MobilityWalkingMovingAround {
  iADLs: IADLs;
  useOfAnAssistiveDevice: UseOfAnAssistiveDevice;
  walking: Walking;
  movingAround: MovingAround;
  movingAroundInDifferentLocations: MovingAroundInDifferentLocations;
  negotiateObstacles: NegotiateObstacles;
}
