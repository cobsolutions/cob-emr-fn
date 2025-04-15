import { FieldControlStyles } from "../../../../../filed.control.style.selector/field.control.style";
import { AquaticTherapyStyles } from "./aquatic-therapy";
import { CanalithRepositioningStyles } from "./canalith-repositioning";
import { CardiacRehabilitationStyles } from "./cardiac-rehabilitation";
import { CognitionStyles } from "./cognition";
import { GaitTrainingStyles } from "./gait.training";
import { GroupTherapyStyles } from "./group-therapy";
import { IontophoresisStyles } from "./iontophoresis";
import { LymphedemaStyles } from "./lymphedema";
import { ManualTherapyStyles } from "./manual-therapy";
import { MassageStyles } from "./massage";
import { NeuromuscularRehabilitationStyles } from "./neuromuscular-rehabilitation";
import { PatientEducationStyles } from "./patient-education";
import { PositionalNystagmusTestMinimum4PositionsWithRecordingStyles } from "./positional-nystagmus-test-minimum-4-positions-wrecording";
import { RemoteTherapeuticMonitoringStyles } from "./remote-therapeutic-monitoring";
import { SelfCareStyles } from "./self-care";
import { SplintingTapingStyles } from "./splintingtaping";
import { SpontaneousNystagmusTestWithGazeAndFixationNystagmusWithRecordingStyles } from "./spontaneous-nystagmus-test-wgaze-fixation-nystagmus-wrecording";
import { TherapeuticActivityStyles } from "./therapeutic.activity";
import { TherapeuticExercisesStyles } from "./therapeutic.exercises";
import { VestibularRehabilitationStyles } from "./vestibular-rehabilitation";
import { WoundCareDebridementStyles } from "./wound-caredebridement";

export const ProceduresStyles: FieldControlStyles[] = [
    ...TherapeuticExercisesStyles,
    ...TherapeuticActivityStyles,
    ...GaitTrainingStyles,
    ...NeuromuscularRehabilitationStyles,
    ...ManualTherapyStyles,
    ...MassageStyles,
    ...AquaticTherapyStyles,
    ...SplintingTapingStyles,
    ...CanalithRepositioningStyles,
    ...PositionalNystagmusTestMinimum4PositionsWithRecordingStyles,
    ...SpontaneousNystagmusTestWithGazeAndFixationNystagmusWithRecordingStyles,
    ...WoundCareDebridementStyles,
    ...IontophoresisStyles,
    ...GroupTherapyStyles,
    ...LymphedemaStyles,
    ...CardiacRehabilitationStyles,
    ...VestibularRehabilitationStyles,
    ...PatientEducationStyles,
    ...SelfCareStyles,
    ...CognitionStyles,
    ...RemoteTherapeuticMonitoringStyles
]