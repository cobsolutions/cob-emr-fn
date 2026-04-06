export interface MovingObjectsWithLowerExtremities {
  // "prior-level-function_carrying-moving-handling-objects_lower_extremities_kicking": false,
  //           "prior-level-function_carrying-moving-handling-objects_lower_extremities_pushing_lower_extremities": false,

  // "prior-level-function_carrying-moving-handling-objects_lower_extremities": false,
  movingObjectsWithLowerExtremitiesFlag:boolean;
  kicking: boolean;
  pushingWithLowerExtremities: boolean;
  lowerExtremitiesText?: string;
}
