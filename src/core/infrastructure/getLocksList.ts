import { clientId, accessToken } from "./data";
import axios from 'axios';

export const getLocksList = async () => {
    try {
        const response = await axios.get('https://api.rentandpass.com/api/lock/list', {
            headers: {
                clientId,
                'token': accessToken,
                'access_token': accessToken
            }
        });
        return (response.data.list);
    } catch (error) {
        throw new Error('Failed to fetch locks');
    }
}