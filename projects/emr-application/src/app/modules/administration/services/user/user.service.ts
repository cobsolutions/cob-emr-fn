import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { environment } from 'projects/emr-application/src/environments/environment';
import { from, map, of } from 'rxjs';
import { User } from '../../model/user/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private clinicalUserUrl = environment.baseURL + '/clinical/user'
  private clericalUserUrl = environment.baseURL + '/clerical/user'
  private userUrl = environment.baseURL + '/user'
  uuid: string
  accessToken: string;
  constructor(private httpClient: HttpClient
    , private keycloakAngular: KeycloakService) { }
  createClinicalUser(user: User) {
    const headers = { 'content-type': 'application/json' }
    var createURL = this.clinicalUserUrl + '/create'
    return this.httpClient.post(`${createURL}`, JSON.stringify(user), { 'headers': headers })
  }
  updateClinicalUser(user: User) {
    const headers = { 'content-type': 'application/json' }
    var createURL = this.clinicalUserUrl + '/update'
    return this.httpClient.put(`${createURL}`, JSON.stringify(user), { 'headers': headers })
  }
  createClericalUser(user: User) {
    const headers = { 'content-type': 'application/json' }
    var createURL =  this.clericalUserUrl + '/create'
    return this.httpClient.post(`${createURL}`, JSON.stringify(user), { 'headers': headers })
  }
  updateClericalUser(user: User) {
    const headers = { 'content-type': 'application/json' }
    var createURL =  this.clericalUserUrl + '/update'
    return this.httpClient.put(`${createURL}`, JSON.stringify(user), { 'headers': headers })
  }
  update(user: User) {
    const headers = { 'content-type': 'application/json' }
    var createURL = this.clinicalUserUrl + '/update'
    return this.httpClient.put(`${createURL}`, JSON.stringify(user), { 'headers': headers })
  }
  getByUUID(uuid: string) {
    var url = this.clinicalUserUrl + '/find/uuid/' + uuid;
    return this.httpClient.get(url);
  }
  public gteUUID() {
    if (this.uuid === undefined) {
      return from(this.keycloakAngular.getKeycloakInstance().loadUserInfo()).pipe(
        map((userProfile: any) => {

          this.uuid = userProfile.sub;
          return userProfile.sub;
        })
      )
    } else {
      return of(this.uuid);
    }
  }
  public findUSerRoleScope(uuid: string, roles: string[]) {
    const headers = { 'content-type': 'application/json' }
    var url = this.userUrl + '/scope/find/uuid/' + uuid + '/roles/' + roles;
    return this.httpClient.get(`${url}`, { 'headers': headers })
  }
  public getAccessToken() {
    if (this.accessToken === undefined) {
      return from(this.keycloakAngular.getToken()).pipe(
        map((accessToken: any) => {
          this.accessToken = accessToken;
          return accessToken;
        })
      )
    } else {
      return of(this.accessToken);
    }
  }
  checkUserName(userName:string){
    var url = this.userUrl +'/check/username/' + userName
    return this.httpClient.get(url);
  }
  checkEmail(email:string){
    var url = this.userUrl +'/check/email/' + email
    return this.httpClient.get(url);
  }
}
