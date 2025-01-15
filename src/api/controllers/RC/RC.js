const axios = require('axios');

module.exports = {
    getRc: async (body) => {
        const reqBody = body;
        const regNo = reqBody['reg_no'];
        const consent = reqBody['consent'];
        const consentText = reqBody['consent_text'];

        const apiUrl = 'https://vehicle-rc-verification-api3.p.rapidapi.com/api/v1/private/rc-v1'; // Replace with the target API endpoint
        const apiKey = '476c9ca7f8msh28e7762dd9db0f0p11fca4jsnc3b0fbfbb4d2'; // Replace with your API key
        

        const payload = JSON.stringify({
            "reg_no": regNo,
            "consent": consent,
            "consent_text": consentText
        });

        const options = {
            hostname: 'vehicle-rc-verification-api3.p.rapidapi.com',
            path: '/api/v1/private/rc-v1',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-rapidapi-host': 'vehicle-rc-verification-api3.p.rapidapi.com',
                'x-rapidapi-key': apiKey
            }
        };

        try {
            const response = await axios.post(
                apiUrl,
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-rapidapi-host': 'vehicle-rc-verification-api3.p.rapidapi.com',
                        'x-rapidapi-key': apiKey
                    },
                }
            );
    
            return response.data;
        } catch (error) {
            
            return error.response?.data || error.message;
        }
    
        
    },

    getHistoricalAsync: async (id) => {
        // ..
    },

    getHistoricalData: async() => {
        // ...
    }
}