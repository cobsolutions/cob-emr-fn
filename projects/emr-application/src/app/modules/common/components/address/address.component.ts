import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BasicComponent } from 'projects/emr-application/src/app/util/basic.component';
import { Address, AddressType, Countries, Country, States } from '../../models';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent extends BasicComponent implements OnInit, AfterViewInit {
  countries: Country[] = Countries;
  states: string[] = States;
  addressKeys = Object.values;
  addressTypes = AddressType;
  address: Address = {
    addressType: null,
    other: null,
    firstAddress: null,
    secondAddress: null,
    country: null,
    city: null,
    province: null,
    state: null,
    zipCode: null
  }
  @Input() addresses: Address[] = []
  @ViewChild('addressForm') addressForm: NgForm;
  @Output() pushedAddresses = new EventEmitter<Address[]>();
  @Input() componentRole: string[] 
  constructor() { super() }
  ngAfterViewInit(): void {
    this.setForm(this.addressForm);
  }
  add() {
    if (this.addressForm.valid) {
      let pushedAddress: Address = Object.assign({}, this.address);
      this.addresses.push(pushedAddress);
      this.addressForm.reset();
      this.pushedAddresses.emit(this.addresses);
    }
  }
  remove(index: number) {
    this.addresses.splice(index, 1);
  }
  ngOnInit(): void {
  }
  public clearForm(){
    this.addressForm.reset();
  }
}
