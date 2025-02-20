import { Dependent } from "./dependent"

export interface Field{
    name:string, 
    value:string
    dependents:Dependent[]
}