import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/model/Ticket';
import { PurchaseService } from 'src/app/services/purchase.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public username: string ='';
  public email: string = '';
  public date: string = '';

  constructor(private purchaseService: PurchaseService) { }

  public isAdmin: boolean = false;

  public tickets!: Ticket[];

  ngOnInit(): void {
    if (localStorage.getItem("adminToken")) {
      this.isAdmin = true;
    }

    var username: any = localStorage.getItem("loggedUser")
    this.username = username;
    var dateRegistered: any = localStorage.getItem("dateRegistered")
    this.date = dateRegistered;

    var email: any = localStorage.getItem("email")
    this.email = email;

    this.purchaseService.getTickets(this.username).subscribe(resp => {
      this.tickets = resp;
    });
  }

}
