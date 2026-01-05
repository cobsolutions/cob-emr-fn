import { PriorFunction } from "../../../models";

export class ChangingMaintainingBodyPositionDTOMapper {
    public static map(priorFunction: PriorFunction, setValue: (controlName: string, value: any) => void): void {
        if (!priorFunction.changingMaintainingBodyPosition) return;

        const changing = priorFunction.changingMaintainingBodyPosition;

        // Changing Maintaining Body Position Category Flag
        setValue('prior-level-function_changing-maintaining-body-position', changing.changingMaintainingBodyPositionFlag);

        // Maintaining A Body Position
        if (changing.maintainingABodyPosition) {
          setValue('prior-level-function_changing-maintaining-body-position_maintaining_body_position', changing.maintainingABodyPosition.maintainingABodyPositionFlag);
          setValue('prior-level-function_changing-maintaining-body-position_maintaining_body_position_remaining_seated', changing.maintainingABodyPosition.remainingSeated);
          setValue('prior-level-function_changing-maintaining-body-position_maintaining_body_position_remaining_standing', changing.maintainingABodyPosition.remainingStanding);
          setValue('prior-level-function_changing-maintaining-body-position_maintaining_body_position_squatting', changing.maintainingABodyPosition.squatting);
          setValue('prior-level-function_changing-maintaining-body-position_maintaining_body_position_kneeling', changing.maintainingABodyPosition.kneeling);
          setValue('prior-level-function_changing-maintaining-body-position_maintaining_body_position_sitting', changing.maintainingABodyPosition.sitting);
          setValue('prior-level-function_changing-maintaining-body-position_maintaining_body_position_standing', changing.maintainingABodyPosition.standing);
        }
    
        // Transfers
        if (changing.transfers) {
          setValue('prior-level-function_changing-maintaining-body-position_transfers', changing.transfers.transfersFlag);
          setValue('prior-level-function_changing-maintaining-body-position_transfers_bed_to_chair', changing.transfers.movingFromBedToChair);
          setValue('prior-level-function_changing-maintaining-body-position_transfers_sliding_bench', changing.transfers.slidingAlongABench);
        }
    
        // IADLs
        if (changing.iadls) {
          setValue('prior-level-function_changing-maintaining-body-position_body_position_iadls', changing.iadls.iadlsFlag);
          setValue('prior-level-function_changing-maintaining-body-position_body_position_iadls_body_position_use_telephone', changing.iadls.abilityToUseTelephone);
          setValue('prior-level-function_changing-maintaining-body-position_body_position_iadls_body_position_shopping', changing.iadls.shopping);
          setValue('prior-level-function_changing-maintaining-body-position_body_position_iadls_body_position_food_prep', changing.iadls.foodPreparation);
          setValue('prior-level-function_changing-maintaining-body-position_body_position_iadls_body_position_housekeeping', changing.iadls.housekeeping);
          setValue('prior-level-function_changing-maintaining-body-position_body_position_iadls_body_position_laundry', changing.iadls.laundry);
          setValue('prior-level-function_changing-maintaining-body-position_body_position_iadls_body_position_transportation', changing.iadls.modeOfTransportation);
          setValue('prior-level-function_changing-maintaining-body-position_body_position_iadls_body_position_medications', changing.iadls.responsibilityForOwnMedications);
          setValue('prior-level-function_changing-maintaining-body-position_body_position_iadls_body_position_finances', changing.iadls.abilityToHandleFinances);
        }
      }
}