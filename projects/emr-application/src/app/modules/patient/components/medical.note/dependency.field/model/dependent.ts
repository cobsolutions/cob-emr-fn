export interface Dependent {
    id: number,
    name: string,
    type: string,
    style: string
    label_style?: string
    display: string
    value?: any
    parent?: string
    dependents?: Dependent[]
}