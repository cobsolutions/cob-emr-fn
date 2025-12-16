import { Injectable } from '@angular/core';
import {
  ObservationModel,
  BodyTypeModel,
  VitalsModel,
  BloodPressureModel,
  TemperatureModel,
  PulseModel,
  RespirationModel,
  WeightModel,
  ADLManagementModel,
  ADLItemModel,
  BreathingAtRestModel,
  TransfersModel,
  TransferItemModel,
  CastSplintModel,
  CastSplintInstanceModel,
  StandingPostureModel,
  ProtractedScapulasModel,
  ScoliosisModel,
  LowerExtremityStructureModel,
  LowerExtremityMeasurementModel,
  GaitModel,
  SixMinuteWalkTestModel,
  SixMinuteWalkRowModel,
  AssistiveDeviceModel,
  ImmobilizerModel,
  MuscularAsymmetriesModel,
  MuscleGuardingModel,
  MuscleAtrophyModel,
  EdemaModel,
  ApprehensionOfMovementModel,
  AdditionalCommentsModel
} from '../models/observation.model';

@Injectable({
  providedIn: 'root'
})
export class ObservationMapperService {

  /**
   * Converts form raw value to ObservationModel for backend
   */
  toModel(formValue: any): ObservationModel {
    return {
      bodyType: this.mapBodyType(formValue),
      vitals: this.mapVitals(formValue),
      adlManagement: this.mapADLManagement(formValue),
      breathingAtRest: this.mapBreathingAtRest(formValue),
      transfers: this.mapTransfers(formValue),
      castSplint: this.mapCastSplint(formValue),
      standingPosture: this.mapStandingPosture(formValue),
      protractedScapulas: this.mapProtractedScapulas(formValue),
      scoliosis: this.mapScoliosis(formValue),
      lowerExtremityStructure: this.mapLowerExtremityStructure(formValue),
      gait: this.mapGait(formValue),
      sixMinuteWalkTest: this.mapSixMinuteWalkTest(formValue),
      assistiveDevice: this.mapAssistiveDevice(formValue),
      immobilizer: this.mapImmobilizer(formValue),
      muscularAsymmetries: this.mapMuscularAsymmetries(formValue),
      muscleGuarding: this.mapMuscleGuarding(formValue),
      muscleAtrophy: this.mapMuscleAtrophy(formValue),
      edema: this.mapEdema(formValue),
      apprehensionOfMovement: this.mapApprehensionOfMovement(formValue),
      additionalComments: this.mapAdditionalComments(formValue)
    };
  }

