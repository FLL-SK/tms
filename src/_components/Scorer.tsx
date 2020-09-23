import React from 'react';

import { Scorer2020 } from './Scorer2020';

interface ScorerProps {
    onSubmit: (details: any) => any;
    values?: string;
    program: string;
}

export function Scorer(props: ScorerProps) {
    const { onSubmit, values, program } = props;

    const handleSubmit = (details) => {
        console.log('submit details', details);
        onSubmit(details);
    };

    return <>{program == 'FLL2020' ? <Scorer2020 onSubmit={handleSubmit} values={values} /> : null}</>;
}
