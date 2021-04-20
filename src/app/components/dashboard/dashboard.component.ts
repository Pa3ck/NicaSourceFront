import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../../services/statistics.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  noData = false;
  loading = false;
  data: any = [];

  constructor(
    private statsService: StatisticsService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  syncData() {
    this.loading = true;
    this.statsService.syncStats()
    .subscribe((resp: RestResponse) => {
      if (resp.ok) {
        this.loading = false;
        this.loadData();
      }
    }, (err) => {
      this.loading = false;
    });
  }

  loadData() {
    this.statsService.getStats()
    .subscribe((resp: RestResponse) => {
      console.log(resp);
      if(resp.data.length ===  0) {
        this.noData = true;
      } else {
        this.noData = false;
        this.data = resp.data;
      }
    }, (err: any) => {
      console.log(err);
    });
  }

}
