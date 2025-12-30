import { PriorFunction } from "../../../models";

export class ChangingMaintainingBodyPositionDTOMapper {
    public static map(priorFunction: PriorFunction, setValue: (controlName: string, value: any) => void): void {
        if (!priorFunction.changingMaintainingBodyPosition) return;
    
        const changing = priorFunction.changingMaintainingBodyPosition;
    
        // Maintaining A Body Position
        if (changing.maintainingABodyPosition) {
          setValue('prior-level-function_changing-maintaining-body-position_maintaining_body_position_remaining_seated', changing.maintainingABodyPosition.remainingSeated);
          setValue('prior-level-function_changing-maintaining-body-position_maintaining_body_position_remaining_standing', changing.maintainingABodyPosition.remainingStanding);
          setValue('prior-level-function_changing-maintaining-body-position_maintaining_body_position_squatting', changing.maintainingABodyPosition.squatting);
          setValue('prior-level-function_changing-maintaining-body-position_maintaining_body_position_kneeling', changing.maintainingABodyPosition.kneeling);
          setValue('prior-level-function_changing-maintaining-body-position_maintaining_body_position_sitting', changing.maintainingABodyPosition.sitting);
          setValue('prior-level-function_changing-maintaining-body-position_maintaining_body_position_standing', changing.maintainingABodyPosition.standing);
        }
    
        // Transfers
        if (changing.transfers) {
          setValue('prior-level-function_changing-maintaining-body-position_transfers_bed_to_chair', changing.transfers.movingFromBedToChair);
          setValue('prior-level-function_changing-maintaining-body-position_transfers_sliding_bench', changing.transfers.slidingAlongABench);
        }
    
        // IADLs
        if (changing.iADLs) {
          setValue('prior-level-function_changing-maintaining-body-position_body_position_iadls_body_position_use_telephone', changing.iADLs.abilityToUseTelephone);
          setValue('prior-level-function_changing-maintaining-body-position_body_position_iadls_body_position_shopping', changing.iADLs.shopping);
          setValue('prior-level-function_changing-maintaining-body-position_body_position_iadls_body_position_food_prep', changing.iADLs.foodPreparation);
          setValue('prior-level-function_changing-maintaining-body-position_body_position_iadls_body_position_housekeeping', changing.iADLs.housekeeping);
          setValue('prior-level-function_changing-maintaining-body-position_body_position_iadls_body_position_laundry', changing.iADLs.laundry);
          setValue('prior-level-function_changing-maintaining-body-position_body_position_iadls_body_position_transportation', changing.iADLs.modeOfTransportation);
          setValue('prior-level-function_changing-maintaining-body-position_body_position_iadls_body_position_medications', changing.iADLs.responsibilityForOwnMedications);
          setValue('prior-level-function_changing-maintaining-body-position_body_position_iadls_body_position_finances', changing.iADLs.abilityToHandleFinances);
        }
      }
}