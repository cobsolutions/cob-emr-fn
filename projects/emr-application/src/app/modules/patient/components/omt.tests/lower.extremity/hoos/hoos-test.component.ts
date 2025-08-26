// hoos-survey.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OmtTestService } from '../../../../services/test/omt-test.service';

@Component({
  selector: 'lower-extremity-hoos-test',
  templateUrl: './hoos-test.component.html',
  styleUrls: ['./hoos-test.component.css']
})
export class HoosTestComponent implements OnInit {
  hoosForm: FormGroup;
  showInstructions = false;
  calculatedScores: any = null;
  showCompletionError = false;

  // Question options
  painLevelOptions = Array.from({length: 11}, (_, i) => i);
  frequencyOptions = [
    { value: 0, text: 'Never' },
    { value: 1, text: 'Rarely' },
    { value: 2, text: 'Sometimes' },
    { value: 3, text: 'Often' },
    { value: 4, text: 'Always' }
  ];

  severityOptions = [
    { value: 0, text: 'None' },
    { value: 1, text: 'Mild' },
    { value: 2, text: 'Moderate' },
    { value: 3, text: 'Severe' },
    { value: 4, text: 'Extreme' }
  ];

  painFrequencyOptions = [
    { value: 0, text: 'Never' },
    { value: 1, text: 'Monthly' },
    { value: 2, text: 'Weekly' },
    { value: 3, text: 'Daily' },
    { value: 4, text: 'Always' }
  ];

  confidenceOptions = [
    { value: 0, text: 'Not at all' },
    { value: 1, text: 'Mildly' },
    { value: 2, text: 'Moderately' },
    { value: 3, text: 'Severely' },
    { value: 4, text: 'Totally' }
  ];

  constructor(private fb: FormBuilder, private omtTestService: OmtTestService) {
    this.hoosForm = this.createForm();
  }

  createForm(): FormGroup {
    const formGroup: any = {
      // Patient Satisfaction - Pain Level
      T745PatientSatisfaction1: [null, Validators.required],
      
      // Symptoms section
      S1: [null, Validators.required],
      S2: [null, Validators.required],
      S3: [null, Validators.required],
      S4: [null, Validators.required],
      S5: [null, Validators.required],
      
      // Pain section
      P1: [null, Validators.required],
      P2: [null, Validators.required],
      P3: [null, Validators.required],
      P4: [null, Validators.required],
      P5: [null, Validators.required],
      P6: [null, Validators.required],
      P7: [null, Validators.required],
      P8: [null, Validators.required],
      P9: [null, Validators.required],
      P10: [null, Validators.required],
      
      // Daily living section
      A1: [null, Validators.required],
      A2: [null, Validators.required],
      A3: [null, Validators.required],
      A4: [null, Validators.required],
      A5: [null, Validators.required],
      A6: [null, Validators.required],
      A7: [null, Validators.required],
      A8: [null, Validators.required],
      A9: [null, Validators.required],
      A10: [null, Validators.required],
      A11: [null, Validators.required],
      A12: [null, Validators.required],
      A13: [null, Validators.required],
      A14: [null, Validators.required],
      A15: [null, Validators.required],
      A16: [null, Validators.required],
      A17: [null, Validators.required],
      
      // Sports section
      SP1: [null, Validators.required],
      SP2: [null, Validators.required],
      SP3: [null, Validators.required],
      SP4: [null, Validators.required],
      
      // Quality of life section
      Q1: [null, Validators.required],
      Q2: [null, Validators.required],
      Q3: [null, Validators.required],
      Q4: [null, Validators.required]
    };

    return this.fb.group(formGroup);
  }

  toggleInstructions(): void {
    this.showInstructions = !this.showInstructions;
  }

  ngOnInit(): void {
  }

