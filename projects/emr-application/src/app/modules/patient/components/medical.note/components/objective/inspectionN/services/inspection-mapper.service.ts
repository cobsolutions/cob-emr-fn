import { Injectable } from '@angular/core';
import { Inspection } from '../models/Inspection';

@Injectable({
  providedIn: 'root'
})
export class InspectionMapperService {

  /**
   * Converts form raw value to InspectionModel for backend
   */
  toModel(formValue: any): Inspection {
    return {
      inspection: formValue.inspection || '',

      // Patient Consent
      patientConsent: {
        patientConsent: formValue.patient_consent === 'yes',
        patientParentGuardianConsent: formValue.patient_parent_guardian_consent === 'yes'
      },

      // Chaperone
      chaperone: {
        chaperone: formValue.chaperone === 'yes',
        chaperonePresent: formValue.chaperone_present
      },

      // Girth Measurement Upper
      girthMeasurementUpper: {
        girthMeasurementUpper: formValue.girth_measurement_upper === 'yes',
        upperArmRight: formValue.upper_arm_right || '',
        upperArmLeft: formValue.upper_arm_left || '',
        midBicepsRight: formValue.mid_biceps_right || '',
        midBicepsLeft: formValue.mid_biceps_left || '',
        elbowFlexionCreaseRight: formValue.elbow_flexion_crease_right || '',
        elbowFlexionCreaseLeft: formValue.elbow_flexion_crease_left || '',
        forearmRight: formValue.forearm_right || '',
        forearmLeft: formValue.forearm_left || '',
        wristRight: formValue.wrist_right || '',
        wristLeft: formValue.wrist_left || ''
      },

      // Girth Measurement Lower
      girthMeasurementLower: {
        girthMeasurementLower: formValue.girth_measurement_lower === 'yes',
        midPatellaRight: formValue.mid_patella_right || '',
        midPatellaLeft: formValue.mid_patella_left || '',
        midThighRight: formValue.mid_thigh_right || '',
        midThighLeft: formValue.mid_thigh_left || '',
        midCalfRight: formValue.mid_calf_right || '',
        midCalfLeft: formValue.mid_calf_left || '',
        midMalleoliRight: formValue.mid_malleoli_right || '',
        midMalleoliLeft: formValue.mid_malleoli_left || '',
        ankleFigure_8Right: formValue.ankle_figure_8_right || '',
        ankleFigure_8Left: formValue.ankle_figure_8_left || '',
        midFootRight: formValue.mid_foot_right || '',
        midFootLeft: formValue.mid_foot_left || '',
        metatarsalHeadsRight: formValue.metatarsal_heads_right || '',
        metatarsalHeadsLeft: formValue.metatarsal_heads_left || ''
      },

      // Post Operative Wound Healing
      postOperativeWoundHealing: {
        incisionSites: formValue.incision_sites || '',
        woundDescription: formValue.wound_description === 'yes',
        woundDescriptionText: formValue.wound_description_text || '',
        woundMeasurements: formValue.wound_measurements === 'yes',
        woundLength: formValue.wound_length || '',
        woundWidth: formValue.wound_width || '',
        surgicalPrecautions: {
          surgicalPrecautions: formValue.surgical_precautions === 'yes',
          surgicalPrecautionSelection: formValue.surgical_precautions_select
        },
        scarType: {
          scarType: formValue.scar_type === 'yes',
          scarTypeSelection: formValue.scar_type_select
        },
        scarMobility: {
          scarMobility: formValue.scar_mobility === 'yes',
          scarMobilityText: formValue.scar_mobility_text || ''
        }
      },

      // Wound Care
      woundCare: {
        woundCare: formValue.wound_care === 'yes',
        surfaceculture: {
          surfaceCultureUsed: formValue.surface_culture_used === 'yes' ? true :
                             formValue.surface_culture_used === 'no' ? false : null,
          surfaceCultureLevine: formValue.surface_culture_levine || false,
          surfaceCultureDeepSwab: formValue.surface_culture_deep_swab || false,
          surfaceCultureSemiquantitative: formValue.surface_culture_semiquantitative || false,
          surfaceCultureQuantitative: formValue.surface_culture_quantitative || false,
          surfaceCultureTechnique: formValue.surface_culture_technique || '',
          surfaceCultureReasoning: formValue.surface_culture_reasoning || ''
        }
      },

      // Surgical Scarring
      surgicalScarring: {
        surgicalScarring: formValue.surgical_scarring === 'yes',
        surgicalScarringSelect: formValue.surgical_scarring_select || []
      },

      // Body Mass Index
      bodyMassIndex: {
        bodyMassIndex: formValue.body_mass_index === 'yes',
        bmiWeight: formValue.bmi_weight || '',
        bmiHeight: formValue.bmi_height || '',
        bmiUnits: formValue.bmi_units || 'lbs_in',
        bmiIndex: formValue.bmi_index || '',
        bmiFollowupPlan: formValue.bmi_followup_plan || ''
      },

      // Additional Comments
      additionalComments: {
        additionalComments: formValue.additional_comments === 'yes',
        additionalCommentsText: formValue.additional_comments_text || ''
      }
    };
  }

