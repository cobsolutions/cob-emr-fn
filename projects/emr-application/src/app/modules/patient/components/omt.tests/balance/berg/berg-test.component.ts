import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OmtTestService } from '../../../medical.note/components/objective/service/omt-test/omt-test.service';

@Component({
  selector: 'balance-berg-test',
  templateUrl: './berg-test.component.html',
  styleUrls: ['./berg-test.component.css']
})
export class BergTestComponent implements OnInit {
  bergForm: FormGroup;
  showInstructions = false;
  private testName: string = 'berg';
  @Input() noteId: string;
  @Output() getResult = new EventEmitter<any>();
  // Berg Balance Scale items
  bergItems = [
    {
      number: 1,
      title: "Sitting to Standing",
      instruction: "Tell the patient to stand up and try not to use his hand for support.",
      options: [
        "0: Needs moderate or maximal assist to stand",
        "1: Needs minimal aid to stand or stabilize",
        "2: Able to stand using hands after several tries",
        "3: Able to stand independently using hands",
        "4: Able to stand without using hands and stabilize independently"
      ]
    },
    {
      number: 2,
      title: "Standing Unsupported",
      instruction: "Please stand for two minutes without holding on.",
      options: [
        "0: Unable to stand 30 seconds unsupported",
        "1: Needs several tries to stand 30 seconds unsupported",
        "2: Able to stand 30 seconds unsupported",
        "3: Able to stand 2 minutes with supervision",
        "4: Able to stand safely for 2 minutes"
      ]
    },
    {
      number: 3,
      title: "Sitting with Back Unsupported but Feet Supported on Floor or on a Stool",
      instruction: "Please sit with arms folded for 2 minutes.",
      options: [
        "0: Unable to sit without support 10 seconds",
        "1: Able to sit 10 seconds",
        "2: Able to able to sit 30 seconds",
        "3: Able to sit 2 minutes under supervision",
        "4: Able to sit safely and securely for 2 minutes"
      ]
    },
    {
      number: 4,
      title: "Standing to Sitting",
      instruction: "Please sit down.",
      options: [
        "0: Needs assist to sit",
        "1: Sits independently but has uncontrolled descent",
        "2: Uses back of legs against chair to control descent",
        "3: Controls descent by using hands",
        "4: Sits safely with minimal use of hands"
      ]
    },
    {
      number: 5,
      title: "Transfers",
      instruction: "Arrange chair(s) for pivot transfer. Ask subject to transfer one way toward a seat with armrests and one way toward a seat without armrests.",
      options: [
        "0: Needs two people to assist or supervise to be safe",
        "1: Needs one person to assist",
        "2: Able to transfer with verbal cuing and/or supervision",
        "3: Able to transfer safely definite need of hands",
        "4: Able to transfer safely with minor use of hands"
      ]
    },
    {
      number: 6,
      title: "Standing Unsupported with Eyes Closed",
      instruction: "Please close your eyes and stand still for 10 seconds.",
      options: [
        "0: Needs help to keep from falling",
        "1: Unable to keep eyes closed 3 seconds but stays safely",
        "2: Able to stand 3 seconds",
        "3: Able to stand 10 seconds with supervision",
        "4: Able to stand 10 seconds safely"
      ]
    },
    {
      number: 7,
      title: "Standing Unsupported with Feet Together",
      instruction: "Place your feet together and stand without holding on.",
      options: [
        "0: Needs help to attain position and unable to hold for 15 seconds",
        "1: Needs help to attain position but able to stand 15 seconds feet together",
        "2: Able to place feet together independently but unable to hold for 30 seconds",
        "3: Able to place feet together independently and stand 1 minute with supervision",
        "4: Able to place feet together independently and stand 1 minute safely"
      ]
    },
    {
      number: 8,
      title: "Reaching Forward with Outstretched Arm While Standing",
      instruction: "Lift arm to 90 degrees. Stretch out your fingers and reach forward as far as you can.",
      options: [
        "0: Loses balance while trying/requires external support",
        "1: Reaches forward but needs supervision",
        "2: Can reach forward 5 cm (2 inches)",
        "3: Can reach forward 12 cm (5 inches)",
        "4: Can reach forward confidently 25 cm (10 inches)"
      ]
    },
    {
      number: 9,
      title: "Pick up Object from the Floor from a Standing Position",
      instruction: "Pick up the shoe/slipper, which is place in front of your feet.",
      options: [
        "0: Unable to try/needs assist to keep from losing balance or falling",
        "1: Unable to pick up and needs supervision while trying",
        "2: Unable to pick up but reaches 2-5 cm(1-2 inches) from slipper and keeps balance independently",
        "3: Able to pick up slipper but needs supervision",
        "4: Able to pick up slipper safely and easily"
      ]
    },
    {
      number: 10,
      title: "Turning to Look Behind Over Left and Right Shoulders While Standing",
      instruction: "Turn to look directly behind you over toward the left shoulder. Repeat to the right.",
      options: [
        "0: Needs assist to keep from losing balance or falling",
        "1: Needs supervision when turning",
        "2: Turns sideways only but maintains balance",
        "3: Looks behind one side only other side shows less weight shift",
        "4: Looks behind from both sides and weight shifts well"
      ]
    },
    {
      number: 11,
      title: "Turn 360 Degrees",
      instruction: "Turn completely around in a full circle.",
      options: [
        "0: Needs assistance while turning",
        "1: Needs close supervision or verbal cuing",
        "2: Able to turn 360 degrees safely but slowly",
        "3: Able to turn 360 degrees safely one side only 4 seconds or less",
        "4: Able to turn 360 degrees safely in 4 seconds or less"
      ]
    },
    {
      number: 12,
      title: "Place Alternate Foot on Step or Stool While Standing Unsupported",
      instruction: "Place each foot alternately on the step/stool. Continue until each foot has touch the step/stool four times.",
      options: [
        "0: Needs assistance to keep from falling/unable to try",
        "1: Able to complete > 2 steps needs minimal assist",
        "2: Able to complete 4 steps without aid with supervision",
        "3: Able to stand independently and complete 8 steps in > 20 seconds",
        "4: Able to stand independently and safely and complete 8 steps in 20 seconds"
      ]
    },
    {
      number: 13,
      title: "Standing Unsupported One Foot in Front",
      instruction: "Place one foot directly in front of the other.",
      options: [
        "0: Loses balance while stepping or standing",
        "1: Needs help to step but can hold 15 seconds",
        "2: Able to take small step independently and hold 30 seconds",
        "3: Able to place foot ahead independently and hold 30 seconds",
        "4: Able to place foot tandem independently and hold 30 seconds"
      ]
    },
    {
      number: 14,
      title: "Standing On One Leg",
      instruction: "Stand on one leg as long as you can without holding on.",
      options: [
        "0: Unable to try of needs assist to prevent fall",
        "1: Tries to lift leg unable to hold 3 seconds but remains standing independently",
        "2: Able to lift leg independently and hold ≥ 3 seconds",
        "3: Able to lift leg independently and hold 5-10 seconds",
        "4: Able to lift leg independently and hold > 10 seconds"
      ]
    }
  ];
  constructor(private fb: FormBuilder, private omtTestService: OmtTestService) {
    this.bergForm = this.createForm();
  }
  createForm(): FormGroup {
    const formGroup: any = {
      // Patient Satisfaction - Pain Level
      painLevel: [null, [Validators.required, Validators.min(0), Validators.max(10)]]
    };

    // Create form controls for all 14 Berg items
    for (let i = 1; i <= 14; i++) {
      formGroup[`Q${i}`] = [null, Validators.required];
    }

    return this.fb.group(formGroup);
  }
  toggleInstructions(): void {
    this.showInstructions = !this.showInstructions;
  }
  calculateScore(): void {
    if (this.bergForm.invalid) {
      // Mark all fields as touched to show validation errors
      Object.keys(this.bergForm.controls).forEach(key => {
        this.bergForm.get(key)?.markAsTouched();
      });
      return;
    }

    // Build answers object with uppercase keys for backend
    const answers: { [key: string]: number } = {};
    Object.keys(this.bergForm.controls).forEach(key => {
      const value = this.bergForm.get(key)?.value;
      if (value !== null) {
        answers[key.toUpperCase()] = parseInt(value, 10);
      }
    });

    this.omtTestService.calculate(this.testName, this.noteId, answers).subscribe(val => {
      this.getResult.emit(val);
    });
  }
  resetForm(): void {
    this.bergForm.reset();
    this.bergForm.markAsUntouched();
  }

  ngOnInit(): void {
    if (this.noteId) {
      this.omtTestService.getAnswers(this.testName, this.noteId).subscribe(response => {
        if (response?.answers) {
          const formValues: { [key: string]: number } = {};
          Object.entries(response.answers).forEach(([key, value]) => {
            const formKey = key.toLowerCase();
            formValues[formKey] = value as number;
          });
          this.bergForm.patchValue(formValues);
        }
      });
    }
  }

  getAnsweredCount(): number {
    const controls = Object.keys(this.bergForm.controls);
    return controls.filter(key => this.bergForm.get(key)?.value !== null).length;
  }

  getCompletionPercentage(): number {
    const totalQuestions = 15; // 14 Berg items + 1 pain level
    return (this.getAnsweredCount() / totalQuestions) * 100;
  }
}
