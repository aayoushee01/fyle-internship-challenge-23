import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  constructor(private router: Router) {}
  username: string = '';
  onSubmit() {
    if (this.username) {
    this.router.navigate(['/repoview', this.username]);
    }
  }
}
