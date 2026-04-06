import { PainEvaluation } from ".";

export interface Pain {
    painScale?: boolean;
    painEvaluations?: PainEvaluation[];
    aggravatingFactors?: string[];
    restrictionsPainAlleviators?: boolean;
    restrictionsPainAlleviatorsText?: string;
}
