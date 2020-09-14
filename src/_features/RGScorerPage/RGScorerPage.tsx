import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Row, Col } from 'react-bootstrap';

import { RGScp2020 } from './RGScp2020';

import { RootState } from '../../_reducers';

export interface RGScorerDetails {
    scores: Object;
    values: Object;
}

export interface RGScorerProps {
    team: string;
    submitResults: (any) => {};
    details: RGScorerDetails;
}

function RGScorerPage() {
    const scorer = useSelector((state: RootState) => state.rgScorer);
    const handleSubmit = (details) => {
        console.log('submit details', details);
    };

    console.log('Scorer', scorer);

    switch (scorer.programId) {
        case 'FLL2020':
            return <RGScp2020 team={scorer.team} submitResults={handleSubmit} details={2} />;
        default:
            return null;
    }
}

export { RGScorerPage };
