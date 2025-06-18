import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TheHeader } from '../the-header/the-header';

@Component({
  selector: 'app-the-layout',
  imports: [RouterOutlet, TheHeader],
  templateUrl: './the-layout.html',
  styleUrl: './the-layout.scss',
})
export class TheLayout {}
