const axios = require('axios');
const { urlList, clientApiKeys } = require('../../../config/constants');

module.exports = {
    searchPan: async (body) => {
        const panNo = body['pan'];

        const apiUrl = urlList['pan-supreme-v2']; // Replace with the target API endpoint
        const apiKey = clientApiKeys.befisc; // Replace with your API key
        

        const payload = JSON.stringify({
            "pan": panNo
        });

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

    panToName: async(body) => {
        const panNo = body['pan'];

        const apiUrl = urlList['pan-to-name']; // Replace with the target API endpoint
        const apiKey = clientApiKeys.befisc; // Replace with your API key
        

        const payload = JSON.stringify({
            "pan": panNo
        });

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
    
            return {message:response.data.message,"result":response.data.result};
        } catch (error) {   
             console.error('Error calling API:', error);
            return error.response?.data || error.message
        }
    },

    validatePan: async(body) => {
        const panNo = body['pan'];

        const apiUrl = urlList['pan-validate']; // Replace with the target API endpoint
        const apiKey = clientApiKeys.befisc; // Replace with your API key
        

        const payload = JSON.stringify({
            "pan": panNo
        });

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
    
            return {message:response.data.message,"result":response.data.result};
        } catch (error) {   
             console.error('Error calling API:', error);
            return error.response?.data || error.message
        }
    }
}