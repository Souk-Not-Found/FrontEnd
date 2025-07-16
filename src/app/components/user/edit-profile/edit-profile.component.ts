import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  editForm: FormGroup;
  selectedFile: File | null = null;
  message = '';
  error = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.editForm = this.fb.group({
      user_id: [''],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mno: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const userId = localStorage.getItem('user_id');

    if (userId) {
      this.userService.getProfile(userId).subscribe({
        next: (res: any) => {
          console.log('Profile response:', res);
          if (res?.user) {
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
          console.error('Error loading profile:', err);
          this.error = 'Failed to load profile data.';
        }
      });
    } else {
      this.error = 'User ID not found. Please log in again.';
    }
  }

  onFileChange(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.editForm.invalid) {
      this.error = 'Please complete the form correctly.';
      return;
    }

    const formData = new FormData();
    Object.keys(this.editForm.value).forEach(key => {
      formData.append(key, this.editForm.value[key]);
    });

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.userService.editProfile(formData).subscribe({
      next: () => {
        this.message = 'Profile updated successfully.';
        setTimeout(() => this.router.navigate(['/user/home']), 1500);
      },
      error: (err) => {
        console.error('Update failed:', err);
        this.error = 'Update failed. Please try again.';
      }
    });
  }
}
