const axios = require('axios');

module.exports = {
    searchChallan: async (body) => {
        const reqBody = body;
        const regNo = reqBody['vehicleNumber'];
        const consent = reqBody['consent'];
        const consentText = reqBody['mhChallanConsentBased'];
        const phoneNumber = reqBody['phoneNoforOtpMH']
        const statePortals = reqBody['statePortal']

        const apiUrl = 'https://api-preproduction.signzy.app/api/v3/vehicle/challan-search'; // Replace with the target API endpoint
        const apiKey = 'tzX1EcUIImhERr9YlSV196fwcqdxX9nt'; // Replace with your API key
        

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
        const apiUrl = 'https://api.signzy.app/api/v3/vehicle/mh-challans'; // Replace with the target API endpoint
        const apiKey = 'tzX1EcUIImhERr9YlSV196fwcqdxX9nt'; // Replace with your API key
        

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
            return error.response?.data || error.message
            // console.error('Error calling API:', error.response?.data || error.message);
        }
    }
}