import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CheckboxHierarchy } from './interface/checkbox-hierarchy';
import { CheckboxItem } from './interface/checkbox-item';

@Component({
  selector: 'app-hierarchy-checkbox',
  templateUrl: './hierarchy-checkbox.component.html',
  styleUrls: ['./hierarchy-checkbox.component.css']
})
export class HierarchyCheckboxComponent implements OnInit {
  @Input() data: CheckboxHierarchy[] = [];
  @Input() columns: number = 2;
  @Output() selectionChange = new EventEmitter<CheckboxHierarchy[]>();

  // Track category checked states separately
  categoryCheckedStates: Map<string, boolean> = new Map();
  categoryIndeterminateStates: Map<string, boolean> = new Map();

  ngOnInit() {
    this.initializeCollapsedState();
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
}
