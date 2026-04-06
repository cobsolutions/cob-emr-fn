import { PriorFunction } from "../../../models";

export class SelfCareDTOMapper {
  public static map(priorFunction: PriorFunction, setValue: (controlName: string, value: any) => void): void {
    // ========== SELF CARE ==========
    if (priorFunction.selfCare) {
      const selfCare = priorFunction.selfCare;

      // Self Care Category Flag
      setValue('prior-level-function_self-care', selfCare.selfCareFlag);

      // Hygiene Flag
      setValue('prior-level-function_self-care_hygiene', selfCare.hygiene.hygieneFlag);

      if (selfCare.hygiene) {
        const hygiene = selfCare.hygiene;

        // Grooming
        setValue('prior-level-function_self-care_hygiene_grooming', hygiene.grooming.groomingFlag);
        if (hygiene.grooming) {
          setValue('prior-level-function_self-care_hygiene_grooming_washing_body_parts', hygiene.grooming.washingBodyParts);
          setValue('prior-level-function_self-care_hygiene_grooming_washing_whole_body', hygiene.grooming.washingWholeBody);
          setValue('prior-level-function_self-care_hygiene_grooming_drying_oneself', hygiene.grooming.dryingOneself);
          setValue('prior-level-function_self-care_hygiene_grooming_caring_for_skin', hygiene.grooming.caringForSkin);
          setValue('prior-level-function_self-care_hygiene_grooming_caring_for_teeth', hygiene.grooming.caringForTeeth);
          setValue('prior-level-function_self-care_hygiene_grooming_caring_for_hair', hygiene.grooming.caringForHair);
          setValue('prior-level-function_self-care_hygiene_grooming_caring_for_nails', hygiene.grooming.caringForNailsToeFinger);
        }

        // Looking After Health

        if (hygiene.lookingAfterHealth) {
          setValue('prior-level-function_self-care_hygiene_looking_after_health', hygiene.lookingAfterHealth.lookingAfterHealthFlag);
          setValue('prior-level-function_self-care_hygiene_looking_after_health_balanced_diet', hygiene.lookingAfterHealth.maintainingBalancedDiet);
          setValue('prior-level-function_self-care_hygiene_looking_after_health_keeping_warm', hygiene.lookingAfterHealth.keepingWarm);
          setValue('prior-level-function_self-care_hygiene_looking_after_health_keeping_cool', hygiene.lookingAfterHealth.keepingCool);
          setValue('prior-level-function_self-care_hygiene_looking_after_health_immunizations', hygiene.lookingAfterHealth.gettingImmunizations);
          setValue('prior-level-function_self-care_hygiene_looking_after_health_physical_exams', hygiene.lookingAfterHealth.gettingRegularPhysicalExaminations);
        }

        // Dressing
        setValue('prior-level-function_self-care_hygiene_dressing', hygiene.dressing.dressingFlag);
        if (hygiene.dressing) {
          setValue('prior-level-function_self-care_hygiene_dressing_putting_on_clothes', hygiene.dressing.puttingOnClothes);
          setValue('prior-level-function_self-care_hygiene_dressing_putting_on_footwear', hygiene.dressing.puttingOnFootwear);
          setValue('prior-level-function_self-care_hygiene_dressing_appropriate_clothing', hygiene.dressing.puttingOnAppropriateClothing);
          setValue('prior-level-function_self-care_hygiene_dressing_removing_clothes', hygiene.dressing.removingClothes);
          setValue('prior-level-function_self-care_hygiene_dressing_removing_footwear', hygiene.dressing.removingFootwear);
        }

        // Bathing
        setValue('prior-level-function_self-care_hygiene_bathing', hygiene.bathing.bathingFlag);
        if (hygiene.bathing) {
          setValue('prior-level-function_self-care_hygiene_bathing_showering', hygiene.bathing.showering);
          setValue('prior-level-function_self-care_hygiene_bathing_bathing_tub', hygiene.bathing.bathing);
          setValue('prior-level-function_self-care_hygiene_bathing_bathing_wash_parts', hygiene.bathing.washingBodyParts);
          setValue('prior-level-function_self-care_hygiene_bathing_bathing_drying', hygiene.bathing.dryingOneself);
        }

        // Toileting
        setValue('prior-level-function_self-care_hygiene_toileting', hygiene.toileting.toiletingFlag);
        if (hygiene.toileting) {
          setValue('prior-level-function_self-care_hygiene_toileting_urination', hygiene.toileting.regulatingUrination);
          setValue('prior-level-function_self-care_hygiene_toileting_defecation', hygiene.toileting.regulatingDefecation);
          setValue('prior-level-function_self-care_hygiene_toileting_menstrual_care', hygiene.toileting.regulatingMenstrualCare);
        }
      }

      // Sleep
      setValue('prior-level-function_self-care_sleep', selfCare.sleep.sleepFlag);
      if (selfCare.sleep) {
        // Map sleep children
        setValue('prior-level-function_self-care_sleep_disturbed_sleep', selfCare.sleep.disturbedSleep);
        setValue('prior-level-function_self-care_sleep_sleeping_postures', selfCare.sleep.sleepingPostures.sleepingPosturesFlag);
        if (selfCare.sleep.sleepingPostures) {
          setValue('prior-level-function_self-care_sleep_sleeping_postures_prone', selfCare.sleep.sleepingPostures.prone);
          setValue('prior-level-function_self-care_sleep_sleeping_postures_supine', selfCare.sleep.sleepingPostures.supine);
          setValue('prior-level-function_self-care_sleep_sleeping_postures_side_right', selfCare.sleep.sleepingPostures.sideR);
          setValue('prior-level-function_self-care_sleep_sleeping_postures_side_left', selfCare.sleep.sleepingPostures.sideL);
        }
        setValue('prior-level-function_self-care_sleep_pillows', selfCare.sleep.pillows);
        setValue('prior-level-function_self-care_sleep_surface', selfCare.sleep.surface.surfaceFlag);
        if (selfCare.sleep.surface) {
          setValue('prior-level-function_self-care_sleep_surface_firm', selfCare.sleep.surface.firm);
          setValue('prior-level-function_self-care_sleep_surface_soft', selfCare.sleep.surface.soft);
          setValue('prior-level-function_self-care_sleep_surface_sag', selfCare.sleep.surface.sag);
        }
      }

      if (selfCare.iadls) {
        // IADLs
      setValue('prior-level-function_self-care_iadls', selfCare.iadls.iadlsFlag);
        setValue('prior-level-function_self-care_iadls_use_telephone', selfCare.iadls.abilityToUseTelephone);
        setValue('prior-level-function_self-care_iadls_shopping', selfCare.iadls.shopping);
        setValue('prior-level-function_self-care_iadls_food_prep', selfCare.iadls.foodPreparation);
        setValue('prior-level-function_self-care_iadls_housekeeping', selfCare.iadls.housekeeping);
        setValue('prior-level-function_self-care_iadls_laundry_iadl', selfCare.iadls.laundry);
        setValue('prior-level-function_self-care_iadls_transportation', selfCare.iadls.modeOfTransportation);
        setValue('prior-level-function_self-care_iadls_medications', selfCare.iadls.responsibilityForOwnMedications);
        setValue('prior-level-function_self-care_iadls_finances', selfCare.iadls.abilityToHandleFinances);
      }

      // Household Chores
      setValue('prior-level-function_self-care_household_chores', selfCare.householdChores.householdChoresFlag);
      if (selfCare.householdChores) {
        setValue('prior-level-function_self-care_household_chores_cook_meal', selfCare.householdChores.cookAMeal);
        setValue('prior-level-function_self-care_household_chores_laundry_chore', selfCare.householdChores.laundry);
      }

      // Other Self Care fields
      setValue('prior-level-function_self-care_drive_community', selfCare.driveCommunityDistance);
      setValue('prior-level-function_self-care_volunteering', selfCare.volunteering);
      setValue('prior-level-function_self-care_caregiving', selfCare.caregiving);
    }
  }
}