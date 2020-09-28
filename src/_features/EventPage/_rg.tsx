import React, { useState } from 'react';
import { Form, FormControl, Row, Col, Button } from 'react-bootstrap';

import { ScorerRouter } from '../../_components/ScorerRouter';

interface RGProps {
    teams: any[];
    tables: any[];
    program?: string;
    onSubmit: (teamId: string, score: number, data: Object) => any;
}

export function RG(props: RGProps) {
    const { teams, tables, onSubmit, program } = props;
    const [evaluating, setEvaluating] = useState(false);
    const [teamId, setTeamId] = useState('');

    function handleSubmit(totalScore: number, missions: Object) {
        onSubmit(teamId, totalScore, missions);

        // cleanup after submision
        setEvaluating(false);
        setTeamId('');
    }

    function handleTeamChange(ev) {
        ev.preventDefault();
        setTeamId(ev.target.value);
        console.log('team changed to ', ev.target.value);
    }

    function handleStartEval(ev) {
        ev.preventDefault();
        setEvaluating(true);
    }

    return (
        <>
            <Row>
                <Col lg={8}>
                    <FormControl as="select" defaultValue={status} disabled={evaluating} onChange={handleTeamChange}>
                        <option value=""></option>
                        {teams.map((t, idx) => {
                            return (
                                <option value={t._id} key={idx + 1}>
                                    {t.name}
                                </option>
                            );
                        })}
                    </FormControl>
                </Col>
                <Col lg={4}>
                    {!evaluating && teamId && <Button onClick={(ev) => setEvaluating(true)}>Start</Button>}
                </Col>
            </Row>
            {evaluating && (
                <Row>
                    <ScorerRouter onSubmit={handleSubmit} program={program} />
                </Row>
            )}
        </>
    );
}
