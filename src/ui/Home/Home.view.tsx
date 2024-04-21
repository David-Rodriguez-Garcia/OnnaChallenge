import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomeView: React.FC = () => {
    const [batteryLevel, setBatteryLevel] = useState<number>(100); // Mock battery level
    const navigate = useNavigate();

    const handleOpenDoor = () => {
        alert('Door opened!');
        // Here you would have the actual function to open the door.
    };

    const checkBattery = () => {
        alert(`Battery level is ${batteryLevel}%`);
        // This function might fetch real-time data in a real scenario.
    };

    const navigateToUserManagement = () => {
        navigate('/add-users');
    };

    return (
        <div>
            <h1>Home Screen</h1>
            <button onClick={handleOpenDoor}>Open Door</button>
            <button onClick={checkBattery}>Check Battery</button>
            <button onClick={navigateToUserManagement}>Add Users</button>
        </div>
    );
};

export default HomeView;
