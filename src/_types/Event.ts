interface _user {
    _id: string;
    fullName: string;
}
export interface Event {
    _id: string;
    name: string;
    program: string;
    startDate: Date;
    managers: _user[];
    judges: _user[];
    referees: _user[];
}
