import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { WeatherDto } from './searchModel';
@Injectable({
  providedIn: 'root'
})
export class SearchService {
  public baseUrl = environment.baseUrl;
  private readonly _searchUrl: string = 'api/weather';

  get searchUrl() {
    return this.baseUrl + this._searchUrl;
  }
  constructor(private httpClient: HttpClient) {
  }
  search<T>(key: string): Observable<WeatherDto> {
    const endpointUrl = `${this.searchUrl}/${key}`;
    return this.httpClient.get<WeatherDto>(endpointUrl);
  }
}
