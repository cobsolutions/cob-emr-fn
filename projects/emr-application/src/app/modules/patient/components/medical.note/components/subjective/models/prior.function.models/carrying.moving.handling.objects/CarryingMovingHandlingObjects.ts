import { IADLs } from "./IADLs";
import { HandArmUse } from "./HandArmUse";
import { FineHandUse } from "./FineHandUse";
import { MovingObjectsWithLowerExtremities } from "./MovingObjectsWithLowerExtremities";
import { Recreation } from "./Recreation";

export interface CarryingMovingHandlingObjects {
  // "prior-level-function_carrying-moving-handling-objects"
  carryingMovingHandlingObjectsFlag?: boolean;
  // "prior-level-function_carrying-moving-handling-objects_carrying_iadls": false,
  iADLsFlag:boolean;
  iADLs: IADLs;

  // "prior-level-function_carrying-moving-handling-objects_hand_arm_use": false,
  handArmUseFlag:boolean;
  handArmUse: HandArmUse;

  // "prior-level-function_carrying-moving-handling-objects_fine_hand_use": false,
  fineHandUseFlag:boolean;
  fineHandUse: FineHandUse;

  // "prior-level-function_carrying-moving-handling-objects_lower_extremities": false,
  movingObjectsWithLowerExtremitiesFlag:boolean;
  movingObjectsWithLowerExtremities: MovingObjectsWithLowerExtremities;

  // "prior-level-function_carrying-moving-handling-objects_community_integration": false,
  communityIntegrationAccess: boolean;

  // "prior-level-function_carrying-moving-handling-objects_work_vocation": false,
  workVocationOccupation: boolean;
  
  // "prior-level-function_carrying-moving-handling-objects_recreation": false,
  recreationFlag:boolean;
  recreation: Recreation;
}
