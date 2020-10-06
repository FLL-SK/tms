import React from 'react';
import i18next from 'i18next';

import { Button, Form, Row, Col } from 'react-bootstrap';

import { useForm, SubmitHandler } from 'react-hook-form';

import { useTranslation } from 'react-i18next';
import { txt } from '../../_locales';

import { AppSettings } from '../../_helpers/appSettings';

type Inputs = {
    apiUrl: string;
    language: string;
};

const lang = AppSettings.loadLanguage();

export function SettingsPage() {
    const { register, handleSubmit, watch, errors } = useForm<Inputs>();
    const { t } = useTranslation();

    console.log('Settings page');

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        AppSettings.changeLanguage(data.language);
        console.log('Settings saved', data);
    };

    return (
        <Row>
            <Col md={{ span: 8, offset: 2 }} sm>
                <Form name="loginForm" onSubmit={handleSubmit(onSubmit)}>
                    <h2>{t(txt.SettingsPage.title)}</h2>
                    <Form.Group>
                        <Form.Label>{t(txt.SettingsPage.language)}</Form.Label>
                        <Form.Control
                            as="select"
                            name="language"
                            defaultValue={lang}
                            ref={register({ required: true })}
                        >
                            <option value="sk">Slovensky</option>
                            <option value="en">English</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Button variant="secondary" type="submit">
                            {t(txt.SettingsPage.btnSave)}
                        </Button>
                    </Form.Group>
                </Form>
            </Col>
        </Row>
    );
}
