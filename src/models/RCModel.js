const aitenObj = 
{
    "message": "Request successfull.",
    "data": {
        "status": "success",
        "message": "Vehicle Found",
        "response_type": "FULL_DATA",
        "metadata": {
            "billable": true
        },
        "result": {
            "state_code": "",
            "state": "",
            "office_code": null,
            "office_name": "",
            "reg_no": "",
            "reg_date": "",
            "purchase_date": "",
            "owner_count": null,
            "owner_name": "",
            "owner_father_name": "",
            "current_address_line1": "",
            "current_address_line2": "",
            "current_address_line3": "",
            "current_district_name": "",
            "current_state": "",
            "current_state_name": "",
            "current_pincode": null,
            "current_full_address": "",
            "permanent_address_line1": "",
            "permanent_address_line2": "",
            "permanent_address_line3": "",
            "permanent_district_name": "",
            "permanent_state": "",
            "permanent_state_name": "",
            "permanent_pincode": null,
            "permanent_full_address": "",
            "owner_code_descr": "",
            "reg_type_descr": "",
            "vehicle_class_desc": "",
            "chassis_no": "",
            "engine_no": "",
            "vehicle_manufacturer_name": "",
            "model_code": "",
            "model": "",
            "body_type": "",
            "cylinders_no": null,
            "vehicle_hp": null,
            "vehicle_seat_capacity": null,
            "vehicle_standing_capacity": null,
            "vehicle_sleeper_capacity": null,
            "unladen_weight": null,
            "vehicle_gross_weight": null,
            "vehicle_gross_comb_weight": null,
            "fuel_descr": "",
            "color": "",
            "manufacturing_mon": null,
            "manufacturing_yr": null,
            "norms_descr": "",
            "wheelbase": null,
            "cubic_cap": null,
            "floor_area": null,
            "ac_fitted": "",
            "audio_fitted": "",
            "video_fitted": "",
            "vehicle_catg": "",
            "dealer_code": "",
            "dealer_name": "",
            "dealer_address_line1": "",
            "dealer_address_line2": "",
            "dealer_address_line3": "",
            "dealer_district": "",
            "dealer_pincode": "",
            "dealer_full_address": "",
            "sale_amount": null,
            "length": null,
            "width": null,
            "height": null,
            "reg_upto": "",
            "fit_upto": "",
            "annual_income": null,
            "imported_vehicle": "",
            "status": "",
            "vehicle_type": "",
            "tax_mode": "",
            "vehicle_insurance_details": {
              "insurance_from": "",
              "insurance_upto": "",
              "insurance_company_code": null,
              "insurance_company_name": "",
              "opdt": "",
              "policy_no": "",
              "vahan_verify": "",
              "reg_no": ""
            },
            "vehicle_pucc_details": {
              "pucc_from": "",
              "pucc_upto": "",
              "pucc_centreno": "",
              "pucc_no": "",
              "op_dt": ""
            },
            "permit_details": null,
            "latest_tax_details": {
              "reg_no": "",
              "tax_mode": "",
              "payment_mode": "",
              "tax_amt": null,
              "tax_fine": null,
              "rcpt_dt": "",
              "tax_from": "",
              "tax_upto": null,
              "collected_by": "",
              "rcpt_no": ""
            }
          }
    }
}



  const keyMapping = {
    "reg_no": "regNo",
    "chassis_no": "chassis",
    "engine_no": "engine",
    "vehicle_manufacturer_name": "vehicleManufacturerName",
    "model": "model",
    "color": "vehicleColour",
    "fuel_descr": "type",
    "norms_descr": "normsType",
    "body_type": "bodyType",
    "owner_count": "ownerCount",
    "owner_name": "owner",
    "owner_father_name": "ownerFatherName",
    "current_full_address": "presentAddress",
    "permanent_full_address": "permanentAddress",
    "cubic_cap": "vehicleCubicCapacity",
    "vehicle_gross_weight": "grossVehicleWeight",
    "unladen_weight": "unladenWeight",
    "vehicle_catg": "vehicleCategory",
    "cylinders_no": "vehicleCylindersNo",
    "vehicle_seat_capacity": "vehicleSeatCapacity",
    "wheelbase": "wheelbase",
    "vehicle_type": "isCommercial",
    "vehicle_insurance_details.insurance_company_name": "vehicleInsuranceCompanyName",
    "vehicle_insurance_details.insurance_upto": "vehicleInsuranceUpto",
    "vehicle_insurance_details.policy_no": "vehicleInsurancePolicyNumber",
    "vehicle_pucc_details.pucc_no": "puccNumber",
    "vehicle_pucc_details.pucc_upto": "puccUpto"
};

module.exports = {
    aitenObj,
    keyMapping
}