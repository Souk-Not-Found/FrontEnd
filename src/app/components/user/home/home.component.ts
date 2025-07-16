import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: any;

  constructor(
    private userService: UserService,
    private router: Router // ✅ add Router to enable redirection
  ) {}

  ngOnInit(): void {
    // Optional: check if user is logged in
    const isLoggedIn = !!localStorage.getItem('user_id');
    if (!isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }

    this.userService.getHome().subscribe({
      next: (res: any) => this.user = res.user,
      error: () => this.user = null
    });
  }

  // ✅ Logout function
  logout(): void {
    localStorage.removeItem('user_id');
    this.router.navigate(['user/login']);
  }
}
