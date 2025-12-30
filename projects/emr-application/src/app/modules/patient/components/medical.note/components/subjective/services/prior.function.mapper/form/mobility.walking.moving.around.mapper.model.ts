import { FormGroup } from "@angular/forms";
import { PriorFunction } from "../../../models";


export class MobilityWalkingMovingAroundMapper{
    public static map(formGroup: FormGroup, mapped: PriorFunction, getValue: (controlName: string) => any): void {
        // ========== MOBILITY WALKING MOVING AROUND ==========
    
        // IADLs Flag
        const mobilityIADLsFlag = getValue('prior-level-function_mobility-walking-moving-around_mobility_iadls');
        if (mobilityIADLsFlag !== undefined) {
          if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
          mapped.mobilityWalkingMovingAround.iADLsFlag = mobilityIADLsFlag;
        }
    
        // IADLs
        const mobilityIADLsTelephone = getValue('prior-level-function_mobility-walking-moving-around_mobility_iadls_mobility_use_telephone');
        if (mobilityIADLsTelephone !== undefined) {
          if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
          if (!mapped.mobilityWalkingMovingAround.iADLs) mapped.mobilityWalkingMovingAround.iADLs = {} as any;
          mapped.mobilityWalkingMovingAround.iADLs.abilityToUseTelephone = mobilityIADLsTelephone;
        }
    
        const mobilityIADLsShopping = getValue('prior-level-function_mobility-walking-moving-around_mobility_iadls_mobility_shopping');
        if (mobilityIADLsShopping !== undefined) {
          if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
          if (!mapped.mobilityWalkingMovingAround.iADLs) mapped.mobilityWalkingMovingAround.iADLs = {} as any;
          mapped.mobilityWalkingMovingAround.iADLs.shopping = mobilityIADLsShopping;
        }
    
        const mobilityIADLsFoodPrep = getValue('prior-level-function_mobility-walking-moving-around_mobility_iadls_mobility_food_prep');
        if (mobilityIADLsFoodPrep !== undefined) {
          if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
          if (!mapped.mobilityWalkingMovingAround.iADLs) mapped.mobilityWalkingMovingAround.iADLs = {} as any;
          mapped.mobilityWalkingMovingAround.iADLs.foodPreparation = mobilityIADLsFoodPrep;
        }
    
        const mobilityIADLsHousekeeping = getValue('prior-level-function_mobility-walking-moving-around_mobility_iadls_mobility_housekeeping');
        if (mobilityIADLsHousekeeping !== undefined) {
          if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
          if (!mapped.mobilityWalkingMovingAround.iADLs) mapped.mobilityWalkingMovingAround.iADLs = {} as any;
          mapped.mobilityWalkingMovingAround.iADLs.housekeeping = mobilityIADLsHousekeeping;
        }
    
        const mobilityIADLsLaundry = getValue('prior-level-function_mobility-walking-moving-around_mobility_iadls_mobility_laundry');
        if (mobilityIADLsLaundry !== undefined) {
          if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
          if (!mapped.mobilityWalkingMovingAround.iADLs) mapped.mobilityWalkingMovingAround.iADLs = {} as any;
          mapped.mobilityWalkingMovingAround.iADLs.laundry = mobilityIADLsLaundry;
        }
    
        const mobilityIADLsTransportation = getValue('prior-level-function_mobility-walking-moving-around_mobility_iadls_mobility_transportation');
        if (mobilityIADLsTransportation !== undefined) {
          if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
          if (!mapped.mobilityWalkingMovingAround.iADLs) mapped.mobilityWalkingMovingAround.iADLs = {} as any;
          mapped.mobilityWalkingMovingAround.iADLs.modeOfTransportation = mobilityIADLsTransportation;
        }
    
        const mobilityIADLsMedications = getValue('prior-level-function_mobility-walking-moving-around_mobility_iadls_mobility_medications');
        if (mobilityIADLsMedications !== undefined) {
          if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
          if (!mapped.mobilityWalkingMovingAround.iADLs) mapped.mobilityWalkingMovingAround.iADLs = {} as any;
          mapped.mobilityWalkingMovingAround.iADLs.responsibilityForOwnMedications = mobilityIADLsMedications;
        }
    
        const mobilityIADLsFinances = getValue('prior-level-function_mobility-walking-moving-around_mobility_iadls_mobility_finances');
        if (mobilityIADLsFinances !== undefined) {
          if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
          if (!mapped.mobilityWalkingMovingAround.iADLs) mapped.mobilityWalkingMovingAround.iADLs = {} as any;
          mapped.mobilityWalkingMovingAround.iADLs.abilityToHandleFinances = mobilityIADLsFinances;
        }
    
        // Assistive Device
        const assistiveDevice = getValue('prior-level-function_mobility-walking-moving-around_assistive_device');
        if (assistiveDevice !== undefined) {
          if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
          mapped.mobilityWalkingMovingAround.useOfAnAssistiveDevice = assistiveDevice;
        }
    
        // Walking Flag
        const walkingFlag = getValue('prior-level-function_mobility-walking-moving-around_walking');
        if (walkingFlag !== undefined) {
          if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
          mapped.mobilityWalkingMovingAround.walkingFlag = walkingFlag;
        }
    
        // Walking
        const walkingForward = getValue('prior-level-function_mobility-walking-moving-around_walking_walking_forward');
        if (walkingForward !== undefined) {
          if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
          if (!mapped.mobilityWalkingMovingAround.walking) mapped.mobilityWalkingMovingAround.walking = {} as any;
          mapped.mobilityWalkingMovingAround.walking.forward = walkingForward;
        }
    
        const walkingBackward = getValue('prior-level-function_mobility-walking-moving-around_walking_walking_backward');
        if (walkingBackward !== undefined) {
          if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
          if (!mapped.mobilityWalkingMovingAround.walking) mapped.mobilityWalkingMovingAround.walking = {} as any;
          mapped.mobilityWalkingMovingAround.walking.backward = walkingBackward;
        }
    
        const walkingSideways = getValue('prior-level-function_mobility-walking-moving-around_walking_walking_sideways');
        if (walkingSideways !== undefined) {
          if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
          if (!mapped.mobilityWalkingMovingAround.walking) mapped.mobilityWalkingMovingAround.walking = {} as any;
          mapped.mobilityWalkingMovingAround.walking.sideways = walkingSideways;
        }
    
        const walkingStrolling = getValue('prior-level-function_mobility-walking-moving-around_walking_walking_strolling');
        if (walkingStrolling !== undefined) {
          if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
          if (!mapped.mobilityWalkingMovingAround.walking) mapped.mobilityWalkingMovingAround.walking = {} as any;
          mapped.mobilityWalkingMovingAround.walking.strolling = walkingStrolling;
        }
    
        const walkingSurfaces = getValue('prior-level-function_mobility-walking-moving-around_walking_walking_surfaces');
        if (walkingSurfaces !== undefined) {
          if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
          if (!mapped.mobilityWalkingMovingAround.walking) mapped.mobilityWalkingMovingAround.walking = {} as any;
          mapped.mobilityWalkingMovingAround.walking.walkingOnDifferentSurfaces = walkingSurfaces;
        }
    
        const walkingObstacles = getValue('prior-level-function_mobility-walking-moving-around_walking_walking_obstacles');
        if (walkingObstacles !== undefined) {
          if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
          if (!mapped.mobilityWalkingMovingAround.walking) mapped.mobilityWalkingMovingAround.walking = {} as any;
          mapped.mobilityWalkingMovingAround.walking.walkingAroundObstacles = walkingObstacles;
        }
    
        // Moving Around Flag
        const movingAroundFlag = getValue('prior-level-function_mobility-walking-moving-around_moving_around');
        if (movingAroundFlag !== undefined) {
          if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
          mapped.mobilityWalkingMovingAround.movingAroundFlag = movingAroundFlag;
        }
    
        // Moving Around
        const climbing = getValue('prior-level-function_mobility-walking-moving-around_moving_around_climbing');
        if (climbing !== undefined) {
          if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
          if (!mapped.mobilityWalkingMovingAround.movingAround) mapped.mobilityWalkingMovingAround.movingAround = {} as any;
          mapped.mobilityWalkingMovingAround.movingAround.climbing = climbing;
        }
    
        const running = getValue('prior-level-function_mobility-walking-moving-around_moving_around_running');
        if (running !== undefined) {
          if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
          if (!mapped.mobilityWalkingMovingAround.movingAround) mapped.mobilityWalkingMovingAround.movingAround = {} as any;
          mapped.mobilityWalkingMovingAround.movingAround.running = running;
        }
    
        const jogging = getValue('prior-level-function_mobility-walking-moving-around_moving_around_jogging');
        if (jogging !== undefined) {
          if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
          if (!mapped.mobilityWalkingMovingAround.movingAround) mapped.mobilityWalkingMovingAround.movingAround = {} as any;
          mapped.mobilityWalkingMovingAround.movingAround.jogging = jogging;
        }
    
        const skipping = getValue('prior-level-function_mobility-walking-moving-around_moving_around_skipping');
        if (skipping !== undefined) {
          if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
          if (!mapped.mobilityWalkingMovingAround.movingAround) mapped.mobilityWalkingMovingAround.movingAround = {} as any;
          mapped.mobilityWalkingMovingAround.movingAround.skipping = skipping;
        }
    
        const jumping = getValue('prior-level-function_mobility-walking-moving-around_moving_around_jumping');
        if (jumping !== undefined) {
          if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
          if (!mapped.mobilityWalkingMovingAround.movingAround) mapped.mobilityWalkingMovingAround.movingAround = {} as any;
          mapped.mobilityWalkingMovingAround.movingAround.jumping = jumping;
        }
    
        const swimming = getValue('prior-level-function_mobility-walking-moving-around_moving_around_swimming');
        if (swimming !== undefined) {
          if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
          if (!mapped.mobilityWalkingMovingAround.movingAround) mapped.mobilityWalkingMovingAround.movingAround = {} as any;
          mapped.mobilityWalkingMovingAround.movingAround.swimming = swimming;
        }
    
        // Moving Around In Different Locations Flag
        const movingAroundInDifferentLocationsFlag = getValue('prior-level-function_mobility-walking-moving-around_different_locations');
        if (movingAroundInDifferentLocationsFlag !== undefined) {
          if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
          mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocationsFlag = movingAroundInDifferentLocationsFlag;
        }
    
        // Moving Around In Different Locations - Walking Between Rooms Flag
        const walkingBetweenRoomsFlag = getValue('prior-level-function_mobility-walking-moving-around_different_locations_between_rooms');
        if (walkingBetweenRoomsFlag !== undefined) {
          if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
          if (!mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations) mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations = {} as any;
          mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations.walkingBetweenRoomsFlag = walkingBetweenRoomsFlag;
        }
    
        // Moving Around In Different Locations
        const betweenRoomsStairs = getValue('prior-level-function_mobility-walking-moving-around_different_locations_between_rooms_stairs');
        if (betweenRoomsStairs !== undefined) {
          if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
          if (!mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations) mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations = {} as any;
          if (!mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations.walkingBetweenRooms) mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations.walkingBetweenRooms = {} as any;
          mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations.walkingBetweenRooms.stairs = betweenRoomsStairs;
        }
    
        const betweenRoomsInHome = getValue('prior-level-function_mobility-walking-moving-around_different_locations_between_rooms_in_home');
        if (betweenRoomsInHome !== undefined) {
          if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
          if (!mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations) mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations = {} as any;
          if (!mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations.walkingBetweenRooms) mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations.walkingBetweenRooms = {} as any;
          mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations.walkingBetweenRooms.inHome = betweenRoomsInHome;
        }
    
        // Walking Down The Street Flag
        const walkingDownTheStreetFlag = getValue('prior-level-function_mobility-walking-moving-around_different_locations_down_street');
        if (walkingDownTheStreetFlag !== undefined) {
          if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
          if (!mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations) mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations = {} as any;
          mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations.walkingDownTheStreetFlag = walkingDownTheStreetFlag;
        }
    
        const downStreetCommunity = getValue('prior-level-function_mobility-walking-moving-around_different_locations_down_street_community_distances');
        if (downStreetCommunity !== undefined) {
          if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
          if (!mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations) mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations = {} as any;
          if (!mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations.walkingDownTheStreet) mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations.walkingDownTheStreet = {} as any;
          mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations.walkingDownTheStreet.communityDistances = downStreetCommunity;
        }
    
        const withinBuilding = getValue('prior-level-function_mobility-walking-moving-around_different_locations_within_building');
        if (withinBuilding !== undefined) {
          if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
          if (!mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations) mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations = {} as any;
          mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations.walkingWithinABuilding = withinBuilding;
        }
    
        const equipmentWalker = getValue('prior-level-function_mobility-walking-moving-around_different_locations_using_equipment_walker');
        if (equipmentWalker !== undefined) {
          if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
          if (!mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations) mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations = {} as any;
          if (!mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations.movingAroundUsingEquipment) mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations.movingAroundUsingEquipment = {} as any;
          mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations.movingAroundUsingEquipment.walker = equipmentWalker;
        }
    
        const equipmentWheelchair = getValue('prior-level-function_mobility-walking-moving-around_different_locations_using_equipment_wheelchair');
        if (equipmentWheelchair !== undefined) {
          if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
          if (!mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations) mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations = {} as any;
          if (!mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations.movingAroundUsingEquipment) mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations.movingAroundUsingEquipment = {} as any;
          mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations.movingAroundUsingEquipment.wheelchair = equipmentWheelchair;
        }
    
        const equipmentSkates = getValue('prior-level-function_mobility-walking-moving-around_different_locations_using_equipment_skates');
        if (equipmentSkates !== undefined) {
          if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
          if (!mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations) mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations = {} as any;
          if (!mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations.movingAroundUsingEquipment) mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations.movingAroundUsingEquipment = {} as any;
          mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations.movingAroundUsingEquipment.skates = equipmentSkates;
        }
    
        const equipmentSkis = getValue('prior-level-function_mobility-walking-moving-around_different_locations_using_equipment_skis');
        if (equipmentSkis !== undefined) {
          if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
          if (!mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations) mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations = {} as any;
          if (!mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations.movingAroundUsingEquipment) mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations.movingAroundUsingEquipment = {} as any;
          mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations.movingAroundUsingEquipment.skis = equipmentSkis;
        }
    
        const transportOnOffBus = getValue('prior-level-function_mobility-walking-moving-around_different_locations_using_transportation_on_off_bus');
        if (transportOnOffBus !== undefined) {
          if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
          if (!mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations) mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations = {} as any;
          if (!mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations.movingAroundUsingTransportation) mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations.movingAroundUsingTransportation = {} as any;
          mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations.movingAroundUsingTransportation.onOffBus = transportOnOffBus;
        }
    
        const transportSubway = getValue('prior-level-function_mobility-walking-moving-around_different_locations_using_transportation_subway');
        if (transportSubway !== undefined) {
          if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
          if (!mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations) mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations = {} as any;
          if (!mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations.movingAroundUsingTransportation) mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations.movingAroundUsingTransportation = {} as any;
          mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations.movingAroundUsingTransportation.subway = transportSubway;
        }
    
        const transportPublic = getValue('prior-level-function_mobility-walking-moving-around_different_locations_using_transportation_public_transport');
        if (transportPublic !== undefined) {
          if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
          if (!mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations) mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations = {} as any;
          if (!mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations.movingAroundUsingTransportation) mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations.movingAroundUsingTransportation = {} as any;
          mapped.mobilityWalkingMovingAround.movingAroundInDifferentLocations.movingAroundUsingTransportation.publicTransportation = transportPublic;
        }
    
        const negotiateObstaclesFlag = getValue('prior-level-function_mobility-walking-moving-around_negotiate_obstacles');
        if (negotiateObstaclesFlag !== undefined) {
          if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
          mapped.mobilityWalkingMovingAround.negotiateObstaclesFlag = negotiateObstaclesFlag;
        }
        // Negotiate Obstacles
        const crowdedStreets = getValue('prior-level-function_mobility-walking-moving-around_negotiate_obstacles_crowded_streets');
        if (crowdedStreets !== undefined) {
          if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
          if (!mapped.mobilityWalkingMovingAround.negotiateObstacles) mapped.mobilityWalkingMovingAround.negotiateObstacles = {} as any;
          mapped.mobilityWalkingMovingAround.negotiateObstacles.bumpedInCrowdedStreets = crowdedStreets;
        }
    
        const terrain = getValue('prior-level-function_mobility-walking-moving-around_negotiate_obstacles_terrain');
        if (terrain !== undefined) {
          if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
          if (!mapped.mobilityWalkingMovingAround.negotiateObstacles) mapped.mobilityWalkingMovingAround.negotiateObstacles = {} as any;
          mapped.mobilityWalkingMovingAround.negotiateObstacles.terrain = terrain;
        }
      }
}