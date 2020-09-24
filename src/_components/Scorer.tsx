import React from 'react';

import { Scorer2020 } from './Scorer2020';

interface ScorerProps {
    onSubmit: (program: string, details: any) => any;
    values?: Scorer2020.Inputs;
    program: string;
}

export function Scorer(props: ScorerProps) {
    const { onSubmit, values, program } = props;

    const handleSubmit = (details: any) => {
        console.log('submit details', details);
        onSubmit(program, details);
    };

    return <>{program == 'FLL2020' ? <Scorer2020.Scorer onSubmit={handleSubmit} values={values} /> : null}</>;
}
