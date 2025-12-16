import { Injectable } from '@angular/core';
import {
  OutcomeMeasurementToolsModel,
  CustomOutcomeMeasurementModel,
  VestibularModel,
  CerebralConcussionModel,
  LossOfConsciousnessModel,
  PostTraumaticAmnesiaModel,
  PostCerebralConcussionScaleModel,
  UpperExtremityModel,
  ShoulderPainDisabilityIndexModel,
  UpperExtremityFunctionalIndexModel,
  DashModel,
  HandProfileModel,
  SpineModel,
  NeckDisabilityIndexModel,
  OswestryLowBackPainModel,
  ModifiedOswestryLowBackPainModel,
  QuebecBackPainDisabilityScaleModel,
  LowerExtremityModel,
  LowerExtremityFunctionalScaleModel,
  BalanceModel,
  AbcScaleModel,
  MctsibModel,
  TinettiModel,
  BergModel,
  FullertonModel,
  PainModel,
  McGillPainQuestionnaireModel,
  WongBakerModel,
  PainDisabilityIndexModel,
  CroftDisabilityQuestionnaireModel,
  FabqModel,
  GeneralFunctionModel
} from '../models/outcome-measurement-tools.model';

@Injectable({
  providedIn: 'root'
})
export class OutcomeMeasurementToolsMapperService {

  /**
   * Converts form raw value to OutcomeMeasurementToolsModel for backend
   */
  toModel(formValue: any): OutcomeMeasurementToolsModel {
    return {
      customOutcomeMeasurement: this.mapCustomOutcomeMeasurement(formValue),
      vestibular: this.mapVestibular(formValue),
      upperExtremity: this.mapUpperExtremity(formValue),
      spine: this.mapSpine(formValue),
      lowerExtremity: this.mapLowerExtremity(formValue),
      balance: this.mapBalance(formValue),
      pain: this.mapPain(formValue),
      generalFunction: this.mapGeneralFunction(formValue)
    };
  }

