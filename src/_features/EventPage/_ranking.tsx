import React from 'react';
import { Col, Form, Row, Spinner } from 'react-bootstrap';

function RankingItem(props: { label: string; value?: string }) {
    const { label, value } = props;
    return (
        <Col>
            <Form.Label className={'d-md-none'}>{label}</Form.Label>
            <Form.Text>{value || '-'}</Form.Text>
        </Col>
    );
}
function RankingHeading(props: { label: string }) {
    const { label } = props;
    return (
        <Col>
            <Form.Label className={'d-none d-md-block'}>{label}</Form.Label>
        </Col>
    );
}

export function RankingTable(props: { loading: boolean; scores: any[]; teams: any[] }) {
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
                            <RankingHeading label={'Teams'} />
                        </Col>
                        <Col md>
                            <Row>
                                <RankingHeading label={'V'} />
                                <RankingHeading label={'P'} />
                                <RankingHeading label={'D'} />
                                <RankingHeading label={'G'} />
                            </Row>
                        </Col>
                        <Col md>
                            <Row>
                                <RankingHeading label={'R1'} />
                                <RankingHeading label={'R2'} />
                                <RankingHeading label={'R3'} />
                                <RankingHeading label={'QF'} />
                                <RankingHeading label={'SF'} />
                                <RankingHeading label={'FIN'} />
                            </Row>
                        </Col>
                    </Row>
                    {ranking.map((r, idx) => (
                        <Row key={idx}>
                            <Col md>{r.name}</Col>
                            <Col md>
                                <Row>
                                    <RankingItem label={'Values'} value={r.coreValues} />
                                    <RankingItem label={'Project'} value={r.project} />
                                    <RankingItem label={'Design'} value={r.design} />
                                    <RankingItem label={'Game'} value={r.game} />
                                </Row>
                            </Col>
                            <Col md>
                                <Row>
                                    <RankingItem label={'R1'} value={r.game1} />
                                    <RankingItem label={'R2'} value={r.game2} />
                                    <RankingItem label={'R3'} value={r.game3} />
                                    <RankingItem label={'QF'} value={r.gameQ} />
                                    <RankingItem label={'SF'} value={r.gameS} />
                                    <RankingItem label={'FIN'} value={r.gameF} />
                                </Row>
                            </Col>
                        </Row>
                    ))}
                </>
            )}
        </>
    );
}
