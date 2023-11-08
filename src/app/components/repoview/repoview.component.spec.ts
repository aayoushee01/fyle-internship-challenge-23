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
    apiService = jasmine.createSpyObj('ApiService', ['getUser']);

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
    expect(component.username).toBe('testuser');
    expect(component.userData).toEqual({});
  });
});