  /**
   * Converts DTO from backend to form value object
   */
  fromDto(dto: OutcomeMeasurementToolsModel): any {
    return {
      // Custom Outcome Measurement
      custom_outcome_measurement: dto.customOutcomeMeasurement.enabled ? 'yes' : 'no',
      custom_outcome_name: dto.customOutcomeMeasurement.nameOfOutcome || '',
      custom_outcome_comments: dto.customOutcomeMeasurement.comments || '',
      custom_outcome_score: dto.customOutcomeMeasurement.score || '',

      // Vestibular
      vestibular: dto.vestibular.enabled ? 'yes' : 'no',
      cerebral_concussion: dto.vestibular.cerebralConcussion?.enabled ? 'yes' : 'no',
      loss_of_consciousness: dto.vestibular.cerebralConcussion?.lossOfConsciousness?.enabled ? 'yes' : 'no',
      loss_of_consciousness_select: dto.vestibular.cerebralConcussion?.lossOfConsciousness?.select || 'not_tested',
      loss_of_consciousness_text: dto.vestibular.cerebralConcussion?.lossOfConsciousness?.text || '',
      post_traumatic_amnesia: dto.vestibular.cerebralConcussion?.postTraumaticAmnesia?.enabled ? 'yes' : 'no',
      post_traumatic_amnesia_select: dto.vestibular.cerebralConcussion?.postTraumaticAmnesia?.select || 'not_tested',
      post_traumatic_amnesia_text: dto.vestibular.cerebralConcussion?.postTraumaticAmnesia?.text || '',
      post_cerebral_concussion_scale: dto.vestibular.cerebralConcussion?.postCerebralConcussionScale?.enabled ? 'yes' : 'no',
      post_cerebral_raw_score: dto.vestibular.cerebralConcussion?.postCerebralConcussionScale?.rawScore || '',
      post_cerebral_classification: dto.vestibular.cerebralConcussion?.postCerebralConcussionScale?.classification || '',
      post_cerebral_rank: dto.vestibular.cerebralConcussion?.postCerebralConcussionScale?.rank || '',
      post_cerebral_text: dto.vestibular.cerebralConcussion?.postCerebralConcussionScale?.text || '',

      // Upper Extremity
      upper_extremity: dto.upperExtremity.enabled ? 'yes' : 'no',
      shoulder_pain_disability: dto.upperExtremity.shoulderPainDisabilityIndex?.enabled ? 'yes' : 'no',
      shoulder_total_percent: dto.upperExtremity.shoulderPainDisabilityIndex?.totalPercent || '',
      shoulder_pain_percent: dto.upperExtremity.shoulderPainDisabilityIndex?.painPercent || '',
      shoulder_disability_percent: dto.upperExtremity.shoulderPainDisabilityIndex?.disabilityPercent || '',
      upper_extremity_functional: dto.upperExtremity.upperExtremityFunctionalIndex?.enabled ? 'yes' : 'no',
      upper_extremity_functional_score: dto.upperExtremity.upperExtremityFunctionalIndex?.score || '',
      dash: dto.upperExtremity.dash?.enabled ? 'yes' : 'no',
      dash_score: dto.upperExtremity.dash?.score || '',
      hand_profile: dto.upperExtremity.handProfile?.enabled ? 'yes' : 'no',
      hand_profile_text: dto.upperExtremity.handProfile?.text || '',

      // Spine
      spine: dto.spine.enabled ? 'yes' : 'no',
      neck_disability_index: dto.spine.neckDisabilityIndex?.enabled ? 'yes' : 'no',
      neck_disability_score: dto.spine.neckDisabilityIndex?.score || '',
      neck_disability_total_percent: dto.spine.neckDisabilityIndex?.totalPercent || '',
      oswestry_low_back_pain: dto.spine.oswestryLowBackPain?.enabled ? 'yes' : 'no',
      oswestry_disability_percent: dto.spine.oswestryLowBackPain?.disabilityPercent || '',
      modified_oswestry_low_back_pain: dto.spine.modifiedOswestryLowBackPain?.enabled ? 'yes' : 'no',
      modified_oswestry_disability_percent: dto.spine.modifiedOswestryLowBackPain?.disabilityPercent || '',
      quebec_back_pain_disability: dto.spine.quebecBackPainDisabilityScale?.enabled ? 'yes' : 'no',
      quebec_back_pain_score: dto.spine.quebecBackPainDisabilityScale?.score || '',

      // Lower Extremity
      lower_extremity: dto.lowerExtremity.enabled ? 'yes' : 'no',
      lower_extremity_functional_scale: dto.lowerExtremity.lowerExtremityFunctionalScale?.enabled ? 'yes' : 'no',
      lower_extremity_functional_score: dto.lowerExtremity.lowerExtremityFunctionalScale?.score || '',

      // Balance
      balance: dto.balance.enabled ? 'yes' : 'no',
      abc_scale: dto.balance.abcScale?.enabled ? 'yes' : 'no',
      abc_scale_score: dto.balance.abcScale?.score || '',
      mctsib: dto.balance.mctsib?.enabled ? 'yes' : 'no',
      mctsib_condition_1: dto.balance.mctsib?.condition1 || '',
      mctsib_condition_2: dto.balance.mctsib?.condition2 || '',
      mctsib_condition_3: dto.balance.mctsib?.condition3 || '',
      mctsib_condition_4: dto.balance.mctsib?.condition4 || '',
      mctsib_total: dto.balance.mctsib?.total || '',
      mctsib_comments: dto.balance.mctsib?.comments || '',
      tinetti: dto.balance.tinetti?.enabled ? 'yes' : 'no',
      tinetti_score: dto.balance.tinetti?.score || '',
      berg: dto.balance.berg?.enabled ? 'yes' : 'no',
      berg_score: dto.balance.berg?.score || '',
      fullerton: dto.balance.fullerton?.enabled ? 'yes' : 'no',
      fullerton_score: dto.balance.fullerton?.score || '',

      // Pain
      pain: dto.pain.enabled ? 'yes' : 'no',
      mcgill_pain: dto.pain.mcgillPainQuestionnaire?.enabled ? 'yes' : 'no',
      mcgill_pain_score: dto.pain.mcgillPainQuestionnaire?.score || '',
      mcgill_completed: dto.pain.mcgillPainQuestionnaire?.completed || false,
      mcgill_followup_plan: dto.pain.mcgillPainQuestionnaire?.followupPlan || '',
      wong_baker: dto.pain.wongBaker?.enabled ? 'yes' : 'no',
      wong_baker_score: dto.pain.wongBaker?.score || '',
      wong_baker_followup_plan: dto.pain.wongBaker?.followupPlan || '',
      pain_disability_index: dto.pain.painDisabilityIndex?.enabled ? 'yes' : 'no',
      pain_disability_score: dto.pain.painDisabilityIndex?.score || '',
      pain_disability_followup_plan: dto.pain.painDisabilityIndex?.followupPlan || '',
      croft_disability: dto.pain.croftDisabilityQuestionnaire?.enabled ? 'yes' : 'no',
      croft_disability_score: dto.pain.croftDisabilityQuestionnaire?.score || '',
      croft_disability_followup_plan: dto.pain.croftDisabilityQuestionnaire?.followupPlan || '',
      fabq: dto.pain.fabq?.enabled ? 'yes' : 'no',
      fabq_scale_1: dto.pain.fabq?.scale1 || '',
      fabq_scale_2: dto.pain.fabq?.scale2 || '',
      fabq_followup_plan: dto.pain.fabq?.followupPlan || '',

      // General Function
      general_function: dto.generalFunction.enabled ? 'yes' : 'no'
    };
  }

