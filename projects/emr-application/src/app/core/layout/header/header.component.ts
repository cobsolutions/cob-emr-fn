import { Component, Input } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

import { ClassToggleService, HeaderComponent } from '@coreui/angular-pro';
import { switchMap } from 'rxjs';
import { ClinicService } from '../../../modules/administration/services/clinic/clinic.service';
import { CacheService } from '../../../modules/common/service/cahce/cache.service';
import { ClinicEmittingService } from '../../../modules/common/service/emitting/clinic-emitting.service';
import { Clinic } from '../../../modules/patient/models/clinic';



import { KcAuthService } from '../../../modules/security/service/kc-auth.service';

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
    , private emittingClinicService: ClinicEmittingService
    , private clinicService: ClinicService
    , private cacheService: CacheService) {
    super();
  }
  ngOnInit(): void {
    this.ksAuthService.isLoggedIn()
      .then((loggedIn) => {
        if (loggedIn) {
          this.ksAuthService.loadUserProfile()
            .then((userProfile) => {
              this.cacheService.setLoggedinUserUUID(userProfile.id!)
              this.cacheService.setLoggedinUserName(userProfile.username!);
              this.userName = this.cacheService.getLoggedinUserName()?.charAt(0).toUpperCase()
              this.clinicService.getByUserId(this.cacheService.getLoggedinUserUUID()).subscribe(response => {
                if (response !== null && response.length !== 0) {
                  this.clinics = response;
                  localStorage.setItem('org', this.clinics[0].organizationId.toString())
                  this.emittingClinicService.selectedClinic$.next(Number(this.clinics[0].id))
                }
              })
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
    this.emittingClinicService.selectedClinic$.next(event.target.value)
  }
}
