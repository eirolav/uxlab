import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../services/layout.service';
import { Observable } from 'rxjs';

@Component({
  standalone: false,
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  isNavigationExpanded$!: Observable<boolean>;
  
  constructor(private layoutService: LayoutService) { }

  ngOnInit(): void {
    this.isNavigationExpanded$ = this.layoutService.navigationExpanded$;
  }
}
