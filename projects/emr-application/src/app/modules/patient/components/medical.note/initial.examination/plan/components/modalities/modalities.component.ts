import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modalities',
  templateUrl: './modalities.component.html',
  styleUrls: ['./modalities.component.css']
})
export class ModalitiesComponent implements OnInit {
  modalitiesForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() fields: any
  constructor() { }

  ngOnInit(): void {
  }

}
