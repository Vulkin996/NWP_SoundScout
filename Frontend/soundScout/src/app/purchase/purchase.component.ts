import { Component, OnInit } from '@angular/core';
import { PurchaseService } from '../services/purchase.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

  public FirstName: string = '';
  public LastName: string = '';
  public Country: string = '';
  public City: string = '';
  public Address: string = '';
  public Address2: string = '';
  public zipCode: string = '';
  public email: string = '';
  public paymentMethod: string = '';

  public price: string = '';
  public totalPrice: string = '';
  public hasDiscount: boolean = false;

  public eventName: string = '';

  public errorName: boolean = false;
  public errorAddr: boolean = false;

  constructor(private purchaseService: PurchaseService) { }

  ngOnInit(): void {
    var event: any = localStorage.getItem("eventToPurchase");
    this.eventName = event;

    var pr: any = localStorage.getItem("eventPrice");
    this.price = pr;
    this.totalPrice = pr;
  }

  purchase() {

    if (!this.checkName()) {
      this.errorName = true;
      return;
    }

    if (!this.checkAddress()) {
      this.errorAddr = true
      return;
    }

    if (localStorage.getItem("loggedUser")) {
      var username: any = localStorage.getItem("loggedUser")
      this.purchaseService.purchase(username, this.eventName, this.email, this.FirstName, this.LastName, this.Country, this.City, this.zipCode, this.Address, this.Address2, this.paymentMethod).subscribe(resp => {
        alert(resp.msg);
      })
    }
  }

  checkName(): boolean {
    var regexp = new RegExp("[A-Z][a-z\s]+")
    var test = regexp.test(this.FirstName);

    if (this.FirstName === '' || !test)
      return false;

    test = regexp.test(this.LastName);

    if (this.LastName === '' || !test)
      return false;

    return true;
  }
  checkAddress(): boolean {
    var regexp = new RegExp("[A-Z][a-z\s]+")
    var test = regexp.test(this.City);

    if (this.Address === '' || this.City === '' || this.Country === '' || !test)
      return false;

    regexp = new RegExp("[0-9]+")
    test = regexp.test(this.zipCode);

    if (this.zipCode === '' || !test)
      return false;

    return true;
  }
}
