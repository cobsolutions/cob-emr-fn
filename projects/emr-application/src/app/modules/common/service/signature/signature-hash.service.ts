import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class SignatureHashService {

  constructor() {}

  computeSha256(dataUrl: string): string {
    return CryptoJS.SHA256(dataUrl).toString(CryptoJS.enc.Hex);
  }
}
