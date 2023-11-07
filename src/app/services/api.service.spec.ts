import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let apiService: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });
    apiService = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(apiService).toBeTruthy();
  });

  it('should get user data', () => {
    const githubUsername = 'testuser';
    const userData = { name: 'Test User' };

    apiService.getUser(githubUsername).subscribe((data) => {
      expect(data).toEqual(userData);
    });

    const req = httpTestingController.expectOne(`https://api.github.com/users/${githubUsername}`);
    expect(req.request.method).toBe('GET');
    req.flush(userData);
  });

  it('should get user repositories', () => {
    const githubUsername = 'testuser';
    const userRepos = [{ name: 'Repo 1' }, { name: 'Repo 2' }];

    apiService.getRepositories(githubUsername).subscribe((data) => {
      expect(data).toEqual(userRepos);
    });

    const req = httpTestingController.expectOne(`https://api.github.com/users/${githubUsername}/repos`);
    expect(req.request.method).toBe('GET');
    req.flush(userRepos);
  });
});
