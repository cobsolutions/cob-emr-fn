import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-procedures',
  templateUrl: './procedures.component.html',
  styleUrls: ['./procedures.component.css']
})
export class ProceduresComponent implements OnInit {
  proceduresForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() fields: any
  constructor() { }

  ngOnInit(): void {
  }

}
