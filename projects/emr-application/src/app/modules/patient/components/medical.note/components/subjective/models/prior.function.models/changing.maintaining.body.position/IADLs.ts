export interface IADLs {
  // "prior-level-function_changing-maintaining-body-position_body_position_iadls_body_position_use_telephone": false,
  //           "prior-level-function_changing-maintaining-body-position_body_position_iadls_body_position_shopping": false,
  //           "prior-level-function_changing-maintaining-body-position_body_position_iadls_body_position_food_prep": false,
  //           "prior-level-function_changing-maintaining-body-position_body_position_iadls_body_position_housekeeping": false,
  //           "prior-level-function_changing-maintaining-body-position_body_position_iadls_body_position_laundry": false,
  //           "prior-level-function_changing-maintaining-body-position_body_position_iadls_body_position_transportation": false,
  //           "prior-level-function_changing-maintaining-body-position_body_position_iadls_body_position_medications": false,
  //           "prior-level-function_changing-maintaining-body-position_body_position_iadls_body_position_finances": false,

  // "prior-level-function_changing-maintaining-body-position_body_position_iadls": false,
  iadlsFlag:boolean;
  abilityToUseTelephone: boolean;
  shopping: boolean;
  foodPreparation: boolean;
  housekeeping: boolean;
  laundry: boolean;
  modeOfTransportation: boolean;
  responsibilityForOwnMedications: boolean;
  abilityToHandleFinances: boolean;
}
