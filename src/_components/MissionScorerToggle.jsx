import React from "react";
import { Accordion, Card } from "react-bootstrap";

export default function MissionScorerToggle({
    children,
    eventKey,
    completed,
    score,
}) {
    return (
        <Accordion.Toggle as={Card.Header} eventKey={eventKey}>
            {children}
        </Accordion.Toggle>
    );
}
