import React from 'react';

import Card from 'react-bootstrap/Card';

export default function EventCard({ name, date, id, ...props }) {
    return (
        <Card
            className="fll-bg-secondary"
            style={{ width: '25rem', height: '8rem', marginRight: '1rem', marginBottom: '1rem', padding: '1rem' }}
            {...props}
        >
            <Card.Title>{name}</Card.Title>
            <label>
                Date <input readOnly defaultValue={date} />{' '}
            </label>
            <Card.Link className="stretched-link" href={'/event/' + id}>
                Open
            </Card.Link>
        </Card>
    );
}
