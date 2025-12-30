import { Hygiene } from "./Hygiene";
import { Sleep } from "./Sleep";
import { IADLs } from "./IADLs";
import { HouseholdChores } from "./HouseholdChores";

export interface SelfCare {
  //prior-level-function_self-care_hygiene
  hygieneFlag: boolean;
  hygiene: Hygiene;
  //prior-level-function_self-care_sleep
  sleepFlag: boolean;
  sleep: Sleep;
  //prior-level-function_self-care_iadls
  iADLsFlag: boolean
  iADLs: IADLs;
  // prior-level-function_self-care_household_chores
  householdChoresFlag: boolean
  householdChores: HouseholdChores;
  //prior-level-function_self-care_drive_community
  driveCommunityDistance: boolean;
  //prior-level-function_self-care_volunteering
  volunteering: boolean;
  //prior-level-function_self-care_caregiving
  caregiving: boolean;
}
