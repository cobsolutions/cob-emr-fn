import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/emr-application/src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { IApiParams } from '../../../common/interfaces/api.params';
import { BasePaginationService } from '../../../common/service/base-pagination.service';
import { LoggedInService } from '../../../security/service/loggedIn/logged-in.service';

@Injectable({
  providedIn: 'root'
})
export class ClericlaUserService extends BasePaginationService {
  private baseUrl = environment.baseURL + 'clerical/user'

  constructor(httpClient: HttpClient, loggedInService: LoggedInService) { super(httpClient, loggedInService) }
  findClercialUsers(config$: BehaviorSubject<IApiParams>): Observable<any> {
    return this.get(config$, this.baseUrl + "/find/clinicId/")
  }
  getClericalUser(uuid: string) {
    var url = this.baseUrl + '/find/uuid/' + uuid
    return this.httpClient.get(url);

  }
  deleteUser(uuid: string) {
    var url = this.baseUrl + '/delete/uuid/' + uuid
    return this.httpClient.delete(url)
  }
}
