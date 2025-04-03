import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'grip',
  templateUrl: './grip.component.html',
  styleUrls: ['./grip.component.css']
})
export class GripComponent implements OnInit {
  gripStrengthForm: FormGroup;
  
  // Grip types
  gripTypes = ['Power Grip', 'Lateral Pinch', 'Tip Pinch/Pincer', 'Tripod Pinch'];

  // Mapping grip types to form control-safe names (removing spaces and special characters)
  gripControlMap = {
    'Power Grip': 'powerGrip',
    'Lateral Pinch': 'lateralPinch',
    'Tip Pinch/Pincer': 'tipPinch',
    'Tripod Pinch': 'tripodPinch'
  };

  // Test options specific to each grip type
  testOptionsMap = {
    'Power Grip': ['Not Tested', 'Weak', 'Moderate', 'Strong'],
    'Lateral Pinch': ['Not Tested', 'Poor', 'Fair', 'Good'],
    'Tip Pinch/Pincer': ['Not Tested', 'Minimal', 'Partial', 'Full'],
    'Tripod Pinch': ['Not Tested', 'Insufficient', 'Satisfactory', 'Excellent']
  };

  constructor(private fb: FormBuilder) {
  }
  ngOnInit(): void {
    this.gripStrengthForm = this.fb.group({
      right: this.fb.group({
        powerGrip: ['Not Tested'],
        lateralPinch: ['Not Tested'],
        tipPinch: ['Not Tested'],
        tripodPinch: ['Not Tested'],
      }),
      left: this.fb.group({
        powerGrip: ['Not Tested'],
        lateralPinch: ['Not Tested'],
        tipPinch: ['Not Tested'],
        tripodPinch: ['Not Tested'],
      }),
    });
  }
}
