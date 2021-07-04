import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  public email: string = '';
  public password: string = '';

  public error: boolean = false;

  ngOnInit(): void {
  }

  login() {
    this.userService.login(this.email, this.password).subscribe(
      success => {
        localStorage.setItem("loggedUser", success.username);
        localStorage.setItem("token", success.token);
        if(success.adminToken){
          localStorage.setItem("adminToken", success.adminToken);
        }

        window.location.href = '/home';
      },
      error => {
        this.error = true;
      }
    )
  }

}
