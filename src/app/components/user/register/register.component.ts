import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  selectedFile: File | null = null;
  message: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mno: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      image: ['']
    });
  }

  onFileChange(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
    }
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.message = 'Please fill all required fields correctly.';
      return;
    }

    this.isLoading = true;
    const formData = new FormData();
    formData.append('name', this.registerForm.get('name')?.value);
    formData.append('email', this.registerForm.get('email')?.value);
    formData.append('mno', this.registerForm.get('mno')?.value);
    formData.append('password', this.registerForm.get('password')?.value);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.userService.register(formData).subscribe({
      next: (res: any) => {
        this.message = res.message || 'Registration successful.';
        this.isLoading = false;
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
        this.message = 'Registration failed. Please try again.';
        this.isLoading = false;
      }
    });
  }
}
