import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../services/layout.service';
import { Observable } from 'rxjs';

@Component({
  standalone: false,
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  isExpanded$!: Observable<boolean>;
  
  navItems = [
    { label: 'Home', route: '/home', icon: '🏠' },
    { label: 'Dashboard', route: '/dashboard', icon: '📊' },
    { label: 'Dashboard Web Component', route: '/dashboard-web-component', icon: '📝' },
    { label: 'Settings', route: '/settings', icon: '⚙️' }
  ];
  
  constructor(private layoutService: LayoutService) { }

  ngOnInit(): void {
    this.isExpanded$ = this.layoutService.navigationExpanded$;
  }
}
