import { Component, Input } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

import { ClassToggleService, HeaderComponent } from '@coreui/angular-pro';
import { result } from 'lodash';
import { switchMap } from 'rxjs';
import { ClinicService } from '../../../modules/administration/services/clinic/clinic.service';
import { CacheService } from '../../../modules/common/service/cahce/cache.service';
import { ClinicEmittingService } from '../../../modules/common/service/emitting/clinic-emitting.service';
import { Clinic } from '../../../modules/patient/models/clinic';
import { LoggedInUser } from '../../../modules/security/model/loggedin.user';



import { KcAuthService } from '../../../modules/security/service/kc-auth.service';
import { LoggedInService } from '../../../modules/security/service/loggedIn/logged-in.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {
  clinics: Clinic[] = new Array();
  selectedClinicId: number;
  userName: string | undefined;
  @Input() sidebarId: string = "sidebar1";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  public themeSwitch = new UntypedFormGroup({
    themeSwitchRadio: new UntypedFormControl('light'),
  });

  constructor(private classToggler: ClassToggleService
    , private ksAuthService: KcAuthService
    , private loggedInService: LoggedInService) {
    super();
  }
  ngOnInit(): void {
    this.ksAuthService.isLoggedIn()
      .then((loggedIn) => {
        if (loggedIn) {
          this.loggedInService.load().subscribe((result: LoggedInUser) => {
            this.userName = result.userName
            this.clinics = result.clinics
          })
        }
      })
  }

  setTheme(value: string): void {
    this.themeSwitch.setValue({ themeSwitchRadio: value });
    this.classToggler.toggle('body', 'dark-theme');
  }
  logout() {
    this.ksAuthService.logout()
  }
  setSelectedClinic(event: any) {
    this.loggedInService.selectedClinic$.next(event.target.value)
  }
}
