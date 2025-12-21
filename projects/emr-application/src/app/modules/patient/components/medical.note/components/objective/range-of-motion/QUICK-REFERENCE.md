# ROM Mapping - Quick Reference Guide

## TL;DR - What Was Done

**Problem:** Manual field mapping in mapper service was tedious, error-prone, and required 15-20 lines of code per section.

**Solution:** Created dynamic, config-driven mapping that reduces each section to 4 lines of code.

---

## The Three Key Files

### 1. **Config Files** (Define Structure)
```typescript
// config/cervical-arom.ts
export class CervicalAROMConfig {
  static readonly cervicalArom: RomSectionConfig = {
    labels: ['Forward Bending', 'Backward Bending', ...],
    fieldPrefix: 'cervical_',
    commentsFieldName: 'cervical_comments',
    ...
  };
}
```
**Purpose:** Single source of truth for section structure

### 2. **Shared Utilities** (Generate Field Names)
```typescript
// common/form-field-utils.ts

normalizeLabel('Forward Bending') → 'forward_bending'

generateSingleColumnFieldName('cervical_', 'Forward Bending')
  → 'cervical_forward_bending'

generateMeasurementFieldName('hip_', 'Flexion', 'right')
  → 'hip_flexion_right'
```
**Purpose:** Consistent field name generation across entire system

### 3. **Mapper Utilities** (Auto-Convert Data)
```typescript
// common/mapper-utils.ts

mapSingleColumnSection(formValue, config, 'cervical_arrom')
  → Converts form to model automatically

fromDtoSingleColumnSection(dto, config, 'cervical_arrom')
  → Converts model to form automatically
```
**Purpose:** Generic, reusable mapping functions

---

## Data Flow in 30 Seconds

### Saving Data (Form → Backend)

```
User fills form
    ↓
FormGroup { cervical_forward_bending: 'wfl' }
    ↓
Mapper Service: mapCervicalArom()
    ↓
mapSingleColumnSection() uses config + utilities
    ↓
Backend Model { forwardBending: 'wfl' }
    ↓
HTTP POST to API
```

### Loading Data (Backend → Form)

```
HTTP GET from API
    ↓
Backend Model { forwardBending: 'wfl' }
    ↓
Mapper Service: fromDtoCervicalArom()
    ↓
fromDtoSingleColumnSection() uses config + utilities
    ↓
FormValue { cervical_forward_bending: 'wfl' }
    ↓
Form displays value
```

---

## Field Name Transformations

### Single Column Table (e.g., Cervical AROM)

```
Config Label: "Forward Bending"
       ↓
Normalized: "forward_bending"
       ↓
Form Field: "cervical_forward_bending"  (snake_case)
       ↓
Model Property: "forwardBending"  (camelCase)
```

### Measurement Table (e.g., Hip AROM)

```
Config Label: "Flexion"
       ↓
Normalized: "flexion"
       ↓
Form Fields: "hip_flexion_right", "hip_flexion_left"  (snake_case)
       ↓
Model Properties: "flexionRight", "flexionLeft"  (camelCase)
```

### Measurement + Endfeel Table (e.g., Shoulder PROM)

```
Config Label: "Abduction"
       ↓
Normalized: "abduction"
       ↓
Form Fields:
  - "shoulder_prom_abduction_right"
  - "shoulder_prom_abduction_left"
  - "shoulder_prom_abduction_right_endfeel"
  - "shoulder_prom_abduction_left_endfeel"
       ↓
Model Properties:
  - "abductionRight"
  - "abductionLeft"
  - "abductionRightEndfeel"
  - "abductionLeftEndfeel"
```

---

## Code Comparison: Before vs After

### Before (Manual Mapping - 15 lines)

```typescript
private mapCervicalArom(formValue: any): CervicalAROMModel {
  const enabled = formValue.cervical_arrom === 'yes';
  const model: CervicalAROMModel = { enabled };

  if (enabled) {
    model.forwardBending = formValue.cervical_forward_bending || 'not_tested';
    model.backwardBending = formValue.cervical_backward_bending || 'not_tested';
    model.rightRotation = formValue.cervical_right_rotation || 'not_tested';
    model.leftRotation = formValue.cervical_left_rotation || 'not_tested';
    model.rightSideBending = formValue.cervical_right_side_bending || 'not_tested';
    model.leftSideBending = formValue.cervical_left_side_bending || 'not_tested';
    model.comments = formValue.cervical_comments || '';
  }

  return model;
}
```

### After (Dynamic Mapping - 4 lines!)

```typescript
private mapCervicalArom(formValue: any): CervicalAROMModel {
  return mapSingleColumnSection(
    formValue,
    CervicalAROMConfig.cervicalArom,
    'cervical_arrom'
  ) as CervicalAROMModel;
}
```

**Reduction: 73% less code!**

---

## Which Mapper Function to Use?

### Single Column Table → `mapSingleColumnSection()`

**Use for:** Sections with one dropdown per row (no right/left)

**Examples:**
- Cervical AROM
- Lumbar AROM
- Costovertebral Expansion

