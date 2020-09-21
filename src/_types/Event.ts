interface _user {
    _id: string;
    fullName: string;
}

interface _team {
    _id: string;
    name: string;
}

interface _schedule {
    round: number;
    table: string;
    t1: _team;
    t2: _team;
}
export interface Event {
    _id: string;
    name: string;
    program: string;
    startDate: Date;
    managers: _user[];
    judges: _user[];
    referees: _user[];
    rgType: string;
    rgSchedule: _schedule[];
}
