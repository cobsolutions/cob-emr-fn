import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OmtTestService } from '../../medical.note/components/objective/service/omt-test/omt-test.service';
import { dashValidator } from '../validator/not.selected';

@Component({
  selector: 'mcgpques-test',
  templateUrl: './mcgpques-test.component.html',
  styleUrls: ['./mcgpques-test.component.css']
})
export class McgpquesTestComponent implements OnInit {
  mcgpquesForm: FormGroup;
  showInstructions = false;
  private testName: string = 'mcgpques';
  @Input() noteId: string;
  @Output() getResult = new EventEmitter<any>();

  // Section I: "What does your pain feel like?" - 20 questions
  sectionIQuestions = [
    { key: 'q1', label: 'Temporal', options: [
      { value: 'NT', text: 'Not Tested' },
      { value: 'Flickering', text: 'Flickering' },
      { value: 'Quivering', text: 'Quivering' },
      { value: 'Pulsing', text: 'Pulsing' },
      { value: 'Throbbing', text: 'Throbbing' },
      { value: 'Beating', text: 'Beating' },
      { value: 'Pounding', text: 'Pounding' }
    ]},
    { key: 'q2', label: 'Spatial', options: [
      { value: 'NT', text: 'Not Tested' },
      { value: 'Jumping', text: 'Jumping' },
      { value: 'Flashing', text: 'Flashing' },
      { value: 'Shooting', text: 'Shooting' }
    ]},
    { key: 'q3', label: 'Punctate Pressure', options: [
      { value: 'NT', text: 'Not Tested' },
      { value: 'Pricking', text: 'Pricking' },
      { value: 'Boring', text: 'Boring' },
      { value: 'Drilling', text: 'Drilling' },
      { value: 'Stabbing', text: 'Stabbing' },
      { value: 'Lancinating', text: 'Lancinating' }
    ]},
    { key: 'q4', label: 'Incisive Pressure', options: [
      { value: 'NT', text: 'Not Tested' },
      { value: 'Sharp', text: 'Sharp' },
      { value: 'Cutting', text: 'Cutting' },
      { value: 'Lacerating', text: 'Lacerating' }
    ]},
    { key: 'q5', label: 'Constrictive Pressure', options: [
      { value: 'NT', text: 'Not Tested' },
      { value: 'Pinching', text: 'Pinching' },
      { value: 'Pressing', text: 'Pressing' },
      { value: 'Gnawing', text: 'Gnawing' },
      { value: 'Cramping', text: 'Cramping' },
      { value: 'Crushing', text: 'Crushing' }
    ]},
    { key: 'q6', label: 'Traction Pressure', options: [
      { value: 'NT', text: 'Not Tested' },
      { value: 'Tugging', text: 'Tugging' },
      { value: 'Pulling', text: 'Pulling' },
      { value: 'Wrenching', text: 'Wrenching' }
    ]},
    { key: 'q7', label: 'Thermal', options: [
      { value: 'NT', text: 'Not Tested' },
      { value: 'Hot', text: 'Hot' },
      { value: 'Burning', text: 'Burning' },
      { value: 'Scalding', text: 'Scalding' },
      { value: 'Searing', text: 'Searing' }
    ]},
    { key: 'q8', label: 'Brightness', options: [
      { value: 'NT', text: 'Not Tested' },
      { value: 'Tingling', text: 'Tingling' },
      { value: 'Itchy', text: 'Itchy' },
      { value: 'Smarting', text: 'Smarting' },
      { value: 'Stinging', text: 'Stinging' }
    ]},
    { key: 'q9', label: 'Dullness', options: [
      { value: 'NT', text: 'Not Tested' },
      { value: 'Dull', text: 'Dull' },
      { value: 'Sore', text: 'Sore' },
      { value: 'Hurting', text: 'Hurting' },
      { value: 'Aching', text: 'Aching' },
      { value: 'Heavy', text: 'Heavy' }
    ]},
    { key: 'q10', label: 'Sensory Miscellaneous', options: [
      { value: 'NT', text: 'Not Tested' },
      { value: 'Tender', text: 'Tender' },
      { value: 'Taut', text: 'Taut' },
      { value: 'Rasping', text: 'Rasping' },
      { value: 'Splitting', text: 'Splitting' }
    ]},
    { key: 'q11', label: 'Tension', options: [
      { value: 'NT', text: 'Not Tested' },
      { value: 'Tiring', text: 'Tiring' },
      { value: 'Exhausting', text: 'Exhausting' }
    ]},
    { key: 'q12', label: 'Autonomic', options: [
      { value: 'NT', text: 'Not Tested' },
      { value: 'Sickening', text: 'Sickening' },
      { value: 'Suffocating', text: 'Suffocating' }
    ]},
    { key: 'q13', label: 'Fear', options: [
      { value: 'NT', text: 'Not Tested' },
      { value: 'Fearful', text: 'Fearful' },
      { value: 'Frightful', text: 'Frightful' },
      { value: 'Terrifying', text: 'Terrifying' }
    ]},
    { key: 'q14', label: 'Punishment', options: [
      { value: 'NT', text: 'Not Tested' },
      { value: 'Punishing', text: 'Punishing' },
      { value: 'Gruelling', text: 'Gruelling' },
      { value: 'Cruel', text: 'Cruel' },
      { value: 'Vicious', text: 'Vicious' },
      { value: 'Killing', text: 'Killing' }
    ]},
    { key: 'q15', label: 'Affective-Evaluative-Sensory:Miscellaneous', options: [
      { value: 'NT', text: 'Not Tested' },
      { value: 'Wretched', text: 'Wretched' },
      { value: 'Blinding', text: 'Blinding' }
    ]},
    { key: 'q16', label: 'Evaluative', options: [
      { value: 'NT', text: 'Not Tested' },
      { value: 'Annoying', text: 'Annoying' },
      { value: 'Troublesome', text: 'Troublesome' },
      { value: 'Miserable', text: 'Miserable' },
      { value: 'Intense', text: 'Intense' },
      { value: 'Unbearable', text: 'Unbearable' }
    ]},
    { key: 'q17', label: 'Sensory:Miscellaneous', options: [
      { value: 'NT', text: 'Not Tested' },
      { value: 'Spreading', text: 'Spreading' },
      { value: 'Radiating', text: 'Radiating' },
      { value: 'Penetrating', text: 'Penetrating' },
      { value: 'Piercing', text: 'Piercing' }
    ]},
    { key: 'q18', label: 'Sensory:Miscellaneous', options: [
      { value: 'NT', text: 'Not Tested' },
      { value: 'Tight', text: 'Tight' },
      { value: 'Numb', text: 'Numb' },
      { value: 'Drawing', text: 'Drawing' },
      { value: 'Squeezing', text: 'Squeezing' },
      { value: 'Tearing', text: 'Tearing' }
    ]},
    { key: 'q19', label: 'Sensory', options: [
      { value: 'NT', text: 'Not Tested' },
      { value: 'Cool', text: 'Cool' },
      { value: 'Cold', text: 'Cold' },
      { value: 'Freezing', text: 'Freezing' }
    ]},
    { key: 'q20', label: 'Affective-Evaluative:Miscellaneous', options: [
      { value: 'NT', text: 'Not Tested' },
      { value: 'Nagging', text: 'Nagging' },
      { value: 'Nauseating', text: 'Nauseating' },
      { value: 'Agonizing', text: 'Agonizing' },
      { value: 'Dreadful', text: 'Dreadful' },
      { value: 'Torturing', text: 'Torturing' }
    ]}
  ];

