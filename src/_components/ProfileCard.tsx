import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export function ProfileCard({ profile }) {
    return (
        <Card style={{ width: '18rem', margin: '1rem', backgroundColor: 'lightcyan' }}>
            <Card.Body>
                <Card.Title>
                    <h5>{profile.fullName}</h5>
                </Card.Title>
                <Card.Link href={'/profile/' + profile._id}>Profile</Card.Link>
            </Card.Body>
        </Card>
    );
}
