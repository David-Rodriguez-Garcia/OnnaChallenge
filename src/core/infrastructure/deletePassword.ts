import axios from 'axios';
import { clientId, accessToken } from "./data";

export const deletePassword = async (lockId: number, passwordId: number): Promise<string> => {
    const url = 'https://api.rentandpass.com/api/password';

    try {
        const params = {
            clientId,
            token: accessToken,
            access_token: accessToken,
            ID: lockId,
            passID: passwordId,
            type: 2  // Type of operation for deletion is always 2
        };

        const response = await axios.delete(url, { params });

        if (response.status === 200) {
            return 'Password successfully deleted';
        } else {
            throw new Error('API responded with an error during deletion');
        }
    } catch (error) {
        console.error('Error deleting password:', error);
        throw new Error('Failed to delete password due to an API error');
    }
};
