import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MasterModule } from './master/master.module';
import { LayoutModule } from './layout/layout.module';
import { HomePageModule } from './home-page/home-page.module';
import { CommonModule } from '@angular/common';
import '@angular/core';
import '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MasterModule, LayoutModule, HomePageModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('uxlab-shell');

  public constructor(){
  }
}