  calculateScore(): void {
    if (this.hoosForm.invalid) {
      // Mark all fields as touched to show validation errors
      Object.keys(this.hoosForm.controls).forEach(key => {
        this.hoosForm.get(key)?.markAsTouched();
      });
      this.showCompletionError = true;
      return;
    }
    
    this.showCompletionError = false;
    
    // Calculate HOOS scores
    const formValues = this.hoosForm.value;
    
    // Pain subscale (P1-P10)
    const painQuestions = [
      formValues.T745Pain06, formValues.T745Pain07, formValues.T745Pain08, 
      formValues.T745Pain09, formValues.T745Pain10, formValues.T745Pain11, 
      formValues.T745Pain12, formValues.T745Pain13, formValues.T745Pain14, 
      formValues.T745Pain15
    ];
    const painSum = painQuestions.reduce((sum, value) => sum + parseInt(value), 0);
    const painScore = 100 - ((painSum / 10) * 100 / 4);
    
    // Symptoms subscale (S1-S5)
    const symptomsQuestions = [
      formValues.T745Symptoms01, formValues.T745Symptoms02, 
      formValues.T745Symptoms03, formValues.T745Symptoms04, 
      formValues.T745Symptoms05
    ];
    const symptomsSum = symptomsQuestions.reduce((sum, value) => sum + parseInt(value), 0);
    const symptomsScore = 100 - ((symptomsSum / 5) * 100 / 4);
    
    // ADL subscale (A1-A17)
    const adlQuestions = [
      formValues.T745DailyLiving16, formValues.T745DailyLiving17, 
      formValues.T745DailyLiving18, formValues.T745DailyLiving19, 
      formValues.T745DailyLiving20, formValues.T745DailyLiving21, 
      formValues.T745DailyLiving22, formValues.T745DailyLiving23, 
      formValues.T745DailyLiving24, formValues.T745DailyLiving25, 
      formValues.T745DailyLiving26, formValues.T745DailyLiving27, 
      formValues.T745DailyLiving28, formValues.T745DailyLiving29, 
      formValues.T745DailyLiving30, formValues.T745DailyLiving31, 
      formValues.T745DailyLiving32
    ];
    const adlSum = adlQuestions.reduce((sum, value) => sum + parseInt(value), 0);
    const adlScore = 100 - ((adlSum / 17) * 100 / 4);
    
    // Sport/Rec subscale (SP1-SP4)
    const sportsQuestions = [
      formValues.T745Sports33, formValues.T745Sports34, 
      formValues.T745Sports35, formValues.T745Sports36
    ];
    const sportsSum = sportsQuestions.reduce((sum, value) => sum + parseInt(value), 0);
    const sportsScore = 100 - ((sportsSum / 4) * 100 / 4);
    
    // QOL subscale (Q1-Q4)
    const qolQuestions = [
      formValues.T745QualityOfLife37, formValues.T745QualityOfLife38, 
      formValues.T745QualityOfLife39, formValues.T745QualityOfLife40
    ];
    const qolSum = qolQuestions.reduce((sum, value) => sum + parseInt(value), 0);
    const qolScore = 100 - ((qolSum / 4) * 100 / 4);
    
    // Composite Score (HOOS5)
    const compositeScore = (painScore + symptomsScore + adlScore + sportsScore + qolScore) / 5;
    
    // Determine G-Code Modifier
    let gCodeModifier = '';
    if (compositeScore === 100) gCodeModifier = 'CH';
    else if (compositeScore >= 81) gCodeModifier = 'CI';
    else if (compositeScore >= 61) gCodeModifier = 'CJ';
    else if (compositeScore >= 41) gCodeModifier = 'CK';
    else if (compositeScore >= 21) gCodeModifier = 'CL';
    else if (compositeScore >= 1) gCodeModifier = 'CM';
    else gCodeModifier = 'CN';
    
    this.calculatedScores = {
      pain: Math.round(painScore),
      symptoms: Math.round(symptomsScore),
      adl: Math.round(adlScore),
      sports: Math.round(sportsScore),
      qol: Math.round(qolScore),
      composite: Math.round(compositeScore),
      gCodeModifier
    };

    // Send to service if needed
    // this.omtTestService.lowerExtremity(result, 'hoos').subscribe(rr => {
    //   console.log(JSON.stringify(rr))
    // })
  }

  resetForm(): void {
    this.hoosForm.reset();
    this.calculatedScores = null;
    this.showCompletionError = false;
  }
}