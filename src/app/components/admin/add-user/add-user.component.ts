import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

  addUserForm: FormGroup;
  success = '';
  error = '';

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router
  ) {
    this.addUserForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mno: ['', Validators.required],
      password: ['', Validators.required],
      image: [null]
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.addUserForm.patchValue({ image: file });
    }
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('name', this.addUserForm.value.name);
    formData.append('email', this.addUserForm.value.email);
    formData.append('mno', this.addUserForm.value.mno);
    formData.append('password', this.addUserForm.value.password);
    if (this.addUserForm.value.image) {
      formData.append('image', this.addUserForm.value.image);
    }

    this.adminService.addUser(formData).subscribe({
      next: (res) => {
        this.success = 'User added successfully!';
        this.error = '';
        this.router.navigate(['/admin/manage-users']);
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to add user.';
        this.success = '';
      }
    });
  }

}
