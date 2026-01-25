import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PlanOfCare } from '../model/PlanOfCare';
import { Procedures } from '../model/Procedures';
import { Modalities } from '../model/Modalities';
import { Specialties } from '../model/Specialties';

@Injectable({
  providedIn: 'root'
})
export class PlanOfCareMapperService {

  constructor() { }

  /**
   * Converts form values to PlanOfCare model (for sending to backend)
   * @param formValue FormGroup with camelCase top-level fields and snake_case child fields
   * @returns PlanOfCare model with camelCase fields
   */
  toModel(formValue: FormGroup): PlanOfCare {
    return {
      createPlanOfCare: formValue.get('create_plan_of_care')?.value,
      frequency: formValue.get('frequency')?.value || '',
      duration: formValue.get('duration')?.value || '',
      plan: formValue.get('plan')?.value || '',
      physicianSignature: formValue.get('physician_signature')?.value,
      procedures: this.mapProceduresToModel(formValue.get('procedures') as FormGroup),
      modalities: this.mapModalitiesToModel(formValue.get('modalities') as FormGroup),
      specialties: this.mapSpecialtiesToModel(formValue.get('specialties') as FormGroup)
    };
  }

  /**
   * Converts PlanOfCare model to form values (for patching the form)
   * @param dto PlanOfCare model with camelCase fields
   * @returns Form values object with snake_case fields matching form control names
   */
  fromDto(dto: PlanOfCare): any {
    return {
      create_plan_of_care: dto.createPlanOfCare,
      frequency: dto.frequency || '',
      duration: dto.duration || '',
      plan: dto.plan || '',
      physician_signature: dto.physicianSignature,
      ...this.mapProceduresFromDto(dto.procedures),
      ...this.mapModalitiesFromDto(dto.modalities),
      ...this.mapSpecialtiesFromDto(dto.specialties)
    };
  }

