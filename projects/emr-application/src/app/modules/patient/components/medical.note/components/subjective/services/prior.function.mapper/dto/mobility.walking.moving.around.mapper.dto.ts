import { PriorFunction } from "../../../models";

export class MobilityWalkingMovingAroundDTOMapper{
    public static map(priorFunction: PriorFunction, setValue: (controlName: string, value: any) => void): void {
        if (!priorFunction.mobilityWalkingMovingAround) return;

        const mobility = priorFunction.mobilityWalkingMovingAround;

        // Mobility Walking Moving Around Category Flag
        setValue('prior-level-function_mobility-walking-moving-around', mobility.mobilityWalkingMovingAroundFlag);

        // IADLs
        if (mobility.iadls) {
          setValue('prior-level-function_mobility-walking-moving-around_mobility_iadls', mobility.iadls.iadlsFlag);
          setValue('prior-level-function_mobility-walking-moving-around_mobility_iadls_mobility_use_telephone', mobility.iadls.abilityToUseTelephone);
          setValue('prior-level-function_mobility-walking-moving-around_mobility_iadls_mobility_shopping', mobility.iadls.shopping);
          setValue('prior-level-function_mobility-walking-moving-around_mobility_iadls_mobility_food_prep', mobility.iadls.foodPreparation);
          setValue('prior-level-function_mobility-walking-moving-around_mobility_iadls_mobility_housekeeping', mobility.iadls.housekeeping);
          setValue('prior-level-function_mobility-walking-moving-around_mobility_iadls_mobility_laundry', mobility.iadls.laundry);
          setValue('prior-level-function_mobility-walking-moving-around_mobility_iadls_mobility_transportation', mobility.iadls.modeOfTransportation);
          setValue('prior-level-function_mobility-walking-moving-around_mobility_iadls_mobility_medications', mobility.iadls.responsibilityForOwnMedications);
          setValue('prior-level-function_mobility-walking-moving-around_mobility_iadls_mobility_finances', mobility.iadls.abilityToHandleFinances);
        }
    
        // Assistive Device
        setValue('prior-level-function_mobility-walking-moving-around_assistive_device', mobility.useOfAnAssistiveDevice);
    
        // Walking
        if (mobility.walking) {
          setValue('prior-level-function_mobility-walking-moving-around_walking', mobility.walking.walkingFlag);
          setValue('prior-level-function_mobility-walking-moving-around_walking_walking_forward', mobility.walking.forward);
          setValue('prior-level-function_mobility-walking-moving-around_walking_walking_backward', mobility.walking.backward);
          setValue('prior-level-function_mobility-walking-moving-around_walking_walking_sideways', mobility.walking.sideways);
          setValue('prior-level-function_mobility-walking-moving-around_walking_walking_strolling', mobility.walking.strolling);
          setValue('prior-level-function_mobility-walking-moving-around_walking_walking_surfaces', mobility.walking.walkingOnDifferentSurfaces);
          setValue('prior-level-function_mobility-walking-moving-around_walking_walking_obstacles', mobility.walking.walkingAroundObstacles);
        }
    
        // Moving Around
        if (mobility.movingAround) {
          setValue('prior-level-function_mobility-walking-moving-around_moving_around', mobility.movingAround.movingAroundFlag);
          setValue('prior-level-function_mobility-walking-moving-around_moving_around_climbing', mobility.movingAround.climbing);
          setValue('prior-level-function_mobility-walking-moving-around_moving_around_running', mobility.movingAround.running);
          setValue('prior-level-function_mobility-walking-moving-around_moving_around_jogging', mobility.movingAround.jogging);
          setValue('prior-level-function_mobility-walking-moving-around_moving_around_skipping', mobility.movingAround.skipping);
          setValue('prior-level-function_mobility-walking-moving-around_moving_around_jumping', mobility.movingAround.jumping);
          setValue('prior-level-function_mobility-walking-moving-around_moving_around_swimming', mobility.movingAround.swimming);
        }
    
        // Moving Around In Different Locations
        if (mobility.movingAroundInDifferentLocations) {
          setValue('prior-level-function_mobility-walking-moving-around_different_locations', mobility.movingAroundInDifferentLocations.movingAroundInDifferentLocationsFlag);
          const locations = mobility.movingAroundInDifferentLocations;
    
          if (locations.walkingBetweenRooms) {
            setValue('prior-level-function_mobility-walking-moving-around_different_locations_between_rooms', locations.walkingBetweenRooms.walkingBetweenRoomsFlag);
            setValue('prior-level-function_mobility-walking-moving-around_different_locations_between_rooms_stairs', locations.walkingBetweenRooms.stairs);
            setValue('prior-level-function_mobility-walking-moving-around_different_locations_between_rooms_in_home', locations.walkingBetweenRooms.inHome);
          }
    
          if (locations.walkingDownTheStreet) {
            setValue('prior-level-function_mobility-walking-moving-around_different_locations_down_street', locations.walkingDownTheStreet.walkingDownTheStreetFlag);
            setValue('prior-level-function_mobility-walking-moving-around_different_locations_down_street_community_distances', locations.walkingDownTheStreet.communityDistances);
          }
    
          setValue('prior-level-function_mobility-walking-moving-around_different_locations_within_building', locations.walkingWithinABuilding);
    
          if (locations.movingAroundUsingEquipment) {
            setValue('prior-level-function_mobility-walking-moving-around_different_locations_using_equipment', locations.movingAroundUsingEquipment.movingAroundUsingEquipmentFlag);
            setValue('prior-level-function_mobility-walking-moving-around_different_locations_using_equipment_walker', locations.movingAroundUsingEquipment.walker);
            setValue('prior-level-function_mobility-walking-moving-around_different_locations_using_equipment_wheelchair', locations.movingAroundUsingEquipment.wheelchair);
            setValue('prior-level-function_mobility-walking-moving-around_different_locations_using_equipment_skates', locations.movingAroundUsingEquipment.skates);
            setValue('prior-level-function_mobility-walking-moving-around_different_locations_using_equipment_skis', locations.movingAroundUsingEquipment.skis);
          }
    
          if (locations.movingAroundUsingTransportation) {
            setValue('prior-level-function_mobility-walking-moving-around_different_locations_using_transportation', locations.movingAroundUsingTransportation.movingAroundUsingTransportationFlag);
            setValue('prior-level-function_mobility-walking-moving-around_different_locations_using_transportation_on_off_bus', locations.movingAroundUsingTransportation.onOffBus);
            setValue('prior-level-function_mobility-walking-moving-around_different_locations_using_transportation_subway', locations.movingAroundUsingTransportation.subway);
            setValue('prior-level-function_mobility-walking-moving-around_different_locations_using_transportation_public_transport', locations.movingAroundUsingTransportation.publicTransportation);
          }
        }
    
        // Negotiate Obstacles
        if (mobility.negotiateObstacles) {
          setValue('prior-level-function_mobility-walking-moving-around_negotiate_obstacles', mobility.negotiateObstacles.negotiateObstaclesFlag);
          setValue('prior-level-function_mobility-walking-moving-around_negotiate_obstacles_crowded_streets', mobility.negotiateObstacles.bumpedInCrowdedStreets);
          setValue('prior-level-function_mobility-walking-moving-around_negotiate_obstacles_terrain', mobility.negotiateObstacles.terrain);
        }
      }
    
}