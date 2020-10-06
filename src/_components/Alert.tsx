import React from 'react';
import Alert from 'react-bootstrap/Alert';

export default function AlertDisplay(type: any, message: string | null) {
    return (
        <Alert variant={type} show={message != null}>
            {message}
        </Alert>
    );
}
