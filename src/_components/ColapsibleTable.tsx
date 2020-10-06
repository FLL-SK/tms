import React from 'react';
import Col from 'react-bootstrap/Col';

export function Value(props: { label: string; value?: string; format?: (value: any) => string }) {
    const { label, value, format } = props;
    return (
        <Col style={{ textAlign: 'center' }}>
            <span className={'d-md-none'} style={{ display: 'contents' }}>
                {label}
                <br />
            </span>
            <span className={format && format(value)}>{value || '-'}</span>
        </Col>
    );
}
export function Label(props: { label: string; align?: AlignSetting }) {
    const { label, align } = props;
    return (
        <Col style={{ textAlign: align }}>
            <label className={'d-none d-md-block'}>{label}</label>
        </Col>
    );
}
