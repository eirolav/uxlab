import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../services/layout.service';
import { AuthService, User } from '../../../auth/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  standalone: false,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser$: Observable<User | null>;
  isAuthenticated$: Observable<boolean>;
  
  constructor(
    private layoutService: LayoutService,
    private authService: AuthService
  ) {
    this.currentUser$ = this.authService.currentUser$;
    this.isAuthenticated$ = this.authService.isAuthenticated$;
  }
  
  ngOnInit(): void {
    // Component initialization logic
  }
  
  toggleNavigation(): void {
    this.layoutService.toggleNavigation();
  }
  
  logout(): void {
    this.authService.logout();
  }
}
