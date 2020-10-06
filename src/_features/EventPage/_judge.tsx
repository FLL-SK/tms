import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { useForm, UseFormMethods, Resolver } from 'react-hook-form';

import * as CTable from '../../_components/ColapsibleTable';
import { Score, JudgingCategory } from '../../_types';

function J(props: { name: keyof Inputs; title: string; onChange: (ev) => any; methods: any }) {
    const { title, onChange, methods, name } = props;
    const v = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
        <Col xs={6} md={3} style={{ textAlign: 'center' }}>
            <span>{title}</span>
            <br />
            <select
                onChange={onChange}
                name={name}
                ref={methods.register}
                style={{ width: '5rem', textAlign: 'center' }}
            >
                {v.map((i) => (
                    <option value={i} key={i}>
                        {i}
                    </option>
                ))}
            </select>
        </Col>
    );
}

const resolver: Resolver<Inputs> = async (values: Inputs) => {
    let v = Number(values.beginning) + Number(values.developing) + Number(values.accomplished) + Number(values.exceeds);
    console.log('Resolver', values, v);
    return {
        values: values ? values : {},
        errors:
            v != 10
                ? {
                      exceeds: {
                          type: 'manual',
                          message: 'Total number of answers should be 10. It is ' + v,
                      },
                  }
                : {},
    };
};

interface Inputs {
    beginning: string; // beginning
    developing: string; // developing
    accomplished: string; // accomplished
    exceeds: string; // exceeds
}

interface JudgeProps {
    teams: any[];
    category: JudgingCategory;
    scores: Score[];
    onSubmit: (teamId: string, type: JudgingCategory, score: number, data: Object) => any;
}

export function Judging(props: JudgeProps) {
    const { teams, category, onSubmit, scores } = props;
    const [teamId, setTeamId] = useState('');
    const [totalScore, setTotalScore] = useState(0);

    if (!teams) return null;
    let tscores = teams.reduce(
        (a: any[], t: any) => [...a, { ...t, score: scores.find((s) => t._id === s.eventTeamId) || {} }],
        [],
    );

    const methods = useForm<Inputs>({
        defaultValues: { beginning: '0', developing: '0', accomplished: '0', exceeds: '0' },
        resolver: resolver,
    });

    function handleSubmit(data: Inputs) {
        console.log('Judge Submit', totalScore, data);
        onSubmit(teamId, category, totalScore, data);

        // cleanup after submision
        setTeamId('');
    }

    function handleChange() {
        let v = methods.getValues();
        setTotalScore(
            Number(v.beginning) + Number(v.developing) * 2 + Number(v.accomplished) * 3 + Number(v.exceeds) * 4,
        );
    }

    console.log('Judging', tscores, teamId);

    return (
        <>
            <Row>
                <Col md>
                    <CTable.Label label={'Teams'} align="left" />
                </Col>
                <Col md>
                    <Row>
                        <CTable.Label label={'Score'} align="center" />
                    </Row>
                </Col>
            </Row>
            {tscores.map((r, idx) => (
                <React.Fragment key={idx}>
                    <Row
                        onClick={() => setTeamId(r._id)}
                        className={(idx % 2 ? '' : 'fll_scoring_row') + (teamId === r._id ? ' fll_selected_row' : '')}
                        style={{
                            display: 'flex',
                            alignItems: 'flex-end',
                            paddingTop: '1rem',
                            paddingBottom: '1rem',
                        }}
                    >
                        <Col
                            md
                            className={
                                'fll_scoring_header-' +
                                (idx % 2 ? 'odd' : 'even') +
                                (teamId === r._id ? 'fll_selected_row' : '')
                            }
                        >
                            {r.name}
                        </Col>
                        <Col md>
                            <Row>
                                {category == 'coreValues' && (
                                    <CTable.Value label={'Score'} value={r.score.coreValues} />
                                )}
                                {category == 'project' && <CTable.Value label={'Score'} value={r.score.project} />}
                                {category == 'design' && <CTable.Value label={'Score'} value={r.score.design} />}
                            </Row>
                        </Col>
                    </Row>
                    {teamId === r._id && (
                        <div className="fll_selected_row">
                            <Form name="Judging" onSubmit={methods.handleSubmit(handleSubmit)}>
                                <Row>
                                    <J name="beginning" title="Beginners" onChange={handleChange} methods={methods} />
                                    <J name="developing" title="Developing" onChange={handleChange} methods={methods} />
                                    <J
                                        name="accomplished"
                                        title="Acomplished"
                                        onChange={handleChange}
                                        methods={methods}
                                    />
                                    <J name="exceeds" title="Exceeding" onChange={handleChange} methods={methods} />
                                </Row>
                                <Row>{methods.errors.exceeds && 'celkovy pocet odpovedi musi byt presne 10'}</Row>
                                <Row style={{ justifyContent: 'center' }}>
                                    <Button type="submit" style={{ margin: '1rem' }}>
                                        Submit
                                    </Button>
                                </Row>
                            </Form>
                        </div>
                    )}
                </React.Fragment>
            ))}{' '}
        </>
    );
}
