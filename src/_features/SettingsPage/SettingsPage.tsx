import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Row, Col } from 'react-bootstrap';

import { useForm, SubmitHandler } from 'react-hook-form';

import { useTranslation } from 'react-i18next';
import { txt } from '../../_locales';

import { appActions } from '../../_actions';

import { RootState } from '../../_reducers';

type Inputs = {
    apiUrl: string;
    language: string;
};

function SettingsPage() {
    const { register, handleSubmit, watch, errors } = useForm<Inputs>();
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        dispatch(appActions.changeLanguage(data.language));
        console.log('Settings saved', data);
    };

    return (
        <Row>
            <Col md={{ span: 8, offset: 2 }} sm>
                <h2>{t(txt.SettingsPage.title)}</h2>
                <Form name="loginForm" onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group>
                        <Form.Label>{t(txt.SettingsPage.apiUrl)}</Form.Label>
                        <Form.Control type="text" name="apiUrl" defaultValue="" ref={register({ required: true })} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>{t(txt.SettingsPage.language)}</Form.Label>
                        <Form.Control as="select" name="language" ref={register({ required: true })}>
                            <option value="sk">Slovensky</option>
                            <option value="en">English</option>
                        </Form.Control>
                    </Form.Group>
                    <Row>
                        <Form.Group>
                            <Button variant="secondary" type="submit">
                                {t(txt.SettingsPage.btnSave)}
                            </Button>
                        </Form.Group>
                    </Row>
                </Form>
            </Col>
        </Row>
    );
}

export { SettingsPage };
