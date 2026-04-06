import { Hygiene } from "./Hygiene";
import { Sleep } from "./Sleep";
import { IADLs } from "./IADLs";
import { HouseholdChores } from "./HouseholdChores";

export interface SelfCare {
  //current_functional_limitations_self-care
  selfCareFlag?: boolean;
  //current_functional_limitations_self-care_hygiene
  hygieneFlag: boolean;
  hygiene: Hygiene;
  //current_functional_limitations_self-care_sleep
  sleepFlag: boolean;
  sleep: Sleep;
  //current_functional_limitations_self-care_iadls
  iADLsFlag: boolean
  iADLs: IADLs;
  //current_functional_limitations_self-care_household_chores
  householdChoresFlag: boolean
  householdChores: HouseholdChores;
  //current_functional_limitations_self-care_drive_community
  driveCommunityDistance: boolean;
  //current_functional_limitations_self-care_volunteering
  volunteering: boolean;
  //current_functional_limitations_self-care_caregiving
  caregiving: boolean;
}