  /**
   * Converts DTO from backend to form value object
   */
  fromDto(dto: ObservationModel): any {
    return {
      // Body Type
      indicate_body_type: dto.bodyType.enabled ? 'yes' : 'no',
      body_type: dto.bodyType.bodyType || 'mesomorph',

      // Vitals
      vitals: dto.vitals.enabled ? 'yes' : 'no',
      blood_pressure: dto.vitals.bloodPressure?.enabled ? 'yes' : 'no',
      blood_pressure_orthostatic_risk: dto.vitals.bloodPressure?.orthostaticRisk || false,
      blood_pressure_arm: dto.vitals.bloodPressure?.arm || 'right',
      blood_pressure_systolic: dto.vitals.bloodPressure?.systolic || '',
      blood_pressure_diastolic: dto.vitals.bloodPressure?.diastolic || '',
      blood_pressure_location: dto.vitals.bloodPressure?.location || 'upper_arm',
      blood_pressure_position: dto.vitals.bloodPressure?.position || 'sitting',
      temperature: dto.vitals.temperature?.enabled ? 'yes' : 'no',
      pulse: dto.vitals.pulse?.enabled ? 'yes' : 'no',
      pulse_value: dto.vitals.pulse?.value || '',
      pulse_bpm_type: dto.vitals.pulse?.bpmType || 'bpm_radial',
      pulse_right: dto.vitals.pulse?.right || 'not_tested',
      pulse_left: dto.vitals.pulse?.left || 'not_tested',
      respiration: dto.vitals.respiration?.enabled ? 'yes' : 'no',
      respiration_selections: dto.vitals.respiration?.selections || [],
      respiration_comments: dto.vitals.respiration?.comments || '',
      weight: dto.vitals.weight?.enabled ? 'yes' : 'no',
      weight_value: dto.vitals.weight?.value || '',
      weight_unit: dto.vitals.weight?.unit || 'lbs',

      // ADL Management
      adl_management: dto.adlManagement.enabled ? 'yes' : 'no',
      adl_bathing: dto.adlManagement.bathing?.value || 'no',
      adl_bathing_status: dto.adlManagement.bathing?.status || 'independent',
      adl_toileting: dto.adlManagement.toileting?.value || 'no',
      adl_toileting_status: dto.adlManagement.toileting?.status || 'independent',
      adl_dressing: dto.adlManagement.dressing?.value || 'no',
      adl_dressing_status: dto.adlManagement.dressing?.status || 'independent',
      adl_grooming: dto.adlManagement.grooming?.value || 'no',
      adl_grooming_status: dto.adlManagement.grooming?.status || 'independent',
      adl_eating: dto.adlManagement.eating?.value || 'no',
      adl_eating_status: dto.adlManagement.eating?.status || 'independent',

      // Breathing at Rest
      breathing_at_rest: dto.breathingAtRest.enabled ? 'yes' : 'no',
      breathing_apical: dto.breathingAtRest.apical || false,
      breathing_diaphragmatically: dto.breathingAtRest.diaphragmatically || false,
      breathing_shortened: dto.breathingAtRest.shortenedInhalation || false,
      breathing_asymmetrical: dto.breathingAtRest.asymmetricalRibExcursion || false,
      breathing_decreased: dto.breathingAtRest.decreasedRibMotion || false,
      breathing_accessory: dto.breathingAtRest.useOfAccessoryMuscles || false,
      breathing_comments: dto.breathingAtRest.comments || '',

      // Transfers
      transfers: dto.transfers.enabled ? 'yes' : 'no',
      transfer_supine_to_sit: dto.transfers.supineToSit?.value || 'no',
      transfer_supine_to_sit_status: dto.transfers.supineToSit?.status || 'independent',
      transfer_supine_to_sit_comments: dto.transfers.supineToSit?.comments || '',
      transfer_sit_to_stand: dto.transfers.sitToStand?.value || 'no',
      transfer_sit_to_stand_status: dto.transfers.sitToStand?.status || 'independent',
      transfer_sit_to_stand_comments: dto.transfers.sitToStand?.comments || '',
      transfer_toilet: dto.transfers.toiletTransfers?.value || 'no',
      transfer_toilet_status: dto.transfers.toiletTransfers?.status || 'independent',
      transfer_toilet_comments: dto.transfers.toiletTransfers?.comments || '',

      // Cast/Splint
      cast_splint: dto.castSplint.enabled ? 'yes' : 'no',
      cast_splint_type_1: dto.castSplint.instance1?.type || 'cast',
      cast_splint_complaints_1: dto.castSplint.instance1?.complaintsWithUse || 'not_tested',
      cast_splint_date_applied_1: dto.castSplint.instance1?.dateApplied || '',
      cast_splint_date_removed_1: dto.castSplint.instance1?.dateRemoved || '',
      cast_splint_comments_1: dto.castSplint.instance1?.comments || '',
      cast_splint_type_2: dto.castSplint.instance2?.type || 'not_tested',
      cast_splint_complaints_2: dto.castSplint.instance2?.complaintsWithUse || 'not_tested',
      cast_splint_date_applied_2: dto.castSplint.instance2?.dateApplied || '',
      cast_splint_date_removed_2: dto.castSplint.instance2?.dateRemoved || '',
      cast_splint_comments_2: dto.castSplint.instance2?.comments || '',

      // Standing Posture
      standing_posture: dto.standingPosture.enabled ? 'yes' : 'no',
      standing_posture_selections: dto.standingPosture.selections || [],
      standing_posture_comments: dto.standingPosture.comments || '',

      // Protracted Scapulas
      protracted_scapulas: dto.protractedScapulas.enabled ? 'yes' : 'no',
      protracted_scapulas_right: dto.protractedScapulas.right || '1cm',
      protracted_scapulas_left: dto.protractedScapulas.left || '1cm',

      // Scoliosis
      scoliosis: dto.scoliosis.enabled ? 'yes' : 'no',
      scoliosis_type: dto.scoliosis.type || 'functional',
      scoliosis_curvature: dto.scoliosis.curvature || 'right',

      // Lower Extremity Structure
      lower_extremity_structure: dto.lowerExtremityStructure.enabled ? 'yes' : 'no',
      les_genu_valgus_right: dto.lowerExtremityStructure.genuValgus?.right || 'not_tested',
      les_genu_valgus_left: dto.lowerExtremityStructure.genuValgus?.left || 'not_tested',
      les_genu_varus_right: dto.lowerExtremityStructure.genuVarus?.right || 'not_tested',
      les_genu_varus_left: dto.lowerExtremityStructure.genuVarus?.left || 'not_tested',
      les_tibial_torsion_right: dto.lowerExtremityStructure.tibialTorsion?.right || 'not_tested',
      les_tibial_torsion_left: dto.lowerExtremityStructure.tibialTorsion?.left || 'not_tested',
      les_genu_recurvatum_right: dto.lowerExtremityStructure.genuRecurvatum?.right || 'not_tested',
      les_genu_recurvatum_left: dto.lowerExtremityStructure.genuRecurvatum?.left || 'not_tested',
      les_foot_pronation_right: dto.lowerExtremityStructure.footPronation?.right || 'not_tested',
      les_foot_pronation_left: dto.lowerExtremityStructure.footPronation?.left || 'not_tested',
      les_foot_supination_right: dto.lowerExtremityStructure.footSupination?.right || 'not_tested',
      les_foot_supination_left: dto.lowerExtremityStructure.footSupination?.left || 'not_tested',
      les_femoral_anteversion_right: dto.lowerExtremityStructure.femoralAnteversion?.right || 'not_tested',
      les_femoral_anteversion_left: dto.lowerExtremityStructure.femoralAnteversion?.left || 'not_tested',
      les_femoral_retroversion_right: dto.lowerExtremityStructure.femoralRetroversion?.right || 'not_tested',
      les_femoral_retroversion_left: dto.lowerExtremityStructure.femoralRetroversion?.left || 'not_tested',
      les_dyskinetic_le_chain_right: dto.lowerExtremityStructure.dyskineticLEChain?.right || 'not_tested',
      les_dyskinetic_le_chain_left: dto.lowerExtremityStructure.dyskineticLEChain?.left || 'not_tested',
      les_patellar_position_right: dto.lowerExtremityStructure.patellarPosition?.right || 'not_tested',
      les_patellar_position_left: dto.lowerExtremityStructure.patellarPosition?.left || 'not_tested',
      les_calcaneal_exostosis_right: dto.lowerExtremityStructure.calcanealExostosis?.right || 'not_tested',
      les_calcaneal_exostosis_left: dto.lowerExtremityStructure.calcanealExostosis?.left || 'not_tested',
      les_calcaneal_valgus_right: dto.lowerExtremityStructure.calcanealValgus?.right || 'not_tested',
      les_calcaneal_valgus_left: dto.lowerExtremityStructure.calcanealValgus?.left || 'not_tested',
      les_calcaneal_varus_right: dto.lowerExtremityStructure.calcanealVarus?.right || 'not_tested',
      les_calcaneal_varus_left: dto.lowerExtremityStructure.calcanealVarus?.left || 'not_tested',
      les_hallux_valgus_right: dto.lowerExtremityStructure.halluxValgus?.right || 'not_tested',
      les_hallux_valgus_left: dto.lowerExtremityStructure.halluxValgus?.left || 'not_tested',

      // Gait
      gait: dto.gait.enabled ? 'yes' : 'no',
      gait_selections: dto.gait.selections || [],
      gait_comments: dto.gait.comments || '',

      // 6 Minute Walk Test
      six_minute_walk_test: dto.sixMinuteWalkTest.enabled ? 'yes' : 'no',
      walk_rest_sp02: dto.sixMinuteWalkTest.rest?.sp02 || '',
      walk_rest_heart_rate: dto.sixMinuteWalkTest.rest?.heartRate || '',
      walk_rest_respiratory_rate: dto.sixMinuteWalkTest.rest?.respiratoryRate || '',
      walk_rest_borg_scale: dto.sixMinuteWalkTest.rest?.borgScale || '',
      walk_rest_distance: dto.sixMinuteWalkTest.rest?.distance || '',
      walk_1min_sp02: dto.sixMinuteWalkTest.min1?.sp02 || '',
      walk_1min_heart_rate: dto.sixMinuteWalkTest.min1?.heartRate || '',
      walk_1min_respiratory_rate: dto.sixMinuteWalkTest.min1?.respiratoryRate || '',
      walk_1min_borg_scale: dto.sixMinuteWalkTest.min1?.borgScale || '',
      walk_1min_distance: dto.sixMinuteWalkTest.min1?.distance || '',
      walk_2min_sp02: dto.sixMinuteWalkTest.min2?.sp02 || '',
      walk_2min_heart_rate: dto.sixMinuteWalkTest.min2?.heartRate || '',
      walk_2min_respiratory_rate: dto.sixMinuteWalkTest.min2?.respiratoryRate || '',
      walk_2min_borg_scale: dto.sixMinuteWalkTest.min2?.borgScale || '',
      walk_2min_distance: dto.sixMinuteWalkTest.min2?.distance || '',
      walk_3min_sp02: dto.sixMinuteWalkTest.min3?.sp02 || '',
      walk_3min_heart_rate: dto.sixMinuteWalkTest.min3?.heartRate || '',
      walk_3min_respiratory_rate: dto.sixMinuteWalkTest.min3?.respiratoryRate || '',
      walk_3min_borg_scale: dto.sixMinuteWalkTest.min3?.borgScale || '',
      walk_3min_distance: dto.sixMinuteWalkTest.min3?.distance || '',
      walk_4min_sp02: dto.sixMinuteWalkTest.min4?.sp02 || '',
      walk_4min_heart_rate: dto.sixMinuteWalkTest.min4?.heartRate || '',
      walk_4min_respiratory_rate: dto.sixMinuteWalkTest.min4?.respiratoryRate || '',
      walk_4min_borg_scale: dto.sixMinuteWalkTest.min4?.borgScale || '',
      walk_4min_distance: dto.sixMinuteWalkTest.min4?.distance || '',
      walk_5min_sp02: dto.sixMinuteWalkTest.min5?.sp02 || '',
      walk_5min_heart_rate: dto.sixMinuteWalkTest.min5?.heartRate || '',
      walk_5min_respiratory_rate: dto.sixMinuteWalkTest.min5?.respiratoryRate || '',
      walk_5min_borg_scale: dto.sixMinuteWalkTest.min5?.borgScale || '',
      walk_5min_distance: dto.sixMinuteWalkTest.min5?.distance || '',
      walk_6min_sp02: dto.sixMinuteWalkTest.min6?.sp02 || '',
      walk_6min_heart_rate: dto.sixMinuteWalkTest.min6?.heartRate || '',
      walk_6min_respiratory_rate: dto.sixMinuteWalkTest.min6?.respiratoryRate || '',
      walk_6min_borg_scale: dto.sixMinuteWalkTest.min6?.borgScale || '',
      walk_6min_distance: dto.sixMinuteWalkTest.min6?.distance || '',
      walk_comments: dto.sixMinuteWalkTest.comments || '',

      // Assistive Device
      assistive_device: dto.assistiveDevice.enabled ? 'yes' : 'no',
      assistive_device_type: dto.assistiveDevice.type || '2_axillary_crutches',
      assistive_device_hand: dto.assistiveDevice.handUsed || 'bilateral',
      assistive_device_comments: dto.assistiveDevice.comments || '',

      // Immobilizer
      immobilizer: dto.immobilizer.enabled ? 'yes' : 'no',
      immobilizer_type: dto.immobilizer.type || '',
      immobilizer_compliant: dto.immobilizer.compliantWithUse || 'no',

      // Muscular Asymmetries
      muscular_asymmetries: dto.muscularAsymmetries.enabled ? 'yes' : 'no',
      muscular_asymmetries_description: dto.muscularAsymmetries.description || '',

      // Muscle Guarding
      muscle_guarding: dto.muscleGuarding.enabled ? 'yes' : 'no',
      muscle_guarding_value: dto.muscleGuarding.value || 'none',

      // Muscle Atrophy
      muscle_atrophy: dto.muscleAtrophy.enabled ? 'yes' : 'no',
      muscle_atrophy_description: dto.muscleAtrophy.description || '',

      // Edema
      edema: dto.edema.enabled ? 'yes' : 'no',
      edema_description: dto.edema.description || '',
      edema_pitting: dto.edema.pitting || 'no',

      // Apprehension of Movement
      apprehension_of_movement: dto.apprehensionOfMovement.enabled ? 'yes' : 'no',
      apprehension_value: dto.apprehensionOfMovement.value || 'none',

      // Additional Comments
      additional_comments: dto.additionalComments.enabled ? 'yes' : 'no',
      additional_comments_text: dto.additionalComments.text || ''
    };
  }

