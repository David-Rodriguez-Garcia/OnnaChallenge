import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import styles from './_styles/AccessControl.module.css'; // Import the styles
import { format } from 'date-fns';
import { useLockContext } from '../_context/LockContext'; // Adjust the path according to your project structure
import { getLockPasswords } from '../../core/infrastructure/getLockPasswords';
import { createPassword } from '../../core/infrastructure/createPassword';

interface Code {
    id: number;
    value: string;
    startDate: Date;
    endDate: Date;
}

const AccessControlView: React.FC = () => {
    const { lockDetails } = useLockContext(); // Use the selected lock details
    const [codes, setCodes] = useState<Code[]>([]);
    const [newCode, setNewCode] = useState<string>('');
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [error, setError] = useState('');

    const navigate = useNavigate();

    if (!lockDetails || !lockDetails.lockId) {
        return <a href='/'>Please select a lock first.</a>;
    }
    const lockId = lockDetails.lockId

    useEffect(() => {
        getLockPasswords(lockId)
            .then(setCodes)
            .catch(error => setError(error.message));
    }, []);

    const addCode = async () => {
        await createPassword(lockId, startDate.toISOString(), endDate.toISOString())

        getLockPasswords(lockId)
            .then(setCodes)
            .catch(error => setError(error.message));
        setNewCode(''); // Reset input field
        setStartDate(new Date()); // Reset start date to today
        setEndDate(new Date()); // Reset end date to today
    };

    const deleteCode = (id: number) => {
        setCodes(codes.filter(code => code.id !== id));
    };

    const goBack = () => {
        navigate(-1); // Navigate back to the previous page
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Code Management for {lockDetails.lockAlias || 'Selected Lock'}</h1>
            <input
                type="text"
                className={styles.inputField}
                value={newCode}
                onChange={(e) => setNewCode(e.target.value)}
                placeholder="Enter new code"
            />
            <div>
                <label>Start Date: </label>
                <DatePicker
                    className={styles.datePicker}
                    selected={startDate}
                    onChange={(date: Date) => setStartDate(date)}
                />
            </div>
            <div>
                <label>End Date: </label>
                <DatePicker
                    className={styles.datePicker}
                    selected={endDate}
                    onChange={(date: Date) => setEndDate(date)}
                />
            </div>
            <button className={styles.button} onClick={addCode}>Add Code</button>
            <ul>
                {codes.map(code => (
                    <li key={code.id} className={styles.listItem}>
                        <span className={styles.userDetails}>
                            {code.value} ({format(code.startDate, 'MM/dd/yyyy')} - {format(code.endDate, 'MM/dd/yyyy')})
                        </span>
                        <button className={styles.button} onClick={() => deleteCode(code.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <button className={styles.button} onClick={goBack}>Go Back</button>
        </div>
    );
};

export default AccessControlView;
