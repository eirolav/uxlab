import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../services/layout.service';
import { Observable } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';

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
    { label: 'Features', route: '/features/web-components', icon: '📝' },
    { label: 'Profile', route: '/profile', icon: '👤' },
    { label: 'Settings', route: '/settings', icon: '⚙️' }
  ];
  
  constructor(
    private layoutService: LayoutService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.isExpanded$ = this.layoutService.navigationExpanded$;
  }
}
