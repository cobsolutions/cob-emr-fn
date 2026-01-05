export interface LookingAfterHealth {
  /*
  "prior-level-function_self-care_hygiene_looking_after_health_balanced_diet": true,
            "prior-level-function_self-care_hygiene_looking_after_health_keeping_warm": true,
            "prior-level-function_self-care_hygiene_looking_after_health_keeping_cool": true,
            "prior-level-function_self-care_hygiene_looking_after_health_immunizations": true,
            "prior-level-function_self-care_hygiene_looking_after_health_physical_exams": true,
  */
  lookingAfterHealthFlag: boolean
  maintainingBalancedDiet: boolean;
  keepingWarm: boolean;
  keepingCool: boolean;
  gettingImmunizations: boolean;
  gettingRegularPhysicalExaminations: boolean;
}
