import { Component , OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent {

  users: any[] = [];
  error = '';
  success = '';

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.adminService.listUsers().subscribe({
      next: (res: any) => {
        this.users = res.users || res; // adjust if your API returns differently
        this.error = '';
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load users.';
      }
    });
  }

  editUser(user: any): void {
    this.router.navigate(['/admin/edit-user', user._id], { state: { user } });
  }

  deleteUser(userId: string): void {
    if (!confirm('Are you sure you want to delete this user?')) return;

    this.adminService.deleteUser(userId).subscribe({
      next: () => {
        this.success = 'User deleted successfully.';
        this.error = '';
        this.loadUsers(); // reload list after deletion
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to delete user.';
        this.success = '';
      }
    });
  }
}
