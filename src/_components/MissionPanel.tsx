import React, { createContext } from 'react';
import { Accordion, Card, Container, Col, Row, Button } from 'react-bootstrap';

import { useTranslation } from 'react-i18next';
import { txt } from '../_locales';

import _ from 'lodash';
import { useFormContext } from 'react-hook-form';

interface MissionPanelProps {
    eventKey: string;
    mid: string; // mission id
    children?: React.ReactNode;
    onChange?: (any) => void;
    tns: string; // translation name space
}

interface MissionPanelContextType {
    mid: string; // mission id
    onChange: (any) => void;
    tns: string; // translation namespace
}

export const MissionPanelContext = createContext<Partial<MissionPanelContextType>>({});

export function MissionPanel(props: MissionPanelProps) {
    const { t } = useTranslation('rg2020');
    const { eventKey, children, mid, onChange, tns } = props;
    const methods = useFormContext();

    const answered = methods.formState.dirtyFields[mid];
    const score = methods.getValues(mid + '.score');

    methods.register({ name: mid + '.score', type: 'custom' });

    return (
        <Container>
            <Card bg={answered ? 'secondary' : 'primary'}>
                <Accordion.Toggle as={Card.Header} eventKey={eventKey}>
                    <Row>
                        <Col>
                            {t(txt.Scorer.mission)} {eventKey} - {t(tns + ':' + mid + '._panel')}
                        </Col>
                        {answered && (
                            <Col xs={3} md={2}>
                                <Button variant="danger" size="lg" block>
                                    {score}
                                </Button>
                            </Col>
                        )}
                    </Row>
                </Accordion.Toggle>
            </Card>
            <MissionPanelContext.Provider value={{ mid, onChange, tns }}>
                <Accordion.Collapse eventKey={eventKey}>
                    <Card.Body>{children}</Card.Body>
                </Accordion.Collapse>
            </MissionPanelContext.Provider>
        </Container>
    );
}
