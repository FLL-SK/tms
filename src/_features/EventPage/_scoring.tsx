import React from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import { findMaxIndex } from '../../_helpers/findmax';

import * as CTable from '../../_components/ColapsibleTable';

export function ScoringTable(props: { loading: boolean; scores: any[]; teams: any[] }) {
    const { scores, teams, loading } = props;
    if (!teams) return null;
    let tscores = teams.reduce(
        (a: any[], t: any) => [...a, { ...t, ...scores.find((s) => t._id === s.eventTeamId) }],
        [],
    );

    const topG = findMaxIndex(tscores, 'game');
    const topV = findMaxIndex(tscores, 'coreValues');
    const topP = findMaxIndex(tscores, 'project');
    const topD = findMaxIndex(tscores, 'design');

    return (
        <>
            {loading && <Spinner animation="grow" size="sm" />}{' '}
            {!loading && (
                <>
                    <h3>All categories</h3>
                    <Row style={{ paddingTop: '1rem', paddingBottom: '1rem', backgroundColor: 'lightblue' }}>
                        <Col md>
                            <CTable.Label label={'Teams'} brk="md" align="left" />
                        </Col>
                        <Col md>
                            <Row>
                                <CTable.Label label={'V'} brk="md" align="center" />
                                <CTable.Label label={'P'} brk="md" align="center" />
                                <CTable.Label label={'D'} brk="md" align="center" />
                                <CTable.Label label={'G'} brk="md" align="center" />
                            </Row>
                        </Col>
                    </Row>
                    {tscores.map((r, idx) => (
                        <Row
                            key={idx}
                            className={idx % 2 ? '' : 'fll_scoring_row'}
                            style={{
                                display: 'flex',
                                alignItems: 'flex-end',
                                paddingTop: '1rem',
                                paddingBottom: '1rem',
                            }}
                        >
                            <Col md className={'fll_scoring_header-' + (idx % 2 ? 'odd' : 'even')}>
                                {r.name}
                            </Col>
                            <Col md>
                                <Row>
                                    <CTable.Value
                                        label={'Values'}
                                        labelBrk="md"
                                        value={r.coreValues}
                                        format={() => (topV == idx ? 'fll_top_score' : '')}
                                    />
                                    <CTable.Value
                                        label={'Project'}
                                        labelBrk="md"
                                        value={r.project}
                                        format={() => (topP == idx ? 'fll_top_score' : '')}
                                    />
                                    <CTable.Value
                                        label={'Design'}
                                        labelBrk="md"
                                        value={r.design}
                                        format={() => (topD == idx ? 'fll_top_score' : '')}
                                    />
                                    <CTable.Value
                                        label={'Game'}
                                        labelBrk="md"
                                        value={r.game}
                                        format={() => (topG == idx ? 'fll_top_score' : '')}
                                    />
                                </Row>
                            </Col>
                        </Row>
                    ))}
                    <h3>Robot Game</h3>
                    <Row style={{ paddingTop: '1rem', paddingBottom: '1rem', backgroundColor: 'lightblue' }}>
                        <Col md>
                            <CTable.Label label={'Teams'} />
                        </Col>
                        <Col md>
                            <Row>
                                <CTable.Label label={'R1'} brk="md" align="center" />
                                <CTable.Label label={'R2'} brk="md" align="center" />
                                <CTable.Label label={'R3'} brk="md" align="center" />
                                <CTable.Label label={'QF'} brk="md" align="center" />
                                <CTable.Label label={'SF'} brk="md" align="center" />
                                <CTable.Label label={'FIN'} brk="md" align="center" />
                            </Row>
                        </Col>
                    </Row>
                    {tscores.map((r, idx) => (
                        <Row
                            key={idx}
                            style={{ paddingTop: '1rem', paddingBottom: '1rem', display: 'flex' }}
                            className={idx % 2 ? '' : 'fll_scoring_row'}
                        >
                            <Col md className={'fll_scoring_header-' + (idx % 2 ? 'odd' : 'even')}>
                                {r.name}
                            </Col>
                            <Col md>
                                <Row>
                                    <CTable.Value
                                        label={'R1'}
                                        labelBrk="md"
                                        value={r.game1}
                                        format={() =>
                                            r.game1 == Math.max(r.game1 || 0, r.game2 || 0, r.game3 || 0)
                                                ? 'fll_top_score'
                                                : ''
                                        }
                                    />
                                    <CTable.Value
                                        label={'R2'}
                                        labelBrk="md"
                                        value={r.game2}
                                        format={() =>
                                            r.game2 == Math.max(r.game1 || 0, r.game2 || 0, r.game3 || 0)
                                                ? 'fll_top_score'
                                                : ''
                                        }
                                    />
                                    <CTable.Value
                                        label={'R3'}
                                        labelBrk="md"
                                        value={r.game3}
                                        format={() =>
                                            r.game3 == Math.max(r.game1 || 0, r.game2 || 0, r.game3 || 0)
                                                ? 'fll_top_score'
                                                : ''
                                        }
                                    />
                                    <CTable.Value label={'QF'} labelBrk="md" value={r.gameQ} />
                                    <CTable.Value label={'SF'} labelBrk="md" value={r.gameS} />
                                    <CTable.Value label={'FIN'} labelBrk="md" value={r.gameF} />
                                </Row>
                            </Col>
                        </Row>
                    ))}
                </>
            )}
        </>
    );
}
