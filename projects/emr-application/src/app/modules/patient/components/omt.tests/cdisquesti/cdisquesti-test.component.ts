import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { OmtTestService } from '../../medical.note/components/objective/service/omt-test/omt-test.service';

@Component({
  selector: 'cdisquesti-test',
  templateUrl: './cdisquesti-test.component.html',
  styleUrls: ['./cdisquesti-test.component.css']
})
export class CdisquestiTestComponent implements OnInit {
  cdisquestiForm: FormGroup;
  showInstructions = false;
  private testName: string = 'cdisquesti';
  @Input() noteId: string;
  @Output() getResult = new EventEmitter<any>();

  questions = [
    { key: 'q1', text: 'Because of pain in my shoulder, I move my arm or hand with some difficulty.' },
    { key: 'q2', text: 'I do not bath myself completely because of my shoulder.' },
    { key: 'q3', text: 'Because of my shoulder trouble, I get dressed with help from someone else.' },
    { key: 'q4', text: 'I get dressed more slowly than usual because of my shoulder.' },
    { key: 'q5', text: 'Because of my shoulder trouble, I fasten my clothing with some difficulty (eg buttons, zips, shoelaces or bra).' },
    { key: 'q6', text: 'I have trouble putting on a jumper, shirt, blouse or jacket because of my shoulder problem.' },
    { key: 'q7', text: 'Because of my shoulder problem, I change position frequently in bed at night.' },
    { key: 'q8', text: 'I cannot lie on my right side at night because of my shoulder.' },
    { key: 'q9', text: 'I cannot lie on my left side at night because of my shoulder.' },
    { key: 'q10', text: 'I stay at home most of the time because of my shoulder problem.' },
    { key: 'q11', text: 'Because of my shoulder problem, I do less of the daily household jobs than I would usually do.' },
    { key: 'q12', text: 'I avoid heavy jobs around the house because of my shoulder trouble.' },
    { key: 'q13', text: 'Because of my shoulder, I do no carry any shopping.' },
    { key: 'q14', text: 'Because of my shoulder trouble, I am cutting down on some of my usual sports or more active pastimes.' },
    { key: 'q15', text: 'Because of my shoulder trouble, I am not doing any of my usual physical recreation or more active pastimes.' },
    { key: 'q16', text: 'Because of my shoulder, I try to get other people to do things for me.' },
    { key: 'q17', text: 'My shoulder makes me more irritable and bad tempered with people than usual.' },
    { key: 'q18', text: 'Because of my shoulder, I have more minor accidents (eg dropping things).' },
    { key: 'q19', text: 'I sleep less well because of my shoulder.' },
    { key: 'q20', text: 'Because of my shoulder, I rest more often during the day.' },
    { key: 'q21', text: 'My appetite is not very good because of my shoulder problem.' },
    { key: 'q22', text: 'Because of my shoulder, I have trouble writing or typing.' }
  ];

  constructor(private fb: FormBuilder, private omtTestService: OmtTestService) {
    this.cdisquestiForm = this.createForm();
  }

  createForm(): FormGroup {
    const controls: { [key: string]: any } = {
      painlevel: [null]
    };
    for (let i = 1; i <= 22; i++) {
      controls['q' + i] = [false];
    }
    return this.fb.group(controls);
  }

  ngOnInit(): void {
    if (this.noteId) {
      this.omtTestService.getAnswers(this.testName, this.noteId).subscribe(response => {
        if (response?.answers) {
          const formValues: { [key: string]: any } = {};
          Object.entries(response.answers).forEach(([key, value]) => {
            const formKey = key.toLowerCase();
            if (formKey === 'painlevel') {
              formValues[formKey] = value as number;
            } else {
              formValues[formKey] = value === 1 || value === true;
            }
          });
          this.cdisquestiForm.patchValue(formValues);
        }
      });
    }
  }

  toggleInstructions(): void {
    this.showInstructions = !this.showInstructions;
  }

  calculateScore(): void {
    // Build answers object with uppercase keys for backend
    const answers: { [key: string]: number } = {};
    Object.keys(this.cdisquestiForm.controls).forEach(key => {
      const value = this.cdisquestiForm.get(key)?.value;
      if (key === 'painlevel') {
        if (value !== null) {
          answers[key.toUpperCase()] = parseInt(value, 10);
        }
      } else {
        answers[key.toUpperCase()] = value ? 1 : 0;
      }
    });

    this.omtTestService.calculate(this.testName, this.noteId, answers).subscribe(val => {
      this.getResult.emit(val);
    });
  }

  resetForm(): void {
    this.cdisquestiForm.reset();
    // Reset checkboxes to false
    for (let i = 1; i <= 22; i++) {
      this.cdisquestiForm.get('q' + i)?.setValue(false);
    }
  }

  getCheckedCount(): number {
    let count = 0;
    for (let i = 1; i <= 22; i++) {
      if (this.cdisquestiForm.get('q' + i)?.value === true) {
        count++;
      }
    }
    return count;
  }
}
