const clientApiKeys = {
    "aiten":"476c9ca7f8msh28e7762dd9db0f0p11fca4jsnc3b0fbfbb4d2",
    "signzy":"pEw2o7mwR40E7UMg9Mws9d8bhMZRJxwL",
    "befisc":"0HLJ1NX0T5Z25O3"
}

const urlList = {
    "pan-supreme-v2": "https://pan-verification-supreme.befisc.com/v2",
    'pan-to-name':"https://pan-to-name-and-dob.befisc.com",
    'pan-validate':"https://validate-pan.befisc.com/",
    'phone-prefill':"https://api.signzy.app/api/v3/phonekyc/phone-prefill",
    'phone-prefill-v2':'https://api.signzy.app/api/v3/phonekyc/phone-prefill-v2',
    'phone-game-compliance':"https://api.signzy.app/api/v3/gaming/phone-onboarding",
    'equifax-bureau':"https://api.signzy.app/api/v3/bureau/equifax_report",
    'experian-bureau':"https://api.signzy.app/api/v3/bureau/experian-report",
    'aadhar-masking': "https://api.signzy.app/api/v3/aadhaar/extraction-masking",
    'aadhar-verification': "https://api.signzy.app/api/v3/aadhaar/verify",
    'aadhar-okyc' : 'https://aadhaar-xml-send-otp.befisc.com/',
    'aadhar-otp-download' : 'https://aadhaar-xml-download.befisc.com/',
    'pan-ocr-extraction': 'https://api.signzy.app/api/v3/pan/extractions',
    'pan-verification-v3':"https://api.signzy.app/api/v3/pan/pan-verification-v3",
    'voterID-ocr-extraction': 'https://api.signzy.app/api/v3/voter-id/extractions',
    'voterid-verification':'https://api.signzy.app/api/v3/voterid/verification',
    'passport-ocr-extraction': 'https://api.signzy.app/api/v3/passport/extractions',
    'passport-verification': 'https://api.signzy.app/api/v3/passport/verification',
    'DL-verification':'https://api.signzy.app/api/v3/dl_/verification',
    'DL-ocr-extraction':'https://api.signzy.app/api/v3/driving-license/extractions',
    'signzy-detailed-vehicle-search' : 'https://api.signzy.app/api/v3/vehicle/detailedsearches',
    'aiten-rc-plus': 'https://vehicle-rc-verification-api3.p.rapidapi.com/api/v1/private/rc-plus'
}

module.exports = {clientApiKeys,urlList}