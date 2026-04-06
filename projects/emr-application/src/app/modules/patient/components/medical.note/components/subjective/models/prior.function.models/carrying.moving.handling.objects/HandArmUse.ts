export interface HandArmUse {
  // "prior-level-function_carrying-moving-handling-objects_hand_arm_use_pulling_objects": false,
  //           "prior-level-function_carrying-moving-handling-objects_hand_arm_use_pushing_objects": false,
  //           "prior-level-function_carrying-moving-handling-objects_hand_arm_use_reaching": false,
  //           "prior-level-function_carrying-moving-handling-objects_hand_arm_use_turning_hands_arms": false,
  //           "prior-level-function_carrying-moving-handling-objects_hand_arm_use_twisting_hands_arms": false,
  //           "prior-level-function_carrying-moving-handling-objects_hand_arm_use_throwing": false,
  //           "prior-level-function_carrying-moving-handling-objects_hand_arm_use_catching": false,


  // "prior-level-function_carrying-moving-handling-objects_hand_arm_use": false,
  handArmUseFlag:boolean;
  pullingObjects: boolean;
  pushingObjects: boolean;
  reaching: boolean;
  turningHandsOrArms: boolean;
  twistingHandsOrArms: boolean;
  throwing: boolean;
  catching: boolean;
}
