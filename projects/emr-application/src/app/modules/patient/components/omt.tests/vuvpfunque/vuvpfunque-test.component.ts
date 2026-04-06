import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OmtTestService } from '../../medical.note/components/objective/service/omt-test/omt-test.service';

@Component({
  selector: 'vuvpfunque-test',
  templateUrl: './vuvpfunque-test.component.html',
  styleUrls: ['./vuvpfunque-test.component.css']
})
export class VuvpfunqueTestComponent implements OnInit {
  vuvpfunqueForm: FormGroup;
  showInstructions = false;
  private testName: string = 'vuvpfunque';
  @Input() noteId: string;
  @Output() getResult = new EventEmitter<any>();

  questions = [
    {
      key: 'q1',
      sectionTitle: 'Because of my pelvic pain',
      options: [
        { value: 3, text: "I can't wear tight fitting clothing like pantyhose that puts any pressure over my painful area." },
        { value: 2, text: 'I can wear close fitting clothing as long as it only puts a little pressure over my painful area.' },
        { value: 1, text: "I sometimes dislike the feel of clothes, but most of the time I don't feel pelvic pain caused by pressure from my clothing." },
        { value: 0, text: 'I can wear whatever I like; I have no pelvic pain because of clothing.' }
      ]
    },
    {
      key: 'q2',
      sectionTitle: 'Because of my pelvic pain',
      options: [
        { value: 3, text: 'I can only walk when I must. I can only walk far enough to move around in my house, no farther.' },
        { value: 2, text: 'I can only walk about 1 mile. I can walk a short distance outside the house, but it is very painful to walk far enough to get a full half of groceries in a store within a 1 mile walk.' },
        { value: 1, text: "My pain does not get worse with walking; I can walk as far as I want." },
        { value: 0, text: "I have a hard time walking because of another medical problem, but pelvic pain doesn't make it hard to walk." }
      ]
    },
    {
      key: 'q3',
      sectionTitle: 'Because of my pelvic pain',
      options: [
        { value: 3, text: 'I get pain when I sit, so I cannot sit for longer than 30 minutes.' },
        { value: 2, text: 'I get pain when I sit, so I can sit for longer than 30 minutes at a time, but it is painful that it is difficult to do my job or sit long enough to eat.' },
        { value: 1, text: 'I occasionally get pain when I sit, but most of the time sitting is comfortable.' },
        { value: 0, text: "My pain does not get worse with sitting; I can sit as long as I want." },
        { value: 0, text: "I have trouble sitting for very long because of another medical problem, but pelvic pain doesn't make it hard to sit." }
      ]
    },
    {
      key: 'q4',
      sectionTitle: 'Because of my pelvic pain',
      options: [
        { value: 3, text: 'I am not doing any work or housework because of my pelvic pain.' },
        { value: 2, text: 'I can do some work, but I have trouble accomplishing at work or while I do housework.' },
        { value: 1, text: "I am considered full, but long enough to do my work, but I can't do more, like going out in the evenings." },
        { value: 0, text: 'I can do all my work, and go out in the evening if I want to, but I feel a lot of ache.' },
        { value: 0, text: "I don't have any problems with the pills that I take for pelvic pain." },
        { value: 0, text: "I don't take pain pills for my pelvic pain." }
      ]
    },
    {
      key: 'q5',
      sectionTitle: 'Because of my pelvic pain',
      options: [
        { value: 3, text: 'I have constant pain that makes it hard to do anything social.' },
        { value: 2, text: 'I only get together with my friends or go out to parties or events every now and then.' },
        { value: 1, text: "I get together with friends or go to events whenever I want, even if my pelvic pain gets worse and then I don't go because of the pain." },
        { value: 0, text: 'I get together with friends or go to events whenever I want, pelvic pain does not get in the way.' }
      ]
    },
    {
      key: 'q6',
      sectionTitle: 'Because of my pelvic pain',
      options: [
        { value: 3, text: "I can't stand for the doctor to insert the speculum when I go to the gynecologist." },
        { value: 2, text: 'I can stand it when the doctor inserts the speculum if they are very careful, but most of the time it really hurts.' },
        { value: 1, text: "It usually doesn't hurt when the doctor inserts the speculum, but every now and then it does hurt." },
        { value: 0, text: 'It never hurts for the doctor to insert the speculum when I go to the gynecologist.' }
      ]
    },
    {
      key: 'q7',
      sectionTitle: 'Because of my pelvic pain',
      options: [
        { value: 3, text: 'I cannot use tampons at all, because they make my pain much worse.' },
        { value: 2, text: 'I can only use tampons if I put them in very carefully.' },
        { value: 1, text: "It usually doesn't hurt to use tampons, but occasionally it does hurt." },
        { value: 0, text: 'It never hurts to use tampons.' },
        { value: 0, text: "This question doesn't apply to me, because I don't need to use tampons, or I wouldn't choose to use them whether they hurt or not." }
      ]
    },
    {
      key: 'q8',
      sectionTitle: 'Because of my pelvic pain',
      options: [
        { value: 3, text: "I can't let my partner put a finger or penis in my vagina during sex at all." },
        { value: 2, text: 'My partner can put a finger or penis in my vagina very carefully, but it still hurts.' },
        { value: 1, text: "It usually doesn't hurt if my partner puts a finger or penis in my vagina, but every now and then it does hurt." },
        { value: 0, text: "It doesn't hurt to have my partner put a finger or penis in my vagina at all." },
        { value: 0, text: "This question does not apply to me because I don't have a sexual partner." },
        { value: 0, text: 'Specifically, I won\'t get involved with a partner because I worry about pelvic pain during sex.' }
      ]
    },
    {
      key: 'q9',
      sectionTitle: 'Because of my pelvic pain',
      options: [
        { value: 3, text: "It hurts too much for my partner to touch me sexually even if the touching doesn't go in my vagina." },
        { value: 2, text: 'My partner can touch me sexually outside the vagina if we are very careful.' },
        { value: 1, text: "It doesn't usually hurt for my partner to touch me sexually outside the vagina, but every now and then it does hurt." },
        { value: 0, text: 'It never hurts for my partner to touch me sexually outside the vagina.' },
        { value: 0, text: "This question does not apply to me because I don't have a sexual partner." },
        { value: 0, text: "Specifically, I won't get involved with a partner because I am worried about pelvic pain during sex." }
      ]
    },
    {
      key: 'q10',
      sectionTitle: 'Because of my pelvic pain',
      options: [
        { value: 3, text: 'It is too painful to touch myself for sexual pleasure.' },
        { value: 2, text: 'I can touch myself for sexual pleasure if I am very careful.' },
        { value: 1, text: "It usually doesn't hurt to touch myself for sexual pleasure, but every now and then it does hurt." },
        { value: 0, text: 'It never hurts to touch myself for sexual pleasure.' },
        { value: 0, text: "I don't touch myself for sexual pleasure, but that is by choice, not because of pelvic pain." }
      ]
    }
  ];

