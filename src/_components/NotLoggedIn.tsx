import React from 'react';
import { useTranslation } from 'react-i18next';
import { txt } from '../_locales';
import { Button } from 'react-bootstrap';

export function NotLoggedIn() {
    const { t } = useTranslation();
    console.log('Not Logged In');
    return (
        <>
            <h1>{t(txt.NotLoggedIn.title)}</h1>
            <br />
            <Button href="/login">{t(txt.NotLoggedIn.login)}</Button>
        </>
    );
}
