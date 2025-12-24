import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CheckboxHierarchy } from './interface/checkbox-hierarchy';
import { CheckboxItem } from './interface/checkbox-item';

@Component({
  selector: 'hierarchy-checkbox',
  templateUrl: './hierarchy-checkbox.component.html',
  styleUrls: ['./hierarchy-checkbox.component.css']
})
export class HierarchyCheckboxComponent implements OnInit {
  @Input() data: CheckboxHierarchy[] = [];
  @Input() columns: number = 2;
  @Input() formGroup!: FormGroup;
  @Input() sectionPrefix: string = ''; // Optional prefix for form control names
  @Output() selectionChange = new EventEmitter<CheckboxHierarchy[]>();

  // Track category checked states separately
  categoryCheckedStates: Map<string, boolean> = new Map();
  categoryIndeterminateStates: Map<string, boolean> = new Map();

  // Map to store the unique form control names for each item
  private itemFormControlNames: Map<CheckboxItem, string> = new Map();

  // Map to store the unique form control names for category comments
  private categoryCommentFormControlNames: Map<CheckboxHierarchy, string> = new Map();

  ngOnInit() {
    this.initializeCollapsedState();
    this.initializeFormControls();
  }

  // Initialize form controls for all hierarchy items
  private initializeFormControls(): void {
    if (!this.formGroup) return;

    this.data.forEach(category => {
      const categoryKey = this.sanitizeKey(category.title);

      // Add form control for category comment
      this.addCategoryCommentToForm(category, categoryKey);

      category.items.forEach(item => {
        this.addItemToForm(item, categoryKey);
      });
    });
  }

  // Add category comment form control
  private addCategoryCommentToForm(category: CheckboxHierarchy, categoryKey: string): void {
    if (!this.formGroup) return;

    const commentFormControlName = this.generateCategoryCommentFormControlName(categoryKey);

    // Store the mapping between category and its comment form control name
    this.categoryCommentFormControlNames.set(category, commentFormControlName);

    // Add form control for the comment
    this.formGroup.addControl(commentFormControlName, new FormControl(category.comment || ''));
  }

  // Generate unique form control name for category comment
  private generateCategoryCommentFormControlName(categoryKey: string): string {
    const parts: string[] = [];

    if (this.sectionPrefix) {
      parts.push(this.sectionPrefix);
    }

    parts.push(categoryKey);
    parts.push('comment');

    return parts.join('_');
  }

  // Generate unique form control name for an item
  private generateFormControlName(categoryKey: string, itemPath: string): string {
    const parts: string[] = [];

    if (this.sectionPrefix) {
      parts.push(this.sectionPrefix);
    }

    parts.push(categoryKey);
    parts.push(itemPath);

    return parts.join('_');
  }

