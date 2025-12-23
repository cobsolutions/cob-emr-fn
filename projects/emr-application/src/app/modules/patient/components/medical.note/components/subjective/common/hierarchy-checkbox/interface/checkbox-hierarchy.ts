import { CheckboxItem } from "./checkbox-item";

export interface CheckboxHierarchy {
  title: string;
  collapsed: boolean; // Add collapsed state for category too
  items: CheckboxItem[];
}