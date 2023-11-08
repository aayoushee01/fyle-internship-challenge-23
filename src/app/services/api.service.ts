import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
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
  
  getRepositories(githubUsername: string, per_page: number, page: number): Observable<any> {
    const params = {
      per_page,
      page
    };
    return this.httpClient.get(`https://api.github.com/users/${githubUsername}/repos`, {params}).pipe(
      catchError((error: any) => {
        if (error.status === 404) {
          console.error('Resource not found:', error);
          return throwError('Resource not found');
        } else {
          console.error('Error occurred while fetching repositories:', error);
          return throwError('Failed to fetch repositories');
        }
      })
    );
  }
}