  // Private mapping methods for toModel
  private mapBodyType(formValue: any): BodyTypeModel {
    const enabled = formValue.indicate_body_type === 'yes';
    const model: BodyTypeModel = { enabled };
    if (enabled) {
      model.bodyType = formValue.body_type || 'mesomorph';
    }
    return model;
  }

  private mapVitals(formValue: any): VitalsModel {
    const enabled = formValue.vitals === 'yes';
    const model: VitalsModel = { enabled };

    if (enabled) {
      model.bloodPressure = this.mapBloodPressure(formValue);
      model.temperature = this.mapTemperature(formValue);
      model.pulse = this.mapPulse(formValue);
      model.respiration = this.mapRespiration(formValue);
      model.weight = this.mapWeight(formValue);
    }

    return model;
  }

  private mapBloodPressure(formValue: any): BloodPressureModel {
    const enabled = formValue.blood_pressure === 'yes';
    const model: BloodPressureModel = { enabled };

    if (enabled) {
      model.orthostaticRisk = formValue.blood_pressure_orthostatic_risk || false;
      model.arm = formValue.blood_pressure_arm || 'right';
      model.systolic = formValue.blood_pressure_systolic || '';
      model.diastolic = formValue.blood_pressure_diastolic || '';
      model.location = formValue.blood_pressure_location || 'upper_arm';
      model.position = formValue.blood_pressure_position || 'sitting';
    }

    return model;
  }

