import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { OrganizationUser } from '../../../models/organization-user';
import { SignatureAuditRecord } from '../../../models/signature-audit';

export interface TimelineStep {
  label: string;
  icon: string;
  state: 'completed' | 'active' | 'pending';
  stepNumber: number;
  timestamp?: number;
  detail?: string;
  ipAddress?: string;
  userAgent?: string;
  browserShort?: string;
  eventTypes: string[];
  expanded?: boolean;
}

interface StepDefinition {
  label: string;
  icon: string;
  eventTypes: string[];
}

const STEP_DEFINITIONS: StepDefinition[] = [
  { label: 'Account Created', icon: 'cilUser', eventTypes: ['CLINICAL_USER_CREATED'] },
  { label: 'Signature Email Sent', icon: 'cilEnvelopeClosed', eventTypes: ['SIGNATURE_TOKEN_GENERATED', 'SIGNATURE_EMAIL_SENT'] },
  { label: 'Token Validated', icon: 'cilExternalLink', eventTypes: ['TOKEN_VALIDATED'] },
  { label: 'Identity Verified', icon: 'cilLockLocked', eventTypes: ['OTP_SENT', 'OTP_VERIFIED'] },
  { label: 'Consent & Signature', icon: 'cilPen', eventTypes: ['CONSENT_ACKNOWLEDGED', 'SIGNATURE_SUBMITTED'] },
  { label: 'Account Activated', icon: 'cilCheckCircle', eventTypes: ['DOCTOR_ACTIVATED'] },
];

@Component({
  selector: 'app-doctor-timeline',
  templateUrl: './doctor-timeline.component.html',
  styleUrls: ['./doctor-timeline.component.css']
})
export class DoctorTimelineComponent implements OnChanges {
  @Input() user: OrganizationUser;
  @Input() auditRecords: SignatureAuditRecord[] = [];

  steps: TimelineStep[] = [];
  completedCount: number = 0;
  totalSteps: number = STEP_DEFINITIONS.length;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['auditRecords'] || changes['user']) {
      this.buildTimeline();
    }
  }

  private buildTimeline(): void {
    const eventSet = new Set(this.auditRecords.map(r => r.eventType));

    let lastCompletedIndex = -1;
    this.steps = STEP_DEFINITIONS.map((def, index) => {
      const completed = def.eventTypes.every(et => eventSet.has(et));
      if (completed) lastCompletedIndex = index;
      return { ...def, state: 'pending' as const, stepNumber: index + 1 };
    });

    this.steps.forEach((step, index) => {
      const completed = step.eventTypes.every(et => eventSet.has(et));
      if (completed) {
        step.state = 'completed';
        const matchingRecords = this.auditRecords
          .filter(r => step.eventTypes.includes(r.eventType))
          .sort((a, b) => (b.performedAt || 0) - (a.performedAt || 0));
        if (matchingRecords.length > 0) {
          const record = matchingRecords[0];
          step.timestamp = record.performedAt;
          step.detail = this.extractDetail(record);
          step.ipAddress = record.ipAddress;
          step.userAgent = record.userAgent;
          step.browserShort = this.parseUserAgent(record.userAgent);
        }
      } else if (index === lastCompletedIndex + 1) {
        step.state = 'active';
      }
    });

    this.completedCount = this.steps.filter(s => s.state === 'completed').length;
  }

  private extractDetail(record: SignatureAuditRecord): string {
    if (!record.details) return '';
    try {
      const parsed = JSON.parse(record.details);
      if (parsed.email) return parsed.email;
      if (parsed.doctorEmail) return parsed.doctorEmail;
      if (parsed.phone) return 'Phone: ' + parsed.phone;
      if (parsed.name) return parsed.name;
      return '';
    } catch {
      return '';
    }
  }

  toggleExpand(step: TimelineStep): void {
    if (step.state === 'completed') {
      step.expanded = !step.expanded;
    }
  }

  formatTimestamp(ts: number): string {
    if (!ts) return '';
    return new Date(ts).toLocaleString();
  }

  private parseUserAgent(ua: string): string {
    if (!ua) return '';
    if (ua.includes('Chrome') && !ua.includes('Edg')) return 'Chrome';
    if (ua.includes('Edg')) return 'Edge';
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
    return 'Browser';
  }

  getUserInitials(): string {
    if (!this.user) return '';
    const first = this.user.firstName?.charAt(0) || '';
    const last = this.user.lastName?.charAt(0) || '';
    if (first || last) return (first + last).toUpperCase();
    return (this.user.userName?.charAt(0) || '').toUpperCase();
  }

  getUserDisplayName(): string {
    if (!this.user) return '';
    const full = [this.user.firstName, this.user.lastName].filter(Boolean).join(' ');
    return full || this.user.userName || this.user.accountName || '';
  }
}
