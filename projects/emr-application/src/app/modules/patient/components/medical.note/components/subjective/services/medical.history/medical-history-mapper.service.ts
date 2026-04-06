import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MedicalHistory } from '../../models/medical.history/medical.history';
import { MedicalHistoryDisease } from '../../models/medical.history/medical.history.disease';
import { PersonalComplication } from '../../models/medical.history/personal.complication';
import { CurrentMedication } from '../../models/medical.history/current.medication';
import { PreviousHistorySymptoms } from '../../models/medical.history/previous.history.symptoms';
import { OccupationSocialHistory } from '../../models/medical.history/occupation.social.history';
import { HistoryFall } from '../../models/medical.history/history.falls';

@Injectable({
  providedIn: 'root'
})
export class MedicalHistoryMapperService {

  private pelvicProfileFields = [
    'Dysmenorrhea',
    'Endometriosis',
    'Fibroids',
    'Menopause',
    'PelvicCongestion',
    'Pid',
    'ProstateCa',
    'PudendalNeuralgia',
    'Vestibulitis',
    'Vulvodynia'
  ];

  constructor() { }

  /**
   * Converts snake_case to camelCase
   */
  private toSnakeCase(str: string): string {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
  }

  /**
   * Converts form group to MedicalHistory model
   */
  toModel(formGroup: FormGroup): MedicalHistory {
    const medicalHistory: MedicalHistory = {};

    // previousHistoryOfSimilarSymptoms
    const isPreviousHistoryOfSimilarSymptoms = formGroup.get('previous_history_of_similar_symptoms')?.value;
    medicalHistory.isPreviousHistoryOfSimilarSymptoms = isPreviousHistoryOfSimilarSymptoms;

    if (isPreviousHistoryOfSimilarSymptoms) {
      const previousHistorySymptoms: PreviousHistorySymptoms = {};

      // previousEpisodesOfSameComplaints
      previousHistorySymptoms.isEpisode = formGroup.get('previous_episodes_of_same_complaints')?.value;
      // previousEpisodesOfSameComplaintsRange
      previousHistorySymptoms.episodeAgerRange = formGroup.get('previous_episodes_of_same_complaints_range')?.value;
      // previousEpisodesOfSameComplaintsYearFirstEpisode
      previousHistorySymptoms.episodeYear = formGroup.get('previous_episodes_of_same_complaints_year_first_episode')?.value;
      // previousTreatmentsForSimilarSymptoms
      previousHistorySymptoms.isSimilarSymptoms = formGroup.get('previous_treatments_for_similar_symptoms')?.value;
      // previousHistoryOfSimilarSymptomsText
      previousHistorySymptoms.similarSymptomsTxt = formGroup.get('previous_history_of_similar_symptoms_text')?.value;
      // previousTreatmentsForSimilarSymptomsText
      previousHistorySymptoms.description = formGroup.get('previous_treatments_for_similar_symptoms_text')?.value;

      medicalHistory.previousHistorySymptoms = previousHistorySymptoms;
    }

    // occupationSocialHistory
    const isOccupationSocialHistory = formGroup.get('occupation_social_history')?.value;
    medicalHistory.isOccupationSocialHistory = isOccupationSocialHistory;

    if (isOccupationSocialHistory) {
      const occupationSocialHistory: OccupationSocialHistory = {};

      // occupationSocialHistorySocialHistory
      occupationSocialHistory.isSocialHistory = formGroup.get('occupation_social_history_social_history')?.value;
      // occupationSocialHistoryOccupationAndWorkStatus
      occupationSocialHistory.isWorkStatus = formGroup.get('occupation_social_history_occupation_and_work_status')?.value;
      // occupationSocialHistoryHomeLayout
      occupationSocialHistory.isHomeLayout = formGroup.get('occupation_social_history_home_layout')?.value;
      // occupationSocialHistoryDurableMedicalEquipmentList
      occupationSocialHistory.isMedicalEquipment = formGroup.get('occupation_social_history_durable_medical_equipment')?.value;
      // occupationSocialHistoryPatientTobaccoUser
      occupationSocialHistory.isTobaccoUser = formGroup.get('occupation_social_history_patient_tobacco_user')?.value;

      // occupationSocialHistoryList
      occupationSocialHistory.socialHistoryList = formGroup.get('occupation_social_history_list')?.value;
      // occupationSocialHistoryText
      occupationSocialHistory.socialHistoryListDescription = formGroup.get('occupation_social_history_text')?.value;
      // occupationSocialHistoryOccupationAndWorkNameOfOccupation
      occupationSocialHistory.occupationName = formGroup.get('occupation_social_history_occupation_and_work_name_of_occupation')?.value;
      // occupationSocialHistoryOccupationAndWorkStatusStatus
      occupationSocialHistory.occupationStatus = formGroup.get('occupation_social_history_occupation_and_work_status_status')?.value;
      // occupationSocialHistoryOccupationAndWorkStatusDutyLevel
      occupationSocialHistory.occupationDutyLevel = formGroup.get('occupation_social_history_occupation_and_work_status_duty_level')?.value;
      // occupationSocialHistoryOccupationAndWorkStatusSescription
      occupationSocialHistory.occupationDescription = formGroup.get('occupation_social_history_occupation_and_work_status_sescription')?.value;
      // occupationSocialHistoryOccupationAndWorkStatusOutOfWorkSince
      occupationSocialHistory.occupationOutOfWorkSince = formGroup.get('occupation_social_history_occupation_and_work_status_out_of_work_since')?.value;
      // occupationSocialHistoryOccupationAndWorkStatusReturnToWorkDate
      occupationSocialHistory.occupationReturnToWorkDate = formGroup.get('occupation_social_history_occupation_and_work_status_return_to_work_date')?.value;
      // occupationSocialHistoryHomeLayoutText
      occupationSocialHistory.homeLayoutDescription = formGroup.get('occupation_social_history_home_layout_text')?.value;
      // occupationSocialHistoryHomeLayoutList
      occupationSocialHistory.homeLayoutList = formGroup.get('occupation_social_history_home_layout_list')?.value === '' ? null : formGroup.get('occupation_social_history_home_layout_list')?.value;
      // occupationSocialHistoryDurableMedicalEquipmentList
      occupationSocialHistory.medicalEquipmentsList = formGroup.get('occupation_social_history_durable_medical_equipment_list')?.value === '' ? null : formGroup.get('occupation_social_history_durable_medical_equipment_list')?.value;
      // occupationSocialHistoryDurableMedicalEquipmentText
      occupationSocialHistory.medicalEquipmentsListDescription = formGroup.get('occupation_social_history_durable_medical_equipment_text')?.value;

      // occupationSocialHistoryPatientTobaccoUserCigarettesOrAndOtherFormsTobacco
      occupationSocialHistory.isPatientUseOtherFormsOfTobacco = formGroup.get('occupation_social_history_patient_tobacco_user_cigarettes_or_and_other_forms_tobacco')?.value;
      // tobaccoCessationRecommendationMade, tobaccoCessationAdviceSupportProvided, tobaccoCessationContinuedSupport
      occupationSocialHistory.patientSmokerAdvices = [
        formGroup.get('tobacco_cessation_recommendation_made')?.value,
        formGroup.get('tobacco_cessation_advice_support_provided')?.value,
        formGroup.get('tobacco_cessation_continued_support')?.value
      ];
      // occupationSocialHistoryPatientTobaccoUserOtherFormText
      occupationSocialHistory.patientSmokerAdvicesDescription = formGroup.get('occupation_social_history_patient_tobacco_user_other_form_text')?.value;

      medicalHistory.occupationSocialHistory = occupationSocialHistory;
    }

    // homeHealthCare
    medicalHistory.isHomeHealthCare = formGroup.get('home_health_care')?.value;
    // homeHealthCareText
    if (medicalHistory.isHomeHealthCare) {
      medicalHistory.homeHealthCareDescription = formGroup.get('home_health_care_text')?.value;
    }

    // historyOfFalls
    const isHistoryOfFalls = formGroup.get('history_of_falls')?.value;
    medicalHistory.isHistoryOfFalls = isHistoryOfFalls || 'na';

    if (isHistoryOfFalls === 'yes') {
      const historyFall: HistoryFall = {};

      // historyOfFallsDocument
      historyFall.isFallsDocumented = formGroup.get('history_of_falls_document')?.value;
      // historyOfFallsDocumentText
      historyFall.isFallsDocumentedDescription = formGroup.get('history_of_falls_document_text')?.value;
      // riskAssessmentMedicationsContributingFactor, riskAssessmentHomeFallHazards, riskAssessmentPosturalBloodPressure, riskAssessmentVision
      historyFall.riskAssessment = [
        formGroup.get('risk_assessment_medications_contributing_factor')?.value,
        formGroup.get('risk_assessment_home_fall_hazards')?.value,
        formGroup.get('risk_assessment_postural_blood_pressure')?.value,
        formGroup.get('risk_assessment_vision')?.value
      ];

      medicalHistory.historyFall = historyFall;
    }

    // Map medical history diseases
    // Prefix: "medicalHistory", Suffix: "Checkbox"
    const medicalHistoryDiseaseList: MedicalHistoryDisease[] = [];
    const medicalHistoryFields = [
      'Alzheimers',
      'CardiovascularDisease',
      'CaudaEquinaSyndrome',
      'CerebralVascularAccident',
      'CurrentInfection',
      'DiabetesMellitusType_1',
      'DiabetesMellitusType_2',
      'Fibromyalgia',
      'FractureOrSuspectedFracture',
      'HighBloodPressure',
      'HistoryOfCancer',
      'Huntingtons',
      'Immunosuppression',
      'Lupus',
      'MuscularDystrophy',
      'OtherEnterDescriptionBelow',
      'Obesity',
      'Osteoarthritis',
      'Parkinsons',
      'RheumatoidArthritis',
      'TraumaticBrainInjury'
    ];

    medicalHistoryFields.forEach(field => {
      // Convert field to snake_case and remove leading underscore
      const snakeCaseField = this.toSnakeCase(field).substring(1);
      const checkboxKey = `medical_history_${snakeCaseField}_checkbox`;
      const textKey = `medical_history_${snakeCaseField}_text`;
      const isChecked = formGroup.get(checkboxKey)?.value;

      if (isChecked) {
        medicalHistoryDiseaseList.push({
          diseaseName: field,
          diseaseDescription: formGroup.get(textKey)?.value
        });
      }
    });

    // Pelvic profile items use prefix "pelvic_profile_" and have no description
    this.pelvicProfileFields.forEach(field => {
      const snakeCaseField = this.toSnakeCase(field).substring(1);
      const checkboxKey = `pelvic_profile_${snakeCaseField}_checkbox`;
      const isChecked = formGroup.get(checkboxKey)?.value;

      if (isChecked) {
        medicalHistoryDiseaseList.push({
          diseaseName: field,
          diseaseDescription: null
        });
      }
    });

    if (medicalHistoryDiseaseList.length > 0) {
      medicalHistory.medicalHistoryDisease = medicalHistoryDiseaseList;
    }

    // Map personal complications
    // Prefix: "complicatingpersonalFactors", Suffix: "Checkbox"
    const personalComplicationList: PersonalComplication[] = [];
    const personalComplicationFields = [
      'Allergies',
      'AttitudesMotivation',
      'Character',
      'CopingStyle',
      'EducationLevel',
      'HomeEnvironment',
      'Lifestyle',
      'Litigation',
      'OtherEnterDescriptionBelow',
      'MechanismOfInjuryIllness',
      'MultipleTreatmentAreas',
      'PatientAge',
      'PreviousTherapy',
      'PsychoSocial',
      'RehabPotential',
      'SocialBackground',
      'SurgicalHistory',
      'TimeSinceOnsetOfInjuryIllness'
    ];

    personalComplicationFields.forEach(field => {
      // Convert field to snake_case and remove leading underscore
      const snakeCaseField = this.toSnakeCase(field).substring(1);
      const checkboxKey = `complicatingpersonal_factors_${snakeCaseField}_checkbox`;
      const textKey = `complicatingpersonal_factors_${snakeCaseField}_text`;
      const isChecked = formGroup.get(checkboxKey)?.value;

      if (isChecked) {
        personalComplicationList.push({
          complicationName: field,
          complicationDescription: formGroup.get(textKey)?.value
        });
      }
    });

    if (personalComplicationList.length > 0) {
      medicalHistory.personalComplication = personalComplicationList;
    }

    // Map current medications
    // Prefix: "currentMedications", Suffix: "Checkbox"
    const currentMedicationList: CurrentMedication[] = [];
    const currentMedicationFields = [
      'Prescription',
      'OverTheCounter',
      'Herbals',
      'VitaminMineralDietarySupplements',
      'Other',
      'NotCurrentlyTakingAnyMedications'
    ];

    currentMedicationFields.forEach(field => {
      // Convert field to snake_case and remove leading underscore
      const snakeCaseField = this.toSnakeCase(field).substring(1);
      const checkboxKey = `current_medications_${snakeCaseField}_checkbox`;
      const textKey = `current_medications_${snakeCaseField}_text`;
      const isChecked = formGroup.get(checkboxKey)?.value;

      if (isChecked) {
        currentMedicationList.push({
          medicationName: field,
          medicationDescription: formGroup.get(textKey)?.value
        });
      }
    });

    if (currentMedicationList.length > 0) {
      medicalHistory.currentMedication = currentMedicationList;
    }

    // generalHealth
    medicalHistory.generalHealth = formGroup.get('general_health')?.value;
    // diagnosticTesting_Imaging
    medicalHistory.diagnosticTest = formGroup.get('diagnostic_testing_Imaging')?.value;
    // patientGoals
    medicalHistory.patientGoals = formGroup.get('patient_goals')?.value;

    // medicalHistoryReview
    medicalHistory.medicalHistoryReview = formGroup.get('medical_history_review')?.value;
    // mentalStatusCognitiveFunctionAppearsImpaired
    medicalHistory.isMentalStatus = formGroup.get('mental_status_cognitive_function_appears_impaired')?.value;
    // mentalStatusCognitiveFunctionAppearsImpairedText
    if (medicalHistory.isMentalStatus) {
      medicalHistory.mentalStatusDescription = formGroup.get('mental_status_cognitive_function_appears_impaired_text')?.value;
    }
    // unexplainedWeightLoss
    const weightLossValue = formGroup.get('unexplained_weight_loss')?.value;
    medicalHistory.weightLoss = weightLossValue || 'na';

    return medicalHistory;
  }

