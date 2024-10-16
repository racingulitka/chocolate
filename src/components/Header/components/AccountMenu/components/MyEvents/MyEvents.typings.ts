export enum EventType {
    birthday = 'birthday',
    holiday = 'holiday'
}

export interface Event{
    id:number,
    type: EventType,
    date: Date,
    person:string,
    phone:string,
    city:string,
    address:string,
}