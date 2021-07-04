import { Component, OnInit } from '@angular/core';
import { PurchaseService } from '../services/purchase.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

  constructor(private purchaseService: PurchaseService) { }

  ngOnInit(): void {
  }

  purchase() {

  }

}
