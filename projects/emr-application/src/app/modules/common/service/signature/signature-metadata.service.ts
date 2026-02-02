import { Injectable } from '@angular/core';
import { SignatureCaptureMethod } from '../../models/signature/signature-capture-method.enum';
import { SignatureMetadata } from '../../models/signature/signature.model';
import { SignatureHashService } from './signature-hash.service';

@Injectable({
  providedIn: 'root'
})
export class SignatureMetadataService {

  constructor(private hashService: SignatureHashService) {}

  buildMetadata(
    dataUrl: string,
    captureMethod: SignatureCaptureMethod,
    extras?: Partial<SignatureMetadata>
  ): SignatureMetadata {
    const sha256Hash = this.hashService.computeSha256(dataUrl);
    const metadata: SignatureMetadata = {
      captureMethod,
      capturedAt: new Date().toISOString(),
      userAgent: navigator.userAgent,
      screenResolution: `${screen.width}x${screen.height}`,
      devicePixelRatio: window.devicePixelRatio || 1,
      platform: navigator.platform,
      sha256Hash,
      ...extras
    };
    return metadata;
  }
}
