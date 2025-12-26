export interface HierarchyCheckboxOption {
  label: string;
  value: string;
  formControlName: string;
  children?: HierarchyCheckboxOption[];
  showChildren?: boolean;
}
