import { IADLs } from "./IADLs";
import { Walking } from "./Walking";
import { MovingAround } from "./MovingAround";
import { MovingAroundInDifferentLocations } from "./MovingAroundInDifferentLocations";
import { NegotiateObstacles } from "./NegotiateObstacles";

export interface MobilityWalkingMovingAround {
  //"prior-level-function_mobility-walking-moving-around_mobility_iadls": false,
  iADLs: IADLs;
  // "prior-level-function_mobility-walking-moving-around_assistive_device": false,
  useOfAnAssistiveDevice: boolean;
  //"prior-level-function_mobility-walking-moving-around_walking": false,
  walking: Walking;
  // "prior-level-function_mobility-walking-moving-around_moving_around": false,
  movingAround: MovingAround;
  "prior-level-function_mobility-walking-moving-around_different_locations": false,
  movingAroundInDifferentLocations: MovingAroundInDifferentLocations;
  // "prior-level-function_mobility-walking-moving-around_negotiate_obstacles": false,
  negotiateObstacles: NegotiateObstacles;
}
