export interface RomOption {
  value: string;
  label: string;
}

export interface RomSectionConfig {
  labels: string[];
  options: RomOption[];
  fieldPrefix: string;
  applyToAllFieldName: string;
  commentsFieldName: string;
  showApplyToAll?: boolean;
  showComments?: boolean;
}

export interface RomSectionEndfeelConfig {
  labels: string[];
  measurementOptions: RomOption[];
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
  options: RomOption[];
  fieldPrefix: string;
  commentsFieldName: string;
  showComments?: boolean;
}

export interface TopSelect {
  label: string;
  fieldName: string;
  options: RomOption[];
}

export interface RomSectionWithSelectsConfig {
  labels: string[];
  options: RomOption[];
  fieldPrefix: string;
  topSelects: TopSelect[];
  commentsFieldName: string;
  showComments?: boolean;
}
