import { GameRound } from './GameRound';

export interface JudgingDetails {
    submitedOn?: Date;
    submitedBy?: string;
    score: number;
    beginning: number;
    developing: number;
    accomplished: number;
    exceeds: number;
}

export interface GameDetails {
    type: GameRound;
    submitedOn?: Date;
    submitedBy?: string; // userId
    score: number;
    missions: string; // details of completed missions
}

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
    cvDetails: JudgingDetails[];
    projectDetails: JudgingDetails[];
    designDetails: JudgingDetails[];
    gameDetails: GameDetails[];
}
