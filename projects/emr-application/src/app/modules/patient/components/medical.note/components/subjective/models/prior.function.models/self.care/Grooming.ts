export interface Grooming {
  /*
  "prior-level-function_self-care_hygiene_grooming_washing_body_parts": true,
   "prior-level-function_self-care_hygiene_grooming_washing_whole_body": true,
   "prior-level-function_self-care_hygiene_grooming_drying_oneself": true,
   "prior-level-function_self-care_hygiene_grooming_caring_for_skin": true,
   "prior-level-function_self-care_hygiene_grooming_caring_for_teeth": true,
   "prior-level-function_self-care_hygiene_grooming_caring_for_hair": true,
   "prior-level-function_self-care_hygiene_grooming_caring_for_nails": true
  */
  groomingFlag: boolean;
  washingBodyParts: boolean;
  washingWholeBody: boolean;
  dryingOneself: boolean;
  caringForSkin: boolean;
  caringForTeeth: boolean;
  caringForHair: boolean;
  caringForNailsToeFinger: boolean;
}
