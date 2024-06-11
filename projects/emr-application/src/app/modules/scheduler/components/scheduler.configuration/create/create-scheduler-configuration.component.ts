import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'create-scheduler-configuration',
  templateUrl: './create-scheduler-configuration.component.html',
  styleUrls: ['./create-scheduler-configuration.component.css']
})
export class CreateSchedulerConfigurationComponent implements OnInit {
  @Input() mode: string;
  @Output() changeVisibility = new EventEmitter<string>()
  constructor() { }

  ngOnInit(): void {
  }
  submit() {
    if (this.mode == 'create')
      this.create()
    if (this.mode == 'update')
      this.update()
  }
  update() {
    this.changeVisibility.emit('close-create')
    throw new Error('Method not implemented.');
  }
  create() {
    this.changeVisibility.emit('close-update')
    throw new Error('Method not implemented.');
  }
}
