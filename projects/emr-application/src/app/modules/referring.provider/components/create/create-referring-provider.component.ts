import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { map, switchMap } from 'rxjs';
import { LoggedInUser } from '../../../security/model/loggedin.user';
import { LoggedInService } from '../../../security/service/loggedIn/logged-in.service';
import { ReferringProvider } from '../../model/referring.provider';
import { ReferringProviderService } from '../../service/referring-provider.service';

@Component({
  selector: 'create-referring-provider',
  templateUrl: './create-referring-provider.component.html',
  styleUrls: ['./create-referring-provider.component.css']
})
export class CreateReferringProviderComponent implements OnInit {
  referringProvider: ReferringProvider = {}
  @Input() mode?: string
  @Output() changeVisibility = new EventEmitter<string>()
  constructor(private referringProviderService: ReferringProviderService
    , private toastr: ToastrService
    , private loggedInService: LoggedInService) { }

  ngOnInit(): void {
  }
  create() {
    this.loggedInService.load().pipe(
      map((loggedInUser: LoggedInUser) => {
        return loggedInUser.organizationId
      })
      , switchMap((organizationId: number) => {
        this.referringProvider.organizationId = organizationId
        return this.referringProviderService.create(this.referringProvider)
      })
    )
      .subscribe(result => {
        this.changeVisibility.emit('close')
        this.toastr.success('Referring Provider Created.');
      })
  }
}
