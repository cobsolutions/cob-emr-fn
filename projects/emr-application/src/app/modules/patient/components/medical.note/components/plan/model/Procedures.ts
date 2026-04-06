export interface Procedures {
  procedureTherapeuticExercises: boolean;
  procedureTherapeuticExercisesNotes: string;
  // Therapeutic Exercises children
  procedureRom: boolean;
  procedureStrength: boolean;
  procedureEndurance: boolean;
  procedureStability: boolean;
  procedureTherapeuticActivity: boolean;
  procedureTherapeuticActivityNotes: string;
  // Therapeutic Activity children
  procedureWorkSpecific: boolean;
  procedureSportSpecific: boolean;
  procedureTransfers: boolean;
  procedureBedMobility: boolean;
  procedureAdlSpecific: boolean;
  procedureGaitTraining: boolean;
  procedureGaitTrainingNotes: string;
  // Gait Training children
  procedure4PointWalker?: boolean;
  procedureFrontWheelWalker?: boolean;
  procedure4WheelWalker?: boolean;
  procedureHemiWalker?: boolean;
  procedureQuadCane?: boolean;
  procedure1PointCane?: boolean;
  procedure2AxillaryCrutches?: boolean;
  procedure1AxillaryCrutch?: boolean;
  procedure2ForearmCrutches?: boolean;
  procedure1ForearmCrutches?: boolean;
  procedureEvenSurfaces?: boolean;
  procedureUnevenSurfaces?: boolean;
  procedureStairs?: boolean;
  procedureCurbs?: boolean;
  procedureNeuromuscularRehabilitation: boolean;
  procedureNeuromuscularRehabilitationNotes: string;
  // Neuromuscular Rehabilitation children
  procedureBalanceProprioceptionTraining?: boolean;
  procedureMuscleReEducation?: boolean;
  procedureSequencing?: boolean;
  procedureCoordination?: boolean;
  procedurePnf?: boolean;
  procedureRedcordNeurac?: boolean;
  procedureManualTherapy: boolean;
  procedureManualTherapyNotes: string;
  // Manual Therapy children
  procedureSoftTissueMobilization?: boolean;
  procedureJointMobilization?: boolean;
  procedureSpinalMobilization?: boolean;
  procedureManualTraction?: boolean;
  procedureMyofascialRelease?: boolean;
  procedureMuscleEnergyTechniques?: boolean;
  procedureManualResistiveExercise?: boolean;
  procedurePatellarMobs?: boolean;
  procedureCranioSacral?: boolean;
  procedureVisceralManipulation?: boolean;
  procedureDryNeedling?: boolean;
  procedureGrastonOrAstym?: boolean;
  procedureStrainCounterstrain?: boolean;
  procedureMassage: boolean;
  procedureMassageNotes: string;
  // Massage children
  procedureMassageType?: string;
  procedureManualLymphaticDrainage?: boolean;
  procedureAquaticTherapy: boolean;
  procedureAquaticTherapyNotes: string;
  procedureSplintingTaping: boolean;
  procedureSplintingTapingNotes: string;
  // Splinting/Taping children
  procedureTapingMethod?: string;
  procedureCanalithRepositioning: boolean;
  procedureCanalithRepositioningNotes: string;
  procedureWoundCareDebridement?: boolean;
  procedureWoundCareDebridementNotes?: string;
  procedureIontophoresis?: boolean;
  procedureIontophoresisNotes?: string;
  // Iontophoresis children
  procedureDexamethasone?: boolean;
  procedureLidocaine?: boolean;
  procedureMarcaine?: boolean;
  procedureAceticAcid?: boolean;
  procedureIodine?: boolean;
  procedureGroupTherapy: boolean;
  procedureGroupTherapyNotes: string;
  procedureLymphedema?: boolean;
  procedureLymphedemaNotes?: string;
  procedureCardiacRehabilitation?: boolean;
  procedureCardiacRehabilitationNotes?: string;
  procedureVestibularRehabilitation?: boolean;
  procedureVestibularRehabilitationNotes?: string;
  procedurePatientEducation: boolean;
  procedurePatientEducationNotes: string;
  // Patient Education children
  procedureHomeExerciseProgram?: boolean;
  procedurePosturalTraining?: boolean;
  procedureErgonomics?: boolean;
  procedureLiftingMechanics?: boolean;
  procedureTensUse?: boolean;
  procedureActivityModification?: boolean;
  procedureHomeSafety?: boolean;
  procedureSelfCare?: boolean;
  procedureSelfCareNotes?: string;
  procedureCognition?: boolean;
  procedureCognitionNotes?: string;
  procedureRemoteTherapeuticMonitoring: boolean;
  procedureRemoteTherapeuticMonitoringNotes: string;
}
