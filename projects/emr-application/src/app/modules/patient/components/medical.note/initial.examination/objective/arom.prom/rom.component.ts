import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MedialNoteService } from '../../../../../services/medical.note/medial-note.service';

@Component({
  selector: 'rom-test',
  templateUrl: './rom.component.html',
  styleUrls: ['./rom.component.css']
})
export class RomComponent implements OnInit {
  movementForm!: FormGroup;
  @Input() testName:string
  // Define movements as a list of objects
  movementOptions :any;


  constructor(private fb: FormBuilder , private medialNoteService:MedialNoteService) {}

  ngOnInit(): void {
    this.medialNoteService.findROMTests(this.testName).subscribe(tests=>{
      this.movementOptions = tests;
      this.movementForm = this.fb.group({});
      this.movementOptions.forEach(movement => {
        this.movementForm.addControl(`right_${movement.name}`, this.fb.control(movement.values.right[0]));
        this.movementForm.addControl(`left_${movement.name}`, this.fb.control(movement.values.left[0]));
      });
    })
  }

  submitForm() {
    console.log(this.movementForm.value);
  }
}
