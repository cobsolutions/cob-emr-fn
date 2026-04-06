import { RomInputSectionConfig } from "../../../range-of-motion/config";

export interface SingleLegHopTestForDistance {
  enabled: boolean;
}

export class SingleLegHopTestForDistance {
  static readonly singleLegHopTestForDistance: RomInputSectionConfig = {
    labels: [
      'Hold Duration'
    ],
    fieldPrefix: 'single_leg_hop_test_for_distance_',
    showComments: false,
    commentsFieldName: ""
  };
}

