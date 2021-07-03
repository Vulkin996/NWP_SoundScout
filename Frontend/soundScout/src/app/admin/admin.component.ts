import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public selectedFunction: number = -1;

  constructor() { }

  ngOnInit(): void {
  }

  public adminFunction(index: number) {
    this.selectedFunction = index;
  }

}
