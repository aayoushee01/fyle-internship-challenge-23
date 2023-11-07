import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [NgxSkeletonLoaderModule],
    });
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize properties correctly', () => {
    expect(component.loading).toBeTruthy();
  });
  
  it('should stop loading when userData is provided', () => {
    component.userData = { name: 'Aayoushee' };
    component.ngOnInit();
    expect(component.loading).toBe(false);
  });

  it('should stop loading when userData is not provided', () => {
    component.userData = null;
    component.ngOnInit();
    expect(component.loading).toBe(true);
  });

  it('should stop loading after a timeout', (done) => {
    component.checkUserData();
    setTimeout(() => {
      expect(component.loading).toBe(true);
      done();
    }, 250);
  });
});
