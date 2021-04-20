import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { StatisticsService } from '../../services/statistics.service';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [MessageService]
})
export class HeaderComponent implements OnInit {


  constructor(
    private authService: AuthService,
    private statsService: StatisticsService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.checkToken();
  }

  checkToken() {
    if (!this.authService.token) {
      this.authService.loadUserToken();
    }
  }

  syncData() {
    this.statsService.syncStats()
    .subscribe((resp: RestResponse) => {
      if (resp.ok) {
        // this.loading = false;
        // this.loadData();
        console.log(resp.message);
        this.messageService.add({severity: 'success', summary: 'Success', detail: resp.message });
      }
    }, (err) => {
      this.messageService.add({severity: 'error', summary: 'Login Error', detail: err.error.message });
    });
  }

}
