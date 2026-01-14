export interface Modalities {
  modalitiesPainRelief: boolean;
  modalitiesPainReliefNotes: string;
  modalitiesDecreaseInflammation: boolean;
  modalitiesDecreaseInflammationNotes: string;
  modalitiesIncreaseBloodFlow: boolean;
  modalitiesIncreaseBloodFlowNotes: string;
  modalitiesImproveTissueHealing: boolean;
  modalitiesImproveTissueHealingNotes: string;
  modalitiesElectricalStimulation: boolean;
  modalitiesElectricalStimulationNotes: string;
  // Electrical Stimulation children
  modalitiesPreModulated?: boolean;
  modalitiesHighVolt?: boolean;
  modalitiesInterferential?: boolean;
  modalitiesRussian?: boolean;
  modalitiesOther?: boolean;
  modalitiesUltrasoundPhonophoresis: boolean;
  modalitiesUltrasoundPhonophoresisNotes: string;
  // Ultrasound/Phonophoresis children
  modalities1mhz?: boolean;
  modalities2mhz?: boolean;
  modalities3mhz?: boolean;
  modalitiesIntensity?: string;
  modalitiesDutyCycle?: string;
  modalitiesDuration?: string;
  modalitiesLaser: boolean;
  modalitiesLaserNotes: string;
  // Laser children
  modalitiesColdLaser?: boolean;
  modalitiesClass4Laser?: boolean;
  modalitiesInfraredLight: boolean;
  modalitiesInfraredLightNotes: string;
  // Infrared Light children
  modalitiesInfraredLightDuration?: string;
  modalitiesDiathermy: boolean;
  modalitiesDiathermyNotes: string;
  // Diathermy children
  modalitiesDiathermyLightDuration?: string;
  modalitiesUltraviolet: boolean;
  modalitiesUltravioletNotes: string;
  // Ultraviolet children
  modalitiesUltravioletLightDuration?: string;
  modalitiesVasopneumatic: boolean;
  modalitiesVasopneumaticNotes: string;
  // Vasopneumatic children
  modalitiesVasopneumaticLightDuration?: string;
  modalitiesBiofeedbackTraining?: boolean;
  modalitiesBiofeedbackTrainingNotes?: string;
  // Biofeedback Training children
  modalitiesBiofeedbackTrainingLightDuration?: string;
  modalitiesWhirlpool: boolean;
  modalitiesWhirlpoolNotes: string;
  // Whirlpool children
  modalitiesWhirlpoolWarm?: boolean;
  modalitiesWhirlpoolCold?: boolean;
  modalitiesWhirlpoolDuration?: string;
  modalitiesParaffinBath: boolean;
  modalitiesParaffinBathNotes: string;
  // Paraffin Bath children
  modalitiesParaffinBathDuration?: string;
  modalitiesCryotherapy: boolean;
  modalitiesCryotherapyNotes: string;
  // Cryotherapy children
  modalitiesCryotherapyIcePack?: boolean;
  modalitiesCryotherapyIceMassage?: boolean;
  modalitiesCryotherapyDuration?: string;
  modalitiesHotPacks: boolean;
  modalitiesHotPacksNotes: string;
  // Hot Packs children
  modalitiesHotPacksDuration?: string;
  modalitiesMechanicalTraction: boolean;
  modalitiesMechanicalTractionNotes: string;
  // Mechanical Traction children
  modalitiesMechanicalCervical?: boolean;
  modalitiesMechanicalLumbar?: boolean;
}
