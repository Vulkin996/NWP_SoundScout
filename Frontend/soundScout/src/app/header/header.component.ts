import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public isLoggedIn: boolean = false;
  public isAdmin: boolean = false;

  public activeTabIndex: number = -1;

  constructor() { }

  ngOnInit(): void {
    if (localStorage.getItem("token")) {
      this.isLoggedIn = true;
    }
    if (localStorage.getItem("adminToken")) {
      this.isAdmin = true;
    }

    var lastPath: string = window.location.href.substring(window.location.href.lastIndexOf('/'));

    switch (lastPath) {
      case '/home':
        this.activeTabIndex = 0
        break;
      case '/profile':
        this.activeTabIndex = 1
        break;
      case '/admin':
        this.activeTabIndex = 2
        break;
      case '/login':
        this.activeTabIndex = 3
        break;
      case '/register':
        this.activeTabIndex = 4
        break;
    }
  }

  logout() {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token")
    }
    if (localStorage.getItem("adminToken")) {
      localStorage.removeItem("adminToken")
    }
    if (localStorage.getItem("loggedUser")) {
      localStorage.removeItem("loggedUser")
    }
    if (localStorage.getItem("email")) {
      localStorage.removeItem("email")
    }
    if (localStorage.getItem("dateRegistered")) {
      localStorage.removeItem("dateRegistered")
    }
    window.location.href = "/home";
  }

}