  private mapTemperature(formValue: any): TemperatureModel {
    return {
      enabled: formValue.temperature === 'yes'
    };
  }

  private mapPulse(formValue: any): PulseModel {
    const enabled = formValue.pulse === 'yes';
    const model: PulseModel = { enabled };

    if (enabled) {
      model.value = formValue.pulse_value || '';
      model.bpmType = formValue.pulse_bpm_type || 'bpm_radial';
      model.right = formValue.pulse_right || 'not_tested';
      model.left = formValue.pulse_left || 'not_tested';
    }

    return model;
  }

  private mapRespiration(formValue: any): RespirationModel {
    const enabled = formValue.respiration === 'yes';
    const model: RespirationModel = { enabled };

    if (enabled) {
      model.selections = formValue.respiration_selections || [];
      model.comments = formValue.respiration_comments || '';
    }

    return model;
  }

  private mapWeight(formValue: any): WeightModel {
    const enabled = formValue.weight === 'yes';
    const model: WeightModel = { enabled };

    if (enabled) {
      model.value = formValue.weight_value || '';
      model.unit = formValue.weight_unit || 'lbs';
    }

    return model;
  }

  private mapADLManagement(formValue: any): ADLManagementModel {
    const enabled = formValue.adl_management === 'yes';
    const model: ADLManagementModel = { enabled };

    if (enabled) {
      model.bathing = {
        value: formValue.adl_bathing || 'no',
        status: formValue.adl_bathing === 'yes' ? formValue.adl_bathing_status : undefined
      };
      model.toileting = {
        value: formValue.adl_toileting || 'no',
        status: formValue.adl_toileting === 'yes' ? formValue.adl_toileting_status : undefined
      };
      model.dressing = {
        value: formValue.adl_dressing || 'no',
        status: formValue.adl_dressing === 'yes' ? formValue.adl_dressing_status : undefined
      };
      model.grooming = {
        value: formValue.adl_grooming || 'no',
        status: formValue.adl_grooming === 'yes' ? formValue.adl_grooming_status : undefined
      };
      model.eating = {
        value: formValue.adl_eating || 'no',
        status: formValue.adl_eating === 'yes' ? formValue.adl_eating_status : undefined
      };
    }

    return model;
  }

