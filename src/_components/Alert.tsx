import React from 'React';
import Alert from 'react-bootstrap/Alert';

export function AlertDisplay(type: any, message?: string) {
    return (
        <Alert variant={type} show={message != null}>
            {message}
        </Alert>
    );
}
