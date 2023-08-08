import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ABOUT_GYM } from './services/services/security/store-storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private title: Title) {
    this.title.setTitle(ABOUT_GYM.GYM_NAME);
  }
}
