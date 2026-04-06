import { RomSectionConfig } from "../../range-of-motion/config";
import { DEFAULT_APPLY_TO_ALL_OPTIONS, MyotomesLower_OPTIONS } from "./neuro-vascular-options";

export interface MyotomesLower {
  enabled: boolean;
}

export class MyotomesLower {
  static readonly myotomesLowerSelect: RomSectionConfig = {
    labels: [
      'L1, 2 Iliopsoas',
      'L3 Quadriceps',
      'L4 Anterior Tibialis',
      'L5 EHL',
      'S1 Gastroc',
      'S2 Hamstrings'
    ],
    options: MyotomesLower_OPTIONS,
    applyToAllOptions: DEFAULT_APPLY_TO_ALL_OPTIONS,
    fieldPrefix: 'my_otomes_lower_',
    applyToAllFieldName: 'my_otomes_lower_apply_to_all',
    commentsFieldName: 'my_otomes_lower__comments',
    showApplyToAll: true,
    showComments: true
  };
}

