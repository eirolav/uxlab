import { Component } from '@angular/core';
import { ReportService } from '../../services/report.service';

@Component({
  standalone: false,
  selector: 'app-dashboard-home-page',
  templateUrl: './dashboard-home-page.component.html',
  styleUrls: ['./dashboard-home-page.component.scss']
})
export class DashboardHomePageComponent {
  constructor(private reportService: ReportService) { }
}
