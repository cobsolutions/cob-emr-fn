import { FormGroup } from "@angular/forms";
import { PriorFunction } from "../../../models";

export class SelfCareMapper {
  public static map(formGroup: FormGroup, mapped: PriorFunction, getValue: (controlName: string) => any): void {
    // ========== SELF CARE ==========

    // Self Care Category Flag
    const selfCareFlag = getValue('prior-level-function_self-care');
    if (selfCareFlag !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      mapped.selfCare.selfCareFlag = selfCareFlag;
    }

    // Self Care - Hygiene
    const hygieneFlag = getValue('prior-level-function_self-care_hygiene');
    if (hygieneFlag !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.hygiene) mapped.selfCare.hygiene = {} as any;
      mapped.selfCare.hygiene.hygieneFlag = hygieneFlag;
    }

    // Hygiene - Grooming
    const groomingFlag = getValue('prior-level-function_self-care_hygiene_grooming');
    if (groomingFlag !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.hygiene) mapped.selfCare.hygiene = {} as any;
      if (!mapped.selfCare.hygiene.grooming) mapped.selfCare.hygiene.grooming = {} as any;
      mapped.selfCare.hygiene.grooming.groomingFlag = groomingFlag;
    }

    const washingBodyParts = getValue('prior-level-function_self-care_hygiene_grooming_washing_body_parts');
    if (washingBodyParts !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.hygiene) mapped.selfCare.hygiene = {} as any;
      if (!mapped.selfCare.hygiene.grooming) mapped.selfCare.hygiene.grooming = {} as any;
      mapped.selfCare.hygiene.grooming.washingBodyParts = washingBodyParts;
    }

    const washingWholeBody = getValue('prior-level-function_self-care_hygiene_grooming_washing_whole_body');
    if (washingWholeBody !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.hygiene) mapped.selfCare.hygiene = {} as any;
      if (!mapped.selfCare.hygiene.grooming) mapped.selfCare.hygiene.grooming = {} as any;
      mapped.selfCare.hygiene.grooming.washingWholeBody = washingWholeBody;
    }

    const dryingOneself = getValue('prior-level-function_self-care_hygiene_grooming_drying_oneself');
    if (dryingOneself !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.hygiene) mapped.selfCare.hygiene = {} as any;
      if (!mapped.selfCare.hygiene.grooming) mapped.selfCare.hygiene.grooming = {} as any;
      mapped.selfCare.hygiene.grooming.dryingOneself = dryingOneself;
    }

    const caringForSkin = getValue('prior-level-function_self-care_hygiene_grooming_caring_for_skin');
    if (caringForSkin !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.hygiene) mapped.selfCare.hygiene = {} as any;
      if (!mapped.selfCare.hygiene.grooming) mapped.selfCare.hygiene.grooming = {} as any;
      mapped.selfCare.hygiene.grooming.caringForSkin = caringForSkin;
    }

    const caringForTeeth = getValue('prior-level-function_self-care_hygiene_grooming_caring_for_teeth');
    if (caringForTeeth !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.hygiene) mapped.selfCare.hygiene = {} as any;
      if (!mapped.selfCare.hygiene.grooming) mapped.selfCare.hygiene.grooming = {} as any;
      mapped.selfCare.hygiene.grooming.caringForTeeth = caringForTeeth;
    }

    const caringForHair = getValue('prior-level-function_self-care_hygiene_grooming_caring_for_hair');
    if (caringForHair !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.hygiene) mapped.selfCare.hygiene = {} as any;
      if (!mapped.selfCare.hygiene.grooming) mapped.selfCare.hygiene.grooming = {} as any;
      mapped.selfCare.hygiene.grooming.caringForHair = caringForHair;
    }

    const caringForNails = getValue('prior-level-function_self-care_hygiene_grooming_caring_for_nails');
    if (caringForNails !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.hygiene) mapped.selfCare.hygiene = {} as any;
      if (!mapped.selfCare.hygiene.grooming) mapped.selfCare.hygiene.grooming = {} as any;
      mapped.selfCare.hygiene.grooming.caringForNailsToeFinger = caringForNails;
    }

    // Hygiene - Looking After Health
    const lookingAfterHealthFlag = getValue('prior-level-function_self-care_hygiene_looking_after_health');
    if (lookingAfterHealthFlag !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.hygiene) mapped.selfCare.hygiene = {} as any;
      if (!mapped.selfCare.hygiene.lookingAfterHealth) mapped.selfCare.hygiene.lookingAfterHealth = {} as any;
      mapped.selfCare.hygiene.lookingAfterHealth.lookingAfterHealthFlag = lookingAfterHealthFlag;
    }

    const balancedDiet = getValue('prior-level-function_self-care_hygiene_looking_after_health_balanced_diet');
    if (balancedDiet !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.hygiene) mapped.selfCare.hygiene = {} as any;
      if (!mapped.selfCare.hygiene.lookingAfterHealth) mapped.selfCare.hygiene.lookingAfterHealth = {} as any;
      mapped.selfCare.hygiene.lookingAfterHealth.maintainingBalancedDiet = balancedDiet;
    }

    const keepingWarm = getValue('prior-level-function_self-care_hygiene_looking_after_health_keeping_warm');
    if (keepingWarm !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.hygiene) mapped.selfCare.hygiene = {} as any;
      if (!mapped.selfCare.hygiene.lookingAfterHealth) mapped.selfCare.hygiene.lookingAfterHealth = {} as any;
      mapped.selfCare.hygiene.lookingAfterHealth.keepingWarm = keepingWarm;
    }

    const keepingCool = getValue('prior-level-function_self-care_hygiene_looking_after_health_keeping_cool');
    if (keepingCool !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.hygiene) mapped.selfCare.hygiene = {} as any;
      if (!mapped.selfCare.hygiene.lookingAfterHealth) mapped.selfCare.hygiene.lookingAfterHealth = {} as any;
      mapped.selfCare.hygiene.lookingAfterHealth.keepingCool = keepingCool;
    }

    const immunizations = getValue('prior-level-function_self-care_hygiene_looking_after_health_immunizations');
    if (immunizations !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.hygiene) mapped.selfCare.hygiene = {} as any;
      if (!mapped.selfCare.hygiene.lookingAfterHealth) mapped.selfCare.hygiene.lookingAfterHealth = {} as any;
      mapped.selfCare.hygiene.lookingAfterHealth.gettingImmunizations = immunizations;
    }

    const physicalExams = getValue('prior-level-function_self-care_hygiene_looking_after_health_physical_exams');
    if (physicalExams !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.hygiene) mapped.selfCare.hygiene = {} as any;
      if (!mapped.selfCare.hygiene.lookingAfterHealth) mapped.selfCare.hygiene.lookingAfterHealth = {} as any;
      mapped.selfCare.hygiene.lookingAfterHealth.gettingRegularPhysicalExaminations = physicalExams;
    }

    // Hygiene - Dressing
    const dressingFlag = getValue('prior-level-function_self-care_hygiene_dressing');
    if (dressingFlag !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.hygiene) mapped.selfCare.hygiene = {} as any;
      if (!mapped.selfCare.hygiene.dressing) mapped.selfCare.hygiene.dressing = {} as any;
      mapped.selfCare.hygiene.dressing.dressingFlag = dressingFlag;
    }

    const puttingOnClothes = getValue('prior-level-function_self-care_hygiene_dressing_putting_on_clothes');
    if (puttingOnClothes !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.hygiene) mapped.selfCare.hygiene = {} as any;
      if (!mapped.selfCare.hygiene.dressing) mapped.selfCare.hygiene.dressing = {} as any;
      mapped.selfCare.hygiene.dressing.puttingOnClothes = puttingOnClothes;
    }

    const puttingOnFootwear = getValue('prior-level-function_self-care_hygiene_dressing_putting_on_footwear');
    if (puttingOnFootwear !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.hygiene) mapped.selfCare.hygiene = {} as any;
      if (!mapped.selfCare.hygiene.dressing) mapped.selfCare.hygiene.dressing = {} as any;
      mapped.selfCare.hygiene.dressing.puttingOnFootwear = puttingOnFootwear;
    }

    const appropriateClothing = getValue('prior-level-function_self-care_hygiene_dressing_appropriate_clothing');
    if (appropriateClothing !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.hygiene) mapped.selfCare.hygiene = {} as any;
      if (!mapped.selfCare.hygiene.dressing) mapped.selfCare.hygiene.dressing = {} as any;
      mapped.selfCare.hygiene.dressing.puttingOnAppropriateClothing = appropriateClothing;
    }

    const removingClothes = getValue('prior-level-function_self-care_hygiene_dressing_removing_clothes');
    if (removingClothes !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.hygiene) mapped.selfCare.hygiene = {} as any;
      if (!mapped.selfCare.hygiene.dressing) mapped.selfCare.hygiene.dressing = {} as any;
      mapped.selfCare.hygiene.dressing.removingClothes = removingClothes;
    }

    const removingFootwear = getValue('prior-level-function_self-care_hygiene_dressing_removing_footwear');
    if (removingFootwear !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.hygiene) mapped.selfCare.hygiene = {} as any;
      if (!mapped.selfCare.hygiene.dressing) mapped.selfCare.hygiene.dressing = {} as any;
      mapped.selfCare.hygiene.dressing.removingFootwear = removingFootwear;
    }

    // Hygiene - Bathing
    const bathingFlag = getValue('prior-level-function_self-care_hygiene_bathing');
    if (bathingFlag !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.hygiene) mapped.selfCare.hygiene = {} as any;
      if (!mapped.selfCare.hygiene.bathing) mapped.selfCare.hygiene.bathing = {} as any;
      mapped.selfCare.hygiene.bathing.bathingFlag = bathingFlag;
    }

    const showering = getValue('prior-level-function_self-care_hygiene_bathing_showering');
    if (showering !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.hygiene) mapped.selfCare.hygiene = {} as any;
      if (!mapped.selfCare.hygiene.bathing) mapped.selfCare.hygiene.bathing = {} as any;
      mapped.selfCare.hygiene.bathing.showering = showering;
    }

    const bathingTub = getValue('prior-level-function_self-care_hygiene_bathing_bathing_tub');
    if (bathingTub !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.hygiene) mapped.selfCare.hygiene = {} as any;
      if (!mapped.selfCare.hygiene.bathing) mapped.selfCare.hygiene.bathing = {} as any;
      mapped.selfCare.hygiene.bathing.bathing = bathingTub;
    }

    const bathingWashParts = getValue('prior-level-function_self-care_hygiene_bathing_bathing_wash_parts');
    if (bathingWashParts !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.hygiene) mapped.selfCare.hygiene = {} as any;
      if (!mapped.selfCare.hygiene.bathing) mapped.selfCare.hygiene.bathing = {} as any;
      mapped.selfCare.hygiene.bathing.washingBodyParts = bathingWashParts;
    }

    const bathingDrying = getValue('prior-level-function_self-care_hygiene_bathing_bathing_drying');
    if (bathingDrying !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.hygiene) mapped.selfCare.hygiene = {} as any;
      if (!mapped.selfCare.hygiene.bathing) mapped.selfCare.hygiene.bathing = {} as any;
      mapped.selfCare.hygiene.bathing.dryingOneself = bathingDrying;
    }

    // Hygiene - Toileting
    const toiletingFlag = getValue('prior-level-function_self-care_hygiene_toileting');
    if (toiletingFlag !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.hygiene) mapped.selfCare.hygiene = {} as any;
      if (!mapped.selfCare.hygiene.toileting) mapped.selfCare.hygiene.toileting = {} as any;
      mapped.selfCare.hygiene.toileting.toiletingFlag = toiletingFlag;
    }

    const urination = getValue('prior-level-function_self-care_hygiene_toileting_urination');
    if (urination !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.hygiene) mapped.selfCare.hygiene = {} as any;
      if (!mapped.selfCare.hygiene.toileting) mapped.selfCare.hygiene.toileting = {} as any;
      mapped.selfCare.hygiene.toileting.regulatingUrination = urination;
    }

    const defecation = getValue('prior-level-function_self-care_hygiene_toileting_defecation');
    if (defecation !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.hygiene) mapped.selfCare.hygiene = {} as any;
      if (!mapped.selfCare.hygiene.toileting) mapped.selfCare.hygiene.toileting = {} as any;
      mapped.selfCare.hygiene.toileting.regulatingDefecation = defecation;
    }

    const menstrualCare = getValue('prior-level-function_self-care_hygiene_toileting_menstrual_care');
    if (menstrualCare !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.hygiene) mapped.selfCare.hygiene = {} as any;
      if (!mapped.selfCare.hygiene.toileting) mapped.selfCare.hygiene.toileting = {} as any;
      mapped.selfCare.hygiene.toileting.regulatingMenstrualCare = menstrualCare;
    }

    // Self Care - Sleep Flag
    const sleepFlag = getValue('prior-level-function_self-care_sleep');
    if (sleepFlag !== undefined) {
      if (!mapped.selfCare.sleep) mapped.selfCare.sleep = {} as any;
      mapped.selfCare.sleep.sleepFlag = sleepFlag;
    }

    // Sleep - Disturbed Sleep (leaf field)
    const disturbedSleep = getValue('prior-level-function_self-care_sleep_disturbed_sleep');
    if (disturbedSleep !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.sleep) mapped.selfCare.sleep = {} as any;
      mapped.selfCare.sleep.disturbedSleep = disturbedSleep;
    }

    // Sleep - Sleeping Postures Flag
    const sleepingPosturesFlag = getValue('prior-level-function_self-care_sleep_sleeping_postures');
    if (sleepingPosturesFlag !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.sleep) mapped.selfCare.sleep = {} as any;
      if (!mapped.selfCare.sleep.sleepingPostures) mapped.selfCare.sleep.sleepingPostures = {} as any;
      mapped.selfCare.sleep.sleepingPostures.sleepingPosturesFlag = sleepingPosturesFlag;
    }

    const sleepProne = getValue('prior-level-function_self-care_sleep_sleeping_postures_prone');
    if (sleepProne !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.sleep) mapped.selfCare.sleep = {} as any;
      if (!mapped.selfCare.sleep.sleepingPostures) mapped.selfCare.sleep.sleepingPostures = {} as any;
      mapped.selfCare.sleep.sleepingPostures.prone = sleepProne;
    }

    const sleepSupine = getValue('prior-level-function_self-care_sleep_sleeping_postures_supine');
    if (sleepSupine !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.sleep) mapped.selfCare.sleep = {} as any;
      if (!mapped.selfCare.sleep.sleepingPostures) mapped.selfCare.sleep.sleepingPostures = {} as any;
      mapped.selfCare.sleep.sleepingPostures.supine = sleepSupine;
    }

    const sleepSideRight = getValue('prior-level-function_self-care_sleep_sleeping_postures_side_right');
    if (sleepSideRight !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.sleep) mapped.selfCare.sleep = {} as any;
      if (!mapped.selfCare.sleep.sleepingPostures) mapped.selfCare.sleep.sleepingPostures = {} as any;
      mapped.selfCare.sleep.sleepingPostures.sideR = sleepSideRight;
    }

    const sleepSideLeft = getValue('prior-level-function_self-care_sleep_sleeping_postures_side_left');
    if (sleepSideLeft !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.sleep) mapped.selfCare.sleep = {} as any;
      if (!mapped.selfCare.sleep.sleepingPostures) mapped.selfCare.sleep.sleepingPostures = {} as any;
      mapped.selfCare.sleep.sleepingPostures.sideL = sleepSideLeft;
    }

    const sleepPillows = getValue('prior-level-function_self-care_sleep_pillows');
    if (sleepPillows !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.sleep) mapped.selfCare.sleep = {} as any;
      mapped.selfCare.sleep.pillows = sleepPillows;
    }

    // Sleep - Surface Flag
    const surfaceFlag = getValue('prior-level-function_self-care_sleep_surface');
    if (surfaceFlag !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.sleep.surface) mapped.selfCare.sleep.surface = {} as any;
      mapped.selfCare.sleep.surface.surfaceFlag = surfaceFlag;
    }

    const sleepSurfaceFirm = getValue('prior-level-function_self-care_sleep_surface_firm');
    if (sleepSurfaceFirm !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.sleep) mapped.selfCare.sleep = {} as any;
      if (!mapped.selfCare.sleep.surface) mapped.selfCare.sleep.surface = {} as any;
      mapped.selfCare.sleep.surface.firm = sleepSurfaceFirm;
    }

    const sleepSurfaceSoft = getValue('prior-level-function_self-care_sleep_surface_soft');
    if (sleepSurfaceSoft !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.sleep) mapped.selfCare.sleep = {} as any;
      if (!mapped.selfCare.sleep.surface) mapped.selfCare.sleep.surface = {} as any;
      mapped.selfCare.sleep.surface.soft = sleepSurfaceSoft;
    }

    const sleepSurfaceSag = getValue('prior-level-function_self-care_sleep_surface_sag');
    if (sleepSurfaceSag !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.sleep) mapped.selfCare.sleep = {} as any;
      if (!mapped.selfCare.sleep.surface) mapped.selfCare.sleep.surface = {} as any;
      mapped.selfCare.sleep.surface.sag = sleepSurfaceSag;
    }

    // Self Care - IADLs
    const iADLsFlag = getValue('prior-level-function_self-care_iadls');
    if (iADLsFlag !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.iadls) mapped.selfCare.iadls = {} as any;
      mapped.selfCare.iadls.iadlsFlag = iADLsFlag;
    }

    const iADLsTelephone = getValue('prior-level-function_self-care_iadls_use_telephone');
    if (iADLsTelephone !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.iadls) mapped.selfCare.iadls = {} as any;
      mapped.selfCare.iadls.abilityToUseTelephone = iADLsTelephone;
    }

    const iADLsShopping = getValue('prior-level-function_self-care_iadls_shopping');
    if (iADLsShopping !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.iadls) mapped.selfCare.iadls = {} as any;
      mapped.selfCare.iadls.shopping = iADLsShopping;
    }

    const iADLsFoodPrep = getValue('prior-level-function_self-care_iadls_food_prep');
    if (iADLsFoodPrep !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.iadls) mapped.selfCare.iadls = {} as any;
      mapped.selfCare.iadls.foodPreparation = iADLsFoodPrep;
    }

    const iADLsHousekeeping = getValue('prior-level-function_self-care_iadls_housekeeping');
    if (iADLsHousekeeping !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.iadls) mapped.selfCare.iadls = {} as any;
      mapped.selfCare.iadls.housekeeping = iADLsHousekeeping;
    }

    const iADLsLaundry = getValue('prior-level-function_self-care_iadls_laundry_iadl');
    if (iADLsLaundry !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.iadls) mapped.selfCare.iadls = {} as any;
      mapped.selfCare.iadls.laundry = iADLsLaundry;
    }

    const iADLsTransportation = getValue('prior-level-function_self-care_iadls_transportation');
    if (iADLsTransportation !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.iadls) mapped.selfCare.iadls = {} as any;
      mapped.selfCare.iadls.modeOfTransportation = iADLsTransportation;
    }

    const iADLsMedications = getValue('prior-level-function_self-care_iadls_medications');
    if (iADLsMedications !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.iadls) mapped.selfCare.iadls = {} as any;
      mapped.selfCare.iadls.responsibilityForOwnMedications = iADLsMedications;
    }

    const iADLsFinances = getValue('prior-level-function_self-care_iadls_finances');
    if (iADLsFinances !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.iadls) mapped.selfCare.iadls = {} as any;
      mapped.selfCare.iadls.abilityToHandleFinances = iADLsFinances;
    }

    // Self Care - Household Chores
    const householdChoresFlag = getValue('prior-level-function_self-care_household_chores');
    if (householdChoresFlag !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.householdChores) mapped.selfCare.householdChores = {} as any;
      mapped.selfCare.householdChores.householdChoresFlag = householdChoresFlag;
    }

    const householdChoresCook = getValue('prior-level-function_self-care_household_chores_cook_meal');
    if (householdChoresCook !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.householdChores) mapped.selfCare.householdChores = {} as any;
      mapped.selfCare.householdChores.cookAMeal = householdChoresCook;
    }

    const householdChoresLaundry = getValue('prior-level-function_self-care_household_chores_laundry_chore');
    if (householdChoresLaundry !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      if (!mapped.selfCare.householdChores) mapped.selfCare.householdChores = {} as any;
      mapped.selfCare.householdChores.laundry = householdChoresLaundry;
    }

    // Self Care - Drive Community
    const driveCommunity = getValue('prior-level-function_self-care_drive_community');
    if (driveCommunity !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      mapped.selfCare.driveCommunityDistance = driveCommunity;
    }

    // Self Care - Volunteering
    const volunteering = getValue('prior-level-function_self-care_volunteering');
    if (volunteering !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      mapped.selfCare.volunteering = volunteering;
    }

    // Self Care - Caregiving
    const caregiving = getValue('prior-level-function_self-care_caregiving');
    if (caregiving !== undefined) {
      if (!mapped.selfCare) mapped.selfCare = {} as any;
      mapped.selfCare.caregiving = caregiving;
    }
  }

}