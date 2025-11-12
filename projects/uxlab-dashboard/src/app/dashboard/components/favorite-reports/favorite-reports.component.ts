import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Report } from '../../models/report.model';
import { ReportService } from '../../services/report.service';

@Component({
  standalone: false,
  selector: 'app-favorite-reports',
  templateUrl: './favorite-reports.component.html',
  styleUrls: ['./favorite-reports.component.scss']
})
export class FavoriteReportsComponent implements OnInit {
  favoriteReports$!: Observable<Report[]>;
  
  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.favoriteReports$ = this.reportService.getFavoriteReports(5);
  }

  viewReport(reportId: number): void {
    console.log(`Viewing favorite report with ID: ${reportId}`);
    // In a real application, this would navigate to the report details page
  }
}