  /**
   * Maps procedure fields from backend DTO to Procedures model
   */
  private mapProceduresToModel(formValue: FormGroup): Procedures {
    if (!formValue) {
      return {} as Procedures;
    }
    return {
      procedureTherapeuticExercises: formValue.get('procedure_therapeutic_exercises')?.value || false,
      procedureTherapeuticExercisesNotes: formValue.get('procedure_therapeutic_exercises_notes')?.value || '',
      procedureRom: formValue.get('procedure_rom')?.value || false,
      procedureStrength: formValue.get('procedure_strength')?.value || false,
      procedureEndurance: formValue.get('procedure_endurance')?.value || false,
      procedureStability: formValue.get('procedure_stability')?.value || false,
      procedureTherapeuticActivity: formValue.get('procedure_therapeutic_activity')?.value || false,
      procedureTherapeuticActivityNotes: formValue.get('procedure_therapeutic_activity_notes')?.value || '',
      procedureWorkSpecific: formValue.get('procedure_work_specific')?.value || false,
      procedureSportSpecific: formValue.get('procedure_sport_specific')?.value || false,
      procedureTransfers: formValue.get('procedure_transfers')?.value || false,
      procedureBedMobility: formValue.get('procedure_bed_mobility')?.value || false,
      procedureAdlSpecific: formValue.get('procedure_adl_specific')?.value || false,
      procedureGaitTraining: formValue.get('procedure_gait_training')?.value || false,
      procedureGaitTrainingNotes: formValue.get('procedure_gait_training_notes')?.value || '',
      // Gait Training children
      procedure4PointWalker: formValue.get('procedure_4_point_walker')?.value || false,
      procedureFrontWheelWalker: formValue.get('procedure_front_wheel_walker')?.value || false,
      procedure4WheelWalker: formValue.get('procedure_4_wheel_walker')?.value || false,
      procedureHemiWalker: formValue.get('procedure_hemi_walker')?.value || false,
      procedureQuadCane: formValue.get('procedure_quad_cane')?.value || false,
      procedure1PointCane: formValue.get('procedure_1_point_cane')?.value || false,
      procedure2AxillaryCrutches: formValue.get('procedure_2_axillary_crutches')?.value || false,
      procedure1AxillaryCrutch: formValue.get('procedure_1_axillary_crutch')?.value || false,
      procedure2ForearmCrutches: formValue.get('procedure_2_forearm_crutches')?.value || false,
      procedure1ForearmCrutches: formValue.get('procedure_1_forearm_crutches')?.value || false,
      procedureEvenSurfaces: formValue.get('procedure_even_surfaces')?.value || false,
      procedureUnevenSurfaces: formValue.get('procedure_uneven_surfaces')?.value || false,
      procedureStairs: formValue.get('procedure_stairs')?.value || false,
      procedureCurbs: formValue.get('procedure_curbs')?.value || false,
      procedureNeuromuscularRehabilitation: formValue.get('procedure_neuromuscular_rehabilitation')?.value || false,
      procedureNeuromuscularRehabilitationNotes: formValue.get('procedure_neuromuscular_rehabilitation_notes')?.value || '',
      // Neuromuscular Rehabilitation children
      procedureBalanceProprioceptionTraining: formValue.get('procedure_balance_proprioception_training')?.value || false,
      procedureMuscleReEducation: formValue.get('procedure_muscle_re_education')?.value || false,
      procedureSequencing: formValue.get('procedure_sequencing')?.value || false,
      procedureCoordination: formValue.get('procedure_coordination')?.value || false,
      procedurePnf: formValue.get('procedure_pnf')?.value || false,
      procedureRedcordNeurac: formValue.get('procedure_redcord_neurac_neuromuscular_activation')?.value || false,
      procedureManualTherapy: formValue.get('procedure_manual_therapy')?.value || false,
      procedureManualTherapyNotes: formValue.get('procedure_manual_therapy_notes')?.value || '',
      // Manual Therapy children
      procedureSoftTissueMobilization: formValue.get('procedure_soft_tissue_mobilization')?.value || false,
      procedureJointMobilization: formValue.get('procedure_joint_mobilization')?.value || false,
      procedureSpinalMobilization: formValue.get('procedure_spinal_mobilization')?.value || false,
      procedureManualTraction: formValue.get('procedure_manual_traction')?.value || false,
      procedureMyofascialRelease: formValue.get('procedure_myofascial_release')?.value || false,
      procedureMuscleEnergyTechniques: formValue.get('procedure_muscle_energy_techniques')?.value || false,
      procedureManualResistiveExercise: formValue.get('procedure_manual_resistive_exercise')?.value || false,
      procedurePatellarMobs: formValue.get('procedure_patellar_mobs')?.value || false,
      procedureCranioSacral: formValue.get('procedure_cranio_sacral')?.value || false,
      procedureVisceralManipulation: formValue.get('procedure_visceral_manipulation')?.value || false,
      procedureDryNeedling: formValue.get('procedure_dry_needling_intramuscular_manual_therapy')?.value || false,
      procedureGrastonOrAstym: formValue.get('procedure_graston_or_astym_techniques')?.value || false,
      procedureStrainCounterstrain: formValue.get('procedure_strain_counterstrain')?.value || false,
      procedureMassage: formValue.get('procedure_massage')?.value || false,
      procedureMassageNotes: formValue.get('procedure_massage_notes')?.value || '',
      // Massage children
      procedureMassageType: formValue.get('procedure_massage_type')?.value || '',
      procedureManualLymphaticDrainage: formValue.get('procedure_manual_lymphatic_drainage')?.value || false,
      procedureAquaticTherapy: formValue.get('procedure_aquatic_therapy')?.value || false,
      procedureAquaticTherapyNotes: formValue.get('procedure_aquatic_therapy_notes')?.value || '',
      procedureSplintingTaping: formValue.get('procedure_splinting_taping')?.value || false,
      procedureSplintingTapingNotes: formValue.get('procedure_splinting_taping_notes')?.value || '',
      // Splinting/Taping children
      procedureTapingMethod: formValue.get('procedure_taping_method')?.value || '',
      procedureCanalithRepositioning: formValue.get('procedure_canalith_repositioning')?.value || false,
      procedureCanalithRepositioningNotes: formValue.get('procedure_canalith_repositioning_notes')?.value || '',
      procedureWoundCareDebridement: formValue.get('procedure_wound_care_debridement')?.value || false,
      procedureWoundCareDebridementNotes: formValue.get('procedure_wound_care_debridement_notes')?.value || '',
      procedureIontophoresis: formValue.get('procedure_iontophoresis')?.value || false,
      procedureIontophoresisNotes: formValue.get('procedure_iontophoresis_notes')?.value || '',
      // Iontophoresis children
      procedureDexamethasone: formValue.get('procedure_dexamethasone')?.value || false,
      procedureLidocaine: formValue.get('procedure_lidocaine')?.value || false,
      procedureMarcaine: formValue.get('procedure_marcaine')?.value || false,
      procedureAceticAcid: formValue.get('procedure_acetic_acid')?.value || false,
      procedureIodine: formValue.get('procedure_iodine')?.value || false,
      procedureGroupTherapy: formValue.get('procedure_group_therapy')?.value || false,
      procedureGroupTherapyNotes: formValue.get('procedure_group_therapy_notes')?.value || '',
      procedureLymphedema: formValue.get('procedure_lymphedema')?.value || false,
      procedureLymphedemaNotes: formValue.get('procedure_lymphedema_notes')?.value || '',
      procedureCardiacRehabilitation: formValue.get('procedure_cardiac_rehabilitation')?.value || false,
      procedureCardiacRehabilitationNotes: formValue.get('procedure_cardiac_rehabilitation_notes')?.value || '',
      procedureVestibularRehabilitation: formValue.get('procedure_vestibular_rehabilitation')?.value || false,
      procedureVestibularRehabilitationNotes: formValue.get('procedure_vestibular_rehabilitation_notes')?.value || '',
      procedurePatientEducation: formValue.get('procedure_patient_education')?.value || false,
      procedurePatientEducationNotes: formValue.get('procedure_patient_education_notes')?.value || '',
      // Patient Education children
      procedureHomeExerciseProgram: formValue.get('procedure_home_exercise_program')?.value || false,
      procedurePosturalTraining: formValue.get('procedure_postural_training')?.value || false,
      procedureErgonomics: formValue.get('procedure_ergonomics')?.value || false,
      procedureLiftingMechanics: formValue.get('procedure_lifting_mechanics')?.value || false,
      procedureTensUse: formValue.get('procedure_tens_use')?.value || false,
      procedureActivityModification: formValue.get('procedure_activity_modification')?.value || false,
      procedureHomeSafety: formValue.get('procedure_home_safety')?.value || false,
      procedureSelfCare: formValue.get('procedure_self_care')?.value || false,
      procedureSelfCareNotes: formValue.get('procedure_self_care_notes')?.value || '',
      procedureCognition: formValue.get('procedure_cognition')?.value || false,
      procedureCognitionNotes: formValue.get('procedure_cognition_notes')?.value || '',
      procedureRemoteTherapeuticMonitoring: formValue.get('procedure_remote_therapeutic_monitoring')?.value || false,
      procedureRemoteTherapeuticMonitoringNotes: formValue.get('procedure_remote_therapeutic_monitoring_notes')?.value || ''
    };
  }

