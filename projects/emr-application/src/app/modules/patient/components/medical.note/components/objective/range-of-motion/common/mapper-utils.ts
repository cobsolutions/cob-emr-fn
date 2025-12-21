/**
 * Utility functions for dynamic mapping between form values and backend models
 * Uses shared field naming utilities + convention-based mapping
 */

import { generateSingleColumnFieldName, generateMeasurementFieldName, generateEndfeelFieldName, normalizeLabel } from '../../common/form-field-utils';
import { RomSectionConfig, RomSectionEndfeelConfig } from '../config/rom-types';

/**
 * Convert snake_case to camelCase
 * Example: "forward_bending" => "forwardBending"
 */
export function snakeToCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

/**
 * Convert camelCase to snake_case
 * Example: "forwardBending" => "forward_bending"
 */
export function camelToSnake(str: string): string {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}

/**
 * Generic mapper for single-column-table sections (e.g., Cervical AROM, Lumbar AROM)
 * Maps form values to backend model
 */
export function mapSingleColumnSection(
  formValue: any,
  config: RomSectionConfig,
  enableFieldName: string
): any {
  const enabled = formValue[enableFieldName] === 'yes';
  const model: any = { enabled };

  if (enabled) {
    // Map each label to its corresponding model property
    config.labels.forEach(label => {
      const formFieldName = generateSingleColumnFieldName(config.fieldPrefix, label);
      const modelPropertyName = snakeToCamel(normalizeLabel(label));
      model[modelPropertyName] = formValue[formFieldName] || 'not_tested';
    });

    // Map comments if enabled
    if (config.showComments) {
      model.comments = formValue[config.commentsFieldName] || '';
    }
  }

  return model;
}

/**
 * Generic mapper for single-column-table sections (FROM backend model TO form values)
 */
export function fromDtoSingleColumnSection(
  dto: any,
  config: RomSectionConfig,
  enableFieldName: string
): any {
  const formValue: any = {
    [enableFieldName]: dto?.enabled ? 'yes' : 'no'
  };

  // Add apply to all field
  if (config.showApplyToAll) {
    formValue[config.applyToAllFieldName] = '';
  }

  // Map each label
  config.labels.forEach(label => {
    const formFieldName = generateSingleColumnFieldName(config.fieldPrefix, label);
    const modelPropertyName = snakeToCamel(normalizeLabel(label));
    formValue[formFieldName] = dto?.[modelPropertyName] || 'not_tested';
  });

  // Map comments if enabled
  if (config.showComments) {
    formValue[config.commentsFieldName] = dto?.comments || '';
  }

  return formValue;
}

/**
 * Generic mapper for measurement-table sections (e.g., Hip AROM, Shoulder AROM)
 * Maps form values to backend model
 */
export function mapMeasurementSection(
  formValue: any,
  config: RomSectionConfig,
  enableFieldName: string
): any {
  const enabled = formValue[enableFieldName] === 'yes';
  const model: any = { enabled };

  if (enabled) {
    // Map each label with right/left sides
    config.labels.forEach(label => {
      const normalizedLabel = normalizeLabel(label);

      // Right side
      const rightFormField = generateMeasurementFieldName(config.fieldPrefix, label, 'right');
      const rightModelProperty = snakeToCamel(normalizedLabel) + 'Right';
      model[rightModelProperty] = formValue[rightFormField] || 'not_tested';

      // Left side
      const leftFormField = generateMeasurementFieldName(config.fieldPrefix, label, 'left');
      const leftModelProperty = snakeToCamel(normalizedLabel) + 'Left';
      model[leftModelProperty] = formValue[leftFormField] || 'not_tested';
    });

    // Map comments if enabled
    if (config.showComments) {
      model.comments = formValue[config.commentsFieldName] || '';
    }
  }

  return model;
}

/**
 * Generic mapper for measurement-table sections (FROM backend model TO form values)
 */
export function fromDtoMeasurementSection(
  dto: any,
  config: RomSectionConfig,
  enableFieldName: string
): any {
  const formValue: any = {
    [enableFieldName]: dto?.enabled ? 'yes' : 'no'
  };

  // Add apply to all field
  if (config.showApplyToAll) {
    formValue[config.applyToAllFieldName] = '';
  }

  // Map each label with right/left sides
  config.labels.forEach(label => {
    const normalizedLabel = normalizeLabel(label);

    // Right side
    const rightFormField = generateMeasurementFieldName(config.fieldPrefix, label, 'right');
    const rightModelProperty = snakeToCamel(normalizedLabel) + 'Right';
    formValue[rightFormField] = dto?.[rightModelProperty] || 'not_tested';

    // Left side
    const leftFormField = generateMeasurementFieldName(config.fieldPrefix, label, 'left');
    const leftModelProperty = snakeToCamel(normalizedLabel) + 'Left';
    formValue[leftFormField] = dto?.[leftModelProperty] || 'not_tested';
  });

  // Map comments if enabled
  if (config.showComments) {
    formValue[config.commentsFieldName] = dto?.comments || '';
  }

  return formValue;
}

/**
 * Generic mapper for measurement-endfeel-table sections (e.g., Shoulder PROM, Hip PROM)
 * Maps form values to backend model
 */
