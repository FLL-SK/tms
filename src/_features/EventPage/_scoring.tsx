import React from 'react';
import { Col, Form, Row, Spinner } from 'react-bootstrap';

function ScoringItem(props: { label: string; value?: string }) {
    const { label, value } = props;
    return (
        <Col>
            <Form.Label className={'d-md-none'}>{label}</Form.Label>
            <Form.Text>{value || '-'}</Form.Text>
        </Col>
    );
}
function ScoringHeading(props: { label: string }) {
    const { label } = props;
    return (
        <Col>
            <Form.Label className={'d-none d-md-block'}>{label}</Form.Label>
        </Col>
    );
}

export function ScoringTable(props: { loading: boolean; scores: any[]; teams: any[] }) {
    const { scores, teams, loading } = props;
    if (!teams) return null;
    let ranking = teams.reduce(
        (a: any[], t: any) => [...a, { ...t, ...scores.find((s) => t._id === s.eventTeamId) }],
        [],
    );
    console.log('Ranking Table=', ranking);
    return (
        <>
            {loading && <Spinner animation="grow" size="sm" />}{' '}
            {!loading && (
                <>
                    <Row>
                        <Col md>
                            <ScoringHeading label={'Teams'} />
                        </Col>
                        <Col md>
                            <Row>
                                <ScoringHeading label={'V'} />
                                <ScoringHeading label={'P'} />
                                <ScoringHeading label={'D'} />
                                <ScoringHeading label={'G'} />
                            </Row>
                        </Col>
                        <Col md>
                            <Row>
                                <ScoringHeading label={'R1'} />
                                <ScoringHeading label={'R2'} />
                                <ScoringHeading label={'R3'} />
                                <ScoringHeading label={'QF'} />
                                <ScoringHeading label={'SF'} />
                                <ScoringHeading label={'FIN'} />
                            </Row>
                        </Col>
                    </Row>
                    {ranking.map((r, idx) => (
                        <Row key={idx}>
                            <Col md>{r.name}</Col>
                            <Col md>
                                <Row>
                                    <ScoringItem label={'Values'} value={r.coreValues} />
                                    <ScoringItem label={'Project'} value={r.project} />
                                    <ScoringItem label={'Design'} value={r.design} />
                                    <ScoringItem label={'Game'} value={r.game} />
                                </Row>
                            </Col>
                            <Col md>
                                <Row>
                                    <ScoringItem label={'R1'} value={r.game1} />
                                    <ScoringItem label={'R2'} value={r.game2} />
                                    <ScoringItem label={'R3'} value={r.game3} />
                                    <ScoringItem label={'QF'} value={r.gameQ} />
                                    <ScoringItem label={'SF'} value={r.gameS} />
                                    <ScoringItem label={'FIN'} value={r.gameF} />
                                </Row>
                            </Col>
                        </Row>
                    ))}
                </>
            )}
        </>
    );
}