  /**
   * Maps Procedures model to backend DTO fields
   */
  private mapProceduresFromDto(procedures: Procedures): any {
    if (!procedures) {
      return {};
    }

    return {
      procedure_therapeutic_exercises: procedures.procedureTherapeuticExercises || false,
      procedure_therapeutic_exercises_notes: procedures.procedureTherapeuticExercisesNotes || '',
      procedure_rom: procedures.procedureRom || false,
      procedure_strength: procedures.procedureStrength || false,
      procedure_endurance: procedures.procedureEndurance || false,
      procedure_stability: procedures.procedureStability || false,
      procedure_therapeutic_activity: procedures.procedureTherapeuticActivity || false,
      procedure_therapeutic_activity_notes: procedures.procedureTherapeuticActivityNotes || '',
      procedure_work_specific: procedures.procedureWorkSpecific || false,
      procedure_sport_specific: procedures.procedureSportSpecific || false,
      procedure_transfers: procedures.procedureTransfers || false,
      procedure_bed_mobility: procedures.procedureBedMobility || false,
      procedure_adl_specific: procedures.procedureAdlSpecific || false,
      procedure_gait_training: procedures.procedureGaitTraining || false,
      procedure_gait_training_notes: procedures.procedureGaitTrainingNotes || '',
      procedure_4_point_walker: procedures.procedure4PointWalker || false,
      procedure_front_wheel_walker: procedures.procedureFrontWheelWalker || false,
      procedure_4_wheel_walker: procedures.procedure4WheelWalker || false,
      procedure_hemi_walker: procedures.procedureHemiWalker || false,
      procedure_quad_cane: procedures.procedureQuadCane || false,
      procedure_1_point_cane: procedures.procedure1PointCane || false,
      procedure_2_axillary_crutches: procedures.procedure2AxillaryCrutches || false,
      procedure_1_axillary_crutch: procedures.procedure1AxillaryCrutch || false,
      procedure_2_forearm_crutches: procedures.procedure2ForearmCrutches || false,
      procedure_1_forearm_crutches: procedures.procedure1ForearmCrutches || false,
      procedure_even_surfaces: procedures.procedureEvenSurfaces || false,
      procedure_uneven_surfaces: procedures.procedureUnevenSurfaces || false,
      procedure_stairs: procedures.procedureStairs || false,
      procedure_curbs: procedures.procedureCurbs || false,
      procedure_neuromuscular_rehabilitation: procedures.procedureNeuromuscularRehabilitation || false,
      procedure_neuromuscular_rehabilitation_notes: procedures.procedureNeuromuscularRehabilitationNotes || '',
      procedure_balance_proprioception_training: procedures.procedureBalanceProprioceptionTraining || false,
      procedure_muscle_re_education: procedures.procedureMuscleReEducation || false,
      procedure_sequencing: procedures.procedureSequencing || false,
      procedure_coordination: procedures.procedureCoordination || false,
      procedure_pnf: procedures.procedurePnf || false,
      procedure_redcord_neurac_neuromuscular_activation: procedures.procedureRedcordNeurac || false,
      procedure_manual_therapy: procedures.procedureManualTherapy || false,
      procedure_manual_therapy_notes: procedures.procedureManualTherapyNotes || '',
      procedure_soft_tissue_mobilization: procedures.procedureSoftTissueMobilization || false,
      procedure_joint_mobilization: procedures.procedureJointMobilization || false,
      procedure_spinal_mobilization: procedures.procedureSpinalMobilization || false,
      procedure_manual_traction: procedures.procedureManualTraction || false,
      procedure_myofascial_release: procedures.procedureMyofascialRelease || false,
      procedure_muscle_energy_techniques: procedures.procedureMuscleEnergyTechniques || false,
      procedure_manual_resistive_exercise: procedures.procedureManualResistiveExercise || false,
      procedure_patellar_mobs: procedures.procedurePatellarMobs || false,
      procedure_cranio_sacral: procedures.procedureCranioSacral || false,
      procedure_visceral_manipulation: procedures.procedureVisceralManipulation || false,
      procedure_dry_needling_intramuscular_manual_therapy: procedures.procedureDryNeedling || false,
      procedure_graston_or_astym_techniques: procedures.procedureGrastonOrAstym || false,
      procedure_strain_counterstrain: procedures.procedureStrainCounterstrain || false,
      procedure_massage: procedures.procedureMassage || false,
      procedure_massage_notes: procedures.procedureMassageNotes || '',
      procedure_massage_type: procedures.procedureMassageType || '',
      procedure_manual_lymphatic_drainage: procedures.procedureManualLymphaticDrainage || false,
      procedure_aquatic_therapy: procedures.procedureAquaticTherapy || false,
      procedure_aquatic_therapy_notes: procedures.procedureAquaticTherapyNotes || '',
      procedure_splinting_taping: procedures.procedureSplintingTaping || false,
      procedure_splinting_taping_notes: procedures.procedureSplintingTapingNotes || '',
      procedure_taping_method: procedures.procedureTapingMethod || '',
      procedure_canalith_repositioning: procedures.procedureCanalithRepositioning || false,
      procedure_canalith_repositioning_notes: procedures.procedureCanalithRepositioningNotes || '',
      procedure_wound_care_debridement: procedures.procedureWoundCareDebridement || false,
      procedure_wound_care_debridement_notes: procedures.procedureWoundCareDebridementNotes || '',
      procedure_iontophoresis: procedures.procedureIontophoresis || false,
      procedure_iontophoresis_notes: procedures.procedureIontophoresisNotes || '',
      procedure_dexamethasone: procedures.procedureDexamethasone || false,
      procedure_lidocaine: procedures.procedureLidocaine || false,
      procedure_marcaine: procedures.procedureMarcaine || false,
      procedure_acetic_acid: procedures.procedureAceticAcid || false,
      procedure_iodine: procedures.procedureIodine || false,
      procedure_group_therapy: procedures.procedureGroupTherapy || false,
      procedure_group_therapy_notes: procedures.procedureGroupTherapyNotes || '',
      procedure_lymphedema: procedures.procedureLymphedema || false,
      procedure_lymphedema_notes: procedures.procedureLymphedemaNotes || '',
      procedure_cardiac_rehabilitation: procedures.procedureCardiacRehabilitation || false,
      procedure_cardiac_rehabilitation_notes: procedures.procedureCardiacRehabilitationNotes || '',
      procedure_vestibular_rehabilitation: procedures.procedureVestibularRehabilitation || false,
      procedure_vestibular_rehabilitation_notes: procedures.procedureVestibularRehabilitationNotes || '',
      procedure_patient_education: procedures.procedurePatientEducation || false,
      procedure_patient_education_notes: procedures.procedurePatientEducationNotes || '',
      procedure_home_exercise_program: procedures.procedureHomeExerciseProgram || false,
      procedure_postural_training: procedures.procedurePosturalTraining || false,
      procedure_ergonomics: procedures.procedureErgonomics || false,
      procedure_lifting_mechanics: procedures.procedureLiftingMechanics || false,
      procedure_tens_use: procedures.procedureTensUse || false,
      procedure_activity_modification: procedures.procedureActivityModification || false,
      procedure_home_safety: procedures.procedureHomeSafety || false,
      procedure_self_care: procedures.procedureSelfCare || false,
      procedure_self_care_notes: procedures.procedureSelfCareNotes || '',
      procedure_cognition: procedures.procedureCognition || false,
      procedure_cognition_notes: procedures.procedureCognitionNotes || '',
      procedure_remote_therapeutic_monitoring: procedures.procedureRemoteTherapeuticMonitoring || false,
      procedure_remote_therapeutic_monitoring_notes: procedures.procedureRemoteTherapeuticMonitoringNotes || ''
    };
  }