  // Private mapping methods for toModel
  private mapCustomOutcomeMeasurement(formValue: any): CustomOutcomeMeasurementModel {
    const enabled = formValue.custom_outcome_measurement === 'yes';
    const model: CustomOutcomeMeasurementModel = { enabled };

    if (enabled) {
      model.nameOfOutcome = formValue.custom_outcome_name || '';
      model.comments = formValue.custom_outcome_comments || '';
      model.score = formValue.custom_outcome_score || '';
    }

    return model;
  }

  private mapVestibular(formValue: any): VestibularModel {
    const enabled = formValue.vestibular === 'yes';
    const model: VestibularModel = { enabled };

    if (enabled) {
      model.cerebralConcussion = this.mapCerebralConcussion(formValue);
    }

    return model;
  }

  private mapCerebralConcussion(formValue: any): CerebralConcussionModel {
    const enabled = formValue.cerebral_concussion === 'yes';
    const model: CerebralConcussionModel = { enabled };

    if (enabled) {
      model.lossOfConsciousness = this.mapLossOfConsciousness(formValue);
      model.postTraumaticAmnesia = this.mapPostTraumaticAmnesia(formValue);
      model.postCerebralConcussionScale = this.mapPostCerebralConcussionScale(formValue);
    }

    return model;
  }

  private mapLossOfConsciousness(formValue: any): LossOfConsciousnessModel {
    const enabled = formValue.loss_of_consciousness === 'yes';
    const model: LossOfConsciousnessModel = { enabled };

    if (enabled) {
      model.select = formValue.loss_of_consciousness_select || '';
      model.text = formValue.loss_of_consciousness_text || '';
    }

    return model;
  }

  private mapPostTraumaticAmnesia(formValue: any): PostTraumaticAmnesiaModel {
    const enabled = formValue.post_traumatic_amnesia === 'yes';
    const model: PostTraumaticAmnesiaModel = { enabled };

    if (enabled) {
      model.select = formValue.post_traumatic_amnesia_select || '';
      model.text = formValue.post_traumatic_amnesia_text || '';
    }

    return model;
  }

  private mapPostCerebralConcussionScale(formValue: any): PostCerebralConcussionScaleModel {
    const enabled = formValue.post_cerebral_concussion_scale === 'yes';
    const model: PostCerebralConcussionScaleModel = { enabled };

    if (enabled) {
      model.rawScore = formValue.post_cerebral_raw_score || '';
      model.classification = formValue.post_cerebral_classification || '';
      model.rank = formValue.post_cerebral_rank || '';
      model.text = formValue.post_cerebral_text || '';
    }

    return model;
  }

  private mapUpperExtremity(formValue: any): UpperExtremityModel {
    const enabled = formValue.upper_extremity === 'yes';
    const model: UpperExtremityModel = { enabled };

    if (enabled) {
      model.shoulderPainDisabilityIndex = this.mapShoulderPainDisabilityIndex(formValue);
      model.upperExtremityFunctionalIndex = this.mapUpperExtremityFunctionalIndex(formValue);
      model.dash = this.mapDash(formValue);
      model.handProfile = this.mapHandProfile(formValue);
    }

    return model;
  }

