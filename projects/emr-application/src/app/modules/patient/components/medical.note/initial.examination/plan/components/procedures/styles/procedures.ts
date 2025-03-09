import { FieldControlStyles } from "../../../../../filed.control.style.selector/field.control.style";
import { TherapeuticActivityStyles } from "./therapeutic.activity";
import { TherapeuticExercisesStyles } from "./therapeutic.exercises";

export const ProceduresStyles: FieldControlStyles[] = [
    ...TherapeuticExercisesStyles,
    ...TherapeuticActivityStyles
]