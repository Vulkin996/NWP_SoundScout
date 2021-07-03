import { Component, Input, OnInit } from '@angular/core';
import { MusicEvent } from '../model/musicEvent';

@Component({
  selector: 'app-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.css']
})
export class EventItemComponent implements OnInit {

  @Input()
  eventData!: MusicEvent;

  constructor() { }

  ngOnInit(): void {
  }

}
