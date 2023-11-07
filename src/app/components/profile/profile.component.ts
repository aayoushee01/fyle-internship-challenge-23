import { Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  @Input() userData: any;
  loading: boolean = true;

  ngOnInit() {
    this.checkUserData();
  }
  
  checkUserData() {
    if (this.userData && Object.keys(this.userData).length > 0) {
      console.log(this.userData);
      this.loading = false;
    } else {
      setTimeout(() => {
        this.checkUserData();
      }, 200);
    }
  }
}
