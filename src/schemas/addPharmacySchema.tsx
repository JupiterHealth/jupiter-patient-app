import * as Yup from "yup";

export interface AddPharmacySchema {
    pharmacyName: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    province: string;
    postalCode: string;
    faxNumber: string;
}

export const AddPharmacyValidateResolver = Yup.object({
    pharmacyName: Yup.string()
        .required("Pharmacy Name is required field")
        .matches(
            /^\s*\S[\s\S]*$/,
            "Pharmacy name cannot contain only blankspaces",
        ),
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
    faxNumber: Yup.string()
        .trim()
        .required("Fax Number is required field")
        .min(10, "Fax number should have at least 10 digits"),
}).required();
