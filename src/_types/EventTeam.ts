import { Result } from './Result';

export interface EventTeam {
    _id: string;
    name: string; // team name can be technically different from one event to another
    arrived?: boolean; // team has arrived to the event
    coachName?: string; // good to know who coach is
    coachPhone?: string; // good to have his/her phone number
    boysCount: string; // for statistics
    girlsCount: string; // for statistics
    results?: Result[]; // team results, one result type can be sumbitted more times, last submission is taken into account
}
