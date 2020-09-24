import React, { useState, useReducer } from 'react';

import { Row, Col, Button } from 'react-bootstrap';
import { FormControl, FormLabel, FormGroup } from 'react-bootstrap';
import { Tabs, Tab } from 'react-bootstrap';

import { useTranslation } from 'react-i18next';

import { Scorer } from '../../_components/Scorer';

import { txt } from '../../_locales';

const programs = [{ id: 'FLL2020', name: '2020' }];

function reducer(state, action) {
    switch (action.type) {
        case 'submit':
            return [...state, action.data];
        case 'clear':
            return [];
    }
}

const initialProgram = 'FLL2020';

export function ScorerPage() {
    const [evaluating, setEvaluating] = useState(false);
    const [program, setProgram] = useState(initialProgram);
    const [note, setNote] = useState('');
    const [tab, setTab] = useState('scorer');
    const [results, dispatch] = useReducer(reducer, []);
    const { t } = useTranslation();

    function handleProgramChange(ev) {
        ev.preventDefault();
        setProgram(ev.target.value);
    }

    function handleNoteChange(ev) {
        ev.preventDefault();
        setNote(ev.target.value);
    }

    function handleSubmit(program: string, data: any) {
        console.log('SUBMIT', program, data);
        let score = 0;
        for (let m in data) {
            score += data[m]['score'];
        }
        dispatch({
            type: 'submit',
            data: { time: new Date(), score: score, program: program, data: data, note: note },
        });
        setProgram(initialProgram);
        setEvaluating(false);
        setNote('');
        setTab('results');
    }

    return (
        <>
            <Tabs activeKey={tab} onSelect={(k) => setTab(k || 'scorer')}>
                <Tab title={t(txt.ScorerPage.scorer.title)} eventKey="scorer">
                    <Row style={{ marginTop: '1em' }}>
                        <Col md={3}>
                            <FormGroup controlId="program">
                                <FormLabel>{t(txt.ScorerPage.scorer.season)}</FormLabel>
                                <FormControl
                                    as="select"
                                    defaultValue={status}
                                    disabled={evaluating}
                                    onChange={handleProgramChange}
                                >
                                    {programs.map((p) => {
                                        return (
                                            <option value={p.id} key={p.id}>
                                                {p.name}
                                            </option>
                                        );
                                    })}
                                </FormControl>
                            </FormGroup>
                        </Col>
                        <Col md={7}>
                            <FormGroup controlId="note">
                                <FormLabel>{t(txt.ScorerPage.scorer.note)}</FormLabel>
                                <FormControl onChange={handleNoteChange} />
                            </FormGroup>
                        </Col>
                        <Col md={2} className="my-auto">
                            <FormGroup>
                                {!evaluating && (
                                    <Button onClick={(ev) => setEvaluating(true)}>
                                        {t(txt.ScorerPage.scorer.startBtn)}
                                    </Button>
                                )}{' '}
                            </FormGroup>
                        </Col>
                    </Row>
                    {evaluating && (
                        <Row>
                            <Scorer onSubmit={handleSubmit} program={program} />
                        </Row>
                    )}
                </Tab>
                <Tab eventKey="results" title={t(txt.ScorerPage.results.title)}>
                    <Row>
                        <Button onClick={() => dispatch('clear')} style={{ margin: '1em' }}>
                            {t(txt.ScorerPage.results.clearBtn)}
                        </Button>
                    </Row>
                    {results &&
                        results.map((r, idx) => {
                            return (
                                <Row key={idx}>
                                    <Col>
                                        {r.time.getHours() + ':' + r.time.getMinutes() + ':' + r.time.getSeconds()}
                                    </Col>
                                    <Col>{r.program}</Col>
                                    <Col>{r.score}</Col>
                                    <Col sm={6}>{r.note}</Col>
                                </Row>
                            );
                        })}
                </Tab>
            </Tabs>
        </>
    );
}
