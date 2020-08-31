import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Row, Col } from "react-bootstrap";

import { RGScp2020 } from "./RGScp2020";

function RGScorerPage() {
    const scorer = useSelector((state) => state.rgScorer);
    const handleSubmit = (details) => {
        console.log("submit details", details);
    };

    console.log(scorer);

    switch (scorer.programId) {
        case "FLL2020":
            return <RGScp2020 team={scorer.team} onSubmit={handleSubmit} />;
        default:
            return null;
    }
}

export { RGScorerPage };
