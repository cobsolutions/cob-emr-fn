import { WalkingBetweenRooms } from "./WalkingBetweenRooms";
import { WalkingDownTheStreet } from "./WalkingDownTheStreet";
import { MovingAroundUsingEquipment } from "./MovingAroundUsingEquipment";
import { MovingAroundUsingTransportation } from "./MovingAroundUsingTransportation";

export interface MovingAroundInDifferentLocations {
  //"prior-level-function_mobility-walking-moving-around_different_locations_between_rooms": false,  
  walkingBetweenRoomsFlag:boolean;
  walkingBetweenRooms: WalkingBetweenRooms;

  // "prior-level-function_mobility-walking-moving-around_different_locations_down_street": false,
  walkingDownTheStreetFlag:boolean
  walkingDownTheStreet: WalkingDownTheStreet;

  // "prior-level-function_mobility-walking-moving-around_different_locations_within_building": false,
  walkingWithinABuilding: boolean;

  // "prior-level-function_mobility-walking-moving-around_different_locations_using_equipment": false,
  movingAroundUsingEquipmentFlag:boolean
  movingAroundUsingEquipment: MovingAroundUsingEquipment;

  // "prior-level-function_mobility-walking-moving-around_different_locations_using_transportation": false,
  movingAroundUsingTransportationFlag:boolean
  movingAroundUsingTransportation: MovingAroundUsingTransportation;
}
