import { DEFAULT_APPLY_TO_ALL_OPTIONS, RomSectionConfig } from "../../range-of-motion/config";
import { allensTestCirculation_OPTIONS } from "./neuro-vascular-options";

export interface AllensTestCirculation {
  enabled: boolean;
}

export class AllensTestCirculation {
  static readonly allensTestCirculation: RomSectionConfig = {
  labels: [
    'Radial Artery',
    'Ulnar Artery'
  ],
  options: allensTestCirculation_OPTIONS,
  applyToAllOptions: DEFAULT_APPLY_TO_ALL_OPTIONS,
  fieldPrefix: 'allens_test_circulation_',
  applyToAllFieldName: '',
  commentsFieldName: '',
  showApplyToAll: false,
  showComments: false
};

}

