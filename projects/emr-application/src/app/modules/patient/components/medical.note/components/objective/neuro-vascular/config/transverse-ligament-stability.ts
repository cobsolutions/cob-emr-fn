import { RomSectionConfig } from "../../range-of-motion/config";
import { DEFAULT_APPLY_TO_ALL_OPTIONS, TransverseLigamentStability_OPTIONS } from "./neuro-vascular-options";

export class TransverseLigamentStability{
    static readonly transverseLigamentStability: RomSectionConfig = {
        labels: ['Transverse Ligament Stability'],
        options: TransverseLigamentStability_OPTIONS,
        applyToAllOptions:DEFAULT_APPLY_TO_ALL_OPTIONS,
        fieldPrefix: 'transverse_ligament_stability_',
        applyToAllFieldName: '',
        commentsFieldName: '',
        showApplyToAll: false,
        showComments: false
      };
}