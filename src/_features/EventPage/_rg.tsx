import React, { useState } from 'react';
import { Form, FormControl, Row, Col, Button } from 'react-bootstrap';

import { Scorer } from './../../_components/Scorer';

interface RGProps {
    teams: any[];
    tables: any[];
    program: string;
    onSubmit: (program: string, teamId: string, data: any) => any;
}

export function RG(props: RGProps) {
    const { teams, tables, onSubmit, program } = props;
    const [evaluating, setEvaluating] = useState(false);
    const [teamId, setTeamId] = useState('');

    function handleSubmit(program: string, data: any) {
        onSubmit(program, teamId, data);

        // cleanup after submision
        setEvaluating(false);
        setTeamId('');
    }

    function handleTeamChange(ev) {
        ev.preventDefault();
        setTeamId(ev.target.value);
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
                        {teams.map((t) => {
                            return (
                                <option value={t._id} key={t._id}>
                                    {t.name}
                                </option>
                            );
                        })}
                    </FormControl>
                </Col>
                <Col lg={4}>{!evaluating && <Button onClick={(ev) => setEvaluating(true)}>Start</Button>}</Col>
            </Row>
            {evaluating && (
                <Row>
                    <Scorer onSubmit={handleSubmit} program={program} />
                </Row>
            )}
        </>
    );
}
