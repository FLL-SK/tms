import React from 'react';
import { Accordion, Card } from 'react-bootstrap';

interface MissionHeaderProps {
    children?: React.ReactChild | React.ReactChildren;
    eventKey: string;
    completed?: boolean;
    score?: number;
}

export function MissionHeader(props: MissionHeaderProps) {
    const { eventKey, children, completed, score } = props;
    return (
        <Accordion.Toggle as={Card.Header} eventKey={eventKey}>
            {children}
        </Accordion.Toggle>
    );
}
