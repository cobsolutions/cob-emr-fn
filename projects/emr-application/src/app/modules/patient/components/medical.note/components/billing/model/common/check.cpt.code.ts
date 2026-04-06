export interface SubItem {
    name: string;
    isCheck: boolean;
}

export interface CheckCPTCode{
    code?:string
    isCheck?:boolean,
    note?:string,
    subItems?: SubItem[]
}