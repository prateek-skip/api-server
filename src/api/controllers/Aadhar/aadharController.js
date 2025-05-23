const axios = require("axios");
const { urlList, clientApiKeys } = require("../../../config/constants");
const {logger} = require("../../logger/logger");

module.exports = {
  maskAadhar: async (body) => {
    const apiUrl = urlList["aadhar-masking"]; // Replace with the target API endpoint
    const apiKey = clientApiKeys.signzy; // Replace with your API key

    const payload = JSON.stringify(body);

    try {
      const response = await axios.post(apiUrl, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: apiKey,
        },
      });
      return response.data;
    } catch (error) {

      throw error;
      // logger.error(error);
      // return error.response?.data || error.message;
    }
  },

  verifyAadhar: async (body) => {
    const apiUrl = urlList["aadhar-verification"]; // Replace with the target API endpoint
    const apiKey = clientApiKeys.signzy; // Replace with your API key

    const payload = JSON.stringify(body);

    try {
      const response = await axios.post(apiUrl, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: apiKey,
        },
      });
      return response.data;
    } catch (error) {

      throw error;
      // logger.error(error);
      // return error.response?.data || error.message;
    }
  },

  sendAadharOtp: async (body) => {
    const apiUrl = urlList["aadhar-okyc"]; // Replace with the target API endpoint
    const apiKey = clientApiKeys['befisc-prod']; // Replace with your API key

    const payload = JSON.stringify(body);

    try {
      const response = await axios.post(apiUrl, payload, {
        headers: {
          "Content-Type": "application/json",
          authkey: apiKey,
        },
      });
      return response.data;
    } catch (error) {

      throw error;
      // logger.error(error);
      // return error.response?.data || error.message;
    }
  },

  downloadAadhar: async (body) => {
    const apiUrl = urlList["aadhar-otp-download"]; // Replace with the target API endpoint
    const apiKey = clientApiKeys['befisc-prod']; // Replace with your API key

    const payload = JSON.stringify(body);

    try {
      const response = await axios.post(apiUrl, payload, {
        headers: {
          "Content-Type": "application/json",
          authkey: apiKey,
        },
      });
      //   console.log(response);
      return response.data;
    } catch (error) {
      // logger.error(error);

      throw error;
      // return error.response?.data || error.message;
    }
  },

  sendAadharOtpDetailed: async (body) => {
    const apiUrl = urlList["aadhaar-xml-with-eaadhaar-send-otp"]; // Replace with the target API endpoint
    const apiKey = clientApiKeys['befisc-prod']; // Replace with your API key

    const payload = JSON.stringify(body);

    try {
      const response = await axios.post(apiUrl, payload, {
        headers: {
          "Content-Type": "application/json",
          authkey: apiKey,
        },
      });
      return response.data;
    } catch (error) {
      // logger.error(error);

      throw error;
      // return error.response?.data || error.message;
    }
  },

  downloadAadharDetailed: async (body) => {
    const apiUrl = urlList["aadhaar-xml-with-eaadhaar-download"]; // Replace with the target API endpoint
    const apiKey = clientApiKeys['befisc-prod']; // Replace with your API key

    const payload = JSON.stringify(body);

    try {
      const response = await axios.post(apiUrl, payload, {
        headers: {
          "Content-Type": "application/json",
          authkey: apiKey,
        },
      });
      //   console.log(response);
      // throw new Error("Timestamp is not in IST (+05:30)");
      return response.data;
    } catch (error) {
      // logger.error(error);
      throw error;
      // return error.response?.data || error.message;
    }
  },
};
