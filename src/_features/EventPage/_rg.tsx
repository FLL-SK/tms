import React, { useState } from 'react';
import FormControl from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/FormGroup';
import FormLabel from 'react-bootstrap/FormGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { ScorerRouter } from '../../_components/ScorerRouter';
import { GameRound } from '../../_types';

interface RGProps {
    teams: any[];
    tables: [string, string][];
    program?: string;
    onSubmit: (round: GameRound, table: string, teamId: string, score: number, data: Object) => any;
    rounds: [GameRound, string][];
}

export function RG(props: RGProps) {
    const { teams, tables, onSubmit, program, rounds } = props;
    const [evaluating, setEvaluating] = useState(false);
    const [teamId, setTeamId] = useState('');
    const [round, setRound] = useState('');
    const [table, setTable] = useState('');

    function handleSubmit(totalScore: number, missions: Object) {
        onSubmit(round as GameRound, table, teamId, totalScore, missions);

        // cleanup after submision
        setEvaluating(false);
        setTeamId('');
    }

    return (
        <>
            <Row className="flex-v-center">
                <Col md={6} lg={2}>
                    <FormGroup as={Row} className="flex-v-center">
                        <Col sm={4} md={3}>
                            <FormLabel>Round</FormLabel>
                        </Col>
                        <Col sm={8}>
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
                        </Col>
                    </FormGroup>
                </Col>

                <Col md={6} lg={2}>
                    <FormGroup as={Row} className="flex-v-center">
                        <Col sm={4} md={3}>
                            <FormLabel>Table</FormLabel>
                        </Col>
                        <Col sm={8}>
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
                        </Col>
                    </FormGroup>
                </Col>
                <Col md={9} lg={6}>
                    <FormGroup as={Row} className="flex-v-center">
                        <Col sm={4} md={3}>
                            <FormLabel>Team</FormLabel>
                        </Col>
                        <Col sm={8} md={9}>
                            <FormControl
                                as="select"
                                defaultValue={status}
                                disabled={evaluating}
                                onChange={(ev) => setTeamId(ev.target.value)}
                            >
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
                    </FormGroup>
                </Col>
                <Col md={3} lg={2}>
                    {!evaluating && teamId && (
                        <Button size="lg" onClick={(ev) => setEvaluating(true)}>
                            Start
                        </Button>
                    )}
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
