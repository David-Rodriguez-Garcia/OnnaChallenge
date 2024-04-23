import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLocksList } from "./../../core/infrastructure/getLocksList.js"
import { useLockContext } from '../_context/LockContext'; // Ensure path correctness
import styles from './_styles/LockList.module.css'; // Ensure path correctness

interface Lock {
    lockId: number;
    date: number;
    specialValue: number;
    electricQuantity: number;
    lockAlias: string;
    lockData: string;
    hasGateway: number;
    wirelessKeypadFeatureValue: number;
    lockMac: string;
    lockName: string;
    timezoneRawOffset: number;
}

export const LockListView: React.FC = () => {
    const [locks, setLocks] = useState<Lock[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { setLockDetails } = useLockContext(); // Now using setLockDetails to set more than just the ID
    const navigate = useNavigate(); // useNavigate for navigation

    useEffect(() => {
        const fetchLocks = async () => {
            try {
                const response = await getLocksList();
                setLocks(response);
                setIsLoading(false);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                    setIsLoading(false);
                }
            }
        };

        fetchLocks();
    }, []);

    const handleLockClick = (lock: Lock) => {
        // Now setting all details in the context
        setLockDetails({
            lockId: lock.lockId,
            lockAlias: lock.lockAlias,
            lockName: lock.lockName
        });
        navigate('/home'); // Navigate to HomeScreen
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className={styles.container}>
            <img src="https://www.onnahome.com/wp-content/uploads/2022/02/lOGO_AZUL.png" alt="Onna Home Logo" className={styles.logoImage} />
            <h1 className={styles.title}>Locks List</h1>
            {locks.map(lock => (
                <button key={lock.lockId} className={styles.lockButton} onClick={() => handleLockClick(lock)}>
                    <h2>{lock.lockAlias}</h2>
                    <div className={styles.lockDetails}>
                        <p>Electric Quantity: {lock.electricQuantity}%</p>
                    </div>
                </button>
            ))}
        </div>
    );
};
