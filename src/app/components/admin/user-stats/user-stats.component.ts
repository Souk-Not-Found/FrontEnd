import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin';
import { ChartType, ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-user-stats',
  templateUrl: './user-stats.component.html',
  styleUrls: ['./user-stats.component.css']
})
export class UserStatsComponent implements OnInit {

  stats: any = null;  // Your real stats will come asynchronously
  error: string | null = null;

  // Chart data and config
  public pieChartLabels = ['Active Users', 'Inactive Users', 'New This Week'];
  public pieChartType: ChartType = 'doughnut';

  // ChartData object with labels and datasets
  public pieChartData: ChartData<'doughnut'> = {
    labels: this.pieChartLabels,
    datasets: [
      { data: [] }
    ]
  };


  public chartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    cutout: '70%',
    plugins: {
      legend: { position: 'bottom' },
      tooltip: { enabled: true }
    }
  };

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getStats().subscribe({
      next: (res: any) => {
        this.stats = res;
        this.updateChartData();
      },
      error: (err) => {
        this.error = 'Failed to load user statistics.';
        console.error(err);
      }
    });

    // Uncomment to simulate data instead:
    /*
    setTimeout(() => {
      this.stats = {
        totalUsers: 1000,
        activeUsers: 600,
        inactiveUsers: 300,
        newUsersThisWeek: 100
      };
      this.updateChartData();
    }, 1000);
    */
  }

  updateChartData() {
    if (this.stats) {
      this.pieChartData = {
        labels: this.pieChartLabels,
        datasets: [{
          data: [
            this.stats.activeUsers,
            this.stats.inactiveUsers,
            this.stats.newUsersThisWeek
          ]
        }]
      };
    }
  }
}
