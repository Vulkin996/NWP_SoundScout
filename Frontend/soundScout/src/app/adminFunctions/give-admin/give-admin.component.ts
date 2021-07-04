import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-give-admin',
  templateUrl: './give-admin.component.html',
  styleUrls: ['./give-admin.component.css']
})
export class GiveAdminComponent implements OnInit {

  public users: User[] = [];

  public chosenUser: string = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsername("").subscribe(resp => {
      for(let i = 0; i < resp.length; i++) {
        if(!resp[i].isAdmin)
          this.users.push(resp[i])
      }
    });
  }

  giveAdmin() {
    if (this.chosenUser !== '') {
      this.userService.giveAdmin(this.chosenUser).subscribe(resp => {
        alert(resp.msg)
      });
    }
  }

}
