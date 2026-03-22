import { Injectable } from '@angular/core';
import { Observation } from '../models/Observation';

@Injectable({
  providedIn: 'root'
})
export class ObservationMapperService {

  /**
   * Converts form raw value to ObservationModel for backend
   */
  toModel(formValue: any): Observation {
    return {
      indicateBodyType: {
        indicateBodyType: formValue.indicate_body_type || false,
        bodyType: formValue.body_type ?? ''
      },
      vitals: {
        vitals: formValue.vitals || false,
        temperature: formValue.temperature || false,
        bloodPressure: {
          bloodPressure: formValue.blood_pressure || false,
          bloodPressureOrthostaticRisk: formValue.blood_pressure_orthostatic_risk || false,
          bloodPressureArm: formValue.blood_pressure_arm ?? '',
          bloodPressureSystolic: formValue.blood_pressure_systolic ?? '',
          bloodPressureDiastolic: formValue.blood_pressure_diastolic ?? '',
          bloodPressureLocation: formValue.blood_pressure_location ?? '',
          bloodPressurePosition: formValue.blood_pressure_position ?? ''
        },
        pulse: {
          pulse: formValue.pulse || false,
          pulseValue: formValue.pulse_value ?? '',
          pulseBpmType: formValue.pulse_bpm_type ?? '',
          pulseRight: formValue.pulse_right ?? '',
          pulseLeft: formValue.pulse_left ?? ''
        },
        respiration: {
          respiration: formValue.respiration || false,
          respirationSelections: formValue.respiration_selections ?? [],
          respirationComments: formValue.respiration_comments ?? ''
        },
        weight: {
          weight: formValue.weight || false,
          weightValue: formValue.weight_value ?? '',
          weightUnit: formValue.weight_unit ?? ''
        }
      },
      adlManagement: {
        adlManagement: formValue.adl_management || false,
        adlBathing: formValue.adl_bathing || false,
        adlBathingStatus: formValue.adl_bathing_status ?? '',
        adlBathingCustomText: formValue.adl_bathing_custom_text || '',
        adlToileting: formValue.adl_toileting || false,
        adlToiletingStatus: formValue.adl_toileting_status ?? '',
        adlToiletingCustomText: formValue.adl_toileting_custom_text || '',
        adlDressing: formValue.adl_dressing || false,
        adlDressingStatus: formValue.adl_dressing_status ?? '',
        adlDressingCustomText: formValue.adl_dressing_custom_text || '',
        adlGrooming: formValue.adl_grooming || false,
        adlGroomingStatus: formValue.adl_grooming_status ?? '',
        adlGroomingCustomText: formValue.adl_grooming_custom_text || '',
        adlEating: formValue.adl_eating || false,
        adlEatingStatus: formValue.adl_eating_status ?? '',
        adlEatingCustomText: formValue.adl_eating_custom_text || ''
      },
      breathingatRest: {
        breathingAtRest: formValue.breathing_at_rest || false,
        breathingApical: formValue.breathing_apical || false,
        breathingDiaphragmatically: formValue.breathing_diaphragmatically || false,
        breathingShortened: formValue.breathing_shortened || false,
        breathingAsymmetrical: formValue.breathing_asymmetrical || false,
        breathingDecreased: formValue.breathing_decreased || false,
        breathingAccessory: formValue.breathing_accessory || false,
        breathingComments: formValue.breathing_comments ?? ''
      },
      transfers: {
        transfers: formValue.transfers || false,
        transferSupineToSit: formValue.transfer_supine_to_sit || false,
        transferSupineToSitStatus: formValue.transfer_supine_to_sit_status ?? '',
        transferSupineToSitComments: formValue.transfer_supine_to_sit_comments ?? '',
        transferSitToStand: formValue.transfer_sit_to_stand || false,
        transferSitToStandStatus: formValue.transfer_sit_to_stand_status ?? '',
        transferSitToStandComments: formValue.transfer_sit_to_stand_comments ?? '',
        transferToilet: formValue.transfer_toilet || false,
        transferToiletStatus: formValue.transfer_toilet_status ?? '',
        transferToiletComments: formValue.transfer_toilet_comments ?? ''
      },
      castSplint: {
        castSplint: formValue.cast_splint || false,
        castSplintType_1: formValue.cast_splint_type_1 ?? '',
        castSplintComplaints_1: formValue.cast_splint_complaints_1 ?? '',
        castSplintDateApplied_1: formValue.cast_splint_date_applied_1 ?? '',
        castSplintComments_1: formValue.cast_splint_comments_1 ?? '',
        castSplintType_2: formValue.cast_splint_type_2 ?? '',
        castSplintComplaints_2: formValue.cast_splint_complaints_2 ?? '',
        castSplintDateApplied_2: formValue.cast_splint_date_applied_2 ?? '',
        castSplintDateRemoved_2: formValue.cast_splint_date_removed_2 ?? '',
        castSplintComments_2: formValue.cast_splint_comments_2 ?? ''
      },
      standingPosture: {
        standingPosture: formValue.standing_posture || false,
        standingPostureSelections: formValue.standing_posture_selections ?? [],
        standingPostureComments: formValue.standing_posture_comments ?? ''
      },
      protractedScapulas: {
        protractedScapulas: formValue.protracted_scapulas || false,
        protractedScapulasRight: formValue.protracted_scapulas_right ?? '',
        protractedScapulasLeft: formValue.protracted_scapulas_left ?? ''
      },
      scoliosis: {
        scoliosis: formValue.scoliosis || false,
        scoliosisType: formValue.scoliosis_type ?? '',
        scoliosisCurvature: formValue.scoliosis_curvature ?? ''
      },
      lowerExtremityStructure: {
        lowerExtremityStructure: formValue.lower_extremity_structure || false,
        lesGenuValgusRight: formValue.les_genu_valgus_right ?? '',
        lesGenuValgusLeft: formValue.les_genu_valgus_left ?? '',
        lesGenuVarusRight: formValue.les_genu_varus_right ?? '',
        lesGenuVarusLeft: formValue.les_genu_varus_left ?? '',
        lesTibialTorsionRight: formValue.les_tibial_torsion_right ?? '',
        lesTibialTorsionLeft: formValue.les_tibial_torsion_left ?? '',
        lesGenuRecurvatumRight: formValue.les_genu_recurvatum_right ?? '',
        lesGenuRecurvatumLeft: formValue.les_genu_recurvatum_left ?? '',
        lesFootPronationRight: formValue.les_foot_pronation_right ?? '',
        lesFootPronationLeft: formValue.les_foot_pronation_left ?? '',
        lesFootSupinationRight: formValue.les_foot_supination_right ?? '',
        lesFootSupinationLeft: formValue.les_foot_supination_left ?? '',
        lesFemoralAnteversionRight: formValue.les_femoral_anteversion_right ?? '',
        lesFemoralAnteversionLeft: formValue.les_femoral_anteversion_left ?? '',
        lesFemoralRetroversionRight: formValue.les_femoral_retroversion_right ?? '',
        lesFemoralRetroversionLeft: formValue.les_femoral_retroversion_left ?? '',
        lesDyskineticLeChainRight: formValue.les_dyskinetic_le_chain_right ?? '',
        lesDyskineticLeChainLeft: formValue.les_dyskinetic_le_chain_left ?? '',
        lesPatellarPositionRight: formValue.les_patellar_position_right ?? '',
        lesPatellarPositionLeft: formValue.les_patellar_position_left ?? '',
        lesCalcanealExostosisRight: formValue.les_calcaneal_exostosis_right ?? '',
        lesCalcanealExostosisLeft: formValue.les_calcaneal_exostosis_left ?? '',
        lesCalcanealValgusRight: formValue.les_calcaneal_valgus_right ?? '',
        lesCalcanealValgusLeft: formValue.les_calcaneal_valgus_left ?? '',
        lesCalcanealVarusRight: formValue.les_calcaneal_varus_right ?? '',
        lesCalcanealVarusLeft: formValue.les_calcaneal_varus_left ?? '',
        lesHalluxValgusRight: formValue.les_hallux_valgus_right ?? '',
        lesHalluxValgusLeft: formValue.les_hallux_valgus_left ?? ''
      },
      gait: {
        gait: formValue.gait || false,
        gaitSelections: formValue.gait_selections ?? [],
        gaitComments: formValue.gait_comments ?? ''
      },
      sixMinuteWalkTest: {
        sixMinuteWalkTest: formValue.six_minute_walk_test || false,
        walkRestSp02: formValue.walk_rest_sp02 ?? '',
        walkRestHeartRate: formValue.walk_rest_heart_rate ?? '',
        walkRestRespiratoryRate: formValue.walk_rest_respiratory_rate ?? '',
        walkRestBorgScale: formValue.walk_rest_borg_scale ?? '',
        walkRestDistance: formValue.walk_rest_distance ?? '',
        walk_1minSp02: formValue.walk_1min_sp02 ?? '',
        walk_1minHeartRate: formValue.walk_1min_heart_rate ?? '',
        walk_1minRespiratoryRate: formValue.walk_1min_respiratory_rate ?? '',
        walk_1minBorgScale: formValue.walk_1min_borg_scale ?? '',
        walk_1minDistance: formValue.walk_1min_distance ?? '',
        walk_2minSp02: formValue.walk_2min_sp02 ?? '',
        walk_2minHeartRate: formValue.walk_2min_heart_rate ?? '',
        walk_2minRespiratoryRate: formValue.walk_2min_respiratory_rate ?? '',
        walk_2minBorgScale: formValue.walk_2min_borg_scale ?? '',
        walk_2minDistance: formValue.walk_2min_distance ?? '',
        walk_3minSp02: formValue.walk_3min_sp02 ?? '',
        walk_3minHeartRate: formValue.walk_3min_heart_rate ?? '',
        walk_3minRespiratoryRate: formValue.walk_3min_respiratory_rate ?? '',
        walk_3minBorgScale: formValue.walk_3min_borg_scale ?? '',
        walk_3minDistance: formValue.walk_3min_distance ?? '',
        walk_4minSp02: formValue.walk_4min_sp02 ?? '',
        walk_4minHeartRate: formValue.walk_4min_heart_rate ?? '',
        walk_4minRespiratoryRate: formValue.walk_4min_respiratory_rate ?? '',
        walk_4minBorgScale: formValue.walk_4min_borg_scale ?? '',
        walk_4minDistance: formValue.walk_4min_distance ?? '',
        walk_5minSp02: formValue.walk_5min_sp02 ?? '',
        walk_5minHeartRate: formValue.walk_5min_heart_rate ?? '',
        walk_5minRespiratoryRate: formValue.walk_5min_respiratory_rate ?? '',
        walk_5minBorgScale: formValue.walk_5min_borg_scale ?? '',
        walk_5minDistance: formValue.walk_5min_distance ?? '',
        walk_6minSp02: formValue.walk_6min_sp02 ?? '',
        walk_6minHeartRate: formValue.walk_6min_heart_rate ?? '',
        walk_6minRespiratoryRate: formValue.walk_6min_respiratory_rate ?? '',
        walk_6minBorgScale: formValue.walk_6min_borg_scale ?? '',
        walk_6minDistance: formValue.walk_6min_distance ?? '',
        walkComments: formValue.walk_comments ?? ''
      },
      assistiveDevice: {
        assistiveDevice: formValue.assistive_device || false,
        assistiveDeviceType: formValue.assistive_device_type ?? '',
        assistiveDeviceCustomText: formValue.assistive_device_custom_text || '',
        assistiveDeviceHand: formValue.assistive_device_hand ?? '',
        assistiveDeviceComments: formValue.assistive_device_comments ?? ''
      },
      immobilizer: {
        immobilizer: formValue.immobilizer || false,
        immobilizerType: formValue.immobilizer_type ?? '',
        immobilizerCompliant: formValue.immobilizer_compliant || false
      },
      muscularAsymmetries: {
        muscularAsymmetries: formValue.muscular_asymmetries || false,
        muscularAsymmetriesDescription: formValue.muscular_asymmetries_description ?? ''
      },
      muscleGuarding: {
        muscleGuarding: formValue.muscle_guarding || false,
        muscleGuardingValue: formValue.muscle_guarding_value ?? ''
      },
      muscleAtrophy: {
        muscleAtrophy: formValue.muscle_atrophy || false,
        muscleAtrophyDescription: formValue.muscle_atrophy_description ?? ''
      },
      edema: {
        edema: formValue.edema,
        edemaDescription: formValue.edema_description ?? '',
        edemaPitting: formValue.edema_pitting || false,
        edemaPittingText: formValue.edema_pitting_text || ''
      },
      apprehensionofMovement: {
        apprehensionOfMovement: formValue.apprehension_of_movement || false,
        apprehensionValue: formValue.apprehension_value ?? ''
      },
      additionalComments: {
        additionalComments: formValue.additional_comments || false,
        additionalCommentsText: formValue.additional_comments_text ?? ''
      }
    };
  }

