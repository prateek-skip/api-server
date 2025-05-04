const axios = require('axios');
const { urlList, clientApiKeys } = require('../../../config/constants');

module.exports = {
    searchChallan: async (body) => {
        const reqBody = body;
        const regNo = reqBody['vehicleNumber'];
        const consent = reqBody['consent'];
        const consentText = reqBody['mhChallanConsentBased'];
        const phoneNumber = reqBody['phoneNoforOtpMH']
        const statePortals = reqBody['statePortal']

        const apiUrl = urlList['challan-search']; // Replace with the target API endpoint
        const apiKey = clientApiKeys.signzy;// Replace with your API key
        

        const payload = JSON.stringify({
            "vehicleNumber": regNo,
            "mhChallanConsentBased": consentText,
            "phoneNoforOtpMH": phoneNumber,
            "statePortal" : statePortals
        });


        try {
            const response = await axios.post(
                apiUrl,
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': apiKey,
                        'x-client-unique-id' : 'akash@verifyu.ai'
                    },
                }
            );
    
            return response.data;
        } catch (error) {
            return error.response?.data || error.message
            // console.error('Error calling API:', error.response?.data || error.message);
        }
    
        
    },

    getMhChallan: async(body) => {
        const reqBody = body;
        const sessionId = reqBody['sessionId'];
        const otp = reqBody['otp'];
        const apiUrl = urlList['mh-challan-search']; // Replace with the target API endpoint
        const apiKey = clientApiKeys.signzy;
        

        const payload = JSON.stringify({
            "otp": otp,
            "sessionId":sessionId
        });


        try {
            const response = await axios.post(
                apiUrl,
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': apiKey,
                        'x-client-unique-id' : 'akash@verifyu.ai'
                    },
                }
            );
    
            return response.data;
        } catch (error) {   
             console.error('Error calling API:', error);
            return error.response?.data || error.message
        }
    }
}