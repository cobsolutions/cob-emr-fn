import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list-checkbox-with-child',
  templateUrl: './list-checkbox-with-child.component.html',
  styleUrls: ['./list-checkbox-with-child.component.css']
})
export class ListCheckboxWithChildComponent implements OnInit {
  @Input() formGroup!: FormGroup;
  @Input() title:string
  /*
    TODO
    Vertical checkboxes with label.
    each checkbox has its child may be input text or textArea.
    all checkboxes and its child add to formGroup with prefix with title
    prefix title will be lowercase underscore between words if found
    Style of these checkboxes is lie what u did in vertical checkboxes.
  */
  constructor() { }

  ngOnInit(): void {
  }

}
