import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public isLoggedIn: boolean = false;
  public isAdmin: boolean = false;

  constructor() { }

  ngOnInit(): void {
    if (localStorage.getItem("token")) {
      this.isLoggedIn = true;
    }
    if (localStorage.getItem("adminToken")) {
      this.isAdmin = true;
    }
  }

  logout() {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token")
    }
    if (localStorage.getItem("adminToken")) {
      localStorage.removeItem("adminToken")
    }
    window.location.href = "/home";
  }

}
