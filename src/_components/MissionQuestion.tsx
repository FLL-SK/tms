import React, { useContext } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, FormCheck, FormLabel, FormGroup } from 'react-bootstrap';
import { useFormContext } from 'react-hook-form';
import _ from 'lodash';

import { MissionPanelContext } from './MissionPanel';

export const MissionQuestion = {
    Checkbox,
    Radios,
};

interface MQCheckboxProps {
    qid: string;
    inline?: boolean;
}

function Checkbox(props: MQCheckboxProps) {
    const { t } = useTranslation();
    const { qid, ...rest } = props;
    const { mid, tns, onChange } = useContext(MissionPanelContext);
    const { register } = useFormContext();
    const fqid = mid + '.' + qid;

    return (
        <Form.Row>
            <FormCheck type="checkbox" ref={register} name={fqid} id={fqid} onChange={onChange} {...rest} />
            <FormLabel htmlFor={fqid}>{t(tns + ':' + fqid)}</FormLabel>
        </Form.Row>
    );
}

interface MQRadiosProps {
    qid: string;
    radios: string[];
    inline?: boolean;
}

function Radios(props: MQRadiosProps) {
    const { t } = useTranslation();
    const { qid, radios, ...rest } = props;
    const { mid, tns, onChange } = useContext(MissionPanelContext);
    const { register } = useFormContext();
    const fqid = mid + '.' + qid;

    return (
        <>
            <Form.Label>{t(tns + ':' + fqid + '._radios')}</Form.Label>

            {radios.map((rid) => (
                <Form.Row key={rid}>
                    <Form.Check
                        type="radio"
                        id={fqid + rid}
                        key={rid}
                        name={fqid}
                        value={rid}
                        ref={register}
                        onChange={onChange}
                        {...rest}
                    />
                    <Form.Label htmlFor={fqid + rid}> {t(tns + ':' + fqid + '.' + rid)}</Form.Label>
                </Form.Row>
            ))}
        </>
    );
}
