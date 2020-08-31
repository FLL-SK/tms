import React from 'react';
import { Accordion, Card } from 'react-bootstrap';

interface MissionScorerToggleProps {
    children?: React.ReactChild | React.ReactChildren;
    eventKey: string;
    completed?: boolean;
    score?: number;
}

export default function MissionScorerToggle(props: MissionScorerToggleProps) {
    const { eventKey, children, completed, score } = props;
    return (
        <Accordion.Toggle as={Card.Header} eventKey={eventKey}>
            {children}
        </Accordion.Toggle>
    );
}
