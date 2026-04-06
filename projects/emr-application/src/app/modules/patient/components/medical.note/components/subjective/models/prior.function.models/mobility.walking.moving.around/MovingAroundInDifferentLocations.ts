import { WalkingBetweenRooms } from "./WalkingBetweenRooms";
import { WalkingDownTheStreet } from "./WalkingDownTheStreet";
import { MovingAroundUsingEquipment } from "./MovingAroundUsingEquipment";
import { MovingAroundUsingTransportation } from "./MovingAroundUsingTransportation";

export interface MovingAroundInDifferentLocations {
  //"prior-level-function_mobility-walking-moving-around_different_locations_between_rooms": false, 
  
  // "prior-level-function_mobility-walking-moving-around_different_locations": false,
  movingAroundInDifferentLocationsFlag:boolean; 
  walkingBetweenRooms: WalkingBetweenRooms;  
  walkingDownTheStreet: WalkingDownTheStreet;

  // "prior-level-function_mobility-walking-moving-around_different_locations_within_building": false,
  walkingWithinABuilding: boolean;

  
  movingAroundUsingEquipment: MovingAroundUsingEquipment;

  
  movingAroundUsingTransportation: MovingAroundUsingTransportation;
}
