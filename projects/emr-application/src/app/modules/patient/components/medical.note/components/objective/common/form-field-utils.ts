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
