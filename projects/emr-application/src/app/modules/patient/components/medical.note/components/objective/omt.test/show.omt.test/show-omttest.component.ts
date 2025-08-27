import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'show-omttest',
  templateUrl: './show-omttest.component.html',
  styleUrls: ['./show-omttest.component.css']
})
export class ShowOMTTestComponent implements OnInit {
  @Output() changeVisibility = new EventEmitter<string>()
  getResult(result: any) {
    console.log(JSON.stringify(result))
    if (result !== null)
      this.changeVisibility.emit('close')
  }
  @Input() testName: string
  constructor() { }

  ngOnInit(): void {
    console.log(this.testName)
  }

}
