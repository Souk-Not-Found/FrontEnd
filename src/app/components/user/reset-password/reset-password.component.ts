import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  form: FormGroup;
  userId = '';
  message = '';
  error = '';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.form = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });

    this.userId = this.route.snapshot.queryParamMap.get('user_id') || '';
  }

  passwordMatchValidator(group: FormGroup) {
    return group.get('password')!.value === group.get('confirmPassword')!.value
      ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.form.invalid) {
      this.error = 'Please fix the errors in the form.';
      this.message = '';
      return;
    }

    const data = { ...this.form.value, user_id: this.userId };
    this.userService.resetPassword(data).subscribe({
      next: () => {
        this.message = 'Password reset successful! Redirecting to login...';
        this.error = '';
        setTimeout(() => this.router.navigate(['/user/login']), 2000);
      },
      error: (err) => {
        this.message = '';
        this.error = err?.error?.message || 'Failed to reset password.';
      }
    });
  }
}
