import { IADLs } from "./IADLs";
import { Walking } from "./Walking";
import { MovingAround } from "./MovingAround";
import { MovingAroundInDifferentLocations } from "./MovingAroundInDifferentLocations";
import { NegotiateObstacles } from "./NegotiateObstacles";

export interface MobilityWalkingMovingAround {
  //"prior-level-function_mobility-walking-moving-around_mobility_iadls": false,
  iADLsFlag:boolean
  iADLs: IADLs;

  // "prior-level-function_mobility-walking-moving-around_assistive_device": false,
  useOfAnAssistiveDevice: boolean;
  //"prior-level-function_mobility-walking-moving-around_walking": false,
  walkingFlag:boolean;
  walking: Walking;

  // "prior-level-function_mobility-walking-moving-around_moving_around": false,
  movingAroundFlag: boolean;
  movingAround: MovingAround;

  "prior-level-function_mobility-walking-moving-around_different_locations": false,
  movingAroundInDifferentLocationsFlag:boolean
  movingAroundInDifferentLocations: MovingAroundInDifferentLocations;

  // "prior-level-function_mobility-walking-moving-around_negotiate_obstacles": false,
  negotiateObstaclesFlag:boolean
  negotiateObstacles: NegotiateObstacles;
}