  private mapBreathingAtRest(formValue: any): BreathingAtRestModel {
    const enabled = formValue.breathing_at_rest === 'yes';
    const model: BreathingAtRestModel = { enabled };

    if (enabled) {
      model.apical = formValue.breathing_apical || false;
      model.diaphragmatically = formValue.breathing_diaphragmatically || false;
      model.shortenedInhalation = formValue.breathing_shortened || false;
      model.asymmetricalRibExcursion = formValue.breathing_asymmetrical || false;
      model.decreasedRibMotion = formValue.breathing_decreased || false;
      model.useOfAccessoryMuscles = formValue.breathing_accessory || false;
      model.comments = formValue.breathing_comments || '';
    }

    return model;
  }

  private mapTransfers(formValue: any): TransfersModel {
    const enabled = formValue.transfers === 'yes';
    const model: TransfersModel = { enabled };

    if (enabled) {
      model.supineToSit = {
        value: formValue.transfer_supine_to_sit || 'no',
        status: formValue.transfer_supine_to_sit === 'yes' ? formValue.transfer_supine_to_sit_status : undefined,
        comments: formValue.transfer_supine_to_sit === 'yes' ? formValue.transfer_supine_to_sit_comments || '' : undefined
      };
      model.sitToStand = {
        value: formValue.transfer_sit_to_stand || 'no',
        status: formValue.transfer_sit_to_stand === 'yes' ? formValue.transfer_sit_to_stand_status : undefined,
        comments: formValue.transfer_sit_to_stand === 'yes' ? formValue.transfer_sit_to_stand_comments || '' : undefined
      };
      model.toiletTransfers = {
        value: formValue.transfer_toilet || 'no',
        status: formValue.transfer_toilet === 'yes' ? formValue.transfer_toilet_status : undefined,
        comments: formValue.transfer_toilet === 'yes' ? formValue.transfer_toilet_comments || '' : undefined
      };
    }

    return model;
  }

