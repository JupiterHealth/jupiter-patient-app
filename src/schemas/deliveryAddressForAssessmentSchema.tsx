import * as Yup from "yup";

export interface deliveryAddressForAssessmentSchema {
    addressLine1: string;
    addressLine2: string;
    city: string;
    province: string;
    postalCode: string;
    phoneNumber: string;
}

export const deliveryAddressForAssessmentSchemaResolver = Yup.object({
    addressLine1: Yup.string()
        .required("Address Line 1 is a required field")
        .matches(/^\s*\S[\s\S]*$/, "Address cannot contain only blankspaces")
        .max(60, "Address Line 1 must be at most 60 characters"),
    city: Yup.string()
        .required("City is a required field")
        .matches(/^\s*\S[\s\S]*$/, "City cannot contain only blankspaces")
        .max(40, " City must be at most 40 characters "),
    province: Yup.string()
        .required("Province is a required field")
        .matches(/^\s*\S[\s\S]*$/, "Province cannot contain only blankspaces")
        .max(40, " Province must be at most 40 characters "),
    postalCode: Yup.string()
        .required("Postal Code is a required field")
        .matches(
            /[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d/,
            "Please enter valid postal code",
        ),
    phoneNumber: Yup.string().trim().required("Phone Number is required field"),
}).required();
