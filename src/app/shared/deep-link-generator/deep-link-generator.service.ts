
import {Injectable} from '@angular/core';

import * as CryptoJS from 'crypto-js';
import {Observable} from "rxjs";
import {NgTinyUrlService} from "ng-tiny-url";

@Injectable({
  providedIn: 'root'
})
export class DeepLinkGeneratorService {

  constructor(private readonly tinyUrl:NgTinyUrlService) {
  }

  public generateUrl(url: string,  keyLength: number = 8): {encrypted: string; key: string } {
    const secretKey: string = this.generateSecretKey(keyLength);
    return {encrypted:CryptoJS.AES.encrypt(url, secretKey).toString(), key: secretKey};
  }

  public decryptUrl(url: string, key: string ): string {
    return CryptoJS.AES.decrypt(url, key).toString(CryptoJS.enc.Utf8);
  }

  public minifyUrl(url:string):Observable<string>{
   return this.tinyUrl.shorten(url);
  }

  private generateSecretKey(keyLength: number): string {
    let result: string = '';
    const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!?#*+-()';

    for ( let i: number = 0; i < keyLength; i++ ) {
      result += characters.charAt(Math.floor(Math.random() *  characters.length));
    }

    return result;
  }


}