  private mapCastSplint(formValue: any): CastSplintModel {
    const enabled = formValue.cast_splint === 'yes';
    const model: CastSplintModel = { enabled };

    if (enabled) {
      model.instance1 = {
        type: formValue.cast_splint_type_1 || 'cast',
        complaintsWithUse: formValue.cast_splint_complaints_1 || 'not_tested',
        dateApplied: formValue.cast_splint_date_applied_1 || '',
        dateRemoved: formValue.cast_splint_date_removed_1 || '',
        comments: formValue.cast_splint_comments_1 || ''
      };
      model.instance2 = {
        type: formValue.cast_splint_type_2 || 'not_tested',
        complaintsWithUse: formValue.cast_splint_complaints_2 || 'not_tested',
        dateApplied: formValue.cast_splint_date_applied_2 || '',
        dateRemoved: formValue.cast_splint_date_removed_2 || '',
        comments: formValue.cast_splint_comments_2 || ''
      };
    }

    return model;
  }

  private mapStandingPosture(formValue: any): StandingPostureModel {
    const enabled = formValue.standing_posture === 'yes';
    const model: StandingPostureModel = { enabled };

    if (enabled) {
      model.selections = formValue.standing_posture_selections || [];
      model.comments = formValue.standing_posture_comments || '';
    }

    return model;
  }