  /**
   * Converts MedicalHistory DTO to form values
   */
  fromDto(dto: MedicalHistory): any {
    const mapped: any = {};

    // previousHistoryOfSimilarSymptoms
    mapped.previous_history_of_similar_symptoms = dto.isPreviousHistoryOfSimilarSymptoms;

    if (dto.previousHistorySymptoms) {
      const symptoms = dto.previousHistorySymptoms;
      mapped.previous_episodes_of_same_complaints = symptoms.isEpisode;
      mapped.previous_episodes_of_same_complaints_range = symptoms.episodeAgerRange;
      mapped.previous_episodes_of_same_complaints_year_first_episode = symptoms.episodeYear;
      mapped.previous_treatments_for_similar_symptoms = symptoms.isSimilarSymptoms;
      mapped.previous_history_of_similar_symptoms_text = symptoms.similarSymptomsTxt;
      mapped.previous_treatments_for_similar_symptoms_text = symptoms.description;
    }

    // occupationSocialHistory
    mapped.occupation_social_history = dto.isOccupationSocialHistory;

    if (dto.occupationSocialHistory) {
      const social = dto.occupationSocialHistory;
      mapped.occupation_social_history_social_history = social.isSocialHistory;
      mapped.occupation_social_history_occupation_and_work_status = social.isWorkStatus;
      mapped.occupation_social_history_home_layout = social.isHomeLayout;
      mapped.occupation_social_history_durable_medical_equipment = social.isMedicalEquipment;
      mapped.occupation_social_history_patient_tobacco_user = social.isTobaccoUser;
      mapped.occupation_social_history_list = social.socialHistoryList;
      mapped.occupation_social_history_text = social.socialHistoryListDescription;
      mapped.occupation_social_history_occupation_and_work_name_of_occupation = social.occupationName;
      mapped.occupation_social_history_occupation_and_work_status_status = social.occupationStatus;
      mapped.occupation_social_history_occupation_and_work_status_duty_level = social.occupationDutyLevel;
      mapped.occupation_social_history_occupation_and_work_status_sescription = social.occupationDescription;
      mapped.occupation_social_history_occupation_and_work_status_out_of_work_since = social.occupationOutOfWorkSince;
      mapped.occupation_social_history_occupation_and_work_status_return_to_work_date = social.occupationReturnToWorkDate;
      mapped.occupation_social_history_home_layout_text = social.homeLayoutDescription;
      mapped.occupation_social_history_home_layout_list = social.homeLayoutList;
      mapped.occupation_social_history_durable_medical_equipment_list = social.medicalEquipmentsList;
      mapped.occupation_social_history_durable_medical_equipment_text = social.medicalEquipmentsListDescription;
      mapped.occupation_social_history_patient_tobacco_user_cigarettes_or_and_other_forms_tobacco = social.isPatientUseOtherFormsOfTobacco;

      if (social.patientSmokerAdvices && social.patientSmokerAdvices.length >= 3) {
        mapped.tobacco_cessation_recommendation_made = social.patientSmokerAdvices[0];
        mapped.tobacco_cessation_advice_support_provided = social.patientSmokerAdvices[1];
        mapped.tobacco_cessation_continued_support = social.patientSmokerAdvices[2];
      }

      mapped.occupation_social_history_patient_tobacco_user_other_form_text = social.patientSmokerAdvicesDescription;
    }

    // homeHealthCare
    mapped.home_health_care = dto.isHomeHealthCare;
    mapped.home_health_care_text = dto.homeHealthCareDescription;

    // historyOfFalls
    mapped.history_of_falls = (dto.isHistoryOfFalls as any) === true ? 'yes' : (dto.isHistoryOfFalls as any) === false ? 'no' : (dto.isHistoryOfFalls || 'na');

    if (dto.historyFall) {
      const fall = dto.historyFall;
      mapped.history_of_falls_document = fall.isFallsDocumented;
      mapped.history_of_falls_document_text = fall.isFallsDocumentedDescription;

      if (fall.riskAssessment && fall.riskAssessment.length >= 4) {
        mapped.risk_assessment_medications_contributing_factor = fall.riskAssessment[0];
        mapped.risk_assessment_home_fall_hazards = fall.riskAssessment[1];
        mapped.risk_assessment_postural_blood_pressure = fall.riskAssessment[2];
        mapped.risk_assessment_vision = fall.riskAssessment[3];
      }
    }

    // Map medical history diseases from array to individual checkbox/text pairs
    if (dto.medicalHistoryDisease && dto.medicalHistoryDisease.length > 0) {
      dto.medicalHistoryDisease.forEach(disease => {
        if (disease.diseaseName) {
          const snakeCaseField = this.toSnakeCase(disease.diseaseName).substring(1);
          if (this.pelvicProfileFields.includes(disease.diseaseName)) {
            mapped[`pelvic_profile_${snakeCaseField}_checkbox`] = true;
          } else {
            mapped[`medical_history_${snakeCaseField}_checkbox`] = true;
            mapped[`medical_history_${snakeCaseField}_text`] = disease.diseaseDescription;
          }
        }
      });
    }

    // Map personal complications from array to individual checkbox/text pairs
    if (dto.personalComplication && dto.personalComplication.length > 0) {
      dto.personalComplication.forEach(complication => {
        if (complication.complicationName) {
          const snakeCaseField = this.toSnakeCase(complication.complicationName).substring(1);
          mapped[`complicatingpersonal_factors_${snakeCaseField}_checkbox`] = true;
          mapped[`complicatingpersonal_factors_${snakeCaseField}_text`] = complication.complicationDescription;
        }
      });
    }

    // Map current medications from array to individual checkbox/text pairs
    if (dto.currentMedication && dto.currentMedication.length > 0) {
      dto.currentMedication.forEach(medication => {
        if (medication.medicationName) {
          const snakeCaseField = this.toSnakeCase(medication.medicationName).substring(1);
          mapped[`current_medications_${snakeCaseField}_checkbox`] = true;
          mapped[`current_medications_${snakeCaseField}_text`] = medication.medicationDescription;
        }
      });
    }

    // Simple fields
    mapped.general_health = dto.generalHealth;
    mapped.diagnostic_testing_Imaging = dto.diagnosticTest;
    mapped.patient_goals = dto.patientGoals;
    mapped.medical_history_review = dto.medicalHistoryReview;
    mapped.mental_status_cognitive_function_appears_impaired = dto.isMentalStatus;
    mapped.mental_status_cognitive_function_appears_impaired_text = dto.mentalStatusDescription;
    mapped.unexplained_weight_loss = (dto.weightLoss as any) === true ? 'yes' : (dto.weightLoss as any) === false ? 'no' : (dto.weightLoss || 'na');

    return mapped;
  }
}
