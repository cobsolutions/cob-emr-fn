import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { BehaviorSubject, from, map, Observable, of, switchMap, tap, shareReplay, catchError, timeout, throwError } from 'rxjs';
import { UserService } from '../../../administration/services/user/user.service';
import { EncryptService } from '../../../common/service/encyrption/encrypt.service';
import { LoggedInUser } from '../../model/loggedin.user';

@Injectable({
  providedIn: 'root'
})
export class LoggedInService {
  public selectedClinic$: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  public changeSelectedClinic$: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);

  // Cache the observable to prevent multiple HTTP calls
  private loggedUserCache$: Observable<LoggedInUser> | null = null;

  constructor(
    private userService: UserService
    , private keycloakService: KeycloakService
    , private encryptService: EncryptService) { }

  public getObservableLoggedUser(): Observable<LoggedInUser> {
    // Return from localStorage if available
    if (localStorage.getItem('LOGGEDINUSR')) {
      return of(this.getLoggedUser());
    }

    // Return cached observable if already in progress
    if (this.loggedUserCache$) {
      return this.loggedUserCache$;
    }

    // Create new observable and cache it
    this.loggedUserCache$ = from(this.keycloakService.getKeycloakInstance().loadUserInfo()).pipe(
      timeout(10000), // 10 second timeout
      switchMap((user: any) => {
        return this.userService.getLoggedInUser(user.sub).pipe(
          timeout(10000), // 10 second timeout for user service
          catchError(error => {
            if (error.status === 403 && error.error?.errorCode === 'FORBIDDEN') {
              throw error;
            }
            console.error('Error fetching user from service:', error);
            // Return a minimal user object for admin users who may not have a user record
            return of(this.createMinimalUser(user));
          })
        );
      }),
      tap(loggedInUser => {
        if (loggedInUser) {
          const _str: string = JSON.stringify(loggedInUser);
          localStorage.setItem('LOGGEDINUSR', this.encryptService.encrypt(_str));
        }
        // Clear cache after successful completion
        this.loggedUserCache$ = null;
      }),
      catchError(error => {
        console.error('Error loading user info:', error);
        this.loggedUserCache$ = null;
        if (error.status === 403 && error.error?.errorCode === 'FORBIDDEN') {
          return throwError(() => error);
        }
        // Return minimal user from keycloak token
        return from(this.keycloakService.getKeycloakInstance().loadUserProfile()).pipe(
          map(profile => this.createMinimalUserFromProfile(profile)),
          catchError(() => of(this.createEmptyUser()))
        );
      }),
      shareReplay(1) // Share the result with all subscribers
    );

    return this.loggedUserCache$;
  }

  private createMinimalUser(keycloakUser: any): LoggedInUser {
    return {
      id: keycloakUser.sub,
      userName: keycloakUser.preferred_username || keycloakUser.email || 'admin',
      firstName: keycloakUser.given_name || '',
      lastName: keycloakUser.family_name || '',
      email: keycloakUser.email || '',
      clinics: [],
      userRoleScope: []
    } as LoggedInUser;
  }

  private createMinimalUserFromProfile(profile: any): LoggedInUser {
    return {
      id: profile.id,
      userName: profile.username || profile.email || 'admin',
      firstName: profile.firstName || '',
      lastName: profile.lastName || '',
      email: profile.email || '',
      clinics: [],
      userRoleScope: []
    } as LoggedInUser;
  }

  private createEmptyUser(): LoggedInUser {
    return {
      id: '',
      userName: 'admin',
      firstName: '',
      lastName: '',
      email: '',
      clinics: [],
      userRoleScope: []
    } as LoggedInUser;
  }

  public getLoggedUser(): LoggedInUser {
    const storedUser = localStorage.getItem('LOGGEDINUSR');
    if (!storedUser) {
      return this.createEmptyUser();
    }
    try {
      const _decryptUser: string = this.encryptService.decrypt(storedUser);
      return JSON.parse(_decryptUser);
    } catch (error) {
      console.error('Error decrypting user:', error);
      return this.createEmptyUser();
    }
  }

  public clearCache(): void {
    this.loggedUserCache$ = null;
    localStorage.removeItem('LOGGEDINUSR');
  }
}
