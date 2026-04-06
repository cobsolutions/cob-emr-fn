import { CurrentFunction } from "../../../models";

export class MobilityWalkingMovingAroundDTOMapper {
  public static map(currentFunction: CurrentFunction, setValue: (controlName: string, value: any) => void): void {
    if (!currentFunction.mobilityWalkingMovingAround) return;

    const mobility = currentFunction.mobilityWalkingMovingAround;

    // Mobility Walking Moving Around Category Flag
    setValue('current-level-function_mobility-walking-moving-around', mobility.mobilityWalkingMovingAroundFlag);

    // IADLs Flag
    setValue('current-level-function_mobility-walking-moving-around_mobility_iadls', mobility.iadls.iadlsFlag);

    // IADLs
    if (mobility.iadls) {
      setValue('current-level-function_mobility-walking-moving-around_mobility_iadls_mobility_use_telephone', mobility.iadls.abilityToUseTelephone);
      setValue('current-level-function_mobility-walking-moving-around_mobility_iadls_mobility_shopping', mobility.iadls.shopping);
      setValue('current-level-function_mobility-walking-moving-around_mobility_iadls_mobility_food_prep', mobility.iadls.foodPreparation);
      setValue('current-level-function_mobility-walking-moving-around_mobility_iadls_mobility_housekeeping', mobility.iadls.housekeeping);
      setValue('current-level-function_mobility-walking-moving-around_mobility_iadls_mobility_laundry', mobility.iadls.laundry);
      setValue('current-level-function_mobility-walking-moving-around_mobility_iadls_mobility_transportation', mobility.iadls.modeOfTransportation);
      setValue('current-level-function_mobility-walking-moving-around_mobility_iadls_mobility_medications', mobility.iadls.responsibilityForOwnMedications);
      setValue('current-level-function_mobility-walking-moving-around_mobility_iadls_mobility_finances', mobility.iadls.abilityToHandleFinances);
    }

    // Assistive Device
    setValue('current-level-function_mobility-walking-moving-around_assistive_device', mobility.useOfAnAssistiveDevice);

    // Walking Flag
    setValue('current-level-function_mobility-walking-moving-around_walking', mobility.walking.walkingFlag);

    // Walking
    if (mobility.walking) {
      setValue('current-level-function_mobility-walking-moving-around_walking_walking_forward', mobility.walking.forward);
      setValue('current-level-function_mobility-walking-moving-around_walking_walking_backward', mobility.walking.backward);
      setValue('current-level-function_mobility-walking-moving-around_walking_walking_sideways', mobility.walking.sideways);
      setValue('current-level-function_mobility-walking-moving-around_walking_walking_strolling', mobility.walking.strolling);
      setValue('current-level-function_mobility-walking-moving-around_walking_walking_surfaces', mobility.walking.walkingOnDifferentSurfaces);
      setValue('current-level-function_mobility-walking-moving-around_walking_walking_obstacles', mobility.walking.walkingAroundObstacles);
    }

    // Moving Around Flag
    setValue('current-level-function_mobility-walking-moving-around_moving_around', mobility.movingAround.movingAroundFlag);

    // Moving Around
    if (mobility.movingAround) {
      setValue('current-level-function_mobility-walking-moving-around_moving_around_climbing', mobility.movingAround.climbing);
      setValue('current-level-function_mobility-walking-moving-around_moving_around_running', mobility.movingAround.running);
      setValue('current-level-function_mobility-walking-moving-around_moving_around_jogging', mobility.movingAround.jogging);
      setValue('current-level-function_mobility-walking-moving-around_moving_around_skipping', mobility.movingAround.skipping);
      setValue('current-level-function_mobility-walking-moving-around_moving_around_jumping', mobility.movingAround.jumping);
      setValue('current-level-function_mobility-walking-moving-around_moving_around_swimming', mobility.movingAround.swimming);
    }

    // Moving Around In Different Locations Flag
    setValue('current-level-function_mobility-walking-moving-around_different_locations', mobility.movingAroundInDifferentLocations.movingAroundInDifferentLocationsFlag);

    // Moving Around In Different Locations
    if (mobility.movingAroundInDifferentLocations) {
      const locations = mobility.movingAroundInDifferentLocations;

      // Walking Between Rooms Flag
      setValue('current-level-function_mobility-walking-moving-around_different_locations_between_rooms', locations.walkingBetweenRooms.walkingBetweenRoomsFlag);

      if (locations.walkingBetweenRooms) {
        setValue('current-level-function_mobility-walking-moving-around_different_locations_between_rooms_stairs', locations.walkingBetweenRooms.stairs);
        setValue('current-level-function_mobility-walking-moving-around_different_locations_between_rooms_in_home', locations.walkingBetweenRooms.inHome);
      }

      // Walking Down The Street Flag
      setValue('current-level-function_mobility-walking-moving-around_different_locations_down_street', locations.walkingDownTheStreet.walkingDownTheStreetFlag);

      if (locations.walkingDownTheStreet) {
        setValue('current-level-function_mobility-walking-moving-around_different_locations_down_street_community_distances', locations.walkingDownTheStreet.communityDistances);
      }

      setValue('current-level-function_mobility-walking-moving-around_different_locations_within_building', locations.walkingWithinABuilding);

      // Moving Around Using Equipment Flag
      setValue('current-level-function_mobility-walking-moving-around_different_locations_using_equipment', locations.movingAroundUsingEquipment.movingAroundUsingEquipmentFlag);

      if (locations.movingAroundUsingEquipment) {
        setValue('current-level-function_mobility-walking-moving-around_different_locations_using_equipment_walker', locations.movingAroundUsingEquipment.walker);
        setValue('current-level-function_mobility-walking-moving-around_different_locations_using_equipment_wheelchair', locations.movingAroundUsingEquipment.wheelchair);
        setValue('current-level-function_mobility-walking-moving-around_different_locations_using_equipment_skates', locations.movingAroundUsingEquipment.skates);
        setValue('current-level-function_mobility-walking-moving-around_different_locations_using_equipment_skis', locations.movingAroundUsingEquipment.skis);
      }

      // Moving Around Using Transportation Flag
      setValue('current-level-function_mobility-walking-moving-around_different_locations_using_transportation', locations.movingAroundUsingTransportation.movingAroundUsingTransportationFlag);

      if (locations.movingAroundUsingTransportation) {
        setValue('current-level-function_mobility-walking-moving-around_different_locations_using_transportation_on_off_bus', locations.movingAroundUsingTransportation.onOffBus);
        setValue('current-level-function_mobility-walking-moving-around_different_locations_using_transportation_subway', locations.movingAroundUsingTransportation.subway);
        setValue('current-level-function_mobility-walking-moving-around_different_locations_using_transportation_public_transport', locations.movingAroundUsingTransportation.publicTransportation);
      }
    }

    // Negotiate Obstacles Flag
    setValue('current-level-function_mobility-walking-moving-around_negotiate_obstacles', mobility.negotiateObstacles.negotiateObstaclesFlag);

    // Negotiate Obstacles
    if (mobility.negotiateObstacles) {
      setValue('current-level-function_mobility-walking-moving-around_negotiate_obstacles_crowded_streets', mobility.negotiateObstacles.bumpedInCrowdedStreets);
      setValue('current-level-function_mobility-walking-moving-around_negotiate_obstacles_terrain', mobility.negotiateObstacles.terrain);
    }
  }

}