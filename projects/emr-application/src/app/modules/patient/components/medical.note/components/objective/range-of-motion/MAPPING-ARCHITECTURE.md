# Range of Motion - Mapping Architecture Documentation

## Overview

This document explains how Range of Motion form data flows between the UI, form layer, mapper service, and backend API.

---

## Architecture Layers

```
┌─────────────────────────────────────────────────────────────────┐
│ Layer 1: UI COMPONENTS (HTML Templates)                         │
│ - Single-column-table, measurement-table, etc.                  │
│ - Displays form fields to user                                  │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│ Layer 2: REACTIVE FORMS (FormGroup with snake_case fields)      │
│ - range-of-motion-n.component.ts                                │
│ - FormGroup: { cervical_forward_bending: 'not_tested', ... }    │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│ Layer 3: MAPPER SERVICE (Bidirectional Translation)             │
│ - range-of-motion-mapper.service.ts                             │
│ - toModel(): FormValue → RangeOfMotionModel (camelCase)         │
│ - fromDto(): RangeOfMotionModel → FormValue (snake_case)        │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│ Layer 4: BACKEND MODEL (TypeScript Interfaces, camelCase)       │
│ - range-of-motion.model.ts                                      │
│ - CervicalAROMModel, HipAROMModel, etc.                         │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│ Layer 5: HTTP SERVICE (REST API Calls)                          │
│ - medical-note.service.ts                                       │
│ - POST/PUT to backend with JSON payload                         │
└─────────────────────────────────────────────────────────────────┘
```

---

## Complete Data Flow Example: Cervical AROM

Let's trace a complete round-trip for Cervical AROM data.

### Step 1: User Fills Out Form (UI Layer)

User selects values in the Cervical AROM section:

```
Cervical AROM: [Yes]
Apply to All: [Not Tested]
Forward Bending: [WFL]
Backward Bending: [Limited]
Right Rotation: [WFL]
Left Rotation: [WFL]
Right Side Bending: [WFL]
Left Side Bending: [WFL]
Comments: "Patient shows limitation in backward bending"
```

### Step 2: Data Stored in FormGroup (Form Layer)

The component uses **config + shared utilities** to create form controls:

```typescript
// Config defines structure
CervicalAROMConfig.cervicalArom = {
  labels: ['Forward Bending', 'Backward Bending', 'Right Rotation', ...],
  fieldPrefix: 'cervical_',
  commentsFieldName: 'cervical_comments',
  ...
}

// Shared utility generates field names
generateSingleColumnFieldName('cervical_', 'Forward Bending')
  → 'cervical_forward_bending'

// FormGroup stores values (snake_case)
{
  cervical_arrom: 'yes',
  cervical_apply_to_all: '',
  cervical_forward_bending: 'wfl',
  cervical_backward_bending: 'limited',
  cervical_right_rotation: 'wfl',
  cervical_left_rotation: 'wfl',
  cervical_right_side_bending: 'wfl',
  cervical_left_side_bending: 'wfl',
  cervical_comments: 'Patient shows limitation in backward bending'
}
```

### Step 3: Form Submitted → Mapper Converts to Model (Mapper Layer)

When user saves, the parent component calls:

```typescript
// range-of-motion-n.component.ts
getRangeOfMotionModel(): RangeOfMotionModel {
  return this.mapperService.toModel(this.romForm.value);
}
```

**Mapper Service (NEW DYNAMIC APPROACH):**

```typescript
// range-of-motion-mapper.service.ts
toModel(formValue: any): RangeOfMotionModel {
  return {
    cervicalArom: this.mapCervicalArom(formValue),
    // ... other sections
  };
}

private mapCervicalArom(formValue: any): CervicalAROMModel {
  // Uses dynamic mapper with config
  return mapSingleColumnSection(
    formValue,
    CervicalAROMConfig.cervicalArom,
    'cervical_arrom'
  ) as CervicalAROMModel;
}
```

**Inside `mapSingleColumnSection()` utility:**