  /**
   * Converts DTO from backend to form value object
   */
  fromDto(dto: Observation): any {
    return {
      // Indicate Body Type
      indicate_body_type: dto.indicateBodyType?.indicateBodyType ? 'yes' : 'no',
      body_type: dto.indicateBodyType?.bodyType || '',

      // Vitals
      vitals: dto.vitals?.vitals ? 'yes' : 'no',
      temperature: dto.vitals?.temperature ? 'yes' : 'no',

      // Blood Pressure
      blood_pressure: dto.vitals?.bloodPressure?.bloodPressure ? 'yes' : 'no',
      blood_pressure_orthostatic_risk: dto.vitals?.bloodPressure?.bloodPressureOrthostaticRisk,
      blood_pressure_arm: dto.vitals?.bloodPressure?.bloodPressureArm || '',
      blood_pressure_systolic: dto.vitals?.bloodPressure?.bloodPressureSystolic || '',
      blood_pressure_diastolic: dto.vitals?.bloodPressure?.bloodPressureDiastolic || '',
      blood_pressure_location: dto.vitals?.bloodPressure?.bloodPressureLocation || '',
      blood_pressure_position: dto.vitals?.bloodPressure?.bloodPressurePosition || '',

      // Pulse
      pulse: dto.vitals?.pulse?.pulse ? 'yes' : 'no',
      pulse_value: dto.vitals?.pulse?.pulseValue || '',
      pulse_bpm_type: dto.vitals?.pulse?.pulseBpmType || '',
      pulse_right: dto.vitals?.pulse?.pulseRight || '',
      pulse_left: dto.vitals?.pulse?.pulseLeft || '',

      // Respiration
      respiration: dto.vitals?.respiration?.respiration ? 'yes' : 'no',
      respiration_selections: dto.vitals?.respiration?.respirationSelections || [],
      respiration_comments: dto.vitals?.respiration?.respirationComments || '',

      // Weight
      weight: dto.vitals?.weight?.weight ? 'yes' : 'no',
      weight_value: dto.vitals?.weight?.weightValue || '',
      weight_unit: dto.vitals?.weight?.weightUnit || '',

      // ADL Management
      adl_management: dto.adlManagement?.adlManagement ? 'yes' : 'no',
      adl_bathing: dto.adlManagement?.adlBathing ? 'yes' : 'no',
      adl_bathing_status: dto.adlManagement?.adlBathingStatus || '',
      adl_bathing_custom_text: dto.adlManagement?.adlBathingCustomText || '',
      adl_toileting: dto.adlManagement?.adlToileting ? 'yes' : 'no',
      adl_toileting_status: dto.adlManagement?.adlToiletingStatus || '',
      adl_toileting_custom_text: dto.adlManagement?.adlToiletingCustomText || '',
      adl_dressing: dto.adlManagement?.adlDressing ? 'yes' : 'no',
      adl_dressing_status: dto.adlManagement?.adlDressingStatus || '',
      adl_dressing_custom_text: dto.adlManagement?.adlDressingCustomText || '',
      adl_grooming: dto.adlManagement?.adlGrooming ? 'yes' : 'no',
      adl_grooming_status: dto.adlManagement?.adlGroomingStatus || '',
      adl_grooming_custom_text: dto.adlManagement?.adlGroomingCustomText || '',
      adl_eating: dto.adlManagement?.adlEating ? 'yes' : 'no',
      adl_eating_status: dto.adlManagement?.adlEatingStatus || '',
      adl_eating_custom_text: dto.adlManagement?.adlEatingCustomText || '',

      // Breathing at Rest
      breathing_at_rest: dto.breathingatRest?.breathingAtRest ? 'yes' : 'no',
      breathing_apical: dto.breathingatRest?.breathingApical || '',
      breathing_diaphragmatically: dto.breathingatRest?.breathingDiaphragmatically || '',
      breathing_shortened: dto.breathingatRest?.breathingShortened || '',
      breathing_asymmetrical: dto.breathingatRest?.breathingAsymmetrical || '',
      breathing_decreased: dto.breathingatRest?.breathingDecreased || '',
      breathing_accessory: dto.breathingatRest?.breathingAccessory || '',
      breathing_comments: dto.breathingatRest?.breathingComments || '',

      // Transfers
      transfers: dto.transfers?.transfers ? 'yes' : 'no',
      transfer_supine_to_sit: dto.transfers?.transferSupineToSit ? 'yes' : 'no',
      transfer_supine_to_sit_status: dto.transfers?.transferSupineToSitStatus || '',
      transfer_supine_to_sit_comments: dto.transfers?.transferSupineToSitComments || '',
      transfer_sit_to_stand: dto.transfers?.transferSitToStand ? 'yes' : 'no',
      transfer_sit_to_stand_status: dto.transfers?.transferSitToStandStatus || '',
      transfer_sit_to_stand_comments: dto.transfers?.transferSitToStandComments || '',
      transfer_toilet: dto.transfers?.transferToilet ? 'yes' : 'no',
      transfer_toilet_status: dto.transfers?.transferToiletStatus || '',
      transfer_toilet_comments: dto.transfers?.transferToiletComments || '',

      // Cast Splint
      cast_splint: dto.castSplint?.castSplint ? 'yes' : 'no',
      cast_splint_type_1: dto.castSplint?.castSplintType_1 || '',
      cast_splint_complaints_1: dto.castSplint?.castSplintComplaints_1 || '',
      cast_splint_date_applied_1: dto.castSplint?.castSplintDateApplied_1 || '',
      cast_splint_comments_1: dto.castSplint?.castSplintComments_1 || '',
      cast_splint_type_2: dto.castSplint?.castSplintType_2 || '',
      cast_splint_complaints_2: dto.castSplint?.castSplintComplaints_2 || '',
      cast_splint_date_applied_2: dto.castSplint?.castSplintDateApplied_2 || '',
      cast_splint_date_removed_2: dto.castSplint?.castSplintDateRemoved_2 || '',
      cast_splint_comments_2: dto.castSplint?.castSplintComments_2 || '',

      // Standing Posture
      standing_posture: dto.standingPosture?.standingPosture ? 'yes' : 'no',
      standing_posture_selections: dto.standingPosture?.standingPostureSelections || [],
      standing_posture_comments: dto.standingPosture?.standingPostureComments || '',

      // Protracted Scapulas
      protracted_scapulas: dto.protractedScapulas?.protractedScapulas ? 'yes' : 'no',
      protracted_scapulas_right: dto.protractedScapulas?.protractedScapulasRight || '',
      protracted_scapulas_left: dto.protractedScapulas?.protractedScapulasLeft || '',

      // Scoliosis
      scoliosis: dto.scoliosis?.scoliosis ? 'yes' : 'no',
      scoliosis_type: dto.scoliosis?.scoliosisType || '',
      scoliosis_curvature: dto.scoliosis?.scoliosisCurvature || '',

      // Lower Extremity Structure
      lower_extremity_structure: dto.lowerExtremityStructure?.lowerExtremityStructure ? 'yes' : 'no',
      les_genu_valgus_right: dto.lowerExtremityStructure?.lesGenuValgusRight || '',
      les_genu_valgus_left: dto.lowerExtremityStructure?.lesGenuValgusLeft || '',
      les_genu_varus_right: dto.lowerExtremityStructure?.lesGenuVarusRight || '',
      les_genu_varus_left: dto.lowerExtremityStructure?.lesGenuVarusLeft || '',
      les_tibial_torsion_right: dto.lowerExtremityStructure?.lesTibialTorsionRight || '',
      les_tibial_torsion_left: dto.lowerExtremityStructure?.lesTibialTorsionLeft || '',
      les_genu_recurvatum_right: dto.lowerExtremityStructure?.lesGenuRecurvatumRight || '',
      les_genu_recurvatum_left: dto.lowerExtremityStructure?.lesGenuRecurvatumLeft || '',
      les_foot_pronation_right: dto.lowerExtremityStructure?.lesFootPronationRight || '',
      les_foot_pronation_left: dto.lowerExtremityStructure?.lesFootPronationLeft || '',
      les_foot_supination_right: dto.lowerExtremityStructure?.lesFootSupinationRight || '',
      les_foot_supination_left: dto.lowerExtremityStructure?.lesFootSupinationLeft || '',
      les_femoral_anteversion_right: dto.lowerExtremityStructure?.lesFemoralAnteversionRight || '',
      les_femoral_anteversion_left: dto.lowerExtremityStructure?.lesFemoralAnteversionLeft || '',
      les_femoral_retroversion_right: dto.lowerExtremityStructure?.lesFemoralRetroversionRight || '',
      les_femoral_retroversion_left: dto.lowerExtremityStructure?.lesFemoralRetroversionLeft || '',
      les_dyskinetic_le_chain_right: dto.lowerExtremityStructure?.lesDyskineticLeChainRight || '',
      les_dyskinetic_le_chain_left: dto.lowerExtremityStructure?.lesDyskineticLeChainLeft || '',
      les_patellar_position_right: dto.lowerExtremityStructure?.lesPatellarPositionRight || '',
      les_patellar_position_left: dto.lowerExtremityStructure?.lesPatellarPositionLeft || '',
      les_calcaneal_exostosis_right: dto.lowerExtremityStructure?.lesCalcanealExostosisRight || '',
      les_calcaneal_exostosis_left: dto.lowerExtremityStructure?.lesCalcanealExostosisLeft || '',
      les_calcaneal_valgus_right: dto.lowerExtremityStructure?.lesCalcanealValgusRight || '',
      les_calcaneal_valgus_left: dto.lowerExtremityStructure?.lesCalcanealValgusLeft || '',
      les_calcaneal_varus_right: dto.lowerExtremityStructure?.lesCalcanealVarusRight || '',
      les_calcaneal_varus_left: dto.lowerExtremityStructure?.lesCalcanealVarusLeft || '',
      les_hallux_valgus_right: dto.lowerExtremityStructure?.lesHalluxValgusRight || '',
      les_hallux_valgus_left: dto.lowerExtremityStructure?.lesHalluxValgusLeft || '',

      // Gait
      gait: dto.gait?.gait ? 'yes' : 'no',
      gait_selections: dto.gait?.gaitSelections || [],
      gait_comments: dto.gait?.gaitComments || '',

      // Six Minute Walk Test
      six_minute_walk_test: dto.sixMinuteWalkTest?.sixMinuteWalkTest ? 'yes' : 'no',
      walk_rest_sp02: dto.sixMinuteWalkTest?.walkRestSp02 || '',
      walk_rest_heart_rate: dto.sixMinuteWalkTest?.walkRestHeartRate || '',
      walk_rest_respiratory_rate: dto.sixMinuteWalkTest?.walkRestRespiratoryRate || '',
      walk_rest_borg_scale: dto.sixMinuteWalkTest?.walkRestBorgScale || '',
      walk_rest_distance: dto.sixMinuteWalkTest?.walkRestDistance || '',
      walk_1min_sp02: dto.sixMinuteWalkTest?.walk_1minSp02 || '',
      walk_1min_heart_rate: dto.sixMinuteWalkTest?.walk_1minHeartRate || '',
      walk_1min_respiratory_rate: dto.sixMinuteWalkTest?.walk_1minRespiratoryRate || '',
      walk_1min_borg_scale: dto.sixMinuteWalkTest?.walk_1minBorgScale || '',
      walk_1min_distance: dto.sixMinuteWalkTest?.walk_1minDistance || '',
      walk_2min_sp02: dto.sixMinuteWalkTest?.walk_2minSp02 || '',
      walk_2min_heart_rate: dto.sixMinuteWalkTest?.walk_2minHeartRate || '',
      walk_2min_respiratory_rate: dto.sixMinuteWalkTest?.walk_2minRespiratoryRate || '',
      walk_2min_borg_scale: dto.sixMinuteWalkTest?.walk_2minBorgScale || '',
      walk_2min_distance: dto.sixMinuteWalkTest?.walk_2minDistance || '',
      walk_3min_sp02: dto.sixMinuteWalkTest?.walk_3minSp02 || '',
      walk_3min_heart_rate: dto.sixMinuteWalkTest?.walk_3minHeartRate || '',
      walk_3min_respiratory_rate: dto.sixMinuteWalkTest?.walk_3minRespiratoryRate || '',
      walk_3min_borg_scale: dto.sixMinuteWalkTest?.walk_3minBorgScale || '',
      walk_3min_distance: dto.sixMinuteWalkTest?.walk_3minDistance || '',
      walk_4min_sp02: dto.sixMinuteWalkTest?.walk_4minSp02 || '',
      walk_4min_heart_rate: dto.sixMinuteWalkTest?.walk_4minHeartRate || '',
      walk_4min_respiratory_rate: dto.sixMinuteWalkTest?.walk_4minRespiratoryRate || '',
      walk_4min_borg_scale: dto.sixMinuteWalkTest?.walk_4minBorgScale || '',
      walk_4min_distance: dto.sixMinuteWalkTest?.walk_4minDistance || '',
      walk_5min_sp02: dto.sixMinuteWalkTest?.walk_5minSp02 || '',
      walk_5min_heart_rate: dto.sixMinuteWalkTest?.walk_5minHeartRate || '',
      walk_5min_respiratory_rate: dto.sixMinuteWalkTest?.walk_5minRespiratoryRate || '',
      walk_5min_borg_scale: dto.sixMinuteWalkTest?.walk_5minBorgScale || '',
      walk_5min_distance: dto.sixMinuteWalkTest?.walk_5minDistance || '',
      walk_6min_sp02: dto.sixMinuteWalkTest?.walk_6minSp02 || '',
      walk_6min_heart_rate: dto.sixMinuteWalkTest?.walk_6minHeartRate || '',
      walk_6min_respiratory_rate: dto.sixMinuteWalkTest?.walk_6minRespiratoryRate || '',
      walk_6min_borg_scale: dto.sixMinuteWalkTest?.walk_6minBorgScale || '',
      walk_6min_distance: dto.sixMinuteWalkTest?.walk_6minDistance || '',
      walk_comments: dto.sixMinuteWalkTest?.walkComments || '',

      // Assistive Device
      assistive_device: dto.assistiveDevice?.assistiveDevice ? 'yes' : 'no',
      assistive_device_type: dto.assistiveDevice?.assistiveDeviceType || '',
      assistive_device_custom_text: dto.assistiveDevice?.assistiveDeviceCustomText || '',
      assistive_device_hand: dto.assistiveDevice?.assistiveDeviceHand || '',
      assistive_device_comments: dto.assistiveDevice?.assistiveDeviceComments || '',

      // Immobilizer
      immobilizer: dto.immobilizer?.immobilizer ? 'yes' : 'no',
      immobilizer_type: dto.immobilizer?.immobilizerType || '',
      immobilizer_compliant: dto.immobilizer?.immobilizerCompliant ? 'yes' : 'no',

      // Muscular Asymmetries
      muscular_asymmetries: dto.muscularAsymmetries?.muscularAsymmetries ? 'yes' : 'no',
      muscular_asymmetries_description: dto.muscularAsymmetries?.muscularAsymmetriesDescription || '',

      // Muscle Guarding
      muscle_guarding: dto.muscleGuarding?.muscleGuarding ? 'yes' : 'no',
      muscle_guarding_value: dto.muscleGuarding?.muscleGuardingValue || '',

      // Muscle Atrophy
      muscle_atrophy: dto.muscleAtrophy?.muscleAtrophy ? 'yes' : 'no',
      muscle_atrophy_description: dto.muscleAtrophy?.muscleAtrophyDescription || '',

      // Edema
      edema: dto?.edema ? 'yes' : 'no',
      edema_description: dto.edema?.edemaDescription || '',
      edema_pitting: dto.edema?.edemaPitting ? 'yes' : 'no',
      edema_pitting_text: dto.edema?.edemaPittingText || '',

      // Apprehension of Movement
      apprehension_of_movement: dto.apprehensionofMovement?.apprehensionOfMovement ? 'yes' : 'no',
      apprehension_value: dto.apprehensionofMovement?.apprehensionValue || '',

      // Additional Comments
      additional_comments: dto.additionalComments?.additionalComments ? 'yes' : 'no',
      additional_comments_text: dto.additionalComments?.additionalCommentsText || ''
    };
  }
}
