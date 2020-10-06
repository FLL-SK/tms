import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function ProfileCard({ profile }) {
    return (
        <Card
            style={{
                width: '10rem',
                height: '7rem',
                marginRight: '1rem',
                marginBottom: '1rem',
                backgroundColor: 'lightgreen',
            }}
        >
            <Card.Body>
                <Card.Title>
                    <h5>{profile.fullName}</h5>
                </Card.Title>
                <Card.Link className="stretched-link" href={'/profile/' + profile._id}>
                    Profile
                </Card.Link>
            </Card.Body>
        </Card>
    );
}
