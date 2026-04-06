import { FormGroup } from "@angular/forms";
import { PriorFunction } from "../../../models";


export class CarryingMovingHandlingObjectsMapper {
    public static map(formGroup: FormGroup, mapped: PriorFunction, getValue: (controlName: string) => any): void {
        // ========== CARRYING MOVING HANDLING OBJECTS ==========

        // Carrying Moving Handling Objects Category Flag
        const carryingMovingHandlingObjectsFlag = getValue('prior-level-function_carrying-moving-handling-objects');
        if (carryingMovingHandlingObjectsFlag !== undefined) {
            if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
            mapped.carryingMovingHandlingObjects.carryingMovingHandlingObjectsFlag = carryingMovingHandlingObjectsFlag;
        }

        const iADLsFlag = getValue('prior-level-function_carrying-moving-handling-objects_carrying_iadls');
        if (iADLsFlag !== undefined) {
            if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
            if (!mapped.carryingMovingHandlingObjects.iadls) mapped.carryingMovingHandlingObjects.iadls = {} as any;
            mapped.carryingMovingHandlingObjects.iadls.iadlsFlag = iADLsFlag;
        }
        // Carrying IADLs
        const carryingTelephone = getValue('prior-level-function_carrying-moving-handling-objects_carrying_iadls_carrying_use_telephone');
        if (carryingTelephone !== undefined) {
            if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
            if (!mapped.carryingMovingHandlingObjects.iadls) mapped.carryingMovingHandlingObjects.iadls = {} as any;
            mapped.carryingMovingHandlingObjects.iadls.abilityToUseTelephone = carryingTelephone;
        }

        const carryingShopping = getValue('prior-level-function_carrying-moving-handling-objects_carrying_iadls_carrying_shopping');
        if (carryingShopping !== undefined) {
            if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
            if (!mapped.carryingMovingHandlingObjects.iadls) mapped.carryingMovingHandlingObjects.iadls = {} as any;
            mapped.carryingMovingHandlingObjects.iadls.shopping = carryingShopping;
        }

        const carryingFoodPrep = getValue('prior-level-function_carrying-moving-handling-objects_carrying_iadls_carrying_food_prep');
        if (carryingFoodPrep !== undefined) {
            if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
            if (!mapped.carryingMovingHandlingObjects.iadls) mapped.carryingMovingHandlingObjects.iadls = {} as any;
            mapped.carryingMovingHandlingObjects.iadls.foodPreparation = carryingFoodPrep;
        }

        const carryingHousekeeping = getValue('prior-level-function_carrying-moving-handling-objects_carrying_iadls_carrying_housekeeping');
        if (carryingHousekeeping !== undefined) {
            if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
            if (!mapped.carryingMovingHandlingObjects.iadls) mapped.carryingMovingHandlingObjects.iadls = {} as any;
            mapped.carryingMovingHandlingObjects.iadls.housekeeping = carryingHousekeeping;
        }

        const carryingLaundry = getValue('prior-level-function_carrying-moving-handling-objects_carrying_iadls_carrying_laundry');
        if (carryingLaundry !== undefined) {
            if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
            if (!mapped.carryingMovingHandlingObjects.iadls) mapped.carryingMovingHandlingObjects.iadls = {} as any;
            mapped.carryingMovingHandlingObjects.iadls.laundry = carryingLaundry;
        }

        const carryingTransportation = getValue('prior-level-function_carrying-moving-handling-objects_carrying_iadls_carrying_transportation');
        if (carryingTransportation !== undefined) {
            if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
            if (!mapped.carryingMovingHandlingObjects.iadls) mapped.carryingMovingHandlingObjects.iadls = {} as any;
            mapped.carryingMovingHandlingObjects.iadls.modeOfTransportation = carryingTransportation;
        }

        const carryingMedications = getValue('prior-level-function_carrying-moving-handling-objects_carrying_iadls_carrying_medications');
        if (carryingMedications !== undefined) {
            if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
            if (!mapped.carryingMovingHandlingObjects.iadls) mapped.carryingMovingHandlingObjects.iadls = {} as any;
            mapped.carryingMovingHandlingObjects.iadls.responsibilityForOwnMedications = carryingMedications;
        }

        const carryingFinances = getValue('prior-level-function_carrying-moving-handling-objects_carrying_iadls_carrying_finances');
        if (carryingFinances !== undefined) {
            if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
            if (!mapped.carryingMovingHandlingObjects.iadls) mapped.carryingMovingHandlingObjects.iadls = {} as any;
            mapped.carryingMovingHandlingObjects.iadls.abilityToHandleFinances = carryingFinances;
        }

        const handArmUseFlag = getValue('prior-level-function_carrying-moving-handling-objects_hand_arm_use');
        if (handArmUseFlag !== undefined) {
            if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
            if (!mapped.carryingMovingHandlingObjects.handArmUse) mapped.carryingMovingHandlingObjects.handArmUse = {} as any;
            mapped.carryingMovingHandlingObjects.handArmUse.handArmUseFlag = handArmUseFlag;
        }
        // Hand Arm Use
        const pullingObjects = getValue('prior-level-function_carrying-moving-handling-objects_hand_arm_use_pulling_objects');
        if (pullingObjects !== undefined) {
            if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
            if (!mapped.carryingMovingHandlingObjects.handArmUse) mapped.carryingMovingHandlingObjects.handArmUse = {} as any;
            mapped.carryingMovingHandlingObjects.handArmUse.pullingObjects = pullingObjects;
        }

        const pushingObjects = getValue('prior-level-function_carrying-moving-handling-objects_hand_arm_use_pushing_objects');
        if (pushingObjects !== undefined) {
            if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
            if (!mapped.carryingMovingHandlingObjects.handArmUse) mapped.carryingMovingHandlingObjects.handArmUse = {} as any;
            mapped.carryingMovingHandlingObjects.handArmUse.pushingObjects = pushingObjects;
        }

        const reaching = getValue('prior-level-function_carrying-moving-handling-objects_hand_arm_use_reaching');
        if (reaching !== undefined) {
            if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
            if (!mapped.carryingMovingHandlingObjects.handArmUse) mapped.carryingMovingHandlingObjects.handArmUse = {} as any;
            mapped.carryingMovingHandlingObjects.handArmUse.reaching = reaching;
        }

        const turningHandsArms = getValue('prior-level-function_carrying-moving-handling-objects_hand_arm_use_turning_hands_arms');
        if (turningHandsArms !== undefined) {
            if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
            if (!mapped.carryingMovingHandlingObjects.handArmUse) mapped.carryingMovingHandlingObjects.handArmUse = {} as any;
            mapped.carryingMovingHandlingObjects.handArmUse.turningHandsOrArms = turningHandsArms;
        }

        const twistingHandsArms = getValue('prior-level-function_carrying-moving-handling-objects_hand_arm_use_twisting_hands_arms');
        if (twistingHandsArms !== undefined) {
            if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
            if (!mapped.carryingMovingHandlingObjects.handArmUse) mapped.carryingMovingHandlingObjects.handArmUse = {} as any;
            mapped.carryingMovingHandlingObjects.handArmUse.twistingHandsOrArms = twistingHandsArms;
        }

        const throwing = getValue('prior-level-function_carrying-moving-handling-objects_hand_arm_use_throwing');
        if (throwing !== undefined) {
            if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
            if (!mapped.carryingMovingHandlingObjects.handArmUse) mapped.carryingMovingHandlingObjects.handArmUse = {} as any;
            mapped.carryingMovingHandlingObjects.handArmUse.throwing = throwing;
        }

        const catching = getValue('prior-level-function_carrying-moving-handling-objects_hand_arm_use_catching');
        if (catching !== undefined) {
            if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
            if (!mapped.carryingMovingHandlingObjects.handArmUse) mapped.carryingMovingHandlingObjects.handArmUse = {} as any;
            mapped.carryingMovingHandlingObjects.handArmUse.catching = catching;
        }

        const fineHandUseFlag = getValue('prior-level-function_carrying-moving-handling-objects_fine_hand_use');
        if (iADLsFlag !== undefined) {
            if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
            if (!mapped.carryingMovingHandlingObjects.fineHandUse) mapped.carryingMovingHandlingObjects.fineHandUse = {} as any;
            mapped.carryingMovingHandlingObjects.fineHandUse.fineHandUseFlag = fineHandUseFlag;
        }
        // Fine Hand Use
        const pickingUp = getValue('prior-level-function_carrying-moving-handling-objects_fine_hand_use_picking_up');
        if (pickingUp !== undefined) {
            if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
            if (!mapped.carryingMovingHandlingObjects.fineHandUse) mapped.carryingMovingHandlingObjects.fineHandUse = {} as any;
            mapped.carryingMovingHandlingObjects.fineHandUse.pickingUp = pickingUp;
        }

        const grasping = getValue('prior-level-function_carrying-moving-handling-objects_fine_hand_use_grasping');
        if (grasping !== undefined) {
            if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
            if (!mapped.carryingMovingHandlingObjects.fineHandUse) mapped.carryingMovingHandlingObjects.fineHandUse = {} as any;
            mapped.carryingMovingHandlingObjects.fineHandUse.grasping = grasping;
        }

        const manipulating = getValue('prior-level-function_carrying-moving-handling-objects_fine_hand_use_manipulating');
        if (manipulating !== undefined) {
            if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
            if (!mapped.carryingMovingHandlingObjects.fineHandUse) mapped.carryingMovingHandlingObjects.fineHandUse = {} as any;
            mapped.carryingMovingHandlingObjects.fineHandUse.manipulating = manipulating;
        }

        const releasing = getValue('prior-level-function_carrying-moving-handling-objects_fine_hand_use_releasing');
        if (releasing !== undefined) {
            if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
            if (!mapped.carryingMovingHandlingObjects.fineHandUse) mapped.carryingMovingHandlingObjects.fineHandUse = {} as any;
            mapped.carryingMovingHandlingObjects.fineHandUse.releasing = releasing;
        }

        const movingObjectsWithLowerExtremitiesFlag = getValue('prior-level-function_carrying-moving-handling-objects_lower_extremities');
        if (movingObjectsWithLowerExtremitiesFlag !== undefined) {
            if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
            if (!mapped.carryingMovingHandlingObjects.movingObjectsWithLowerExtremities) mapped.carryingMovingHandlingObjects.movingObjectsWithLowerExtremities = {} as any;
            mapped.carryingMovingHandlingObjects.movingObjectsWithLowerExtremities.movingObjectsWithLowerExtremitiesFlag = movingObjectsWithLowerExtremitiesFlag;
        }
        // Moving Objects With Lower Extremities
        const kicking = getValue('prior-level-function_carrying-moving-handling-objects_lower_extremities_kicking');
        if (kicking !== undefined) {
            if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
            if (!mapped.carryingMovingHandlingObjects.movingObjectsWithLowerExtremities) mapped.carryingMovingHandlingObjects.movingObjectsWithLowerExtremities = {} as any;
            mapped.carryingMovingHandlingObjects.movingObjectsWithLowerExtremities.kicking = kicking;
        }

        const pushingLowerExtremities = getValue('prior-level-function_carrying-moving-handling-objects_lower_extremities_pushing_lower_extremities');
        if (pushingLowerExtremities !== undefined) {
            if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
            if (!mapped.carryingMovingHandlingObjects.movingObjectsWithLowerExtremities) mapped.carryingMovingHandlingObjects.movingObjectsWithLowerExtremities = {} as any;
            mapped.carryingMovingHandlingObjects.movingObjectsWithLowerExtremities.pushingWithLowerExtremities = pushingLowerExtremities;
        }

        // Community Integration
        const communityIntegration = getValue('prior-level-function_carrying-moving-handling-objects_community_integration');
        if (communityIntegration !== undefined) {
            if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
            mapped.carryingMovingHandlingObjects.communityIntegrationAccess = communityIntegration;
        }

        // Work Vocation
        const workVocation = getValue('prior-level-function_carrying-moving-handling-objects_work_vocation');
        if (workVocation !== undefined) {
            if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
            mapped.carryingMovingHandlingObjects.workVocationOccupation = workVocation;
        }
        const recreationFlag = getValue('prior-level-function_carrying-moving-handling-objects_recreation');
        if (iADLsFlag !== undefined) {
            if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
            if (!mapped.carryingMovingHandlingObjects.recreation) mapped.carryingMovingHandlingObjects.recreation = {} as any;
            mapped.carryingMovingHandlingObjects.recreation.recreationFlag = recreationFlag;
        }

        // Recreation
        const recreationSports = getValue('prior-level-function_carrying-moving-handling-objects_recreation_sports');
        if (recreationSports !== undefined) {
            if (!mapped.carryingMovingHandlingObjects) mapped.carryingMovingHandlingObjects = {} as any;
            if (!mapped.carryingMovingHandlingObjects.recreation) mapped.carryingMovingHandlingObjects.recreation = {} as any;
            mapped.carryingMovingHandlingObjects.recreation.sports = recreationSports;
        }
    }
}