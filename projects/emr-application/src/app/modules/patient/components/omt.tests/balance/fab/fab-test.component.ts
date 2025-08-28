import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OmtTestService } from '../../../../services/test/omt-test.service';

@Component({
  selector: 'balance-fab-test',
  templateUrl: './fab-test.component.html',
  styleUrls: ['./fab-test.component.css']
})
export class FabTestComponent implements OnInit {
  fabForm: FormGroup;
  showInstructions = false;

  // FAB Scale test items
  fabItems = [
    {
      number: 1,
      title: "Stand with feet together and eyes closed",
      options: [
        "Unable to obtain the correct standing position independently",
        "Able to obtain the correct standing position independently but unable to maintain the position or keep the eyes closed for more than 10 seconds",
        "Able to maintain the correct standing position with eyes closed for more than 10 seconds but less than 30 seconds",
        "Able to maintain the correct standing position with eyes closed for 30 seconds but requires close supervision",
        "Able to maintain the correct standing position safely with eyes closed for 30 seconds"
      ]
    },
    {
      number: 2,
      title: "Reach forward to retrieve an object (pencil) held at shoulder height with outstretched arm",
      options: [
        "Unable to reach the pencil without taking more than two steps",
        "Able to reach the pencil but needs to take two steps",
        "Able to reach the pencil but needs to take one step",
        "Can reach the pencil without moving the feet but requires supervision",
        "Can reach the pencil safely and independently without moving the feet"
      ]
    },
    {
      number: 3,
      title: "Turn 360 degrees in right and left directions",
      options: [
        "Needs manual assistance while turning",
        "Needs close supervision or verbal cueing while turning",
        "Able to turn 360 degrees but takes more than four steps in both directions",
        "Able to turn 360 degrees but unable to complete in four steps or fewer in one direction",
        "Able to turn 360 degrees safely taking four steps or fewer in both directions"
      ]
    },
    {
      number: 4,
      title: "Step up onto and over a 6-inch bench",
      options: [
        "Unable to step up onto the bench without loss of balance or manual assistance",
        "Able to step up onto the bench with leading leg, but trailing leg contacts the bench or leg swings around the bench during the swing-through phase in both directions",
        "Able to step up onto the bench with leading leg, but trailing leg contacts the bench or swings around the bench during the swing-through phase in one direction",
        "Able to correctly complete the step up and over in both directions but requires close supervision in one or both directions",
        "Able to correctly complete the step up and over in both directions safely and independently"
      ]
    },
    {
      number: 5,
      title: "Tandem walk",
      options: [
        "Unable to complete 10 steps independently",
        "Able to complete the 10 steps with more than five interruptions",
        "Able to complete the 10 steps with three to five interruptions",
        "Able to complete the 10 steps with one to two interruptions",
        "Able to complete the 10 steps independently and with no interruptions"
      ]
    },
    {
      number: 6,
      title: "Stand on one leg",
      options: [
        "Unable to try or needs assistance to prevent falling",
        "Able to lift leg independently but unable to maintain position for more than 5 seconds",
        "Able to lift leg independently and maintain position for more than 5 but less than 12 seconds",
        "Able to lift leg independently and maintain position for 12 or more seconds but less than 20 seconds",
        "Able to lift leg independently and maintain position for the full 20 seconds"
      ]
    },
    {
      number: 7,
      title: "Stand on foam with eyes closed",
      options: [
        "Unable to step onto foam or maintain standing position independently with eyes open",
        "Able to step onto foam independently and maintain standing position but unable or unwilling to close eyes",
        "Able to step onto foam independently and maintain standing position with eyes closed for 10 seconds or less",
        "Able to step onto foam independently and maintain standing position with eyes closed for more than 10 seconds but less than 20 seconds",
        "Able to step onto foam independently and maintain standing position with eyes closed for 20 seconds"
      ]
    },
    {
      number: 8,
      title: "Two-footed jump",
      instruction: "Do not introduce test item #8 if test item #4 was not performed safely and/or it is contraindicated to perform this test item. Score a zero and move to next test item.",
      options: [
        "Unwilling or unable to attempt or attempts to initiate two-footed jump, but one or both feet do not leave the floor",
        "Able to initiate two-footed jump, but one foot either leaves the floor or lands before the other",
        "Able to perform two-footed jump, but unable to jump farther than the length of their own feet",
        "Able to perform two-footed jump and achieve a distance greater than the length of their own feet",
        "Able to perform two-footed jump and achieve a distance greater than twice the length of their own feet"
      ]
    },
    {
      number: 9,
      title: "Walk with head turns",
      options: [
        "Unable to walk 10 steps independently while maintaining 30º head turns at an established pace",
        "Able to walk 10 steps independently but unable to complete required number of 30º head turns at an established pace",
        "Able to walk 10 steps but veers from a straight line while performing 30º head turns at an established pace",
        "Able to walk 10 steps in a straight line while performing 30º head turns at an established pace but head turns less than 30º in one or both directions",
        "Able to walk 10 steps in a straight line while performing required number of 30º head turns at established pace"
      ]
    },
    {
      number: 10,
      title: "Reactive postural control",
      options: [
        "Unable to maintain upright balance; no observable attempt to step; requires manual assistance to restore balance",
        "Unable to maintain upright balance; takes two or more steps and requires manual assistance to restore balance",
        "Unable to maintain upright balance; takes more than two steps but is able to restore balance independently",
        "Unable to maintain upright balance; takes two steps but is able to restore balance independently",
        "Unable to maintain upright balance but able to restore balance independently with only one step"
      ]
    }
  ];

  constructor(private fb: FormBuilder, private omtTestService:OmtTestService) {
    this.fabForm = this.createForm();
  }
  createForm(): FormGroup {
    const formGroup: any = {};
    
    // Create form controls for all 10 FAB items
    for (let i = 1; i <= 10; i++) {
      formGroup[`Q${i}`] = [null, Validators.required];
    }
    
    return this.fb.group(formGroup);
  }

  toggleInstructions(): void {
    this.showInstructions = !this.showInstructions;
  }
  calculateScore(): void {
    if (this.fabForm.invalid) {
      // Mark all fields as touched to show validation errors
      Object.keys(this.fabForm.controls).forEach(key => {
        this.fabForm.get(key)?.markAsTouched();
      });
      return;
    }
    const result = this.fillAnswers()
    console.log(JSON.stringify(result))
    
    this.omtTestService.balance(result).subscribe(rr => {
      console.log(JSON.stringify(rr))
    })
  }
  private fillAnswers() {
    const answers: Record<string, number> = {};
    for (var i = 1; i <= 10; i++) {
      const key = `${'Q' + i}`
      const value = this.fabForm.value[key];
      answers[key] = value !== null && value !== undefined ? parseInt(value, 10) : null;
    }
    return { answers, "testType": "fab" };
  }
  resetForm(): void {
    this.fabForm.reset();
  }

  ngOnInit(): void {
    
  }
 
}
