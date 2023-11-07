import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss']
})

export class ReposComponent {
  @Input() repositories: any;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  maxItemsPerPage: number = 100;
  loadingRepositories: boolean = true;

  ngOnInit() {
    this.checkRepoData();
  }
  
  checkRepoData() {
    if (this.repositories && Object.keys(this.repositories).length > 0) {
      console.log(this.repositories);
      this.loadingRepositories = false;
    } else {
      setTimeout(() => {
        this.checkRepoData();
      }, 200);
    }
  }

  changeItemsPerPage(value: number) {
    this.itemsPerPage = value;
  }
}