  // Section II: "How does your pain change with time?"
  sectionIIQuestion = {
    key: 'q21', label: 'Describe your pattern of pain', options: [
      { value: 'NT', text: 'Not Tested' },
      { value: 'Continuous/Steady/Constant', text: 'Continuous/Steady/Constant' },
      { value: 'Rhythmic/Periodic/Intermittent', text: 'Rhythmic/Periodic/Intermittent' },
      { value: 'Brief/Momentary/Transient', text: 'Brief/Momentary/Transient' }
    ]
  };

  // Section III: "How strong is your pain?" - 6 questions
  sectionIIIQuestions = [
    { key: 'q22', label: 'Which word describes your pain right now' },
    { key: 'q23', label: 'Which word describes it at its worst' },
    { key: 'q24', label: 'Which word describes it when it is least' },
    { key: 'q25', label: 'Which word describes the worst toothache you ever had' },
    { key: 'q26', label: 'Which word describes the worst headache you ever had' },
    { key: 'q27', label: 'Which word describes the worst stomach ache you ever had' }
  ];

  intensityOptions = [
    { value: 'NT', text: 'Not Tested' },
    { value: 'Mild', text: 'Mild' },
    { value: 'Discomforting', text: 'Discomforting' },
    { value: 'Distressing', text: 'Distressing' },
    { value: 'Horrible', text: 'Horrible' },
    { value: 'Excruciating', text: 'Excruciating' }
  ];

  constructor(private fb: FormBuilder, private omtTestService: OmtTestService) {
    this.mcgpquesForm = this.createForm();
  }

  createForm(): FormGroup {
    const formGroup: any = {
      painlevel: [null]
    };
    for (let i = 1; i <= 27; i++) {
      formGroup[`q${i}`] = ['NT', [Validators.required, dashValidator()]];
    }
    return this.fb.group(formGroup);
  }

  ngOnInit(): void {
    if (this.noteId) {
      this.omtTestService.getAnswers(this.testName, this.noteId).subscribe(response => {
        if (response?.answers) {
          const formValues: { [key: string]: string } = {};
          Object.entries(response.answers).forEach(([key, value]) => {
            const formKey = key.toLowerCase();
            formValues[formKey] = String(value);
          });
          this.mcgpquesForm.patchValue(formValues);
        }
      });
    }
  }

  toggleInstructions(): void {
    this.showInstructions = !this.showInstructions;
  }

  calculateScore(): void {
    if (this.mcgpquesForm.invalid) {
      Object.keys(this.mcgpquesForm.controls).forEach(key => {
        this.mcgpquesForm.get(key)?.markAsTouched();
      });
      return;
    }

    const answers: { [key: string]: number } = {};
    if (this.mcgpquesForm.value.painlevel !== null) {
      answers['PAINLEVEL'] = parseInt(this.mcgpquesForm.value.painlevel, 10);
    }
    for (let i = 1; i <= 27; i++) {
      const value = this.mcgpquesForm.get(`q${i}`)?.value;
      if (value !== 'NT') {
        answers[`Q${i}`] = parseInt(value, 10) || 0;
      }
    }

    this.omtTestService.calculate(this.testName, this.noteId, answers).subscribe(val => {
      this.getResult.emit(val);
    });
  }

  resetForm(): void {
    const resetValues: { [key: string]: any } = { painlevel: null };
    for (let i = 1; i <= 27; i++) {
      resetValues[`q${i}`] = 'NT';
    }
    this.mcgpquesForm.patchValue(resetValues);
    this.mcgpquesForm.markAsUntouched();
  }

  getAnsweredCount(): number {
    let count = 0;
    for (let i = 1; i <= 27; i++) {
      if (this.mcgpquesForm.get(`q${i}`)?.value !== 'NT') {
        count++;
      }
    }
    return count;
  }

  getCompletionPercentage(): number {
    return (this.getAnsweredCount() / 27) * 100;
  }
}
