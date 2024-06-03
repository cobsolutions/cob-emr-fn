import { Address } from "../../../common/models";

export interface InsuranceCompany {
  id: number | null;
  name: string | null;
  insuranceType: string | null;
  phone: string | null;
  fax: string | null;
  addresses: Address[];
  organizationId?:number
}