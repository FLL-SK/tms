import React from 'react';

import { Scorer2020 } from './Scorer2020';

interface ScorerRouterProps {
    onSubmit: (score: number, missionData: Object) => any;
    values?: Scorer2020.Inputs;
    program?: string;
}

export function ScorerRouter(props: ScorerRouterProps) {
    const { onSubmit, values, program } = props;

    const handleSubmit = (totalScore: number, missions: Object) => {
        console.log('submit details', missions);
        onSubmit(totalScore, missions);
    };

    switch (program) {
        case 'FLL2020':
            return <>{<Scorer2020.Scorer onSubmit={handleSubmit} values={values} />}</>;
        default:
            //TODO
            return <p>Pre program {program} neexistuje hodnotenie</p>;
    }
}
