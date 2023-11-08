import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Params } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ReposComponent } from './repos.component';

describe('ReposComponent', () => {
  let component: ReposComponent;
  let fixture: ComponentFixture<ReposComponent>;
  let apiService: jasmine.SpyObj<ApiService>;
  let activatedRoute: ActivatedRoute;

  beforeEach(() => {
    apiService = jasmine.createSpyObj('ApiService', ['getRepositories']);

    TestBed.configureTestingModule({
      declarations: [ReposComponent],
      imports: [FormsModule, NgxSkeletonLoaderModule],
      providers: [
        {
          provide: ApiService,
          useValue: apiService,
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ username: 'testuser' } as Params),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ReposComponent);
    component = fixture.componentInstance;
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize properties correctly', () => {
    expect(component.repositories).toEqual(undefined);
    expect(component.username).toEqual(undefined);
    expect(component.totalRepos).toEqual(undefined);
    expect(component.currentPage).toEqual(1);
    expect(component.itemsPerPage).toEqual(10);
    expect(component.maxItemsPerPage).toEqual(100);
    expect(component.loadingRepositories).toEqual(true);
  });

  it('should fetch repositories on ngOnInit', () => {
    const mockData = [{ name: 'Repo 1' }, { name: 'Repo 2' }];
    apiService.getRepositories.and.returnValue(of(mockData));

    component.username = 'testuser';
    component.ngOnInit();

    expect(apiService.getRepositories).toHaveBeenCalledWith('testuser', 10, 1);
    expect(component.repositories).toEqual(mockData);
    expect(component.loadingRepositories).toEqual(false);
  });

  it('should handle error when fetching repositories', () => {
    const error = 'An error occurred';
    apiService.getRepositories.and.returnValue(throwError(error));
    const consoleErrorSpy = spyOn(console, 'error');

    component.ngOnInit();

    expect(consoleErrorSpy).toHaveBeenCalledWith('An error occurred:', error);
    expect(component.loadingRepositories).toEqual(true);
  });

  it('should change items per page and refetch repositories', () => {
    const mockData = [{ name: 'Repo 1' }, { name: 'Repo 2' }];
    apiService.getRepositories.and.returnValue(of(mockData));

    component.username = 'testuser';
    component.changeItemsPerPage(25);

    expect(component.itemsPerPage).toEqual(25);
    expect(apiService.getRepositories).toHaveBeenCalledWith('testuser', 25, 1);
    expect(component.repositories).toEqual(mockData);
    expect(component.loadingRepositories).toEqual(false);
  });

  it('should change the page and refetch repositories', () => {
    const mockData = [{ name: 'Repo 3' }, { name: 'Repo 4' }];
    apiService.getRepositories.and.returnValue(of(mockData));

    component.username = 'testuser';
    component.newPage(2);

    expect(component.currentPage).toEqual(2);
    expect(apiService.getRepositories).toHaveBeenCalledWith('testuser', 10, 2);
    expect(component.repositories).toEqual(mockData);
    expect(component.loadingRepositories).toEqual(false);
  });
});