```typescript
export function mapSingleColumnSection(
  formValue: any,
  config: RomSectionConfig,
  enableFieldName: string
): any {
  const enabled = formValue[enableFieldName] === 'yes';
  const model: any = { enabled };

  if (enabled) {
    // Loop through each label in config
    config.labels.forEach(label => {
      // 1. Generate form field name using shared utility
      const formFieldName = generateSingleColumnFieldName(config.fieldPrefix, label);
      // Example: generateSingleColumnFieldName('cervical_', 'Forward Bending')
      //   → 'cervical_forward_bending'

      // 2. Convert to camelCase for model property
      const modelPropertyName = snakeToCamel(normalizeLabel(label));
      // Example: 'Forward Bending' → 'forward_bending' → 'forwardBending'

      // 3. Map the value
      model[modelPropertyName] = formValue[formFieldName] || 'not_tested';
      // Example: model.forwardBending = formValue.cervical_forward_bending
      //   → model.forwardBending = 'wfl'
    });

    // Map comments
    if (config.showComments) {
      model.comments = formValue[config.commentsFieldName] || '';
    }
  }

  return model;
}
```

**Resulting Backend Model (camelCase):**

```typescript
// CervicalAROMModel
{
  enabled: true,
  forwardBending: 'wfl',
  backwardBending: 'limited',
  rightRotation: 'wfl',
  leftRotation: 'wfl',
  rightSideBending: 'wfl',
  leftSideBending: 'wfl',
  comments: 'Patient shows limitation in backward bending'
}
```

**Notice the transformation:**
- `cervical_forward_bending` (form) → `forwardBending` (model)
- `cervical_backward_bending` (form) → `backwardBending` (model)
- Field names automatically generated and converted!

### Step 4: Model Sent to Backend (HTTP Layer)

```typescript
// medical-note.service.ts
create(model: MedicalNoteModel): Observable<any> {
  return this.http.post('/medical/note/initial-exam', model);
}

// JSON payload sent to API:
{
  "objective": {
    "rangeOfMotion": {
      "cervicalArom": {
        "enabled": true,
        "forwardBending": "wfl",
        "backwardBending": "limited",
        "rightRotation": "wfl",
        "leftRotation": "wfl",
        "rightSideBending": "wfl",
        "leftSideBending": "wfl",
        "comments": "Patient shows limitation in backward bending"
      },
      // ... other sections
    }
  }
}
```

---

## Reverse Flow: Loading Data from Backend

When loading an existing medical note, the flow reverses.

### Step 1: Backend Returns Model (HTTP Response)

```json
{
  "cervicalArom": {
    "enabled": true,
    "forwardBending": "wfl",
    "backwardBending": "limited",
    "rightRotation": "wfl",
    "leftRotation": "wfl",
    "rightSideBending": "wfl",
    "leftSideBending": "wfl",
    "comments": "Patient shows limitation in backward bending"
  }
}
```

### Step 2: Mapper Converts Model to FormValue

**Mapper Service (NEW DYNAMIC APPROACH):**

```typescript
fromDto(dto: RangeOfMotionModel): any {
  return {
    ...this.fromDtoCervicalArom(dto),
    // ... other sections
  };
}

private fromDtoCervicalArom(dto: RangeOfMotionModel): any {
  // Uses dynamic mapper with config
  return fromDtoSingleColumnSection(
    dto.cervicalArom,
    CervicalAROMConfig.cervicalArom,
    'cervical_arrom'
  );
}
```

**Inside `fromDtoSingleColumnSection()` utility:**

```typescript
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

  // Loop through each label
  config.labels.forEach(label => {
    // 1. Generate form field name (same utility as component uses!)
    const formFieldName = generateSingleColumnFieldName(config.fieldPrefix, label);
    // Example: 'cervical_forward_bending'

    // 2. Convert label to model property name
    const modelPropertyName = snakeToCamel(normalizeLabel(label));
    // Example: 'forwardBending'

    // 3. Map the value
    formValue[formFieldName] = dto?.[modelPropertyName] || 'not_tested';
    // Example: formValue.cervical_forward_bending = dto.forwardBending
    //   → formValue.cervical_forward_bending = 'wfl'
  });

  // Map comments
  if (config.showComments) {
    formValue[config.commentsFieldName] = dto?.comments || '';
  }

  return formValue;
}
```

