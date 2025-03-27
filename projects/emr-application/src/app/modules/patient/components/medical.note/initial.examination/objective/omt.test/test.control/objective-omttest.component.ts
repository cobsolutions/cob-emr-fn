import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OMTTestControl } from '../model/omt.test.control';

@Component({
  selector: 'app-objective-omttest',
  templateUrl: './objective-omttest.component.html',
  styleUrls: ['./objective-omttest.component.css']
})
export class ObjectiveOMTTestComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() layout: 'horizontal' | 'vertical' = 'vertical';
  @Input() controls: OMTTestControl[]
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.controls.forEach(control => {
      this.form.addControl(control.id, this.fb.control(''));
    })
  }

}
