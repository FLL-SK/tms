import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Row, Col, Card, Accordion, useAccordionToggle } from 'react-bootstrap';

import { useForm, SubmitHandler, Controller, FormProvider, useWatch } from 'react-hook-form';

import { useTranslation } from 'react-i18next';
import { txt } from '../../_locales';

import { Scorer } from '../../_components/Scorer';
import { ScorerPanel } from '../../_components/ScorerPanel';
import { ButtonRadios } from '../../_components/ScorerQuestion';
import calcScore from './caclScore';

import '../../_styles/style.css';

type Inputs = {
    m01: { score: number; twopieces: string; size4: string; touching: string };
    m02: { score: number; color: string };
    m03: { score: number; notOnSlide: string; inHome: string; onTyre: string };
    m04: { score: number; benchDown: string; cubesInHoles: string; backRemoved: string };
    m05: { score: number; cubeInHoop: string; hoopPosition: string };
    m06: { score: number; droveUnder: string; hangingOn: string };
    m07: { score: number; onPlace: string; isDancing: string };
    m08: { score: number; cubeOnBothSides: string; cubeSameColor: string; cubeCount: string; yellowCube: string };
    m09: {
        score: number;
        blueTyrePosition: string;
        blueTyreWhite: string;
        blackTyrePosition: string;
        blackTyreWhite: string;
        blackTyreXLine: string;
    };
    m10: { score: number; isFlipped: string; onField: string };
    m11: { score: number; touchedDial: string; color: string };
    m12: { score: number; wheelPosition: string };
    m13: { score: number; latchUnder: string; color: string };
    m14: { score: number; inAreas: string; onPole: string };
    m15: { score: number; count: string };
};

export function RGScp2020({ team, submitResults, details }) {
    const doSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data);

        submitResults(data);
    };

    const [totalScore, setTotalScore] = useState(0);

    const methods = useForm<Inputs>();
    const { t } = useTranslation();

    const handleChange = () => {
        calcScore(methods, setTotalScore);
        console.log('Errors', methods.errors);
    };

    return (
        <Scorer onChange={handleChange} tns="rg2020" formMethods={methods}>
            <Form name="Scorer2020" onSubmit={methods.handleSubmit(doSubmit)}>
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
                            <ButtonRadios qid="cubeCount" values={['0', '1', '2', '3', '4', '5', '6', '7']} />
                            <ButtonRadios qid="yellowCube" values={['no', 'yes']} />
                        </Row>
                    </ScorerPanel>
                    <ScorerPanel mid="m09">
                        <Row>
                            <ButtonRadios qid="blueTyreWhite" values={['no', 'yes']} />
                            <ButtonRadios qid="blueTyrePosition" values={['outside', 'onField', 'inArea']} />
                            <ButtonRadios qid="blackTyreWhite" values={['no', 'yes']} />
                            <ButtonRadios qid="blackTyrePosition" values={['outside', 'onField', 'inArea']} />
                            <ButtonRadios qid="blackTyreXLine" values={['no', 'yes']} />
                        </Row>
                    </ScorerPanel>
                    <ScorerPanel mid="m10">
                        <Row>
                            <ButtonRadios qid="isFlipped" values={['no', 'yes']} />
                            <ButtonRadios qid="onField" values={['no', 'yes']} />
                        </Row>
                    </ScorerPanel>
                    <ScorerPanel mid="m11">
                        <ButtonRadios qid="touchedDial" values={['no', 'yes']} />
                        <ButtonRadios
                            qid="color"
                            values={['none', 'gray', 'red', 'orange', 'yellow', 'lightGreen', 'darkGreen']}
                        />
                    </ScorerPanel>
                    <ScorerPanel mid="m12">
                        <Row>
                            <ButtonRadios qid="wheelPosition" values={['notOut', 'completelyOut', 'inSmall']} />
                        </Row>
                    </ScorerPanel>
                    <ScorerPanel mid="m13">
                        <ButtonRadios qid="latchUnder" values={['no', 'yes']} />
                        <ButtonRadios qid="color" values={['none', 'blue', 'purple', 'yellow']} />
                    </ScorerPanel>
                    <ScorerPanel mid="m14">
                        <Row>
                            <ButtonRadios qid="inAreas" values={['0', '1', '2', '3', '4', '5', '6', '7', '8']} />
                            <ButtonRadios qid="onPole" values={['0', '1', '2', '3', '4']} />
                            {methods.errors.m14?.onPole && 'celkovy pocet jednotiek musi byt mensi alebo rovny 8'}
                        </Row>
                    </ScorerPanel>
                    <ScorerPanel mid="m15">
                        <Row>
                            <ButtonRadios qid="count" values={['0', '1', '2', '3', '4', '5', '6']} />
                        </Row>
                    </ScorerPanel>
                </Accordion>

                <Card bg={'light'}>
                    <Card.Header className={'fll_blue_bg'}>
                        <Row>
                            <Col>{t(txt.Scorer.totalScore)}</Col>
                            <Col xs={5} sm={3} lg={2}>
                                <Button variant="danger" size="lg" block>
                                    {totalScore}
                                </Button>
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <Button type="submit">Submit</Button>
                    </Card.Body>
                </Card>
            </Form>
        </Scorer>
    );
}