  constructor(private fb: FormBuilder, private omtTestService: OmtTestService) {
    this.vuvpfunqueForm = this.createForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      // Patient Satisfaction - Pain Level (optional)
      painlevel: [null],

      // VUVPFUNQUE sections
      q1: [null, Validators.required],
      q2: [null, Validators.required],
      q3: [null, Validators.required],
      q4: [null, Validators.required],
      q5: [null, Validators.required],
      q6: [null, Validators.required],
      q7: [null, Validators.required],
      q8: [null, Validators.required],
      q9: [null, Validators.required],
      q10: [null, Validators.required]
    });
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
              // Stored value is the index-based string (e.g., "q1_2")
              formValues[formKey] = value;
            }
          });
          this.vuvpfunqueForm.patchValue(formValues);
        }
      });
    }
  }

  toggleInstructions(): void {
    this.showInstructions = !this.showInstructions;
  }

  calculateScore(): void {
    if (this.vuvpfunqueForm.invalid) {
      // Mark all fields as touched to show validation errors
      Object.keys(this.vuvpfunqueForm.controls).forEach(key => {
        this.vuvpfunqueForm.get(key)?.markAsTouched();
      });
      return;
    }

    // Build answers object with uppercase keys for backend
    const answers: { [key: string]: number } = {};
    Object.keys(this.vuvpfunqueForm.controls).forEach(key => {
      const value = this.vuvpfunqueForm.get(key)?.value;
      if (value !== null) {
        if (key === 'painlevel') {
          answers[key.toUpperCase()] = parseInt(value, 10);
        } else {
          // Resolve index-based value (e.g., "q1_2") to numeric score
          const question = this.questions.find(q => q.key === key);
          if (question) {
            const optionIndex = parseInt(value.split('_')[1], 10);
            answers[key.toUpperCase()] = question.options[optionIndex].value;
          }
        }
      }
    });

    this.omtTestService.calculate(this.testName, this.noteId, answers).subscribe(val => {
      this.getResult.emit(val);
    });
  }

  resetForm(): void {
    this.vuvpfunqueForm.reset();
    this.vuvpfunqueForm.markAsUntouched();
  }

  getAnsweredCount(): number {
    const questionKeys = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10'];
    return questionKeys.filter(key => this.vuvpfunqueForm.get(key)?.value !== null).length;
  }

  getCompletionPercentage(): number {
    const totalQuestions = 10;
    return (this.getAnsweredCount() / totalQuestions) * 100;
  }
}
