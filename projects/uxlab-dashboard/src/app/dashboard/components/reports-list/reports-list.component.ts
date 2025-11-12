import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Report } from '../../models/report.model';
import { ReportService } from '../../services/report.service';

@Component({
  standalone: false,
  selector: 'app-reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.scss']
})
export class ReportsListComponent implements OnInit {
  reports$!: Observable<Report[]>;
  
  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.reports$ = this.reportService.getAllReports();
  }

  viewReport(reportId: number): void {
    console.log(`Viewing report with ID: ${reportId}`);
    // In a real application, this would navigate to the report details page
  }
}
