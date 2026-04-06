/**
 * Shared utility functions for generating consistent form field names
 * Used by both common components and parent components
 */

/**
 * Normalize a label to a form field name part
 * Example: "Forward Bending" => "forward_bending"
 */
export function normalizeLabel(label: string): string {
  return label.toLowerCase().replace(/\s+/g, '_');
}

/**
 * Generate field name for single-column table
 * Example: generateSingleColumnFieldName('cervical_arom_', 'Forward Bending') => 'cervical_arom_forward_bending'
 */
export function generateSingleColumnFieldName(fieldPrefix: string, label: string): string {
  return `${fieldPrefix}${normalizeLabel(label)}`;
}

/**
 * Generate field name for measurement table (with side)
 * Example: generateMeasurementFieldName('knee_', 'Flexion', 'right') => 'knee_flexion_right'
 */
export function generateMeasurementFieldName(fieldPrefix: string, label: string, side: 'right' | 'left'): string {
  return `${fieldPrefix}${normalizeLabel(label)}_${side}`;
}

/**
 * Generate endfeel field name for measurement-endfeel table
 * Example: generateEndfeelFieldName('hip_prom_', 'Flexion', 'right') => 'hip_prom_flexion_right_endfeel'
 */
export function generateEndfeelFieldName(fieldPrefix: string, label: string, side: 'right' | 'left'): string {
  return `${fieldPrefix}${normalizeLabel(label)}_${side}_endfeel`;
}

/**
 * Generate dropdown field name for dropdown-text table
 * With labels: fieldPrefix_labelName_columnName
 * Without labels: fieldPrefix_columnName
 */
export function generateDropdownFieldName(fieldPrefix: string, label: string | null, column: string): string {
  const normalizedColumn = normalizeLabel(column);

  if (label) {
    const normalizedLabel = normalizeLabel(label);
    return `${fieldPrefix}${normalizedLabel}_${normalizedColumn}`;
  } else {
    return `${fieldPrefix}${normalizedColumn}`;
  }
}

/**
 * Generate text field name for dropdown-text table
 * With labels: fieldPrefix_labelName_columnName_text
 * Without labels: fieldPrefix_columnName_text
 */
export function generateTextFieldName(fieldPrefix: string, label: string | null, column: string): string {
  const normalizedColumn = normalizeLabel(column);

  if (label) {
    const normalizedLabel = normalizeLabel(label);
    return `${fieldPrefix}${normalizedLabel}_${normalizedColumn}_text`;
  } else {
    return `${fieldPrefix}${normalizedColumn}_text`;
  }
}

/**
 * Generate field name for multi-column measurement table (with column name)
 * Example: generateMultiColumnFieldName('grip_', 'Grip', 'Trial 1') => 'grip_grip_trial_1'
 */
export function generateMultiColumnFieldName(fieldPrefix: string, label: string, column: string): string {
  return `${fieldPrefix}${normalizeLabel(label)}_${normalizeLabel(column)}`;
}

/**
 * Convert snake_case to camelCase
 * Example: "shoulder_flexion_right_custom" => "shoulderFlexionRightCustom"
 */
export function snakeToCamel(str: string): string {
  return str.replace(/_([a-z0-9])/g, (_, char) => char.toUpperCase());
}

/**
 * Convert camelCase to snake_case
 * Example: "shoulderFlexionRightCustom" => "shoulder_flexion_right_custom"
 */
export function camelToSnake(str: string): string {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}

/**
 * Merge _custom fields from formValue into a mapped section object, filtered by prefix.
 * Scans formValue for keys starting with prefix and ending with _custom,
 * converts them to camelCase and adds them to the mapped object.
 * Use excludePrefixes to avoid matching fields that belong to a nested/related section.
 *
 * Example: withCustomFields({ elbowArrom: true }, formValue, 'elbow_arrom_')
 *   picks up elbow_arrom_flexion_right_custom => elbowArromFlexionRightCustom
 *
 * Example: withCustomFields({ ... }, formValue, 'hip_', ['hip_prom_'])
 *   picks up hip_flexion_right_custom but NOT hip_prom_flexion_right_custom
 */
export function withCustomFields(mapped: any, formValue: any, prefix: string, excludePrefixes?: string[]): any {
  const result = { ...mapped };
  for (const key of Object.keys(formValue)) {
    if (key.startsWith(prefix) && key.endsWith('_custom')) {
      if (excludePrefixes && excludePrefixes.some(ep => key.startsWith(ep))) {
        continue;
      }
      result[snakeToCamel(key)] = formValue[key] || '';
    }
  }
  return result;
}

/**
 * Extract _custom fields from a DTO (camelCase keys ending with Custom) and return as snake_case form values.
 * Used in fromDto/unmap methods to restore custom text values into the form.
 *
 * Example: spreadCustomFieldsFromDto({ shoulderFlexionRightCustom: 'test' })
 *   => { shoulder_flexion_right_custom: 'test' }
 */
export function spreadCustomFieldsFromDto(dto: any): { [key: string]: string } {
  if (!dto) return {};
  const result: { [key: string]: string } = {};
  for (const key of Object.keys(dto)) {
    if (key.endsWith('Custom')) {
      result[camelToSnake(key)] = dto[key] || '';
    }
  }
  return result;
}
