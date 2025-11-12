import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Report } from '../../models/report.model';
import { ReportService } from '../../services/report.service';

@Component({
  standalone: false,
  selector: 'app-new-reports',
  templateUrl: './new-reports.component.html',
  styleUrls: ['./new-reports.component.scss']
})
export class NewReportsComponent implements OnInit {
  newReports$!: Observable<Report[]>;
  
  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.newReports$ = this.reportService.getNewReports();
  }

  viewReport(reportId: number): void {
    console.log(`Viewing new report with ID: ${reportId}`);
    // In a real application, this would navigate to the report details page
  }
}
