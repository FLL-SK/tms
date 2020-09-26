import React, { useState, useReducer } from 'react';

import { Row, Col, Button } from 'react-bootstrap';
import { FormControl, FormLabel, FormGroup } from 'react-bootstrap';
import { Tabs, Tab } from 'react-bootstrap';

import { useTranslation } from 'react-i18next';

import { ScorerRouter } from '../../_components/ScorerRouter';

import { txt } from '../../_locales';

const programs = [{ id: 'FLL2020', name: '2020' }];

const initialProgram = 'FLL2020';
const localStorageItem = 'FLL_Scorer_Results_v1';

interface ScorerResults {
    submitedOn: Date;
    score: number;
    program: string;
    data: string;
    note: string;
}

let initialResults: ScorerResults[];

try {
    console.log('Reading results');
    let r = localStorage.getItem(localStorageItem);
    console.log('Results', r);
    if (r) {
        initialResults = JSON.parse(r);
        initialResults = initialResults.map((i) => {
            return { ...i, submitedOn: new Date(i.submitedOn) };
        });
        console.log('Parsed', initialResults);
    }
} catch (err) {
    console.log('Error reading stored results');
    initialResults = [];
}

function reducer(state, action): ScorerResults[] {
    switch (action.type) {
        case 'submit':
            return [...state, action.data];
        case 'clear':
            return [];
        default:
            return [...state];
    }
}

export function ScorerPage() {
    const [evaluating, setEvaluating] = useState(false);
    const [program, setProgram] = useState(initialProgram);
    const [note, setNote] = useState('');
    const [tab, setTab] = useState('scorer');
    const [results, dispatch] = useReducer(reducer, initialResults);
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
        let pkg = {
            submitedOn: new Date(),
            score: score,
            program: program,
            data: JSON.stringify(data),
            note: note,
        };
        dispatch({ type: 'submit', data: pkg });

        setProgram(initialProgram);
        setEvaluating(false);
        setNote('');
        setTab('results');

        localStorage.setItem(localStorageItem, JSON.stringify([...results, pkg]));
    }

    function clearResults() {
        dispatch({ type: 'clear' });
        localStorage.setItem(localStorageItem, JSON.stringify([]));
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
                                <FormControl value={note} onChange={handleNoteChange} />
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
                            <ScorerRouter onSubmit={handleSubmit} program={program} />
                        </Row>
                    )}
                </Tab>
                <Tab eventKey="results" title={t(txt.ScorerPage.results.title)}>
                    <Row>
                        <Button onClick={clearResults} style={{ margin: '1em' }}>
                            {t(txt.ScorerPage.results.clearBtn)}
                        </Button>
                    </Row>
                    <Row>
                        <Col>
                            <p className="font-weight-bold">{t(txt.ScorerPage.results.time)}</p>
                        </Col>
                        <Col>
                            <p className="font-weight-bold">{t(txt.ScorerPage.results.season)}</p>
                        </Col>
                        <Col>
                            <p className="font-weight-bold">{t(txt.ScorerPage.results.score)}</p>
                        </Col>
                        <Col sm={6}>
                            <p className="font-weight-bold">{t(txt.ScorerPage.results.note)}</p>
                        </Col>
                    </Row>
                    {results &&
                        results.map((r, idx) => {
                            return (
                                <Row key={idx} style={{ backgroundColor: idx % 2 ? '' : 'lightgrey' }}>
                                    <Col>
                                        {r.submitedOn.getHours().toString().padStart(2, '0') +
                                            ':' +
                                            r.submitedOn.getMinutes().toString().padStart(2, '0') +
                                            ':' +
                                            r.submitedOn.getSeconds().toString().padStart(2, '0')}
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
