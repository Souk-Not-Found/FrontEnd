import { Component , OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin';

@Component({
  selector: 'app-user-stats',
  templateUrl: './user-stats.component.html',
  styleUrls: ['./user-stats.component.css']
})
export class UserStatsComponent {

  stats: any = null;
  error = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getStats().subscribe({
      next: (res: any) => {
        this.stats = res;
      },
      error: (err) => {
        this.error = 'Failed to load user statistics.';
        console.error(err);
      }
    });
  }
}
