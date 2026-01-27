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
  styleUrls: ['./header.component.scss'],
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
          // Try to get user from localStorage first
          let result: LoggedInUser = this.loggedInService.getLoggedUser();

          // If not in localStorage, fetch from observable
          if (!result) {
            this.loggedInService.getObservableLoggedUser().subscribe({
              next: (loggedInUser: LoggedInUser) => {
                this.initializeUserData(loggedInUser);
              },
              error: (error) => {
                console.error('Error loading user data:', error);
              }
            });
          } else {
            this.initializeUserData(result);
          }
        }
      });
  }

  private initializeUserData(result: LoggedInUser): void {
    if (!result) return;

    this.userName = result.userName;

    // Handle clinics - may be empty for admin users
    if (result.clinics && result.clinics.length > 0) {
      this.clinics = result.clinics;
      this.selectedValue = result.clinics[0].id;
      this.loggedInService.selectedClinic$.next(Number(result.clinics[0].id));
    }

    // Handle user initials display - fallback to username or 'U' if no name
    const lastName = result.lastName || '';
    const firstName = result.firstName || '';
    const initials = this.capitalizeFirstLetter(lastName) + this.capitalizeFirstLetter(firstName);
    this.loggedIn = initials || (result.userName ? result.userName.charAt(0).toUpperCase() : 'U');
  }
  private capitalizeFirstLetter(str: string): string {
    if (!str || str.length === 0) return '';
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
