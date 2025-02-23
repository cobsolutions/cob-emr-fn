import { Dependent } from "./dependent"

export interface Field {
    name: string,
    value: string
    secondValue?: any,
    dependents: Dependent[],
    secondDependents?: Dependent[]
}