  /**
   * Converts DTO from backend to form value object
   */
  fromDto(dto: Inspection): any {
    return {
      // Basic inspection
      inspection: dto.inspection || '',

      // Patient Consent
      patient_consent: dto.patientConsent?.patientConsent ? 'yes' : 'no',
      patient_parent_guardian_consent: dto.patientConsent?.patientParentGuardianConsent ? 'yes' : 'no',

      // Chaperone
      chaperone: dto.chaperone?.chaperone ? 'yes' : 'no',
      chaperone_present: dto.chaperone?.chaperonePresent,

      // Girth Measurement Upper
      girth_measurement_upper: dto.girthMeasurementUpper?.girthMeasurementUpper ? 'yes' : 'no',
      upper_arm_right: dto.girthMeasurementUpper?.upperArmRight || '',
      upper_arm_left: dto.girthMeasurementUpper?.upperArmLeft || '',
      mid_biceps_right: dto.girthMeasurementUpper?.midBicepsRight || '',
      mid_biceps_left: dto.girthMeasurementUpper?.midBicepsLeft || '',
      elbow_flexion_crease_right: dto.girthMeasurementUpper?.elbowFlexionCreaseRight || '',
      elbow_flexion_crease_left: dto.girthMeasurementUpper?.elbowFlexionCreaseLeft || '',
      forearm_right: dto.girthMeasurementUpper?.forearmRight || '',
      forearm_left: dto.girthMeasurementUpper?.forearmLeft || '',
      wrist_right: dto.girthMeasurementUpper?.wristRight || '',
      wrist_left: dto.girthMeasurementUpper?.wristLeft || '',

      // Girth Measurement Lower
      girth_measurement_lower: dto.girthMeasurementLower?.girthMeasurementLower ? 'yes' : 'no',
      mid_patella_right: dto.girthMeasurementLower?.midPatellaRight || '',
      mid_patella_left: dto.girthMeasurementLower?.midPatellaLeft || '',
      mid_thigh_right: dto.girthMeasurementLower?.midThighRight || '',
      mid_thigh_left: dto.girthMeasurementLower?.midThighLeft || '',
      mid_calf_right: dto.girthMeasurementLower?.midCalfRight || '',
      mid_calf_left: dto.girthMeasurementLower?.midCalfLeft || '',
      mid_malleoli_right: dto.girthMeasurementLower?.midMalleoliRight || '',
      mid_malleoli_left: dto.girthMeasurementLower?.midMalleoliLeft || '',
      ankle_figure_8_right: dto.girthMeasurementLower?.ankleFigure_8Right || '',
      ankle_figure_8_left: dto.girthMeasurementLower?.ankleFigure_8Left || '',
      mid_foot_right: dto.girthMeasurementLower?.midFootRight || '',
      mid_foot_left: dto.girthMeasurementLower?.midFootLeft || '',
      metatarsal_heads_right: dto.girthMeasurementLower?.metatarsalHeadsRight || '',
      metatarsal_heads_left: dto.girthMeasurementLower?.metatarsalHeadsLeft || '',

      // Post Operative Wound Healing - derive toggle from presence of data
      post_operative_wound_healing: dto.postOperativeWoundHealing?.incisionSites ||
        dto.postOperativeWoundHealing?.woundDescription ||
        dto.postOperativeWoundHealing?.surgicalPrecautions?.surgicalPrecautions ||
        dto.postOperativeWoundHealing?.scarMobility?.scarMobility ? 'yes' : 'no',
      incision_sites: dto.postOperativeWoundHealing?.incisionSites || null,
      wound_description: dto.postOperativeWoundHealing?.woundDescription ? 'yes' : 'no',
      wound_description_text: dto.postOperativeWoundHealing?.woundDescriptionText || '',
      wound_measurements: dto.postOperativeWoundHealing?.woundMeasurements ? 'yes' : 'no',
      wound_length: dto.postOperativeWoundHealing?.woundLength || '',
      wound_width: dto.postOperativeWoundHealing?.woundWidth || '',
      surgical_precautions: dto.postOperativeWoundHealing?.surgicalPrecautions?.surgicalPrecautions ? 'yes' : 'no',
      surgical_precautions_select: dto.postOperativeWoundHealing?.surgicalPrecautions?.surgicalPrecautionSelection,

      scar_type: dto.postOperativeWoundHealing?.scarType?.scarType ? 'yes' : 'no',
      scar_type_select: dto.postOperativeWoundHealing?.scarType?.scarTypeSelection,
      scar_mobility: dto.postOperativeWoundHealing?.scarMobility?.scarMobility ? 'yes' : 'no',
      scar_mobility_text: dto.postOperativeWoundHealing?.scarMobility?.scarMobilityText || '',


      // Wound Care
      wound_care: dto.woundCare?.woundCare ? 'yes' : 'no',
      surface_culture_used: dto.woundCare?.surfaceculture?.surfaceCultureUsed === true ? 'yes' :
                           dto.woundCare?.surfaceculture?.surfaceCultureUsed === false ? 'no' : null,
      surface_culture_levine: dto.woundCare?.surfaceculture?.surfaceCultureLevine || false,
      surface_culture_deep_swab: dto.woundCare?.surfaceculture?.surfaceCultureDeepSwab || false,
      surface_culture_semiquantitative: dto.woundCare?.surfaceculture?.surfaceCultureSemiquantitative || false,
      surface_culture_quantitative: dto.woundCare?.surfaceculture?.surfaceCultureQuantitative || false,
      surface_culture_technique: dto.woundCare?.surfaceculture?.surfaceCultureTechnique || '',
      surface_culture_reasoning: dto.woundCare?.surfaceculture?.surfaceCultureReasoning || '',

      // Surgical Scarring
      surgical_scarring: dto.surgicalScarring?.surgicalScarring ? 'yes' : 'no',
      surgical_scarring_select: dto.surgicalScarring?.surgicalScarringSelect || [],

      // Body Mass Index
      body_mass_index: dto.bodyMassIndex?.bodyMassIndex ? 'yes' : 'no',
      bmi_weight: dto.bodyMassIndex?.bmiWeight || '',
      bmi_height: dto.bodyMassIndex?.bmiHeight || '',
      bmi_units: dto.bodyMassIndex?.bmiUnits || 'lbs_in',
      bmi_index: dto.bodyMassIndex?.bmiIndex || '',
      bmi_followup_plan: dto.bodyMassIndex?.bmiFollowupPlan || '',

      // Additional Comments
      additional_comments: dto.additionalComments?.additionalComments ? 'yes' : 'no',
      additional_comments_text: dto.additionalComments?.additionalCommentsText || ''
    };
  }


}
