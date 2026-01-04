import { CurrentFunction } from "../../../models";

export class SelfCareDTOMapper {
    public static map(currentFunction: CurrentFunction, setValue: (controlName: string, value: any) => void): void {
        // ========== SELF CARE ==========
        if (currentFunction.selfCare) {
          const selfCare = currentFunction.selfCare;

          // Self Care Category Flag
          setValue('current-level-function_self-care', selfCare.selfCareFlag);

          // Hygiene Flag
          setValue('current-level-function_self-care_hygiene', selfCare.hygieneFlag);

          if (selfCare.hygiene) {
            const hygiene = selfCare.hygiene;

            // Grooming
            setValue('current-level-function_self-care_hygiene_grooming', hygiene.groomingFlag);
            if (hygiene.grooming) {
              setValue('current-level-function_self-care_hygiene_grooming_washing_body_parts', hygiene.grooming.washingBodyParts);
              setValue('current-level-function_self-care_hygiene_grooming_washing_whole_body', hygiene.grooming.washingWholeBody);
              setValue('current-level-function_self-care_hygiene_grooming_drying_oneself', hygiene.grooming.dryingOneself);
              setValue('current-level-function_self-care_hygiene_grooming_caring_for_skin', hygiene.grooming.caringForSkin);
              setValue('current-level-function_self-care_hygiene_grooming_caring_for_teeth', hygiene.grooming.caringForTeeth);
              setValue('current-level-function_self-care_hygiene_grooming_caring_for_hair', hygiene.grooming.caringForHair);
              setValue('current-level-function_self-care_hygiene_grooming_caring_for_nails', hygiene.grooming.caringForNailsToeFinger);
            }

            // Looking After Health
            setValue('current-level-function_self-care_hygiene_looking_after_health', hygiene.lookingAfterHealthFlag);
            if (hygiene.lookingAfterHealth) {
              setValue('current-level-function_self-care_hygiene_looking_after_health_balanced_diet', hygiene.lookingAfterHealth.maintainingBalancedDiet);
              setValue('current-level-function_self-care_hygiene_looking_after_health_keeping_warm', hygiene.lookingAfterHealth.keepingWarm);
              setValue('current-level-function_self-care_hygiene_looking_after_health_keeping_cool', hygiene.lookingAfterHealth.keepingCool);
              setValue('current-level-function_self-care_hygiene_looking_after_health_immunizations', hygiene.lookingAfterHealth.gettingImmunizations);
              setValue('current-level-function_self-care_hygiene_looking_after_health_physical_exams', hygiene.lookingAfterHealth.gettingRegularPhysicalExaminations);
            }

            // Dressing
            setValue('current-level-function_self-care_hygiene_dressing', hygiene.dressingFlag);
            if (hygiene.dressing) {
              setValue('current-level-function_self-care_hygiene_dressing_putting_on_clothes', hygiene.dressing.puttingOnClothes);
              setValue('current-level-function_self-care_hygiene_dressing_putting_on_footwear', hygiene.dressing.puttingOnFootwear);
              setValue('current-level-function_self-care_hygiene_dressing_appropriate_clothing', hygiene.dressing.puttingOnAppropriateClothing);
              setValue('current-level-function_self-care_hygiene_dressing_removing_clothes', hygiene.dressing.removingClothes);
              setValue('current-level-function_self-care_hygiene_dressing_removing_footwear', hygiene.dressing.removingFootwear);
            }

            // Bathing
            setValue('current-level-function_self-care_hygiene_bathing', hygiene.bathingFlag);
            if (hygiene.bathing) {
              setValue('current-level-function_self-care_hygiene_bathing_showering', hygiene.bathing.showering);
              setValue('current-level-function_self-care_hygiene_bathing_bathing_tub', hygiene.bathing.bathing);
              setValue('current-level-function_self-care_hygiene_bathing_bathing_wash_parts', hygiene.bathing.washingBodyParts);
              setValue('current-level-function_self-care_hygiene_bathing_bathing_drying', hygiene.bathing.dryingOneself);
            }

            // Toileting
            setValue('current-level-function_self-care_hygiene_toileting', hygiene.toiletingFlag);
            if (hygiene.toileting) {
              setValue('current-level-function_self-care_hygiene_toileting_urination', hygiene.toileting.regulatingUrination);
              setValue('current-level-function_self-care_hygiene_toileting_defecation', hygiene.toileting.regulatingDefecation);
              setValue('current-level-function_self-care_hygiene_toileting_menstrual_care', hygiene.toileting.regulatingMenstrualCare);
            }
          }

          // Sleep
          setValue('current-level-function_self-care_sleep', selfCare.sleepFlag);
          if (selfCare.sleep) {
            // Map sleep children
            setValue('current-level-function_self-care_sleep_disturbed_sleep', selfCare.sleep.disturbedSleep);
            setValue('current-level-function_self-care_sleep_sleeping_postures', selfCare.sleep.sleepingPosturesFlag);
            if (selfCare.sleep.sleepingPostures) {
              setValue('current-level-function_self-care_sleep_sleeping_postures_prone', selfCare.sleep.sleepingPostures.prone);
              setValue('current-level-function_self-care_sleep_sleeping_postures_supine', selfCare.sleep.sleepingPostures.supine);
              setValue('current-level-function_self-care_sleep_sleeping_postures_side_right', selfCare.sleep.sleepingPostures.sideR);
              setValue('current-level-function_self-care_sleep_sleeping_postures_side_left', selfCare.sleep.sleepingPostures.sideL);
            }
            setValue('current-level-function_self-care_sleep_pillows', selfCare.sleep.pillows);
            setValue('current-level-function_self-care_sleep_surface', selfCare.sleep.surfaceFlag);
            if (selfCare.sleep.surface) {
              setValue('current-level-function_self-care_sleep_surface_firm', selfCare.sleep.surface.firm);
              setValue('current-level-function_self-care_sleep_surface_soft', selfCare.sleep.surface.soft);
              setValue('current-level-function_self-care_sleep_surface_sag', selfCare.sleep.surface.sag);
            }
          }

          // IADLs
          setValue('current-level-function_self-care_iadls', selfCare.iADLsFlag);
          if (selfCare.iADLs) {
            setValue('current-level-function_self-care_iadls_use_telephone', selfCare.iADLs.abilityToUseTelephone);
            setValue('current-level-function_self-care_iadls_shopping', selfCare.iADLs.shopping);
            setValue('current-level-function_self-care_iadls_food_prep', selfCare.iADLs.foodPreparation);
            setValue('current-level-function_self-care_iadls_housekeeping', selfCare.iADLs.housekeeping);
            setValue('current-level-function_self-care_iadls_laundry_iadl', selfCare.iADLs.laundry);
            setValue('current-level-function_self-care_iadls_transportation', selfCare.iADLs.modeOfTransportation);
            setValue('current-level-function_self-care_iadls_medications', selfCare.iADLs.responsibilityForOwnMedications);
            setValue('current-level-function_self-care_iadls_finances', selfCare.iADLs.abilityToHandleFinances);
          }

          // Household Chores
          setValue('current-level-function_self-care_household_chores', selfCare.householdChoresFlag);
          if (selfCare.householdChores) {
            setValue('current-level-function_self-care_household_chores_cook_meal', selfCare.householdChores.cookAMeal);
            setValue('current-level-function_self-care_household_chores_laundry_chore', selfCare.householdChores.laundry);
          }

          // Other Self Care fields
          setValue('current-level-function_self-care_drive_community', selfCare.driveCommunityDistance);
          setValue('current-level-function_self-care_volunteering', selfCare.volunteering);
          setValue('current-level-function_self-care_caregiving', selfCare.caregiving);
        }
      }
}