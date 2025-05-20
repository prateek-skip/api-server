const axios = require('axios');
const { urlList, clientApiKeys } = require('../../../config/constants');

module.exports = {
    searchPan: async (body) => {
        const panNo = body['pan'];

        const apiUrl = urlList['pan-supreme-v2']; // Replace with the target API endpoint
        const apiKey = clientApiKeys['befisc-prod']; // Replace with your API key

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
            return error.response?.data || error.message
        }
    
        
    },

    panToName: async(body) => {
        const panNo = body['pan'];

        const apiUrl = urlList['pan-to-name']; // Replace with the target API endpoint
        const apiKey = clientApiKeys['befisc-prod']; // Replace with your API key
        

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
            return error.response?.data || error.message
        }
    },

    validatePan: async(body) => {
        const panNo = body['pan'];

        const apiUrl = urlList['pan-validate']; // Replace with the target API endpoint
        const apiKey = clientApiKeys['befisc-prod']; // Replace with your API key
        

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

    extractPanOcr: async(body) => {

        const apiUrl = urlList['pan-ocr-extraction']; // Replace with the target API endpoint
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
    
            return {message:response.data.message,"result":response.data.result};
        } catch (error) {   
            return error.response?.data || error.message
        }
    },

    panVerification : async(body) => {

        const apiUrl = urlList['pan-verification-v3']; // Replace with the target API endpoint
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
            return response;
        } catch (error) {   
            return error.response?.data || error.message
        }
    },
}