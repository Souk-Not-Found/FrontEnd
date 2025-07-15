import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {

  form: FormGroup;
  message = '';
  error = '';

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.error = 'Please enter a valid email address.';
      this.message = '';
      return;
    }

    this.error = '';
    this.userService.forgetVerify(this.form.value).subscribe({
      next: (res: any) => {
        this.message = res.message || 'Reset email sent successfully.';
      },
      error: (err) => {
        this.message = '';
        this.error = err?.error?.message || 'Error sending reset email.';
      }
    });
  }
}
