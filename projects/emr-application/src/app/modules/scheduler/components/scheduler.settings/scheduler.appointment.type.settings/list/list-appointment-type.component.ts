import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AppointmentType } from '../../../../models/appointment.type';
import { AppointmentTypeService } from '../../../../service/appointment.type/appointment-type.service';

@Component({
  selector: 'list-appointment-type',
  templateUrl: './list-appointment-type.component.html',
  styleUrls: ['./list-appointment-type.component.css']
})
export class ListAppointmentTypeComponent implements OnInit {
  addVisibility: boolean = false;
  editVisibility: boolean = false;
  appointmentTypes: Observable<AppointmentType[]>
  selectedtype: AppointmentType;
  constructor(private appointmentTypeService: AppointmentTypeService) { }

  ngOnInit(): void {
    this.find();
  }
  openCreateModal() {
    this.addVisibility = true
  }
  openEditModal(type: AppointmentType) {
    this.selectedtype = type;
    this.editVisibility = true
  }
  toggleAdd() {
    this.addVisibility = false;
  }
  toggleEdit() {
    this.editVisibility = false;
  }
  private find() {
    this.appointmentTypes = this.appointmentTypeService.retrieveAppointmentTypes().pipe(
      map(result => {
        return result.records;
      })
    )
  }
  changeAddModalVisibility(event) {
    if (event === 'close') {
      this.addVisibility = false;
      this.find();
    }
  }
  changeEditModalVisibility(event) {
    if (event === 'close') {
      this.editVisibility = false;
      this.find();
    }
  }

}
