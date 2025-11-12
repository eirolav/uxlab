import { Component } from '@angular/core';
import { LayoutService } from '../../services/layout.service';

@Component({
  standalone: false,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  
  constructor(private layoutService: LayoutService) { }
  
  toggleNavigation(): void {
    this.layoutService.toggleNavigation();
  }
}
