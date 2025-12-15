# InspectionN Component - Models and Mapper

This component uses a structured model approach for data organization and communication with the backend.

## Architecture

### Models
Located in `models/inspection.model.ts`:
- **InspectionModel**: Main model containing all inspection data
- Sub-models for each section (Consent, Chaperone, Girth Measurements, etc.)

### Mapper Service
Located in `services/inspection-mapper.service.ts`:
- **toModel()**: Converts form values to InspectionModel (for backend)
- **fromDto()**: Converts backend DTO to form values (for loading)

## Usage Examples

### 1. In Parent Component (Objective Component)

```typescript
import { Component, ViewChild } from '@angular/core';
import { InspectionNComponent } from './inspectionN/inspectionN.component';
import { InspectionModel } from './inspectionN/models/inspection.model';

export class ObjectiveComponent {
  @ViewChild(InspectionNComponent) inspectionComponent: InspectionNComponent;

  // Load data from backend
  loadInspectionData() {
    this.apiService.getInspection(patientId).subscribe((dto: InspectionModel) => {
      // Data will be automatically loaded via @Input
      this.inspectionData = dto;

      // Or manually load after component is ready
      this.inspectionComponent.loadFromDto(dto);
    });
  }

  // Send data to backend
  saveInspection() {
    const model: InspectionModel = this.inspectionComponent.getInspectionModel();
    this.apiService.saveInspection(patientId, model).subscribe(
      response => console.log('Saved successfully'),
      error => console.error('Save failed', error)
    );
  }
}
```

### 2. In Template

```html
<!-- Pass data via Input -->
<inspectionN
  (formReady)="setChildForm('inspection', $event)"
  [inspectionData]="inspectionDataFromBackend">
</inspectionN>
```

### 3. Sample Model Structure

```typescript
const inspectionModel: InspectionModel = {
  consent: {
    patientConsent: 'yes',
    patientParentGuardianConsent: 'yes'
  },
  chaperone: {
    chaperone: 'yes',
    chaperonePresent: 'yes'
  },
  inspection: 'Patient appears in good health...',
  girthMeasurementUpper: {
    enabled: true,
    upperArm: { right: '30', left: '29' },
    midBiceps: { right: '28', left: '27' },
    elbowFlexionCrease: { right: '25', left: '24' },
    forearm: { right: '22', left: '21' },
    wrist: { right: '18', left: '17' }
  },
  girthMeasurementLower: {
    enabled: false
  },
  postOperativeWoundHealing: {
    enabled: true,
    incisionSites: { value: 'clean_healing_well' },
    surgicalPrecautions: {
      enabled: true,
      select: 'prom_only'
    },
    scarMobility: {
      enabled: true,
      text: 'Good mobility'
    },
    scarType: {
      enabled: true,
      select: 'normal'
    },
    woundDescription: {
      enabled: false
    },
    woundMeasurements: {
      enabled: false
    }
  },
  woundCare: {
    enabled: true,
    surfaceCulture: {
      surfaceCultureUsed: 'yes',
      fields: {
        levine: true,
        deepSwab: false,
        semiquantitative: false,
        quantitative: false,
        reasoning: 'MRSA screening required'
      }
    }
  },
  surgicalScarring: {
    enabled: true,
    selections: ['appendectomy', 'hernia']
  },
  bodyMassIndex: {
    enabled: true,
    weight: '180',
    height: '70',
    units: 'lbs_in',
    index: '25.8',
    followupPlan: 'Monitor weight, referral to nutritionist'
  },
  additionalComments: {
    enabled: true,
    text: 'Patient is progressing well'
  }
};
```

## Benefits

1. **Type Safety**: Strong typing with TypeScript interfaces
2. **Clean Separation**: Form logic separated from data models
3. **Two-Way Mapping**: Easy conversion between UI and backend formats
4. **Maintainability**: Changes to backend structure only affect mapper
5. **Testability**: Easy to unit test mapper functions
6. **Documentation**: Models serve as API documentation

## API Contract

The backend should expect/return data in the `InspectionModel` format. The mapper handles all conversion between the flat form structure and the nested model structure.
