// Consent Models
export interface ConsentModel {
  patientConsent: string;
  patientParentGuardianConsent?: string;
}

export interface ChaperoneModel {
  chaperone: string;
  chaperonePresent?: string;
}

// Girth Measurement Models
export interface GirthMeasurementModel {
  right: string;
  left: string;
}

export interface GirthMeasurementUpperModel {
  enabled: boolean;
  upperArm?: GirthMeasurementModel;
  midBiceps?: GirthMeasurementModel;
  elbowFlexionCrease?: GirthMeasurementModel;
  forearm?: GirthMeasurementModel;
  wrist?: GirthMeasurementModel;
}

export interface GirthMeasurementLowerModel {
  enabled: boolean;
  midPatella?: GirthMeasurementModel;
  midThigh?: GirthMeasurementModel;
  midCalf?: GirthMeasurementModel;
  midMalleoli?: GirthMeasurementModel;
  ankleFigure8?: GirthMeasurementModel;
  midFoot?: GirthMeasurementModel;
  metatarsalHeads?: GirthMeasurementModel;
}

// Post Operative/Wound Healing Models
export interface IncisionSitesModel {
  value: string;
}

export interface SurgicalPrecautionsModel {
  enabled: boolean;
  select?: string;
}

export interface ScarMobilityModel {
  enabled: boolean;
  text?: string;
}

export interface ScarTypeModel {
  enabled: boolean;
  select?: string;
}

export interface WoundDescriptionModel {
  enabled: boolean;
  text?: string;
}

export interface WoundMeasurementsModel {
  enabled: boolean;
  length?: string;
  width?: string;
}

export interface PostOperativeWoundHealingModel {
  enabled: boolean;
  incisionSites?: IncisionSitesModel;
  surgicalPrecautions?: SurgicalPrecautionsModel;
  scarMobility?: ScarMobilityModel;
  scarType?: ScarTypeModel;
  woundDescription?: WoundDescriptionModel;
  woundMeasurements?: WoundMeasurementsModel;
}

// Surface Culture Models
export interface SurfaceCultureFieldsModel {
  levine: boolean;
  deepSwab: boolean;
  semiquantitative: boolean;
  quantitative: boolean;
  reasoning: string;
}

export interface SurfaceCultureTechniqueModel {
  technique: string;
}

export interface SurfaceCultureModel {
  surfaceCultureUsed: string; // 'na' | 'yes' | 'no'
  fields?: SurfaceCultureFieldsModel;
  techniqueUtilized?: SurfaceCultureTechniqueModel;
}

export interface WoundCareModel {
  enabled: boolean;
  surfaceCulture?: SurfaceCultureModel;
}

// Surgical Scarring Model
export interface SurgicalScarringModel {
  enabled: boolean;
  selections?: string[];
}

// Body Mass Index Model
export interface BodyMassIndexModel {
  enabled: boolean;
  weight?: string;
  height?: string;
  units?: string; // 'lbs_in' | 'kg_cm'
  index?: string;
  followupPlan?: string;
}

// Additional Comments Model
export interface AdditionalCommentsModel {
  enabled: boolean;
  text?: string;
}

// Main Inspection Model
export interface InspectionModel {
  consent: ConsentModel;
  chaperone: ChaperoneModel;
  inspection: string;
  girthMeasurementUpper: GirthMeasurementUpperModel;
  girthMeasurementLower: GirthMeasurementLowerModel;
  postOperativeWoundHealing: PostOperativeWoundHealingModel;
  woundCare: WoundCareModel;
  surgicalScarring: SurgicalScarringModel;
  bodyMassIndex: BodyMassIndexModel;
  additionalComments: AdditionalCommentsModel;
}
