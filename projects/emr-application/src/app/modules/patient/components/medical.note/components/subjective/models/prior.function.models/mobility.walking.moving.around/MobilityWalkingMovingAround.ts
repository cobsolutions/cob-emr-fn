import { IADLs } from "./IADLs";
import { Walking } from "./Walking";
import { MovingAround } from "./MovingAround";
import { MovingAroundInDifferentLocations } from "./MovingAroundInDifferentLocations";
import { NegotiateObstacles } from "./NegotiateObstacles";

export interface MobilityWalkingMovingAround {
  //"prior-level-function_mobility-walking-moving-around"
  mobilityWalkingMovingAroundFlag?: boolean;
  
  iadls: IADLs;

  // "prior-level-function_mobility-walking-moving-around_assistive_device": false,
  useOfAnAssistiveDevice: boolean;
  walking: Walking;

  
  movingAround: MovingAround;

  
  movingAroundInDifferentLocations: MovingAroundInDifferentLocations;

  
  negotiateObstacles: NegotiateObstacles;
}