  // Sanitize a string to be used as a key (remove spaces, special chars, convert to lowercase)
  private sanitizeKey(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  // Recursively add item and its children to the form
  private addItemToForm(item: CheckboxItem, categoryKey: string, parentPath: string = ''): void {
    if (!this.formGroup) return;

    // Build the hierarchical path for this item
    const itemPath = parentPath ? `${parentPath}.${item.id}` : item.id;

    // Generate unique form control name
    const formControlName = this.generateFormControlName(categoryKey, itemPath);

    // Store the mapping between item and its form control name
    this.itemFormControlNames.set(item, formControlName);

    // Add form control for this item
    this.formGroup.addControl(formControlName, new FormControl(item.checked || false));

    // Recursively add children
    if (item.children) {
      item.children.forEach(child => {
        this.addItemToForm(child, categoryKey, itemPath);
      });
    }
  }

  // Update form control value when checkbox changes
  private updateFormControl(item: CheckboxItem): void {
    if (!this.formGroup) return;

    // Get the unique form control name for this item
    const formControlName = this.itemFormControlNames.get(item);
    if (!formControlName) return;

    const control = this.formGroup.get(formControlName);
    if (control) {
      control.setValue(item.checked || false);
    }
  }

  // Update all form controls recursively
  private updateFormControlsRecursively(item: CheckboxItem): void {
    this.updateFormControl(item);

    if (item.children) {
      item.children.forEach(child => {
        this.updateFormControlsRecursively(child);
      });
    }
  }

  private initializeCollapsedState(): void {
    this.data.forEach(category => {
      if (category.collapsed === undefined) {
        category.collapsed = true; // Collapsed by default
      }
      if (category.checked === undefined) {
        category.checked = false; // Unchecked by default
      }

      // Initialize category states
      this.updateCategoryState(category);

      category.items.forEach(item => {
        this.setInitialCollapsedState(item);
      });
    });
  }

  private setInitialCollapsedState(item: CheckboxItem): void {
    if (item.collapsed === undefined) {
      item.collapsed = true; // Collapsed by default
    }

    if (item.children) {
      item.children.forEach(child => {
        this.setInitialCollapsedState(child);
      });
    }
  }

  // Update category checkbox state based on children
  updateCategoryState(category: CheckboxHierarchy): void {
    const hasCheckedChildren = category.items.some(item => this.isItemChecked(item));
    const allChildrenChecked = category.items.every(item => this.isItemChecked(item));
    const hasIndeterminate = category.items.some(item => this.isItemIndeterminate(item));

    this.categoryCheckedStates.set(category.title, allChildrenChecked);
    this.categoryIndeterminateStates.set(category.title, hasCheckedChildren && !allChildrenChecked || hasIndeterminate);
  }

  // Toggle category checkbox - check the category and expand without checking children
  onCategoryCheckboxClick(category: CheckboxHierarchy, event: MouseEvent): void {
    event.preventDefault(); // Prevent default checkbox behavior
    event.stopPropagation();

    // Toggle checked state for UX
    category.checked = !category.checked;

    if (category.checked) {
      // When checking, expand the category without checking children
      category.collapsed = false;
    } else {
      // When unchecking, collapse the category and uncheck all children
      category.collapsed = true;
      category.items.forEach(item => {
        this.uncheckChildren(item);
      });
    }

    this.selectionChange.emit(this.data);
  }

  // Toggle regular item checkbox
  onItemCheckboxChange(item: CheckboxItem, event: Event): void {
    const target = event.target as HTMLInputElement;
    const checked = target.checked;

    this.toggleItem(item, checked);

    // Update form controls recursively
    this.updateFormControlsRecursively(item);

    // Update category states
    this.updateAllCategoryStates();

    this.selectionChange.emit(this.data);
  }

  // Expand first level children
  expandFirstLevelChildren(item: CheckboxItem): void {
    item.collapsed = false;

    if (item.children) {
      item.children.forEach(child => {
        child.collapsed = true; // Keep children's children collapsed
      });
    }
  }

  // Collapse all children of an item
  collapseAllChildren(item: CheckboxItem): void {
    item.collapsed = true;

    if (item.children) {
      item.children.forEach(child => {
        this.collapseAllChildren(child);
      });
    }
  }

  // Add All functionality for item
  addAllFirstLevel(item: CheckboxItem): void {
    if (item.children) {
      // Check only first level children
      item.children.forEach(child => {
        child.checked = true;
        child.indeterminate = false;

        // Update form control for this child
        this.updateFormControl(child);

        // Uncheck deeper levels (grandchildren and beyond)
        this.uncheckDescendants(child);
      });

      // Update parent state
      this.updateParentState(item);

      // Update category states
      this.updateAllCategoryStates();

      this.selectionChange.emit(this.data);
    }
  }

  // Remove All functionality for item
  removeAllFirstLevel(item: CheckboxItem): void {
    if (item.children) {
      // Uncheck only first level children
      item.children.forEach(child => {
        child.checked = false;
        child.indeterminate = false;

        // Update form control for this child
        this.updateFormControl(child);

        // Also uncheck all their descendants
        this.uncheckDescendants(child);
      });

      // Update parent state
      this.updateParentState(item);

      // Update category states
      this.updateAllCategoryStates();

      this.selectionChange.emit(this.data);
    }
  }

  // Check if all first level children are checked
  areAllFirstLevelChildrenChecked(item: CheckboxItem): boolean {
    if (!item.children || item.children.length === 0) return false;
    return item.children.every(child => child.checked);
  }

  // Add All for entire category - check only the direct items, not their children
  addAllFirstLevelForCategory(category: CheckboxHierarchy): void {
    category.items.forEach(item => {
      item.checked = true;
      item.indeterminate = false;

      // Update form control for this item
      this.updateFormControl(item);

      // Uncheck all descendants of this item
      this.uncheckDescendants(item);
    });

    // Update category states
    this.updateAllCategoryStates();

    this.selectionChange.emit(this.data);
  }

  // Remove All for entire category
  removeAllFirstLevelForCategory(category: CheckboxHierarchy): void {
    category.items.forEach(item => {
      item.checked = false;
      item.indeterminate = false;

      // Update form control for this item
      this.updateFormControl(item);

      // Uncheck all descendants of this item
      this.uncheckDescendants(item);
    });

    // Update category states
    this.updateAllCategoryStates();

    this.selectionChange.emit(this.data);
  }

  // Check if all direct items in category are checked
  areAllCategoryItemsChecked(category: CheckboxHierarchy): boolean {
    return category.items.length > 0 && category.items.every(item => item.checked);
  }

  // Uncheck all children
  private uncheckChildren(item: CheckboxItem): void {
    item.checked = false;
    item.indeterminate = false;

    // Update form control
    this.updateFormControl(item);

    if (item.children) {
      item.children.forEach(child => {
        this.uncheckChildren(child);
      });
    }
  }

  // Uncheck only descendants (not the item itself)
  private uncheckDescendants(item: CheckboxItem): void {
    if (item.children) {
      item.children.forEach(child => {
        child.checked = false;
        child.indeterminate = false;

        // Update form control for this child
        this.updateFormControl(child);

        this.uncheckDescendants(child);
      });
    }
  }

  // Check if item should show "Add All" button - only when item is checked and expanded
  shouldShowAddAllButton(item: CheckboxItem): boolean {
    return item.checked && !item.collapsed && item.children && item.children.length > 0;
  }

  // Toggle item collapse
  toggleItemCollapse(item: CheckboxItem): void {
    item.collapsed = !item.collapsed;
  }

  // Get arrow icon for categories
  getCategoryArrowIcon(category: CheckboxHierarchy): string {
    return category.collapsed ? '▶' : '▼';
  }

  // Get arrow icon for items
  getItemArrowIcon(item: CheckboxItem): string {
    if (!item.children || item.children.length === 0) {
      return '';
    }
    return item.collapsed ? '▶' : '▼';
  }

  // Toggle item with proper parent updates
  toggleItem(item: CheckboxItem, checked: boolean): void {
    item.checked = checked;
    item.indeterminate = false;

    // Handle expand/collapse based on checked state
    if (checked) {
      this.expandFirstLevelChildren(item);
      // Don't automatically check children - let user use "Add All" button
    } else {
      this.collapseAllChildren(item);
      // Uncheck all children when parent is unchecked
      if (item.children) {
        this.updateChildren(item, false);
      }
    }

    // Update parent state
    this.updateParentState(item);
  }

  // Update children check state
  updateChildren(item: CheckboxItem, checked: boolean): void {
    if (!item.children) return;

    item.children.forEach(child => {
      child.checked = checked;
      child.indeterminate = false;

      // Update form control for this child
      this.updateFormControl(child);

      this.updateChildren(child, checked);
    });
  }

  // Update parent state
  updateParentState(item: CheckboxItem): void {
    if (!item.parent) return;

    const parent = item.parent;
    const children = parent.children;

    if (!children) return;

    const allChecked = children.every(child => child.checked);
    const someChecked = children.some(child => child.checked || child.indeterminate);

    parent.checked = allChecked;
    parent.indeterminate = !allChecked && someChecked;

    this.updateParentState(parent);
  }

  // Update all category states
  updateAllCategoryStates(): void {
    this.data.forEach(category => {
      this.updateCategoryState(category);
    });
  }

  // Helper methods
  isItemChecked(item: CheckboxItem): boolean {
    if (item.checked) return true;
    if (item.children) {
      return item.children.some(child => this.isItemChecked(child));
    }
    return false;
  }

  isItemIndeterminate(item: CheckboxItem): boolean {
    if (item.indeterminate) return true;
    if (item.children) {
      return item.children.some(child => this.isItemIndeterminate(child) ||
        (this.isItemChecked(child) && !this.isAllChildrenChecked(child)));
    }
    return false;
  }

  private isAllChildrenChecked(item: CheckboxItem): boolean {
    if (!item.children) return true;
    return item.children.every(child => this.isItemChecked(child));
  }

  getColumnData(): CheckboxHierarchy[][] {
    const result: CheckboxHierarchy[][] = [];
    const itemsPerColumn = Math.ceil(this.data.length / this.columns);

    for (let i = 0; i < this.columns; i++) {
      const startIndex = i * itemsPerColumn;
      const endIndex = startIndex + itemsPerColumn;
      result.push(this.data.slice(startIndex, endIndex));
    }

    return result;
  }

  hasChildren(item: CheckboxItem): boolean {
    return !!item.children && item.children.length > 0;
  }

  // Check if category is checked (for visual state)
  isCategoryChecked(category: CheckboxHierarchy): boolean {
    return category.checked || false;
  }

  isCategoryIndeterminate(category: CheckboxHierarchy): boolean {
    // Don't show indeterminate if category is explicitly checked
    if (category.checked) return false;
    return this.categoryIndeterminateStates.get(category.title) || false;
  }
  // Toggle category collapse (for arrow button)
  toggleCategoryCollapse(category: CheckboxHierarchy): void {
    category.collapsed = !category.collapsed;
  }

  // Handle category comment change
  onCategoryCommentChange(category: CheckboxHierarchy, event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    category.comment = target.value;

    // Update form control
    if (this.formGroup) {
      const formControlName = this.categoryCommentFormControlNames.get(category);
      if (formControlName) {
        const control = this.formGroup.get(formControlName);
        if (control) {
          control.setValue(target.value);
        }
      }
    }

    this.selectionChange.emit(this.data);
  }
}
