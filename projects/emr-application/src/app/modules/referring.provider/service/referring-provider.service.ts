import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/emr-application/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReferringProviderService {
  base: string = environment.baseURL + 'referring/provider'
  constructor(private httpClient: HttpClient) { }

  create(){
    
  }
}
