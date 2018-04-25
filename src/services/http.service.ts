import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) { }

  get(url: string) : any {
    return this.http.get(url);
  }

}
