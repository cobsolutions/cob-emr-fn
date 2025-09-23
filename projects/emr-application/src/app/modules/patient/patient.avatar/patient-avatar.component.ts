import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'patient-avatar',
  templateUrl: './patient-avatar.component.html',
  styleUrls: ['./patient-avatar.component.css']
})
export class PatientAvatarComponent implements OnInit {
 /** accepted values: 'male', 'female', anything else -> neutral */
 @Input() gender: string | null = null;
 @Input() size = 70; // px
 @Input() initials?: string | null;
  constructor() { }

  ngOnInit(): void {
  }
  get normalizedGender(): 'male' | 'female' | 'neutral' {
    if (!this.gender) return 'neutral';
    const g = this.gender.trim().toLowerCase();
    if (g.startsWith('m')) return 'male';
    if (g.startsWith('f')) return 'female';
    return 'neutral';
  }
  get viewBoxSize() {
    return `${this.size}px`;
  }

  get ariaLabel(): string {
    const base = this.initials ? `${this.initials}` : 'Patient';
    const gender = this.normalizedGender === 'male' ? 'male' :
                   this.normalizedGender === 'female' ? 'female' : 'unspecified';
    return `${base} (${gender})`;
  }
}
