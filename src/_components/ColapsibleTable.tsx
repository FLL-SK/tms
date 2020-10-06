import React from 'react';
import Col from 'react-bootstrap/Col';

export function Value(props: { label: string; labelBrk?: string; value?: string; format?: (value: any) => string }) {
    const { label, value, labelBrk, format } = props;
    let spBrk = '';
    if (labelBrk) spBrk = 'd-' + labelBrk + '-none';
    return (
        <Col style={{ textAlign: 'center' }}>
            <span className={spBrk} style={{ display: 'contents' }}>
                {label}
                <br />
            </span>
            <span className={format && format(value)}>{value || '-'}</span>
        </Col>
    );
}
export function Label(props: { label: string; brk?: string; align?: AlignSetting }) {
    const { label, brk, align } = props;
    let spBrk = '';
    if (brk) spBrk = 'd-none d-' + brk + '-block';
    return (
        <Col style={{ textAlign: align }}>
            <label className={spBrk}>{label}</label>
        </Col>
    );
}
