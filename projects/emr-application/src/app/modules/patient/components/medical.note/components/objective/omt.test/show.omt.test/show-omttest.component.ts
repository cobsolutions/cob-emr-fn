import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'show-omttest',
  templateUrl: './show-omttest.component.html',
  styleUrls: ['./show-omttest.component.css']
})
export class ShowOMTTestComponent implements OnInit {
  @Input() testName: string
  constructor() { }

  ngOnInit(): void {
    console.log(this.testName)
  }

}
