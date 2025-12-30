import { IADLs } from "./IADLs";
import { Walking } from "./Walking";
import { MovingAround } from "./MovingAround";
import { MovingAroundInDifferentLocations } from "./MovingAroundInDifferentLocations";
import { NegotiateObstacles } from "./NegotiateObstacles";

export interface MobilityWalkingMovingAround {
  //"current_functional_limitations_mobility-walking-moving-around_mobility_iadls
  iADLsFlag:boolean
  iADLs: IADLs;

  // "current_functional_limitations_mobility-walking-moving-around_assistive_device
  useOfAnAssistiveDevice: boolean;
  //"current_functional_limitations_mobility-walking-moving-around_walking
  walkingFlag:boolean;
  walking: Walking;

  // "current_functional_limitations_mobility-walking-moving-around_moving_around
  movingAroundFlag: boolean;
  movingAround: MovingAround;

  //current_functional_limitations_mobility-walking-moving-around_different_locations
  movingAroundInDifferentLocationsFlag:boolean;
  movingAroundInDifferentLocations: MovingAroundInDifferentLocations;

  // current_functional_limitations_mobility-walking-moving-around_negotiate_obstacles
  negotiateObstaclesFlag:boolean;
  negotiateObstacles: NegotiateObstacles;
}