  private mapProtractedScapulas(formValue: any): ProtractedScapulasModel {
    const enabled = formValue.protracted_scapulas === 'yes';
    const model: ProtractedScapulasModel = { enabled };

    if (enabled) {
      model.right = formValue.protracted_scapulas_right || '1cm';
      model.left = formValue.protracted_scapulas_left || '1cm';
    }

    return model;
  }

  private mapScoliosis(formValue: any): ScoliosisModel {
    const enabled = formValue.scoliosis === 'yes';
    const model: ScoliosisModel = { enabled };

    if (enabled) {
      model.type = formValue.scoliosis_type || 'functional';
      model.curvature = formValue.scoliosis_curvature || 'right';
    }

    return model;
  }

  private mapLowerExtremityStructure(formValue: any): LowerExtremityStructureModel {
    const enabled = formValue.lower_extremity_structure === 'yes';
    const model: LowerExtremityStructureModel = { enabled };

    if (enabled) {
      model.genuValgus = this.createLowerExtremityMeasurement(
        formValue.les_genu_valgus_right, formValue.les_genu_valgus_left
      );
      model.genuVarus = this.createLowerExtremityMeasurement(
        formValue.les_genu_varus_right, formValue.les_genu_varus_left
      );
      model.tibialTorsion = this.createLowerExtremityMeasurement(
        formValue.les_tibial_torsion_right, formValue.les_tibial_torsion_left
      );
      model.genuRecurvatum = this.createLowerExtremityMeasurement(
        formValue.les_genu_recurvatum_right, formValue.les_genu_recurvatum_left
      );
      model.footPronation = this.createLowerExtremityMeasurement(
        formValue.les_foot_pronation_right, formValue.les_foot_pronation_left
      );
      model.footSupination = this.createLowerExtremityMeasurement(
        formValue.les_foot_supination_right, formValue.les_foot_supination_left
      );
      model.femoralAnteversion = this.createLowerExtremityMeasurement(
        formValue.les_femoral_anteversion_right, formValue.les_femoral_anteversion_left
      );
      model.femoralRetroversion = this.createLowerExtremityMeasurement(
        formValue.les_femoral_retroversion_right, formValue.les_femoral_retroversion_left
      );
      model.dyskineticLEChain = this.createLowerExtremityMeasurement(
        formValue.les_dyskinetic_le_chain_right, formValue.les_dyskinetic_le_chain_left
      );
      model.patellarPosition = this.createLowerExtremityMeasurement(
        formValue.les_patellar_position_right, formValue.les_patellar_position_left
      );
      model.calcanealExostosis = this.createLowerExtremityMeasurement(
        formValue.les_calcaneal_exostosis_right, formValue.les_calcaneal_exostosis_left
      );
      model.calcanealValgus = this.createLowerExtremityMeasurement(
        formValue.les_calcaneal_valgus_right, formValue.les_calcaneal_valgus_left
      );
      model.calcanealVarus = this.createLowerExtremityMeasurement(
        formValue.les_calcaneal_varus_right, formValue.les_calcaneal_varus_left
      );
      model.halluxValgus = this.createLowerExtremityMeasurement(
        formValue.les_hallux_valgus_right, formValue.les_hallux_valgus_left
      );
    }

    return model;
  }

