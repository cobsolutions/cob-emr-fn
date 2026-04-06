# Outcome Measurement Tools Component - Models and Mapper

This component uses a structured model approach for data organization and communication with the backend.

## Architecture

### Models
Located in `models/outcome-measurement-tools.model.ts`:
- **OutcomeMeasurementToolsModel**: Main model containing all OMT data
- Sub-models for each category:
  - CustomOutcomeMeasurementModel
  - VestibularModel
  - UpperExtremityModel
  - SpineModel
  - LowerExtremityModel
  - BalanceModel
  - PainModel
  - GeneralFunctionModel

### Mapper Service
Located in `services/outcome-measurement-tools-mapper.service.ts`:
- **toModel()**: Converts form values to OutcomeMeasurementToolsModel (for backend)
- **fromDto()**: Converts backend DTO to form values (for loading)

## Usage Examples

### 1. In Parent Component (Objective Component)

```typescript
import { Component, ViewChild } from '@angular/core';
import { OutcomeMeasurementToolsComponent } from './outcome-measurement-tools/outcome-measurement-tools.component';
import { OutcomeMeasurementToolsModel } from './outcome-measurement-tools/models/outcome-measurement-tools.model';

export class ObjectiveComponent {
  @ViewChild(OutcomeMeasurementToolsComponent) omtComponent: OutcomeMeasurementToolsComponent;

  // Load data from backend
  loadOmtData() {
    this.apiService.getOmt(patientId).subscribe((dto: OutcomeMeasurementToolsModel) => {
      // Data will be automatically loaded via @Input
      this.omtData = dto;

      // Or manually load after component is ready
      this.omtComponent.loadFromDto(dto);
    });
  }

  // Send data to backend
  saveOmt() {
    const model: OutcomeMeasurementToolsModel = this.omtComponent.getOutcomeMeasurementToolsModel();
    this.apiService.saveOmt(patientId, model).subscribe(
      response => console.log('Saved successfully'),
      error => console.error('Save failed', error)
    );
  }
}
```

### 2. In Template

```html
<!-- Pass data via Input -->
<outcome-measurement-tools
  (formReady)="setChildForm('omt', $event)"
  [omtData]="omtDataFromBackend">
</outcome-measurement-tools>
```

### 3. Sample Model Structure

```typescript
const omtModel: OutcomeMeasurementToolsModel = {
  customOutcomeMeasurement: {
    enabled: true,
    // TODO: Add custom fields when implemented
  },
  vestibular: {
    enabled: false
  },
  upperExtremity: {
    enabled: true,
    // TODO: Add upper extremity fields when implemented
  },
  spine: {
    enabled: false
  },
  lowerExtremity: {
    enabled: true,
    // TODO: Add lower extremity fields when implemented
  },
  balance: {
    enabled: false
  },
  pain: {
    enabled: true,
    // TODO: Add pain fields when implemented
  },
  generalFunction: {
    enabled: true,
    // TODO: Add general function fields when implemented
  }
};
```

## Current Status

This component is currently in the initial setup phase with:
- ✅ Basic structure and 8 main categories with Yes/No radio buttons
- ✅ Model and mapper architecture in place
- ✅ Integration with ObjectiveComponent and InitialExaminationComponent
- ⏳ Dependent fields for each category (to be added based on requirements)

## Next Steps

For each category that is selected as "Yes", dependent fields will be added:
1. Custom Outcome Measurement - fields TBD
2. Vestibular - fields TBD
3. Upper Extremity - fields TBD
4. Spine - fields TBD
5. Lower Extremity - fields TBD
6. Balance - fields TBD
7. Pain - fields TBD
8. General Function - fields TBD

## Benefits

1. **Type Safety**: Strong typing with TypeScript interfaces
2. **Clean Separation**: Form logic separated from data models
3. **Two-Way Mapping**: Easy conversion between UI and backend formats
4. **Maintainability**: Changes to backend structure only affect mapper
5. **Testability**: Easy to unit test mapper functions
6. **Documentation**: Models serve as API documentation

## API Contract

The backend should expect/return data in the `OutcomeMeasurementToolsModel` format. The mapper handles all conversion between the flat form structure and the nested model structure.
