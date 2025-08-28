import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'show-omttest',
  templateUrl: './show-omttest.component.html',
  styleUrls: ['./show-omttest.component.css']
})
export class ShowOMTTestComponent implements OnInit {
  @Output() data = new EventEmitter<any>()
  getResult(result: any) {
    this.data.emit(result)
  }
  @Input() testName: string

  constructor() { }
  ngOnInit(): void {
  }

}
