import { Artist } from "./Artist";
import { EventLocation } from "./EventLocation";

export interface MusicEvent {
    eventName: string;
    Location: EventLocation;
    Artist: Artist;
    Date: any;
    Price: number;
    Type: string;
    MaxTickets: number;
    Picture: string;
}