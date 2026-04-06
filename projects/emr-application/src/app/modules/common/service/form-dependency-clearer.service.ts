import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

/**
 * Configuration for a field dependency
 */
export interface FieldDependencyConfig {
  /** The parent field name that controls visibility/requirement */
  parentField: string;
  /** The value that indicates dependencies should be shown (typically 'yes' or true) */
  showWhenValue: any;
  /** Array of dependent field names to clear when parent is not equal to showWhenValue */
  dependentFields: string[];
  /** Optional: Custom clear values for specific fields (defaults to null) */
  clearValues?: { [fieldName: string]: any };
  /** Optional: Child radio fields that should be set to 'no' when parent is 'no' */
  childRadioFields?: string[];
}

/**
 * Generic service to manage form field dependencies
 * Automatically clears dependent fields when parent field changes to "No" or false
 */
@Injectable({
  providedIn: 'root'
})
export class FormDependencyClearerService {
  private subscriptions: Map<string, Subscription[]> = new Map();

  constructor() { }

  /**
   * Set up dependency listeners for a form
   * @param formGroup The form group to set up dependencies for
   * @param dependencies Array of dependency configurations
   * @param formId Optional unique identifier for the form (for cleanup)
   */
  setupDependencies(
    formGroup: FormGroup,
    dependencies: FieldDependencyConfig[],
    formId?: string
  ): void {
    const subs: Subscription[] = [];

    dependencies.forEach(config => {
      const parentControl = formGroup.get(config.parentField);

      if (!parentControl) {
        console.warn(`Parent field '${config.parentField}' not found in form`);
        return;
      }

      const sub = parentControl.valueChanges.subscribe(value => {
        // Check if we should clear the dependent fields
        const shouldClear = value !== config.showWhenValue;

        if (shouldClear) {
          this.clearDependentFields(formGroup, config);
        }
        // When parent is 'yes', do nothing - let user select child fields independently
      });

      subs.push(sub);
    });

    if (formId) {
      this.subscriptions.set(formId, subs);
    }
  }

  /**
   * Clear dependent fields based on configuration
   */
  private clearDependentFields(
    formGroup: FormGroup,
    config: FieldDependencyConfig
  ): void {
    const clearObj: { [key: string]: any } = {};

    // Clear regular dependent fields
    config.dependentFields.forEach(fieldName => {
      // Use custom clear value if provided, otherwise default to null
      const clearValue = config.clearValues?.[fieldName] ?? null;
      clearObj[fieldName] = clearValue;
    });

    // Set child radio fields to 'no'
    if (config.childRadioFields) {
      config.childRadioFields.forEach(fieldName => {
        clearObj[fieldName] = 'no';
      });
    }

    formGroup.patchValue(clearObj);
  }

  /**
   * Set child radio fields when parent is enabled
   */
  private setChildRadioFields(
    formGroup: FormGroup,
    config: FieldDependencyConfig
  ): void {
    if (!config.childRadioFields || config.childRadioFields.length === 0) {
      return;
    }

    const setObj: { [key: string]: any } = {};

    // Set child radio fields to the same value as showWhenValue (typically 'yes')
    config.childRadioFields.forEach(fieldName => {
      setObj[fieldName] = config.showWhenValue;
    });

    formGroup.patchValue(setObj);
  }

  /**
   * Clean up subscriptions for a specific form
   * @param formId The unique identifier for the form
   */
  cleanup(formId: string): void {
    const subs = this.subscriptions.get(formId);
    if (subs) {
      subs.forEach(sub => sub.unsubscribe());
      this.subscriptions.delete(formId);
    }
  }

  /**
   * Clean up all subscriptions
   */
  cleanupAll(): void {
    this.subscriptions.forEach(subs => {
      subs.forEach(sub => sub.unsubscribe());
    });
    this.subscriptions.clear();
  }

  /**
   * Simplified method for common Yes/No radio dependencies
   * @param formGroup The form group
   * @param parentField The parent radio field name
   * @param dependentFields Fields to clear when parent is 'no'
   */
  setupYesNoDependency(
    formGroup: FormGroup,
    parentField: string,
    dependentFields: string[]
  ): void {
    this.setupDependencies(formGroup, [{
      parentField,
      showWhenValue: 'yes',
      dependentFields
    }]);
  }

  /**
   * Simplified method for checkbox dependencies
   * @param formGroup The form group
   * @param parentField The parent checkbox field name
   * @param dependentFields Fields to clear when checkbox is unchecked
   */
  setupCheckboxDependency(
    formGroup: FormGroup,
    parentField: string,
    dependentFields: string[]
  ): void {
    this.setupDependencies(formGroup, [{
      parentField,
      showWhenValue: true,
      dependentFields
    }]);
  }

  /**
   * Simplified method for cascading Yes/No radio dependencies
   * When parent is set to 'no', all child radio fields are also set to 'no'
   * @param formGroup The form group
   * @param parentField The parent radio field name
   * @param childRadioFields Child radio fields to set to 'no' when parent is 'no'
   * @param otherDependentFields Optional: Other fields to clear (set to null)
   */
  setupCascadingYesNoDependency(
    formGroup: FormGroup,
    parentField: string,
    childRadioFields: string[],
    otherDependentFields?: string[]
  ): void {
    this.setupDependencies(formGroup, [{
      parentField,
      showWhenValue: 'yes',
      dependentFields: otherDependentFields || [],
      childRadioFields
    }]);
  }
}
