export interface CheckboxItem {
  id: string;
  label: string;
  checked: boolean;
  indeterminate: boolean;
  collapsed: boolean; // Already exists
  children?: CheckboxItem[];
  parent?: CheckboxItem;
  hasInput?: boolean; // If true, show input field when checked
  inputPlaceholder?: string; // Placeholder for the input field
  inputValue?: string; // Value of the input field
}