**Code:**
```typescript
private mapCervicalArom(formValue: any): CervicalAROMModel {
  return mapSingleColumnSection(
    formValue,
    CervicalAROMConfig.cervicalArom,
    'cervical_arrom'
  ) as CervicalAROMModel;
}
```

### Measurement Table → `mapMeasurementSection()`

**Use for:** Sections with right/left measurements (no endfeel)

**Examples:**
- Hip AROM
- Shoulder AROM
- Elbow AROM

**Code:**
```typescript
private mapHipArom(formValue: any): HipAROMModel {
  return mapMeasurementSection(
    formValue,
    HipAromConfig.hipArom,
    'hip_arrom'
  ) as HipAROMModel;
}
```

### Measurement + Endfeel Table → `mapMeasurementEndfeelSection()`

**Use for:** Sections with right/left measurements AND endfeel

**Examples:**
- Shoulder PROM
- Hip PROM
- Elbow PROM

**Code:**
```typescript
private mapShoulderProm(formValue: any): ShoulderPROMModel {
  return mapMeasurementEndfeelSection(
    formValue,
    ShoulderPromConfig.shoulderProm,
    'shoulder_prom'
  ) as ShoulderPROMModel;
}
```

---

## How to Add a New Section (5 Steps)

### Step 1: Create Config

```typescript
// config/elbow-arom-config.ts
export class ElbowAromConfig {
  static readonly elbowArom: RomSectionConfig = {
    labels: ['Flexion', 'Extension'],
    options: ELBOW_AROM_OPTIONS,
    fieldPrefix: 'elbow_',
    commentsFieldName: 'elbow_arrom_comments',
    showApplyToAll: true,
    showComments: true
  };
}
```

### Step 2: Add to Config Index

```typescript
// config/index.ts
export { ElbowAromConfig } from './elbow-arom-config';
```

### Step 3: Define Model Interface

```typescript
// models/range-of-motion.model.ts
export interface ElbowAROMModel {
  enabled: boolean;
  flexionRight?: string;
  flexionLeft?: string;
  extensionRight?: string;
  extensionLeft?: string;
  comments?: string;
}
```

### Step 4: Import Config in Mapper

```typescript
// services/range-of-motion-mapper.service.ts
import { ElbowAromConfig } from '../config/elbow-arom-config';
```

### Step 5: Add to Mapper Service

```typescript
// Add to toModel()
toModel(formValue: any): RangeOfMotionModel {
  return {
    // ... existing
    elbowArom: this.mapElbowArom(formValue),
  };
}

// Add mapping method
private mapElbowArom(formValue: any): ElbowAROMModel {
  return mapMeasurementSection(
    formValue,
    ElbowAromConfig.elbowArom,
    'elbow_arrom'
  ) as ElbowAROMModel;
}

// Add to fromDto()
fromDto(dto: RangeOfMotionModel): any {
  return {
    // ... existing
    ...this.fromDtoElbowArom(dto),
  };
}

// Add reverse mapping method
private fromDtoElbowArom(dto: RangeOfMotionModel): any {
  return fromDtoMeasurementSection(
    dto.elbowArom,
    ElbowAromConfig.elbowArom,
    'elbow_arrom'
  );
}
```

**Done!** Only 8 lines of code per section.

---

## Files Modified Summary

### Created New Files:
1. `common/mapper-utils.ts` - Generic mapping functions
2. `MAPPING-ARCHITECTURE.md` - Full documentation
3. `QUICK-REFERENCE.md` - This file

### Modified Existing Files:
1. `services/range-of-motion-mapper.service.ts` - Updated Cervical AROM and Hip AROM to use dynamic mapping
2. `config/cervical-arom.ts` - Fixed fieldPrefix to match mapper

### Files That Use the Same Utilities:
1. `common/form-field-utils.ts` - Shared by components, mapper, and parent
2. All config files (cervical-arom.ts, hip-arom-config.ts, etc.)
3. All common components (single-column-table, measurement-table, etc.)
4. Parent component (range-of-motion-n.component.ts) for reset logic

---

## Benefits Recap

✅ **No manual field mapping** - Config drives everything
✅ **Single source of truth** - Config defines structure
✅ **Consistent naming** - Shared utilities ensure uniformity
✅ **Massive code reduction** - 73-80% less code per section
✅ **Easy to maintain** - Change config, everything updates
✅ **Type safe** - TypeScript interfaces provide compile-time checking
✅ **Convention-based** - Automatic snake_case ↔ camelCase conversion

---

## Next Steps

Apply this pattern to all remaining sections in the mapper service:

- Lumbar AROM ✅ (ready to convert)
- Costovertebral Expansion ✅ (ready to convert)
- Shoulder AROM
- Shoulder PROM
- Elbow AROM
- Elbow PROM
- Wrist AROM
- Wrist PROM
- Hip PROM
- Knee AROM
- Ankle AROM
- Ankle PROM
- And all others...

Each section: ~15 lines → ~4 lines per method (toModel + fromDto)

**Estimated reduction:** 1500 lines → 300 lines in mapper service!
