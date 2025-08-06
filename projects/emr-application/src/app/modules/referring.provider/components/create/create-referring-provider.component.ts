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
  @Input() componentRole: string[]
  @Input() selectedreferringProvider: ReferringProvider
  @Output() changeVisibility = new EventEmitter<string>()
  constructor(private referringProviderService: ReferringProviderService
    , private toastr: ToastrService
    , private loggedInService: LoggedInService) { }

  ngOnInit(): void {
    if (this.selectedreferringProvider)
      this.referringProvider = this.selectedreferringProvider
  }
  submit() {
    if (this.mode === 'create')
      this.create();
    if (this.mode === 'update')
      this.update()

  }

  private create() {
    this.referringProvider.organizationId = this.loggedInService.getLoggedUser().organizationId
    this.referringProviderService.create(this.referringProvider)
      .subscribe(result => {
        this.changeVisibility.emit('create-close')
        this.toastr.success('Referring Provider Created.');
      })
  }

  private update() {
    this.referringProviderService.update(this.referringProvider).subscribe(result => {
      this.changeVisibility.emit('update-close')
      this.toastr.success('Referring Provider updated.');
    })
  }
}
