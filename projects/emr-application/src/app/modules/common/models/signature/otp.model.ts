export interface OtpSendRequest {
  doctorUuid: string;
  phone: string;
}

export interface OtpVerifyRequest {
  doctorUuid: string;
  code: string;
}
