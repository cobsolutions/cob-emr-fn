import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { BehaviorSubject, from, map, Observable, of, switchMap, tap } from 'rxjs';
import { UserService } from '../../../administration/services/user/user.service';
import { EncryptService } from '../../../common/service/encyrption/encrypt.service';
import { LoggedInUser } from '../../model/loggedin.user';

@Injectable({
  providedIn: 'root'
})
export class LoggedInService {
  public selectedClinic$: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  public changeSelectedClinic$: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  constructor(
    private userService: UserService
    , private keycloakService: KeycloakService
    , private encryptService: EncryptService) { }

  public getObservableLoggedUser() {
    if (!localStorage.getItem('LOGGEDINUSR')) {
      return from(this.keycloakService.getKeycloakInstance().loadUserInfo()).pipe(
        switchMap((user: any) => {
          return this.userService.getLoggedInUser(user.sub)
        }), tap(loggedInUser => {
          const _str: string = JSON.stringify(loggedInUser);
          localStorage.setItem('LOGGEDINUSR', this.encryptService.encrypt(_str));
        })
      )
    } else {
      return of(this.getLoggedUser())
    }
  }
  public getLoggedUser(): LoggedInUser {
    const _decryptUser: string = this.encryptService.decrypt(localStorage.getItem('LOGGEDINUSR'));
    return JSON.parse(_decryptUser);
  }
}
