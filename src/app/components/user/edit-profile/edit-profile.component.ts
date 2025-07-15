import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {

  editForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.editForm = this.fb.group({
      user_id: [''], name: [''], email: [''], mno: ['']
    });
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    const formData = new FormData();
    Object.keys(this.editForm.value).forEach(key => {
      formData.append(key, this.editForm.value[key]);
    });
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.userService.editProfile(formData).subscribe(() => {
      this.router.navigate(['/user/home']);
    });
  }
}
