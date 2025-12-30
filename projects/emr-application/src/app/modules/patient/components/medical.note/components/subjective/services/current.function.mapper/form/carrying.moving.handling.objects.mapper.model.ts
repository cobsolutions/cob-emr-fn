import { FormGroup } from "@angular/forms";
import { CurrentFunction, PriorFunction } from "../../../models";


export class CarryingMovingHandlingObjectsMapper {
    public static map(formGroup: FormGroup, mapped: CurrentFunction, getValue: (controlName: string) => any): void {
        // ========== CARRYING MOVING HANDLING OBJECTS ==========
        const iADLsFlag = getValue('current-level-function_carrying-moving-handling-objects_carrying_iadls');
        if (iADLsFlag !== undefined) {
            if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
            mapped.carryingMovingHandlingObjects.iADLsFlag = iADLsFlag;
        }
        // Carrying IADLs
        const carryingTelephone = getValue('current-level-function_carrying-moving-handling-objects_carrying_iadls_carrying_use_telephone');
        if (carryingTelephone !== undefined) {
            if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
            if (!mapped.carryingMovingHandlingObjects.iADLs) mapped.carryingMovingHandlingObjects.iADLs = {} as any;
            mapped.carryingMovingHandlingObjects.iADLs.abilityToUseTelephone = carryingTelephone;
        }

        const carryingShopping = getValue('current-level-function_carrying-moving-handling-objects_carrying_iadls_carrying_shopping');
        if (carryingShopping !== undefined) {
            if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
            if (!mapped.carryingMovingHandlingObjects.iADLs) mapped.carryingMovingHandlingObjects.iADLs = {} as any;
            mapped.carryingMovingHandlingObjects.iADLs.shopping = carryingShopping;
        }

        const carryingFoodPrep = getValue('current-level-function_carrying-moving-handling-objects_carrying_iadls_carrying_food_prep');
        if (carryingFoodPrep !== undefined) {
            if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
            if (!mapped.carryingMovingHandlingObjects.iADLs) mapped.carryingMovingHandlingObjects.iADLs = {} as any;
            mapped.carryingMovingHandlingObjects.iADLs.foodPreparation = carryingFoodPrep;
        }

        const carryingHousekeeping = getValue('current-level-function_carrying-moving-handling-objects_carrying_iadls_carrying_housekeeping');
        if (carryingHousekeeping !== undefined) {
            if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
            if (!mapped.carryingMovingHandlingObjects.iADLs) mapped.carryingMovingHandlingObjects.iADLs = {} as any;
            mapped.carryingMovingHandlingObjects.iADLs.housekeeping = carryingHousekeeping;
        }

        const carryingLaundry = getValue('current-level-function_carrying-moving-handling-objects_carrying_iadls_carrying_laundry');
        if (carryingLaundry !== undefined) {
            if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
            if (!mapped.carryingMovingHandlingObjects.iADLs) mapped.carryingMovingHandlingObjects.iADLs = {} as any;
            mapped.carryingMovingHandlingObjects.iADLs.laundry = carryingLaundry;
        }

        const carryingTransportation = getValue('current-level-function_carrying-moving-handling-objects_carrying_iadls_carrying_transportation');
        if (carryingTransportation !== undefined) {
            if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
            if (!mapped.carryingMovingHandlingObjects.iADLs) mapped.carryingMovingHandlingObjects.iADLs = {} as any;
            mapped.carryingMovingHandlingObjects.iADLs.modeOfTransportation = carryingTransportation;
        }

        const carryingMedications = getValue('current-level-function_carrying-moving-handling-objects_carrying_iadls_carrying_medications');
        if (carryingMedications !== undefined) {
            if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
            if (!mapped.carryingMovingHandlingObjects.iADLs) mapped.carryingMovingHandlingObjects.iADLs = {} as any;
            mapped.carryingMovingHandlingObjects.iADLs.responsibilityForOwnMedications = carryingMedications;
        }

        const carryingFinances = getValue('current-level-function_carrying-moving-handling-objects_carrying_iadls_carrying_finances');
        if (carryingFinances !== undefined) {
            if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
            if (!mapped.carryingMovingHandlingObjects.iADLs) mapped.carryingMovingHandlingObjects.iADLs = {} as any;
            mapped.carryingMovingHandlingObjects.iADLs.abilityToHandleFinances = carryingFinances;
        }

        const handArmUseFlag = getValue('current-level-function_carrying-moving-handling-objects_hand_arm_use');
        if (handArmUseFlag !== undefined) {
            if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
            mapped.carryingMovingHandlingObjects.handArmUseFlag = handArmUseFlag;
        }
        // Hand Arm Use
        const pullingObjects = getValue('current-level-function_carrying-moving-handling-objects_hand_arm_use_pulling_objects');
        if (pullingObjects !== undefined) {
            if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
            if (!mapped.carryingMovingHandlingObjects.handArmUse) mapped.carryingMovingHandlingObjects.handArmUse = {} as any;
            mapped.carryingMovingHandlingObjects.handArmUse.pullingObjects = pullingObjects;
        }

        const pushingObjects = getValue('current-level-function_carrying-moving-handling-objects_hand_arm_use_pushing_objects');
        if (pushingObjects !== undefined) {
            if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
            if (!mapped.carryingMovingHandlingObjects.handArmUse) mapped.carryingMovingHandlingObjects.handArmUse = {} as any;
            mapped.carryingMovingHandlingObjects.handArmUse.pushingObjects = pushingObjects;
        }

        const reaching = getValue('current-level-function_carrying-moving-handling-objects_hand_arm_use_reaching');
        if (reaching !== undefined) {
            if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
            if (!mapped.carryingMovingHandlingObjects.handArmUse) mapped.carryingMovingHandlingObjects.handArmUse = {} as any;
            mapped.carryingMovingHandlingObjects.handArmUse.reaching = reaching;
        }

        const turningHandsArms = getValue('current-level-function_carrying-moving-handling-objects_hand_arm_use_turning_hands_arms');
        if (turningHandsArms !== undefined) {
            if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
            if (!mapped.carryingMovingHandlingObjects.handArmUse) mapped.carryingMovingHandlingObjects.handArmUse = {} as any;
            mapped.carryingMovingHandlingObjects.handArmUse.turningHandsOrArms = turningHandsArms;
        }

        const twistingHandsArms = getValue('current-level-function_carrying-moving-handling-objects_hand_arm_use_twisting_hands_arms');
        if (twistingHandsArms !== undefined) {
            if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
            if (!mapped.carryingMovingHandlingObjects.handArmUse) mapped.carryingMovingHandlingObjects.handArmUse = {} as any;
            mapped.carryingMovingHandlingObjects.handArmUse.twistingHandsOrArms = twistingHandsArms;
        }

        const throwing = getValue('current-level-function_carrying-moving-handling-objects_hand_arm_use_throwing');
        if (throwing !== undefined) {
            if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
            if (!mapped.carryingMovingHandlingObjects.handArmUse) mapped.carryingMovingHandlingObjects.handArmUse = {} as any;
            mapped.carryingMovingHandlingObjects.handArmUse.throwing = throwing;
        }

        const catching = getValue('current-level-function_carrying-moving-handling-objects_hand_arm_use_catching');
        if (catching !== undefined) {
            if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
            if (!mapped.carryingMovingHandlingObjects.handArmUse) mapped.carryingMovingHandlingObjects.handArmUse = {} as any;
            mapped.carryingMovingHandlingObjects.handArmUse.catching = catching;
        }

        const fineHandUseFlag = getValue('current-level-function_carrying-moving-handling-objects_fine_hand_use');
        if (iADLsFlag !== undefined) {
            if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
            mapped.carryingMovingHandlingObjects.fineHandUseFlag = fineHandUseFlag;
        }
        // Fine Hand Use
        const pickingUp = getValue('current-level-function_carrying-moving-handling-objects_fine_hand_use_picking_up');
        if (pickingUp !== undefined) {
            if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
            if (!mapped.carryingMovingHandlingObjects.fineHandUse) mapped.carryingMovingHandlingObjects.fineHandUse = {} as any;
            mapped.carryingMovingHandlingObjects.fineHandUse.pickingUp = pickingUp;
        }

        const grasping = getValue('current-level-function_carrying-moving-handling-objects_fine_hand_use_grasping');
        if (grasping !== undefined) {
            if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
            if (!mapped.carryingMovingHandlingObjects.fineHandUse) mapped.carryingMovingHandlingObjects.fineHandUse = {} as any;
            mapped.carryingMovingHandlingObjects.fineHandUse.grasping = grasping;
        }

        const manipulating = getValue('current-level-function_carrying-moving-handling-objects_fine_hand_use_manipulating');
        if (manipulating !== undefined) {
            if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
            if (!mapped.carryingMovingHandlingObjects.fineHandUse) mapped.carryingMovingHandlingObjects.fineHandUse = {} as any;
            mapped.carryingMovingHandlingObjects.fineHandUse.manipulating = manipulating;
        }

        const releasing = getValue('current-level-function_carrying-moving-handling-objects_fine_hand_use_releasing');
        if (releasing !== undefined) {
            if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
            if (!mapped.carryingMovingHandlingObjects.fineHandUse) mapped.carryingMovingHandlingObjects.fineHandUse = {} as any;
            mapped.carryingMovingHandlingObjects.fineHandUse.releasing = releasing;
        }

        const movingObjectsWithLowerExtremitiesFlag = getValue('current-level-function_carrying-moving-handling-objects_lower_extremities');
        if (movingObjectsWithLowerExtremitiesFlag !== undefined) {
            if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
            mapped.carryingMovingHandlingObjects.movingObjectsWithLowerExtremitiesFlag = movingObjectsWithLowerExtremitiesFlag;
        }
        // Moving Objects With Lower Extremities
        const kicking = getValue('current-level-function_carrying-moving-handling-objects_lower_extremities_kicking');
        if (kicking !== undefined) {
            if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
            if (!mapped.carryingMovingHandlingObjects.movingObjectsWithLowerExtremities) mapped.carryingMovingHandlingObjects.movingObjectsWithLowerExtremities = {} as any;
            mapped.carryingMovingHandlingObjects.movingObjectsWithLowerExtremities.kicking = kicking;
        }

        const pushingLowerExtremities = getValue('current-level-function_carrying-moving-handling-objects_lower_extremities_pushing_lower_extremities');
        if (pushingLowerExtremities !== undefined) {
            if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
            if (!mapped.carryingMovingHandlingObjects.movingObjectsWithLowerExtremities) mapped.carryingMovingHandlingObjects.movingObjectsWithLowerExtremities = {} as any;
            mapped.carryingMovingHandlingObjects.movingObjectsWithLowerExtremities.pushingWithLowerExtremities = pushingLowerExtremities;
        }

        // Community Integration
        const communityIntegration = getValue('current-level-function_carrying-moving-handling-objects_community_integration');
        if (communityIntegration !== undefined) {
            if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
            mapped.carryingMovingHandlingObjects.communityIntegrationAccess = communityIntegration;
        }

        // Work Vocation
        const workVocation = getValue('current-level-function_carrying-moving-handling-objects_work_vocation');
        if (workVocation !== undefined) {
            if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
            mapped.carryingMovingHandlingObjects.workVocationOccupation = workVocation;
        }
        const recreationFlag = getValue('current-level-function_carrying-moving-handling-objects_recreation');
        if (iADLsFlag !== undefined) {
            if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
            mapped.carryingMovingHandlingObjects.recreationFlag = recreationFlag;
        }

        // Recreation
        const recreationSports = getValue('current-level-function_carrying-moving-handling-objects_recreation_sports');
        if (recreationSports !== undefined) {
            if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
            if (!mapped.carryingMovingHandlingObjects.recreation) mapped.carryingMovingHandlingObjects.recreation = {} as any;
            mapped.carryingMovingHandlingObjects.recreation.sports = recreationSports;
        }
    }
}