export interface Dependent {
    id: number,
    name: string,
    type: string,
    select_values?: string[]
    style: string
    label_style?: string
    display: string
    value?: any,
    secondValue?: any,
    extra?: any,
    dependents?: Dependent[]
    secondDependents?: Dependent[]
}