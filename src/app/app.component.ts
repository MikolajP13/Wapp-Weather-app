import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Wapp';
  currentDate: Date;

  constructor() {
    this.currentDate = new Date();
  }

  ngOnInit() {
    this.getActualDateAndTime();

    setInterval(() => {
      this.getActualDateAndTime();
    }, 1000);
  }

  private getActualDateAndTime() {
    this.currentDate = new Date();
  }
}
