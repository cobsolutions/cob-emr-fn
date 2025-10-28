import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'assessment-problem',
  templateUrl: './assessment-problem.component.html',
  styleUrls: ['./assessment-problem.component.scss']
})
export class AssessmentProblemComponent implements OnInit {
  @Input() problems!: FormArray;

  // 🔹 Emit actions back to parent
  @Output() problemAdded = new EventEmitter<string>();
  @Output() problemEdited = new EventEmitter<{ index: number; value: string }>();
  @Output() problemRemoved = new EventEmitter<number>();

  showModal = false;
  modalTitle = 'Add Problem';
  editIndex: number | null = null;
  descriptionControl = new FormControl('');

  // --- UI handlers ---
  openAddModal() {
    this.modalTitle = 'Add Problem';
    this.descriptionControl.reset();
    this.editIndex = null;
    this.showModal = true;
  }

  openEditModal(index: number) {
    this.modalTitle = 'Edit Problem';
    this.editIndex = index;
    this.descriptionControl.setValue(this.problems.at(index).value);
    this.showModal = true;
  }

  save() {
    const value = this.descriptionControl.value?.trim();
    if (!value) return;

    if (this.editIndex !== null) {
      // Edit existing
      this.problems.at(this.editIndex).setValue(value);
      this.problemEdited.emit({ index: this.editIndex, value });
    } else {
      // Add new
      this.problemAdded.emit(value);
    }
    this.closeModal();
  }

  removeProblem(index: number) {
    this.problemRemoved.emit(index);
  }

  closeModal() {
    this.showModal = false;
    this.descriptionControl.reset();
    this.editIndex = null;
  }
  ngOnInit(): void {
  }
}

