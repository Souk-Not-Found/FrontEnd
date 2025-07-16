import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  editForm: FormGroup;
  error = '';
  success = '';
  message = '';
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private userService: UserService , private router: Router) {
    this.editForm = this.fb.group({
      user_id: [''],
      name: [''],
      email: [''],
      mno: ['']
    });
  }

  ngOnInit(): void {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      this.error = 'User ID not found.';
      return;
    }

    this.userService.getProfile(userId).subscribe({
      next: (res) => {
        if (res.user) {
          this.editForm.patchValue({
            user_id: res.user._id,
            name: res.user.name,
            email: res.user.email,
            mno: res.user.mobile
          });
        } else {
          this.error = 'Invalid user data received.';
        }
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to fetch user data.';
      }
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('user_id', this.editForm.value.user_id);
    formData.append('name', this.editForm.value.name);
    formData.append('email', this.editForm.value.email);
    formData.append('mno', this.editForm.value.mno);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile); // adjust field name based on backend
    }

    this.userService.updateProfile(formData).subscribe({
  next: (res) => {
    this.message = res.message;
    this.error = '';

    // redirect to /home
    this.router.navigate(['user/home']);
  },
  error: (err) => {
    console.error(err);
    this.error = 'Update failed.';
    this.message = '';
  }
});

  }
}
