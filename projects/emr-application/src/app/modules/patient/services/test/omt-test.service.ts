import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/emr-application/src/environments/environment';
import { OMTTestValues } from '../../models/medical.note/omt.test/omt.test.values';

@Injectable({
  providedIn: 'root'
})
export class OmtTestService {
  private baseUrl = environment.baseURL + '/omt/test'
  constructor(private httpClient: HttpClient) { }

  ueqdTest(answers: any) {
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/ueqd'
    return this.httpClient.post(`${url}`, JSON.stringify(answers), { 'headers': headers })
  }
  uefiTest(answers: any) {
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/uefi'
    return this.httpClient.post(`${url}`, JSON.stringify(answers), { 'headers': headers })
  }
  spadiTest(answers: any) {
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/spadi'
    return this.httpClient.post(`${url}`, JSON.stringify(answers), { 'headers': headers })
  }
  saveValues(omtTestValues:OMTTestValues){
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/save/values'
    return this.httpClient.post(`${url}`, JSON.stringify(omtTestValues), { 'headers': headers })
  }
  findValues(medicalNoteId:number , testName:string){
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/values/medical-note-id/'+medicalNoteId +'/test-name/'+testName
    return this.httpClient.get(`${url}`, { 'headers': headers })
  }
  dashTest(answers: any) {
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/dash'
    return this.httpClient.post(`${url}`, JSON.stringify(answers), { 'headers': headers })
  }
  spine(answers: any, testName: string) {
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/spine/test/' + testName
    return this.httpClient.post(`${url}`, JSON.stringify(answers), { 'headers': headers })
  }
  lowerExtremity(answers: any, testName: string) {
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/lower-extremity/test/' + testName
    return this.httpClient.post(`${url}`, JSON.stringify(answers), { 'headers': headers })
  }
  balance(answers: any) {
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/balance'
    return this.httpClient.post(`${url}`, JSON.stringify(answers), { 'headers': headers })
  }
}
