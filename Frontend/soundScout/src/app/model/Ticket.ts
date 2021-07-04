import { MusicEvent } from "./musicEvent";

export interface Ticket {
    event: MusicEvent,
    firstName: string,
    lastName: string,
    payment: string,
    datePurchased: any
}