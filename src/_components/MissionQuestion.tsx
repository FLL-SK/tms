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
    const { mid, onChange, tns } = useContext(MissionPanelContext);
    const { register } = useFormContext();
    const fqid = mid + '.' + qid;

    return (
        <FormGroup>
            <FormLabel>
                <FormCheck type="checkbox" ref={register} name={fqid} onChange={onChange} {...rest} />
                {t(tns + ':' + fqid)}
            </FormLabel>
        </FormGroup>
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
    const { mid, onChange, tns } = useContext(MissionPanelContext);
    const { register } = useFormContext();
    const fqid = mid + '.' + qid;

    return (
        <Form.Group controlId={fqid}>
            <Form.Label>{t(tns + ':' + fqid + '._radios')}</Form.Label>
            {radios.map((rid) => (
                <Form.Check
                    label={t(tns + ':' + fqid + '.' + rid)}
                    type="radio"
                    name={fqid}
                    key={rid}
                    value={rid}
                    ref={register}
                    onChange={onChange}
                    {...rest}
                />
            ))}
        </Form.Group>
    );
}
