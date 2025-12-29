import { Injectable } from '@angular/core';
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
   * Converts form values (DTO from backend) to PlanOfCare model
   * @param formValue Form values object with snake_case fields
   * @returns PlanOfCare model with camelCase fields
   */
  toModel(formValue: any): PlanOfCare {
    return {
      createPlanOfCare: formValue.createPlanOfCare || false,
      frequency: formValue.frequency || '',
      duration: formValue.duration || '',
      plan: formValue.plan || '',
      physicianSignature: formValue.physicianSignature || false,
      procedures: this.mapProceduresToModel(formValue),
      modalities: this.mapModalitiesToModel(formValue),
      specialties: this.mapSpecialtiesToModel(formValue)
    };
  }

  /**
   * Converts PlanOfCare model to form values (DTO for backend)
   * @param dto PlanOfCare model with camelCase fields
   * @returns Form values object with snake_case fields
   */
  fromDto(dto: PlanOfCare): any {
    return {
      createPlanOfCare: dto.createPlanOfCare || false,
      frequency: dto.frequency || '',
      duration: dto.duration || '',
      plan: dto.plan || '',
      physicianSignature: dto.physicianSignature || false,
      ...this.mapProceduresFromDto(dto.procedures),
      ...this.mapModalitiesFromDto(dto.modalities),
      ...this.mapSpecialtiesFromDto(dto.specialties)
    };
  }

  /**
   * Maps procedure fields from backend DTO to Procedures model
   */
  private mapProceduresToModel(formValue: any): Procedures {
    return {
      procedureTherapeuticExercises: formValue.procedure_therapeutic_exercises || false,
      procedureTherapeuticExercisesNotes: formValue.procedure_therapeutic_exercises_notes || '',
      procedureRom: formValue.procedure_rom || false,
      procedureStrength: formValue.procedure_strength || false,
      procedureEndurance: formValue.procedure_endurance || false,
      procedureStability: formValue.procedure_stability || false,
      procedureTherapeuticActivity: formValue.procedure_therapeutic_activity || false,
      procedureTherapeuticActivityNotes: formValue.procedure_therapeutic_activity_notes || '',
      procedureWorkSpecific: formValue.procedure_work_specific || false,
      procedureSportSpecific: formValue.procedure_sport_specific || false,
      procedureTransfers: formValue.procedure_transfers || false,
      procedureBedMobility: formValue.procedure_bed_mobility || false,
      procedureAdlSpecific: formValue.procedure_adl_specific || false,
      procedureGaitTraining: formValue.procedure_gait_training || false,
      procedureGaitTrainingNotes: formValue.procedure_gait_training_notes || '',
      procedureNeuromuscularRehabilitation: formValue.procedure_neuromuscular_rehabilitation || false,
      procedureNeuromuscularRehabilitationNotes: formValue.procedure_neuromuscular_rehabilitation_notes || '',
      procedureManualTherapy: formValue.procedure_manual_therapy || false,
      procedureManualTherapyNotes: formValue.procedure_manual_therapy_notes || '',
      procedureMassage: formValue.procedure_massage || false,
      procedureMassageNotes: formValue.procedure_massage_notes || '',
      procedureAquaticTherapy: formValue.procedure_aquatic_therapy || false,
      procedureAquaticTherapyNotes: formValue.procedure_aquatic_therapy_notes || '',
      procedureSplintingTaping: formValue.procedure_splinting_taping || false,
      procedureSplintingTapingNotes: formValue.procedure_splinting_taping_notes || '',
      procedureCanalithRepositioning: formValue.procedure_canalith_repositioning || false,
      procedureCanalithRepositioningNotes: formValue.procedure_canalith_repositioning_notes || '',
      procedureGroupTherapy: formValue.procedure_group_therapy || false,
      procedureGroupTherapyNotes: formValue.procedure_group_therapy_notes || '',
      procedurePatientEducation: formValue.procedure_patient_education || false,
      procedurePatientEducationNotes: formValue.procedure_patient_education_notes || '',
      procedureRemoteTherapeuticMonitoring: formValue.procedure_remote_therapeutic_monitoring || false,
      procedureRemoteTherapeuticMonitoringNotes: formValue.procedure_remote_therapeutic_monitoring_notes || ''
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
      procedure_neuromuscular_rehabilitation: procedures.procedureNeuromuscularRehabilitation || false,
      procedure_neuromuscular_rehabilitation_notes: procedures.procedureNeuromuscularRehabilitationNotes || '',
      procedure_manual_therapy: procedures.procedureManualTherapy || false,
      procedure_manual_therapy_notes: procedures.procedureManualTherapyNotes || '',
      procedure_massage: procedures.procedureMassage || false,
      procedure_massage_notes: procedures.procedureMassageNotes || '',
      procedure_aquatic_therapy: procedures.procedureAquaticTherapy || false,
      procedure_aquatic_therapy_notes: procedures.procedureAquaticTherapyNotes || '',
      procedure_splinting_taping: procedures.procedureSplintingTaping || false,
      procedure_splinting_taping_notes: procedures.procedureSplintingTapingNotes || '',
      procedure_canalith_repositioning: procedures.procedureCanalithRepositioning || false,
      procedure_canalith_repositioning_notes: procedures.procedureCanalithRepositioningNotes || '',
      procedure_group_therapy: procedures.procedureGroupTherapy || false,
      procedure_group_therapy_notes: procedures.procedureGroupTherapyNotes || '',
      procedure_patient_education: procedures.procedurePatientEducation || false,
      procedure_patient_education_notes: procedures.procedurePatientEducationNotes || '',
      procedure_remote_therapeutic_monitoring: procedures.procedureRemoteTherapeuticMonitoring || false,
      procedure_remote_therapeutic_monitoring_notes: procedures.procedureRemoteTherapeuticMonitoringNotes || ''
    };
  }

  /**
   * Maps modality fields from backend DTO to Modalities model
   */
  private mapModalitiesToModel(formValue: any): Modalities {
    return {
      modalitiesPainRelief: formValue.modalities_pain_relief || false,
      modalitiesPainReliefNotes: formValue.modalities_pain_relief_notes || '',
      modalitiesDecreaseInflammation: formValue.modalities_decrease_inflammation || false,
      modalitiesDecreaseInflammationNotes: formValue.modalities_decrease_inflammation_notes || '',
      modalitiesIncreaseBloodFlow: formValue.modalities_increase_blood_flow || false,
      modalitiesIncreaseBloodFlowNotes: formValue.modalities_increase_blood_flow_notes || '',
      modalitiesImproveTissueHealing: formValue.modalities_improve_tissue_healing || false,
      modalitiesImproveTissueHealingNotes: formValue.modalities_improve_tissue_healing_notes || '',
      modalitiesElectricalStimulation: formValue.modalities_electrical_stimulation || false,
      modalitiesElectricalStimulationNotes: formValue.modalities_electrical_stimulation_notes || '',
      modalitiesUltrasoundPhonophoresis: formValue.modalities_ultrasound_phonophoresis || false,
      modalitiesUltrasoundPhonophoresisNotes: formValue.modalities_ultrasound_phonophoresis_notes || '',
      modalitiesLaser: formValue.modalities_laser || false,
      modalitiesLaserNotes: formValue.modalities_laser_notes || '',
      modalitiesInfraredLight: formValue.modalities_infrared_light || false,
      modalitiesInfraredLightNotes: formValue.modalities_infrared_light_notes || '',
      modalitiesDiathermy: formValue.modalities_diathermy || false,
      modalitiesDiathermyNotes: formValue.modalities_diathermy_notes || '',
      modalitiesUltraviolet: formValue.modalities_ultraviolet || false,
      modalitiesUltravioletNotes: formValue.modalities_ultraviolet_notes || '',
      modalitiesVasopneumatic: formValue.modalities_vasopneumatic || false,
      modalitiesVasopneumaticNotes: formValue.modalities_vasopneumatic_notes || '',
      modalitiesWhirlpool: formValue.modalities_whirlpool || false,
      modalitiesWhirlpoolNotes: formValue.modalities_whirlpool_notes || '',
      modalitiesParaffinBath: formValue.modalities_paraffin_bath || false,
      modalitiesParaffinBathNotes: formValue.modalities_paraffin_bath_notes || '',
      modalitiesCryotherapy: formValue.modalities_cryotherapy || false,
      modalitiesCryotherapyNotes: formValue.modalities_cryotherapy_notes || '',
      modalitiesHotPacks: formValue.modalities_hot_packs || false,
      modalitiesHotPacksNotes: formValue.modalities_hot_packs_notes || '',
      modalitiesMechanicalTraction: formValue.modalities_mechanical_traction || false,
      modalitiesMechanicalTractionNotes: formValue.modalities_mechanical_traction_notes || ''
    };
  }

  /**
   * Maps Modalities model to backend DTO fields
   */
  private mapModalitiesFromDto(modalities: Modalities): any {
    if (!modalities) {
      return {};
    }

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
      modalities_ultrasound_phonophoresis: modalities.modalitiesUltrasoundPhonophoresis || false,
      modalities_ultrasound_phonophoresis_notes: modalities.modalitiesUltrasoundPhonophoresisNotes || '',
      modalities_laser: modalities.modalitiesLaser || false,
      modalities_laser_notes: modalities.modalitiesLaserNotes || '',
      modalities_infrared_light: modalities.modalitiesInfraredLight || false,
      modalities_infrared_light_notes: modalities.modalitiesInfraredLightNotes || '',
      modalities_diathermy: modalities.modalitiesDiathermy || false,
      modalities_diathermy_notes: modalities.modalitiesDiathermyNotes || '',
      modalities_ultraviolet: modalities.modalitiesUltraviolet || false,
      modalities_ultraviolet_notes: modalities.modalitiesUltravioletNotes || '',
      modalities_vasopneumatic: modalities.modalitiesVasopneumatic || false,
      modalities_vasopneumatic_notes: modalities.modalitiesVasopneumaticNotes || '',
      modalities_whirlpool: modalities.modalitiesWhirlpool || false,
      modalities_whirlpool_notes: modalities.modalitiesWhirlpoolNotes || '',
      modalities_paraffin_bath: modalities.modalitiesParaffinBath || false,
      modalities_paraffin_bath_notes: modalities.modalitiesParaffinBathNotes || '',
      modalities_cryotherapy: modalities.modalitiesCryotherapy || false,
      modalities_cryotherapy_notes: modalities.modalitiesCryotherapyNotes || '',
      modalities_hot_packs: modalities.modalitiesHotPacks || false,
      modalities_hot_packs_notes: modalities.modalitiesHotPacksNotes || '',
      modalities_mechanical_traction: modalities.modalitiesMechanicalTraction || false,
      modalities_mechanical_traction_notes: modalities.modalitiesMechanicalTractionNotes || ''
    };
  }

  /**
   * Maps specialty fields from backend DTO to Specialties model
   */
  private mapSpecialtiesToModel(formValue: any): Specialties {
    return {
      modalitiesOrthoticFabrication: formValue.modalities_orthotic_fabrication || false,
      modalitiesOrthoticFabricationNotes: formValue.modalities_orthotic_fabrication_notes || '',
      modalitiesTensFitting: formValue.modalities_tens_fitting || false,
      modalitiesTensFittingNotes: formValue.modalities_tens_fitting_notes || '',
      modalitiesAcupuncture: formValue.modalities_acupuncture || false,
      modalitiesAcupunctureNotes: formValue.modalities_acupuncture_notes || '',
      modalitiesOther: formValue.modalities_other || false,
      modalitiesOtherNotes: formValue.modalities_other_notes || ''
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
