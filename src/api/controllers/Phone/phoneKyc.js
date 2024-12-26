const axios = require('axios');
const { urlList, clientApiKeys } = require('../../../config/constants');

module.exports = {
    prefill: async (body) => {

        const apiUrl = urlList['phone-prefill']; // Replace with the target API endpoint
        const apiKey = clientApiKeys.signzy; // Replace with your API key
        

        const payload = JSON.stringify(body);

        try {
            const response = await axios.post(
                apiUrl,
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'authkey': apiKey,
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error('Error calling API:', error.response?.data || error.message);
            return error.response?.data || error.message
        }
    
        
    },

    prefillVersion2: async(body) => {
        const apiUrl = urlList['phone-prefill-v2']; // Replace with the target API endpoint
        const apiKey = clientApiKeys.signzy; // Replace with your API key
        

        const payload = JSON.stringify(body);

        try {
            const response = await axios.post(
                apiUrl,
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'authkey': apiKey,
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error('Error calling API:', error.response?.data || error.message);
            return error.response?.data || error.message
        }
    },

    validatePan: async(body) => {
        const apiUrl = urlList['equifax-bureau']; // Replace with the target API endpoint
        const apiKey = clientApiKeys.signzy; // Replace with your API key
        

        const payload = JSON.stringify(body);

        try {
            const response = await axios.post(
                apiUrl,
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'authkey': apiKey,
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error('Error calling API:', error.response?.data || error.message);
            return error.response?.data || error.message
        }
    }
}