**Resulting FormValue (snake_case):**

```typescript
{
  cervical_arrom: 'yes',
  cervical_apply_to_all: '',
  cervical_forward_bending: 'wfl',
  cervical_backward_bending: 'limited',
  cervical_right_rotation: 'wfl',
  cervical_left_rotation: 'wfl',
  cervical_right_side_bending: 'wfl',
  cervical_left_side_bending: 'wfl',
  cervical_comments: 'Patient shows limitation in backward bending'
}
```

### Step 3: FormGroup Populated

```typescript
// range-of-motion-n.component.ts
loadRangeOfMotionData(dto: RangeOfMotionModel) {
  const formValue = this.mapperService.fromDto(dto);
  this.romForm.patchValue(formValue);
}
```

### Step 4: UI Displays Values

The form controls are bound to the template, so values automatically appear in dropdowns and text fields.

---

## Complete Example: Hip AROM (Measurement Table)

Let's see a more complex example with right/left measurements.

### User Input (UI)

```
Hip AROM: [Yes]
Apply to All: [WFL]

              Right       Left
Flexion       WFL         WFL
Extension     Limited     WFL
Abduction     WFL         WFL
Adduction     WFL         Restricted
...
Comments: ""
```

### FormGroup (snake_case)

```typescript
{
  hip_arrom: 'yes',
  hip_apply_to_all: '',
  hip_flexion_right: 'wfl',
  hip_flexion_left: 'wfl',
  hip_extension_right: 'limited',
  hip_extension_left: 'wfl',
  hip_abduction_right: 'wfl',
  hip_abduction_left: 'wfl',
  hip_adduction_right: 'wfl',
  hip_adduction_left: 'restricted',
  hip_internal_rotation_right: 'wfl',
  hip_internal_rotation_left: 'wfl',
  hip_external_rotation_right: 'wfl',
  hip_external_rotation_left: 'wfl',
  hip_arrom_comments: ''
}
```

### Mapper Conversion (Using Dynamic Mapper)

```typescript
private mapHipArom(formValue: any): HipAROMModel {
  return mapMeasurementSection(
    formValue,
    HipAromConfig.hipArom,
    'hip_arrom'
  ) as HipAROMModel;
}
```

**Inside `mapMeasurementSection()`:**

```typescript
config.labels.forEach(label => {
  // For 'Flexion':

  // Right side
  const rightFormField = generateMeasurementFieldName('hip_', 'Flexion', 'right');
  // → 'hip_flexion_right'

  const rightModelProperty = snakeToCamel('flexion') + 'Right';
  // → 'flexionRight'

  model.flexionRight = formValue.hip_flexion_right;
  // → 'wfl'

  // Left side
  const leftFormField = generateMeasurementFieldName('hip_', 'Flexion', 'left');
  // → 'hip_flexion_left'

  const leftModelProperty = snakeToCamel('flexion') + 'Left';
  // → 'flexionLeft'

  model.flexionLeft = formValue.hip_flexion_left;
  // → 'wfl'
});
```

### Backend Model (camelCase)

```typescript
// HipAROMModel
{
  enabled: true,
  flexionRight: 'wfl',
  flexionLeft: 'wfl',
  extensionRight: 'limited',
  extensionLeft: 'wfl',
  abductionRight: 'wfl',
  abductionLeft: 'wfl',
  adductionRight: 'wfl',
  adductionLeft: 'restricted',
  internalRotationRight: 'wfl',
  internalRotationLeft: 'wfl',
  externalRotationRight: 'wfl',
  externalRotationLeft: 'wfl',
  comments: ''
}
```

---

## Key Components in the System

### 1. Config Files (Single Source of Truth)

**Purpose:** Define the structure of each ROM section

**Example: `cervical-arom.ts`**
```typescript
export class CervicalAROMConfig {
  static readonly cervicalArom: RomSectionConfig = {
    labels: ['Forward Bending', 'Backward Bending', ...],
    fieldPrefix: 'cervical_',
    commentsFieldName: 'cervical_comments',
    ...
  };
}
```

