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
  message = '';
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mno: ['', Validators.required],
      password: ['', Validators.required],
      image: ['']
    });
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.registerForm.value.name);
    formData.append('email', this.registerForm.value.email);
    formData.append('mno', this.registerForm.value.mno);
    formData.append('password', this.registerForm.value.password);
    if (this.selectedFile) formData.append('image', this.selectedFile);

    this.userService.register(formData).subscribe({
      next: (res: any) => this.message = res.message,
      error: err => this.message = 'Registration failed'
    });
  }
}
