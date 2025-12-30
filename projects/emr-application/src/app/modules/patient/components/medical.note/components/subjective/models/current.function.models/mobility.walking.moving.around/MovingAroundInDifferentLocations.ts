import { WalkingBetweenRooms } from "./WalkingBetweenRooms";
import { WalkingDownTheStreet } from "./WalkingDownTheStreet";
import { MovingAroundUsingEquipment } from "./MovingAroundUsingEquipment";
import { MovingAroundUsingTransportation } from "./MovingAroundUsingTransportation";

export interface MovingAroundInDifferentLocations {
  // current_functional_limitations_mobility-walking-moving-around_different_locations_between_rooms
  walkingBetweenRoomsFlag:boolean;
  walkingBetweenRooms: WalkingBetweenRooms;

  // current_functional_limitations_mobility-walking-moving-around_different_locations_down_street
  walkingDownTheStreetFlag:boolean
  walkingDownTheStreet: WalkingDownTheStreet;

  // "prior-level-function_mobility-walking-moving-around_different_locations_within_building": false,
  walkingWithinABuilding: boolean;

  // current_functional_limitations_mobility-walking-moving-around_different_locations_using_equipment
  movingAroundUsingEquipmentFlag:boolean
  movingAroundUsingEquipment: MovingAroundUsingEquipment;

  // current_functional_limitations_mobility-walking-moving-around_different_locations_using_transportation
  movingAroundUsingTransportationFlag:boolean
  movingAroundUsingTransportation: MovingAroundUsingTransportation;
}
