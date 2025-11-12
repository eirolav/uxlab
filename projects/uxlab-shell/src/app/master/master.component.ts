import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../layout/services/layout.service';

@Component({
  standalone: false,
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {
  
  constructor(private layoutService: LayoutService) { }

  ngOnInit(): void {
    // Initialize any master page settings
  }
}
