import { Component, OnInit } from '@angular/core';
import { EncryptService } from '../../common/service/encyrption/encrypt.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private encryptService: EncryptService) { }

  ngOnInit(): void {
    const enc = this.encryptService.encrypt('Khaled@123');
    console.log(this.encryptService.decrypt(enc))
  }

}
