import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Row, Col, Card, Accordion, useAccordionToggle } from 'react-bootstrap';

import { useForm, SubmitHandler, Controller, FormProvider, useWatch } from 'react-hook-form';

import { Scorer } from '../../_components/Scorer';
import { ScorerPanel } from '../../_components/ScorerPanel';
import { ButtonRadios } from '../../_components/ScorerQuestion';
import calcScore from './caclScore';

type Inputs = {
    m01: { score: number; twopieces: string; size4: string; touching: string };
    m02: { score: number; color: string };
    m03: { score: number; notOnSlide: string; inHome: string; onTyre: string };
    m04: { score: number; benchDown: string; cubesInHoles: string; backRemoved: string };
    m05: { score: number; cubeInHoop: string; hoopPosition: string };
    m06: { score: number; droveUnder: string; hangingOn: string };
    m07: { score: number; onPlace: string; isDancing: string };
    m08: { score: number; cubeOnBothSides: string; cubeSameColor: string; cubeCount: string; yellowCube: string };
};

export function RGScp2020({ team, onSubmit, details }) {
    const validate: SubmitHandler<Inputs> = (data) => {
        console.log(data);
        /*setSubmitted(true);
        if (data.username && data.password) {
            dispatch(userActions.login(data.username, data.password));
        }
        */
    };

    const methods = useForm<Inputs>();
    const handleChange = () => {
        calcScore(methods);
    };

    return (
        <Scorer onChange={handleChange} tns="rg2020" formMethods={methods}>
            <Form name="Scorer2020" onSubmit={methods.handleSubmit(validate)}>
                <Accordion defaultActiveKey="01">
                    <ScorerPanel mid="m01">
                        <Row>
                            <ButtonRadios qid="twopieces" values={['no', 'yes']} />
                            <ButtonRadios qid="size4" values={['no', 'yes']} />
                            <ButtonRadios qid="touching" values={['none', 'replay', 'bench']} />
                        </Row>
                    </ScorerPanel>
                    <ScorerPanel mid="m02">
                        <ButtonRadios qid="color" values={['none', 'purple', 'yellow', 'blue']} />
                    </ScorerPanel>
                    <ScorerPanel mid="m03">
                        <Row>
                            <ButtonRadios qid="notOnSlide" values={['none', '1', '2']} />
                            <ButtonRadios qid="inHome" values={['none', '1', '2']} />
                            <ButtonRadios qid="onTyre" values={['none', '1', '2']} />
                        </Row>
                    </ScorerPanel>
                    <ScorerPanel mid="m04">
                        <Row>
                            <ButtonRadios qid="benchDown" values={['no', 'yes']} />
                            <ButtonRadios qid="cubesInHoles" values={['none', '1', '2', '3', '4']} />
                            <ButtonRadios qid="backRemoved" values={['no', 'yes']} />
                        </Row>
                    </ScorerPanel>
                    <ScorerPanel mid="m05">
                        <Row>
                            <ButtonRadios qid="cubeInHoop" values={['no', 'yes']} />
                            <ButtonRadios qid="hoopPosition" values={['down', 'middle', 'top']} />
                        </Row>
                    </ScorerPanel>
                    <ScorerPanel mid="m06">
                        <Row>
                            <ButtonRadios qid="droveUnder" values={['no', 'yes']} />
                            <ButtonRadios qid="hangingOn" values={['no', 'yes']} />
                        </Row>
                    </ScorerPanel>
                    <ScorerPanel mid="m07">
                        <Row>
                            <ButtonRadios qid="onPlace" values={['no', 'yes']} />
                            <ButtonRadios qid="isDancing" values={['no', 'yes']} />
                        </Row>
                    </ScorerPanel>
                    <ScorerPanel mid="m08">
                        <Row>
                            <ButtonRadios qid="cubeOnBothSides" values={['no', 'yes']} />
                            <ButtonRadios qid="cubeSameColor" values={['no', 'yes']} />
                            <ButtonRadios qid="cubeCount" values={['none', '1', '2', '3', '4', '5', '6', '7']} />
                            <ButtonRadios qid="yellowCube" values={['no', 'yes']} />
                        </Row>
                    </ScorerPanel>
                </Accordion>
                <Button type="submit">Submit</Button>
            </Form>
        </Scorer>
    );
}
