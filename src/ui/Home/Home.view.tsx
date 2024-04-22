import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLockContext } from '../_context/LockContext'; // Adjust the path according to your project structure
import styles from './_styles/Home.module.css';
import { getBatteryLevel } from '../../core/infrastructure/getBatteryLevel';

const HomeView: React.FC = () => {
    const { lockId } = useLockContext(); // Use the lockId from context
    const [batteryLevel, setBatteryLevel] = useState<number>(100); // Initial battery level
    const navigate = useNavigate();

    const handleOpenDoor = () => {
        alert('Door opened!');
        // Here you would have the actual function to open the door.
    };

    const checkBattery = async () => {
        if (lockId === null) {
            alert('No lock selected.');
            return;
        }

        try {
            const response = await getBatteryLevel(lockId);
            const { electricQuantity } = response.data;
            setBatteryLevel(electricQuantity);
            alert(`Battery level is ${electricQuantity}%`);
        } catch (error) {
            console.error('Failed to fetch battery level:', error);
            alert('Failed to check battery level');
        }
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
