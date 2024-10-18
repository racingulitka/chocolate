import { EventType } from "../MyEvents.typings"

export interface Inputs{
    type:EventType | null,
    date:string,
    person:string,
    phone:string,
    city:string,
    address:string,
}