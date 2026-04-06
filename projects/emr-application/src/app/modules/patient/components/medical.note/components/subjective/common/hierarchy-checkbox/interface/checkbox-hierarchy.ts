import { CheckboxItem } from "./checkbox-item";

export interface CheckboxHierarchy {
  title: string;
  collapsed: boolean; // Add collapsed state for category too
  checked?: boolean; // Add checked state for UX purposes
  comment?: string; // Comment field for the category
  items: CheckboxItem[];
}