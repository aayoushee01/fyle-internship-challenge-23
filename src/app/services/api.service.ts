import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviornment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiKey = environment.apiKey || "";
  constructor(
    private httpClient: HttpClient
  ) { }

  getUser(githubUsername: string): Observable<any> {
    return this.httpClient.get(`https://api.github.com/users/${githubUsername}`);
  }
  
  getRepositories(githubUsername: string): Observable<any> {
    return this.httpClient.get(`https://api.github.com/users/${githubUsername}/repos`);
  }
}
