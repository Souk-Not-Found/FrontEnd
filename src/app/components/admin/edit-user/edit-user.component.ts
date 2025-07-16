import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {

  editForm: FormGroup;
  selectedFile: File | null = null;
  error = '';
  success = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private adminService: AdminService
  ) {
    this.editForm = this.fb.group({
      user_id: [''],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mno: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const user = history.state.user;
    if (user) {
      this.editForm.patchValue({
        user_id: user._id,
        name: user.name,
        email: user.email,
        mno: user.mobile
      });
    } else {
      this.error = 'No user data provided.';
    }
  }

  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('user_id', this.editForm.value.user_id);
    formData.append('name', this.editForm.value.name);
    formData.append('email', this.editForm.value.email);
    formData.append('mno', this.editForm.value.mno);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.adminService.updateUser(formData).subscribe({
      next: () => {
        this.success = 'User updated successfully.';
        this.error = '';
        this.router.navigate(['/admin/manage-users']);
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to update user.';
        this.success = '';
      }
    });
  }
}
