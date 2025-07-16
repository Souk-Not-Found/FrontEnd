import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  form: FormGroup;
  token: string = '';
  message = '';
  error = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {
    this.form = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordsMatch });

    this.token = this.route.snapshot.queryParamMap.get('token') || '';
  }

  passwordsMatch(group: FormGroup) {
    return group.get('password')!.value === group.get('confirmPassword')!.value
      ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.form.invalid) {
      this.error = 'Please fix the errors.';
      return;
    }

    this.userService.resetPassword({
      token: this.token,
      password: this.form.get('password')!.value
    }).subscribe({
      next: (res: any) => {
        this.message = res.message || 'Password reset successful!';
        setTimeout(() => this.router.navigate(['/user/login']), 3000);
      },
      error: (err) => {
        this.error = err.error.message || 'Reset password failed.';
      }
    });
  }
}
