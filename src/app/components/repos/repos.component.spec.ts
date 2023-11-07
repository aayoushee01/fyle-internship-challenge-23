import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ReposComponent } from './repos.component';

describe('ReposComponent', () => {
  let component: ReposComponent;
  let fixture: ComponentFixture<ReposComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReposComponent],
      imports: [FormsModule, NgxSkeletonLoaderModule],
    });
    fixture = TestBed.createComponent(ReposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize properties correctly', () => {
    expect(component.itemsPerPage).toBe(10);
    expect(component.maxItemsPerPage).toBe(100);
    expect(component.loadingRepositories).toBeTruthy();
  });

  it('should change items per page', () => {
    const newValue = 20;
    component.changeItemsPerPage(newValue);
    expect(component.itemsPerPage).toBe(newValue);
  });

  it('should check repo data', fakeAsync(() => {
    component.repositories = { name: 'foo' };
    component.checkRepoData();
    tick();
    expect(component.loadingRepositories).toBeFalsy();
  }));

  it('should checkRepoData with empty repositories', fakeAsync(() => {
    const consoleLogSpy = spyOn(console, 'log');
    component.loadingRepositories = true;
    component.repositories = [];

    component.checkRepoData();
    tick(201);

    expect(consoleLogSpy).not.toHaveBeenCalled();
    expect(component.loadingRepositories).toBe(true);
  }));

  it('should checkRepoData with non-empty repositories', fakeAsync(() => {
    const consoleLogSpy = spyOn(console, 'log');
    component.loadingRepositories = true;
    component.repositories = [{ repoData: 'mockData' }];

    component.checkRepoData();
    tick(201);

    expect(consoleLogSpy).toHaveBeenCalledWith([{ repoData: 'mockData' }]);
    expect(component.loadingRepositories).toBe(false);
  }));
});