  private mapShoulderPainDisabilityIndex(formValue: any): ShoulderPainDisabilityIndexModel {
    const enabled = formValue.shoulder_pain_disability === 'yes';
    const model: ShoulderPainDisabilityIndexModel = { enabled };

    if (enabled) {
      model.totalPercent = formValue.shoulder_total_percent || '';
      model.painPercent = formValue.shoulder_pain_percent || '';
      model.disabilityPercent = formValue.shoulder_disability_percent || '';
    }

    return model;
  }

  private mapUpperExtremityFunctionalIndex(formValue: any): UpperExtremityFunctionalIndexModel {
    const enabled = formValue.upper_extremity_functional === 'yes';
    const model: UpperExtremityFunctionalIndexModel = { enabled };

    if (enabled) {
      model.score = formValue.upper_extremity_functional_score || '';
    }

    return model;
  }

  private mapDash(formValue: any): DashModel {
    const enabled = formValue.dash === 'yes';
    const model: DashModel = { enabled };

    if (enabled) {
      model.score = formValue.dash_score || '';
    }

    return model;
  }

  private mapHandProfile(formValue: any): HandProfileModel {
    const enabled = formValue.hand_profile === 'yes';
    const model: HandProfileModel = { enabled };

    if (enabled) {
      model.text = formValue.hand_profile_text || '';
    }

    return model;
  }

  private mapSpine(formValue: any): SpineModel {
    const enabled = formValue.spine === 'yes';
    const model: SpineModel = { enabled };

    if (enabled) {
      model.neckDisabilityIndex = this.mapNeckDisabilityIndex(formValue);
      model.oswestryLowBackPain = this.mapOswestryLowBackPain(formValue);
      model.modifiedOswestryLowBackPain = this.mapModifiedOswestryLowBackPain(formValue);
      model.quebecBackPainDisabilityScale = this.mapQuebecBackPainDisabilityScale(formValue);
    }

    return model;
  }

  private mapNeckDisabilityIndex(formValue: any): NeckDisabilityIndexModel {
    const enabled = formValue.neck_disability_index === 'yes';
    const model: NeckDisabilityIndexModel = { enabled };

    if (enabled) {
      model.score = formValue.neck_disability_score || '';
      model.totalPercent = formValue.neck_disability_total_percent || '';
    }

    return model;
  }

  private mapOswestryLowBackPain(formValue: any): OswestryLowBackPainModel {
    const enabled = formValue.oswestry_low_back_pain === 'yes';
    const model: OswestryLowBackPainModel = { enabled };

    if (enabled) {
      model.disabilityPercent = formValue.oswestry_disability_percent || '';
    }

    return model;
  }

  private mapModifiedOswestryLowBackPain(formValue: any): ModifiedOswestryLowBackPainModel {
    const enabled = formValue.modified_oswestry_low_back_pain === 'yes';
    const model: ModifiedOswestryLowBackPainModel = { enabled };

    if (enabled) {
      model.disabilityPercent = formValue.modified_oswestry_disability_percent || '';
    }

    return model;
  }

  private mapQuebecBackPainDisabilityScale(formValue: any): QuebecBackPainDisabilityScaleModel {
    const enabled = formValue.quebec_back_pain_disability === 'yes';
    const model: QuebecBackPainDisabilityScaleModel = { enabled };

    if (enabled) {
      model.score = formValue.quebec_back_pain_score || '';
    }

    return model;
  }

  private mapLowerExtremity(formValue: any): LowerExtremityModel {
    const enabled = formValue.lower_extremity === 'yes';
    const model: LowerExtremityModel = { enabled };

    if (enabled) {
      model.lowerExtremityFunctionalScale = this.mapLowerExtremityFunctionalScale(formValue);
    }

    return model;
  }

  private mapLowerExtremityFunctionalScale(formValue: any): LowerExtremityFunctionalScaleModel {
    const enabled = formValue.lower_extremity_functional_scale === 'yes';
    const model: LowerExtremityFunctionalScaleModel = { enabled };

    if (enabled) {
      model.score = formValue.lower_extremity_functional_score || '';
    }

    return model;
  }

  private mapBalance(formValue: any): BalanceModel {
    const enabled = formValue.balance === 'yes';
    const model: BalanceModel = { enabled };

    if (enabled) {
      model.abcScale = this.mapAbcScale(formValue);
      model.mctsib = this.mapMctsib(formValue);
      model.tinetti = this.mapTinetti(formValue);
      model.berg = this.mapBerg(formValue);
      model.fullerton = this.mapFullerton(formValue);
    }

    return model;
  }

