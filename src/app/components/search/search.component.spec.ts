import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    router = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [SearchComponent ],
      imports: [FormsModule],
      providers: [{ provide: Router, useValue: router }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize properties correctly', () => {
    expect(component.username).toBe('');
  });

  it('should navigate to repoview with a username when onSubmit is called', () => {
    component.username = 'testuser';
    component.onSubmit();
    expect(router.navigate).toHaveBeenCalledWith(['/repoview', 'testuser']);
  });

  it('should not navigate when onSubmit is called with an empty username', () => {
    component.username = '';
    component.onSubmit();
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
