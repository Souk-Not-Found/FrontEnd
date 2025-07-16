import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

stats: any = {};

  constructor(private adminService: AdminService , private router: Router) {}

  ngOnInit(): void {
    this.adminService.getStats().subscribe({
      next: (res) => this.stats = res,
      error: (err) => console.error('Failed to fetch stats:', err)
    });
  }

  logout() {
  localStorage.removeItem('user_id');
  this.router.navigate(['/admin/login']);  // redirect to login page
}


}
