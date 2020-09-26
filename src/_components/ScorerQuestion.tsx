import React, { useContext } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, FormCheck, FormLabel, FormGroup, ToggleButton, ToggleButtonProps, Button } from 'react-bootstrap';
import { useFormContext } from 'react-hook-form';
import _ from 'lodash';

import { ScorerPanelContext } from './ScorerPanel';
import { ScorerContext } from './ScorerProvider';

interface RadiosProps {
    qid: string;
    values: string[];
    inline?: boolean;
    variant?: string;
    defaultValue?: string;
}

export function ButtonRadios(props: RadiosProps) {
    const { t } = useTranslation();
    const { qid, values, variant, inline, defaultValue, ...rest } = props;
    const { mid } = useContext(ScorerPanelContext);
    const formMethods = useFormContext();
    const { tns, onChange } = useContext(ScorerContext);
    const fqid = mid + '.' + qid;
    const [value, setValue] = React.useState('');

    formMethods.register({ name: fqid, type: 'custom' }); // create form value

    const changeValue = (v?: string) => {
        if (!v) return;
        setValue(v);
        formMethods.setValue(fqid, v, { shouldDirty: true });
    };

    const onClick = (ev: React.SyntheticEvent) => {
        ev.preventDefault();
        let v = ev.currentTarget.attributes.getNamedItem('value');
        if (v) changeValue(v.value);
        onChange && onChange();
    };

    changeValue(defaultValue);

    let v = variant || 'primary';

    return (
        <Form.Group style={{ marginRight: '2rem', marginBottom: '1rem' }}>
            {t(tns + ':' + fqid + '._title')}
            {inline ? <span>&nbsp;&nbsp;</span> : <br />}
            {values.map((rid) => (
                <Button
                    key={fqid + rid}
                    value={rid}
                    onClick={onClick}
                    variant={(rid == value ? '' : 'outline-') + v}
                    style={{ marginRight: '0.2rem', marginBottom: '0.2rem' }}
                    {...rest}
                >
                    {t(tns + ':' + fqid + '.' + rid)}
                </Button>
            ))}
        </Form.Group>
    );
}