  private mapAbcScale(formValue: any): AbcScaleModel {
    const enabled = formValue.abc_scale === 'yes';
    const model: AbcScaleModel = { enabled };

    if (enabled) {
      model.score = formValue.abc_scale_score || '';
    }

    return model;
  }

  private mapMctsib(formValue: any): MctsibModel {
    const enabled = formValue.mctsib === 'yes';
    const model: MctsibModel = { enabled };

    if (enabled) {
      model.condition1 = formValue.mctsib_condition_1 || '';
      model.condition2 = formValue.mctsib_condition_2 || '';
      model.condition3 = formValue.mctsib_condition_3 || '';
      model.condition4 = formValue.mctsib_condition_4 || '';
      model.total = formValue.mctsib_total || '';
      model.comments = formValue.mctsib_comments || '';
    }

    return model;
  }

  private mapTinetti(formValue: any): TinettiModel {
    const enabled = formValue.tinetti === 'yes';
    const model: TinettiModel = { enabled };

    if (enabled) {
      model.score = formValue.tinetti_score || '';
    }

    return model;
  }

  private mapBerg(formValue: any): BergModel {
    const enabled = formValue.berg === 'yes';
    const model: BergModel = { enabled };

    if (enabled) {
      model.score = formValue.berg_score || '';
    }

    return model;
  }

  private mapFullerton(formValue: any): FullertonModel {
    const enabled = formValue.fullerton === 'yes';
    const model: FullertonModel = { enabled };

    if (enabled) {
      model.score = formValue.fullerton_score || '';
    }

    return model;
  }

  private mapPain(formValue: any): PainModel {
    const enabled = formValue.pain === 'yes';
    const model: PainModel = { enabled };

    if (enabled) {
      model.mcgillPainQuestionnaire = this.mapMcgillPainQuestionnaire(formValue);
      model.wongBaker = this.mapWongBaker(formValue);
      model.painDisabilityIndex = this.mapPainDisabilityIndex(formValue);
      model.croftDisabilityQuestionnaire = this.mapCroftDisabilityQuestionnaire(formValue);
      model.fabq = this.mapFabq(formValue);
    }

    return model;
  }

  private mapMcgillPainQuestionnaire(formValue: any): McGillPainQuestionnaireModel {
    const enabled = formValue.mcgill_pain === 'yes';
    const model: McGillPainQuestionnaireModel = { enabled };

    if (enabled) {
      model.score = formValue.mcgill_pain_score || '';
      model.completed = formValue.mcgill_completed || false;
      model.followupPlan = formValue.mcgill_followup_plan || '';
    }

    return model;
  }

  private mapWongBaker(formValue: any): WongBakerModel {
    const enabled = formValue.wong_baker === 'yes';
    const model: WongBakerModel = { enabled };

    if (enabled) {
      model.score = formValue.wong_baker_score || '';
      model.followupPlan = formValue.wong_baker_followup_plan || '';
    }

    return model;
  }

  private mapPainDisabilityIndex(formValue: any): PainDisabilityIndexModel {
    const enabled = formValue.pain_disability_index === 'yes';
    const model: PainDisabilityIndexModel = { enabled };

    if (enabled) {
      model.score = formValue.pain_disability_score || '';
      model.followupPlan = formValue.pain_disability_followup_plan || '';
    }

    return model;
  }

  private mapCroftDisabilityQuestionnaire(formValue: any): CroftDisabilityQuestionnaireModel {
    const enabled = formValue.croft_disability === 'yes';
    const model: CroftDisabilityQuestionnaireModel = { enabled };

    if (enabled) {
      model.score = formValue.croft_disability_score || '';
      model.followupPlan = formValue.croft_disability_followup_plan || '';
    }

    return model;
  }

  private mapFabq(formValue: any): FabqModel {
    const enabled = formValue.fabq === 'yes';
    const model: FabqModel = { enabled };

    if (enabled) {
      model.scale1 = formValue.fabq_scale_1 || '';
      model.scale2 = formValue.fabq_scale_2 || '';
      model.followupPlan = formValue.fabq_followup_plan || '';
    }

    return model;
  }

  private mapGeneralFunction(formValue: any): GeneralFunctionModel {
    const enabled = formValue.general_function === 'yes';
    const model: GeneralFunctionModel = { enabled };

    if (enabled) {
      // TODO: Map general function fields
    }

    return model;
  }
}
