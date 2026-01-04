import { IADLs } from "./IADLs";
import { HandArmUse } from "./HandArmUse";
import { FineHandUse } from "./FineHandUse";
import { MovingObjectsWithLowerExtremities } from "./MovingObjectsWithLowerExtremities";
import { Recreation } from "./Recreation";

export interface CarryingMovingHandlingObjects {
  // current_functional_limitations_carrying-moving-handling-objects
  carryingMovingHandlingObjectsFlag?: boolean;
  // current_functional_limitations_carrying-moving-handling-objects_carrying_iadls
  iADLsFlag:boolean
  iADLs: IADLs;

  // current_functional_limitations_carrying-moving-handling-objects_hand_arm_use
  handArmUseFlag:boolean
  handArmUse: HandArmUse;

  // current_functional_limitations_carrying-moving-handling-objects_fine_hand_use
  fineHandUseFlag:boolean
  fineHandUse: FineHandUse;

  // current_functional_limitations_carrying-moving-handling-objects_lower_extremities
  movingObjectsWithLowerExtremitiesFlag:boolean
  movingObjectsWithLowerExtremities: MovingObjectsWithLowerExtremities;

  // current_functional_limitations_carrying-moving-handling-objects_community_integration
  communityIntegrationAccess: boolean;

  // current_functional_limitations_carrying-moving-handling-objects_work_vocation
  workVocationOccupation: boolean;
  
  // current_functional_limitations_carrying-moving-handling-objects_recreation
  recreationFlag:boolean
  recreation: Recreation;
}
