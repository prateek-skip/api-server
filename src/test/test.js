const express = require('express');
const router = express.Router();

const fs = require('fs');
const axios = require('axios');



const { rcPayload , aitenPayload_1000, aitenPayload_2000} = require('./testConstants');
const { urlList, clientApiKeys } = require('../config/constants');




function delayedResponse(data, delay) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, delay);
    });
}

function delayedApiCall(url, delay) {
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            try {
                const response = await fetch(url);
                const data = await response.json();
                resolve(data);
            } catch (error) {
                reject(error);
            }
        }, delay);
    });
}



async function fetchApiResponses(payloads) {

    const TIMEOUT = 4000; // 10 seconds timeout

    function fetchWithTimeout(payload, delay) {
        const request1 = {};

       
        request1.payload = JSON.stringify({
            "reg_no": payload,
            "consent": "yes",
            "consent_text": "I hear by declare my consent agreement for fetching my information via consumer API"
        });

        request1.url =  urlList['aiten-rc-plus'];
        request1.headers = {
            'Content-Type': 'application/json',
            'x-rapidapi-host': 'vehicle-rc-verification-api3.p.rapidapi.com',
            'x-rapidapi-key': clientApiKeys['aiten']
        };
        return new Promise((resolve) => {
            setTimeout(async () => {
                try {
                    const response = await axios.post(request1.url,request1.payload,{"headers":request1.headers,'timeout':12000});
                    // const data = await response.json();
                    resolve(response.data);
                } catch (error) {
                    resolve({ error: error.message || "Failed to fetch", payload : request1.payload }); // Handle error
                }
            }, delay);
        });


    }

    const promises = payloads.map((payload, index) => fetchWithTimeout(payload,index*500));
    const results = await Promise.all(promises);
    return results;
    // console.log(results); // Array filled with API responses

    // const requests = payloads.map(payload => fetchWithTimeout(payload));
    // return Promise.all(requests);

}


const API_URL = 'https://api.example.com/data';
// const PAYLOADS = Array.from({ length: 1000 }, (_, i) => ({ id: i + 1 })); // Example payloads
const CONCURRENT_LIMIT = 5; // Set limit to prevent 429 errors


async function fetchData(payload) {
    const request1 = {};

       
        request1.payload = JSON.stringify({
            "reg_no": payload,
            "consent": "yes",
            "consent_text": "I hear by declare my consent agreement for fetching my information via consumer API"
        });

        request1.url =  urlList['aiten-rc-plus'];
        request1.headers = {
            'Content-Type': 'application/json',
            'x-rapidapi-host': 'vehicle-rc-verification-api3.p.rapidapi.com',
            'x-rapidapi-key': clientApiKeys['aiten']
        };
    try {
        const response = await axios.post(request1.url, request1.payload,{headers : request1.headers});
        // console.log(`Success: ${payload.id}`, response.data);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 429) {
            console.warn(`Rate limited: ${payload}, retrying...`);
            await new Promise(res => setTimeout(res, 3000)); // Wait and retry
            return fetchData(payload);
        } else {
            console.error(`Failed: ${payload}`, error.message);
            return `Error or no data available for ${payload}`;
        }
    }
}

async function processBatches(PAYLOADS) {
    const { default: pLimit } = await import('p-limit');
    const CONCURRENT_LIMIT = 10; 
    const limit = pLimit(CONCURRENT_LIMIT);
    
    const results = await Promise.all(PAYLOADS.map(payload => limit(() => fetchData(payload))));
    console.log('All requests processed');
    return results;
}

// processBatches();





router.post("/", async (req, res, next) => {
    processBatches(aitenPayload_2000).then(responses => {
        const filePath = './data/AITEN_data_2000.json';
    
            // Save JSON data to file
            fs.writeFile(filePath, JSON.stringify(responses, null, 2), (err) => {
                if (err) {
                    console.error('Error saving JSON file:', err);
                    return res.status(500).json({ message: 'Failed to save file' });
                }
                console.log('JSON file saved successfully');
                res.json({ message: 'Response saved successfully!', filePath });
            });
    
        // console.log(responses)
    });

});


module.exports = router;