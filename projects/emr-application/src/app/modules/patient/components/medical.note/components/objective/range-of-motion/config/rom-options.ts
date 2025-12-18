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
