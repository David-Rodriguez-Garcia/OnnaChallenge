import React from 'react';
import { useNavigate } from 'react-router-dom';

const AccessControlView: React.FC = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    return (
        <div>
            <h1>User Management</h1>
            <p>Here you can add new users to the system.</p>
            <button onClick={goBack}>Go Back</button>
        </div>
    );
};

export default AccessControlView;
