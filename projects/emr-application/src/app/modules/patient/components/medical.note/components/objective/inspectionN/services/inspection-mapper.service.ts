import { Injectable } from '@angular/core';
import {
  InspectionModel,
  ConsentModel,
  ChaperoneModel,
  GirthMeasurementUpperModel,
  GirthMeasurementLowerModel,
  PostOperativeWoundHealingModel,
  WoundCareModel,
  SurgicalScarringModel,
  BodyMassIndexModel,
  AdditionalCommentsModel,
  GirthMeasurementModel,
  SurfaceCultureModel
} from '../models/inspection.model';

@Injectable({
  providedIn: 'root'
})
export class InspectionMapperService {

  /**
   * Converts form raw value to InspectionModel for backend
   */
  toModel(formValue: any): InspectionModel {
    return {
      consent: this.mapConsent(formValue),
      chaperone: this.mapChaperone(formValue),
      inspection: formValue.inspection || '',
      girthMeasurementUpper: this.mapGirthUpper(formValue),
      girthMeasurementLower: this.mapGirthLower(formValue),
      postOperativeWoundHealing: this.mapPostOperative(formValue),
      woundCare: this.mapWoundCare(formValue),
      surgicalScarring: this.mapSurgicalScarring(formValue),
      bodyMassIndex: this.mapBodyMassIndex(formValue),
      additionalComments: this.mapAdditionalComments(formValue)
    };
  }

  /**
   * Converts DTO from backend to form value object
   */
  fromDto(dto: InspectionModel): any {
    return {
      // Consent
      patient_consent: dto.consent.patientConsent || 'no',
      patient_parent_guardian_consent: dto.consent.patientParentGuardianConsent || 'no',

      // Chaperone
      chaperone: dto.chaperone.chaperone || 'no',
      chaperone_present: dto.chaperone.chaperonePresent || null,

      // Inspection
      inspection: dto.inspection || '',

      // Girth Upper
      girth_measurement_upper: dto.girthMeasurementUpper.enabled ? 'yes' : 'no',
      upper_arm_right: dto.girthMeasurementUpper.upperArm?.right || '',
      upper_arm_left: dto.girthMeasurementUpper.upperArm?.left || '',
      mid_biceps_right: dto.girthMeasurementUpper.midBiceps?.right || '',
      mid_biceps_left: dto.girthMeasurementUpper.midBiceps?.left || '',
      elbow_flexion_crease_right: dto.girthMeasurementUpper.elbowFlexionCrease?.right || '',
      elbow_flexion_crease_left: dto.girthMeasurementUpper.elbowFlexionCrease?.left || '',
      forearm_right: dto.girthMeasurementUpper.forearm?.right || '',
      forearm_left: dto.girthMeasurementUpper.forearm?.left || '',
      wrist_right: dto.girthMeasurementUpper.wrist?.right || '',
      wrist_left: dto.girthMeasurementUpper.wrist?.left || '',

      // Girth Lower
      girth_measurement_lower: dto.girthMeasurementLower.enabled ? 'yes' : 'no',
      mid_patella_right: dto.girthMeasurementLower.midPatella?.right || '',
      mid_patella_left: dto.girthMeasurementLower.midPatella?.left || '',
      mid_thigh_right: dto.girthMeasurementLower.midThigh?.right || '',
      mid_thigh_left: dto.girthMeasurementLower.midThigh?.left || '',
      mid_calf_right: dto.girthMeasurementLower.midCalf?.right || '',
      mid_calf_left: dto.girthMeasurementLower.midCalf?.left || '',
      mid_malleoli_right: dto.girthMeasurementLower.midMalleoli?.right || '',
      mid_malleoli_left: dto.girthMeasurementLower.midMalleoli?.left || '',
      ankle_figure_8_right: dto.girthMeasurementLower.ankleFigure8?.right || '',
      ankle_figure_8_left: dto.girthMeasurementLower.ankleFigure8?.left || '',
      mid_foot_right: dto.girthMeasurementLower.midFoot?.right || '',
      mid_foot_left: dto.girthMeasurementLower.midFoot?.left || '',
      metatarsal_heads_right: dto.girthMeasurementLower.metatarsalHeads?.right || '',
      metatarsal_heads_left: dto.girthMeasurementLower.metatarsalHeads?.left || '',

      // Post Operative
      post_operative_wound_healing: dto.postOperativeWoundHealing.enabled ? 'yes' : 'no',
      incision_sites: dto.postOperativeWoundHealing.incisionSites?.value || null,
      surgical_precautions: dto.postOperativeWoundHealing.surgicalPrecautions?.enabled ? 'yes' : 'no',
      surgical_precautions_select: dto.postOperativeWoundHealing.surgicalPrecautions?.select || null,
      scar_mobility: dto.postOperativeWoundHealing.scarMobility?.enabled ? 'yes' : 'no',
      scar_mobility_text: dto.postOperativeWoundHealing.scarMobility?.text || '',
      scar_type: dto.postOperativeWoundHealing.scarType?.enabled ? 'yes' : 'no',
      scar_type_select: dto.postOperativeWoundHealing.scarType?.select || null,
      wound_description: dto.postOperativeWoundHealing.woundDescription?.enabled ? 'yes' : 'no',
      wound_description_text: dto.postOperativeWoundHealing.woundDescription?.text || '',
      wound_measurements: dto.postOperativeWoundHealing.woundMeasurements?.enabled ? 'yes' : 'no',
      wound_length: dto.postOperativeWoundHealing.woundMeasurements?.length || '',
      wound_width: dto.postOperativeWoundHealing.woundMeasurements?.width || '',

      // Wound Care
      wound_care: dto.woundCare.enabled ? 'yes' : 'no',
      surface_culture_used: dto.woundCare.surfaceCulture?.surfaceCultureUsed || 'na',
      surface_culture_levine: dto.woundCare.surfaceCulture?.fields?.levine || false,
      surface_culture_deep_swab: dto.woundCare.surfaceCulture?.fields?.deepSwab || false,
      surface_culture_semiquantitative: dto.woundCare.surfaceCulture?.fields?.semiquantitative || false,
      surface_culture_quantitative: dto.woundCare.surfaceCulture?.fields?.quantitative || false,
      surface_culture_reasoning: dto.woundCare.surfaceCulture?.fields?.reasoning || '',
      surface_culture_technique: dto.woundCare.surfaceCulture?.techniqueUtilized?.technique || '',

      // Surgical Scarring
      surgical_scarring: dto.surgicalScarring.enabled ? 'yes' : 'no',
      surgical_scarring_select: dto.surgicalScarring.selections || [],

      // Body Mass Index
      body_mass_index: dto.bodyMassIndex.enabled ? 'yes' : 'no',
      bmi_weight: dto.bodyMassIndex.weight || '',
      bmi_height: dto.bodyMassIndex.height || '',
      bmi_units: dto.bodyMassIndex.units || 'lbs_in',
      bmi_index: dto.bodyMassIndex.index || '',
      bmi_followup_plan: dto.bodyMassIndex.followupPlan || '',

      // Additional Comments
      additional_comments: dto.additionalComments.enabled ? 'yes' : 'no',
      additional_comments_text: dto.additionalComments.text || ''
    };
  }

