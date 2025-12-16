// Body Type Model
export interface BodyTypeModel {
  enabled: boolean;
  bodyType?: string; // 'mesomorph' | 'endomorph' | 'ectomorph'
}

// Vitals Models
export interface BloodPressureModel {
  enabled: boolean;
  orthostaticRisk?: boolean;
  arm?: string;
  systolic?: string;
  diastolic?: string;
  location?: string;
  position?: string;
}

export interface TemperatureModel {
  enabled: boolean;
}

export interface PulseModel {
  enabled: boolean;
  value?: string;
  bpmType?: string; // 'bpm_radial' | 'bpm_carotid' | 'bpm_posterior'
  right?: string;
  left?: string;
}

export interface RespirationModel {
  enabled: boolean;
  selections?: string[];
  comments?: string;
}

export interface WeightModel {
  enabled: boolean;
  value?: string;
  unit?: string; // 'lbs' | 'kg'
}

export interface VitalsModel {
  enabled: boolean;
  bloodPressure?: BloodPressureModel;
  temperature?: TemperatureModel;
  pulse?: PulseModel;
  respiration?: RespirationModel;
  weight?: WeightModel;
}

// ADL Management Models
export interface ADLItemModel {
  value: string; // 'no' | 'yes'
  status?: string; // 'independent' | 'requires_assistance' | 'dependent'
}

export interface ADLManagementModel {
  enabled: boolean;
  bathing?: ADLItemModel;
  toileting?: ADLItemModel;
  dressing?: ADLItemModel;
  grooming?: ADLItemModel;
  eating?: ADLItemModel;
}

// Breathing at Rest Model
export interface BreathingAtRestModel {
  enabled: boolean;
  apical?: boolean;
  diaphragmatically?: boolean;
  shortenedInhalation?: boolean;
  asymmetricalRibExcursion?: boolean;
  decreasedRibMotion?: boolean;
  useOfAccessoryMuscles?: boolean;
  comments?: string;
}

// Transfers Models
export interface TransferItemModel {
  value: string; // 'no' | 'yes'
  status?: string; // 'independent' | 'requires_assistance' | 'dependent'
  comments?: string;
}

export interface TransfersModel {
  enabled: boolean;
  supineToSit?: TransferItemModel;
  sitToStand?: TransferItemModel;
  toiletTransfers?: TransferItemModel;
}

// Cast/Splint Models
export interface CastSplintInstanceModel {
  type?: string;
  complaintsWithUse?: string;
  dateApplied?: string;
  dateRemoved?: string;
  comments?: string;
}

export interface CastSplintModel {
  enabled: boolean;
  instance1?: CastSplintInstanceModel;
  instance2?: CastSplintInstanceModel;
}

// Standing Posture Model
export interface StandingPostureModel {
  enabled: boolean;
  selections?: string[];
  comments?: string;
}

// Protracted Scapulas Model
export interface ProtractedScapulasModel {
  enabled: boolean;
  right?: string;
  left?: string;
}

// Scoliosis Model
export interface ScoliosisModel {
  enabled: boolean;
  type?: string;
  curvature?: string;
}

// Lower Extremity Structure Models
export interface LowerExtremityMeasurementModel {
  right: string;
  left: string;
}

export interface LowerExtremityStructureModel {
  enabled: boolean;
  genuValgus?: LowerExtremityMeasurementModel;
  genuVarus?: LowerExtremityMeasurementModel;
  tibialTorsion?: LowerExtremityMeasurementModel;
  genuRecurvatum?: LowerExtremityMeasurementModel;
  footPronation?: LowerExtremityMeasurementModel;
  footSupination?: LowerExtremityMeasurementModel;
  femoralAnteversion?: LowerExtremityMeasurementModel;
  femoralRetroversion?: LowerExtremityMeasurementModel;
  dyskineticLEChain?: LowerExtremityMeasurementModel;
  patellarPosition?: LowerExtremityMeasurementModel;
  calcanealExostosis?: LowerExtremityMeasurementModel;
  calcanealValgus?: LowerExtremityMeasurementModel;
  calcanealVarus?: LowerExtremityMeasurementModel;
  halluxValgus?: LowerExtremityMeasurementModel;
}

// Gait Model
export interface GaitModel {
  enabled: boolean;
  selections?: string[];
  comments?: string;
}

// 6 Minute Walk Test Models
export interface SixMinuteWalkRowModel {
  sp02?: string;
  heartRate?: string;
  respiratoryRate?: string;
  borgScale?: string;
  distance?: string;
}

export interface SixMinuteWalkTestModel {
  enabled: boolean;
  rest?: SixMinuteWalkRowModel;
  min1?: SixMinuteWalkRowModel;
  min2?: SixMinuteWalkRowModel;
  min3?: SixMinuteWalkRowModel;
  min4?: SixMinuteWalkRowModel;
  min5?: SixMinuteWalkRowModel;
  min6?: SixMinuteWalkRowModel;
  comments?: string;
}

// Assistive Device Model
export interface AssistiveDeviceModel {
  enabled: boolean;
  type?: string;
  handUsed?: string;
  comments?: string;
}

// Immobilizer Model
export interface ImmobilizerModel {
  enabled: boolean;
  type?: string;
  compliantWithUse?: string; // 'no' | 'yes'
}

// Muscular Asymmetries Model
export interface MuscularAsymmetriesModel {
  enabled: boolean;
  description?: string;
}

// Muscle Guarding Model
export interface MuscleGuardingModel {
  enabled: boolean;
  value?: string;
}

// Muscle Atrophy Model
export interface MuscleAtrophyModel {
  enabled: boolean;
  description?: string;
}

// Edema Model
export interface EdemaModel {
  enabled: boolean;
  description?: string;
  pitting?: string; // 'no' | 'yes'
}

// Apprehension of Movement Model
export interface ApprehensionOfMovementModel {
  enabled: boolean;
  value?: string;
}

// Additional Comments Model
export interface AdditionalCommentsModel {
  enabled: boolean;
  text?: string;
}

// Main Observation Model
export interface ObservationModel {
  bodyType: BodyTypeModel;
  vitals: VitalsModel;
  adlManagement: ADLManagementModel;
  breathingAtRest: BreathingAtRestModel;
  transfers: TransfersModel;
  castSplint: CastSplintModel;
  standingPosture: StandingPostureModel;
  protractedScapulas: ProtractedScapulasModel;
  scoliosis: ScoliosisModel;
  lowerExtremityStructure: LowerExtremityStructureModel;
  gait: GaitModel;
  sixMinuteWalkTest: SixMinuteWalkTestModel;
  assistiveDevice: AssistiveDeviceModel;
  immobilizer: ImmobilizerModel;
  muscularAsymmetries: MuscularAsymmetriesModel;
  muscleGuarding: MuscleGuardingModel;
  muscleAtrophy: MuscleAtrophyModel;
  edema: EdemaModel;
  apprehensionOfMovement: ApprehensionOfMovementModel;
  additionalComments: AdditionalCommentsModel;
}
