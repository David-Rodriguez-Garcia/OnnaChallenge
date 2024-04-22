import axios from 'axios'
import { clientId, accessToken } from "./data";

export const isLockLocked = async (ID: number) => {
    try {
        const response = await axios.get('https://api.rentandpass.com/api/lock/openStatus',
            {
                params: {
                    token: accessToken,
                    clientId,
                    access_token: accessToken,
                    ID
                }
            });

        if (response.data && response.status === 200) {
            const state = response.data.state;
            const lockStatus = state === 0 ? true : false;
            return lockStatus
        } else {
            throw new Error('Failed to check the lock status')
        }
    } catch (error) {
        throw new Error('Failed to check the lock status')
    }
};
