import React from 'react';
import { Card } from 'react-bootstrap';

export default function TeamCard({ name, id }) {
    return (
        <Card
            style={{
                width: '20rem',
                height: '8rem',
                backgroundColor: 'lightgreen',
                marginRight: '1rem',
                marginBottom: '1rem',
                padding: '1rem',
            }}
        >
            <Card.Title>{name}</Card.Title>
            <Card.Link className="stretched-link" href={'/eventteam/' + id}>
                Open
            </Card.Link>
        </Card>
    );
}
