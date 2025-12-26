export interface SelectOption {
  label: string;
  value: string;
}

export interface HierarchyCheckboxOption {
  label: string;
  value: string;
  formControlName: string;
  children?: HierarchyCheckboxOption[];
  showChildren?: boolean;
  childType?: 'checkbox' | 'select';
  selectOptions?: SelectOption[];
}