**Used by:**
- Component (to create form controls)
- Mapper (to convert between form and model)
- Reset logic (to know which fields to reset)

### 2. Shared Utilities (`form-field-utils.ts`)

**Purpose:** Generate consistent field names across the system

**Functions:**
```typescript
normalizeLabel('Forward Bending') → 'forward_bending'
generateSingleColumnFieldName('cervical_', 'Forward Bending') → 'cervical_forward_bending'
generateMeasurementFieldName('hip_', 'Flexion', 'right') → 'hip_flexion_right'
```

**Used by:**
- Components (when creating/accessing form controls)
- Mapper utilities (when converting data)
- Parent component (when resetting fields)

### 3. Mapper Utilities (`mapper-utils.ts`)

**Purpose:** Generic, reusable mapping functions

**Functions:**
```typescript
mapSingleColumnSection() - For single-column tables
mapMeasurementSection() - For measurement tables (right/left)
mapMeasurementEndfeelSection() - For measurement + endfeel tables
fromDtoSingleColumnSection() - Reverse mapping for single-column
fromDtoMeasurementSection() - Reverse mapping for measurements
fromDtoMeasurementEndfeelSection() - Reverse mapping for measurement + endfeel
```

**Benefits:**
- No manual field mapping
- Convention-based (snake_case ↔ camelCase)
- Config-driven

### 4. Mapper Service (`range-of-motion-mapper.service.ts`)

**Purpose:** Orchestrate all section mappings

**Methods:**
```typescript
toModel(formValue): RangeOfMotionModel - Form → Backend
fromDto(dto): FormValue - Backend → Form
```

**NEW APPROACH (Dynamic):**
```typescript
// Before: 15 lines of manual mapping per section
// After: 4 lines using generic mapper

private mapCervicalArom(formValue: any): CervicalAROMModel {
  return mapSingleColumnSection(
    formValue,
    CervicalAROMConfig.cervicalArom,
    'cervical_arrom'
  ) as CervicalAROMModel;
}
```

### 5. Backend Models (`range-of-motion.model.ts`)

**Purpose:** TypeScript interfaces defining backend data structure

**Example:**
```typescript
export interface CervicalAROMModel {
  enabled: boolean;
  forwardBending?: string;
  backwardBending?: string;
  rightRotation?: string;
  leftRotation?: string;
  rightSideBending?: string;
  leftSideBending?: string;
  comments?: string;
}
```

---

## Naming Convention Rules

### Form Control Names (snake_case)

**Pattern:** `{fieldPrefix}_{normalized_label}_{side?}`

**Examples:**
- `cervical_forward_bending`
- `hip_flexion_right`
- `shoulder_prom_abduction_left_endfeel`

**Generated by:** `generateSingleColumnFieldName()`, `generateMeasurementFieldName()`, `generateEndfeelFieldName()`

### Backend Model Properties (camelCase)

**Pattern:** `{normalizedLabel}{Side?}{Endfeel?}`

**Examples:**
- `forwardBending`
- `flexionRight`
- `abductionLeftEndfeel`

**Converted by:** `snakeToCamel(normalizeLabel(label)) + 'Right'/'Left' + 'Endfeel'?`

### Conversion Examples

| Label | Form Field | Model Property |
|-------|------------|----------------|
| Forward Bending | `cervical_forward_bending` | `forwardBending` |
| Flexion (right) | `hip_flexion_right` | `flexionRight` |
| Abduction (left, endfeel) | `shoulder_prom_abduction_left_endfeel` | `abductionLeftEndfeel` |
| Internal Rotation (right) | `hip_internal_rotation_right` | `internalRotationRight` |

---

## How to Add a New ROM Section

### Step 1: Create Config

```typescript
// config/elbow-arom-config.ts
export class ElbowAromConfig {
  static readonly elbowArom: RomSectionConfig = {
    labels: ['Flexion', 'Extension', 'Pronation', 'Supination'],
    options: ELBOW_AROM_OPTIONS,
    fieldPrefix: 'elbow_',
    commentsFieldName: 'elbow_arrom_comments',
    ...
  };
}
```

