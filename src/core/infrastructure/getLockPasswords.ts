import { clientId, accessToken } from "./data";
import axios from 'axios';

interface LockPassword {
    lockId: number;
    endDate: number;
    keyboardPwdId: number;
    keyboardPwdName: string;
    keyboardPwd: string;
    keyboardPwdType: number;
    startDate: number;
    senderUsername: string;
}

interface PasswordsApiResponse {
    total: number;
    pages: number;
    pageNo: number;
    pageSize: number;
    list: LockPassword[];
}

export const getLockPasswords = async (lockId: number) => {
    try {
        const response = await axios.get<PasswordsApiResponse>('https://api.rentandpass.com/api/lock/passwords', {
            params: {
                clientId,
                token: accessToken,
                access_token: accessToken,
                ID: lockId
            }
        });

        if (response.status === 200) {
            // Extract relevant data from each password entry
            return response.data.list.map(password => ({
                id: password.keyboardPwdId,
                startDate: new Date(password.startDate), // Convert timestamp to Date object
                endDate: new Date(password.endDate),     // Convert timestamp to Date object
                value: password.keyboardPwd        // Password string
            }));
        } else {
            throw new Error('Failed to fetch passwords');
        }
    } catch (error) {
        console.error('Error fetching passwords:', error);
        throw new Error('Failed to fetch passwords due to an API error');
    }
};
