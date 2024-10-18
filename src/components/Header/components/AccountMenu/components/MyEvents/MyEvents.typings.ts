export enum EventType {
    birthday = 'День рождения',
    holiday = 'Праздник'
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