import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  public oldPass: string = '';
  public newPass: string = '';
  public newPassConf: string = '';

  public errorMsg: string = '';

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  changePassword() {
    this.errorMsg = '';

    if (this.oldPass == '' || this.newPass == '' || this.newPassConf == '') {
      this.errorMsg = "Please fill all fields!"
      return;
    }
    if (this.newPass !== this.newPassConf) {
      this.errorMsg = "Password must match the confirm field!"
      return;
    }

    var username = localStorage.getItem("loggedUser");
    if (!username) {
      this.errorMsg = "User not found! Please re-log"
      return;
    }

    var usernameString: string = username;

    this.userService.changePassword(usernameString, this.oldPass, this.newPass).subscribe(success => {
      alert(success.msg);
      this.router.navigate(['home'])
    }, error => {
      alert(error.error.msg)
    })
  }

}
