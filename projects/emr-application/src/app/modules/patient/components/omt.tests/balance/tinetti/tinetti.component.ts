import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OmtTestService } from '../../../../services/test/omt-test.service';

@Component({
  selector: 'balance-tinetti',
  templateUrl: './tinetti.component.html',
  styleUrls: ['./tinetti.component.css']
})
export class TinettiComponent implements OnInit {
  tinettiForm: FormGroup;
  showInstructions = false;
  @Output() getResult = new EventEmitter<any>()
  // Balance test items
  balanceItems = [
    {
      number: 1,
      title: "Sitting Balance",
      instruction: "",
      options: [
        "0: Leans or slides in chair",
        "1: Steady, safe"
      ]
    },
    {
      number: 2,
      title: "Rising",
      instruction: "",
      options: [
        "0: Unable without help",
        "1: Able but uses arms to help",
        "2: Able without use of arms"
      ]
    },
    {
      number: 3,
      title: "Attempts to Rise",
      instruction: "",
      options: [
        "0: Unable without help",
        "1: Able but requires > 1 attempt",
        "2: Able 1st attempt"
      ]
    },
    {
      number: 4,
      title: "Immediate Standing",
      instruction: "(1st 4 seconds)",
      options: [
        "0: Unsteady (staggers, sways, moves feet)",
        "1: Steady but uses a device or other support",
        "2: Steady without support"
      ]
    },
    {
      number: 5,
      title: "Standing Balance",
      instruction: "",
      options: [
        "0: Unsteady",
        "1: Steady but wide stance (medial heels > 4\" apart) or uses a device",
        "2: Narrow stance no support"
      ]
    },
    {
      number: 6,
      title: "Nudged",
      instruction: "(person stands with feet as close together as possible, examiner pushes lightly on sternum with palm of hand 3 times)",
      options: [
        "0: Begins to fall",
        "1: Staggers, grabs, but catches self",
        "2: Steady"
      ]
    },
    {
      number: 7,
      title: "Eyes Closed",
      instruction: "(person stands with feet as close together as possible)",
      options: [
        "0: Unsteady",
        "1: Steady"
      ]
    },
    {
      number: 8,
      title: "Turning 360°",
      instruction: "",
      options: [
        "0: Discontinuous step",
        "1: Continuous steps"
      ]
    },
    {
      number: 9,
      title: "Turning 360° Stability",
      instruction: "",
      options: [
        "0: Unsteady (grabs, staggers)",
        "1: Steady"
      ]
    },
    {
      number: 10,
      title: "Sitting down",
      instruction: "",
      options: [
        "0: Unsafe (misjudges distance, falls into chair)",
        "1: Uses arms or not smooth motion",
        "2: Safe, smooth motion"
      ]
    }
  ];

  // Gait test items
  gaitItems = [
    {
      number: 1,
      title: "Initiation of Gait",
      instruction: "(immediately after told to 'go')",
      options: [
        "0: Any hesitancy or multiple attempts to start",
        "1: No hesitancy"
      ]
    },
    {
      number: 2,
      title: "Right Step Length",
      instruction: "",
      options: [
        "0: Right swing foot does not pass left stance foot with step",
        "1: Passes left stance foot"
      ]
    },
    {
      number: 3,
      title: "Right Foot Clearance",
      instruction: "",
      options: [
        "0: Right foot does not clear floor completely with step",
        "1: Right foot completely clears floor"
      ]
    },
    {
      number: 4,
      title: "Left Step Length",
      instruction: "",
      options: [
        "0: Left swing foot does not pass right stance foot with step",
        "1: Passes right stance foot"
      ]
    },
    {
      number: 5,
      title: "Left Foot Clearance",
      instruction: "",
      options: [
        "0: Left foot does not clear floor completely with step",
        "1: Left foot completely clears floor"
      ]
    },
    {
      number: 6,
      title: "Step Symmetry",
      instruction: "",
      options: [
        "0: Right and left step length not equal (estimate)",
        "1: Right and left step length appear equal"
      ]
    },
    {
      number: 7,
      title: "Step Continuity",
      instruction: "",
      options: [
        "0: Stopping or discontinuity between steps",
        "1: Steps appear continuous"
      ]
    },
    {
      number: 8,
      title: "Path",
      instruction: "(estimated in relation to floor tiles, 12-inch; observe excursion of 1 foot over about 10 ft. of the course)",
      options: [
        "0: Marked deviation",
        "1: Mild/moderate deviation or uses walking aid",
        "2: Straight without walking aid"
      ]
    },
    {
      number: 9,
      title: "Trunk",
      instruction: "",
      options: [
        "0: Marked sway or uses walking aid",
        "1: No sway but flexion of knees or back or spreads arms out while walking",
        "2: No sway, no flexion, no use of arms, and no use of walking aid"
      ]
    },
    {
      number: 10,
      title: "Walking Stance",
      instruction: "",
      options: [
        "0: Heels apart",
        "1: Heels almost touching while walking"
      ]
    }
  ];

  constructor(private fb: FormBuilder, private omtTestService:OmtTestService) {
    this.tinettiForm = this.createForm();
  }
  createForm(): FormGroup {
    const formGroup: any = {};
    
    // Create form controls for all balance items
    for (let i = 1; i <= 10; i++) {
      formGroup[`B${i}`] = [null, Validators.required];
    }
    
    // Create form controls for all gait items
    for (let i = 1; i <= 10; i++) {
      formGroup[`G${i}`] = [null, Validators.required];
    }
    
    return this.fb.group(formGroup);
  }

  toggleInstructions(): void {
    this.showInstructions = !this.showInstructions;
  }
  calculateScore(): void {
    if (this.tinettiForm.invalid) {
      // Mark all fields as touched to show validation errors
      Object.keys(this.tinettiForm.controls).forEach(key => {
        this.tinettiForm.get(key)?.markAsTouched();
      });
      return;
    }
    const result = this.fillAnswers()

    
    this.omtTestService.balance(result).subscribe(val => {
      this.getResult.emit(val)
    })
  }
  private fillAnswers(){
    const answers: Record<string, number> = {};
    for (var i = 1; i <= 10; i++) {
      const key = `${'B' + i}`
      const value = this.tinettiForm.value[key];
      answers[key] = value !== null && value !== undefined ? parseInt(value, 10) : null;
    }
    for (var i = 1; i <= 10; i++) {
      const key = `${'G' + i}`
      const value = this.tinettiForm.value[key];
      answers[key] = value !== null && value !== undefined ? parseInt(value, 10) : null;
    }
    return { answers, "testType": "tinetti" };
  }
  resetForm(): void {
    this.tinettiForm.reset();
  }
  ngOnInit(): void {
  }

}
