import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Apiconfig {

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  postContact(form:any){
    return this.http.post<object>(
      'https://formspree.io/f/',
      JSON.stringify(form),
      { headers: { 'Accept': 'application/json' } }
    );
  }
  
}
