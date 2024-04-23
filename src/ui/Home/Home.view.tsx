import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLockContext } from '../_context/LockContext'; // Adjust the path according to your project structure
import styles from './_styles/Home.module.css';
import { getBatteryLevel } from '../../core/infrastructure/getBatteryLevel';
import { unlockDoor } from '../../core/infrastructure/unlockDoor';
import { lockDoor } from '../../core/infrastructure/lockDoor';

const HomeView: React.FC = () => {
    const { lockDetails } = useLockContext(); // Destructure to get lockDetails
    const navigate = useNavigate();

    if (!lockDetails || !lockDetails.lockId) {
        return <a href='/'>Navigate to the home page to select a lock</a>;
    }

    const handleUnlockDoor = async () => {
        const response = await unlockDoor(lockDetails.lockId!)
        alert(response.message)
    }
    const handleLockDoor = async () => {
        const response = await lockDoor(lockDetails.lockId!)
        alert(response.message)
    }

    const checkBattery = async () => {
        if (!lockDetails.lockId) {
            alert('No lock selected.');
            return;
        }

        try {
            const response = await getBatteryLevel(lockDetails.lockId);
            const { electricQuantity } = response.data;
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
            <img src="https://www.onnahome.com/wp-content/uploads/2022/02/lOGO_AZUL.png" alt="Onna Home Logo" className={styles.logoImage} />
            <h1 className={styles.title}>{lockDetails.lockAlias || 'None Selected'}</h1>
            <button className={styles.button} onClick={handleUnlockDoor}>Open Door</button>
            <button className={styles.button} onClick={handleLockDoor}>Close Door</button>
            <button className={styles.button} onClick={checkBattery}>Check Battery</button>
            <button className={styles.button} onClick={navigateToUserManagement}>Add Users</button>
        </div>
    );
};

export default HomeView;
