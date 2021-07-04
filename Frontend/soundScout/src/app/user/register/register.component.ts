import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  public username: string = '';
  public email: string = '';
  public password: string = '';
  public passwordConfirm: string = '';

  public errorMessage: string = '';

  ngOnInit(): void {
  }

  register() {
    if (this.username == '' || this.email == '' || this.password == '') {
      this.errorMessage = "Please fill all fields!";
      return;
    }
    else if (this.password !== this.passwordConfirm) {
      this.errorMessage = "Passwords must match!";
      return;
    }

    this.errorMessage = '';

    this.userService.register(this.username, this.email, this.password).subscribe(resp => {
      alert(resp.msg);
      this.router.navigate(['login'])
    })
  }

}