  /**
   * Maps modality fields from backend DTO to Modalities model
   */
  private mapModalitiesToModel(formValue: FormGroup): Modalities {
    if (!formValue) {
      return {} as Modalities;
    }
    return {
      modalitiesPainRelief: formValue.get('modalities_pain_relief')?.value || false,
      modalitiesPainReliefNotes: formValue.get('modalities_pain_relief_notes')?.value || '',
      modalitiesDecreaseInflammation: formValue.get('modalities_decrease_inflammation')?.value || false,
      modalitiesDecreaseInflammationNotes: formValue.get('modalities_decrease_inflammation_notes')?.value || '',
      modalitiesIncreaseBloodFlow: formValue.get('modalities_increase_blood_flow')?.value || false,
      modalitiesIncreaseBloodFlowNotes: formValue.get('modalities_increase_blood_flow_notes')?.value || '',
      modalitiesImproveTissueHealing: formValue.get('modalities_improve_tissue_healing')?.value || false,
      modalitiesImproveTissueHealingNotes: formValue.get('modalities_improve_tissue_healing_notes')?.value || '',
      modalitiesElectricalStimulation: formValue.get('modalities_electrical_stimulation')?.value || false,
      modalitiesElectricalStimulationNotes: formValue.get('modalities_electrical_stimulation_notes')?.value || '',
      // Electrical Stimulation children
      modalitiesPreModulated: formValue.get('modalities_pre_modulated')?.value || false,
      modalitiesHighVolt: formValue.get('modalities_high_volt')?.value || false,
      modalitiesInterferential: formValue.get('modalities_interferential')?.value || false,
      modalitiesRussian: formValue.get('modalities_russian')?.value || false,
      modalitiesOther: formValue.get('modalities_other')?.value || false,
      modalitiesUltrasoundPhonophoresis: formValue.get('modalities_ultrasound_phonophoresis')?.value || false,
      modalitiesUltrasoundPhonophoresisNotes: formValue.get('modalities_ultrasound_phonophoresis_notes')?.value || '',
      // Ultrasound/Phonophoresis children
      modalities1mhz: formValue.get('procedure_1mhz')?.value || false,
      modalities2mhz: formValue.get('procedure_2mhz')?.value || false,
      modalities3mhz: formValue.get('procedure_3mhz')?.value || false,
      modalitiesIntensity: formValue.get('modalities_intensity')?.value || '',
      modalitiesDutyCycle: formValue.get('modalities_duty_cycle')?.value || '',
      modalitiesDuration: formValue.get('modalities_duration')?.value || '',
      modalitiesLaser: formValue.get('modalities_laser')?.value || false,
      modalitiesLaserNotes: formValue.get('modalities_laser_notes')?.value || '',
      // Laser children
      modalitiesColdLaser: formValue.get('modalities_cold_laser')?.value || false,
      modalitiesColdLaserDuration: formValue.get('modalities_cold_laser_duration')?.value || '',
      modalitiesClass4Laser: formValue.get('modalities_class_4_laser')?.value || false,
      modalitiesClass4Laserduration: formValue.get('modalities_class_4_laser_duration')?.value || '',
      modalitiesInfraredLight: formValue.get('modalities_infrared_light')?.value || false,
      modalitiesInfraredLightNotes: formValue.get('modalities_infrared_light_notes')?.value || '',
      // Infrared Light children
      modalitiesInfraredLightDuration: formValue.get('modalities_lnfrared_light_duration')?.value || '',
      modalitiesDiathermy: formValue.get('modalities_diathermy')?.value || false,
      modalitiesDiathermyNotes: formValue.get('modalities_diathermy_notes')?.value || '',
      // Diathermy children
      modalitiesDiathermyLightDuration: formValue.get('modalities_diathermy_light_duration')?.value || '',
      modalitiesUltraviolet: formValue.get('modalities_ultraviolet')?.value || false,
      modalitiesUltravioletNotes: formValue.get('modalities_ultraviolet_notes')?.value || '',
      // Ultraviolet children
      modalitiesUltravioletLightDuration: formValue.get('modalities_ultraviolet_light_duration')?.value || '',
      modalitiesVasopneumatic: formValue.get('modalities_vasopneumatic')?.value || false,
      modalitiesVasopneumaticNotes: formValue.get('modalities_vasopneumatic_notes')?.value || '',
      // Vasopneumatic children
      modalitiesVasopneumaticLightDuration: formValue.get('modalities_vasopneumatic_light_duration')?.value || '',
      modalitiesBiofeedbackTraining: formValue.get('modalities_biofeedback_training')?.value || false,
      modalitiesBiofeedbackTrainingNotes: formValue.get('modalities_biofeedback_training_notes')?.value || '',
      // Biofeedback Training children
      modalitiesBiofeedbackTrainingLightDuration: formValue.get('modalities_biofeedback_training_light_duration')?.value || '',
      modalitiesWhirlpool: formValue.get('modalities_whirlpool')?.value || false,
      modalitiesWhirlpoolNotes: formValue.get('modalities_whirlpool_notes')?.value || '',
      // Whirlpool children
      modalitiesWhirlpoolWarm: formValue.get('modalities_whirlpool_warm')?.value || false,
      modalitiesWhirlpoolCold: formValue.get('modalities_whirlpool_cold')?.value || false,
      modalitiesWhirlpoolDuration: formValue.get('modalities_whirlpool_duration')?.value || '',
      modalitiesParaffinBath: formValue.get('modalities_paraffin_bath')?.value || false,
      modalitiesParaffinBathNotes: formValue.get('modalities_paraffin_bath_notes')?.value || '',
      // Paraffin Bath children
      modalitiesParaffinBathDuration: formValue.get('modalities_paraffin_bath_duration')?.value || '',
      modalitiesCryotherapy: formValue.get('modalities_cryotherapy')?.value || false,
      modalitiesCryotherapyNotes: formValue.get('modalities_cryotherapy_notes')?.value || '',
      // Cryotherapy children
      modalitiesCryotherapyIcePack: formValue.get('modalities_cryotherapy_ice_pack')?.value || false,
      modalitiesCryotherapyIceMassage: formValue.get('modalities_cryotherapy_ice_massage')?.value || false,
      modalitiesCryotherapyDuration: formValue.get('modalities_cryotherapy_duration')?.value || '',
      modalitiesHotPacks: formValue.get('modalities_hot_packs')?.value || false,
      modalitiesHotPacksNotes: formValue.get('modalities_hot_packs_notes')?.value || '',
      // Hot Packs children
      modalitiesHotPacksDuration: formValue.get('modalities_hot_packs_duration')?.value || '',
      modalitiesMechanicalTraction: formValue.get('modalities_mechanical_traction')?.value || false,
      modalitiesMechanicalTractionNotes: formValue.get('modalities_mechanical_traction_notes')?.value || '',
      // Mechanical Traction children
      modalitiesMechanicalCervical: formValue.get('modalities_mechanical_cervical')?.value || false,
      modalitiesMechanicalLumbar: formValue.get('modalities_mechanical_lumbar')?.value || false
    };
  }