  // Private mapping methods for toModel
  private mapConsent(formValue: any): ConsentModel {
    const consent: ConsentModel = {
      patientConsent: formValue.patient_consent || 'no'
    };
    if (formValue.patient_consent === 'yes') {
      consent.patientParentGuardianConsent = formValue.patient_parent_guardian_consent || 'no';
    }
    return consent;
  }

  private mapChaperone(formValue: any): ChaperoneModel {
    const chaperone: ChaperoneModel = {
      chaperone: formValue.chaperone || 'no'
    };
    if (formValue.chaperone === 'yes') {
      chaperone.chaperonePresent = formValue.chaperone_present || null;
    }
    return chaperone;
  }

  private mapGirthUpper(formValue: any): GirthMeasurementUpperModel {
    const enabled = formValue.girth_measurement_upper === 'yes';
    const model: GirthMeasurementUpperModel = { enabled };

    if (enabled) {
      model.upperArm = this.createGirthMeasurement(formValue.upper_arm_right, formValue.upper_arm_left);
      model.midBiceps = this.createGirthMeasurement(formValue.mid_biceps_right, formValue.mid_biceps_left);
      model.elbowFlexionCrease = this.createGirthMeasurement(formValue.elbow_flexion_crease_right, formValue.elbow_flexion_crease_left);
      model.forearm = this.createGirthMeasurement(formValue.forearm_right, formValue.forearm_left);
      model.wrist = this.createGirthMeasurement(formValue.wrist_right, formValue.wrist_left);
    }

    return model;
  }

