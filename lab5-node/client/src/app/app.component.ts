import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ContactListComponent} from './contactlist/contact-list/contact-list.component';
import {ContactDetailsComponent} from './contactlist/contact-details/contact-details.component';
import {HttpClientModule, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [
    ContactDetailsComponent,
    ContactListComponent,
    HttpClientModule,
  ],
})
export class AppComponent {
  title = 'client';
}
