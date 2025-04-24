const axios = require('axios');
const { urlList, clientApiKeys } = require('../../../config/constants');
const { aitenObj, keyMapping } = require('../../../models/RCModel');

// const timeout = 5000;


// Function to map Object2 values to Object1 keys
function mapValues(originalObj, sourceObj, mapping) {
    // Clone the structure of Object1
    const mappedObj = JSON.parse(JSON.stringify(originalObj));

    // Iterate over the mapping to populate values from Object2
    for (const [obj1Key, obj2Key] of Object.entries(mapping)) {
        const value = obj2Key.split('.').reduce((o, key) => (o ? o[key] : undefined), sourceObj.result);
        if (value !== undefined) {
            setValueByKeyPath(mappedObj.data.result, obj1Key, value);
        }
    }

    return mappedObj;
}

// Helper function to set values in a nested object based on key path
function setValueByKeyPath(obj, keyPath, value) {
    const keys = keyPath.split('.');
    let current = obj;
    for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
            current[keys[i]] = {};
        }
        current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
}

// Function to perform a POST request with a timeout
const postWithTimeout = async (url, data,headers, timeout) => {
    try {
        const response = await axios.post(url, data, {headers}); // Set timeout in ms
        return response.data;
    } catch (error) {
        throw new Error(`Error posting to ${url}: ${error.message}`);
    }
};

// Function to try the first URL and fallback to the second
const postWithFallback = async (request1, request2, timeout) => {
    try {
        return await postWithTimeout(request1.url, request1.payload,request1.headers); // Try the first URL
    } catch (error) {
        console.log('second');
        const response = await postWithTimeout(request2.url, request2.payload,request2.headers, timeout); // Fallback to the second URL
        return mapValues(aitenObj,response,keyMapping)
    }
};


module.exports = {
    getRc: async (body) => {
        const reqBody = body;
        const regNo = reqBody['reg_no'];
        const consent = reqBody['consent'];
        const consentText = reqBody['consent_text'];

        const request1 = {};
        const request2 = {};

       
        request1.payload = JSON.stringify({
            "reg_no": regNo,
            "consent": consent,
            "consent_text": consentText
        });

        request1.url = urlList['aiten-rc-plus'];
        request1.headers = {
            'Content-Type': 'application/json',
            'x-rapidapi-host': 'vehicle-rc-verification-api3.p.rapidapi.com',
            'apiKey': clientApiKeys['aiten']
        };

        request2.url = urlList['signzy-detailed-vehicle-search'];
        request2.headers = {
            'Content-Type': 'application/json',
            'Authorization': clientApiKeys['signzy']
        };

        request2.payload = JSON.stringify({
            "vehicleNumber": regNo,
            "splitAddress": "false"
        })


        try {
            // const response = await postWithFallback(request1,request2);
            
            // return response;

            const response = await axios.post(request1.url, request1.payload, {headers:request1.headers}); // Set timeout in ms
            return response.data;
        } catch (error) {
            console.log(error)
            return error.response?.data || {"error":"Server error","message":'Server is facing some issue right now. Please try again.'};
        }
        
    },

    getHistoricalAsync: async (id) => {
        // ..
    },

    getHistoricalData: async() => {
        // ...
    }
}