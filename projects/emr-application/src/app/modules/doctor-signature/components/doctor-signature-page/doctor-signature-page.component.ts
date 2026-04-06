import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { SignatureService } from '../../../common/service/signature/signature.service';
import { ConsentService } from '../../../common/service/signature/consent.service';
import {
  SignatureTokenValidationResponse,
  SignatureOutput,
  ConsentTextResponse,
  ConsentAcknowledgment
} from '../../../common/models/signature/signature.model';

export enum SignatureStep {
  WELCOME = 0,
  OTP = 1,
  CAPTURE = 2,
  REVIEW = 3,
  SUCCESS = 4
}

@Component({
  selector: 'app-doctor-signature-page',
  templateUrl: './doctor-signature-page.component.html',
  styleUrls: ['./doctor-signature-page.component.css']
})
export class DoctorSignaturePageComponent implements OnInit {
  currentStep = SignatureStep.WELCOME;
  readonly SignatureStep = SignatureStep;

  token = '';
  userUuid = '';
  loading = false;
  submitting = false;
  errorMessage = '';

  tokenData: SignatureTokenValidationResponse | null = null;
  signatureOutput: SignatureOutput | null = null;

  // Consent state
  consentText: ConsentTextResponse | null = null;
  consentLoading = true;
  consentError = '';
  consentAcknowledged = false;
  consentAcknowledgment: ConsentAcknowledgment | null = null;
  private displayStartedAt = 0;
  private checkboxCheckedAt = 0;

  // OTP state
  maskedPhone = '';

  steps = [
    { label: 'Welcome', icon: 'check' },
    { label: 'Verify', icon: 'lock' },
    { label: 'Capture', icon: 'edit' },
    { label: 'Review', icon: 'eye' },
    { label: 'Complete', icon: 'award' }
  ];

  constructor(
    private route: ActivatedRoute,
    private signatureService: SignatureService,
    private consentService: ConsentService,
    private keycloakService: KeycloakService
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
    this.userUuid = this.keycloakService.getKeycloakInstance()?.tokenParsed?.sub || '';
    if (this.token) {
      this.validateToken();
      this.loadConsentText();
    } else {
      this.errorMessage = 'No signature token provided. Please use the link from your email.';
    }
  }

  private validateToken(): void {
    this.loading = true;
    this.errorMessage = '';
    this.signatureService.validateToken(this.token).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.valid) {
          this.tokenData = response;
        } else {
          this.errorMessage = 'This signature link is invalid or has expired. Please contact your administrator.';
        }
      },
      error: (error) => {
        this.loading = false;
        if (error.status === 404 || error.status === 400) {
          this.errorMessage = 'This signature link is invalid or has expired. Please contact your administrator.';
        } else {
          this.errorMessage = 'Unable to validate your signature link. Please try again later.';
        }
      }
    });
  }

  private loadConsentText(): void {
    this.displayStartedAt = Date.now();
    this.consentService.getCurrentConsentText().subscribe({
      next: (response) => {
        this.consentText = response;
        this.consentLoading = false;
      },
      error: () => {
        this.consentError = 'Failed to load consent text. Please refresh the page.';
        this.consentLoading = false;
      }
    });
  }

  onConsentChange(): void {
    if (this.consentAcknowledged) {
      this.checkboxCheckedAt = Date.now();
    }
  }

  private buildConsentAcknowledgment(): ConsentAcknowledgment {
    return {
      acknowledged: true,
      timestamp: this.checkboxCheckedAt,
      textVersion: this.consentText!.versionCode,
      textHash: this.consentText!.textHash,
      method: 'CHECKBOX_CLICK',
      displayStartedAt: this.displayStartedAt,
      displayDurationMs: this.checkboxCheckedAt - this.displayStartedAt
    };
  }

  startCapture(): void {
    if (!this.tokenData || !this.consentAcknowledged || !this.consentText) return;
    this.errorMessage = '';

    this.consentAcknowledgment = this.buildConsentAcknowledgment();

    const phone = this.tokenData.doctorPhone;
    this.maskedPhone = this.maskPhone(phone);
    this.signatureService.sendOtp(this.userUuid, phone).subscribe({
      next: () => {
        this.currentStep = SignatureStep.OTP;
      },
      error: (error) => {
        this.errorMessage = error?.error?.message || 'Failed to send verification code. Please try again.';
      }
    });
  }

  private maskPhone(phone: string): string {
    if (!phone || phone.length < 4) return phone;
    const last4 = phone.slice(-4);
    const masked = phone.slice(0, -4).replace(/\d/g, '*');
    return masked + last4;
  }

  onOtpVerified(): void {
    this.currentStep = SignatureStep.CAPTURE;
  }

  onOtpCancel(): void {
    this.currentStep = SignatureStep.WELCOME;
  }

  onSignatureSubmit(output: SignatureOutput): void {
    this.signatureOutput = output;
    this.currentStep = SignatureStep.REVIEW;
  }

  onSignatureCancel(): void {
    this.signatureOutput = null;
    this.currentStep = SignatureStep.WELCOME;
  }

  goBackToCapture(): void {
    this.currentStep = SignatureStep.CAPTURE;
  }

  confirmSubmission(): void {
    if (!this.signatureOutput || !this.token || !this.consentAcknowledgment) return;

    this.submitting = true;
    this.errorMessage = '';

    this.signatureService.submitSignature({
      token: this.token,
      signatureData: this.signatureOutput.dataUrl,
      metadata: this.signatureOutput.metadata,
      consent: this.consentAcknowledgment
    }).subscribe({
      next: () => {
        this.submitting = false;
        this.currentStep = SignatureStep.SUCCESS;
      },
      error: (error) => {
        this.submitting = false;
        if (error.status === 409) {
          this.errorMessage = 'A signature has already been submitted for this account.';
        } else {
          this.errorMessage = 'Failed to submit your signature. Please try again.';
        }
      }
    });
  }

  get consentParts(): { intro: string; items: string[] } | null {
    if (!this.consentText) return null;
    const text = this.consentText.text;

    // Only split if text contains at least two numbered items (e.g. "1. ... 2. ...")
    const matches = text.match(/\d+\.\s/g);
    if (!matches || matches.length < 2) return null;

    const parts = text.split(/(?=\d+\.\s)/);
    const firstPart = parts[0]?.trim();
    const startsWithNumber = /^\d+\.\s/.test(firstPart);

    const intro = startsWithNumber ? '' : firstPart;
    const itemParts = startsWithNumber ? parts : parts.slice(1);
    const items = itemParts
      .map(item => item.replace(/^\d+\.\s*/, '').trim())
      .filter(item => item.length > 0);

    if (items.length < 2) return null;

    return { intro, items };
  }

  get progressPercentage(): number {
    return ((this.currentStep + 1) / this.steps.length) * 100;
  }
}
