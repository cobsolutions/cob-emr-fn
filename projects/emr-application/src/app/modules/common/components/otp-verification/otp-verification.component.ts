import {
  Component, Input, Output, EventEmitter, OnInit, OnDestroy,
  ViewChildren, QueryList, ElementRef
} from '@angular/core';
import { SignatureService } from '../../service/signature/signature.service';
import { ConsentAcknowledgment } from '../../models/signature/signature.model';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css']
})
export class OtpVerificationComponent implements OnInit, OnDestroy {
  @Input() doctorUuid = '';
  @Input() phone = '';
  @Input() maskedPhone = '';
  @Input() consent: ConsentAcknowledgment | null = null;
  @Input() expiresInSeconds = 300;

  @Output() otpVerified = new EventEmitter<void>();
  @Output() otpCancel = new EventEmitter<void>();

  @ViewChildren('digitInput') digitInputs!: QueryList<ElementRef<HTMLInputElement>>;

  digits: string[] = ['', '', '', '', '', ''];
  verifying = false;
  errorMessage = '';
  expired = false;
  locked = false;

  // Timers
  expirySeconds = 0;
  resendCooldown = 0;
  lockoutSeconds = 0;

  private expiryTimer: any;
  private resendTimer: any;
  private lockoutTimer: any;

  // Animation state
  shake = false;

  constructor(private signatureService: SignatureService) {}

  ngOnInit(): void {
    this.startExpiryCountdown();
    this.startResendCooldown();
  }

  ngOnDestroy(): void {
    this.clearAllTimers();
  }

  private clearAllTimers(): void {
    clearInterval(this.expiryTimer);
    clearInterval(this.resendTimer);
    clearInterval(this.lockoutTimer);
  }

  private startExpiryCountdown(): void {
    this.expirySeconds = this.expiresInSeconds;
    this.expired = false;
    clearInterval(this.expiryTimer);
    this.expiryTimer = setInterval(() => {
      this.expirySeconds--;
      if (this.expirySeconds <= 0) {
        this.expirySeconds = 0;
        this.expired = true;
        this.errorMessage = 'The verification code has expired. Please request a new one.';
        clearInterval(this.expiryTimer);
      }
    }, 1000);
  }

  private startResendCooldown(): void {
    this.resendCooldown = 60;
    clearInterval(this.resendTimer);
    this.resendTimer = setInterval(() => {
      this.resendCooldown--;
      if (this.resendCooldown <= 0) {
        this.resendCooldown = 0;
        clearInterval(this.resendTimer);
      }
    }, 1000);
  }

  private startLockoutCountdown(seconds: number): void {
    this.lockoutSeconds = seconds;
    this.locked = true;
    clearInterval(this.lockoutTimer);
    this.lockoutTimer = setInterval(() => {
      this.lockoutSeconds--;
      if (this.lockoutSeconds <= 0) {
        this.lockoutSeconds = 0;
        this.locked = false;
        this.errorMessage = '';
        clearInterval(this.lockoutTimer);
      }
    }, 1000);
  }

  get expiryDisplay(): string {
    const min = Math.floor(this.expirySeconds / 60);
    const sec = this.expirySeconds % 60;
    return `${min}:${sec.toString().padStart(2, '0')}`;
  }

  get lockoutDisplay(): string {
    const min = Math.floor(this.lockoutSeconds / 60);
    const sec = this.lockoutSeconds % 60;
    return `${min}:${sec.toString().padStart(2, '0')}`;
  }

  get allDigitsFilled(): boolean {
    return this.digits.every(d => d !== '');
  }

  get otpValue(): string {
    return this.digits.join('');
  }

  onDigitInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    // Only allow single digit
    if (value.length > 1) {
      input.value = value[value.length - 1];
    }

    // Only allow digits
    if (!/^\d$/.test(input.value)) {
      input.value = '';
      this.digits[index] = '';
      return;
    }

    this.digits[index] = input.value;

    // Auto-advance to next input
    if (input.value && index < 5) {
      this.focusInput(index + 1);
    }

    // Auto-submit when all filled
    if (this.allDigitsFilled) {
      this.submitOtp();
    }
  }

  onDigitKeydown(event: KeyboardEvent, index: number): void {
    if (event.key === 'Backspace') {
      if (!this.digits[index] && index > 0) {
        event.preventDefault();
        this.digits[index - 1] = '';
        this.focusInput(index - 1);
      } else {
        this.digits[index] = '';
      }
    } else if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault();
      this.focusInput(index - 1);
    } else if (event.key === 'ArrowRight' && index < 5) {
      event.preventDefault();
      this.focusInput(index + 1);
    }
  }

  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pasteData = event.clipboardData?.getData('text') || '';
    const digits = pasteData.replace(/\D/g, '').slice(0, 6);
    if (digits.length === 0) return;

    for (let i = 0; i < 6; i++) {
      this.digits[i] = digits[i] || '';
    }

    // Update input values
    const inputs = this.digitInputs.toArray();
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].nativeElement.value = this.digits[i];
    }

    // Focus last filled or next empty
    const focusIndex = Math.min(digits.length, 5);
    this.focusInput(focusIndex);

    if (this.allDigitsFilled) {
      this.submitOtp();
    }
  }

  private focusInput(index: number): void {
    const inputs = this.digitInputs.toArray();
    if (inputs[index]) {
      inputs[index].nativeElement.focus();
      inputs[index].nativeElement.select();
    }
  }

  submitOtp(): void {
    if (this.verifying || this.locked || this.expired) return;
    const code = this.otpValue;
    if (code.length !== 6) return;

    this.verifying = true;
    this.errorMessage = '';

    this.signatureService.verifyOtp(this.doctorUuid, code, this.consent!).subscribe({
      next: () => {
        this.verifying = false;
        this.otpVerified.emit();
      },
      error: (error) => {
        this.verifying = false;
        const backendMsg = error?.error?.message;
        if (error.status === 429) {
          this.errorMessage = backendMsg || 'Too many attempts. Please wait.';
          this.startLockoutCountdown(300);
        } else if (error.status === 410) {
          this.expired = true;
          this.errorMessage = backendMsg || 'The verification code has expired. Please request a new one.';
        } else if (error.status === 400) {
          this.errorMessage = backendMsg || 'Invalid verification code. Please try again.';
        } else {
          this.errorMessage = backendMsg || 'A network error occurred. Please try again.';
        }
        this.triggerShake();
        this.clearDigits();
      }
    });
  }

  private triggerShake(): void {
    this.shake = true;
    setTimeout(() => this.shake = false, 600);
  }

  private clearDigits(): void {
    this.digits = ['', '', '', '', '', ''];
    const inputs = this.digitInputs?.toArray();
    if (inputs) {
      inputs.forEach(i => i.nativeElement.value = '');
      setTimeout(() => this.focusInput(0), 100);
    }
  }

  resendOtp(): void {
    if (this.resendCooldown > 0) return;

    this.errorMessage = '';
    this.expired = false;

    this.signatureService.sendOtp(this.doctorUuid, this.phone).subscribe({
      next: () => {
        this.startExpiryCountdown();
        this.startResendCooldown();
        this.clearDigits();
      },
      error: () => {
        this.errorMessage = 'Failed to resend verification code. Please try again.';
      }
    });
  }

  trackByIndex(index: number): number {
    return index;
  }

  cancel(): void {
    this.otpCancel.emit();
  }
}
