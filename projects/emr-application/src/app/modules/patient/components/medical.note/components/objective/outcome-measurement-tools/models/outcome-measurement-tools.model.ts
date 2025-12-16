// Custom Outcome Measurement Model
export interface CustomOutcomeMeasurementModel {
  enabled: boolean;
  nameOfOutcome?: string;
  comments?: string;
  score?: string;
}

// Loss of Consciousness Model
export interface LossOfConsciousnessModel {
  enabled: boolean;
  select?: string;
  text?: string;
}

// Post-Traumatic Amnesia Model
export interface PostTraumaticAmnesiaModel {
  enabled: boolean;
  select?: string;
  text?: string;
}

// Post-Cerebral Concussion Scale Model
export interface PostCerebralConcussionScaleModel {
  enabled: boolean;
  rawScore?: string;
  classification?: string;
  rank?: string;
  text?: string;
}

// Cerebral Concussion Model
export interface CerebralConcussionModel {
  enabled: boolean;
  lossOfConsciousness?: LossOfConsciousnessModel;
  postTraumaticAmnesia?: PostTraumaticAmnesiaModel;
  postCerebralConcussionScale?: PostCerebralConcussionScaleModel;
}

// Vestibular Model
export interface VestibularModel {
  enabled: boolean;
  cerebralConcussion?: CerebralConcussionModel;
}

// Shoulder Pain and Disability Index Model
export interface ShoulderPainDisabilityIndexModel {
  enabled: boolean;
  totalPercent?: string;
  painPercent?: string;
  disabilityPercent?: string;
}

// Upper Extremity Functional Index Model
export interface UpperExtremityFunctionalIndexModel {
  enabled: boolean;
  score?: string;
}

// DASH Model
export interface DashModel {
  enabled: boolean;
  score?: string;
}

// Hand Profile Model
export interface HandProfileModel {
  enabled: boolean;
  text?: string;
}

// Upper Extremity Model
export interface UpperExtremityModel {
  enabled: boolean;
  shoulderPainDisabilityIndex?: ShoulderPainDisabilityIndexModel;
  upperExtremityFunctionalIndex?: UpperExtremityFunctionalIndexModel;
  dash?: DashModel;
  handProfile?: HandProfileModel;
}

// Neck Disability Index Model
export interface NeckDisabilityIndexModel {
  enabled: boolean;
  score?: string;
  totalPercent?: string;
}

// Oswestry Low Back Pain Model
export interface OswestryLowBackPainModel {
  enabled: boolean;
  disabilityPercent?: string;
}

// Modified Oswestry Low Back Pain Model
export interface ModifiedOswestryLowBackPainModel {
  enabled: boolean;
  disabilityPercent?: string;
}

// Quebec Back Pain Disability Scale Model
export interface QuebecBackPainDisabilityScaleModel {
  enabled: boolean;
  score?: string;
}

// Spine Model
export interface SpineModel {
  enabled: boolean;
  neckDisabilityIndex?: NeckDisabilityIndexModel;
  oswestryLowBackPain?: OswestryLowBackPainModel;
  modifiedOswestryLowBackPain?: ModifiedOswestryLowBackPainModel;
  quebecBackPainDisabilityScale?: QuebecBackPainDisabilityScaleModel;
}

// Lower Extremity Functional Scale Model
export interface LowerExtremityFunctionalScaleModel {
  enabled: boolean;
  score?: string;
}

// Lower Extremity Model
export interface LowerExtremityModel {
  enabled: boolean;
  lowerExtremityFunctionalScale?: LowerExtremityFunctionalScaleModel;
}

// ABC Scale Model
export interface AbcScaleModel {
  enabled: boolean;
  score?: string;
}

// mCTSIB Model
export interface MctsibModel {
  enabled: boolean;
  condition1?: string;
  condition2?: string;
  condition3?: string;
  condition4?: string;
  total?: string;
  comments?: string;
}

// Tinetti Model
export interface TinettiModel {
  enabled: boolean;
  score?: string;
}

// Berg Model
export interface BergModel {
  enabled: boolean;
  score?: string;
}

// Fullerton Advanced Balance (FAB) Scale Model
export interface FullertonModel {
  enabled: boolean;
  score?: string;
}

// Balance Model
export interface BalanceModel {
  enabled: boolean;
  abcScale?: AbcScaleModel;
  mctsib?: MctsibModel;
  tinetti?: TinettiModel;
  berg?: BergModel;
  fullerton?: FullertonModel;
}

// McGill Pain Questionnaire Model
export interface McGillPainQuestionnaireModel {
  enabled: boolean;
  score?: string;
  completed?: boolean;
  followupPlan?: string;
}

// Wong-Baker FACES Pain Rating Scale Model
export interface WongBakerModel {
  enabled: boolean;
  score?: string;
  followupPlan?: string;
}

// Pain Disability Index Model
export interface PainDisabilityIndexModel {
  enabled: boolean;
  score?: string;
  followupPlan?: string;
}

// Croft Disability Questionnaire Model
export interface CroftDisabilityQuestionnaireModel {
  enabled: boolean;
  score?: string;
  followupPlan?: string;
}

// FABQ Model
export interface FabqModel {
  enabled: boolean;
  scale1?: string;
  scale2?: string;
  followupPlan?: string;
}

// Pain Model
export interface PainModel {
  enabled: boolean;
  mcgillPainQuestionnaire?: McGillPainQuestionnaireModel;
  wongBaker?: WongBakerModel;
  painDisabilityIndex?: PainDisabilityIndexModel;
  croftDisabilityQuestionnaire?: CroftDisabilityQuestionnaireModel;
  fabq?: FabqModel;
}

// General Function Model
export interface GeneralFunctionModel {
  enabled: boolean;
  // TODO: Add general function fields
}

// Main Outcome Measurement Tools Model
export interface OutcomeMeasurementToolsModel {
  customOutcomeMeasurement: CustomOutcomeMeasurementModel;
  vestibular: VestibularModel;
  upperExtremity: UpperExtremityModel;
  spine: SpineModel;
  lowerExtremity: LowerExtremityModel;
  balance: BalanceModel;
  pain: PainModel;
  generalFunction: GeneralFunctionModel;
}
