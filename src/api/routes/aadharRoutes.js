const express = require("express");
const router = express.Router();
const aadharController = require("../controllers/Aadhar/aadharController");

/**
 * GET request to /books
 */

router.post("/mask-aadhar", async (req, res, next) => {
  const apiData = await aadharController.maskAadhar(req.body);
  if (apiData["error"]) {
    res.status(apiData["error"]["status"]).json(apiData);
    return;
  }
  res.status(200).json({
    message: "Request successfull.",
    data: apiData,
  });
});

router.post("/verify-aadhar", async (req, res, next) => {
  const apiData = await aadharController.verifyAadhar(req.body);
  if (apiData["error"]) {
    res.status(apiData["error"]["status"]).json(apiData);
    return;
  }
  res.status(200).json({
    message: "Request successfull.",
    apiData,
  });
});

router.post("/send-otp", async (req, res, next) => {
  const apiData = await aadharController.sendAadharOtp(req.body);
  //   if (!apiData["result"]) {
  //     res.status(422).json({ message: apiData.message });
  //     return;
  //   }
  res.status(200).json({
    message: "Request successfull.",
    data: apiData,
  });
});

router.post("/download-aadhar", async (req, res, next) => {
  const apiData = await aadharController.downloadAadhar(req.body);
  if (!apiData["result"]) {
    res.status(500).json({ message: apiData.message });
    return;
  }
  if (apiData["status"] === 2) {
    res.status(200).json({ message: apiData.message });
    return;
  }
  res.status(200).json({
    message: "Request successfull.",
    data: apiData,
  });
});

module.exports = router;
