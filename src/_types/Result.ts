export interface Result {
    type: string; // type influences structure of details
    submitedOn: Date;
    submitedBy: string;
    score: number;
    details: string;
}
