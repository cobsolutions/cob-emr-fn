import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/emr-application/src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { IApiParams } from '../../../../common/interfaces/api.params';
import { BasePaginationService } from '../../../../common/service/base-pagination.service';
import { CacheService } from '../../../../common/service/cahce/cache.service';
import { ClinicEmittingService } from '../../../../common/service/emitting/clinic-emitting.service';

@Injectable({
  providedIn: 'root'
})
export class DotorUserService extends BasePaginationService {
  private baseUrl = environment.baseURL + 'clinical/user'
  constructor(httpClient: HttpClient,clinicEmittingService :ClinicEmittingService) { super(httpClient,clinicEmittingService) }

  getDoctorUser(config$: BehaviorSubject<IApiParams>): Observable<any> {
    return this.get(config$, this.baseUrl + "/find/clinicId/")
  }
  deleteDoctor(uuid: string) {
    var url = this.baseUrl + '/delete/doctor/' + uuid
    return this.httpClient.delete(url)
  }
}
