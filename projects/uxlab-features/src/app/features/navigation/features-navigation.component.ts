import { Component } from '@angular/core';

@Component({
  selector: 'app-features-navigation',
  templateUrl: './features-navigation.component.html',
  styleUrls: ['./features-navigation.component.scss'],
  standalone: false
})
export class FeaturesNavigationComponent {
  navItems = [
    { label: 'Signals', route: 'signals', icon: '📊' },
    { label: 'Web Components', route: 'web-components', icon: '🧩' }
  ];
}
