const clientApiKeys = {
    "aiten":"u01tVjB24tBYoR",
    "signzy":"pEw2o7mwR40E7UMg9Mws9d8bhMZRJxwL",
    'signzy-preprod':"EqJQn7v9FMQMXJXcbFUuww9ZCgsmPNES",
    "befisc":"0HLJ1NX0T5Z25O3",
    "befisc-prod":"LU07LK9CPCGR5NJ"
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
    'aiten-rc-plus': 'https://api.aitanlabs.com/api/v1/private/rc-plus',
    'pf-passbook-without-otp': 'https://api-preproduction.signzy.app/api/v3/underwriting/uan-passbook-without-otp-v2',
    'challan-search': 'https://api.signzy.app/api/v3/vehicle/challan-search',
    'mh-challan-search': 'https://api.signzy.app/api/v3/vehicle/mh-challan-search',
}


const validApiKey = {
  '030faf4b-f8f0-4c8a-8ad6-c68fed9acb07':"cred",
  'aeded234-800e-4404-9fa6-8e0048dabdc1':"acko",
  "20781877-e1b3-42b6-91f3-ce55318e5115":"verifyu", 
  "affa04c5-99be-4d6b-b549-5ef05092c2fe":"scienaptic",
  "881cd5bb-1f32-4ac7-a39a-7f336deca8e9":"zepto",
  "27d8cfbb-320f-4ccd-879f-f02dab578cd3":"signzy",
  "9d3d35f8-336d-48f3-beef-7c5a71359442":"A23",
  "037b699f-d07d-4ac4-a007-6821923f2c64":"Client1",
  "83dd55ac-bd92-440e-af23-fcddb5de7a10":"Client2",
  "63aaeb2d-9890-4d7a-8643-d5850aff21db":"Client3",
  "7254039b-a84b-4d80-88cb-869b1f10d629":"Client4",
  "fbd7c9d4-f250-40d2-9097-e9d6f6f38caf":"Digio",
  "7586e6f0-2b27-4a20-b37b-dcc3e9b3d18a":"IntexM_Media",
  "7b96acea-85f9-40b9-9f40-0aecd90d0438":"CashFree",
  "ebcc8385-931e-48a8-b222-205eda113b69":"GoKiwi"
}; // Replace with your actual API key


  
const statusToHttpMapAiten = {
  100: { description: 'Active PAN', billable: true, httpCode: 200 },
  101: { description: 'Inactive PAN', billable: true, httpCode: 200 },
  102: { description: 'Record not found', billable: true, httpCode: 404 },
  400: { description: 'Invalid Input Parameter', billable: false, httpCode: 400 },
  500: { description: 'Internal Server Error', billable: false, httpCode: 500 },
  503: { description: 'Source Down', billable: false, httpCode: 409 },
  504: { description: 'Gateway Timeout', billable: false, httpCode: 504 },
  502: { description: 'Bad Gateway', billable: false, httpCode: 502 },
  403: {description: 'Rate Limited', billable: false, httpCode: 429},
};

const statusToHttpMapBefisc = {
  1: { description: 'Active PAN', billable: true, httpCode: 200 },
  3: { description: 'Inactive PAN', billable: true, httpCode: 200 },
  2: { description: 'PAN not found', billable: true, httpCode: 404 },
  301: { description: 'Invalid Input Parameter', billable: false, httpCode: 400 },
  500: { description: 'Internal Server Error', billable: false, httpCode: 500 },
  401: { description: 'Internal Server Error', billable: false, httpCode: 500 },
  402: { description: 'Internal Server Error', billable: false, httpCode: 500 },
  302: { description: 'Source Down', billable: false, httpCode: 409 },
  504: { description: 'Gateway Timeout', billable: false, httpCode: 504 },
  502: { description: 'Bad Gateway', billable: false, httpCode: 502 },
  403: {description: 'Rate Limited', billable: false, httpCode: 429},
};

module.exports = {clientApiKeys,urlList, validApiKey , statusToHttpMapBefisc, statusToHttpMapAiten};