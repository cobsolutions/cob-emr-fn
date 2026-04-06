import { RomRlInputColumnsConfig } from "../../../range-of-motion/config";

const FUNCTIONAL_REACH_ROWS = [
  { label: 'Anterior', inputCount: 1, type: 'input' as const },
  { label: 'Anterior Medial', inputCount: 1, type: 'input' as const },
  { label: 'Anterior Lateral', inputCount: 1, type: 'input' as const },
  { label: 'Medial', inputCount: 1, type: 'input' as const },
  { label: 'Lateral', inputCount: 1, type: 'input' as const },
  { label: 'Posterior', inputCount: 1, type: 'input' as const },
  { label: 'Posterior Medial', inputCount: 1, type: 'input' as const },
  { label: 'Posterior Lateral', inputCount: 1, type: 'input' as const }
];

export class FunctionalReachConfig {
  static readonly functionalReachUe: RomRlInputColumnsConfig = {
    rows: FUNCTIONAL_REACH_ROWS,
    fieldPrefix: 'pb_functional_reach_ue_',
    commentsFieldName: 'pb_functional_reach_ue_comments',
    showComments: false
  };

  static readonly functionalReachLe: RomRlInputColumnsConfig = {
    rows: FUNCTIONAL_REACH_ROWS,
    fieldPrefix: 'pb_functional_reach_le_',
    commentsFieldName: 'pb_functional_reach_le_comments',
    showComments: false
  };
}
