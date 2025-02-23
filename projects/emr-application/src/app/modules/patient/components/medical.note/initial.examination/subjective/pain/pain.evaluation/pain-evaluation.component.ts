import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PainDescription } from '../../../../lookups/pain.description';

@Component({
  selector: 'pain-evaluation',
  templateUrl: './pain-evaluation.component.html',
  styleUrls: ['./pain-evaluation.component.css']
})
export class PainEvaluationComponent implements OnInit {
  numbers = ['NT', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  @Input() painScale: string
  @Output() removePainScale = new EventEmitter<string>()
  painLevels = [
    { label: 'At worst:', control: 'atWorst' },
    { label: 'Current:', control: 'current' },
    { label: 'At best:', control: 'atBest' }
  ];
  descriptions: string[] = PainDescription;
  constructor() { }
  ngOnInit(): void {
  }
  remove() {
    this.removePainScale.emit(this.painScale);
  }
}
