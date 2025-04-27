const axios = require("axios");
const { urlList, clientApiKeys } = require("../../../config/constants");

module.exports = {

    pfPassbookWithoutOtp: async (body) => {
    const apiUrl = urlList["pf-passbook-without-otp"]; // Replace with the target API endpoint
    const apiKey = clientApiKeys['signzy-preprod']; // Replace with your API key

    const payload = JSON.stringify(body);

    try {
      const response = await axios.post(apiUrl, payload, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": apiKey
        },
      });
      return response.data;
    } catch (error) {
    //   logger.error(error);
      return error.response?.data || error.message;
    }
  }
};
