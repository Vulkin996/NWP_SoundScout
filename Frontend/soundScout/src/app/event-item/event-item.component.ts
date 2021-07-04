import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MusicEvent } from '../model/musicEvent';

@Component({
  selector: 'app-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.css']
})
export class EventItemComponent implements OnInit {

  @Input()
  eventData!: MusicEvent;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  purchase() {
    this.router.navigate(['purchase'])
  }

}
