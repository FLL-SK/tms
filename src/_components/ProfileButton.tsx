import React from 'react';
import Button from 'react-bootstrap/Button';

export function ProfileButton({ profile }) {
    return (
        <Button type="button" href={'/profile/' + profile._id} variant="outline-primary">
            {profile.fullName}
        </Button>
    );
}
