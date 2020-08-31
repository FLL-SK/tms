import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    Button,
    Form,
    Row,
    Col,
    Card,
    Accordion,
    useAccordionToggle,
} from "react-bootstrap";

import MissionScorerToggle from "../../_components/MissionScorerToggle";

function RGScp2020({ team, onSubmit }) {
    return (
        <Accordion defaultActiveKey="0">
            <Card>
                <MissionScorerToggle eventKey="0">
                    Click me!
                </MissionScorerToggle>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>Hello! I'm the body</Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <MissionScorerToggle eventKey="1">
                    Click me!
                </MissionScorerToggle>
                <Accordion.Collapse eventKey="1">
                    <Card.Body>Hello! I'm another body</Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}

export { RGScp2020 };
