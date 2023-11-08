import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observer } from 'rxjs';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-repoview',
  templateUrl: './repoview.component.html',
  styleUrls: ['./repoview.component.scss'],
})
export class RepoViewComponent implements OnInit {
  username: string = '';
  userData: any = {};
  totalRepos: number = 0;
  constructor(
    private ApiService: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.username = params['username'];
      if (this.username) {
        this.fetchUser();
      }
    });
  }

  fetchUser() {
    const observer: Observer<any> = {
      next: (data) => {
        console.log('Received data:', data);
        this.userData = data;
        this.totalRepos = data.public_repos;
      },
      error: (error) => {
        console.error('An error occurred:', error);
      },
      complete: () => {
        console.log('Observable completed');
      }
    };
  
    this.ApiService.getUser(this.username).subscribe(observer);
  }
}
