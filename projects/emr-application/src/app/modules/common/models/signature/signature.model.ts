import { SignatureCaptureMethod } from './signature-capture-method.enum';

export interface SignatureMetadata {
  captureMethod: SignatureCaptureMethod;
  capturedAt: string;
  userAgent: string;
  screenResolution: string;
  devicePixelRatio: number;
  platform: string;
  canvasWidth?: number;
  canvasHeight?: number;
  strokeCount?: number;
  fontFamily?: string;
  fileName?: string;
  fileSize?: number;
  sha256Hash: string;
}

export interface SignatureOutput {
  dataUrl: string;
  metadata: SignatureMetadata;
}

export interface SignaturePadConfig {
  width?: number;
  height?: number;
  penColor?: string;
  backgroundColor?: string;
  minWidth?: number;
  maxWidth?: number;
  maxUploadSizeMB?: number;
  allowedFileTypes?: string[];
}

export const DEFAULT_SIGNATURE_PAD_CONFIG: SignaturePadConfig = {
  width: 600,
  height: 200,
  penColor: '#000033',
  backgroundColor: 'rgba(0,0,0,0)',
  minWidth: 0.5,
  maxWidth: 2.5,
  maxUploadSizeMB: 5,
  allowedFileTypes: ['image/png', 'image/jpeg', 'image/svg+xml']
};

export interface SignatureTokenValidationResponse {
  valid: boolean;
  doctorUuid: string;
  doctorName: string;
  doctorEmail: string;
  doctorPhone: string;
  purpose: string;
  expiresAt: string;
}

// Backend consent text response
export interface ConsentTextResponse {
  versionCode: string;
  title: string;
  text: string;
  textHash: string;
}

// Consent acknowledgment captured during signing ceremony
export interface ConsentAcknowledgment {
  acknowledged: boolean;
  timestamp: number;           // Epoch ms – when checkbox clicked
  textVersion: string;         // versionCode from backend
  textHash: string;            // textHash from backend
  method: string;              // ConsentMethod enum value, e.g. 'CHECKBOX_CLICK'
  displayStartedAt: number;    // Epoch ms – when consent screen appeared
  displayDurationMs: number;   // Time between display and acknowledgment (ms)
}

export interface SignatureSubmitRequest {
  token: string;
  signatureData: string;
  metadata: SignatureMetadata;
  consent: ConsentAcknowledgment;
}

export interface SignatureSubmitResponse {
  success: boolean;
  message: string;
}
