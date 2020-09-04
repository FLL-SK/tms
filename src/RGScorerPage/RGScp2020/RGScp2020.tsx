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

    function calcScore() {
        const values = methods.getValues();
        console.log('Values', values);
        let s = 0;
        if (values.m01) {
            s =
                values.m01.size4 && values.m01.twopieces && values.m01.touching && values.m01.touching !== 'none'
                    ? 20
                    : 0;
            methods.setValue('m01.score', s);
            console.log('Score M01', s);
        }
        if (values.m02) {
            let a = [
                ['blue', 20],
                ['yellow', 15],
                ['purple', 10],
            ];
            let i = a.find((i) => i[0] === values.m02.color);
            if (i) s = i[1] as number;
            else s = 0;
            methods.setValue('m02.score', s);
            console.log('Score M02', s);
        }
    }

    return (
        <FormProvider {...methods}>
            <Form name="Scorer2020" onSubmit={methods.handleSubmit(validate)}>
                <Accordion defaultActiveKey="01">
                    <MissionPanel eventKey="01" mid="m01" tns="rg2020" onChange={calcScore}>
                        <Row xs="1" md="2">
                            <Col>
                                <MissionQuestion.Checkbox qid="twopieces" />
                                <MissionQuestion.Checkbox qid="size4" />
                            </Col>
                            <Col>
                                <MissionQuestion.Radios qid="touching" radios={['none', 'replay', 'bench']} />
                            </Col>
                        </Row>
                    </MissionPanel>
                    <MissionPanel eventKey="02" mid="m02" tns="rg2020" onChange={calcScore}>
                        <MissionQuestion.Radios qid="color" radios={['none', 'purple', 'yellow', 'blue']} />
                    </MissionPanel>
                </Accordion>
                <Button type="submit">Submit</Button>
            </Form>
        </FormProvider>
    );
}

export { RGScp2020 };
