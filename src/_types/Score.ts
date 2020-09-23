export interface Score {
    team: {
        _id: string;
        name: string;
    };
    eventTeamId: string; // reference to EventTeam
    rank?: number;
    coreValues?: number;
    project?: number;
    design?: number;
    game?: number;
    game1?: number; //
    game2?: number; //
    game3?: number; //
    gameQ?: number; // quarter-finals score
    gameS?: number; // semi-finals score
    gameF?: number; // finals score
    judgingDetails: {
        type: string;
        submitedOn?: Date;
        submitedBy?: string;
        score: number;
        one: number;
        two: number;
        three: number;
        four: number;
    }[];
    gameDetails: {
        type: string; //R1, R2, R3, R1-PO, R2-PO, R3-PO, Q, Q-PO, S, S-PO, F, F-PO
        submitedOn?: Date;
        submitedBy?: string;
        score: number;
        missions: string; // details of completed missions
    }[];
}
