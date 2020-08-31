import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../_actions';

import { RootState } from '../_reducers';

function HomePage() {
    const users = useSelector((state: RootState) => state.users);
    const user = useSelector((state: RootState) => state.authentication.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.getAll());
    }, []);

    function handleDeleteUser(id) {
        dispatch(userActions.delete(id));
    }

    return (
        <div className="col-lg-8 offset-lg-2">
            <h1>Hi {user && user.username}!</h1>
            <p>You're logged in</p>
            <h3>All registered users:</h3>
            {users.loading && <em>Loading users...</em>}
            {users.error && <span className="text-danger">ERROR: {users.error}</span>}
            {users.items && (
                <ul>
                    {users.items.map((user, index) => (
                        <li key={user._id}>
                            {user.username}
                            {user.deleting ? (
                                <em> - Deleting...</em>
                            ) : user.deleteError ? (
                                <span className="text-danger"> - ERROR: {user.deleteError}</span>
                            ) : (
                                <span>
                                    {' '}
                                    -{' '}
                                    <a onClick={() => handleDeleteUser(user._id)} className="text-primary">
                                        Delete
                                    </a>
                                </span>
                            )}
                        </li>
                    ))}
                </ul>
            )}
            <p>
                <Link to="/login">Logout</Link>
            </p>
        </div>
    );
}

export { HomePage };