import { Grooming } from "./Grooming";
import { LookingAfterHealth } from "./LookingAfterHealth";
import { Dressing } from "./Dressing";
import { Bathing } from "./Bathing";
import { Toileting } from "./Toileting";

export interface Hygiene {
  //prior-level-function_self-care_hygiene_grooming
  groomingFlag: boolean;

  grooming: Grooming;
  //prior-level-function_self-care_hygiene_looking_after_health
  lookingAfterHealthFlag:boolean

  lookingAfterHealth: LookingAfterHealth;
  //prior-level-function_self-care_hygiene_dressing
  dressingFlag:boolean;
  
  dressing: Dressing;
  //prior-level-function_self-care_hygiene_bathing
  bathingFlag:boolean;

  bathing: Bathing;
  //prior-level-function_self-care_hygiene_toileting
  toiletingFlag:boolean;

  toileting: Toileting;
}
