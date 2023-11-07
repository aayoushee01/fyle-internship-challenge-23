import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-repoview',
  templateUrl: './repoview.component.html',
  styleUrls: ['./repoview.component.scss'],
})
export class RepoViewComponent implements OnInit {
  repositories: any[] = [];
  username: string = '';
  userData: any = {};
  constructor(
    private ApiService: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.username = params['username'];
      if (this.username) {
        this.fetchUser();
        this.fetchRepositories();
      }
    });
  }

  fetchUser() {
    this.ApiService.getUser(this.username).subscribe(
      (data) => {
        console.log('Received data:', data);
        this.userData = data;
      },
      (error) => {
        console.error('An error occurred:', error);
      },
      () => {
        console.log('Observable completed');
      }
    );
  }
  fetchRepositories() {
    this.ApiService.getRepositories(this.username).subscribe(
      (data) => {
        console.log('Received data:', data);
        this.repositories = data;
      },
      (error) => {
        console.error('An error occurred:', error);
      },
      () => {
        console.log('Observable completed');
      }
    );
  }
}
