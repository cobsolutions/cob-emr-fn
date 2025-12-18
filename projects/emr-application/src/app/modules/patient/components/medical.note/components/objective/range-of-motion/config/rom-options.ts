import { RomOption } from './rom-types';

export const ROM_TEST_OPTIONS: RomOption[] = [
  { value: 'wfl', label: 'WFL' },
  { value: 'limited', label: 'Limited' },
  { value: 'hypermobile', label: 'Hypermobile' }
];

export const CERVICAL_ROM_OPTIONS: RomOption[] = [
  { value: 'wfl', label: 'WFL' },
  { value: 'limited', label: 'Limited' }
];

export const APPLY_TO_ALL_OPTIONS: RomOption[] = [
  { value: 'not_tested', label: 'Not Tested' },
  { value: 'wfl', label: 'WFL' },
  { value: 'limited', label: 'Limited' }
];

export const FORWARD_BENDING_OPTIONS: RomOption[] = [
  { value: 'wfl', label: 'WFL' },
  { value: 'limited', label: 'Limited' },
  { value: 'painful', label: 'Painful' },
  { value: 'restricted', label: 'Restricted' }
];

export const ENDFEEL_OPTIONS: RomOption[] = [
  { value: 'soft', label: 'Soft' },
  { value: 'firm', label: 'Firm' },
  { value: 'hard', label: 'Hard' },
  { value: 'empty', label: 'Empty' }
];


export const DEFAULT_APPLY_TO_ALL_OPTIONS: RomOption[] = [
  { value: 'not_tested', label: 'Not Tested' },
  { value: 'wnl', label: 'WNL' },
  { value: 'wfl', label: 'WFL' }
]

// Cervical AROM
export const CERVICAL_AROM_OPTIONS: RomOption[] = [
  { value: 'not_tested', label: 'Not Tested' },
  { value: 'wnl', label: 'WNL' },
  { value: 'wfl', label: 'WFL' },
  { value: 'custom', label: 'Custom' },
  { value: '0', label: '0' },
  { value: '5', label: '5' },
  { value: '10', label: '10' },
  { value: '15', label: '15' },
  { value: '20', label: '20' },
  { value: '25', label: '25' },
  { value: '30', label: '30' },
  { value: '35', label: '35' },
  { value: '40', label: '40' },
  { value: '45', label: '45' },
  { value: '50', label: '50' },
  { value: '55', label: '55' },
  { value: '60', label: '60' },
  { value: '65', label: '65' },
  { value: '70', label: '70' },
  { value: '75', label: '75' },
  { value: '80', label: '80' },
  { value: '85', label: '85' },
  { value: '90', label: '90' },
  { value: '100', label: '100' }
]
export const CERVICAL_AROM_SPECIAL_OPTIONS: RomOption[] = [
  { value: 'not_tested', label: 'Not Tested' },
  { value: 'wnl', label: 'WNL' },
  { value: 'wfl', label: 'WFL' },
  { value: 'custom', label: 'Custom' },
  { value: '0', label: '0' },
  { value: '5', label: '5' },
  { value: '10', label: '10' },
  { value: '15', label: '15' },
  { value: '20', label: '20' },
  { value: '25', label: '25' },
  { value: '30', label: '30' },
  { value: '35', label: '35' },
  { value: '40', label: '40' },
  { value: '45', label: '45' },
  { value: '50', label: '50' },
  { value: '55', label: '55' },
  { value: '60', label: '60' },
  { value: '65', label: '65' },
  { value: '70', label: '70' },
  { value: '75', label: '75' },
  { value: '80', label: '80' },
  { value: '85', label: '85' },
  { value: '90', label: '90' },
  { value: '100', label: '100' },
  { value: 'b98', label: '3 Fingers From Chest' },
  { value: 'b99', label: '2 Fingers From Chest' },
  { value: 'b100', label: '1 Finger From Chest' },
  { value: 'b101', label: 'Chin To Chest' }
]

export const COSTOVERTEBRAL_EXPANSION_OPTIONS: RomOption[] = [
  { value: 'not_tested', label: 'Not Tested' },
  { value: 'wnl', label: 'WNL' },
  { value: 'wfl', label: 'WFL' },
  { value: 'custom', label: 'Custom' },
  { value: '1.0', label: '1.0' },
  { value: '2.0', label: '2.0' },
  { value: '3.0', label: '3.0' },
  { value: '4.0', label: '4.0' },
  { value: '5.0', label: '5.0' },
  { value: '6.0', label: '6.0' },
  { value: '7.0', label: '7.0' },
  { value: '8.0', label: '8.0' },
  { value: '9.0', label: '9.0' },
  { value: '10.0', label: '10.0' }
]

export const LUMBAR_AROM_OPTIONS: RomOption[] = [
  { value: 'not_tested', label: 'Not Tested' },
  { value: 'wnl', label: 'WNL' },
  { value: 'wfl', label: 'WFL' },
  { value: 'custom', label: 'Custom' },
  { value: '0', label: '0' },
  { value: '5', label: '5' },
  { value: '10', label: '10' },
  { value: '15', label: '15' },
  { value: '20', label: '20' },
  { value: '25', label: '25' },
  { value: '30', label: '30' },
  { value: '35', label: '35' },
  { value: '40', label: '40' },
  { value: '45', label: '45' },
  { value: '50', label: '50' },
  { value: '75', label: '75' },
  { value: '100', label: '100' }
]
export const LUMBAR_AROM_SPECIAL_OPTIONS: RomOption[] = [
  { value: 'not_tested', label: 'Not Tested' },
  { value: 'wnl', label: 'WNL' },
  { value: 'wfl', label: 'WFL' },
  { value: 'custom', label: 'Custom' },
  { value: '0', label: '0' },
  { value: '5', label: '5' },
  { value: '10', label: '10' },
  { value: '15', label: '15' },
  { value: '20', label: '20' },
  { value: '25', label: '25' },
  { value: '30', label: '30' },
  { value: '35', label: '35' },
  { value: '40', label: '40' },
  { value: '45', label: '45' },
  { value: '50', label: '50' },
  { value: '75', label: '75' },
  { value: '100', label: '100' },
  { value: 'b98', label: '3 Fingers From Chest' },
  { value: 'b99', label: '2 Fingers From Chest' },
  { value: 'b100', label: '1 Finger From Chest' },
  { value: 'b101', label: 'Chin To Chest' }
]
