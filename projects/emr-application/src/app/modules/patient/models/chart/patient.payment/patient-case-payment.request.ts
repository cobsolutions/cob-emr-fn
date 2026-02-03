export interface PatientCasePayment {
  id?: number;
  uuid?: string;
  dateOfTransaction?: string;
  paymentMethod?: string;
  providerId?: string;
  dateOfService?: string;
  chargeType?: ChargeType;
  amountDue?: number;
  description?: string;
  patientCaseId?: number;
  paid?: boolean;
}

export interface PatientCasePaymentResponse {
  payments: PatientCasePayment[];
  totalCharge: number;
  totalPaid: number;
  balance: number;
}

export enum ChargeType {
  COPAY = 'COPAY',
  DEDUCTIBLE = 'DEDUCTIBLE',
  COINSURANCE = 'COINSURANCE',
  SUPPLIES = 'SUPPLIES',
  WELLNESS = 'WELLNESS',
  INTERNAL_PAYMENT = 'INTERNAL_PAYMENT',
  PAYMENT_ON_ACCOUNT = 'PAYMENT_ON_ACCOUNT',
  OTHER = 'OTHER'
}
