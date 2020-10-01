import React, { useState } from 'react';
import { Container, Form, Spinner } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import ProfileCard from '../../_components/ProfileCard';
import { Event } from '../../_types/Event';

interface EventProfileProps {
    loading: boolean;
    event?: Event;
    onStatusChange: (newStatus: number) => any;
    isAdmin: boolean;
    isEventManager: boolean;
}

export function EventProfile(props: EventProfileProps) {
    const { loading, event, onStatusChange, isAdmin, isEventManager } = props;
    const [status, setStatus] = useState(event ? event.status : 0);

    console.log('Event Profile');

    function handleStatusChange(ev) {
        ev.preventDefault();
        setStatus(ev.target.value);
        onStatusChange(ev.target.value);
    }

    return (
        <>
            {loading && <Spinner animation="grow" size="sm" />}{' '}
            {!loading && event && (
                <>
                    <Form>
                        <h3>Event status</h3>
                        <Form.Control
                            as="select"
                            defaultValue={status}
                            disabled={!isAdmin && !isEventManager}
                            onChange={handleStatusChange}
                        >
                            <option value="1">In Progress</option>
                            <option value="0">Not Started</option>
                            <option value="2">Finished</option>
                        </Form.Control>
                    </Form>

                    <h3>Usporiadatelia</h3>
                    <Row>
                        {event.managers.map((i, idx) => (
                            <ProfileCard profile={i} key={i._id} />
                        ))}
                    </Row>

                    <h3>Porotci</h3>
                    <Row>
                        {event.judges.map((i, idx) => (
                            <ProfileCard profile={i} key={i._id} />
                        ))}
                    </Row>

                    <h3>Rozhodcovia</h3>
                    <Row>
                        {event.referees.map((i, idx) => (
                            <ProfileCard profile={i} key={i._id} />
                        ))}
                    </Row>
                </>
            )}
        </>
    );
}
