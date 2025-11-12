import { Component } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  welcomeMessage = 'Welcome to UXLab Shell';
  
  newsItems = [
    {
      title: 'New Feature Released',
      content: 'We are excited to announce the release of our new dashboard module.',
      date: '2025-11-10'
    },
    {
      title: 'System Maintenance',
      content: 'Scheduled maintenance will occur on November 15, 2025.',
      date: '2025-11-08'
    },
    {
      title: 'User Training',
      content: 'New training materials are now available in the learning center.',
      date: '2025-11-05'
    }
  ];
}