  /**
   * Maps Modalities model to backend DTO fields
   */
  private mapModalitiesFromDto(modalities: Modalities): any {
    if (!modalities) {
      return {};
    }
    console.log('modalities.modalitiesColdLaser ', modalities.modalitiesColdLaser)
    return {
      modalities_pain_relief: modalities.modalitiesPainRelief || false,
      modalities_pain_relief_notes: modalities.modalitiesPainReliefNotes || '',
      modalities_decrease_inflammation: modalities.modalitiesDecreaseInflammation || false,
      modalities_decrease_inflammation_notes: modalities.modalitiesDecreaseInflammationNotes || '',
      modalities_increase_blood_flow: modalities.modalitiesIncreaseBloodFlow || false,
      modalities_increase_blood_flow_notes: modalities.modalitiesIncreaseBloodFlowNotes || '',
      modalities_improve_tissue_healing: modalities.modalitiesImproveTissueHealing || false,
      modalities_improve_tissue_healing_notes: modalities.modalitiesImproveTissueHealingNotes || '',
      modalities_electrical_stimulation: modalities.modalitiesElectricalStimulation || false,
      modalities_electrical_stimulation_notes: modalities.modalitiesElectricalStimulationNotes || '',
      modalities_pre_modulated: modalities.modalitiesPreModulated || false,
      modalities_high_volt: modalities.modalitiesHighVolt || false,
      modalities_interferential: modalities.modalitiesInterferential || false,
      modalities_russian: modalities.modalitiesRussian || false,
      modalities_other: modalities.modalitiesOther || false,
      modalities_ultrasound_phonophoresis: modalities.modalitiesUltrasoundPhonophoresis || false,
      modalities_ultrasound_phonophoresis_notes: modalities.modalitiesUltrasoundPhonophoresisNotes || '',
      procedure_1mhz: modalities.modalities1mhz || false,
      procedure_2mhz: modalities.modalities2mhz || false,
      procedure_3mhz: modalities.modalities3mhz || false,
      modalities_intensity: modalities.modalitiesIntensity || '',
      modalities_duty_cycle: modalities.modalitiesDutyCycle || '',
      modalities_duration: modalities.modalitiesDuration || '',
      modalities_laser: modalities.modalitiesLaser || false,
      modalities_laser_notes: modalities.modalitiesLaserNotes || '',
      modalities_cold_laser: modalities.modalitiesColdLaser || false,
      modalities_cold_laser_duration: modalities.modalitiesColdLaserDuration || '',
      modalities_class_4_laser: modalities.modalitiesClass4Laser || false,
      modalities_class_4_laser_duration: modalities.modalitiesClass4Laserduration || '',
      modalities_infrared_light: modalities.modalitiesInfraredLight || false,
      modalities_infrared_light_notes: modalities.modalitiesInfraredLightNotes || '',
      modalities_lnfrared_light_duration: modalities.modalitiesInfraredLightDuration || '',
      modalities_diathermy: modalities.modalitiesDiathermy || false,
      modalities_diathermy_notes: modalities.modalitiesDiathermyNotes || '',
      modalities_diathermy_light_duration: modalities.modalitiesDiathermyLightDuration || '',
      modalities_ultraviolet: modalities.modalitiesUltraviolet || false,
      modalities_ultraviolet_notes: modalities.modalitiesUltravioletNotes || '',
      modalities_ultraviolet_light_duration: modalities.modalitiesUltravioletLightDuration || '',
      modalities_vasopneumatic: modalities.modalitiesVasopneumatic || false,
      modalities_vasopneumatic_notes: modalities.modalitiesVasopneumaticNotes || '',
      modalities_vasopneumatic_light_duration: modalities.modalitiesVasopneumaticLightDuration || '',
      modalities_biofeedback_training: modalities.modalitiesBiofeedbackTraining || false,
      modalities_biofeedback_training_notes: modalities.modalitiesBiofeedbackTrainingNotes || '',
      modalities_biofeedback_training_light_duration: modalities.modalitiesBiofeedbackTrainingLightDuration || '',
      modalities_whirlpool: modalities.modalitiesWhirlpool || false,
      modalities_whirlpool_notes: modalities.modalitiesWhirlpoolNotes || '',
      modalities_whirlpool_warm: modalities.modalitiesWhirlpoolWarm || false,
      modalities_whirlpool_cold: modalities.modalitiesWhirlpoolCold || false,
      modalities_whirlpool_duration: modalities.modalitiesWhirlpoolDuration || '',
      modalities_paraffin_bath: modalities.modalitiesParaffinBath || false,
      modalities_paraffin_bath_notes: modalities.modalitiesParaffinBathNotes || '',
      modalities_paraffin_bath_duration: modalities.modalitiesParaffinBathDuration || '',
      modalities_cryotherapy: modalities.modalitiesCryotherapy || false,
      modalities_cryotherapy_notes: modalities.modalitiesCryotherapyNotes || '',
      modalities_cryotherapy_ice_pack: modalities.modalitiesCryotherapyIcePack || false,
      modalities_cryotherapy_ice_massage: modalities.modalitiesCryotherapyIceMassage || false,
      modalities_cryotherapy_duration: modalities.modalitiesCryotherapyDuration || '',
      modalities_hot_packs: modalities.modalitiesHotPacks || false,
      modalities_hot_packs_notes: modalities.modalitiesHotPacksNotes || '',
      modalities_hot_packs_duration: modalities.modalitiesHotPacksDuration || '',
      modalities_mechanical_traction: modalities.modalitiesMechanicalTraction || false,
      modalities_mechanical_traction_notes: modalities.modalitiesMechanicalTractionNotes || '',
      modalities_mechanical_cervical: modalities.modalitiesMechanicalCervical || false,
      modalities_mechanical_lumbar: modalities.modalitiesMechanicalLumbar || false
    };
  }