  private mapGirthLower(formValue: any): GirthMeasurementLowerModel {
    const enabled = formValue.girth_measurement_lower === 'yes';
    const model: GirthMeasurementLowerModel = { enabled };

    if (enabled) {
      model.midPatella = this.createGirthMeasurement(formValue.mid_patella_right, formValue.mid_patella_left);
      model.midThigh = this.createGirthMeasurement(formValue.mid_thigh_right, formValue.mid_thigh_left);
      model.midCalf = this.createGirthMeasurement(formValue.mid_calf_right, formValue.mid_calf_left);
      model.midMalleoli = this.createGirthMeasurement(formValue.mid_malleoli_right, formValue.mid_malleoli_left);
      model.ankleFigure8 = this.createGirthMeasurement(formValue.ankle_figure_8_right, formValue.ankle_figure_8_left);
      model.midFoot = this.createGirthMeasurement(formValue.mid_foot_right, formValue.mid_foot_left);
      model.metatarsalHeads = this.createGirthMeasurement(formValue.metatarsal_heads_right, formValue.metatarsal_heads_left);
    }

    return model;
  }

  private mapPostOperative(formValue: any): PostOperativeWoundHealingModel {
    const enabled = formValue.post_operative_wound_healing === 'yes';
    const model: PostOperativeWoundHealingModel = { enabled };

    if (enabled) {
      model.incisionSites = { value: formValue.incision_sites || '' };

      model.surgicalPrecautions = {
        enabled: formValue.surgical_precautions === 'yes',
        select: formValue.surgical_precautions === 'yes' ? formValue.surgical_precautions_select : undefined
      };

      model.scarMobility = {
        enabled: formValue.scar_mobility === 'yes',
        text: formValue.scar_mobility === 'yes' ? formValue.scar_mobility_text : undefined
      };

      model.scarType = {
        enabled: formValue.scar_type === 'yes',
        select: formValue.scar_type === 'yes' ? formValue.scar_type_select : undefined
      };

      model.woundDescription = {
        enabled: formValue.wound_description === 'yes',
        text: formValue.wound_description === 'yes' ? formValue.wound_description_text : undefined
      };

      model.woundMeasurements = {
        enabled: formValue.wound_measurements === 'yes',
        length: formValue.wound_measurements === 'yes' ? formValue.wound_length : undefined,
        width: formValue.wound_measurements === 'yes' ? formValue.wound_width : undefined
      };
    }

    return model;
  }

  private mapWoundCare(formValue: any): WoundCareModel {
    const enabled = formValue.wound_care === 'yes';
    const model: WoundCareModel = { enabled };

    if (enabled) {
      const surfaceCulture: SurfaceCultureModel = {
        surfaceCultureUsed: formValue.surface_culture_used || 'na'
      };

      if (formValue.surface_culture_used === 'yes') {
        surfaceCulture.fields = {
          levine: formValue.surface_culture_levine || false,
          deepSwab: formValue.surface_culture_deep_swab || false,
          semiquantitative: formValue.surface_culture_semiquantitative || false,
          quantitative: formValue.surface_culture_quantitative || false,
          reasoning: formValue.surface_culture_reasoning || ''
        };
      } else if (formValue.surface_culture_used === 'no') {
        surfaceCulture.techniqueUtilized = {
          technique: formValue.surface_culture_technique || ''
        };
      }

      model.surfaceCulture = surfaceCulture;
    }

    return model;
  }

  private mapSurgicalScarring(formValue: any): SurgicalScarringModel {
    const enabled = formValue.surgical_scarring === 'yes';
    const model: SurgicalScarringModel = { enabled };

    if (enabled) {
      model.selections = formValue.surgical_scarring_select || [];
    }

    return model;
  }

  private mapBodyMassIndex(formValue: any): BodyMassIndexModel {
    const enabled = formValue.body_mass_index === 'yes';
    const model: BodyMassIndexModel = { enabled };

    if (enabled) {
      model.weight = formValue.bmi_weight || '';
      model.height = formValue.bmi_height || '';
      model.units = formValue.bmi_units || 'lbs_in';
      model.index = formValue.bmi_index || '';
      model.followupPlan = formValue.bmi_followup_plan || '';
    }

    return model;
  }

  private mapAdditionalComments(formValue: any): AdditionalCommentsModel {
    const enabled = formValue.additional_comments === 'yes';
    const model: AdditionalCommentsModel = { enabled };

    if (enabled) {
      model.text = formValue.additional_comments_text || '';
    }

    return model;
  }

  private createGirthMeasurement(right: string, left: string): GirthMeasurementModel {
    return {
      right: right || '',
      left: left || ''
    };
  }
}
