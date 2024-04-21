import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './_styles/Home.module.css';

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
        <div className={styles.container}>
            <h1 className={styles.title}>Onna Living</h1>
            <button className={styles.button} onClick={handleOpenDoor}>Open Door</button>
            <button className={styles.button} onClick={checkBattery}>Check Battery</button>
            <button className={styles.button} onClick={navigateToUserManagement}>Add Users</button>
        </div>
    );
};

export default HomeView;
