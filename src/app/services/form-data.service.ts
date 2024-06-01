import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {

  private apiUrl = 'http://localhost:3000/api/forms';

  constructor(private http: HttpClient) { }

  onSubmitData(data: FormData): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
