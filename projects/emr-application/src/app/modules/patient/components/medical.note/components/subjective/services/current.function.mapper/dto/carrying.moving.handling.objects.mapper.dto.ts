import { CurrentFunction } from "../../../models";

export class CarryingMovingHandlingObjectsDTOMapper {
  public static map(currentFunction: CurrentFunction, setValue: (controlName: string, value: any) => void): void {
    if (!currentFunction.carryingMovingHandlingObjects) return;

    const carrying = currentFunction.carryingMovingHandlingObjects;

    // Carrying Moving Handling Objects Category Flag
    setValue('current-level-function_carrying-moving-handling-objects', carrying.carryingMovingHandlingObjectsFlag);

    // IADLs Flag
    setValue('current-level-function_carrying-moving-handling-objects_carrying_iadls', carrying.iadls.iadlsFlag);

    // IADLs
    if (carrying.iadls) {
      setValue('current-level-function_carrying-moving-handling-objects_carrying_iadls_carrying_use_telephone', carrying.iadls.abilityToUseTelephone);
      setValue('current-level-function_carrying-moving-handling-objects_carrying_iadls_carrying_shopping', carrying.iadls.shopping);
      setValue('current-level-function_carrying-moving-handling-objects_carrying_iadls_carrying_food_prep', carrying.iadls.foodPreparation);
      setValue('current-level-function_carrying-moving-handling-objects_carrying_iadls_carrying_housekeeping', carrying.iadls.housekeeping);
      setValue('current-level-function_carrying-moving-handling-objects_carrying_iadls_carrying_laundry', carrying.iadls.laundry);
      setValue('current-level-function_carrying-moving-handling-objects_carrying_iadls_carrying_transportation', carrying.iadls.modeOfTransportation);
      setValue('current-level-function_carrying-moving-handling-objects_carrying_iadls_carrying_medications', carrying.iadls.responsibilityForOwnMedications);
      setValue('current-level-function_carrying-moving-handling-objects_carrying_iadls_carrying_finances', carrying.iadls.abilityToHandleFinances);
    }

    // Hand Arm Use Flag
    setValue('current-level-function_carrying-moving-handling-objects_hand_arm_use', carrying.handArmUse.handArmUseFlag);

    // Hand Arm Use
    if (carrying.handArmUse) {
      setValue('current-level-function_carrying-moving-handling-objects_hand_arm_use_pulling_objects', carrying.handArmUse.pullingObjects);
      setValue('current-level-function_carrying-moving-handling-objects_hand_arm_use_pushing_objects', carrying.handArmUse.pushingObjects);
      setValue('current-level-function_carrying-moving-handling-objects_hand_arm_use_reaching', carrying.handArmUse.reaching);
      setValue('current-level-function_carrying-moving-handling-objects_hand_arm_use_turning_hands_arms', carrying.handArmUse.turningHandsOrArms);
      setValue('current-level-function_carrying-moving-handling-objects_hand_arm_use_twisting_hands_arms', carrying.handArmUse.twistingHandsOrArms);
      setValue('current-level-function_carrying-moving-handling-objects_hand_arm_use_throwing', carrying.handArmUse.throwing);
      setValue('current-level-function_carrying-moving-handling-objects_hand_arm_use_catching', carrying.handArmUse.catching);
    }

    // Fine Hand Use Flag
    setValue('current-level-function_carrying-moving-handling-objects_fine_hand_use', carrying.fineHandUse.fineHandUseFlag);

    // Fine Hand Use
    if (carrying.fineHandUse) {
      setValue('current-level-function_carrying-moving-handling-objects_fine_hand_use_picking_up', carrying.fineHandUse.pickingUp);
      setValue('current-level-function_carrying-moving-handling-objects_fine_hand_use_grasping', carrying.fineHandUse.grasping);
      setValue('current-level-function_carrying-moving-handling-objects_fine_hand_use_manipulating', carrying.fineHandUse.manipulating);
      setValue('current-level-function_carrying-moving-handling-objects_fine_hand_use_releasing', carrying.fineHandUse.releasing);
    }

    // Moving Objects With Lower Extremities Flag
    setValue('current-level-function_carrying-moving-handling-objects_lower_extremities', carrying.movingObjectsWithLowerExtremities.movingObjectsWithLowerExtremitiesFlag);

    // Moving Objects With Lower Extremities
    if (carrying.movingObjectsWithLowerExtremities) {
      setValue('current-level-function_carrying-moving-handling-objects_lower_extremities_kicking', carrying.movingObjectsWithLowerExtremities.kicking);
      setValue('current-level-function_carrying-moving-handling-objects_lower_extremities_pushing_lower_extremities', carrying.movingObjectsWithLowerExtremities.pushingWithLowerExtremities);
    }

    // Community Integration
    setValue('current-level-function_carrying-moving-handling-objects_community_integration', carrying.communityIntegrationAccess);

    // Work Vocation
    setValue('current-level-function_carrying-moving-handling-objects_work_vocation', carrying.workVocationOccupation);

    // Recreation Flag
    setValue('current-level-function_carrying-moving-handling-objects_recreation', carrying.recreation.recreationFlag);

    // Recreation
    if (carrying.recreation) {
      setValue('current-level-function_carrying-moving-handling-objects_recreation_sports', carrying.recreation.sports);
    }
  }
}