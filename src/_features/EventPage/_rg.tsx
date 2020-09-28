import React, { useState } from 'react';
import FormControl from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/FormGroup';
import FormLabel from 'react-bootstrap/FormGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { ScorerRouter } from '../../_components/ScorerRouter';

interface RGProps {
    teams: any[];
    tables: [string, string][];
    program?: string;
    onSubmit: (round: string, table: string, teamId: string, score: number, data: Object) => any;
    rounds: [string, string][];
}

export function RG(props: RGProps) {
    const { teams, tables, onSubmit, program, rounds } = props;
    const [evaluating, setEvaluating] = useState(false);
    const [teamId, setTeamId] = useState('');
    const [round, setRound] = useState('');
    const [table, setTable] = useState('');

    function handleSubmit(totalScore: number, missions: Object) {
        onSubmit(round, table, teamId, totalScore, missions);

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
                <Col lg={4}>
                    <FormGroup as={Row}>
                        <FormLabel>Round</FormLabel>
                        <FormControl as="select" disabled={evaluating} onChange={(ev) => setRound(ev.target.value)}>
                            <option value=""></option>
                            {rounds.map((t, idx) => {
                                return (
                                    <option value={t[0]} key={idx + 1}>
                                        {t[1]}
                                    </option>
                                );
                            })}
                        </FormControl>
                    </FormGroup>
                </Col>

                <Col lg={4}>
                    <FormGroup as={Row}>
                        <FormLabel>Table</FormLabel>
                        <FormControl as="select" disabled={evaluating} onChange={(ev) => setTable(ev.target.value)}>
                            <option value=""></option>
                            {tables.map((t, idx) => {
                                return (
                                    <option value={t[0]} key={idx + 1}>
                                        {t[1]}
                                    </option>
                                );
                            })}
                        </FormControl>
                    </FormGroup>
                </Col>
            </Row>
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
