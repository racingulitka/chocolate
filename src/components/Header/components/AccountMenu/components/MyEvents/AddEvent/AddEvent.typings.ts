import { EventType } from "../MyEvents.typings"

export enum ModalType{
    add='add',
    edit='edit'
}

export interface Inputs{
    type:EventType | null,
    date:string,
    person:string,
    phone:string,
    city:string,
    address:string,
}