import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent {

  loginForm: FormGroup;
  error = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.error = 'Please fill in all fields correctly.';
      return;
    }

    this.isLoading = true;
    this.error = '';

    const formData = this.loginForm.value;

    this.adminService.login(formData).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        if (res.user && res.user.is_admin === 1) {
          localStorage.setItem('user_id', res.user._id);
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.error = 'Access denied';
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.error = err.error?.message || 'Login failed';
      }
    });
  }
}
