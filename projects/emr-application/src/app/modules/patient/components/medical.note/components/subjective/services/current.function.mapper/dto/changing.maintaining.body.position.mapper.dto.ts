import { CurrentFunction } from "../../../models";

export class ChangingMaintainingBodyPositionDTOMapper {
    public static map(currentFunction: CurrentFunction, setValue: (controlName: string, value: any) => void): void {
        if (!currentFunction.changingMaintainingBodyPosition) return;

        const changing = currentFunction.changingMaintainingBodyPosition;

        // Changing Maintaining Body Position Category Flag
        setValue('current-level-function_changing-maintaining-body-position', changing.changingMaintainingBodyPositionFlag);

        // Maintaining A Body Position Flag
        setValue('current-level-function_changing-maintaining-body-position_maintaining_body_position', changing.maintainingABodyPosition.maintainingABodyPositionFlag);

        // Maintaining A Body Position
        if (changing.maintainingABodyPosition) {
          setValue('current-level-function_changing-maintaining-body-position_maintaining_body_position_remaining_seated', changing.maintainingABodyPosition.remainingSeated);
          setValue('current-level-function_changing-maintaining-body-position_maintaining_body_position_remaining_standing', changing.maintainingABodyPosition.remainingStanding);
          setValue('current-level-function_changing-maintaining-body-position_maintaining_body_position_squatting', changing.maintainingABodyPosition.squatting);
          setValue('current-level-function_changing-maintaining-body-position_maintaining_body_position_kneeling', changing.maintainingABodyPosition.kneeling);
          setValue('current-level-function_changing-maintaining-body-position_maintaining_body_position_sitting', changing.maintainingABodyPosition.sitting);
          setValue('current-level-function_changing-maintaining-body-position_maintaining_body_position_standing', changing.maintainingABodyPosition.standing);
        }

        // Transfers Flag
        setValue('current-level-function_changing-maintaining-body-position_transfers', changing.transfers.transfersFlag);

        // Transfers
        if (changing.transfers) {
          setValue('current-level-function_changing-maintaining-body-position_transfers_bed_to_chair', changing.transfers.movingFromBedToChair);
          setValue('current-level-function_changing-maintaining-body-position_transfers_sliding_bench', changing.transfers.slidingAlongABench);
        }

        // IADLs Flag
        setValue('current-level-function_changing-maintaining-body-position_body_position_iadls', changing.iadls.iadlsFlag);

        // IADLs
        if (changing.iadls) {
          setValue('current-level-function_changing-maintaining-body-position_body_position_iadls_body_position_use_telephone', changing.iadls.abilityToUseTelephone);
          setValue('current-level-function_changing-maintaining-body-position_body_position_iadls_body_position_shopping', changing.iadls.shopping);
          setValue('current-level-function_changing-maintaining-body-position_body_position_iadls_body_position_food_prep', changing.iadls.foodPreparation);
          setValue('current-level-function_changing-maintaining-body-position_body_position_iadls_body_position_housekeeping', changing.iadls.housekeeping);
          setValue('current-level-function_changing-maintaining-body-position_body_position_iadls_body_position_laundry', changing.iadls.laundry);
          setValue('current-level-function_changing-maintaining-body-position_body_position_iadls_body_position_transportation', changing.iadls.modeOfTransportation);
          setValue('current-level-function_changing-maintaining-body-position_body_position_iadls_body_position_medications', changing.iadls.responsibilityForOwnMedications);
          setValue('current-level-function_changing-maintaining-body-position_body_position_iadls_body_position_finances', changing.iadls.abilityToHandleFinances);
        }
      }
}