import { Grooming } from "./Grooming";
import { LookingAfterHealth } from "./LookingAfterHealth";
import { Dressing } from "./Dressing";
import { Bathing } from "./Bathing";
import { Toileting } from "./Toileting";

export interface Hygiene {
  //prior-level-function_self-care_hygiene_grooming
  hygieneFlag: boolean;
  

  grooming: Grooming;
  
  lookingAfterHealth: LookingAfterHealth;  
  dressing: Dressing;
  

  bathing: Bathing;

  toileting: Toileting;
}
