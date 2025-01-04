const axios = require('axios');
const { urlList, clientApiKeys } = require('../../../config/constants');

module.exports = {

    ocrExtraction: async(body) => {
        const apiUrl = urlList['passport-ocr-extraction']; // Replace with the target API endpoint
        const apiKey = clientApiKeys.signzy; // Replace with your API key
        

        const payload = JSON.stringify(body);

        try {
            const response = await axios.post(
                apiUrl,
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': apiKey,
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error('Error calling API:', error.response?.data || error.message);
            return error.response?.data || error.message
        }
    },

    verifyPassport: async(body) => {
        const apiUrl = urlList['passport-verification']; // Replace with the target API endpoint
        const apiKey = clientApiKeys.signzy; // Replace with your API key
        

        const payload = JSON.stringify(body);

        try {
            const response = await axios.post(
                apiUrl,
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': apiKey,
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