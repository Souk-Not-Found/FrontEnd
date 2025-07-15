import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  user: any;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getHome().subscribe({
      next: (res: any) => this.user = res.user,
      error: () => this.user = null
    });
  }

}
