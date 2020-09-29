import React from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import { findMaxIndex } from '../../_helpers/findmax';

function ScoringItem(props: { label: string; value?: string; top?: boolean }) {
    const { label, value, top } = props;
    return (
        <Col style={{ textAlign: 'center' }}>
            <span className={'d-md-none'} style={{ display: 'contents' }}>
                {label}
                <br />
            </span>
            <span className={top ? 'fll-top-score' : ''}>{value || '-'}</span>
        </Col>
    );
}
function ScoringHeading(props: { label: string; align?: AlignSetting }) {
    const { label, align } = props;
    return (
        <Col style={{ textAlign: align }}>
            <label className={'d-none d-md-block'}>{label}</label>
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

    const topG = findMaxIndex(ranking, 'game');
    const topV = findMaxIndex(ranking, 'coreValues');
    const topP = findMaxIndex(ranking, 'project');
    const topD = findMaxIndex(ranking, 'design');

    return (
        <>
            {loading && <Spinner animation="grow" size="sm" />}{' '}
            {!loading && (
                <>
                    <h2>All categories</h2>
                    <Row>
                        <Col md>
                            <ScoringHeading label={'Teams'} align="left" />
                        </Col>
                        <Col md>
                            <Row>
                                <ScoringHeading label={'V'} align="center" />
                                <ScoringHeading label={'P'} align="center" />
                                <ScoringHeading label={'D'} align="center" />
                                <ScoringHeading label={'G'} align="center" />
                            </Row>
                        </Col>
                    </Row>
                    {ranking.map((r, idx) => (
                        <Row
                            key={idx}
                            className={idx % 2 ? '' : 'fll_scoring_row'}
                            style={{ display: 'flex', alignItems: 'flex-end' }}
                        >
                            <Col md className={'fll_scoring_header-' + (idx % 2 ? 'odd' : 'even')}>
                                {r.name}
                            </Col>
                            <Col md>
                                <Row>
                                    <ScoringItem label={'Values'} value={r.coreValues} top={topV == idx} />
                                    <ScoringItem label={'Project'} value={r.project} top={topP == idx} />
                                    <ScoringItem label={'Design'} value={r.design} top={topD == idx} />
                                    <ScoringItem label={'Game'} value={r.game} top={topG == idx} />
                                </Row>
                            </Col>
                        </Row>
                    ))}
                    <h2>Robot Game</h2>
                    <Row>
                        <Col md>
                            <ScoringHeading label={'Teams'} />
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
                            <Col md className={'fll_scoring_header-' + (idx % 2 ? 'odd' : 'even')}>
                                {r.name}
                            </Col>
                            <Col md className={idx % 2 ? '' : 'fll_scoring_row'}>
                                <Row>
                                    <ScoringItem
                                        label={'R1'}
                                        value={r.game1}
                                        top={r.game1 == Math.max(r.game1 || 0, r.game2 || 0, r.game3 || 0)}
                                    />
                                    <ScoringItem
                                        label={'R2'}
                                        value={r.game2}
                                        top={r.game2 == Math.max(r.game1 || 0, r.game2 || 0, r.game3 || 0)}
                                    />
                                    <ScoringItem
                                        label={'R3'}
                                        value={r.game3}
                                        top={r.game3 == Math.max(r.game1 || 0, r.game2 || 0, r.game3 || 0)}
                                    />
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
