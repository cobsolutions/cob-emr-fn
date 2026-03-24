export interface RomOption {
  value: string;
  label: string;
}

export interface RomSectionConfig {
  labels: string[];
  options: RomOption[]; // Default options for all selects
  applyToAllOptions?: RomOption[]; // Options for Apply to All dropdown (defaults to options if not provided)
  specialOptions?: { [labelName: string]: RomOption[] }; // Override options for specific labels
  fieldPrefix: string;
  applyToAllFieldName: string;
  commentsFieldName: string;
  showApplyToAll?: boolean;
  showComments?: boolean;
}
export interface RomInputSectionConfig {
  labels: string[];
  fieldPrefix: string;
  commentsFieldName: string;
  showComments?: boolean;
}
export interface RomCheckSectionConfig {
  labels: string[];
  fieldPrefix: string;
  commentsFieldName: string;
  showComments?: boolean;
}

export interface RomSectionEndfeelConfig {
  labels: string[];
  measurementOptions: RomOption[]; // Default measurement options for all selects
  applyToAllMeasurementOptions?: RomOption[]; // Options for Apply to All dropdown (defaults to measurementOptions if not provided)
  specialMeasurementOptions?: { [labelName: string]: RomOption[] }; // Override measurement options for specific labels
  endfeelOptions: RomOption[];
  fieldPrefix: string;
  applyToAllFieldName: string;
  commentsFieldName: string;
  showApplyToAll?: boolean;
  showComments?: boolean;
}

export interface RomSectionDropdownTextConfig {
  columns: string[];
  labels: string[];
  options: RomOption[]; // Default options for all dropdowns
  specialOptions?: { [labelName: string]: RomOption[] }; // Override options for specific labels
  fieldPrefix: string;
  commentsFieldName: string;
  showComments?: boolean;
  hasTextInput?: boolean;
}

export interface TopSelect {
  label: string;
  fieldName: string;
  options: RomOption[];
}

export interface RomRlInputColumnsConfig {
  rows: { label: string; inputCount: number; type: 'input' | 'textarea' }[];
  fieldPrefix: string;
  commentsFieldName: string;
  showComments?: boolean;
}

export interface RomSectionWithSelectsConfig {
  labels: string[];
  options: RomOption[]; // Default options for all measurement selects
  specialOptions?: { [labelName: string]: RomOption[] }; // Override options for specific labels
  fieldPrefix: string;
  topSelects: TopSelect[];
  commentsFieldName: string;
  showComments?: boolean;
}
