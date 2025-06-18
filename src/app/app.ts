import { Component } from '@angular/core';
import { TheLayout } from './layout/the-layout/the-layout';

@Component({
  selector: 'app-root',
  imports: [TheLayout],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = "Helena's library";
}
