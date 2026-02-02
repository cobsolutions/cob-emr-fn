import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SignatureOutput, SignaturePadConfig, DEFAULT_SIGNATURE_PAD_CONFIG } from '../../models/signature/signature.model';

@Component({
  selector: 'app-signing-ceremony',
  templateUrl: './signing-ceremony.component.html',
  styleUrls: ['./signing-ceremony.component.css']
})
export class SigningCeremonyComponent {
  @Input() purpose = 'digital signature capture';
  @Input() signerName = '';
  @Input() config: SignaturePadConfig = DEFAULT_SIGNATURE_PAD_CONFIG;
  @Input() submitLabel = 'Submit Signature';
  @Input() submitting = false;

  @Output() signatureSubmit = new EventEmitter<SignatureOutput>();
  @Output() signatureCancel = new EventEmitter<void>();

  signatureOutput: SignatureOutput | null = null;
  acknowledged = false;
  currentTimestamp = '';

  constructor() {
    this.updateTimestamp();
  }

  onSignatureOutput(output: SignatureOutput | null): void {
    this.signatureOutput = output;
    this.updateTimestamp();
  }

  onSubmit(): void {
    if (this.signatureOutput && this.acknowledged) {
      this.signatureSubmit.emit(this.signatureOutput);
    }
  }

  onCancel(): void {
    this.signatureCancel.emit();
  }

  private updateTimestamp(): void {
    this.currentTimestamp = new Date().toLocaleString();
  }

  get canSubmit(): boolean {
    return !!this.signatureOutput && this.acknowledged && !this.submitting;
  }
}
