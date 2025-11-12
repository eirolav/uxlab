import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Report } from '../models/report.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private reports: Report[] = [
    { id: 1, name: 'Monthly Sales Report', description: 'Overview of monthly sales performance', viewCount: 120, isNew: false },
    { id: 2, name: 'Customer Satisfaction', description: 'Analysis of customer satisfaction surveys', viewCount: 85, isNew: false },
    { id: 3, name: 'Inventory Status', description: 'Current inventory levels and projections', viewCount: 210, isNew: false },
    { id: 4, name: 'Marketing Campaign Results', description: 'Performance metrics for recent marketing campaigns', viewCount: 150, isNew: false },
    { id: 5, name: 'Employee Performance', description: 'Quarterly employee performance metrics', viewCount: 95, isNew: false },
    { id: 6, name: 'Financial Summary', description: 'Summary of financial performance', viewCount: 180, isNew: false },
    { id: 7, name: 'Website Traffic Analysis', description: 'Analysis of website traffic and user behavior', viewCount: 75, isNew: false },
    { id: 8, name: 'Product Performance', description: 'Performance metrics for product lines', viewCount: 110, isNew: false },
    { id: 9, name: 'Competitor Analysis', description: 'Analysis of competitor performance and market share', viewCount: 65, isNew: false },
    { id: 10, name: 'Supply Chain Efficiency', description: 'Metrics on supply chain performance', viewCount: 90, isNew: false },
    { id: 11, name: 'Q4 Forecast', description: 'Forecast for Q4 performance and targets', viewCount: 0, isNew: true }
  ];

  constructor() { }

  getAllReports(): Observable<Report[]> {
    return of(this.reports);
  }

  getFavoriteReports(count: number = 5): Observable<Report[]> {
    // Sort by view count (descending) and take the top 'count'
    const favorites = [...this.reports]
      .filter(report => !report.isNew)
      .sort((a, b) => b.viewCount - a.viewCount)
      .slice(0, count);
    
    return of(favorites);
  }

  getNewReports(): Observable<Report[]> {
    return of(this.reports.filter(report => report.isNew));
  }
}
