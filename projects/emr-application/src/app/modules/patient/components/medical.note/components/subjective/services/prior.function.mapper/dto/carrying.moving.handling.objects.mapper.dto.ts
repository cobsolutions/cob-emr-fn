import { PriorFunction } from "../../../models";

export class CarryingMovingHandlingObjectsDTOMapper {
    public static map(priorFunction: PriorFunction, setValue: (controlName: string, value: any) => void): void {
        if (!priorFunction.carryingMovingHandlingObjects) return;
    
        const carrying = priorFunction.carryingMovingHandlingObjects;
    
        // IADLs
        if (carrying.iADLs) {
          setValue('prior-level-function_carrying-moving-handling-objects_carrying_iadls_carrying_use_telephone', carrying.iADLs.abilityToUseTelephone);
          setValue('prior-level-function_carrying-moving-handling-objects_carrying_iadls_carrying_shopping', carrying.iADLs.shopping);
          setValue('prior-level-function_carrying-moving-handling-objects_carrying_iadls_carrying_food_prep', carrying.iADLs.foodPreparation);
          setValue('prior-level-function_carrying-moving-handling-objects_carrying_iadls_carrying_housekeeping', carrying.iADLs.housekeeping);
          setValue('prior-level-function_carrying-moving-handling-objects_carrying_iadls_carrying_laundry', carrying.iADLs.laundry);
          setValue('prior-level-function_carrying-moving-handling-objects_carrying_iadls_carrying_transportation', carrying.iADLs.modeOfTransportation);
          setValue('prior-level-function_carrying-moving-handling-objects_carrying_iadls_carrying_medications', carrying.iADLs.responsibilityForOwnMedications);
          setValue('prior-level-function_carrying-moving-handling-objects_carrying_iadls_carrying_finances', carrying.iADLs.abilityToHandleFinances);
        }
    
        // Hand Arm Use
        if (carrying.handArmUse) {
          setValue('prior-level-function_carrying-moving-handling-objects_hand_arm_use_pulling_objects', carrying.handArmUse.pullingObjects);
          setValue('prior-level-function_carrying-moving-handling-objects_hand_arm_use_pushing_objects', carrying.handArmUse.pushingObjects);
          setValue('prior-level-function_carrying-moving-handling-objects_hand_arm_use_reaching', carrying.handArmUse.reaching);
          setValue('prior-level-function_carrying-moving-handling-objects_hand_arm_use_turning_hands_arms', carrying.handArmUse.turningHandsOrArms);
          setValue('prior-level-function_carrying-moving-handling-objects_hand_arm_use_twisting_hands_arms', carrying.handArmUse.twistingHandsOrArms);
          setValue('prior-level-function_carrying-moving-handling-objects_hand_arm_use_throwing', carrying.handArmUse.throwing);
          setValue('prior-level-function_carrying-moving-handling-objects_hand_arm_use_catching', carrying.handArmUse.catching);
        }
    
        // Fine Hand Use
        if (carrying.fineHandUse) {
          setValue('prior-level-function_carrying-moving-handling-objects_fine_hand_use_picking_up', carrying.fineHandUse.pickingUp);
          setValue('prior-level-function_carrying-moving-handling-objects_fine_hand_use_grasping', carrying.fineHandUse.grasping);
          setValue('prior-level-function_carrying-moving-handling-objects_fine_hand_use_manipulating', carrying.fineHandUse.manipulating);
          setValue('prior-level-function_carrying-moving-handling-objects_fine_hand_use_releasing', carrying.fineHandUse.releasing);
        }
    
        // Moving Objects With Lower Extremities
        if (carrying.movingObjectsWithLowerExtremities) {
          setValue('prior-level-function_carrying-moving-handling-objects_lower_extremities_kicking', carrying.movingObjectsWithLowerExtremities.kicking);
          setValue('prior-level-function_carrying-moving-handling-objects_lower_extremities_pushing_lower_extremities', carrying.movingObjectsWithLowerExtremities.pushingWithLowerExtremities);
        }
    
        // Community Integration
        setValue('prior-level-function_carrying-moving-handling-objects_community_integration', carrying.communityIntegrationAccess);
    
        // Work Vocation
        setValue('prior-level-function_carrying-moving-handling-objects_work_vocation', carrying.workVocationOccupation);
    
        // Recreation
        if (carrying.recreation) {
          setValue('prior-level-function_carrying-moving-handling-objects_recreation_sports', carrying.recreation.sports);
        }
      }
}