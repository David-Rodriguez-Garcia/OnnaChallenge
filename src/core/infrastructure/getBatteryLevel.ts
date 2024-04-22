import axios from "axios";
import { clientId, accessToken } from "./data";

export const getBatteryLevel = async (lockId: number) => {
    const url = 'https://api.rentandpass.com/api/lock/queryElectricQuantity';
    const params = {
        clientId, // Replace with your actual client ID
        token: accessToken,       // Replace with your actual token
        access_token: accessToken, // Replace with your actual access token
        ID: lockId                 // Use the lockId from context
    };

    return axios.get(url, { params });
};