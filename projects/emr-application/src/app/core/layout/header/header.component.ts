import { Component, Input } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

import { ClassToggleService, HeaderComponent } from '@coreui/angular-pro';
import { filter } from 'rxjs';
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
  loggedIn: string
  @Input() sidebarId: string = "sidebar1";
  selectedValue: string | null = null;
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
    this.loggedInService.changeSelectedClinic$.pipe(
      filter(id => id !== null)
    ).subscribe((id: any) => {
      this.selectedValue = id;
    })
    this.ksAuthService.isLoggedIn()
      .then((loggedIn) => {
        if (loggedIn) {
          // this.loggedInService.getObservableLoggedUser().subscribe(loggedInUser => {
            var result: LoggedInUser = this.loggedInService.getLoggedUser();
            this.userName = result.userName
            this.clinics = result.clinics
            this.selectedValue = result.clinics[0].id
            this.loggedInService.selectedClinic$.next(Number(result.clinics[0].id))
            this.loggedIn = this.capitalizeFirstLetter(result.lastName) + '' + this.capitalizeFirstLetter(result.firstName)
          // })
        }
      });
  }
  private capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase();
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
