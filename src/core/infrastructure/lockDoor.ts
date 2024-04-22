import axios from "axios";
import { clientId, accessToken } from "./data";
import { isLockLocked } from "./isLockLocked";

export const lockDoor = async (lockId: number) => {
    try {
        if (await isLockLocked(lockId)) {
            return ({ success: true, message: 'Lock was already locked.' });
        } else {
            const response = await axios.put('https://api.rentandpass.com/api/lock/lock', {
                clientId,
                'access_token': accessToken,
                token: accessToken,
                ID: lockId
            }
            );

            if (response.data && response.status === 200) {
                return ({ success: true, message: 'Lock has been successfully locked.' });
            } else {
                return ({ success: false, message: 'Failed to lock the lock.' });
            }
        }
    } catch (error) {
        return ({ success: false, message: 'Server error during the lock process.' });
    }
}