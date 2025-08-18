import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { FieldDependentsService } from '../../../../services/medical.note/field.dependents.builder/field-dependents.service';
import { MedialNoteService } from '../../../../services/medical.note/medial-note.service';
import { FieldControlStyles } from '../../filed.control.style.selector/field.control.style';
import { AssessmentStyles } from './styles/assessment';

@Component({
  selector: 'assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css']
})
export class AssessmentComponent implements OnInit {
  assessmentForm: FormGroup;
  fields: any
  styles: FieldControlStyles[] = AssessmentStyles;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() stepper!: MatStepper
  @Input() assessmentData: any
  @Input() noteType:string
  problemsArray: FormArray;
  goalsArray: FormArray;
  constructor(private fb: FormBuilder
    , private medialNoteService: MedialNoteService
    , private fieldDependentsService: FieldDependentsService) { }
  ngOnInit(): void {
    this.medialNoteService.find('assessment',this.noteType).subscribe(fields => {
      this.fields = fields['assessment']
      this.fields = this.fieldDependentsService.buildHierarchyRecursive(this.fields);
      this.buildForm();
      this.formReady.emit(this.assessmentForm);
    })
  }
  get problems(): FormArray {
    return this.assessmentForm.get('problems') as FormArray;
  }
  get goals(): FormArray {
    return this.assessmentForm.get('goals') as FormArray;
  }

  addProblem(input: HTMLInputElement) {
    const problemValue = input.value.trim();
    if (problemValue) {
      this.problems.push(new FormControl(problemValue)); // Add value to FormArray
      input.value = ''; // Clear input after adding
    }
  }

  removeProblem(index: number) {
    this.problems.removeAt(index); // Remove value from FormArray
  }
  createGoal(description = '', term = 'Short Term', period = '1 Visit', met = 'N/A'): FormGroup {
    return this.fb.group({
      description: new FormControl(description),
      term: new FormControl(term),
      period: new FormControl(period),
      met: new FormControl(met)
    });
  }
  addGoal(descriptionInput: HTMLTextAreaElement, termInput: HTMLSelectElement, periodInput: HTMLSelectElement, metInput: HTMLSelectElement) {
    const description = descriptionInput.value.trim();
    const term = termInput.value;
    const period = periodInput.value;
    const met = metInput.value;

    this.goals.push(this.createGoal(description, term, period, met));
    descriptionInput.value = ''; // Clear description field
    termInput.value = 'Short Term';
    periodInput.value = '1-visit';
    metInput.value = 'N/A'
  }

  removeGoal(index: number) {
    this.goals.removeAt(index);
  }
  getGoalFormGroup(index: number): FormGroup {
    return this.goals.at(index) as FormGroup; // Ensure each item is treated as FormGroup
  }


  private buildForm() {
    this.assessmentForm = this.fb.group({
      problems: this.fb.array([]),
      goals: this.fb.array([])
    })

    setTimeout(() => {
      this.assessmentForm.patchValue(this.assessmentData);
      this.fillGoals();
      this.fillProblems();
    }, 10);

    this.problemsArray = this.assessmentForm.get('problems') as FormArray;
    this.goalsArray = this.assessmentForm.get('goals') as FormArray;
  }
  next() {
    this.stepper.next();
  }
  getstyleFieldControl(fieldName: string): FieldControlStyles {
    return this.styles.find(obj => obj.name === fieldName);
  }
  fillProblems() {
    if (this.assessmentData?.problems) {
      for (let i = 0; i < this.assessmentData?.problems.length; i++) {
        this.problems.push(new FormControl(this.assessmentData?.problems[i]))
      }
    }
  }
  fillGoals() {
    if (this.assessmentData?.goals)
      for (let i = 0; i < this.assessmentData?.goals.length; i++) {
        this.goals.push(new FormControl(this.assessmentData?.goals[i]))
      }
  }

}
