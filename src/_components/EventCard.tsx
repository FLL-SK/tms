import React from 'react';

import Card from 'react-bootstrap/Card';

import { dateFns } from '../_locales/date-fns';

export default function EventCard({ name, date, id, ...props }) {
    return (
        <Card
            className="fll-bg-secondary"
            style={{ width: '25rem', height: '8rem', marginRight: '1rem', marginBottom: '1rem', padding: '1rem' }}
            {...props}
        >
            <Card.Title>{name}</Card.Title>
            <div>
                <span>
                    Date: <span>{date ? dateFns.format(date, 'PP') : 'not defined'}</span>
                </span>
            </div>
            <Card.Link className="stretched-link" href={'/event/' + id}>
                Open
            </Card.Link>
        </Card>
    );
}
