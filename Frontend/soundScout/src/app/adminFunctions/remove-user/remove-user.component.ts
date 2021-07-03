import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-remove-user',
  templateUrl: './remove-user.component.html',
  styleUrls: ['./remove-user.component.css']
})
export class RemoveUserComponent implements OnInit {

  public users: User[] = [];

  public chosenUser: string = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsername("").subscribe(resp => {
      console.log(resp)
      this.users = resp;
    });
  }

  deleteUser() {
    if (this.chosenUser !== '') {
      this.userService.deleteUser(this.chosenUser).subscribe(resp => {
        alert(resp.msg)
      });
    }
  }

}
