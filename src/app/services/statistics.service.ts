import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

const URL = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'x-token': this.authService.token,
    });
  }

  syncStats() {
    const headers = this.getHeaders();
    return this.http.get(`${URL}sync`, {headers});
  }

  getStats() {
    const headers = this.getHeaders();

    return this.http.get(`${URL}statistics`, {headers});
  }

  updateStatsCountry(data: CountryStats) {
    const headers = this.getHeaders();
    return this.http.post(`${URL}statistics/${data._id}`, data, {headers});
  }
}
