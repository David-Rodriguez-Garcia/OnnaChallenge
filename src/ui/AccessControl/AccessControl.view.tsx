import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import styles from './_styles/AccessControl.module.css'; // Import the styles
import { format } from 'date-fns';

interface User {
    id: number;
    name: string;
    startDate: Date;
    endDate: Date;
}

const AccessControlView: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [newUserName, setNewUserName] = useState<string>('');
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
    const navigate = useNavigate();

    const addUser = () => {
        const newUser: User = {
            id: users.length + 1,
            name: newUserName,
            startDate: startDate,
            endDate: endDate
        };
        setUsers([...users, newUser]);
        setNewUserName('');
        setStartDate(new Date());
        setEndDate(new Date());
    };

    const deleteUser = (id: number) => {
        setUsers(users.filter(user => user.id !== id));
    };

    const goBack = () => {
        navigate(-1);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>User Management</h1>
            <input
                type="text"
                className={styles.inputField}
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                placeholder="Enter user name"
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
            <button className={styles.button} onClick={addUser}>Add User</button>
            <ul>
                {users.map(user => (
                    <li key={user.id} className={styles.listItem}>
                        <span className={styles.userDetails}>
                            {user.name} ({format(user.startDate, 'MM/dd/yyyy')} - {format(user.endDate, 'MM/dd/yyyy')})
                        </span>
                        <button className={styles.button} onClick={() => deleteUser(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <button className={styles.button} onClick={goBack}>Go Back</button>
        </div>
    );
};

export default AccessControlView;
