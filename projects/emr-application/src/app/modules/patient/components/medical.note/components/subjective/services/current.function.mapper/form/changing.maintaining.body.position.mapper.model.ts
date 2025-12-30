import { FormGroup } from "@angular/forms";
import { CurrentFunction, PriorFunction } from "../../../models";


export class ChangingMaintainingBodyPositionMapper {
    public  static map(formGroup: FormGroup, mapped: CurrentFunction, getValue: (controlName: string) => any): void {
        // ========== CHANGING MAINTAINING BODY POSITION ==========
        const maintainingABodyPositionFlag = getValue('current-level-function_changing-maintaining-body-position_maintaining_body_position');
        if (maintainingABodyPositionFlag !== undefined) {
            if (!mapped.changingMaintainingBodyPosition) mapped.changingMaintainingBodyPosition = {} as any;
            mapped.changingMaintainingBodyPosition.maintainingABodyPositionFlag = maintainingABodyPositionFlag;
        }
        // Maintaining A Body Position
        const remainingSeated = getValue('current-level-function_changing-maintaining-body-position_maintaining_body_position_remaining_seated');
        if (remainingSeated !== undefined) {
            if (!mapped.changingMaintainingBodyPosition) mapped.changingMaintainingBodyPosition = {} as any;
            if (!mapped.changingMaintainingBodyPosition.maintainingABodyPosition) mapped.changingMaintainingBodyPosition.maintainingABodyPosition = {} as any;
            mapped.changingMaintainingBodyPosition.maintainingABodyPosition.remainingSeated = remainingSeated;
        }

        const remainingStanding = getValue('current-level-function_changing-maintaining-body-position_maintaining_body_position_remaining_standing');
        if (remainingStanding !== undefined) {
            if (!mapped.changingMaintainingBodyPosition) mapped.changingMaintainingBodyPosition = {} as any;
            if (!mapped.changingMaintainingBodyPosition.maintainingABodyPosition) mapped.changingMaintainingBodyPosition.maintainingABodyPosition = {} as any;
            mapped.changingMaintainingBodyPosition.maintainingABodyPosition.remainingStanding = remainingStanding;
        }

        const squatting = getValue('current-level-function_changing-maintaining-body-position_maintaining_body_position_squatting');
        if (squatting !== undefined) {
            if (!mapped.changingMaintainingBodyPosition) mapped.changingMaintainingBodyPosition = {} as any;
            if (!mapped.changingMaintainingBodyPosition.maintainingABodyPosition) mapped.changingMaintainingBodyPosition.maintainingABodyPosition = {} as any;
            mapped.changingMaintainingBodyPosition.maintainingABodyPosition.squatting = squatting;
        }

        const kneeling = getValue('current-level-function_changing-maintaining-body-position_maintaining_body_position_kneeling');
        if (kneeling !== undefined) {
            if (!mapped.changingMaintainingBodyPosition) mapped.changingMaintainingBodyPosition = {} as any;
            if (!mapped.changingMaintainingBodyPosition.maintainingABodyPosition) mapped.changingMaintainingBodyPosition.maintainingABodyPosition = {} as any;
            mapped.changingMaintainingBodyPosition.maintainingABodyPosition.kneeling = kneeling;
        }

        const sitting = getValue('current-level-function_changing-maintaining-body-position_maintaining_body_position_sitting');
        if (sitting !== undefined) {
            if (!mapped.changingMaintainingBodyPosition) mapped.changingMaintainingBodyPosition = {} as any;
            if (!mapped.changingMaintainingBodyPosition.maintainingABodyPosition) mapped.changingMaintainingBodyPosition.maintainingABodyPosition = {} as any;
            mapped.changingMaintainingBodyPosition.maintainingABodyPosition.sitting = sitting;
        }

        const standing = getValue('current-level-function_changing-maintaining-body-position_maintaining_body_position_standing');
        if (standing !== undefined) {
            if (!mapped.changingMaintainingBodyPosition) mapped.changingMaintainingBodyPosition = {} as any;
            if (!mapped.changingMaintainingBodyPosition.maintainingABodyPosition) mapped.changingMaintainingBodyPosition.maintainingABodyPosition = {} as any;
            mapped.changingMaintainingBodyPosition.maintainingABodyPosition.standing = standing;
        }

        const transfersFlag = getValue('current-level-function_changing-maintaining-body-position_transfers');
        if (transfersFlag !== undefined) {
            if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
            mapped.changingMaintainingBodyPosition.transfersFlag = transfersFlag;
        }
        // Transfers
        const bedToChair = getValue('current-level-function_changing-maintaining-body-position_transfers_bed_to_chair');
        if (bedToChair !== undefined) {
            if (!mapped.changingMaintainingBodyPosition) mapped.changingMaintainingBodyPosition = {} as any;
            if (!mapped.changingMaintainingBodyPosition.transfers) mapped.changingMaintainingBodyPosition.transfers = {} as any;
            mapped.changingMaintainingBodyPosition.transfers.movingFromBedToChair = bedToChair;
        }

        const slidingBench = getValue('current-level-function_changing-maintaining-body-position_transfers_sliding_bench');
        if (slidingBench !== undefined) {
            if (!mapped.changingMaintainingBodyPosition) mapped.changingMaintainingBodyPosition = {} as any;
            if (!mapped.changingMaintainingBodyPosition.transfers) mapped.changingMaintainingBodyPosition.transfers = {} as any;
            mapped.changingMaintainingBodyPosition.transfers.slidingAlongABench = slidingBench;
        }

        const iADLsFlag = getValue('current-level-function_changing-maintaining-body-position_body_position_iadls');
        if (iADLsFlag !== undefined) {
            if (!mapped.mobilityWalkingMovingAround) mapped.mobilityWalkingMovingAround = {} as any;
            mapped.changingMaintainingBodyPosition.iADLsFlag = iADLsFlag;
        }
        // Body Position IADLs
        const bodyPositionTelephone = getValue('current-level-function_changing-maintaining-body-position_body_position_iadls_body_position_use_telephone');
        if (bodyPositionTelephone !== undefined) {
            if (!mapped.changingMaintainingBodyPosition) mapped.changingMaintainingBodyPosition = {} as any;
            if (!mapped.changingMaintainingBodyPosition.iADLs) mapped.changingMaintainingBodyPosition.iADLs = {} as any;
            mapped.changingMaintainingBodyPosition.iADLs.abilityToUseTelephone = bodyPositionTelephone;
        }

        const bodyPositionShopping = getValue('current-level-function_changing-maintaining-body-position_body_position_iadls_body_position_shopping');
        if (bodyPositionShopping !== undefined) {
            if (!mapped.changingMaintainingBodyPosition) mapped.changingMaintainingBodyPosition = {} as any;
            if (!mapped.changingMaintainingBodyPosition.iADLs) mapped.changingMaintainingBodyPosition.iADLs = {} as any;
            mapped.changingMaintainingBodyPosition.iADLs.shopping = bodyPositionShopping;
        }

        const bodyPositionFoodPrep = getValue('current-level-function_changing-maintaining-body-position_body_position_iadls_body_position_food_prep');
        if (bodyPositionFoodPrep !== undefined) {
            if (!mapped.changingMaintainingBodyPosition) mapped.changingMaintainingBodyPosition = {} as any;
            if (!mapped.changingMaintainingBodyPosition.iADLs) mapped.changingMaintainingBodyPosition.iADLs = {} as any;
            mapped.changingMaintainingBodyPosition.iADLs.foodPreparation = bodyPositionFoodPrep;
        }

        const bodyPositionHousekeeping = getValue('current-level-function_changing-maintaining-body-position_body_position_iadls_body_position_housekeeping');
        if (bodyPositionHousekeeping !== undefined) {
            if (!mapped.changingMaintainingBodyPosition) mapped.changingMaintainingBodyPosition = {} as any;
            if (!mapped.changingMaintainingBodyPosition.iADLs) mapped.changingMaintainingBodyPosition.iADLs = {} as any;
            mapped.changingMaintainingBodyPosition.iADLs.housekeeping = bodyPositionHousekeeping;
        }

        const bodyPositionLaundry = getValue('current-level-function_changing-maintaining-body-position_body_position_iadls_body_position_laundry');
        if (bodyPositionLaundry !== undefined) {
            if (!mapped.changingMaintainingBodyPosition) mapped.changingMaintainingBodyPosition = {} as any;
            if (!mapped.changingMaintainingBodyPosition.iADLs) mapped.changingMaintainingBodyPosition.iADLs = {} as any;
            mapped.changingMaintainingBodyPosition.iADLs.laundry = bodyPositionLaundry;
        }

        const bodyPositionTransportation = getValue('current-level-function_changing-maintaining-body-position_body_position_iadls_body_position_transportation');
        if (bodyPositionTransportation !== undefined) {
            if (!mapped.changingMaintainingBodyPosition) mapped.changingMaintainingBodyPosition = {} as any;
            if (!mapped.changingMaintainingBodyPosition.iADLs) mapped.changingMaintainingBodyPosition.iADLs = {} as any;
            mapped.changingMaintainingBodyPosition.iADLs.modeOfTransportation = bodyPositionTransportation;
        }

        const bodyPositionMedications = getValue('current-level-function_changing-maintaining-body-position_body_position_iadls_body_position_medications');
        if (bodyPositionMedications !== undefined) {
            if (!mapped.changingMaintainingBodyPosition) mapped.changingMaintainingBodyPosition = {} as any;
            if (!mapped.changingMaintainingBodyPosition.iADLs) mapped.changingMaintainingBodyPosition.iADLs = {} as any;
            mapped.changingMaintainingBodyPosition.iADLs.responsibilityForOwnMedications = bodyPositionMedications;
        }

        const bodyPositionFinances = getValue('current-level-function_changing-maintaining-body-position_body_position_iadls_body_position_finances');
        if (bodyPositionFinances !== undefined) {
            if (!mapped.changingMaintainingBodyPosition) mapped.changingMaintainingBodyPosition = {} as any;
            if (!mapped.changingMaintainingBodyPosition.iADLs) mapped.changingMaintainingBodyPosition.iADLs = {} as any;
            mapped.changingMaintainingBodyPosition.iADLs.abilityToHandleFinances = bodyPositionFinances;
        }
    }
}