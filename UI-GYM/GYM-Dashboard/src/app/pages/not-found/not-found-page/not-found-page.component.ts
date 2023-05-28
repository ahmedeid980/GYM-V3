import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss']
})
export class NotFoundPageComponent {

  constructor(private route: Router){}

  logout() {
    localStorage.clear();
    this.route.navigate(['/authentication/login']);
  }

  dashboard() {
    this.route.navigate(['/dashboard']);
  }


}
