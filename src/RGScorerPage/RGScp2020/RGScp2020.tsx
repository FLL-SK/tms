import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Row, Col, Card, Accordion, useAccordionToggle } from 'react-bootstrap';

import { useForm, SubmitHandler, Controller, FormProvider, useWatch } from 'react-hook-form';

import { MissionPanel } from '../../_components/MissionPanel';
import { MissionQuestion } from '../../_components/MissionQuestion';

type Inputs = {
    m01: { answered?: boolean; score: number; twopieces: boolean; size4: boolean; touching: string };
    m02: { answered?: boolean; score: number; color: string };
};

function RGScp2020({ team, onSubmit, details }) {
    const validate: SubmitHandler<Inputs> = (data) => {
        console.log(data);
        /*setSubmitted(true);
        if (data.username && data.password) {
            dispatch(userActions.login(data.username, data.password));
        }
        */
    };

    const methods = useForm<Inputs>();

    //console.log('Watch', methods.watch(['m01', 'm02']));

    function calcScore() {
        const values = methods.getValues();
        console.log('Values', values);
        let s = 0;
        if (values.m01) {
            s =
                values.m01.size4 && values.m01.twopieces && values.m01.touching && values.m01.touching !== 'none'
                    ? 20
                    : 0;

            //setScores({ ...scores, m01: s });
            methods.setValue('m01.score', s);
            console.log('Score M01', s, methods.getValues());
        }
    }

    //useEffect(calcScore, [methods.watch(['m01', 'm02'])]); // recalculate score on any change
    //useEffect(() => {}, [methods.watch('scores')]);

    return (
        <FormProvider {...methods}>
            <Form name="Scorer2020" onSubmit={methods.handleSubmit(validate)}>
                <Accordion defaultActiveKey="01">
                    <MissionPanel eventKey="01" mid="m01" tns="rg2020" onChange={calcScore}>
                        <Row xs="1" md="2">
                            <Col>
                                <MissionQuestion.Checkbox qid="twopieces" inline />
                                <MissionQuestion.Checkbox qid="size4" inline />
                            </Col>
                            <Col>
                                <MissionQuestion.Radios qid="touching" radios={['none', 'replay', 'bench']} />
                            </Col>
                        </Row>
                    </MissionPanel>
                    <MissionPanel eventKey="02" mid="m02" tns="rg2020" onChange={calcScore}>
                        <MissionQuestion.Radios qid="color" radios={['none', 'purple', 'yellow', 'blue']} />
                    </MissionPanel>
                    <Button type="submit">Submit</Button>
                </Accordion>
            </Form>
        </FormProvider>
    );
}

export { RGScp2020 };
