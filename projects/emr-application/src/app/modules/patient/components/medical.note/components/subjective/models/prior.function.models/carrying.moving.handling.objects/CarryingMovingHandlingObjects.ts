import { IADLs } from "./IADLs";
import { HandArmUse } from "./HandArmUse";
import { FineHandUse } from "./FineHandUse";
import { MovingObjectsWithLowerExtremities } from "./MovingObjectsWithLowerExtremities";
import { Recreation } from "./Recreation";

export interface CarryingMovingHandlingObjects {
  // "prior-level-function_carrying-moving-handling-objects"
  carryingMovingHandlingObjectsFlag?: boolean;
  
  iadls: IADLs;

  
  handArmUse: HandArmUse;

  
  fineHandUse: FineHandUse;

  
  movingObjectsWithLowerExtremities: MovingObjectsWithLowerExtremities;

  // "prior-level-function_carrying-moving-handling-objects_community_integration": false,
  communityIntegrationAccess: boolean;

  // "prior-level-function_carrying-moving-handling-objects_work_vocation": false,
  workVocationOccupation: boolean;  
  recreation: Recreation;
}
