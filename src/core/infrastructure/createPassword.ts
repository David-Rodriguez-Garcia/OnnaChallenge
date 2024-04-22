import { clientId, accessToken } from "./data";
import axios from 'axios';

// Define an interface for the function response to improve type safety and readability
interface PasswordResponse {
    keyboardPwdId: number;
    keyboardPwd: string;
}

export const createPassword = async (lockId: number, startDate: string, endDate: string): Promise<PasswordResponse> => {
    const url = `https://api.rentandpass.com/api/password`;

    try {
        const params = {
            clientId,
            token: accessToken,
            access_token: accessToken,
            ID: lockId,
            type: 3,
            startDate,
            endDate
        };

        const response = await axios.get<PasswordResponse>(url, { params });

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Failed to generate password');
        }
    } catch (error) {
        console.error('Error generating password:', error);
        throw new Error('Failed to generate password due to an API error');
    }
};
