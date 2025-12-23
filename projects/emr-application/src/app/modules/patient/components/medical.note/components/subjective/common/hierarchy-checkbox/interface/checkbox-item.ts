export interface CheckboxItem {
  id: string;
  label: string;
  checked: boolean;
  indeterminate: boolean;
  collapsed: boolean; // Already exists
  children?: CheckboxItem[];
  parent?: CheckboxItem;
}