export function mapMeasurementEndfeelSection(
  formValue: any,
  config: RomSectionEndfeelConfig,
  enableFieldName: string
): any {
  const enabled = formValue[enableFieldName] === 'yes';
  const model: any = { enabled };

  if (enabled) {
    // Map each label with right/left sides for both measurement and endfeel
    config.labels.forEach(label => {
      const normalizedLabel = normalizeLabel(label);

      // Right side - measurement
      const rightMeasurementField = generateMeasurementFieldName(config.fieldPrefix, label, 'right');
      const rightMeasurementProperty = snakeToCamel(normalizedLabel) + 'Right';
      model[rightMeasurementProperty] = formValue[rightMeasurementField] || 'not_tested';

      // Right side - endfeel
      const rightEndfeelField = generateEndfeelFieldName(config.fieldPrefix, label, 'right');
      const rightEndfeelProperty = snakeToCamel(normalizedLabel) + 'RightEndfeel';
      model[rightEndfeelProperty] = formValue[rightEndfeelField] || 'not_tested';

      // Left side - measurement
      const leftMeasurementField = generateMeasurementFieldName(config.fieldPrefix, label, 'left');
      const leftMeasurementProperty = snakeToCamel(normalizedLabel) + 'Left';
      model[leftMeasurementProperty] = formValue[leftMeasurementField] || 'not_tested';

      // Left side - endfeel
      const leftEndfeelField = generateEndfeelFieldName(config.fieldPrefix, label, 'left');
      const leftEndfeelProperty = snakeToCamel(normalizedLabel) + 'LeftEndfeel';
      model[leftEndfeelProperty] = formValue[leftEndfeelField] || 'not_tested';
    });

    // Map comments if enabled
    if (config.showComments) {
      model.comments = formValue[config.commentsFieldName] || '';
    }
  }

  return model;
}

/**
 * Generic mapper for measurement-endfeel-table sections (FROM backend model TO form values)
 */
export function fromDtoMeasurementEndfeelSection(
  dto: any,
  config: RomSectionEndfeelConfig,
  enableFieldName: string
): any {
  const formValue: any = {
    [enableFieldName]: dto?.enabled ? 'yes' : 'no'
  };

  // Add apply to all field
  if (config.showApplyToAll) {
    formValue[config.applyToAllFieldName] = '';
  }

  // Map each label with right/left sides for both measurement and endfeel
  config.labels.forEach(label => {
    const normalizedLabel = normalizeLabel(label);

    // Right side - measurement
    const rightMeasurementField = generateMeasurementFieldName(config.fieldPrefix, label, 'right');
    const rightMeasurementProperty = snakeToCamel(normalizedLabel) + 'Right';
    formValue[rightMeasurementField] = dto?.[rightMeasurementProperty] || 'not_tested';

    // Right side - endfeel
    const rightEndfeelField = generateEndfeelFieldName(config.fieldPrefix, label, 'right');
    const rightEndfeelProperty = snakeToCamel(normalizedLabel) + 'RightEndfeel';
    formValue[rightEndfeelField] = dto?.[rightEndfeelProperty] || 'not_tested';

    // Left side - measurement
    const leftMeasurementField = generateMeasurementFieldName(config.fieldPrefix, label, 'left');
    const leftMeasurementProperty = snakeToCamel(normalizedLabel) + 'Left';
    formValue[leftMeasurementField] = dto?.[leftMeasurementProperty] || 'not_tested';

    // Left side - endfeel
    const leftEndfeelField = generateEndfeelFieldName(config.fieldPrefix, label, 'left');
    const leftEndfeelProperty = snakeToCamel(normalizedLabel) + 'LeftEndfeel';
    formValue[leftEndfeelField] = dto?.[leftEndfeelProperty] || 'not_tested';
  });

  // Map comments if enabled
  if (config.showComments) {
    formValue[config.commentsFieldName] = dto?.comments || '';
  }

  return formValue;
}

/**
 * Example Usage:
 *
 * // In mapper service (toModel):
 * private mapCervicalArom(formValue: any): CervicalAROMModel {
 *   return mapSingleColumnSection(
 *     formValue,
 *     CervicalAROMConfig.cervicalArom,
 *     'cervical_arrom'
 *   );
 * }
 *
 * // In mapper service (fromDto):
 * private fromDtoCervicalArom(dto: RangeOfMotionModel): any {
 *   return fromDtoSingleColumnSection(
 *     dto.cervicalArom,
 *     CervicalAROMConfig.cervicalArom,
 *     'cervical_arrom'
 *   );
 * }
 *
 * // For Hip AROM (measurement table):
 * private mapHipArom(formValue: any): HipAROMModel {
 *   return mapMeasurementSection(
 *     formValue,
 *     HipAromConfig.hipArom,
 *     'hip_arrom'
 *   );
 * }
 *
 * // For Shoulder PROM (measurement-endfeel table):
 * private mapShoulderProm(formValue: any): ShoulderPROMModel {
 *   return mapMeasurementEndfeelSection(
 *     formValue,
 *     ShoulderPromConfig.shoulderProm,
 *     'shoulder_prom'
 *   );
 * }
 */
