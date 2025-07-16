import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage = '';
  isLoading = false;


  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please fill in all fields correctly.';
      return;
    }

    this.isLoading = true;

    this.userService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        if (res.user && res.user._id) {
          localStorage.setItem('user_id', res.user._id); // ✅ Store user ID
          this.router.navigate(['/user/home']);
        } else {
          this.errorMessage = 'Login succeeded but user ID missing.';
        }
      }
      ,
      error: (err) => {
        this.isLoading = false;
        console.error(err);
        this.errorMessage = err?.error?.message || 'Login failed. Please try again.';
      }
    });
  }
}
