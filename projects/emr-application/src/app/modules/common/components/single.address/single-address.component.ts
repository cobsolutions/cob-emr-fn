import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Address, AddressType, Countries, Country, States } from '../../models';
@Component({
  selector: 'app-single-address',
  templateUrl: './single-address.component.html',
  styleUrls: ['./single-address.component.css']
})
export class SingleAddressComponent implements OnInit {
  @ViewChild('singleAddressForm') singleAddressForm: NgForm;
  countries: Country[] = Countries;
  states: string[] = States;
  addressKeys = Object.values;
  addressTypes = AddressType;
  @Input() address: Address;
  @Input() submitted: boolean = false;
  @Input() componentRole: string[]
  constructor() { }

  ngOnInit(): void {
  }

  public getAddress() {
    var address: Address = {
      addressType: this.address.addressType,
      firstAddress: this.address.firstAddress,
      secondAddress: this.address.secondAddress,
      country: this.address.country,
      province: this.address.province,
      state: this.address.state,
      city: this.address.city,
      zipCode: this.address.zipCode
    }
    return address;
  }
  public resetSingleAddressForm() {
    this.singleAddressForm.reset();
  }

}