### Step 2: Define Backend Model (if not exists)

```typescript
// models/range-of-motion.model.ts
export interface ElbowAROMModel {
  enabled: boolean;
  flexionRight?: string;
  flexionLeft?: string;
  extensionRight?: string;
  extensionLeft?: string;
  pronationRight?: string;
  pronationLeft?: string;
  supinationRight?: string;
  supinationLeft?: string;
  comments?: string;
}
```

### Step 3: Update Mapper Service

```typescript
// Import config
import { ElbowAromConfig } from '../config/elbow-arom-config';

// Add to toModel
toModel(formValue: any): RangeOfMotionModel {
  return {
    // ... existing sections
    elbowArom: this.mapElbowArom(formValue),
  };
}

// Add mapping method (4 lines!)
private mapElbowArom(formValue: any): ElbowAROMModel {
  return mapMeasurementSection(
    formValue,
    ElbowAromConfig.elbowArom,
    'elbow_arrom'
  ) as ElbowAROMModel;
}

// Add to fromDto
fromDto(dto: RangeOfMotionModel): any {
  return {
    // ... existing sections
    ...this.fromDtoElbowArom(dto),
  };
}

// Add reverse mapping method (4 lines!)
private fromDtoElbowArom(dto: RangeOfMotionModel): any {
  return fromDtoMeasurementSection(
    dto.elbowArom,
    ElbowAromConfig.elbowArom,
    'elbow_arrom'
  );
}
```

**That's it!** No manual field mapping needed. The config and utilities handle everything.

---

## Benefits of Dynamic Mapping

### ✅ Single Source of Truth
- Config defines structure
- Components, mapper, and reset logic all use same config
- Change once, updates everywhere

### ✅ No Manual Field Mapping
- Add new field to config → automatically mapped
- Rename field in config → automatically updated
- No risk of typos

### ✅ Convention-Based
- Automatic snake_case ↔ camelCase conversion
- Consistent naming across entire system
- Easy to understand and maintain

### ✅ Massive Code Reduction
- Before: ~15-20 lines per section (toModel + fromDto)
- After: ~8 lines per section
- Mapper service: ~1500 lines → ~300 lines

### ✅ Type Safety
- TypeScript interfaces ensure correct model structure
- Compile-time checking for model properties
- Runtime safety with optional chaining (`dto?.property`)

---

## Common Questions

### Q: What happens if I add a new label to the config?

**A:** It automatically gets mapped! No code changes needed.

```typescript
// Add to config
labels: ['Flexion', 'Extension', 'NEW MOVEMENT']

// Automatically creates:
// Form field: hip_new_movement_right, hip_new_movement_left
// Model properties: newMovementRight, newMovementLeft
```

### Q: What if my backend model has a different naming convention?

**A:** You can customize the `snakeToCamel()` logic or add special case handling in the mapper utilities.

### Q: Can I override the automatic mapping for specific fields?

**A:** Yes, you can add custom logic after calling the generic mapper:

```typescript
private mapCervicalArom(formValue: any): CervicalAROMModel {
  const model = mapSingleColumnSection(...) as CervicalAROMModel;

  // Custom override for specific field
  if (formValue.cervical_special_field) {
    model.specialProperty = customTransform(formValue.cervical_special_field);
  }

  return model;
}
```

### Q: What about sections with complex nested structures (like Hand AROM)?

**A:** You may need custom mapping for complex structures. The generic mappers handle 90% of cases, but you can still write custom logic when needed.

---

## Summary

The Range of Motion mapping system now uses a **config-driven, dynamic approach**:

1. **Configs** define structure (labels, field names, options)
2. **Shared utilities** generate consistent field names
3. **Mapper utilities** automatically convert between form and model
4. **Mapper service** orchestrates all section mappings
5. **Backend models** define TypeScript interfaces

**Result:** Adding a new section requires minimal code, and changing field names propagates automatically throughout the system.
