import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import styles from './_styles/AccessControl.module.css';
import { format } from 'date-fns';
import { useLockContext } from '../_context/LockContext';
import { getLockPasswords } from '../../core/infrastructure/getLockPasswords';
import { createPassword } from '../../core/infrastructure/createPassword';
import { deletePassword } from '../../core/infrastructure/deletePassword';

interface Code {
    id: number;
    value: string;
    startDate: Date;
    endDate: Date;
}

const AccessControlView: React.FC = () => {
    const { lockDetails } = useLockContext();
    const [codes, setCodes] = useState<Code[]>([]);
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());

    const navigate = useNavigate();

    if (!lockDetails || !lockDetails.lockId) {
        return <a href='/'>Please select a lock first.</a>;
    }
    const lockId = lockDetails.lockId

    useEffect(() => {
        getLockPasswords(lockId)
            .then(setCodes)
            .catch(error => console.log(error.message));
    }, []);

    const addCode = async () => {
        const { keyboardPwd, keyboardPwdId } = await createPassword(lockId, startDate.toISOString(), endDate.toISOString())

        setCodes([...codes, { id: keyboardPwdId, value: keyboardPwd, startDate, endDate }])

        getLockPasswords(lockId)
            .then(setCodes)
            .catch(error => console.log(error.message));
        setStartDate(new Date()); // Reset start date to today
        setEndDate(new Date()); // Reset end date to today
    };

    const deleteCode = async (passwordId: number) => {
        await deletePassword(lockId, passwordId)
        setCodes(codes.filter(code => code.id !== passwordId));
    };

    const goBack = () => {
        navigate(-1);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>

                <img src="https://www.onnahome.com/wp-content/uploads/2022/02/lOGO_AZUL.png" alt="Onna Home Logo" className={styles.logoImage} />
                <h1 className={styles.title}>Code Management for {lockDetails.lockAlias || 'Selected Lock'}</h1>
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
            </div>

            <div className={styles.listContainer}>
                <ul className={styles.list}>
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
        </div>
    );
};

export default AccessControlView;
