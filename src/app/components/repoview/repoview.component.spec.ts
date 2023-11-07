import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Params } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { RepoViewComponent } from './repoview.component';
import { ProfileComponent } from '../profile/profile.component';
import { ReposComponent } from '../repos/repos.component';


describe('RepoViewComponent', () => {
  let component: RepoViewComponent;
  let fixture: ComponentFixture<RepoViewComponent>;
  let apiService: jasmine.SpyObj<ApiService>;
  let activatedRoute: ActivatedRoute;

  beforeEach(() => {
    apiService = jasmine.createSpyObj('ApiService', ['getUser', 'getRepositories']);

    TestBed.configureTestingModule({
      declarations: [RepoViewComponent,ProfileComponent, ReposComponent ],
      imports: [FormsModule, NgxSkeletonLoaderModule], 
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ username: 'testuser' } as Params),
          },
        },
        { provide: ApiService, useValue: apiService },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(RepoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize properties correctly', () => {
    expect(component.repositories).toEqual([]);
    expect(component.username).toBe('testuser');
    expect(component.userData).toEqual({});
  });

  it('should call fetchUser and fetchRepositories when username is provided', () => {
    const spyUser = apiService.getUser.and.returnValue(of('mockUserData'));
    const spyRepos = apiService.getRepositories.and.returnValue(of('mockRepositories'));

    component.ngOnInit();

    expect(spyUser).toHaveBeenCalledWith('testuser');
    expect(spyRepos).toHaveBeenCalledWith('testuser');
    expect(component.userData).toEqual('mockUserData');
    expect(component.repositories).toEqual('mockRepositories');
  });

  it('should handle errors for fetchUser', () => {
    const userError = 'An error occurred';
    apiService.getUser.and.returnValue(throwError(userError));
    const consoleErrorSpy = spyOn(console, 'error');
    component.fetchUser();
    fixture.detectChanges();
    expect(consoleErrorSpy).toHaveBeenCalledWith('An error occurred:', userError);
  });

  it('should handle errors for fetchRepositories', () => {
    const repositoriesError = 'An error occurred';
    apiService.getRepositories.and.returnValue(throwError(repositoriesError));
    const consoleErrorSpy = spyOn(console, 'error');
    component.fetchRepositories();
    fixture.detectChanges();
    expect(consoleErrorSpy).toHaveBeenCalledWith('An error occurred:', repositoriesError);
  });
});