  /**
   * Maps specialty fields from backend DTO to Specialties model
   */
  private mapSpecialtiesToModel(formValue: FormGroup): Specialties {
    if (!formValue) {
      return {} as Specialties;
    }
    return {
      modalitiesOrthoticFabrication: formValue.get('modalities_orthotic_fabrication')?.value || false,
      modalitiesOrthoticFabricationNotes: formValue.get('modalities_orthotic_fabrication_notes')?.value || '',
      modalitiesTensFitting: formValue.get('modalities_tens_fitting')?.value || false,
      modalitiesTensFittingNotes: formValue.get('modalities_tens_fitting_notes')?.value || '',
      modalitiesAcupuncture: formValue.get('modalities_acupuncture')?.value || false,
      modalitiesAcupunctureNotes: formValue.get('modalities_acupuncture_notes')?.value || '',
      modalitiesOther: formValue.get('modalities_other')?.value || false,
      modalitiesOtherNotes: formValue.get('modalities_other_notes')?.value || ''
    };
  }

  /**
   * Maps Specialties model to backend DTO fields
   */
  private mapSpecialtiesFromDto(specialties: Specialties): any {
    if (!specialties) {
      return {};
    }

    return {
      modalities_orthotic_fabrication: specialties.modalitiesOrthoticFabrication || false,
      modalities_orthotic_fabrication_notes: specialties.modalitiesOrthoticFabricationNotes || '',
      modalities_tens_fitting: specialties.modalitiesTensFitting || false,
      modalities_tens_fitting_notes: specialties.modalitiesTensFittingNotes || '',
      modalities_acupuncture: specialties.modalitiesAcupuncture || false,
      modalities_acupuncture_notes: specialties.modalitiesAcupunctureNotes || '',
      modalities_other: specialties.modalitiesOther || false,
      modalities_other_notes: specialties.modalitiesOtherNotes || ''
    };
  }
}
