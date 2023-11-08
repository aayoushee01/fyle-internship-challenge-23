import { Component, Input } from '@angular/core';
import { Observer } from 'rxjs';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss']
})

export class ReposComponent {
  @Input() repositories: any;
  @Input() username: any;
  @Input() totalRepos: any;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  maxItemsPerPage: number = 100;
  loadingRepositories: boolean = true;

  constructor(
    private ApiService: ApiService
  ) {}

  ngOnInit() {
    this.fetchRepositories();
  }
  fetchRepositories() {
    const observer: Observer<any> = {
      next: (data) => {
        console.log('Received data:', data);
        this.repositories = data;
        this.loadingRepositories = false;
      },
      error: (error) => {
        console.error('An error occurred:', error);
      },
      complete: () => {
        console.log('Observable completed');
      }
    };
    this.ApiService.getRepositories(this.username, this.itemsPerPage, this.currentPage).subscribe(observer);
    console.log("loadingRepositories: " + this.loadingRepositories);
  }
  changeItemsPerPage(value: number) {
    this.itemsPerPage = value;
    this.loadingRepositories = true;
    this.fetchRepositories();
  }
  newPage(value: number) {
    this.currentPage = value;
    this.loadingRepositories = true;
    this.fetchRepositories();
  }
}
