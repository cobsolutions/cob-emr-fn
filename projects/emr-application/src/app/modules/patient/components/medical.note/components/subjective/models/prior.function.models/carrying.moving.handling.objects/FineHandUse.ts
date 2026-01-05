export interface FineHandUse {
  // "prior-level-function_carrying-moving-handling-objects_fine_hand_use_picking_up": false,
  //           "prior-level-function_carrying-moving-handling-objects_fine_hand_use_grasping": false,
  //           "prior-level-function_carrying-moving-handling-objects_fine_hand_use_manipulating": false,
  //           "prior-level-function_carrying-moving-handling-objects_fine_hand_use_releasing": false,
  // "prior-level-function_carrying-moving-handling-objects_fine_hand_use": false,
  fineHandUseFlag:boolean;
  pickingUp: boolean;
  grasping: boolean;
  manipulating: boolean;
  releasing: boolean;
}
