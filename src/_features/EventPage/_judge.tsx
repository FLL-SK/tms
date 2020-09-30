import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/FormGroup';
import FormLabel from 'react-bootstrap/FormGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { useForm, UseFormMethods, Resolver } from 'react-hook-form';

function J(props: { name: keyof Inputs; title: string; onChange: (ev) => any; methods: any }) {
    const { title, onChange, methods, name } = props;
    const v = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
        <Col xs={6} md={3}>
            <span>{title}</span>
            <br />
            <select onChange={onChange} name={name} ref={methods.register}>
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
    let v = Number(values.bg) + Number(values.dv) + Number(values.ac) + Number(values.ex);
    console.log('Resolver', values, v);
    return {
        values: values ? values : {},
        errors:
            v != 10
                ? {
                      ex: {
                          type: 'manual',
                          message: 'Total number of answers should be 10. It is ' + v,
                      },
                  }
                : {},
    };
};

interface Inputs {
    bg: string; // beginning
    dv: string; // developing
    ac: string; // accomplished
    ex: string; // exceeds
}

interface JudgeProps {
    teams: any[];
    type: string;
    onSubmit: (teamId: string, type: string, score: number, data: Object) => any;
}

export function Judging(props: JudgeProps) {
    const { teams, type, onSubmit } = props;
    const [evaluating, setEvaluating] = useState(false);
    const [teamId, setTeamId] = useState('');
    const [totalScore, setTotalScore] = useState(0);
    const methods = useForm<Inputs>({
        defaultValues: { bg: '0', dv: '0', ac: '0', ex: '0' },
        resolver: resolver,
    });

    function handleSubmit(data: Inputs) {
        onSubmit(teamId, type, totalScore, data);

        // cleanup after submision
        setEvaluating(false);
        setTeamId('');
    }

    function handleChange() {
        let v = methods.getValues();
        setTotalScore(Number(v.bg) + Number(v.dv) * 2 + Number(v.ac) * 3 + Number(v.ex) * 4);
    }

    return (
        <>
            <Row className="flex-v-center">
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
                <>
                    <Form name="Judging" onSubmit={methods.handleSubmit(handleSubmit)}>
                        <Row>
                            <J name="bg" title="Beginners" onChange={handleChange} methods={methods} />
                            <J name="dv" title="Developing" onChange={handleChange} methods={methods} />
                            <J name="ac" title="Acomplished" onChange={handleChange} methods={methods} />
                            <J name="ex" title="Exceeding" onChange={handleChange} methods={methods} />
                        </Row>
                        <Row>{methods.errors.ex && 'celkovy pocet odpovedi musi byt presne 10'}</Row>
                        <Row>
                            <Button type="submit">Submit</Button>
                        </Row>
                    </Form>
                </>
            )}
        </>
    );
}
