import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class EncryptService {

  constructor() { }
  public encrypt(txt: string): string {
    var hash = CryptoJS.SHA1('0123456789123456');
    var key = CryptoJS.lib.WordArray.create(hash.words.slice(0, 16 / 4));
    let encrypted = CryptoJS.AES.encrypt(txt, key, {
      mode: CryptoJS.mode.ECB,
    });
    return encrypted.toString();
  }
  public decrypt(encryptedTxt: string): string {
    const hash = CryptoJS.SHA1('0123456789123456');
    const key = CryptoJS.lib.WordArray.create(hash.words.slice(0, 16 / 4));
    const decrypted = CryptoJS.AES.decrypt(encryptedTxt, key, {
      mode: CryptoJS.mode.ECB,
    });
    return CryptoJS.enc.Utf8.stringify(decrypted); // Convert the decrypted data to a UTF-8 string
  }
}
