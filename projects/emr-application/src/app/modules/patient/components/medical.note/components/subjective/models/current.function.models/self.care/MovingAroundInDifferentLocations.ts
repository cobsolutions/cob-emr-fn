import { WalkingBetweenRooms } from "./WalkingBetweenRooms";
import { WalkingDownTheStreet } from "./WalkingDownTheStreet";
import { MovingAroundUsingEquipment } from "./MovingAroundUsingEquipment";
import { MovingAroundUsingTransportation } from "./MovingAroundUsingTransportation";

export interface MovingAroundInDifferentLocations {
  walkingBetweenRooms: WalkingBetweenRooms;
  walkingDownTheStreet: WalkingDownTheStreet;
  walkingWithinABuilding: boolean;
  movingAroundUsingEquipment: MovingAroundUsingEquipment;
  movingAroundUsingTransportation: MovingAroundUsingTransportation;
}