  private mapGait(formValue: any): GaitModel {
    const enabled = formValue.gait === 'yes';
    const model: GaitModel = { enabled };

    if (enabled) {
      model.selections = formValue.gait_selections || [];
      model.comments = formValue.gait_comments || '';
    }

    return model;
  }

  private mapSixMinuteWalkTest(formValue: any): SixMinuteWalkTestModel {
    const enabled = formValue.six_minute_walk_test === 'yes';
    const model: SixMinuteWalkTestModel = { enabled };

    if (enabled) {
      model.rest = this.createWalkRow(formValue, 'rest');
      model.min1 = this.createWalkRow(formValue, '1min');
      model.min2 = this.createWalkRow(formValue, '2min');
      model.min3 = this.createWalkRow(formValue, '3min');
      model.min4 = this.createWalkRow(formValue, '4min');
      model.min5 = this.createWalkRow(formValue, '5min');
      model.min6 = this.createWalkRow(formValue, '6min');
      model.comments = formValue.walk_comments || '';
    }

    return model;
  }

  private mapAssistiveDevice(formValue: any): AssistiveDeviceModel {
    const enabled = formValue.assistive_device === 'yes';
    const model: AssistiveDeviceModel = { enabled };

    if (enabled) {
      model.type = formValue.assistive_device_type || '2_axillary_crutches';
      model.handUsed = formValue.assistive_device_hand || 'bilateral';
      model.comments = formValue.assistive_device_comments || '';
    }

    return model;
  }

  private mapImmobilizer(formValue: any): ImmobilizerModel {
    const enabled = formValue.immobilizer === 'yes';
    const model: ImmobilizerModel = { enabled };

    if (enabled) {
      model.type = formValue.immobilizer_type || '';
      model.compliantWithUse = formValue.immobilizer_compliant || 'no';
    }

    return model;
  }

  private mapMuscularAsymmetries(formValue: any): MuscularAsymmetriesModel {
    const enabled = formValue.muscular_asymmetries === 'yes';
    const model: MuscularAsymmetriesModel = { enabled };

    if (enabled) {
      model.description = formValue.muscular_asymmetries_description || '';
    }

    return model;
  }

  private mapMuscleGuarding(formValue: any): MuscleGuardingModel {
    const enabled = formValue.muscle_guarding === 'yes';
    const model: MuscleGuardingModel = { enabled };

    if (enabled) {
      model.value = formValue.muscle_guarding_value || 'none';
    }

    return model;
  }

  private mapMuscleAtrophy(formValue: any): MuscleAtrophyModel {
    const enabled = formValue.muscle_atrophy === 'yes';
    const model: MuscleAtrophyModel = { enabled };

    if (enabled) {
      model.description = formValue.muscle_atrophy_description || '';
    }

    return model;
  }

  private mapEdema(formValue: any): EdemaModel {
    const enabled = formValue.edema === 'yes';
    const model: EdemaModel = { enabled };

    if (enabled) {
      model.description = formValue.edema_description || '';
      model.pitting = formValue.edema_pitting || 'no';
    }

    return model;
  }

  private mapApprehensionOfMovement(formValue: any): ApprehensionOfMovementModel {
    const enabled = formValue.apprehension_of_movement === 'yes';
    const model: ApprehensionOfMovementModel = { enabled };

    if (enabled) {
      model.value = formValue.apprehension_value || 'none';
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

  private createLowerExtremityMeasurement(right: string, left: string): LowerExtremityMeasurementModel {
    return {
      right: right || 'not_tested',
      left: left || 'not_tested'
    };
  }

  private createWalkRow(formValue: any, prefix: string): SixMinuteWalkRowModel {
    return {
      sp02: formValue[`walk_${prefix}_sp02`] || '',
      heartRate: formValue[`walk_${prefix}_heart_rate`] || '',
      respiratoryRate: formValue[`walk_${prefix}_respiratory_rate`] || '',
      borgScale: formValue[`walk_${prefix}_borg_scale`] || '',
      distance: formValue[`walk_${prefix}_distance`] || ''
    };
  }
}
