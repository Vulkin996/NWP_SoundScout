import { Artist } from "./Artist";
import { EventLocation } from "./EventLocation";

export interface MusicEvent {
    Name: string;
    Location: EventLocation;
    Artist: Artist;
    Date: Date;
    Price: number;
    Type: string;
    MaxTickets: number;
    Picture: string;
}