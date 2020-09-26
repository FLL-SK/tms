import React, { createContext, useContext } from 'react';
import { Accordion, Card, Container, Col, Row, Button } from 'react-bootstrap';

import { useTranslation } from 'react-i18next';
import { txt } from '../_locales';

import _ from 'lodash';
import { ScorerContext } from './ScorerProvider';
import { useFormContext } from 'react-hook-form';

interface ScorerPanelContextType {
    /** mission identifier */
    mid: string;
}

interface ScorerPanelProps extends ScorerPanelContextType {
    children?: React.ReactNode;
}

export const ScorerPanelContext = createContext<Partial<ScorerPanelContextType>>({});

export function ScorerPanel(props: ScorerPanelProps) {
    const { t } = useTranslation();
    const { children, mid } = props;
    const { tns } = useContext(ScorerContext);
    const formMethods = useFormContext();

    const answered = formMethods.formState.dirtyFields[mid];

    formMethods.register({ name: mid + '.score', type: 'custom' });
    const score = formMethods.watch(mid + '.score');

    return (
        <>
            <Card bg={answered ? 'secondary' : 'light'}>
                <Accordion.Toggle as={Card.Header} eventKey={mid}>
                    <Row>
                        <Col>
                            {t(txt.Scorer.mission)} {mid} - {t(tns + ':' + mid + '._title')}
                        </Col>
                        {answered && (
                            <Col xs={5} sm={3} lg={2}>
                                <Button variant="danger" size="lg" block>
                                    {score}
                                </Button>
                            </Col>
                        )}
                    </Row>
                </Accordion.Toggle>
            </Card>
            <ScorerPanelContext.Provider value={{ mid }}>
                <Accordion.Collapse eventKey={mid}>
                    <Card.Body>{children}</Card.Body>
                </Accordion.Collapse>
            </ScorerPanelContext.Provider>
        </>
    );
}
